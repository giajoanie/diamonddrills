import { differenceInCalendarDays } from "date-fns";

/**
 * Personal records (spec §11, Tier 3): how many days in a row a student has
 * practiced. Distinct from computeLongestCorrectStreak (exam-engine/streak.ts),
 * which measures consecutive correct answers within a single attempt — this
 * measures practice consistency across days.
 */
export type PracticeStreak = { current: number; longest: number };

export function computePracticeStreak(activityDates: Date[], now: Date): PracticeStreak {
  if (activityDates.length === 0) return { current: 0, longest: 0 };

  const uniqueDayOffsets = [...new Set(activityDates.map((d) => differenceInCalendarDays(d, now)))].sort(
    (a, b) => a - b,
  );

  let longest = 1;
  let run = 1;
  for (let i = 1; i < uniqueDayOffsets.length; i++) {
    run = uniqueDayOffsets[i] === uniqueDayOffsets[i - 1] + 1 ? run + 1 : 1;
    if (run > longest) longest = run;
  }

  const mostRecentOffset = uniqueDayOffsets[uniqueDayOffsets.length - 1];
  // Still "current" if the last active day was today (0) or yesterday (-1) —
  // a streak isn't broken until a full day has passed with no activity.
  let current = 0;
  if (mostRecentOffset >= -1) {
    current = 1;
    for (let i = uniqueDayOffsets.length - 1; i > 0; i--) {
      if (uniqueDayOffsets[i] === uniqueDayOffsets[i - 1] + 1) current++;
      else break;
    }
  }

  return { current, longest };
}
