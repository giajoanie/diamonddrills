import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getWrittenEventsForMentor = cache(async () => {
  return prisma.event.findMany({
    where: { category: "WRITTEN", isActive: true },
    orderBy: { name: "asc" },
    include: { cluster: { select: { name: true } } },
  });
});

export const getWrittenEventWorkspace = cache(async (eventId: string) => {
  const [event, checklist, milestones] = await Promise.all([
    prisma.event.findUnique({ where: { id: eventId } }),
    prisma.writtenEventChecklist.findUnique({ where: { eventId } }),
    prisma.milestone.findMany({ where: { eventId }, orderBy: { orderIndex: "asc" } }),
  ]);
  if (!event) return null;
  return { event, checklist, milestones };
});
