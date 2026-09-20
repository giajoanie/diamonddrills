/**
 * Mirrors the status transition applied in `src/lib/actions/submissions.ts`
 * when a student submits a file — kept as a plain function so the late/on
 * time rule is unit-testable without a database.
 */
export function deriveSubmissionStatus(submittedAt: Date, dueAt: Date): "SUBMITTED" | "LATE" {
  return submittedAt.getTime() > dueAt.getTime() ? "LATE" : "SUBMITTED";
}
