import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getStudentVisibilityContext } from "@/lib/dal/resources";

/** Mirrors src/lib/assignments/visibility.ts's isAssignmentVisibleToStudent — see that file. */
function targetWhereForStudent(ctx: {
  grade: number | null;
  currentEventIds: string[];
  currentClusterIds: string[];
}) {
  return {
    some: {
      OR: [
        { targetType: "EVERYONE" as const },
        { targetType: "GRADE" as const, grade: ctx.grade },
        { targetType: "EVENT" as const, eventId: { in: ctx.currentEventIds } },
        { targetType: "CLUSTER" as const, clusterId: { in: ctx.currentClusterIds } },
      ],
    },
  };
}

export const getVisibleAssignmentsForStudent = cache(async (userId: string) => {
  const ctx = await getStudentVisibilityContext(userId);

  return prisma.assignment.findMany({
    where: {
      isActive: true,
      OR: [
        { targets: targetWhereForStudent(ctx) },
        { targets: { some: { targetType: "INDIVIDUAL", userId } } },
      ],
    },
    include: {
      rubric: { select: { id: true, name: true } },
      resources: { include: { resource: { select: { id: true, name: true } } } },
      submissions: { where: { userId } },
      examAttempts: { where: { userId }, orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { dueAt: "asc" },
  });
});

export const getAssignmentForStudent = cache(async (assignmentId: string, userId: string) => {
  const ctx = await getStudentVisibilityContext(userId);

  return prisma.assignment.findFirst({
    where: {
      id: assignmentId,
      isActive: true,
      OR: [
        { targets: targetWhereForStudent(ctx) },
        { targets: { some: { targetType: "INDIVIDUAL", userId } } },
      ],
    },
    include: {
      rubric: { include: { criteria: { orderBy: { orderIndex: "asc" } } } },
      resources: { include: { resource: true } },
      submissions: {
        where: { userId },
        include: { files: { orderBy: { versionNumber: "desc" } }, rubricScores: true },
      },
      examAttempts: { where: { userId }, orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
});

export const getAllAssignmentsForMentor = cache(async () => {
  return prisma.assignment.findMany({
    orderBy: { dueAt: "asc" },
    include: {
      rubric: { select: { name: true } },
      resources: { include: { resource: { select: { name: true } } } },
      targets: { include: { event: { select: { name: true } } } },
      _count: { select: { submissions: true } },
    },
  });
});

export const getAssignmentById = cache(async (assignmentId: string) => {
  return prisma.assignment.findUnique({
    where: { id: assignmentId },
    include: {
      rubric: { include: { criteria: { orderBy: { orderIndex: "asc" } } } },
      resources: { include: { resource: true } },
      targets: true,
    },
  });
});

export const getAssignmentWithSubmissionsForMentor = cache(async (assignmentId: string) => {
  return prisma.assignment.findUnique({
    where: { id: assignmentId },
    include: {
      rubric: { include: { criteria: { orderBy: { orderIndex: "asc" } } } },
      submissions: {
        include: { user: { select: { id: true, firstName: true, schoolId: true } } },
        orderBy: { submittedAt: "desc" },
      },
      examAttempts: {
        where: { status: { not: "IN_PROGRESS" } },
        include: { user: { select: { id: true, firstName: true, schoolId: true } } },
        orderBy: { submittedAt: "desc" },
      },
    },
  });
});

export const getSubmissionForGrading = cache(async (submissionId: string) => {
  return prisma.submission.findUnique({
    where: { id: submissionId },
    include: {
      assignment: { include: { rubric: { include: { criteria: { orderBy: { orderIndex: "asc" } } } } } },
      user: { select: { id: true, firstName: true, schoolId: true } },
      files: { orderBy: { versionNumber: "desc" } },
      rubricScores: true,
    },
  });
});
