/**
 * One-time/rerunnable bulk importer for the exam PDFs staged in
 * seed/exams/<cluster>/. Mirrors the mentor upload Server Action
 * (src/lib/actions/exam-import.ts) but runs from the CLI, since that
 * action requires an authenticated mentor request context.
 *
 * Auto-publishes a file's questions only when its parse was clean (matched
 * every question to a key entry, no anomalies) — anything else is left as
 * a draft (isActive: false) for a mentor to review in the normal UI.
 *
 * Usage: npx tsx scripts/import-exam-pdfs.ts
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { extractPdfText } from "@/lib/exam-import/extract-pdf-text";
import { parseExamText } from "@/lib/exam-import/parse-exam-text";
import { normalizeStem } from "@/lib/exam-import/dedupe";
import { getOrCreateGlobalInstructionalArea } from "@/lib/dal/instructional-areas";
import type { OptionKey } from "@/generated/prisma/client";

const EXAM_BANK_SLUG = "marketing";
const EXAM_DIR = path.join(process.cwd(), "seed/exams/marketing");

type FileReport = {
  file: string;
  sourceExam: string;
  sourceYear: number | null;
  status: "published" | "needs-review" | "skipped";
  questionsFound: number;
  keyEntriesFound: number;
  matched: number;
  missingKey: number;
  created: number;
  duplicatesSkipped: number;
  anomalies: string[];
};

function labelFor(filename: string): { sourceExam: string; sourceYear: number | null } {
  const yearMatch = filename.match(/^(\d{4})/);
  const sourceYear = yearMatch ? parseInt(yearMatch[1], 10) : null;
  const isSample = /sample/i.test(filename);
  const sourceExam = sourceYear
    ? `${sourceYear} Marketing ${isSample ? "Sample" : "ICDC"} Exam`
    : filename.replace(/\.pdf$/i, "");
  return { sourceExam, sourceYear };
}

async function importFile(examBankId: string, filePath: string): Promise<FileReport> {
  const filename = path.basename(filePath);
  const { sourceExam, sourceYear } = labelFor(filename);
  const buffer = fs.readFileSync(filePath);

  let rawText: string;
  try {
    rawText = await extractPdfText(buffer);
  } catch (err) {
    return {
      file: filename,
      sourceExam,
      sourceYear,
      status: "skipped",
      questionsFound: 0,
      keyEntriesFound: 0,
      matched: 0,
      missingKey: 0,
      created: 0,
      duplicatesSkipped: 0,
      anomalies: [`Failed to extract PDF text: ${String(err)}`],
    };
  }

  const parsed = parseExamText(rawText);

  if (parsed.questions.length === 0) {
    return {
      file: filename,
      sourceExam,
      sourceYear,
      status: "skipped",
      questionsFound: 0,
      keyEntriesFound: 0,
      matched: 0,
      missingKey: 0,
      created: 0,
      duplicatesSkipped: 0,
      anomalies: parsed.anomalies,
    };
  }

  const existingStems = await prisma.question.findMany({
    where: { examBankId },
    select: { stem: true },
  });
  const existingNormalized = new Set(existingStems.map((q) => normalizeStem(q.stem)));
  const instructionalAreaCache = new Map<string, string>();

  let created = 0;
  let duplicatesSkipped = 0;
  const createdIds: string[] = [];

  for (const q of parsed.questions) {
    const normalized = normalizeStem(q.stem);
    if (existingNormalized.has(normalized)) {
      duplicatesSkipped++;
      continue;
    }
    existingNormalized.add(normalized);

    let instructionalAreaId: string | null = null;
    if (q.instructionalAreaCode) {
      let id = instructionalAreaCache.get(q.instructionalAreaCode);
      if (!id) {
        const area = await getOrCreateGlobalInstructionalArea(q.instructionalAreaCode);
        id = area.id;
        instructionalAreaCache.set(q.instructionalAreaCode, id);
      }
      instructionalAreaId = id;
    }

    const row = await prisma.question.create({
      data: {
        examBankId,
        sourceExam,
        sourceYear,
        numberInSource: q.numberInSource,
        stem: q.stem,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctOption: q.correctOption as OptionKey | null,
        instructionalAreaId,
        explanation: q.explanation,
        isActive: false,
      },
    });
    createdIds.push(row.id);
    created++;
  }

  const isClean = parsed.anomalies.length === 0 && parsed.stats.missingKey === 0;
  if (isClean && createdIds.length > 0) {
    await prisma.question.updateMany({
      where: { id: { in: createdIds } },
      data: { isActive: true },
    });
  }

  return {
    file: filename,
    sourceExam,
    sourceYear,
    status: isClean ? "published" : "needs-review",
    questionsFound: parsed.stats.questionsFound,
    keyEntriesFound: parsed.stats.keyEntriesFound,
    matched: parsed.stats.matched,
    missingKey: parsed.stats.missingKey,
    created,
    duplicatesSkipped,
    anomalies: parsed.anomalies,
  };
}

async function main() {
  const examBank = await prisma.examBank.findUniqueOrThrow({ where: { slug: EXAM_BANK_SLUG } });
  const files = fs
    .readdirSync(EXAM_DIR)
    .filter((f) => f.endsWith(".pdf"))
    .sort();

  const reports: FileReport[] = [];
  for (const file of files) {
    console.log(`Importing ${file}...`);
    const report = await importFile(examBank.id, path.join(EXAM_DIR, file));
    reports.push(report);
    console.log(
      `  -> ${report.status}: ${report.created} created (${report.duplicatesSkipped} duplicates skipped), ${report.anomalies.length} anomalies`,
    );
  }

  const reportPath = path.join(process.cwd(), "PARSE_REPORT.md");
  fs.writeFileSync(reportPath, renderReport(reports));
  console.log(`\nWrote ${reportPath}`);
}

function renderReport(reports: FileReport[]): string {
  const lines: string[] = [
    "# PARSE_REPORT.md",
    "",
    "Results of importing the staged exam PDFs in `seed/exams/marketing/` via `scripts/import-exam-pdfs.ts`.",
    "A file is auto-published only when every question matched an answer-key entry with zero anomalies; anything else is left as a draft for a mentor to fix on the review screen (`/mentor/exams/<bank>`).",
    "",
    "| File | Source exam | Status | Questions found | Matched | Missing key | Created | Duplicates skipped |",
    "|---|---|---|---|---|---|---|---|",
  ];

  for (const r of reports) {
    lines.push(
      `| ${r.file} | ${r.sourceExam} | ${r.status} | ${r.questionsFound} | ${r.matched} | ${r.missingKey} | ${r.created} | ${r.duplicatesSkipped} |`,
    );
  }

  lines.push("", "## Anomalies", "");
  for (const r of reports) {
    if (r.anomalies.length === 0) continue;
    lines.push(`### ${r.file}`, "");
    for (const a of r.anomalies) lines.push(`- ${a}`);
    lines.push("");
  }

  const totalCreated = reports.reduce((sum, r) => sum + r.created, 0);
  const totalPublished = reports.filter((r) => r.status === "published").length;
  lines.push(
    "## Summary",
    "",
    `- ${reports.length} files processed`,
    `- ${totalPublished} auto-published (clean parse)`,
    `- ${reports.length - totalPublished} need manual review or were skipped`,
    `- ${totalCreated} total questions created`,
  );

  return lines.join("\n") + "\n";
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
