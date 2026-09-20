import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { CompetitionLevel } from "@/generated/prisma/client";

export const getAllCompetitionResults = cache(
  async (filters: { level?: CompetitionLevel; year?: number } = {}) => {
    return prisma.competitionResult.findMany({
      where: {
        ...(filters.level ? { level: filters.level } : {}),
        ...(filters.year ? { year: filters.year } : {}),
      },
      orderBy: [{ year: "desc" }, { createdAt: "desc" }],
      include: {
        user: { select: { firstName: true, schoolId: true } },
        event: { select: { name: true } },
      },
    });
  },
);
