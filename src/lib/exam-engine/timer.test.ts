import { describe, expect, it } from "vitest";
import { computeRemainingSeconds, computeTimeUsedSeconds, isExpired } from "./timer";

const START = new Date("2026-01-01T00:00:00.000Z");

describe("computeRemainingSeconds", () => {
  it("counts down from the time limit as time passes", () => {
    const now = new Date(START.getTime() + 10 * 60 * 1000); // 10 min elapsed
    expect(computeRemainingSeconds(START, 90 * 60, now)).toBe(80 * 60);
  });

  it("never goes negative once time is up", () => {
    const now = new Date(START.getTime() + 200 * 60 * 1000); // way past the limit
    expect(computeRemainingSeconds(START, 90 * 60, now)).toBe(0);
  });

  it("is unaffected by anything other than serverStartTime and now — the client clock can't extend it", () => {
    const now = new Date(START.getTime() + 90 * 60 * 1000);
    expect(computeRemainingSeconds(START, 90 * 60, now)).toBe(0);
  });
});

describe("isExpired", () => {
  it("is false while time remains", () => {
    const now = new Date(START.getTime() + 5 * 60 * 1000);
    expect(isExpired(START, 10 * 60, now)).toBe(false);
  });

  it("is true exactly at the limit", () => {
    const now = new Date(START.getTime() + 10 * 60 * 1000);
    expect(isExpired(START, 10 * 60, now)).toBe(true);
  });

  it("is true well past the limit (e.g. resuming a long-abandoned attempt)", () => {
    const now = new Date(START.getTime() + 24 * 60 * 60 * 1000);
    expect(isExpired(START, 10 * 60, now)).toBe(true);
  });
});

describe("computeTimeUsedSeconds", () => {
  it("matches elapsed time while within the limit", () => {
    const now = new Date(START.getTime() + 42 * 1000);
    expect(computeTimeUsedSeconds(START, 90 * 60, now)).toBe(42);
  });

  it("caps at the time limit rather than reporting overtime", () => {
    const now = new Date(START.getTime() + 200 * 60 * 1000);
    expect(computeTimeUsedSeconds(START, 90 * 60, now)).toBe(90 * 60);
  });
});
