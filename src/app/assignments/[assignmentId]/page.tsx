import { notFound } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import { getAssignmentForStudent } from "@/lib/dal/assignments";
import { startAssignmentExam } from "@/lib/actions/submissions";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FileComments } from "@/components/FileComments";
import { computeRubricTotal } from "@/lib/assignments/scoring";
import { SubmitFileForm } from "./SubmitFileForm";
import { ViewLogger } from "./ViewLogger";

export const metadata = { title: "Assignment" };
export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  FILE_SUBMISSION: "File submission",
  EXAM: "Timed exam",
  PRACTICE_ROLEPLAY: "Roleplay practice",
};

export default async function StudentAssignmentPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const user = await requireActiveUser("STUDENT");
  const { assignmentId } = await params;

  const assignment = await getAssignmentForStudent(assignmentId, user.id);
  if (!assignment) notFound();

  const submission = assignment.submissions[0];
  const latestAttempt = assignment.examAttempts[0];
  const rubricTotal =
    submission && assignment.rubric
      ? computeRubricTotal(submission.rubricScores, assignment.rubric.criteria)
      : null;

  const sawFeedback = submission?.status === "GRADED" && !!submission.feedback;

  return (
    <>
      <ViewLogger assignmentId={assignment.id} sawFeedback={sawFeedback} />
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">{assignment.title}</h1>
        <p className="mt-1 text-foreground-muted">
          {TYPE_LABELS[assignment.type]} · Due {assignment.dueAt.toLocaleString()}
        </p>

        <Card className="mt-6">
          <p className="whitespace-pre-wrap text-foreground">{assignment.instructions}</p>
        </Card>

        {assignment.resources.length > 0 && (
          <Card className="mt-4">
            <p className="mb-2 font-medium text-foreground">Resources</p>
            <ul className="space-y-1">
              {assignment.resources.map((r) => (
                <li key={r.resource.id}>
                  <a
                    href={r.resource.fileUrl ? `/files/${r.resource.fileUrl}` : r.resource.externalUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline"
                  >
                    {r.resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {assignment.rubric && (
          <Card className="mt-4">
            <p className="mb-2 font-medium text-foreground">Rubric: {assignment.rubric.name}</p>
            <ul className="space-y-1 text-sm text-foreground-muted">
              {assignment.rubric.criteria.map((c) => {
                const score = submission?.rubricScores.find((s) => s.criterionId === c.id);
                return (
                  <li key={c.id} className="flex items-center justify-between gap-3">
                    <span>{c.name}</span>
                    <span className="shrink-0 text-foreground-subtle">
                      {score ? `${score.score} / ${c.maxPoints}` : `— / ${c.maxPoints}`}
                    </span>
                  </li>
                );
              })}
            </ul>
            {submission && submission.rubricScores.length > 0 && rubricTotal && (
              <p className="mt-3 border-t border-border pt-3 text-sm font-medium text-foreground">
                Total: {rubricTotal.earned} / {rubricTotal.possible}
              </p>
            )}
          </Card>
        )}

        <Card className="mt-4">
          {assignment.type === "EXAM" ? (
            <>
              {!latestAttempt ? (
                <form action={startAssignmentExam}>
                  <input type="hidden" name="assignmentId" value={assignment.id} />
                  <Button type="submit">Start exam</Button>
                </form>
              ) : latestAttempt.status === "IN_PROGRESS" ? (
                <a href={`/exam/${latestAttempt.id}`}>
                  <Button>Resume exam</Button>
                </a>
              ) : (
                <p className="text-foreground">
                  Completed · Score: {Math.round(latestAttempt.percentage ?? 0)}%{" "}
                  <a href={`/exam/${latestAttempt.id}/results`} className="text-accent hover:underline">
                    View results
                  </a>
                </p>
              )}
            </>
          ) : (
            <>
              {submission?.resubmissionRequested && (
                <p className="mb-3 text-sm text-danger">
                  Your mentor requested a resubmission
                  {submission.feedback ? `: ${submission.feedback}` : "."}
                </p>
              )}
              {submission?.status === "GRADED" && submission.feedback && (
                <p className="mb-3 text-sm text-foreground-muted">Feedback: {submission.feedback}</p>
              )}
              {submission && submission.files.length > 0 && (
                <div className="mb-4 space-y-4">
                  <p className="text-sm font-medium text-foreground">Submitted files</p>
                  {submission.files.map((f) => (
                    <div key={f.id}>
                      <a
                        href={`/files/${f.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-accent hover:underline"
                      >
                        Version {f.versionNumber} · {f.uploadedAt.toLocaleString()}
                      </a>
                      <FileComments submissionFileId={f.id} comments={f.comments} />
                    </div>
                  ))}
                </div>
              )}
              <SubmitFileForm assignmentId={assignment.id} hasSubmission={!!submission} />
            </>
          )}
        </Card>
      </main>
    </>
  );
}
