import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { CompetitionLevel } from "@/generated/prisma/client";
import { computeCohortsByYear } from "@/lib/analytics/cohorts";

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

export const getCompetitionCohortsByYear = cache(async () => {
  const results = await prisma.competitionResult.findMany({
    select: { year: true, placement: true, testScore: true, advanced: true },
  });
  return computeCohortsByYear(results);
});
