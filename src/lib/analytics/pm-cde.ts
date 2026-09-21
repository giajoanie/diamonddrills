/**
 * PM CDE Impact Dashboard (spec §11, Tier 3 / §10 PM CDE Reporting): beyond
 * the mentor dashboard's chapter-wide before/after averages, this answers
 * the question a Project Management CDE report actually needs to make —
 * does using the platform correlate with improvement and better outcomes?
 */

export type EngagementBucket = "low" | "medium" | "high";

export type StudentEngagementRecord = {
  practiceActivityCount: number;
  scoreChange: number | null; // latest baseline-comparable percentage minus baseline; null if not yet measurable
  advanced: boolean | null; // null = no competition result recorded yet for this student
};

// Somewhat arbitrary but reasonable bands for a chapter-scale cohort: under
// one practice activity a week over a month counts as "low," roughly 2+ a
// week as "high."
const LOW_MEDIUM_BOUNDARY = 3;
const MEDIUM_HIGH_BOUNDARY = 8;

export function bucketByEngagement(practiceActivityCount: number): EngagementBucket {
  if (practiceActivityCount < LOW_MEDIUM_BOUNDARY) return "low";
  if (practiceActivityCount < MEDIUM_HIGH_BOUNDARY) return "medium";
  return "high";
}

export type EngagementImprovementRow = { bucket: EngagementBucket; studentCount: number; avgScoreChange: number };

/** Average score change vs. baseline, grouped by how much a student has practiced. */
export function computeEngagementVsImprovement(students: StudentEngagementRecord[]): EngagementImprovementRow[] {
  const buckets: Record<EngagementBucket, { sum: number; measured: number; total: number }> = {
    low: { sum: 0, measured: 0, total: 0 },
    medium: { sum: 0, measured: 0, total: 0 },
    high: { sum: 0, measured: 0, total: 0 },
  };

  for (const s of students) {
    const bucket = bucketByEngagement(s.practiceActivityCount);
    buckets[bucket].total++;
    if (s.scoreChange !== null) {
      buckets[bucket].sum += s.scoreChange;
      buckets[bucket].measured++;
    }
  }

  return (["low", "medium", "high"] as const)
    .map((bucket) => ({
      bucket,
      studentCount: buckets[bucket].total,
      avgScoreChange: buckets[bucket].measured > 0 ? buckets[bucket].sum / buckets[bucket].measured : 0,
    }))
    .filter((b) => b.studentCount > 0);
}

export type OutcomesRow = { bucket: EngagementBucket; studentCount: number; advancementRate: number };

/** Competition advancement rate, grouped by how much a student has practiced. */
export function computeOutcomesByEngagement(students: StudentEngagementRecord[]): OutcomesRow[] {
  const buckets: Record<EngagementBucket, { advanced: number; withResult: number; total: number }> = {
    low: { advanced: 0, withResult: 0, total: 0 },
    medium: { advanced: 0, withResult: 0, total: 0 },
    high: { advanced: 0, withResult: 0, total: 0 },
  };

  for (const s of students) {
    const bucket = bucketByEngagement(s.practiceActivityCount);
    buckets[bucket].total++;
    if (s.advanced !== null) {
      buckets[bucket].withResult++;
      if (s.advanced) buckets[bucket].advanced++;
    }
  }

  return (["low", "medium", "high"] as const)
    .map((bucket) => ({
      bucket,
      studentCount: buckets[bucket].total,
      advancementRate: buckets[bucket].withResult > 0 ? (buckets[bucket].advanced / buckets[bucket].withResult) * 100 : 0,
    }))
    .filter((b) => b.studentCount > 0);
}
