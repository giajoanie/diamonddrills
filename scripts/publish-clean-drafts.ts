/**
 * One-off/rerunnable: publishes draft questions whose only reason for
 * sitting as drafts was an unrecognized instructional area code that has
 * since been added to INSTRUCTIONAL_AREA_CODE_NAMES. Mirrors the mentor
 * "Publish all complete" action (publishAllComplete in
 * src/lib/actions/exam-import.ts) but runs from the CLI for a batch of
 * (examBankSlug, sourceExam) pairs instead of requiring a mentor click
 * through the UI for each one.
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/publish-clean-drafts.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";

const TARGETS: { examBankSlug: string; sourceExam: string }[] = [
  { examBankSlug: "marketing", sourceExam: "2021 Marketing Sample Exam" },
  {
    examBankSlug: "business-management-administration",
    sourceExam: "2018 Business Management and Administration Sample Exam",
  },
  { examBankSlug: "entrepreneurship", sourceExam: "2017 Entrepreneurship Sample Exam" },
  { examBankSlug: "entrepreneurship", sourceExam: "2019 Entrepreneurship Sample Exam" },
  { examBankSlug: "entrepreneurship", sourceExam: "2022 Entrepreneurship State Exam" },
];

async function main() {
  for (const t of TARGETS) {
    const bank = await prisma.examBank.findUniqueOrThrow({ where: { slug: t.examBankSlug } });
    const result = await prisma.question.updateMany({
      where: {
        examBankId: bank.id,
        sourceExam: t.sourceExam,
        isActive: false,
        correctOption: { not: null },
        NOT: [{ stem: "" }, { optionA: "" }, { optionB: "" }, { optionC: "" }, { optionD: "" }],
      },
      data: { isActive: true },
    });
    console.log(`${t.examBankSlug} / ${t.sourceExam} -> ${result.count} published`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
