import { describe, expect, it } from "vitest";
import { computeCohortsByYear } from "./cohorts";

describe("computeCohortsByYear", () => {
  it("groups results by year and averages placement/test score", () => {
    const results = [
      { year: 2025, placement: 3, testScore: 80, advanced: true },
      { year: 2025, placement: 5, testScore: 70, advanced: false },
      { year: 2026, placement: 1, testScore: 95, advanced: true },
    ];
    const cohorts = computeCohortsByYear(results);
    expect(cohorts).toEqual([
      { year: 2026, resultCount: 1, avgPlacement: 1, avgTestScore: 95, advancedRate: 100 },
      { year: 2025, resultCount: 2, avgPlacement: 4, avgTestScore: 75, advancedRate: 50 },
    ]);
  });

  it("sorts newest year first", () => {
    const results = [
      { year: 2020, placement: null, testScore: null, advanced: false },
      { year: 2026, placement: null, testScore: null, advanced: false },
      { year: 2023, placement: null, testScore: null, advanced: false },
    ];
    expect(computeCohortsByYear(results).map((c) => c.year)).toEqual([2026, 2023, 2020]);
  });

  it("is null for avg placement/test score with no recorded values", () => {
    const results = [{ year: 2026, placement: null, testScore: null, advanced: false }];
    const [cohort] = computeCohortsByYear(results);
    expect(cohort.avgPlacement).toBeNull();
    expect(cohort.avgTestScore).toBeNull();
  });

  it("is empty with no results", () => {
    expect(computeCohortsByYear([])).toEqual([]);
  });
});
