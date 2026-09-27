import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { CompetitionLevel, Program } from "@/generated/prisma/client";
import { computeCohortsByYear } from "@/lib/analytics/cohorts";

export const getAllCompetitionResults = cache(
  async (program: Program, filters: { level?: CompetitionLevel; year?: number } = {}) => {
    return prisma.competitionResult.findMany({
      where: {
        user: { program },
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

export const getCompetitionCohortsByYear = cache(async (program: Program) => {
  const results = await prisma.competitionResult.findMany({
    where: { user: { program } },
    select: { year: true, placement: true, testScore: true, advanced: true },
  });
  return computeCohortsByYear(results);
});
