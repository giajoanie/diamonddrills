import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { isAssignmentVisibleToStudent } from "@/lib/assignments/visibility";
import { computeAreaBreakdown } from "@/lib/exam-engine/scoring";
import {
  computeScoreChangeVsBaseline,
  computeAssignmentCompletionRate,
  computeRubricScoreImprovement,
  computePracticeSessionsPerWeek,
  computeResourceUsageByType,
  identifyNeedsAttention,
} from "@/lib/analytics/kpis";
import { generateLessonPlanRecommendations } from "@/lib/analytics/lesson-plan";

export type DashboardFilters = {
  grade?: number;
  clusterId?: string;
  eventId?: string;
  dateFrom?: Date;
  dateTo?: Date;
};

const PRACTICE_MODES = ["PRACTICE_BY_AREA", "MISSED_QUESTION_REVIEW"] as const;
const INACTIVE_DAYS = 14;
const DECLINING_THRESHOLD = 5;
const LOW_SCORE_THRESHOLD = 60;

/** Shared cohort resolution for every filterable mentor analytics view. */
async function resolveCohort(filters: DashboardFilters) {
  const students = await prisma.user.findMany({
    where: {
      role: "STUDENT",
      ...(filters.grade ? { grade: filters.grade } : {}),
      ...(filters.clusterId || filters.eventId
        ? {
            enrollments: {
              some: {
                isCurrent: true,
                ...(filters.eventId ? { eventId: filters.eventId } : {}),
                ...(filters.clusterId ? { event: { clusterId: filters.clusterId } } : {}),
              },
            },
          }
        : {}),
    },
    include: {
      enrollments: {
        where: { isCurrent: true },
        include: { event: { select: { id: true, clusterId: true } } },
      },
    },
  });

  const studentIds = students.map((s) => s.id);
  const contextByStudent = new Map(
    students.map((s) => [
      s.id,
      {
        grade: s.grade,
        currentEventIds: s.enrollments.map((e) => e.eventId),
        currentClusterIds: [...new Set(s.enrollments.map((e) => e.event.clusterId))],
      },
    ]),
  );

  return { students, studentIds, contextByStudent };
}

