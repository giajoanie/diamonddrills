import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Program } from "@/generated/prisma/client";
import { getStudentVisibilityContext } from "@/lib/dal/resources";
import { isAnnouncementVisibleToStudent } from "@/lib/announcements/visibility";

export const getAllAnnouncementsForMentor = cache(async (program: Program) => {
  return prisma.announcement.findMany({
    where: { author: { program } },
    orderBy: { publishAt: "desc" },
    include: { cluster: { select: { name: true } }, event: { select: { name: true } } },
  });
});

export const getVisibleAnnouncementsForStudent = cache(async (userId: string) => {
  const ctx = await getStudentVisibilityContext(userId);
  const announcements = await prisma.announcement.findMany({
    where: { publishAt: { lte: new Date() }, author: { program: ctx.program } },
    orderBy: { publishAt: "desc" },
  });

  return announcements.filter((a) => isAnnouncementVisibleToStudent(a, ctx));
});

export const getUpcomingCalendarEvents = cache(async (program: Program) => {
  return prisma.calendarEvent.findMany({
    where: { date: { gte: new Date() }, createdBy: { program } },
    orderBy: { date: "asc" },
  });
});

export const getAllCalendarEvents = cache(async (program: Program) => {
  return prisma.calendarEvent.findMany({
    where: { createdBy: { program } },
    orderBy: { date: "asc" },
  });
});

/**
 * Every milestone a given user can see on their calendar: mentor-posted
 * SHARED ones (visible to everyone in the same program, like Announcements)
 * plus that user's own PERSONAL ones. Not filtered to "upcoming" — the flip
 * calendar needs past milestones too when browsing back to an earlier month.
 */
export const getCalendarMilestonesForViewer = cache(async (userId: string, program: Program) => {
  return prisma.calendarMilestone.findMany({
    where: {
      OR: [
        { scope: "SHARED", createdBy: { program } },
        { scope: "PERSONAL", createdById: userId },
      ],
    },
    orderBy: { date: "asc" },
  });
});
