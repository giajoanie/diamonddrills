import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { CompetitionLevel, ResourceType } from "@/generated/prisma/client";

export const getStudentVisibilityContext = cache(async (userId: string) => {
  const [user, enrollments] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { grade: true } }),
    prisma.eventEnrollment.findMany({
      where: { userId, isCurrent: true },
      select: { eventId: true, event: { select: { clusterId: true } } },
    }),
  ]);

  return {
    grade: user.grade,
    currentEventIds: enrollments.map((e) => e.eventId),
    currentClusterIds: [...new Set(enrollments.map((e) => e.event.clusterId))],
  };
});

type ResourceFilters = {
  type?: ResourceType;
  instructionalAreaId?: string;
  competitionLevel?: CompetitionLevel;
};

/** Mirrors src/lib/resources/visibility.ts's isResourceVisibleToStudent — see that file. */
export const getVisibleResourcesForStudent = cache(
  async (userId: string, filters: ResourceFilters = {}) => {
    const ctx = await getStudentVisibilityContext(userId);

    return prisma.resource.findMany({
      where: {
        isActive: true,
        AND: [
          { OR: [{ grade: null }, { grade: ctx.grade }] },
          {
            OR: [
              { allEvents: true },
              { resourceClusters: { some: { clusterId: { in: ctx.currentClusterIds } } } },
              { resourceEvents: { some: { eventId: { in: ctx.currentEventIds } } } },
            ],
          },
        ],
        ...(filters.type ? { type: filters.type } : {}),
        ...(filters.competitionLevel ? { competitionLevel: filters.competitionLevel } : {}),
        ...(filters.instructionalAreaId
          ? { resourceAreas: { some: { instructionalAreaId: filters.instructionalAreaId } } }
          : {}),
      },
      include: { resourceAreas: { include: { instructionalArea: true } } },
      orderBy: { createdAt: "desc" },
    });
  },
);

/** Resources tagged to any of the student's weakest instructional areas, visible per the usual rules. */
export const getRecommendedResources = cache(
  async (userId: string, weakAreaIds: string[]) => {
    if (weakAreaIds.length === 0) return [];
    const ctx = await getStudentVisibilityContext(userId);

    return prisma.resource.findMany({
      where: {
        isActive: true,
        resourceAreas: { some: { instructionalAreaId: { in: weakAreaIds } } },
        AND: [
          { OR: [{ grade: null }, { grade: ctx.grade }] },
          {
            OR: [
              { allEvents: true },
              { resourceClusters: { some: { clusterId: { in: ctx.currentClusterIds } } } },
              { resourceEvents: { some: { eventId: { in: ctx.currentEventIds } } } },
            ],
          },
        ],
      },
      take: 6,
      orderBy: { createdAt: "desc" },
    });
  },
);

export const canUserAccessResourceFile = cache(async (userId: string, resourceId: string) => {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  if (user.role === "MENTOR") return true;

  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
    include: { resourceClusters: true, resourceEvents: true },
  });
  if (!resource || !resource.isActive) return false;

  const ctx = await getStudentVisibilityContext(userId);
  if (resource.grade !== null && resource.grade !== ctx.grade) return false;
  if (resource.allEvents) return true;
  if (resource.resourceClusters.some((rc) => ctx.currentClusterIds.includes(rc.clusterId))) return true;
  if (resource.resourceEvents.some((re) => ctx.currentEventIds.includes(re.eventId))) return true;
  return false;
});

export const getAllResourcesForMentor = cache(async () => {
  return prisma.resource.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      resourceEvents: { include: { event: true } },
      resourceClusters: { include: { cluster: true } },
      resourceAreas: { include: { instructionalArea: true } },
    },
  });
});
