import { describe, expect, it } from "vitest";
import { isAnnouncementVisibleToStudent } from "./visibility";

const student = { grade: 10, currentEventIds: ["evt-1"], currentClusterIds: ["cluster-1"] };

function announcement(overrides: Partial<Parameters<typeof isAnnouncementVisibleToStudent>[0]>) {
  return { audience: "EVERYONE" as const, grade: null, clusterId: null, eventId: null, ...overrides };
}

describe("isAnnouncementVisibleToStudent", () => {
  it("is visible to everyone for an EVERYONE announcement", () => {
    expect(isAnnouncementVisibleToStudent(announcement({ audience: "EVERYONE" }), student)).toBe(true);
  });

  it("is visible when the GRADE matches", () => {
    expect(isAnnouncementVisibleToStudent(announcement({ audience: "GRADE", grade: 10 }), student)).toBe(true);
  });

  it("is not visible when the GRADE differs", () => {
    expect(isAnnouncementVisibleToStudent(announcement({ audience: "GRADE", grade: 11 }), student)).toBe(false);
  });

  it("is visible when the CLUSTER matches a current enrollment", () => {
    const a = announcement({ audience: "CLUSTER", clusterId: "cluster-1" });
    expect(isAnnouncementVisibleToStudent(a, student)).toBe(true);
  });

  it("is not visible when the CLUSTER doesn't match", () => {
    const a = announcement({ audience: "CLUSTER", clusterId: "cluster-9" });
    expect(isAnnouncementVisibleToStudent(a, student)).toBe(false);
  });

  it("is visible when the EVENT matches a current enrollment", () => {
    const a = announcement({ audience: "EVENT", eventId: "evt-1" });
    expect(isAnnouncementVisibleToStudent(a, student)).toBe(true);
  });

  it("is not visible when the EVENT doesn't match", () => {
    const a = announcement({ audience: "EVENT", eventId: "evt-9" });
    expect(isAnnouncementVisibleToStudent(a, student)).toBe(false);
  });
});