export const getMentorDashboardData = cache(async (filters: DashboardFilters) => {
  const now = new Date();
  const dateFrom = filters.dateFrom ?? new Date(0);
  const dateTo = filters.dateTo ?? now;

  const { students, studentIds, contextByStudent } = await resolveCohort(filters);
  const activeStudentCount = students.filter((s) => s.isActive).length;

  if (studentIds.length === 0) {
    return {
      activeStudentCount: 0,
      totalStudentCount: 0,
      studentsWithoutBaseline: 0,
      practiceSessionsPerStudentPerWeek: 0,
      scoreVsBaseline: { avgBaseline: 0, avgLatest: 0, avgChange: 0, studentCount: 0 },
      scoreVsBaselineByCluster: [] as { clusterId: string; clusterName: string; avgBaseline: number; avgLatest: number; avgChange: number; studentCount: number }[],
      weakestAreas: [] as ReturnType<typeof computeAreaBreakdown>,
      needsAttention: [] as ReturnType<typeof identifyNeedsAttention>,
      ungradedSubmissionsCount: 0,
      assignmentCompletion: { completionRate: 0, onTimeRate: 0, sampleSize: 0 },
      rubricImprovement: [] as ReturnType<typeof computeRubricScoreImprovement>,
      resourceUsageByType: {} as Record<string, number>,
    };
  }

  const attempts = await prisma.examAttempt.findMany({
    where: { userId: { in: studentIds }, status: { in: ["SUBMITTED", "AUTO_SUBMITTED"] } },
    orderBy: { submittedAt: "asc" },
    select: { userId: true, isBaseline: true, percentage: true },
  });

  const baselineByStudent = new Map<string, number>();
  const latestByStudent = new Map<string, number>();
  for (const a of attempts) {
    if (a.percentage === null) continue;
    if (a.isBaseline) baselineByStudent.set(a.userId, a.percentage);
    else latestByStudent.set(a.userId, a.percentage); // ordered asc, so last write wins = latest
  }

  const scoreVsBaseline = computeScoreChangeVsBaseline(
    studentIds.map((id) => ({
      baselinePercentage: baselineByStudent.get(id) ?? null,
      latestPercentage: latestByStudent.get(id) ?? null,
    })),
  );

  const clusters = await prisma.cluster.findMany({ orderBy: { name: "asc" } });
  const scoreVsBaselineByCluster = clusters
    .map((c) => {
      const ids = studentIds.filter((id) => contextByStudent.get(id)!.currentClusterIds.includes(c.id));
      const result = computeScoreChangeVsBaseline(
        ids.map((id) => ({
          baselinePercentage: baselineByStudent.get(id) ?? null,
          latestPercentage: latestByStudent.get(id) ?? null,
        })),
      );
      return { clusterId: c.id, clusterName: c.name, ...result };
    })
    .filter((c) => c.studentCount > 0);

  const studentsWithoutBaseline = studentIds.filter((id) => !baselineByStudent.has(id)).length;

  const practiceSessionsCount = await prisma.examAttempt.count({
    where: {
      userId: { in: studentIds },
      mode: { in: [...PRACTICE_MODES] },
      createdAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
    },
  });
  const practiceSessionsPerStudentPerWeek = computePracticeSessionsPerWeek(
    practiceSessionsCount,
    studentIds.length,
    7,
  );

  // Chapter-wide weakest instructional areas, from all submitted attempts in range.
  const questionResults = await prisma.examAttemptQuestion.findMany({
    where: {
      examAttempt: {
        userId: { in: studentIds },
        status: { in: ["SUBMITTED", "AUTO_SUBMITTED"] },
        submittedAt: { gte: dateFrom, lte: dateTo },
      },
    },
    select: {
      isCorrect: true,
      question: { select: { instructionalArea: { select: { name: true } } } },
    },
  });
  const weakestAreas = computeAreaBreakdown(
    questionResults.map((q) => ({
      areaName: q.question.instructionalArea?.name ?? null,
      isCorrect: q.isCorrect ?? false,
    })),
  );

  // Assignment completion/on-time rate, resolved against each assignment's actual target audience.
  const assignments = await prisma.assignment.findMany({
    where: { isActive: true, dueAt: { gte: dateFrom, lte: dateTo } },
    include: {
      targets: true,
      submissions: { where: { userId: { in: studentIds } }, select: { userId: true, isLate: true } },
      examAttempts: {
        where: { userId: { in: studentIds }, status: { not: "IN_PROGRESS" } },
        select: { userId: true },
      },
    },
  });
  const completionEntries: { status: string; isLate: boolean }[] = [];
  for (const a of assignments) {
    const eligibleIds = studentIds.filter((id) =>
      isAssignmentVisibleToStudent(a.targets, { userId: id, ...contextByStudent.get(id)! }),
    );
    if (a.type === "EXAM") {
      const completedIds = new Set(a.examAttempts.map((e) => e.userId));
      for (const id of eligibleIds) {
        completionEntries.push({ status: completedIds.has(id) ? "SUBMITTED" : "NOT_STARTED", isLate: false });
      }
    } else {
      const submissionByUser = new Map(a.submissions.map((s) => [s.userId, s.isLate]));
      for (const id of eligibleIds) {
        const isLate = submissionByUser.get(id);
        completionEntries.push({
          status: submissionByUser.has(id) ? "SUBMITTED" : "NOT_STARTED",
          isLate: isLate ?? false,
        });
      }
    }
  }
  const assignmentCompletion = {
    ...computeAssignmentCompletionRate(completionEntries),
    sampleSize: completionEntries.length,
  };

  const rubricScores = await prisma.rubricScore.findMany({
    where: { scoredAt: { gte: dateFrom, lte: dateTo }, submission: { userId: { in: studentIds } } },
    select: { score: true, scoredAt: true, criterion: { select: { name: true, maxPoints: true } } },
  });
  const rubricImprovement = computeRubricScoreImprovement(
    rubricScores.map((r) => ({
      criterionName: r.criterion.name,
      score: r.score,
      maxPoints: r.criterion.maxPoints,
      scoredAt: r.scoredAt,
    })),
  );

  const resourceOpens = await prisma.activityLog.findMany({
    where: { type: "RESOURCE_OPEN", userId: { in: studentIds }, createdAt: { gte: dateFrom, lte: dateTo } },
    select: { metadata: true },
  });
  const openedResourceIds = resourceOpens
    .map((o) => (o.metadata as { resourceId?: string } | null)?.resourceId)
    .filter((id): id is string => !!id);
  const resources = await prisma.resource.findMany({
    where: { id: { in: openedResourceIds } },
    select: { id: true, type: true },
  });
  const resourceTypeById = new Map(resources.map((r) => [r.id, r.type]));
  const resourceUsageByType = computeResourceUsageByType(
    openedResourceIds.map((id) => ({ resourceType: resourceTypeById.get(id) ?? "OTHER" })),
  );

  const lastActivity = await prisma.activityLog.groupBy({
    by: ["userId"],
    where: { userId: { in: studentIds } },
    _max: { createdAt: true },
  });
  const lastActiveByStudent = new Map(lastActivity.map((a) => [a.userId, a._max.createdAt]));

  const needsAttention = identifyNeedsAttention(
    studentIds.map((id) => {
      const baseline = baselineByStudent.get(id) ?? null;
      const latest = latestByStudent.get(id) ?? null;
      return {
        userId: id,
        lastActiveAt: lastActiveByStudent.get(id) ?? null,
        scoreChange: baseline !== null && latest !== null ? latest - baseline : null,
        latestPercentage: latest,
      };
    }),
    {
      now,
      inactiveDays: INACTIVE_DAYS,
      decliningThreshold: DECLINING_THRESHOLD,
      lowScoreThreshold: LOW_SCORE_THRESHOLD,
    },
  );

  const ungradedSubmissionsCount = await prisma.submission.count({
    where: { status: { in: ["SUBMITTED", "LATE"] }, userId: { in: studentIds } },
  });

  return {
    activeStudentCount,
    totalStudentCount: studentIds.length,
    studentsWithoutBaseline,
    practiceSessionsPerStudentPerWeek,
    scoreVsBaseline,
    scoreVsBaselineByCluster,
    weakestAreas,
    needsAttention,
    ungradedSubmissionsCount,
    assignmentCompletion,
    rubricImprovement,
    resourceUsageByType,
  };
});

