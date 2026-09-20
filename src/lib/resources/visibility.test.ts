import { describe, expect, it } from "vitest";
import { isResourceVisibleToStudent } from "./visibility";

const baseStudent = { grade: 10, currentEventIds: ["evt-1"], currentClusterIds: ["cluster-1"] };

describe("isResourceVisibleToStudent", () => {
  it("is visible when tagged allEvents, regardless of the student's events", () => {
    const resource = { allEvents: true, grade: null, clusterIds: [], eventIds: [] };
    expect(isResourceVisibleToStudent(resource, baseStudent)).toBe(true);
  });

  it("is visible when tagged to the student's current cluster", () => {
    const resource = { allEvents: false, grade: null, clusterIds: ["cluster-1"], eventIds: [] };
    expect(isResourceVisibleToStudent(resource, baseStudent)).toBe(true);
  });

  it("is visible when tagged to the student's current event", () => {
    const resource = { allEvents: false, grade: null, clusterIds: [], eventIds: ["evt-1"] };
    expect(isResourceVisibleToStudent(resource, baseStudent)).toBe(true);
  });

  it("is not visible when tagged to an unrelated cluster and event", () => {
    const resource = { allEvents: false, grade: null, clusterIds: ["cluster-9"], eventIds: ["evt-9"] };
    expect(isResourceVisibleToStudent(resource, baseStudent)).toBe(false);
  });

  it("is filtered out by a mismatched grade even if allEvents is true", () => {
    const resource = { allEvents: true, grade: 12, clusterIds: [], eventIds: [] };
    expect(isResourceVisibleToStudent(resource, baseStudent)).toBe(false);
  });

  it("is visible to any grade when grade is null (All grades)", () => {
    const resource = { allEvents: true, grade: null, clusterIds: [], eventIds: [] };
    expect(isResourceVisibleToStudent(resource, { ...baseStudent, grade: 9 })).toBe(true);
    expect(isResourceVisibleToStudent(resource, { ...baseStudent, grade: 12 })).toBe(true);
  });

  it("matches an exact grade", () => {
    const resource = { allEvents: true, grade: 10, clusterIds: [], eventIds: [] };
    expect(isResourceVisibleToStudent(resource, baseStudent)).toBe(true);
  });
});
