/**
 * Lesson-plan generator improvement: classifies whether an instructional
 * area's accuracy is improving, declining, or stable by comparing the
 * earlier half of a chronologically-ordered result set against the later
 * half, so mentor recommendations can say more than a single flat
 * percentage ("declining further" vs. "already recovering").
 */
export type AreaTrend = "improving" | "declining" | "stable";

const STABLE_THRESHOLD_POINTS = 5;

export function computeAreaTrend(chronologicalIsCorrect: boolean[]): AreaTrend {
  if (chronologicalIsCorrect.length < 4) return "stable";

  const midpoint = Math.floor(chronologicalIsCorrect.length / 2);
  const earlier = chronologicalIsCorrect.slice(0, midpoint);
  const later = chronologicalIsCorrect.slice(midpoint);

  const earlierAccuracy = (earlier.filter(Boolean).length / earlier.length) * 100;
  const laterAccuracy = (later.filter(Boolean).length / later.length) * 100;
  const change = laterAccuracy - earlierAccuracy;

  if (change > STABLE_THRESHOLD_POINTS) return "improving";
  if (change < -STABLE_THRESHOLD_POINTS) return "declining";
  return "stable";
}
