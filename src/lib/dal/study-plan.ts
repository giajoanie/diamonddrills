import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getAttemptQuestionHistory, getInstructionalAreasForBank } from "@/lib/dal/exam-engine";
import { computeAreaBreakdown, computeWeightedWeakAreas } from "@/lib/exam-engine/scoring";

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

/**
 * A student's weakest instructional areas with their weighted accuracy,
 * shared by the study-plan regenerate action (which only needs the ids)
 * and the study-plan page (which also displays the names/percentages in
 * the "in rotation" panel).
 */
export const getWeakAreaAccuracy = cache(async (userId: string, limit = 5) => {
  const [attempts, instructionalAreas] = await Promise.all([
    getAttemptQuestionHistory(userId),
    getInstructionalAreasForBank(),
  ]);
  if (attempts.length === 0) return [];

  const idByName = new Map(instructionalAreas.map((a) => [a.name, a.id]));
  const perAttemptBreakdowns = attempts.map((a) => computeAreaBreakdown(a.questions));

  return computeWeightedWeakAreas(perAttemptBreakdowns, limit)
    .map((a) => ({ areaId: idByName.get(a.areaName), areaName: a.areaName, weightedAccuracy: a.weightedAccuracy }))
    .filter((a): a is { areaId: string; areaName: string; weightedAccuracy: number } => !!a.areaId);
});
