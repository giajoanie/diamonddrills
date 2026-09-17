"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import { extractPdfText } from "@/lib/exam-import/extract-pdf-text";
import { parseExamText } from "@/lib/exam-import/parse-exam-text";
import { normalizeStem } from "@/lib/exam-import/dedupe";
import { getOrCreateGlobalInstructionalArea } from "@/lib/dal/instructional-areas";
import type { OptionKey } from "@/generated/prisma/client";

export type ImportExamState = {
  error?: string;
  summary?: {
    examBankId: string;
    sourceExam: string;
    created: number;
    duplicatesSkipped: number;
    anomalies: string[];
  };
} | undefined;

export async function importExamPdf(
  _prevState: ImportExamState,
  formData: FormData,
): Promise<ImportExamState> {
  await requireRole("MENTOR");

  const examBankId = formData.get("examBankId");
  const sourceExam = formData.get("sourceExam");
  const sourceYearRaw = formData.get("sourceYear");
  const file = formData.get("file");

  if (typeof examBankId !== "string" || !examBankId) {
    return { error: "Choose an exam bank." };
  }
  if (typeof sourceExam !== "string" || !sourceExam.trim()) {
    return { error: "Give this exam a source name (e.g. \"2026 Marketing ICDC Exam\")." };
  }
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a PDF file to upload." };
  }

  const examBank = await prisma.examBank.findUnique({ where: { id: examBankId } });
  if (!examBank) {
    return { error: "That exam bank doesn't exist." };
  }

  const sourceYear = sourceYearRaw ? parseInt(sourceYearRaw.toString(), 10) : null;
  const buffer = Buffer.from(await file.arrayBuffer());

  let rawText: string;
  try {
    rawText = await extractPdfText(buffer);
  } catch (err) {
    console.error("extractPdfText failed:", err);
    return { error: "Could not read that PDF — it may be corrupted." };
  }

  const parsed = parseExamText(rawText);
  const anomalies = [...parsed.anomalies];

  if (parsed.questions.length === 0) {
    return {
      summary: {
        examBankId,
        sourceExam: sourceExam.trim(),
        created: 0,
        duplicatesSkipped: 0,
        anomalies,
      },
    };
  }

  const existingStems = await prisma.question.findMany({
    where: { examBankId },
    select: { stem: true },
  });
  const existingNormalized = new Set(existingStems.map((q) => normalizeStem(q.stem)));

  const instructionalAreaCache = new Map<string, string>(); // code -> id

  let created = 0;
  let duplicatesSkipped = 0;

  for (const q of parsed.questions) {
    const normalized = normalizeStem(q.stem);
    if (existingNormalized.has(normalized)) {
      duplicatesSkipped++;
      continue;
    }
    existingNormalized.add(normalized); // guard against duplicates within the same upload

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

    await prisma.question.create({
      data: {
        examBankId,
        sourceExam: sourceExam.trim(),
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
    created++;
  }

  revalidatePath(`/mentor/exams/${examBankId}`);

  return {
    summary: {
      examBankId,
      sourceExam: sourceExam.trim(),
      created,
      duplicatesSkipped,
      anomalies,
    },
  };
}

/** Plain (non-useActionState) action bound directly to each review row's
 * form — with up to ~100 rows on a review page, this avoids the overhead of
 * a client component + hook per row. Feedback is the re-rendered page
 * (revalidatePath) rather than inline pending/error state. */
export async function updateQuestionDraft(formData: FormData): Promise<void> {
  await requireRole("MENTOR");

  const questionId = formData.get("questionId");
  if (typeof questionId !== "string") return;

  const stem = formData.get("stem");
  const optionA = formData.get("optionA");
  const optionB = formData.get("optionB");
  const optionC = formData.get("optionC");
  const optionD = formData.get("optionD");
  const correctOption = formData.get("correctOption");
  const explanation = formData.get("explanation");
  const instructionalAreaId = formData.get("instructionalAreaId");

  if (
    typeof stem !== "string" ||
    typeof optionA !== "string" ||
    typeof optionB !== "string" ||
    typeof optionC !== "string" ||
    typeof optionD !== "string"
  ) {
    return;
  }

  const validCorrectOption =
    typeof correctOption === "string" && ["A", "B", "C", "D"].includes(correctOption)
      ? (correctOption as OptionKey)
      : null;

  await prisma.question.update({
    where: { id: questionId },
    data: {
      stem: stem.trim(),
      optionA: optionA.trim(),
      optionB: optionB.trim(),
      optionC: optionC.trim(),
      optionD: optionD.trim(),
      correctOption: validCorrectOption,
      explanation: typeof explanation === "string" ? explanation.trim() : null,
      instructionalAreaId:
        typeof instructionalAreaId === "string" && instructionalAreaId ? instructionalAreaId : null,
    },
  });

  const question = await prisma.question.findUniqueOrThrow({ where: { id: questionId } });
  revalidatePath(`/mentor/exams/${question.examBankId}`);
}

export async function publishQuestion(formData: FormData): Promise<void> {
  await requireRole("MENTOR");
  const questionId = formData.get("questionId");
  if (typeof questionId !== "string") return;

  const question = await prisma.question.findUnique({ where: { id: questionId } });
  if (!question) return;
  if (!question.correctOption || !question.stem || !question.optionA || !question.optionB || !question.optionC || !question.optionD) {
    return; // incomplete — mentor must fix before publishing
  }

  await prisma.question.update({ where: { id: questionId }, data: { isActive: true } });
  revalidatePath(`/mentor/exams/${question.examBankId}`);
}

export async function publishAllComplete(formData: FormData): Promise<void> {
  await requireRole("MENTOR");
  const examBankId = formData.get("examBankId");
  const sourceExam = formData.get("sourceExam");
  if (typeof examBankId !== "string" || typeof sourceExam !== "string") return;

  await prisma.question.updateMany({
    where: {
      examBankId,
      sourceExam,
      isActive: false,
      correctOption: { not: null },
      NOT: [{ stem: "" }, { optionA: "" }, { optionB: "" }, { optionC: "" }, { optionD: "" }],
    },
    data: { isActive: true },
  });

  revalidatePath(`/mentor/exams/${examBankId}`);
}

export async function deleteDraftQuestion(formData: FormData): Promise<void> {
  await requireRole("MENTOR");
  const questionId = formData.get("questionId");
  if (typeof questionId !== "string") return;

  const question = await prisma.question.findUnique({ where: { id: questionId } });
  if (!question || question.isActive) return; // only drafts can be deleted this way

  await prisma.question.delete({ where: { id: questionId } });
  revalidatePath(`/mentor/exams/${question.examBankId}`);
}
