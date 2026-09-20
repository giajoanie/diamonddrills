export type AssignmentTargetInput = {
  targetType: "INDIVIDUAL" | "EVENT" | "CLUSTER" | "GRADE" | "EVERYONE";
  userId: string | null;
  eventId: string | null;
  clusterId: string | null;
  grade: number | null;
};

export type StudentTargetContext = {
  userId: string;
  grade: number | null;
  currentEventIds: string[];
  currentClusterIds: string[];
};

/**
 * Mirrors the Prisma `where` clause in `src/lib/dal/assignments.ts` — kept as
 * a plain pure function so the targeting rules are unit-testable without a
 * database. If you change one, change the other.
 */
export function isAssignmentVisibleToStudent(
  targets: AssignmentTargetInput[],
  student: StudentTargetContext,
): boolean {
  return targets.some((target) => {
    switch (target.targetType) {
      case "EVERYONE":
        return true;
      case "INDIVIDUAL":
        return target.userId === student.userId;
      case "EVENT":
        return target.eventId !== null && student.currentEventIds.includes(target.eventId);
      case "CLUSTER":
        return target.clusterId !== null && student.currentClusterIds.includes(target.clusterId);
      case "GRADE":
        return target.grade !== null && target.grade === student.grade;
      default:
        return false;
    }
  });
}
