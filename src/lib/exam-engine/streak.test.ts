import { describe, expect, it } from "vitest";
import { computeLongestCorrectStreak } from "./streak";

describe("computeLongestCorrectStreak", () => {
  it("finds the longest run of consecutive true values", () => {
    expect(
      computeLongestCorrectStreak([true, true, false, true, true, true, false]),
    ).toBe(3);
  });

  it("returns 0 for an all-wrong attempt", () => {
    expect(computeLongestCorrectStreak([false, false, false])).toBe(0);
  });

  it("returns the full length for an all-correct attempt", () => {
    expect(computeLongestCorrectStreak([true, true, true])).toBe(3);
  });

  it("returns 0 for an empty attempt", () => {
    expect(computeLongestCorrectStreak([])).toBe(0);
  });

  it("counts a streak that runs to the end", () => {
    expect(computeLongestCorrectStreak([false, true, true, true])).toBe(3);
  });
});
