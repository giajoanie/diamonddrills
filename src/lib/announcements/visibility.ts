export type AnnouncementVisibilityInput = {
  audience: "EVERYONE" | "GRADE" | "CLUSTER" | "EVENT";
  grade: number | null;
  clusterId: string | null;
  eventId: string | null;
};

export type StudentAnnouncementContext = {
  grade: number | null;
  currentEventIds: string[];
  currentClusterIds: string[];
};

/**
 * Mirrors the Prisma `where` clause in `src/lib/dal/announcements.ts` — kept
 * as a plain function so the audience rules are unit-testable without a
 * database. If you change one, change the other.
 */
export function isAnnouncementVisibleToStudent(
  announcement: AnnouncementVisibilityInput,
  student: StudentAnnouncementContext,
): boolean {
  switch (announcement.audience) {
    case "EVERYONE":
      return true;
    case "GRADE":
      return announcement.grade !== null && announcement.grade === student.grade;
    case "CLUSTER":
      return announcement.clusterId !== null && student.currentClusterIds.includes(announcement.clusterId);
    case "EVENT":
      return announcement.eventId !== null && student.currentEventIds.includes(announcement.eventId);
    default:
      return false;
  }
}
