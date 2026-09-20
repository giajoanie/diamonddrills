import { describe, expect, it } from "vitest";
import { computeNextDueAt, isDueForReview, MASTERY_STREAK } from "./spaced-repetition";

describe("computeNextDueAt", () => {
  const now = new Date("2026-01-01T00:00:00Z");

  it("schedules a fresh miss (streak 0) for 1 day out", () => {
    expect(computeNextDueAt(0, now)).toEqual(new Date("2026-01-02T00:00:00Z"));
  });

  it("schedules a streak of 1 for 3 days out", () => {
    expect(computeNextDueAt(1, now)).toEqual(new Date("2026-01-04T00:00:00Z"));
  });

  it("schedules a streak of 2 for 7 days out", () => {
    expect(computeNextDueAt(2, now)).toEqual(new Date("2026-01-08T00:00:00Z"));
  });

  it("caps the interval at the longest tier for streaks beyond mastery", () => {
    expect(computeNextDueAt(10, now)).toEqual(new Date("2026-01-08T00:00:00Z"));
  });

  it("exposes the mastery threshold used by callers to set isMastered", () => {
    expect(MASTERY_STREAK).toBe(3);
  });
});

describe("isDueForReview", () => {
  const now = new Date("2026-01-10T00:00:00Z");

  it("is due when nextDueAt is in the past", () => {
    expect(isDueForReview(new Date("2026-01-09T00:00:00Z"), now)).toBe(true);
  });

  it("is due when nextDueAt is exactly now", () => {
    expect(isDueForReview(now, now)).toBe(true);
  });

  it("is not due when nextDueAt is in the future", () => {
    expect(isDueForReview(new Date("2026-01-11T00:00:00Z"), now)).toBe(false);
  });
});
