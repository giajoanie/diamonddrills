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
