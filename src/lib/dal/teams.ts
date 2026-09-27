import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Program } from "@/generated/prisma/client";

/** Events where a team makes sense (teamSizeMax > 1: TDM and team written events). */
export const getTeamEligibleEvents = cache(async () => {
  return prisma.event.findMany({
    where: { isActive: true, teamSizeMax: { gt: 1 } },
    orderBy: { name: "asc" },
    include: { cluster: { select: { name: true } } },
  });
});

/** Scoped to teams with at least one member in the requesting mentor's program — HS and EBL rosters stay separate. */
export const getAllTeams = cache(async (program: Program) => {
  return prisma.team.findMany({
    where: { members: { some: { leftAt: null, user: { program } } } },
    orderBy: { createdAt: "desc" },
    include: {
      event: { select: { name: true, teamSizeMax: true } },
      members: {
        where: { leftAt: null },
        include: { user: { select: { id: true, firstName: true, schoolId: true } } },
      },
    },
  });
});

export const getTeamForStudentEvent = cache(async (userId: string, eventId: string) => {
  const membership = await prisma.teamMember.findFirst({
    where: { userId, leftAt: null, team: { eventId } },
    include: {
      team: {
        include: {
          members: {
            where: { leftAt: null },
            include: { user: { select: { id: true, firstName: true, schoolId: true } } },
          },
        },
      },
    },
  });
  return membership?.team ?? null;
});
