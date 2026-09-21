import Link from "next/link";
import { notFound } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import { getAssignmentWithSubmissionsForMentor } from "@/lib/dal/assignments";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { getMentorTabs } from "@/lib/mentorNav";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "Assignment submissions" };
export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  NOT_STARTED: "Not started",
  SUBMITTED: "Submitted",
  LATE: "Submitted late",
  GRADED: "Graded",
  RESUBMISSION_REQUESTED: "Resubmission requested",
};

export default async function MentorAssignmentDetailPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const user = await requireActiveUser("MENTOR");
  const { assignmentId } = await params;

  const assignment = await getAssignmentWithSubmissionsForMentor(assignmentId);
  if (!assignment) notFound();

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard tabs={getMentorTabs("assignments")}>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-semibold text-foreground">
              {assignment.title}
            </h1>
            <p className="mt-1 text-foreground-muted">
              Due {assignment.dueAt.toLocaleString()}
              {assignment.rubric ? ` · Rubric: ${assignment.rubric.name}` : ""}
            </p>

            {assignment.type === "EXAM" ? (
              <div className="mt-6 space-y-3">
                <h2 className="font-medium text-foreground">
                  Completed attempts
                </h2>
                {assignment.examAttempts.map((a) => (
                  <Card
                    key={a.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <p className="text-foreground">
                      {a.user.firstName} · {a.user.schoolId}
                    </p>
                    <p className="text-sm text-foreground-muted">
                      {Math.round(a.percentage ?? 0)}% ·{" "}
                      {a.submittedAt?.toLocaleString()}
                    </p>
                  </Card>
                ))}
                {assignment.examAttempts.length === 0 && (
                  <Card>
                    <p className="text-foreground-muted">
                      No students have completed this exam yet.
                    </p>
                  </Card>
                )}
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                <h2 className="font-medium text-foreground">Submissions</h2>
                {assignment.submissions.map((s) => (
                  <Link key={s.id} href={`/mentor/submissions/${s.id}`}>
                    <Card className="flex items-center justify-between gap-3 hover:bg-surface-hover">
                      <p className="text-foreground">
                        {s.user.firstName} · {s.user.schoolId}
                      </p>
                      <p className="text-sm text-foreground-muted">
                        {STATUS_LABELS[s.status] ?? s.status}
                        {s.isLate ? " (late)" : ""}
                      </p>
                    </Card>
                  </Link>
                ))}
                {assignment.submissions.length === 0 && (
                  <Card>
                    <p className="text-foreground-muted">
                      No students have submitted yet.
                    </p>
                  </Card>
                )}
              </div>
            )}
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
