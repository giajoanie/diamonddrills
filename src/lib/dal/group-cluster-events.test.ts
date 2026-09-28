import { describe, expect, it } from "vitest";
import { groupClusterEvents } from "./group-cluster-events";
import type { Event } from "@/generated/prisma/client";

function fakeEvent(id: string, category: "ROLEPLAY" | "WRITTEN", format?: string): Event {
  return { id, category, format } as unknown as Event;
}

describe("groupClusterEvents", () => {
  it("splits a cluster's events into roleplay and written buckets", () => {
    const result = groupClusterEvents([
      {
        id: "c1",
        name: "Marketing",
        events: [fakeEvent("e1", "ROLEPLAY"), fakeEvent("e2", "WRITTEN")],
      },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].roleplayEvents.map((e) => e.id)).toEqual(["e1"]);
    expect(result[0].writtenEvents.map((e) => e.id)).toEqual(["e2"]);
  });

  it("drops clusters with no events in either category", () => {
    const result = groupClusterEvents([
      { id: "c1", name: "Empty Cluster", events: [] },
      {
        id: "c2",
        name: "Marketing",
        events: [fakeEvent("e1", "ROLEPLAY")],
      },
    ]);

    expect(result.map((c) => c.id)).toEqual(["c2"]);
  });

  it("keeps a cluster with only one category populated", () => {
    const result = groupClusterEvents([
      {
        id: "c1",
        name: "Personal Financial Literacy",
        events: [fakeEvent("e1", "ROLEPLAY")],
      },
    ]);

    expect(result[0].roleplayEvents).toHaveLength(1);
    expect(result[0].writtenEvents).toHaveLength(0);
  });

  it("splits Project Management-format written events into their own bucket", () => {
    const result = groupClusterEvents([
      {
        id: "c1",
        name: "Business Management and Administration",
        events: [
          fakeEvent("e1", "WRITTEN", "OPERATIONS_RESEARCH"),
          fakeEvent("e2", "WRITTEN", "PROJECT_MANAGEMENT"),
          fakeEvent("e3", "WRITTEN", "PROJECT_MANAGEMENT"),
        ],
      },
    ]);

    expect(result[0].writtenEvents.map((e) => e.id)).toEqual(["e1"]);
    expect(result[0].projectManagementEvents.map((e) => e.id)).toEqual(["e2", "e3"]);
  });
});
