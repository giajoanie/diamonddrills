import { describe, expect, it } from "vitest";
import {
  competitionDayIndex,
  daysToGo,
  defaultSeasonIndex,
  getMonthGridDays,
  getSeasonMonths,
  isSameDay,
} from "./season";

describe("getSeasonMonths", () => {
  it("starts the season in September of the current year when now is mid-season", () => {
    const months = getSeasonMonths(new Date(2026, 0, 15)); // Jan 2026 -> season is Sep 2025 - Apr 2026
    expect(months).toEqual([
      { year: 2025, month: 8 },
      { year: 2025, month: 9 },
      { year: 2025, month: 10 },
      { year: 2025, month: 11 },
      { year: 2026, month: 0 },
      { year: 2026, month: 1 },
      { year: 2026, month: 2 },
      { year: 2026, month: 3 },
    ]);
  });

  it("starts the season in the same year when now is already September or later", () => {
    const months = getSeasonMonths(new Date(2026, 8, 24)); // Sep 2026
    expect(months[0]).toEqual({ year: 2026, month: 8 });
    expect(months[7]).toEqual({ year: 2027, month: 3 });
  });
});

describe("defaultSeasonIndex", () => {
  it("finds the current month within the season", () => {
    const now = new Date(2026, 10, 1); // Nov 2026
    const months = getSeasonMonths(now);
    expect(defaultSeasonIndex(now, months)).toBe(2); // Sep, Oct, Nov -> index 2
  });

  it("falls back to 0 when now is outside the season (off-season)", () => {
    const now = new Date(2026, 5, 1); // June 2026, off-season
    const months = getSeasonMonths(now);
    expect(defaultSeasonIndex(now, months)).toBe(0);
  });
});

describe("daysToGo", () => {
  it("counts whole days until a future date", () => {
    expect(daysToGo(new Date(2026, 10, 7), new Date(2026, 8, 25))).toBe(43);
  });

  it("floors at 0 for a past date", () => {
    expect(daysToGo(new Date(2026, 0, 1), new Date(2026, 8, 25))).toBe(0);
  });

  it("ignores time-of-day on both ends", () => {
    const target = new Date(2026, 10, 7, 23, 59);
    const now = new Date(2026, 10, 5, 0, 1);
    expect(daysToGo(target, now)).toBe(2);
  });
});

describe("getMonthGridDays", () => {
  it("pads leading and trailing cells to full weeks", () => {
    // September 2026 starts on a Tuesday and has 30 days.
    const cells = getMonthGridDays(2026, 8);
    expect(cells.length % 7).toBe(0);
    expect(cells[0]).toBeNull();
    expect(cells[2]).toEqual(new Date(2026, 8, 1));
    expect(cells[31]).toEqual(new Date(2026, 8, 30));
  });
});

describe("competitionDayIndex", () => {
  it("returns null outside the competition's span", () => {
    const start = new Date(2027, 0, 15);
    const end = new Date(2027, 0, 17);
    expect(competitionDayIndex(new Date(2027, 0, 14), start, end)).toBeNull();
    expect(competitionDayIndex(new Date(2027, 0, 18), start, end)).toBeNull();
  });

  it("computes day/totalDays across a multi-day span", () => {
    const start = new Date(2027, 0, 15);
    const end = new Date(2027, 0, 17);
    expect(competitionDayIndex(new Date(2027, 0, 15), start, end)).toEqual({ day: 1, totalDays: 3 });
    expect(competitionDayIndex(new Date(2027, 0, 16), start, end)).toEqual({ day: 2, totalDays: 3 });
    expect(competitionDayIndex(new Date(2027, 0, 17), start, end)).toEqual({ day: 3, totalDays: 3 });
  });

  it("treats a null end date as a single-day event", () => {
    const start = new Date(2026, 10, 7);
    expect(competitionDayIndex(new Date(2026, 10, 7), start, null)).toEqual({ day: 1, totalDays: 1 });
    expect(competitionDayIndex(new Date(2026, 10, 8), start, null)).toBeNull();
  });
});

describe("isSameDay", () => {
  it("compares calendar day, ignoring time", () => {
    expect(isSameDay(new Date(2026, 8, 25, 3), new Date(2026, 8, 25, 22))).toBe(true);
    expect(isSameDay(new Date(2026, 8, 25), new Date(2026, 8, 26))).toBe(false);
  });
});
