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

/**
 * The soonest upcoming competition-level calendar event, treated as the
 * target date to study toward. Ordinary calendar entries (a meeting, a
 * fundraiser) don't count — only ones tagged with a CompetitionLevel, or
 * a chapter's own internal mock competition. That mock ("minicomp") has
 * no CompetitionLevel of its own (the enum only covers District/State/
 * ICDC), so it's matched by the exact title scripts/add-norcal-calendar-
 * events.ts gives it; this is a stand-in until there's either a proper
 * "internal" CompetitionLevel or a dedicated flag on CalendarEvent.
 */
export const getNextCompetitionDate = cache(async () => {
  const event = await prisma.calendarEvent.findFirst({
    where: {
      date: { gte: new Date() },
      OR: [{ level: { not: null } }, { title: "Chapter Mini-Competition" }],
    },
    orderBy: { date: "asc" },
  });
  return event;
});
