import "server-only";
import { prisma } from "@/lib/prisma";

export type ExportDateRange = { dateFrom: Date; dateTo: Date };

export async function getStudentsExportRows() {
  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    select: { id: true, schoolId: true, firstName: true, grade: true, isActive: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  return students.map((s) => ({
    id: s.id,
    schoolId: s.schoolId,
    firstName: s.firstName,
    grade: s.grade,
    isActive: s.isActive ? "true" : "false",
    createdAt: s.createdAt.toISOString(),
  }));
}

export async function getExamAttemptsExportRows({ dateFrom, dateTo }: ExportDateRange) {
  const attempts = await prisma.examAttempt.findMany({
    where: { submittedAt: { gte: dateFrom, lte: dateTo } },
    include: { user: { select: { id: true, schoolId: true } }, examBank: { select: { name: true } } },
    orderBy: { submittedAt: "asc" },
  });
  return attempts.map((a) => ({
    attemptId: a.id,
    studentId: a.user.id,
    schoolId: a.user.schoolId,
    examBank: a.examBank.name,
    mode: a.mode,
    isBaseline: a.isBaseline ? "true" : "false",
    score: a.score,
    percentage: a.percentage,
    submittedAt: a.submittedAt?.toISOString() ?? "",
    timeUsedSeconds: a.timeUsedSeconds,
  }));
}

export async function getQuestionResponsesExportRows({ dateFrom, dateTo }: ExportDateRange) {
  const responses = await prisma.examAttemptQuestion.findMany({
    where: { examAttempt: { submittedAt: { gte: dateFrom, lte: dateTo } } },
    include: {
      examAttempt: { select: { id: true, user: { select: { id: true, schoolId: true } } } },
      question: { select: { instructionalArea: { select: { name: true } } } },
    },
    orderBy: { answeredAt: "asc" },
  });
  return responses.map((r) => ({
    attemptId: r.examAttempt.id,
    studentId: r.examAttempt.user.id,
    schoolId: r.examAttempt.user.schoolId,
    questionId: r.questionId,
    instructionalArea: r.question.instructionalArea?.name ?? "Uncategorized",
    studentAnswer: r.studentAnswer ?? "",
    isCorrect: r.isCorrect === null ? "" : r.isCorrect ? "true" : "false",
    answeredAt: r.answeredAt?.toISOString() ?? "",
  }));
}

export async function getInstructionalAreaResultsExportRows({ dateFrom, dateTo }: ExportDateRange) {
  const responses = await prisma.examAttemptQuestion.findMany({
    where: { examAttempt: { submittedAt: { gte: dateFrom, lte: dateTo } } },
    select: {
      isCorrect: true,
      examAttempt: { select: { user: { select: { id: true, schoolId: true } } } },
      question: { select: { instructionalArea: { select: { name: true } } } },
    },
  });

  const byStudentArea = new Map<string, { schoolId: string; areaName: string; correct: number; total: number }>();
  for (const r of responses) {
    const areaName = r.question.instructionalArea?.name ?? "Uncategorized";
    const key = `${r.examAttempt.user.id}::${areaName}`;
    const entry = byStudentArea.get(key) ?? {
      schoolId: r.examAttempt.user.schoolId,
      areaName,
      correct: 0,
      total: 0,
    };
    entry.total += 1;
    if (r.isCorrect) entry.correct += 1;
    byStudentArea.set(key, entry);
  }

  return [...byStudentArea.entries()].map(([key, v]) => ({
    studentId: key.split("::")[0],
    schoolId: v.schoolId,
    instructionalArea: v.areaName,
    correct: v.correct,
    total: v.total,
    accuracy: v.total > 0 ? Math.round((v.correct / v.total) * 1000) / 10 : 0,
  }));
}

export async function getRubricScoresExportRows({ dateFrom, dateTo }: ExportDateRange) {
  const scores = await prisma.rubricScore.findMany({
    where: { scoredAt: { gte: dateFrom, lte: dateTo }, submissionId: { not: null } },
    include: {
      criterion: { select: { name: true, maxPoints: true } },
      submission: {
        select: {
          user: { select: { id: true, schoolId: true } },
          assignment: { select: { title: true } },
        },
      },
      scoredBy: { select: { firstName: true } },
    },
    orderBy: { scoredAt: "asc" },
  });
  return scores
    .filter((s) => s.submission !== null)
    .map((s) => ({
      studentId: s.submission!.user.id,
      schoolId: s.submission!.user.schoolId,
      assignment: s.submission!.assignment.title,
      criterion: s.criterion.name,
      score: s.score,
      maxPoints: s.criterion.maxPoints,
      scoredBy: s.scoredBy.firstName,
      scoredAt: s.scoredAt.toISOString(),
    }));
}

export async function getActivityLogsExportRows({ dateFrom, dateTo }: ExportDateRange) {
  const logs = await prisma.activityLog.findMany({
    where: { createdAt: { gte: dateFrom, lte: dateTo } },
    include: { user: { select: { id: true, schoolId: true } } },
    orderBy: { createdAt: "asc" },
  });
  return logs.map((l) => ({
    studentId: l.user.id,
    schoolId: l.user.schoolId,
    type: l.type,
    metadata: l.metadata ? JSON.stringify(l.metadata) : "",
    createdAt: l.createdAt.toISOString(),
  }));
}

export async function getCompetitionResultsExportRows({ dateFrom, dateTo }: ExportDateRange) {
  const results = await prisma.competitionResult.findMany({
    where: { createdAt: { gte: dateFrom, lte: dateTo } },
    include: { user: { select: { id: true, schoolId: true } }, event: { select: { name: true } } },
    orderBy: { createdAt: "asc" },
  });
  return results.map((r) => ({
    studentId: r.user.id,
    schoolId: r.user.schoolId,
    event: r.event.name,
    year: r.year,
    level: r.level,
    placement: r.placement,
    testScore: r.testScore,
    roleplayScore: r.roleplayScore,
    presentationScore: r.presentationScore,
    advanced: r.advanced ? "true" : "false",
    notes: r.notes ?? "",
  }));
}
