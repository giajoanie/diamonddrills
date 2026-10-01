import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { CompetitionLevel, Program, ResourceType } from "@/generated/prisma/client";

export const getStudentVisibilityContext = cache(async (userId: string) => {
  const [user, enrollments] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { grade: true, program: true } }),
    prisma.eventEnrollment.findMany({
      where: { userId, isCurrent: true },
      select: { eventId: true, event: { select: { clusterId: true } } },
    }),
  ]);

  return {
    grade: user.grade,
    program: user.program,
    currentEventIds: enrollments.map((e) => e.eventId),
    currentClusterIds: [...new Set(enrollments.map((e) => e.event.clusterId))],
  };
});

type ResourceFilters = {
  type?: ResourceType;
  instructionalAreaId?: string;
  competitionLevel?: CompetitionLevel;
  query?: string;
};

/** Mirrors src/lib/resources/visibility.ts's isResourceVisibleToStudent — see that file. */
export const getVisibleResourcesForStudent = cache(
  async (userId: string, filters: ResourceFilters = {}) => {
    const ctx = await getStudentVisibilityContext(userId);

    return prisma.resource.findMany({
      where: {
        isActive: true,
        uploader: { program: ctx.program },
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
        // Mirrors src/lib/resources/search.ts's matchesSearchQuery — see that file.
        ...(filters.query?.trim()
          ? {
              OR: [
                { name: { contains: filters.query.trim(), mode: "insensitive" } },
                { description: { contains: filters.query.trim(), mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: { resourceAreas: { include: { instructionalArea: true } } },
      orderBy: { createdAt: "desc" },
    });
  },
);

/**
 * Case studies grouped by the single roleplay event each is tagged to (see
 * scripts/seed-case-studies.ts's resourceEvents.create — one event per case
 * study, never allEvents/cluster-wide for this type). Used by
 * /roleplay/start to scope its per-event case-study picker instead of
 * offering every event's case studies regardless of which one is selected.
 */
export const getCaseStudiesByEvent = cache(async (userId: string, eventIds: string[]) => {
  const ctx = await getStudentVisibilityContext(userId);

  const resources = await prisma.resource.findMany({
    where: {
      type: "CASE_STUDY",
      isActive: true,
      uploader: { program: ctx.program },
      resourceEvents: { some: { eventId: { in: eventIds } } },
    },
    select: { id: true, name: true, resourceEvents: { select: { eventId: true } } },
    orderBy: { name: "asc" },
  });

  const byEvent = new Map<string, { id: string; name: string }[]>();
  for (const resource of resources) {
    for (const { eventId } of resource.resourceEvents) {
      if (!eventIds.includes(eventId)) continue;
      const list = byEvent.get(eventId) ?? [];
      list.push({ id: resource.id, name: resource.name });
      byEvent.set(eventId, list);
    }
  }
  return byEvent;
});

/** Resources tagged to any of the student's weakest instructional areas, visible per the usual rules. */
export const getRecommendedResources = cache(
  async (userId: string, weakAreaIds: string[]) => {
    if (weakAreaIds.length === 0) return [];
    const ctx = await getStudentVisibilityContext(userId);

    return prisma.resource.findMany({
      where: {
        isActive: true,
        uploader: { program: ctx.program },
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
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
    include: { resourceClusters: true, resourceEvents: true, uploader: { select: { program: true } } },
  });
  if (!resource || !resource.isActive) return false;
  if (resource.uploader.program !== user.program) return false;
  if (user.role === "MENTOR") return true;

  const ctx = await getStudentVisibilityContext(userId);
  if (resource.grade !== null && resource.grade !== ctx.grade) return false;
  if (resource.allEvents) return true;
  if (resource.resourceClusters.some((rc) => ctx.currentClusterIds.includes(rc.clusterId))) return true;
  if (resource.resourceEvents.some((re) => ctx.currentEventIds.includes(re.eventId))) return true;
  return false;
});

export const getAllResourcesForMentor = cache(async (program: Program) => {
  return prisma.resource.findMany({
    where: { uploader: { program } },
    orderBy: { createdAt: "desc" },
    include: {
      resourceEvents: { include: { event: true } },
      resourceClusters: { include: { cluster: true } },
      resourceAreas: { include: { instructionalArea: true } },
    },
  });
});

/** One visible resource tagged to this area, for the auto-generated study plan (Tier 3). */
export const getResourceForArea = cache(async (userId: string, instructionalAreaId: string) => {
  const ctx = await getStudentVisibilityContext(userId);

  return prisma.resource.findFirst({
    where: {
      isActive: true,
      uploader: { program: ctx.program },
      resourceAreas: { some: { instructionalAreaId } },
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
    orderBy: { createdAt: "desc" },
  });
});
