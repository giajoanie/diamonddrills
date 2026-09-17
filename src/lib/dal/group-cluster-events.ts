import type { Event } from "@/generated/prisma/client";

type ClusterWithEvents = { id: string; name: string; events: Event[] };

/**
 * Groups a cluster's events into roleplay/written buckets and drops
 * clusters with neither, for the signup event dropdowns. Pure function
 * (no Prisma/"server-only") so it's unit-testable in isolation.
 */
export function groupClusterEvents(clusters: ClusterWithEvents[]) {
  return clusters
    .map((cluster) => ({
      id: cluster.id,
      name: cluster.name,
      roleplayEvents: cluster.events.filter((e) => e.category === "ROLEPLAY"),
      writtenEvents: cluster.events.filter((e) => e.category === "WRITTEN"),
    }))
    .filter((c) => c.roleplayEvents.length > 0 || c.writtenEvents.length > 0);
}
