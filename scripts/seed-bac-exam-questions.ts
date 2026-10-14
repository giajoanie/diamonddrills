/**
 * Seeds the Business Administration Core exam bank with the original
 * question set in src/lib/bac-exam-seed-data.ts. This bank had zero
 * questions — it's shared by every "Principles of ___" roleplay event
 * (Marketing, Finance, Business Management and Administration,
 * Entrepreneurship, Hospitality and Tourism), so those students couldn't
 * open an exam at all ("No questions are available for this exam yet.").
 *
 * Published immediately (isActive: true) rather than left for mentor
 * review, matching how the other bulk-authored (non-PDF-sourced) content in
 * this app — case studies, flashcards — gets published directly. Idempotent
 * by (examBankId, stem) — safe to re-run.
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/seed-bac-exam-questions.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { BAC_QUESTION_SEED } from "@/lib/bac-exam-seed-data";
import { getOrCreateGlobalInstructionalArea } from "@/lib/dal/instructional-areas";

const SOURCE_EXAM = "Diamond Drills Business Administration Core Question Set";

async function main() {
  const examBank = await prisma.examBank.findUnique({
    where: { slug: "business-administration-core" },
  });
  if (!examBank) {
    console.error("No business-administration-core exam bank found — check seed-data.ts.");
    process.exitCode = 1;
    return;
  }

  const existing = await prisma.question.findMany({
    where: { examBankId: examBank.id },
    select: { stem: true },
  });
  const existingStems = new Set(existing.map((q) => q.stem));
  const toCreate = BAC_QUESTION_SEED.filter((q) => !existingStems.has(q.stem));

  const areaCache = new Map<string, string>();
  async function areaIdFor(code: string): Promise<string> {
    let id = areaCache.get(code);
    if (!id) {
      const area = await getOrCreateGlobalInstructionalArea(code);
      id = area.id;
      areaCache.set(code, id);
    }
    return id;
  }

  let numberInSource = existing.length;
  for (const q of toCreate) {
    numberInSource += 1;
    await prisma.question.create({
      data: {
        examBankId: examBank.id,
        sourceExam: SOURCE_EXAM,
        sourceYear: 2026,
        numberInSource,
        stem: q.stem,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctOption: q.correctOption,
        instructionalAreaId: await areaIdFor(q.code),
        explanation: q.explanation,
        isActive: true,
      },
    });
  }

  console.log(
    `business-administration-core: ${toCreate.length} created, ${existing.length} already present (${BAC_QUESTION_SEED.length} total in seed data).`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
