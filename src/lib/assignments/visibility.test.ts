import { describe, expect, it } from "vitest";
import { isAssignmentVisibleToStudent, type AssignmentTargetInput } from "./visibility";

const student = {
  userId: "student-1",
  grade: 10,
  currentEventIds: ["evt-1"],
  currentClusterIds: ["cluster-1"],
};

function target(overrides: Partial<AssignmentTargetInput>): AssignmentTargetInput {
  return {
    targetType: "EVERYONE",
    userId: null,
    eventId: null,
    clusterId: null,
    grade: null,
    ...overrides,
  };
}

describe("isAssignmentVisibleToStudent", () => {
  it("is visible to everyone when a target is EVERYONE", () => {
    expect(isAssignmentVisibleToStudent([target({ targetType: "EVERYONE" })], student)).toBe(true);
  });

  it("is visible when targeted individually by userId", () => {
    const targets = [target({ targetType: "INDIVIDUAL", userId: "student-1" })];
    expect(isAssignmentVisibleToStudent(targets, student)).toBe(true);
  });

  it("is not visible when targeted individually to a different student", () => {
    const targets = [target({ targetType: "INDIVIDUAL", userId: "student-2" })];
    expect(isAssignmentVisibleToStudent(targets, student)).toBe(false);
  });

  it("is visible when targeted to the student's current event", () => {
    const targets = [target({ targetType: "EVENT", eventId: "evt-1" })];
    expect(isAssignmentVisibleToStudent(targets, student)).toBe(true);
  });

  it("is not visible when targeted to an unrelated event", () => {
    const targets = [target({ targetType: "EVENT", eventId: "evt-9" })];
    expect(isAssignmentVisibleToStudent(targets, student)).toBe(false);
  });

  it("is visible when targeted to the student's current cluster", () => {
    const targets = [target({ targetType: "CLUSTER", clusterId: "cluster-1" })];
    expect(isAssignmentVisibleToStudent(targets, student)).toBe(true);
  });

  it("is visible when targeted to the student's grade", () => {
    const targets = [target({ targetType: "GRADE", grade: 10 })];
    expect(isAssignmentVisibleToStudent(targets, student)).toBe(true);
  });

  it("is not visible when targeted to a different grade", () => {
    const targets = [target({ targetType: "GRADE", grade: 12 })];
    expect(isAssignmentVisibleToStudent(targets, student)).toBe(false);
  });

  it("is visible if any of several targets match", () => {
    const targets = [
      target({ targetType: "GRADE", grade: 12 }),
      target({ targetType: "EVENT", eventId: "evt-1" }),
    ];
    expect(isAssignmentVisibleToStudent(targets, student)).toBe(true);
  });

  it("is not visible with no matching targets", () => {
    const targets = [
      target({ targetType: "GRADE", grade: 12 }),
      target({ targetType: "EVENT", eventId: "evt-9" }),
    ];
    expect(isAssignmentVisibleToStudent(targets, student)).toBe(false);
  });
});
