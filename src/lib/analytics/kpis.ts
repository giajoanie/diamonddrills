/**
 * Chapter-level KPI calculations (spec §10.1), kept as plain functions over
 * already-fetched data so they're unit-testable without a database. Callers
 * in src/lib/dal/analytics.ts fetch the raw rows and shape them into these
 * input types.
 */

export function computeScoreChangeVsBaseline(
  students: { baselinePercentage: number | null; latestPercentage: number | null }[],
): { avgBaseline: number; avgLatest: number; avgChange: number; studentCount: number } {
  const withBoth = students.filter(
    (s): s is { baselinePercentage: number; latestPercentage: number } =>
      s.baselinePercentage !== null && s.latestPercentage !== null,
  );
  if (withBoth.length === 0) return { avgBaseline: 0, avgLatest: 0, avgChange: 0, studentCount: 0 };

  const avgBaseline = withBoth.reduce((sum, s) => sum + s.baselinePercentage, 0) / withBoth.length;
  const avgLatest = withBoth.reduce((sum, s) => sum + s.latestPercentage, 0) / withBoth.length;
  return { avgBaseline, avgLatest, avgChange: avgLatest - avgBaseline, studentCount: withBoth.length };
}

export function computeAssignmentCompletionRate(
  assignments: { status: string; isLate: boolean }[],
): { completionRate: number; onTimeRate: number } {
  if (assignments.length === 0) return { completionRate: 0, onTimeRate: 0 };

  const completed = assignments.filter((a) => a.status !== "NOT_STARTED");
  const completionRate = (completed.length / assignments.length) * 100;
  const onTimeRate = completed.length > 0
    ? (completed.filter((a) => !a.isLate).length / completed.length) * 100
    : 0;

  return { completionRate, onTimeRate };
}

export type RubricScorePoint = { criterionName: string; score: number; maxPoints: number; scoredAt: Date };

/** First-vs-latest percentage-of-max change per criterion, chronologically ordered. */
export function computeRubricScoreImprovement(
  scores: RubricScorePoint[],
): { criterionName: string; firstPct: number; latestPct: number; change: number }[] {
  const byCriterion = new Map<string, RubricScorePoint[]>();
  for (const s of scores) {
    const list = byCriterion.get(s.criterionName) ?? [];
    list.push(s);
    byCriterion.set(s.criterionName, list);
  }

  const results: { criterionName: string; firstPct: number; latestPct: number; change: number }[] = [];
  for (const [criterionName, list] of byCriterion) {
    if (list.length === 0) continue;
    const sorted = [...list].sort((a, b) => a.scoredAt.getTime() - b.scoredAt.getTime());
    const first = sorted[0];
    const latest = sorted[sorted.length - 1];
    const firstPct = first.maxPoints > 0 ? (first.score / first.maxPoints) * 100 : 0;
    const latestPct = latest.maxPoints > 0 ? (latest.score / latest.maxPoints) * 100 : 0;
    results.push({ criterionName, firstPct, latestPct, change: latestPct - firstPct });
  }
  return results;
}

/** Average practice-mode exam sessions per student per week, over the given window. */
export function computePracticeSessionsPerWeek(
  practiceStarts: { userId: string }[],
  studentCount: number,
  windowDays: number,
): number {
  if (studentCount === 0 || windowDays <= 0) return 0;
  const weeks = windowDays / 7;
  return practiceStarts.length / studentCount / weeks;
}

export function computeResourceUsageByType(opens: { resourceType: string }[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const o of opens) {
    counts[o.resourceType] = (counts[o.resourceType] ?? 0) + 1;
  }
  return counts;
}

export type NeedsAttentionReason = "INACTIVE" | "DECLINING" | "BELOW_THRESHOLD";

export type StudentAttentionInput = {
  userId: string;
  lastActiveAt: Date | null;
  scoreChange: number | null;
  latestPercentage: number | null;
};

export type NeedsAttentionOptions = {
  now: Date;
  inactiveDays: number;
  decliningThreshold: number;
  lowScoreThreshold: number;
};

/** Flags students who are inactive, declining, or below a score threshold (spec §9.2). */
export function identifyNeedsAttention(
  students: StudentAttentionInput[],
  options: NeedsAttentionOptions,
): { userId: string; reasons: NeedsAttentionReason[] }[] {
  const { now, inactiveDays, decliningThreshold, lowScoreThreshold } = options;
  const inactiveMs = inactiveDays * 24 * 60 * 60 * 1000;

  return students
    .map((s) => {
      const reasons: NeedsAttentionReason[] = [];
      if (!s.lastActiveAt || now.getTime() - s.lastActiveAt.getTime() > inactiveMs) {
        reasons.push("INACTIVE");
      }
      if (s.scoreChange !== null && s.scoreChange < -decliningThreshold) {
        reasons.push("DECLINING");
      }
      if (s.latestPercentage !== null && s.latestPercentage < lowScoreThreshold) {
        reasons.push("BELOW_THRESHOLD");
      }
      return { userId: s.userId, reasons };
    })
    .filter((s) => s.reasons.length > 0);
}
