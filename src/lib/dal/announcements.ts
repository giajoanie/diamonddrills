import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getStudentVisibilityContext } from "@/lib/dal/resources";
import { isAnnouncementVisibleToStudent } from "@/lib/announcements/visibility";

export const getAllAnnouncementsForMentor = cache(async () => {
  return prisma.announcement.findMany({
    orderBy: { publishAt: "desc" },
    include: { cluster: { select: { name: true } }, event: { select: { name: true } } },
  });
});

export const getVisibleAnnouncementsForStudent = cache(async (userId: string) => {
  const [ctx, announcements] = await Promise.all([
    getStudentVisibilityContext(userId),
    prisma.announcement.findMany({
      where: { publishAt: { lte: new Date() } },
      orderBy: { publishAt: "desc" },
    }),
  ]);

  return announcements.filter((a) => isAnnouncementVisibleToStudent(a, ctx));
});

export const getUpcomingCalendarEvents = cache(async () => {
  return prisma.calendarEvent.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: "asc" },
  });
});

export const getAllCalendarEvents = cache(async () => {
  return prisma.calendarEvent.findMany({ orderBy: { date: "asc" } });
});
