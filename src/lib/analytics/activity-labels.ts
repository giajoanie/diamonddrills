import type { ActivityType } from "@/generated/prisma/client";

/**
 * Human-readable labels for every ActivityLog entry type, shared by the
 * mentor-facing engagement timeline (Phase 4) and the student-facing
 * activity timeline (Phase 6) so both surfaces stay in sync as new
 * activity types are added.
 */
export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  LOGIN: "Logged in",
  LOGOUT: "Logged out",
  EXAM_START: "Started an exam",
  EXAM_COMPLETE: "Completed an exam",
  EXAM_ABANDON: "Abandoned an exam",
  PRACTICE_SESSION_START: "Started a practice session",
  PRACTICE_SESSION_COMPLETE: "Completed a practice session",
  RESOURCE_OPEN: "Opened a resource",
  SUBMISSION_CREATED: "Submitted an assignment",
  FEEDBACK_VIEWED: "Viewed feedback",
  ASSIGNMENT_VIEWED: "Viewed an assignment",
  INTERVENTION_LOGGED: "Had an intervention logged by a mentor",
  ROLEPLAY_SESSION_START: "Started a practice roleplay",
  ROLEPLAY_SESSION_COMPLETE: "Completed a practice roleplay",
  JUDGE_SCORE_SUBMITTED: "Received a judge's score",
};

export function describeActivity(type: ActivityType): string {
  return ACTIVITY_LABELS[type] ?? type;
}
