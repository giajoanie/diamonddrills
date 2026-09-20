/**
 * Mirrors how rubric criteria/scores are rendered on the mentor grading page
 * and the student assignment detail page — kept as a plain function so the
 * total is unit-testable without a database.
 */
export function computeRubricTotal(
  scores: { score: number }[],
  criteria: { maxPoints: number }[],
): { earned: number; possible: number } {
  return {
    earned: scores.reduce((sum, s) => sum + s.score, 0),
    possible: criteria.reduce((sum, c) => sum + c.maxPoints, 0),
  };
}
