import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

/** Events where a team makes sense (teamSizeMax > 1: TDM and team written events). */
export const getTeamEligibleEvents = cache(async () => {
  return prisma.event.findMany({
    where: { isActive: true, teamSizeMax: { gt: 1 } },
    orderBy: { name: "asc" },
    include: { cluster: { select: { name: true } } },
  });
});

export const getAllTeams = cache(async () => {
  return prisma.team.findMany({
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
