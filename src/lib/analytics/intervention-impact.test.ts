import { describe, expect, it } from "vitest";
import { computeInterventionImpact } from "./intervention-impact";

describe("computeInterventionImpact", () => {
  const interventionAt = new Date("2026-03-01T00:00:00Z");

  it("compares average percentage before vs. at-or-after the intervention", () => {
    const attempts = [
      { submittedAt: new Date("2026-01-01"), percentage: 50 },
      { submittedAt: new Date("2026-02-01"), percentage: 60 },
      { submittedAt: new Date("2026-03-15"), percentage: 75 },
      { submittedAt: new Date("2026-04-01"), percentage: 85 },
    ];
    const impact = computeInterventionImpact(interventionAt, attempts);
    expect(impact.beforeAvg).toBe(55);
    expect(impact.afterAvg).toBe(80);
    expect(impact.change).toBe(25);
    expect(impact.beforeCount).toBe(2);
    expect(impact.afterCount).toBe(2);
  });

  it("treats an attempt exactly at the intervention time as 'after'", () => {
    const attempts = [{ submittedAt: interventionAt, percentage: 70 }];
    const impact = computeInterventionImpact(interventionAt, attempts);
    expect(impact.beforeAvg).toBeNull();
    expect(impact.afterAvg).toBe(70);
  });

  it("is null change with no before data", () => {
    const attempts = [{ submittedAt: new Date("2026-04-01"), percentage: 90 }];
    const impact = computeInterventionImpact(interventionAt, attempts);
    expect(impact.beforeAvg).toBeNull();
    expect(impact.change).toBeNull();
  });

  it("is null change with no after data", () => {
    const attempts = [{ submittedAt: new Date("2026-01-01"), percentage: 40 }];
    const impact = computeInterventionImpact(interventionAt, attempts);
    expect(impact.afterAvg).toBeNull();
    expect(impact.change).toBeNull();
  });

  it("is all null/zero with no attempts", () => {
    const impact = computeInterventionImpact(interventionAt, []);
    expect(impact).toEqual({
      beforeAvg: null,
      afterAvg: null,
      change: null,
      beforeCount: 0,
      afterCount: 0,
    });
  });
});
