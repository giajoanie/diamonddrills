import { describe, expect, it } from "vitest";
import { generateStudyPlan, groupStudyPlanByWeek } from "./study-plan";

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

  it("schedules more, closer-together sessions for more daily minutes", () => {
    const competitionDate = new Date("2026-11-08T00:00:00Z"); // 48 days out
    const low = generateStudyPlan(["a1"], now, competitionDate, 5);
    const high = generateStudyPlan(["a1"], now, competitionDate, 60);
    expect(high.length).toBeGreaterThan(low.length);
  });

  it("still schedules at least one session with very little daily time", () => {
    const items = generateStudyPlan(["a1"], now, new Date("2026-09-24T00:00:00Z"), 1);
    expect(items.length).toBeGreaterThanOrEqual(1);
  });
});

describe("groupStudyPlanByWeek", () => {
  const now = new Date("2026-09-24T00:00:00Z");

  it("returns nothing for an empty plan", () => {
    expect(groupStudyPlanByWeek([], now)).toEqual([]);
  });

  it("buckets the first 7 days as This week", () => {
    const items = [{ dueDate: new Date("2026-09-27T00:00:00Z") }, { dueDate: new Date("2026-09-30T00:00:00Z") }];
    const groups = groupStudyPlanByWeek(items, now);
    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBe("This week");
    expect(groups[0].items).toHaveLength(2);
  });

  it("labels the last bucket Final stretch regardless of month", () => {
    const items = [
      { dueDate: new Date("2026-09-27T00:00:00Z") }, // this week
      { dueDate: new Date("2026-10-20T00:00:00Z") }, // a mid-plan bucket
      { dueDate: new Date("2026-11-04T00:00:00Z") }, // the last bucket
    ];
    const groups = groupStudyPlanByWeek(items, now);
    expect(groups[groups.length - 1].label).toBe("Final stretch");
    expect(groups[0].label).toBe("This week");
  });

  it("keeps every item across all groups, in dueDate order", () => {
    const items = [
      { dueDate: new Date("2026-11-01T00:00:00Z") },
      { dueDate: new Date("2026-09-25T00:00:00Z") },
      { dueDate: new Date("2026-10-10T00:00:00Z") },
    ];
    const groups = groupStudyPlanByWeek(items, now);
    const flattened = groups.flatMap((g) => g.items);
    expect(flattened).toHaveLength(3);
    for (let i = 1; i < flattened.length; i++) {
      expect(flattened[i].dueDate.getTime()).toBeGreaterThanOrEqual(flattened[i - 1].dueDate.getTime());
    }
  });
});
