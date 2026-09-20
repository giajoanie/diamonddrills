export type ResourceVisibilityInput = {
  allEvents: boolean;
  grade: number | null;
  clusterIds: string[];
  eventIds: string[];
};

export type StudentVisibilityContext = {
  grade: number | null;
  currentEventIds: string[];
  currentClusterIds: string[];
};

/**
 * Mirrors the Prisma `where` clause in `src/lib/dal/resources.ts` — kept as
 * a plain pure function so the tagging rules are unit-testable without a
 * database. If you change one, change the other.
 */
export function isResourceVisibleToStudent(
  resource: ResourceVisibilityInput,
  student: StudentVisibilityContext,
): boolean {
  if (resource.grade !== null && resource.grade !== student.grade) return false;

  if (resource.allEvents) return true;
  if (resource.clusterIds.some((id) => student.currentClusterIds.includes(id))) return true;
  if (resource.eventIds.some((id) => student.currentEventIds.includes(id))) return true;

  return false;
}
