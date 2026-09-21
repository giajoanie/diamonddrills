import { describe, expect, it } from "vitest";
import { generateStudyPlan } from "./study-plan";

describe("generateStudyPlan", () => {
  const now = new Date("2026-09-21T00:00:00Z");

  it("returns nothing with no weak areas", () => {
    expect(generateStudyPlan([], now, new Date("2026-10-21T00:00:00Z"))).toEqual([]);
  });

  it("returns nothing if the competition date has already passed", () => {
    expect(generateStudyPlan(["a1"], now, new Date("2026-09-20T00:00:00Z"))).toEqual([]);
  });

  it("returns nothing if the competition is today", () => {
    expect(generateStudyPlan(["a1"], now, now)).toEqual([]);
  });

  it("schedules every session strictly before the competition date", () => {
    const competitionDate = new Date("2026-10-21T00:00:00Z"); // 30 days out
    const items = generateStudyPlan(["a1", "a2"], now, competitionDate);
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(item.dueDate.getTime()).toBeLessThan(competitionDate.getTime());
      expect(item.dueDate.getTime()).toBeGreaterThan(now.getTime());
    }
  });

  it("cycles round-robin through weak areas", () => {
    const items = generateStudyPlan(["a1", "a2", "a3"], now, new Date("2026-10-21T00:00:00Z"));
    expect(items[0].areaId).toBe("a1");
    expect(items[1].areaId).toBe("a2");
    expect(items[2].areaId).toBe("a3");
    expect(items[3].areaId).toBe("a1");
  });

  it("caps the number of sessions for a far-off competition", () => {
    const items = generateStudyPlan(["a1"], now, new Date("2027-09-21T00:00:00Z")); // ~1 year out
    expect(items.length).toBeLessThanOrEqual(15);
  });

  it("schedules at least one session for a competition just a few days away", () => {
    const items = generateStudyPlan(["a1"], now, new Date("2026-09-24T00:00:00Z"));
    expect(items.length).toBeGreaterThanOrEqual(1);
  });

  it("produces dueDates in non-decreasing order", () => {
    const items = generateStudyPlan(["a1", "a2"], now, new Date("2026-10-21T00:00:00Z"));
    for (let i = 1; i < items.length; i++) {
      expect(items[i].dueDate.getTime()).toBeGreaterThanOrEqual(items[i - 1].dueDate.getTime());
    }
  });
});
