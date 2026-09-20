import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

/** Clusters with all their active events (any category) — for resource/assignment tagging pickers. */
export const getClustersForTagging = cache(async () => {
  return prisma.cluster.findMany({
    orderBy: { name: "asc" },
    include: {
      events: { where: { isActive: true }, orderBy: { name: "asc" } },
    },
  });
});
