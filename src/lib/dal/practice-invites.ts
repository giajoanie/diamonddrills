import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

/** Other active students currently enrolled in the same roleplay event, for the "practice with a partner" picker. */
export const getRoleplayPeers = cache(async (userId: string, eventId: string) => {
  const enrollments = await prisma.eventEnrollment.findMany({
    where: {
      eventId,
      isCurrent: true,
      userId: { not: userId },
      user: { isActive: true, role: "STUDENT" },
    },
    include: { user: { select: { id: true, firstName: true } } },
    orderBy: { user: { firstName: "asc" } },
  });
  return enrollments.map((e) => e.user);
});

// An invite is "pending" when no JudgeScore from toUserId exists yet for its
// session — rather than a separate status field that could drift out of sync
// with the score that actually fulfills it.
export const getPendingPracticeInvites = cache(async (userId: string) => {
  const invites = await prisma.practiceInvite.findMany({
    where: { toUserId: userId },
    include: {
      fromUser: { select: { firstName: true } },
      roleplaySession: { select: { id: true, event: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });
  if (invites.length === 0) return [];

  const scored = await prisma.judgeScore.findMany({
    where: {
      judgeId: userId,
      roleplaySessionId: { in: invites.map((i) => i.roleplaySessionId) },
    },
    select: { roleplaySessionId: true },
  });
  const scoredSessionIds = new Set(scored.map((s) => s.roleplaySessionId));

  return invites.filter((i) => !scoredSessionIds.has(i.roleplaySessionId));
});
