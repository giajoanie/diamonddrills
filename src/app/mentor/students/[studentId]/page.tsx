import { notFound } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import { getStudentProfile } from "@/lib/dal/mentor";
import { getAttemptQuestionHistory } from "@/lib/dal/exam-engine";
import { computeAreaBreakdown } from "@/lib/exam-engine/scoring";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { InterventionForm } from "./InterventionForm";

export const metadata = { title: "Student profile" };
export const dynamic = "force-dynamic";

const ACTIVITY_LABELS: Record<string, string> = {
  LOGIN: "Logged in",
  LOGOUT: "Logged out",
  EXAM_START: "Started an exam",
  EXAM_COMPLETE: "Completed an exam",
  EXAM_ABANDON: "Abandoned an exam",
  RESOURCE_OPEN: "Opened a resource",
  SUBMISSION_CREATED: "Submitted an assignment",
  FEEDBACK_VIEWED: "Viewed feedback",
  ASSIGNMENT_VIEWED: "Viewed an assignment",
};

export default async function MentorStudentProfilePage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const user = await requireActiveUser("MENTOR");
  const { studentId } = await params;

  const profile = await getStudentProfile(studentId);
  if (!profile) notFound();

  const { student, enrollmentHistory, examAttempts, submissions, rubricScores, activityLog, interventions, instructionalAreas } = profile;

  const questionHistory = await getAttemptQuestionHistory(studentId);
  const areaBreakdown = computeAreaBreakdown(questionHistory.flatMap((a) => a.questions));

  return (
    <>
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">
          {student.firstName}{" "}
          <span className="font-normal text-foreground-subtle">
            · {student.schoolId} · Grade {student.grade}
          </span>
        </h1>
        {!student.isActive && <p className="mt-1 text-sm text-danger">Deactivated</p>}

        <Card className="mt-6">
          <p className="mb-2 font-medium text-foreground">Events</p>
          <ul className="space-y-1 text-sm">
            {enrollmentHistory.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3">
                <span className="text-foreground-muted">
                  {e.event.name} <span className="text-foreground-subtle">({e.event.cluster.name})</span>
                </span>
                <span className="text-foreground-subtle">
                  {e.isCurrent ? "Current" : `Ended ${e.endedAt?.toLocaleDateString() ?? ""}`}
                </span>
              </li>
            ))}
            {enrollmentHistory.length === 0 && (
              <li className="text-foreground-muted">No events yet.</li>
            )}
          </ul>
        </Card>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="mb-2 font-medium text-foreground">Exam attempts</p>
            <ul className="space-y-1 text-sm">
              {examAttempts.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3">
                  <span className="text-foreground-muted">
                    {a.examBank.name} {a.isBaseline ? "(baseline)" : ""}
                  </span>
                  <span className="text-foreground-subtle">{Math.round(a.percentage ?? 0)}%</span>
                </li>
              ))}
              {examAttempts.length === 0 && <li className="text-foreground-muted">No attempts yet.</li>}
            </ul>
          </Card>

          <Card>
            <p className="mb-2 font-medium text-foreground">Weakest areas</p>
            <ul className="space-y-1 text-sm">
              {areaBreakdown.slice(0, 5).map((a) => (
                <li key={a.areaName} className="flex items-center justify-between gap-3">
                  <span className="text-foreground-muted">{a.areaName}</span>
                  <span className="text-foreground-subtle">{Math.round(a.accuracy)}%</span>
                </li>
              ))}
              {areaBreakdown.length === 0 && <li className="text-foreground-muted">No exam data yet.</li>}
            </ul>
          </Card>
        </div>

        <Card className="mt-4">
          <p className="mb-2 font-medium text-foreground">Submissions</p>
          <ul className="space-y-1 text-sm">
            {submissions.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3">
                <span className="text-foreground-muted">{s.assignment.title}</span>
                <span className="text-foreground-subtle">{s.status}</span>
              </li>
            ))}
            {submissions.length === 0 && <li className="text-foreground-muted">No submissions yet.</li>}
          </ul>
        </Card>

        {rubricScores.length > 0 && (
          <Card className="mt-4">
            <p className="mb-2 font-medium text-foreground">Rubric scores</p>
            <ul className="space-y-1 text-sm">
              {rubricScores.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3">
                  <span className="text-foreground-muted">{r.criterion.name}</span>
                  <span className="text-foreground-subtle">
                    {r.score} / {r.criterion.maxPoints}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <Card className="mt-4">
          <p className="mb-2 font-medium text-foreground">Engagement timeline</p>
          <ul className="space-y-1 text-sm">
            {activityLog.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3">
                <span className="text-foreground-muted">{ACTIVITY_LABELS[a.type] ?? a.type}</span>
                <span className="text-foreground-subtle">{a.createdAt.toLocaleString()}</span>
              </li>
            ))}
            {activityLog.length === 0 && <li className="text-foreground-muted">No activity yet.</li>}
          </ul>
        </Card>

        <Card className="mt-4">
          <p className="mb-2 font-medium text-foreground">Mentor notes &amp; interventions</p>
          <ul className="mb-4 space-y-2 text-sm">
            {interventions.map((i) => (
              <li key={i.id} className="border-b border-border pb-2 last:border-0">
                <p className="text-foreground">{i.note}</p>
                <p className="text-foreground-subtle">
                  {i.mentor.firstName} · {i.createdAt.toLocaleString()}
                  {i.instructionalArea ? ` · ${i.instructionalArea.name}` : ""}
                </p>
              </li>
            ))}
            {interventions.length === 0 && <li className="text-foreground-muted">No notes yet.</li>}
          </ul>
          <InterventionForm studentId={student.id} instructionalAreas={instructionalAreas} />
        </Card>
      </main>
    </>
  );
}