export const getLessonPlanRecommendations = cache(async (filters: DashboardFilters, topN = 3) => {
  const { studentIds } = await resolveCohort(filters);
  if (studentIds.length === 0) return [];

  const questionResults = await prisma.examAttemptQuestion.findMany({
    where: {
      examAttempt: { userId: { in: studentIds }, status: { in: ["SUBMITTED", "AUTO_SUBMITTED"] } },
    },
    select: {
      isCorrect: true,
      examAttempt: { select: { userId: true } },
      question: { select: { instructionalArea: { select: { id: true, name: true } } } },
    },
  });

  const chapterWeakAreas = computeAreaBreakdown(
    questionResults.map((q) => ({
      areaName: q.question.instructionalArea?.name ?? null,
      isCorrect: q.isCorrect ?? false,
    })),
  ).filter((a) => a.areaName !== "Uncategorized");

  const areaIdByName = new Map<string, string>();
  const perStudentPerArea = new Map<string, Map<string, { correct: number; total: number }>>();
  for (const q of questionResults) {
    const area = q.question.instructionalArea;
    if (!area) continue;
    areaIdByName.set(area.name, area.id);

    const byArea = perStudentPerArea.get(area.id) ?? new Map();
    const entry = byArea.get(q.examAttempt.userId) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (q.isCorrect) entry.correct += 1;
    byArea.set(q.examAttempt.userId, entry);
    perStudentPerArea.set(area.id, byArea);
  }

  const weakAreasWithIds = chapterWeakAreas
    .map((a) => ({ areaId: areaIdByName.get(a.areaName), areaName: a.areaName, accuracy: a.accuracy }))
    .filter((a): a is { areaId: string; areaName: string; accuracy: number } => !!a.areaId);

  const areaIds = weakAreasWithIds.slice(0, topN).map((a) => a.areaId);

  const taggedResources = await prisma.resourceInstructionalArea.findMany({
    where: { instructionalAreaId: { in: areaIds }, resource: { isActive: true } },
    select: { instructionalAreaId: true, resourceId: true },
  });
  const resourceIdsByArea: Record<string, string[]> = {};
  for (const r of taggedResources) {
    (resourceIdsByArea[r.instructionalAreaId] ??= []).push(r.resourceId);
  }

  const studentAccuracyByArea: Record<string, { userId: string; accuracy: number }[]> = {};
  for (const areaId of areaIds) {
    const byStudent = perStudentPerArea.get(areaId) ?? new Map();
    studentAccuracyByArea[areaId] = [...byStudent.entries()].map(([userId, { correct, total }]) => ({
      userId,
      accuracy: total > 0 ? (correct / total) * 100 : 0,
    }));
  }

  return generateLessonPlanRecommendations(weakAreasWithIds, resourceIdsByArea, studentAccuracyByArea, topN);
});

export const getUngradedSubmissionsQueue = cache(async () => {
  return prisma.submission.findMany({
    where: { status: { in: ["SUBMITTED", "LATE"] } },
    include: {
      user: { select: { firstName: true, schoolId: true } },
      assignment: { select: { title: true } },
    },
    orderBy: { submittedAt: "asc" },
  });
});

export const getStudentNamesByIds = cache(async (userIds: string[]) => {
  const students = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, firstName: true, schoolId: true },
  });
  return new Map(students.map((s) => [s.id, s]));
});

export const getResourceNamesByIds = cache(async (resourceIds: string[]) => {
  const resources = await prisma.resource.findMany({
    where: { id: { in: resourceIds } },
    select: { id: true, name: true },
  });
  return new Map(resources.map((r) => [r.id, r.name]));
});
