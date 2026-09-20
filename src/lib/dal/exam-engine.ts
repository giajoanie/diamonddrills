import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

/** Exam banks reachable from the student's current, exam-bearing events. */
export const getStudentExamBanks = cache(async (userId: string) => {
  const enrollments = await prisma.eventEnrollment.findMany({
    where: { userId, isCurrent: true, event: { hasExam: true, examBankId: { not: null } } },
    include: { event: { include: { examBank: true } } },
  });

  const banks = new Map<string, { id: string; name: string }>();
  for (const e of enrollments) {
    if (e.event.examBank) banks.set(e.event.examBank.id, e.event.examBank);
  }
  return [...banks.values()];
});

export const getInstructionalAreasForBank = cache(async () => {
  // Instructional areas are global (see DECISIONS.md), so this just lists all of them.
  return prisma.instructionalArea.findMany({ orderBy: { name: "asc" } });
});

export const getExistingBaselineAttempt = cache(async (userId: string, examBankId: string) => {
  return prisma.examAttempt.findFirst({
    where: { userId, examBankId, isBaseline: true },
  });
});

/** Full attempt with ownership fields only — callers must still verify userId. */
export const getAttemptForTaking = cache(async (attemptId: string) => {
  return prisma.examAttempt.findUnique({
    where: { id: attemptId },
    include: {
      questions: {
        orderBy: { orderIndex: "asc" },
        include: {
          question: {
            select: {
              id: true,
              stem: true,
              optionA: true,
              optionB: true,
              optionC: true,
              optionD: true,
              // correctOption and explanation are deliberately excluded here
            },
          },
        },
      },
    },
  });
});

export const getAttemptForResults = cache(async (attemptId: string) => {
  return prisma.examAttempt.findUnique({
    where: { id: attemptId },
    include: {
      questions: {
        orderBy: { orderIndex: "asc" },
        include: {
          question: { include: { instructionalArea: true } },
        },
      },
    },
  });
});

export const getScoreHistory = cache(async (userId: string, examBankId?: string) => {
  return prisma.examAttempt.findMany({
    where: {
      userId,
      status: { in: ["SUBMITTED", "AUTO_SUBMITTED"] },
      ...(examBankId ? { examBankId } : {}),
    },
    orderBy: { submittedAt: "asc" },
    select: {
      id: true,
      submittedAt: true,
      percentage: true,
      isBaseline: true,
      examBankId: true,
      mode: true,
    },
  });
});

/**
 * Per-attempt question results (oldest attempt first), for weighted
 * weak-area analytics and personal-record streaks — both need the same
 * underlying data, so this is fetched once and shaped differently by callers.
 */
export const getAttemptQuestionHistory = cache(async (userId: string) => {
  const attempts = await prisma.examAttempt.findMany({
    where: { userId, status: { in: ["SUBMITTED", "AUTO_SUBMITTED"] } },
    orderBy: { submittedAt: "asc" },
    include: {
      questions: {
        orderBy: { orderIndex: "asc" },
        include: { question: { select: { instructionalArea: { select: { name: true } } } } },
      },
    },
  });

  return attempts.map((attempt) => ({
    attemptId: attempt.id,
    submittedAt: attempt.submittedAt,
    percentage: attempt.percentage,
    questions: attempt.questions.map((q) => ({
      areaName: q.question.instructionalArea?.name ?? "Uncategorized",
      isCorrect: q.isCorrect ?? false,
    })),
  }));
});

export const getMissedQuestionCount = cache(async (userId: string) => {
  return prisma.missedQuestion.count({ where: { userId, isMastered: false } });
});

/** Missed questions actually due for spaced-repetition review right now (see spaced-repetition.ts). */
export const getDueMissedQuestionCount = cache(async (userId: string) => {
  return prisma.missedQuestion.count({
    where: { userId, isMastered: false, nextDueAt: { lte: new Date() } },
  });
});
