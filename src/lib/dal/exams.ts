import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getExamBanks = cache(async () => {
  return prisma.examBank.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { questions: { where: { isActive: true } } } },
    },
  });
});

export const getExamBank = cache(async (examBankId: string) => {
  return prisma.examBank.findUnique({ where: { id: examBankId } });
});

/** Distinct source exams with a pending (unreviewed) import batch for a bank. */
export const getPendingImportBatches = cache(async (examBankId: string) => {
  const pending = await prisma.question.findMany({
    where: { examBankId, isActive: false },
    select: { sourceExam: true },
    distinct: ["sourceExam"],
  });
  return pending.map((p) => p.sourceExam);
});

export const getPendingQuestions = cache(async (examBankId: string, sourceExam: string) => {
  return prisma.question.findMany({
    where: { examBankId, isActive: false, sourceExam },
    include: { instructionalArea: true },
    orderBy: { numberInSource: "asc" },
  });
});

export const getPublishedQuestionCount = cache(async (examBankId: string) => {
  return prisma.question.count({ where: { examBankId, isActive: true } });
});

export const getInstructionalAreas = cache(async () => {
  return prisma.instructionalArea.findMany({ orderBy: { name: "asc" } });
});
