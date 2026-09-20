/**
 * Simple Leitner-style spaced repetition for the missed-question queue:
 * a correct-streak of 0/1/2 reviews again in 1/3/7 days respectively, and a
 * streak of 3+ is mastered (spec Tier 2 "missed-question review with
 * spaced repetition" — schema already tracks correctStreak/isMastered/
 * nextDueAt on MissedQuestion; this is the scheduling rule that was
 * missing).
 */
const INTERVAL_DAYS_BY_STREAK = [1, 3, 7];
export const MASTERY_STREAK = 3;

export function computeNextDueAt(correctStreak: number, now: Date): Date {
  const days = INTERVAL_DAYS_BY_STREAK[Math.min(correctStreak, INTERVAL_DAYS_BY_STREAK.length - 1)];
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
}

export function isDueForReview(nextDueAt: Date, now: Date): boolean {
  return nextDueAt.getTime() <= now.getTime();
}
