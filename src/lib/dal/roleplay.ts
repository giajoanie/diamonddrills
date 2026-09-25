import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getRoleplaySessionForRunner = cache(async (sessionId: string) => {
  const session = await prisma.roleplayPracticeSession.findUnique({
    where: { id: sessionId },
    include: { event: { select: { id: true, name: true, format: true } } },
  });
  if (!session) return null;

  const caseStudyResource = session.caseStudyResourceId
    ? await prisma.resource.findUnique({
        where: { id: session.caseStudyResourceId },
        select: { id: true, name: true, fileUrl: true, externalUrl: true },
      })
    : null;

  return { ...session, caseStudyResource };
});

export const getRoleplaySessionHistory = cache(async (userId: string) => {
  return prisma.roleplayPracticeSession.findMany({
    where: { userId, completedAt: { not: null } },
    include: { event: { select: { name: true } } },
    orderBy: { startedAt: "desc" },
  });
});

// Judge Mode's link is unauthenticated (a mentor or peer judge may not have
// an account), so this deliberately returns only what a judge needs to
// watch and score a live presentation — never the student's private prep
// notes or self-ratings.
export const getRoleplaySessionForJudge = cache(async (sessionId: string) => {
  const session = await prisma.roleplayPracticeSession.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      startedAt: true,
      completedAt: true,
      event: { select: { id: true, name: true } },
      user: { select: { id: true, firstName: true } },
    },
  });
  return session;
});

export const getJudgeScoresForSession = cache(async (sessionId: string) => {
  return prisma.judgeScore.findMany({
    where: { roleplaySessionId: sessionId },
    include: { judge: { select: { firstName: true } } },
    orderBy: { submittedAt: "asc" },
  });
});
