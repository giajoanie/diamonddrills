import { describe, expect, it } from "vitest";
import { deriveSubmissionStatus } from "./status";

describe("deriveSubmissionStatus", () => {
  it("is SUBMITTED when submitted before the due date", () => {
    const dueAt = new Date("2026-01-10T23:59:00Z");
    const submittedAt = new Date("2026-01-10T12:00:00Z");
    expect(deriveSubmissionStatus(submittedAt, dueAt)).toBe("SUBMITTED");
  });

  it("is SUBMITTED when submitted exactly at the due date", () => {
    const dueAt = new Date("2026-01-10T23:59:00Z");
    expect(deriveSubmissionStatus(dueAt, dueAt)).toBe("SUBMITTED");
  });

  it("is LATE when submitted after the due date", () => {
    const dueAt = new Date("2026-01-10T23:59:00Z");
    const submittedAt = new Date("2026-01-11T00:00:01Z");
    expect(deriveSubmissionStatus(submittedAt, dueAt)).toBe("LATE");
  });
});
