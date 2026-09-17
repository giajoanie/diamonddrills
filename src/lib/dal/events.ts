import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { groupClusterEvents } from "@/lib/dal/group-cluster-events";

/** Clusters with their active events, grouped by category, for the signup dropdowns. */
export const getSignupEventOptions = cache(async () => {
  const clusters = await prisma.cluster.findMany({
    orderBy: { name: "asc" },
    include: {
      events: {
        where: { isActive: true },
        orderBy: { name: "asc" },
      },
    },
  });

  return groupClusterEvents(clusters);
});

export const getEventById = cache(async (eventId: string) => {
  return prisma.event.findUnique({ where: { id: eventId } });
});

/** A user's current (isCurrent) event enrollments, with the event and cluster. */
export const getCurrentEnrollments = cache(async (userId: string) => {
  return prisma.eventEnrollment.findMany({
    where: { userId, isCurrent: true },
    include: { event: { include: { cluster: true } } },
    orderBy: { startedAt: "asc" },
  });
});
