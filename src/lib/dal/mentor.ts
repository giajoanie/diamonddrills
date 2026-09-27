import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Program } from "@/generated/prisma/client";

/** `program` scopes to the requesting mentor's own cohort — HS and EBL mentors never see each other's students. */
export const getStudentProfile = cache(async (studentId: string, program: Program) => {
  const student = await prisma.user.findUnique({
    where: { id: studentId, role: "STUDENT", program },
  });
  if (!student) return null;

  const [
    enrollmentHistory,
    examAttempts,
    submissions,
    rubricScores,
    activityLog,
    interventions,
    instructionalAreas,
  ] = await Promise.all([
    prisma.eventEnrollment.findMany({
      where: { userId: studentId },
      include: { event: { include: { cluster: true } } },
      orderBy: { startedAt: "desc" },
    }),
    prisma.examAttempt.findMany({
      where: { userId: studentId, status: { in: ["SUBMITTED", "AUTO_SUBMITTED"] } },
      include: { examBank: { select: { name: true } } },
      orderBy: { submittedAt: "desc" },
    }),
    prisma.submission.findMany({
      where: { userId: studentId },
      include: { assignment: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.rubricScore.findMany({
      where: { submission: { userId: studentId } },
      include: { criterion: { select: { name: true, maxPoints: true } } },
      orderBy: { scoredAt: "desc" },
    }),
    prisma.activityLog.findMany({
      where: { userId: studentId },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
    prisma.interventionLog.findMany({
      where: { studentId },
      include: { mentor: { select: { firstName: true } }, instructionalArea: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.instructionalArea.findMany({ orderBy: { name: "asc" } }),
  ]);

  return {
    student,
    enrollmentHistory,
    examAttempts,
    submissions,
    rubricScores,
    activityLog,
    interventions,
    instructionalAreas,
  };
});

/** Full student roster for the mentor student-list view, scoped to the mentor's own program. */
export const getAllStudents = cache(async (program: Program) => {
  return prisma.user.findMany({
    where: { role: "STUDENT", program },
    orderBy: [{ isActive: "desc" }, { firstName: "asc" }],
    include: {
      enrollments: {
        where: { isCurrent: true },
        include: { event: { include: { cluster: true } } },
      },
      examAttempts: {
        where: { isBaseline: true },
        select: { id: true },
      },
    },
  });
});
