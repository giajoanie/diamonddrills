import { differenceInCalendarDays, addDays } from "date-fns";

export type SectionMilestone = { name: string; dueAt: Date };

/**
 * Spreads a written event's required sections evenly between now and a
 * target completion date, one milestone per section, in the order the
 * mentor listed them (typically the order they appear in the document).
 * Unlike the study plan's spacing (which leaves room before the
 * competition date), the last section's due date lands exactly ON the
 * target date — "complete the entire written by that date" means the
 * final section's deadline IS that date.
 */
export function generateSectionMilestones(
  sections: string[],
  now: Date,
  targetDate: Date,
): SectionMilestone[] {
  if (sections.length === 0) return [];

  const daysUntil = differenceInCalendarDays(targetDate, now);
  if (daysUntil < 1) return [];

  const spacing = daysUntil / sections.length;
  return sections.map((name, i) => ({
    name,
    dueAt: addDays(now, Math.round(spacing * (i + 1))),
  }));
}
