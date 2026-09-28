import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Program } from "@/generated/prisma/client";

export const getAllRubrics = cache(async (program: Program) => {
  return prisma.rubric.findMany({
    where: { creator: { program } },
    orderBy: { createdAt: "desc" },
    include: { criteria: { orderBy: { orderIndex: "asc" } } },
  });
});

// When eventId is given, the event's own official judge rubric (if one has
// been seeded for it) sorts first so it's the default self-rating/judging
// choice — followed by any freeform rubrics a mentor built, which aren't
// tied to a specific event (eventId: null) and so apply to every event.
export const getActiveRubrics = cache(async (program: Program, eventId?: string) => {
  const [eventRubrics, generalRubrics] = await Promise.all([
    eventId
      ? prisma.rubric.findMany({
          where: { isActive: true, creator: { program }, eventId },
          orderBy: { name: "asc" },
          include: { criteria: { orderBy: { orderIndex: "asc" } } },
        })
      : Promise.resolve([]),
    prisma.rubric.findMany({
      where: { isActive: true, creator: { program }, eventId: null },
      orderBy: { name: "asc" },
      include: { criteria: { orderBy: { orderIndex: "asc" } } },
    }),
  ]);
  return [...eventRubrics, ...generalRubrics];
});

export const getRubricById = cache(async (rubricId: string, program: Program) => {
  return prisma.rubric.findFirst({
    where: { id: rubricId, creator: { program } },
    include: { criteria: { orderBy: { orderIndex: "asc" } } },
  });
});
