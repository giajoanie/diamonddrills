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

export const getActiveRubrics = cache(async (program: Program) => {
  return prisma.rubric.findMany({
    where: { isActive: true, creator: { program } },
    orderBy: { name: "asc" },
    include: { criteria: { orderBy: { orderIndex: "asc" } } },
  });
});

export const getRubricById = cache(async (rubricId: string, program: Program) => {
  return prisma.rubric.findFirst({
    where: { id: rubricId, creator: { program } },
    include: { criteria: { orderBy: { orderIndex: "asc" } } },
  });
});
