import { differenceInCalendarDays, addDays } from "date-fns";

/**
 * Automatic study-plan generation (spec §11, Tier 3): spreads study
 * sessions evenly between now and a competition date, cycling round-robin
 * through the student's weakest instructional areas so each one gets
 * revisited before competition day rather than only the single weakest.
 */
export type StudyPlanItem = { areaId: string; dueDate: Date };

const MAX_SESSIONS = 15;
const MIN_INTERVAL_DAYS = 2;

export function generateStudyPlan(weakAreaIds: string[], now: Date, competitionDate: Date): StudyPlanItem[] {
  if (weakAreaIds.length === 0) return [];

  const daysUntil = differenceInCalendarDays(competitionDate, now);
  if (daysUntil < 1) return [];

  const sessionCount = Math.min(MAX_SESSIONS, Math.max(1, Math.floor(daysUntil / MIN_INTERVAL_DAYS)));
  const intervalDays = daysUntil / (sessionCount + 1); // leaves room before competition day itself

  const items: StudyPlanItem[] = [];
  for (let i = 1; i <= sessionCount; i++) {
    items.push({
      areaId: weakAreaIds[(i - 1) % weakAreaIds.length],
      dueDate: addDays(now, Math.round(intervalDays * i)),
    });
  }
  return items;
}
