import { describe, expect, it } from "vitest";
import { computePracticeStreak } from "./streaks";

const day = (offset: number, now: Date) => new Date(now.getTime() + offset * 24 * 60 * 60 * 1000);

describe("computePracticeStreak", () => {
  const now = new Date("2026-09-21T12:00:00Z");

  it("returns zero for no activity", () => {
    expect(computePracticeStreak([], now)).toEqual({ current: 0, longest: 0 });
  });

  it("counts a single day as a streak of 1", () => {
    expect(computePracticeStreak([now], now)).toEqual({ current: 1, longest: 1 });
  });

  it("counts consecutive days ending today as the current streak", () => {
    const dates = [day(-2, now), day(-1, now), day(0, now)];
    expect(computePracticeStreak(dates, now)).toEqual({ current: 3, longest: 3 });
  });

  it("keeps the streak alive if the last activity was yesterday", () => {
    const dates = [day(-3, now), day(-2, now), day(-1, now)];
    expect(computePracticeStreak(dates, now)).toEqual({ current: 3, longest: 3 });
  });

  it("resets the current streak once a full day is missed", () => {
    const dates = [day(-5, now), day(-4, now), day(-2, now)];
    expect(computePracticeStreak(dates, now)).toEqual({ current: 0, longest: 2 });
  });

  it("finds the longest streak even if it isn't the current one", () => {
    const dates = [day(-10, now), day(-9, now), day(-8, now), day(-1, now)];
    expect(computePracticeStreak(dates, now)).toEqual({ current: 1, longest: 3 });
  });

  it("deduplicates multiple activities on the same day", () => {
    const dates = [day(0, now), day(0, now), day(-1, now)];
    expect(computePracticeStreak(dates, now)).toEqual({ current: 2, longest: 2 });
  });
});
