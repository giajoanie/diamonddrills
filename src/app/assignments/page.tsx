import Link from "next/link";
import { requireActiveUser } from "@/lib/auth/guards";
import { getVisibleAssignmentsForStudent } from "@/lib/dal/assignments";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "Assignments" };
export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  FILE_SUBMISSION: "File submission",
  EXAM: "Timed exam",
  PRACTICE_ROLEPLAY: "Roleplay practice",
};

function statusBadge(assignment: {
  type: string;
  submissions: { status: string }[];
  examAttempts: { status: string; percentage: number | null }[];
}) {
  if (assignment.type === "EXAM") {
    const attempt = assignment.examAttempts[0];
    if (!attempt)
      return {
        label: "Not started",
        className: "bg-surface-hover text-foreground-muted",
      };
    if (attempt.status === "IN_PROGRESS") {
      return { label: "In progress", className: "bg-accent-soft text-accent" };
    }
    return {
      label: `Completed · ${Math.round(attempt.percentage ?? 0)}%`,
      className: "bg-success/20 text-success",
    };
  }

  const submission = assignment.submissions[0];
  if (!submission)
    return {
      label: "Not started",
      className: "bg-surface-hover text-foreground-muted",
    };
  switch (submission.status) {
    case "GRADED":
      return { label: "Graded", className: "bg-success/20 text-success" };
    case "RESUBMISSION_REQUESTED":
      return {
        label: "Resubmission requested",
        className: "bg-danger/20 text-danger",
      };
    case "LATE":
      return {
        label: "Submitted late",
        className: "bg-accent-soft text-accent",
      };
    default:
      return { label: "Submitted", className: "bg-accent-soft text-accent" };
  }
}

export default async function StudentAssignmentsPage() {
  const user = await requireActiveUser("STUDENT");
  const assignments = await getVisibleAssignmentsForStudent(user.id);

  return (
    <>
      <BinderPageShell user={user} homeHref="/dashboard">
        <TabbedCard>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-semibold text-foreground">
              Assignments
            </h1>

            <div className="mt-6 space-y-3">
              {assignments.map((a) => {
                const badge = statusBadge(a);
                return (
                  <Link key={a.id} href={`/assignments/${a.id}`}>
                    <Card className="flex flex-wrap items-center justify-between gap-3 hover:bg-surface-hover">
                      <div>
                        <p className="font-medium text-foreground">
                          {a.title}{" "}
                          <span className="font-normal text-foreground-subtle">
                            · {TYPE_LABELS[a.type]}
                          </span>
                        </p>
                        <p className="text-sm text-foreground-muted">
                          Due {a.dueAt.toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </Card>
                  </Link>
                );
              })}

              {assignments.length === 0 && (
                <Card>
                  <p className="text-foreground-muted">No assignments yet.</p>
                </Card>
              )}
            </div>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
