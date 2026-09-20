import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getAllAssignmentsForMentor = cache(async () => {
  return prisma.assignment.findMany({
    orderBy: { dueAt: "asc" },
    include: {
      rubric: { select: { name: true } },
      resources: { include: { resource: { select: { name: true } } } },
      targets: { include: { event: { select: { name: true } } } },
      _count: { select: { submissions: true } },
    },
  });
});

export const getAssignmentById = cache(async (assignmentId: string) => {
  return prisma.assignment.findUnique({
    where: { id: assignmentId },
    include: {
      rubric: { include: { criteria: { orderBy: { orderIndex: "asc" } } } },
      resources: { include: { resource: true } },
      targets: true,
    },
  });
});
