import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getAllRubrics = cache(async () => {
  return prisma.rubric.findMany({
    orderBy: { createdAt: "desc" },
    include: { criteria: { orderBy: { orderIndex: "asc" } } },
  });
});

export const getActiveRubrics = cache(async () => {
  return prisma.rubric.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    include: { criteria: { orderBy: { orderIndex: "asc" } } },
  });
});

export const getRubricById = cache(async (rubricId: string) => {
  return prisma.rubric.findUnique({
    where: { id: rubricId },
    include: { criteria: { orderBy: { orderIndex: "asc" } } },
  });
});
