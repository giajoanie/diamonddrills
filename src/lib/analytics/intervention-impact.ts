/**
 * Connects a logged intervention to the student's score trend around it
 * (spec Tier 2 "intervention tracking... so later score changes can be
 * connected to them"): average exam percentage before vs. at-or-after the
 * intervention's timestamp.
 */
export type ExamPercentagePoint = { submittedAt: Date; percentage: number };

export type InterventionImpact = {
  beforeAvg: number | null;
  afterAvg: number | null;
  change: number | null;
  beforeCount: number;
  afterCount: number;
};

function average(values: number[]): number | null {
  return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : null;
}

export function computeInterventionImpact(
  interventionAt: Date,
  attempts: ExamPercentagePoint[],
): InterventionImpact {
  const before = attempts.filter((a) => a.submittedAt.getTime() < interventionAt.getTime());
  const after = attempts.filter((a) => a.submittedAt.getTime() >= interventionAt.getTime());

  const beforeAvg = average(before.map((a) => a.percentage));
  const afterAvg = average(after.map((a) => a.percentage));

  return {
    beforeAvg,
    afterAvg,
    change: beforeAvg !== null && afterAvg !== null ? afterAvg - beforeAvg : null,
    beforeCount: before.length,
    afterCount: after.length,
  };
}
