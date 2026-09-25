export type SeasonMonth = { year: number; month: number }; // month is 0-11 (JS Date convention)

/**
 * DECA's competition season runs September through April. Given "now",
 * returns the 8 {year, month} pairs for the season currently under way —
 * or, if "now" falls in the May-Aug off-season, the season that starts the
 * next September.
 */
export function getSeasonMonths(now: Date): SeasonMonth[] {
  const month = now.getMonth();
  const startYear = month >= 8 ? now.getFullYear() : now.getFullYear() - 1; // Sep = index 8
  const months: SeasonMonth[] = [];
  for (let i = 0; i < 8; i++) {
    const absoluteMonth = 8 + i; // 8..15
    months.push({ year: startYear + Math.floor(absoluteMonth / 12), month: absoluteMonth % 12 });
  }
  return months;
}

/** Index of "now"'s month within the season list, or 0 if it falls outside the season (May-Aug). */
export function defaultSeasonIndex(now: Date, months: SeasonMonth[]): number {
  const idx = months.findIndex((m) => m.year === now.getFullYear() && m.month === now.getMonth());
  return idx === -1 ? 0 : idx;
}

/** Days from "now" (start of day) until "target", floored at 0. */
export function daysToGo(target: Date, now: Date): number {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const diffMs = startOfTarget.getTime() - startOfToday.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

/** One calendar-grid cell: a real date, or null for a blank leading/trailing cell. */
export function getMonthGridDays(year: number, month: number): (Date | null)[] {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = firstOfMonth.getDay(); // 0 = Sunday

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/** Which day (1-indexed) of a possibly-multi-day competition span "date" falls on, or null if outside it. */
export function competitionDayIndex(
  date: Date,
  start: Date,
  end: Date | null,
): { day: number; totalDays: number } | null {
  const span = end ?? start;
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDay = new Date(span.getFullYear(), span.getMonth(), span.getDate());
  const cellDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (cellDay < startDay || cellDay > endDay) return null;

  const totalDays = Math.round((endDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const day = Math.round((cellDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return { day, totalDays };
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
