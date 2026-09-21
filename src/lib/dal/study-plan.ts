import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

// StudyPlanItem.resourceId is a plain string column, not a Prisma relation
// (see schema comment), so resource names are joined manually below.
export const getStudyPlan = cache(async (userId: string) => {
  const items = await prisma.studyPlanItem.findMany({
    where: { userId },
    include: { instructionalArea: { select: { name: true } } },
    orderBy: { dueDate: "asc" },
  });

  const resourceIds = items.map((i) => i.resourceId).filter((id): id is string => !!id);
  const resources = await prisma.resource.findMany({
    where: { id: { in: resourceIds } },
    select: { id: true, name: true },
  });
  const resourceNameById = new Map(resources.map((r) => [r.id, r.name]));

  return items.map((item) => ({
    ...item,
    resourceName: item.resourceId ? (resourceNameById.get(item.resourceId) ?? null) : null,
  }));
});

/** The soonest upcoming competition-level calendar event, treated as the target date to study toward. */
export const getNextCompetitionDate = cache(async () => {
  const event = await prisma.calendarEvent.findFirst({
    where: { date: { gte: new Date() }, level: { not: null } },
    orderBy: { date: "asc" },
  });
  return event;
});
