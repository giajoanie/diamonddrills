import { differenceInCalendarDays, addDays } from "date-fns";

/**
 * Automatic study-plan generation (spec §11, Tier 3): spreads study
 * sessions evenly between now and a competition date, cycling round-robin
 * through the student's weakest instructional areas so each one gets
 * revisited before competition day rather than only the single weakest.
 */
export type StudyPlanItem = { areaId: string; dueDate: Date };

const SESSION_LENGTH_MINUTES = 20; // assumed length of one review session
const DEFAULT_MINUTES_PER_DAY = 10; // preserves the pre-minutesPerDay 2-day-interval default
const MIN_INTERVAL_DAYS = 1;
const MAX_INTERVAL_DAYS = 7;
const BASE_MAX_SESSIONS = 15; // the historical cap, anchored to DEFAULT_MINUTES_PER_DAY
const ABSOLUTE_MAX_SESSIONS = 60; // safety ceiling regardless of how much daily time is claimed

export function generateStudyPlan(
  weakAreaIds: string[],
  now: Date,
  competitionDate: Date,
  minutesPerDay: number = DEFAULT_MINUTES_PER_DAY,
): StudyPlanItem[] {
  if (weakAreaIds.length === 0) return [];

  const daysUntil = differenceInCalendarDays(competitionDate, now);
  if (daysUntil < 1) return [];

  const safeMinutesPerDay = Math.max(1, minutesPerDay);
  // More daily minutes -> sessions can sit closer together (down to daily);
  // less daily time -> they spread out, capped at once a week.
  const intervalDays = Math.min(
    MAX_INTERVAL_DAYS,
    Math.max(MIN_INTERVAL_DAYS, Math.round(SESSION_LENGTH_MINUTES / safeMinutesPerDay)),
  );
  // The total session count also scales with daily time, so someone with
  // more time per day and a long runway isn't held to the same ceiling as
  // the historical 10-min/day default.
  const maxSessions = Math.min(
    ABSOLUTE_MAX_SESSIONS,
    Math.round(BASE_MAX_SESSIONS * (safeMinutesPerDay / DEFAULT_MINUTES_PER_DAY)),
  );

  const sessionCount = Math.min(maxSessions, Math.max(1, Math.floor(daysUntil / intervalDays)));
  const spacing = daysUntil / (sessionCount + 1); // leaves room before competition day itself

  const items: StudyPlanItem[] = [];
  for (let i = 1; i <= sessionCount; i++) {
    items.push({
      areaId: weakAreaIds[(i - 1) % weakAreaIds.length],
      dueDate: addDays(now, Math.round(spacing * i)),
    });
  }
  return items;
}

export type StudyPlanGroup<T extends { dueDate: Date }> = { label: string; items: T[] };

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function weekOfMonth(date: Date): number {
  return Math.ceil(date.getDate() / 7);
}

function monthWeeksLabel(bucketStart: Date, lastItemDate: Date): string {
  const month = MONTH_NAMES[bucketStart.getMonth()];
  const startWeek = weekOfMonth(bucketStart);
  const endWeek = weekOfMonth(lastItemDate);
  return startWeek === endWeek ? `${month}, week ${startWeek}` : `${month}, weeks ${startWeek}–${endWeek}`;
}

/**
 * Buckets a study plan into display groups: the first 7 days as "This
 * week", 14-day windows after that labeled by month + week-of-month range,
 * and the final bucket (whatever its span) as "Final stretch" — the run-up
 * to competition day reads differently than a routine mid-plan week
 * regardless of which month it happens to fall in.
 */
export function groupStudyPlanByWeek<T extends { dueDate: Date }>(items: T[], now: Date): StudyPlanGroup<T>[] {
  const sorted = [...items].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  const groups: StudyPlanGroup<T>[] = [];
  let bucketStart = now;
  let remaining = sorted;
  let isFirst = true;

  while (remaining.length > 0) {
    const bucketEnd = addDays(bucketStart, isFirst ? 7 : 14);
    const inBucket = remaining.filter((i) => i.dueDate < bucketEnd);
    remaining = remaining.filter((i) => i.dueDate >= bucketEnd);

    if (inBucket.length > 0) {
      const label = isFirst
        ? "This week"
        : remaining.length === 0
          ? "Final stretch"
          : monthWeeksLabel(bucketStart, inBucket[inBucket.length - 1].dueDate);
      groups.push({ label, items: inBucket });
    }
    bucketStart = bucketEnd;
    isFirst = false;
  }
  return groups;
}
