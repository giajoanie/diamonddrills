import { describe, expect, it } from "vitest";
import { generateSectionMilestones } from "./written-event-plan";

describe("generateSectionMilestones", () => {
  const now = new Date("2026-09-24T00:00:00Z");

  it("returns nothing with no sections", () => {
    expect(generateSectionMilestones([], now, new Date("2026-11-01T00:00:00Z"))).toEqual([]);
  });

  it("returns nothing if the target date has already passed", () => {
    expect(generateSectionMilestones(["Executive Summary"], now, new Date("2026-09-01T00:00:00Z"))).toEqual([]);
  });

  it("returns nothing if the target date is today", () => {
    expect(generateSectionMilestones(["Executive Summary"], now, now)).toEqual([]);
  });

  it("puts the last section's due date exactly on the target date", () => {
    const target = new Date("2026-11-01T00:00:00Z");
    const items = generateSectionMilestones(["A", "B", "C"], now, target);
    expect(items[items.length - 1].dueAt.getTime()).toBe(target.getTime());
  });

  it("keeps sections in the given order with one milestone per section", () => {
    const target = new Date("2026-11-01T00:00:00Z");
    const sections = ["Executive Summary", "Statement of the Problem", "Research Methods", "Bibliography"];
    const items = generateSectionMilestones(sections, now, target);
    expect(items.map((i) => i.name)).toEqual(sections);
  });

  it("produces non-decreasing due dates, all on or before the target", () => {
    const target = new Date("2026-11-01T00:00:00Z");
    const items = generateSectionMilestones(["A", "B", "C", "D", "E"], now, target);
    for (let i = 1; i < items.length; i++) {
      expect(items[i].dueAt.getTime()).toBeGreaterThanOrEqual(items[i - 1].dueAt.getTime());
    }
    for (const item of items) {
      expect(item.dueAt.getTime()).toBeLessThanOrEqual(target.getTime());
    }
  });

  it("still schedules every section even with more sections than days", () => {
    const target = new Date("2026-09-26T00:00:00Z"); // 2 days out
    const sections = ["A", "B", "C", "D", "E"];
    const items = generateSectionMilestones(sections, now, target);
    expect(items).toHaveLength(5);
  });
});
