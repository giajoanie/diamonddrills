import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import { getAttemptForResults } from "@/lib/dal/exam-engine";
import { computeAreaBreakdown } from "@/lib/exam-engine/scoring";
import { startRoleplayFromExamResults } from "@/lib/actions/roleplay";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AreaBreakdownChart } from "@/components/charts/AreaBreakdownChart";

export const metadata = { title: "Exam results" };
export const dynamic = "force-dynamic";

export default async function ExamResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const user = await requireActiveUser("STUDENT");
  const { attemptId } = await params;

  const attempt = await getAttemptForResults(attemptId);
  if (!attempt || attempt.userId !== user.id) notFound();
  if (attempt.status === "IN_PROGRESS") redirect(`/exam/${attemptId}`);

  const breakdown = computeAreaBreakdown(
    attempt.questions.map((q) => ({
      areaName: q.question.instructionalArea?.name ?? null,
      isCorrect: q.isCorrect ?? false,
    })),
  );

  const areaIdByName = new Map<string, string>();
  for (const q of attempt.questions) {
    if (q.question.instructionalArea) {
      areaIdByName.set(q.question.instructionalArea.name, q.question.instructionalArea.id);
    }
  }
  const weakestArea = breakdown[0];
  const weakestAreaId = weakestArea ? areaIdByName.get(weakestArea.areaName) : undefined;

  const minutesUsed = attempt.timeUsedSeconds ? Math.round(attempt.timeUsedSeconds / 60) : 0;

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Results</h1>

        {attempt.mode === "COMPETITION_SIMULATION" && attempt.eventId && (
          <Card className="mt-4 border-accent/50">
            <p className="font-medium text-foreground">Competition day isn&apos;t over yet</p>
            <p className="mt-1 text-sm text-foreground-muted">
              Head straight into your timed roleplay now, just like the real thing.
            </p>
            <form action={startRoleplayFromExamResults} className="mt-3">
              <input type="hidden" name="eventId" value={attempt.eventId} />
              <Button type="submit">Start your roleplay now</Button>
            </form>
          </Card>
        )}

        <Card className="mt-4">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="text-4xl font-semibold text-foreground">
                {Math.round(attempt.percentage ?? 0)}%
              </p>
              <p className="text-sm text-foreground-muted">
                {attempt.score} of {attempt.questionCount} correct · {minutesUsed} min used
              </p>
            </div>
            <div className="flex gap-2">
              {weakestAreaId && (
                <Link href={`/exam/start?examBankId=${attempt.examBankId}&mode=PRACTICE_AREA&area=${weakestAreaId}`}>
                  <Button variant="secondary">Practice my weakest area</Button>
                </Link>
              )}
              <Link href={`/exam/start?examBankId=${attempt.examBankId}&mode=MISSED_REVIEW`}>
                <Button variant="secondary">Review missed questions</Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="mt-4">
          <h2 className="mb-3 font-medium text-foreground">Instructional area breakdown</h2>
          {breakdown.length > 0 ? (
            <AreaBreakdownChart data={breakdown} />
          ) : (
            <p className="text-sm text-foreground-muted">No tagged questions in this attempt.</p>
          )}
        </Card>

        <div className="mt-6 space-y-4">
          {attempt.questions.map((q, i) => (
            <Card key={q.id}>
              <div className="flex items-start gap-2">
                {q.isCorrect ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden />
                )}
                <div className="flex-1">
                  <p className="text-sm text-foreground-subtle">Question {i + 1}</p>
                  <p className="mt-1 text-foreground">{q.question.stem}</p>

                  <div className="mt-3 space-y-1.5">
                    {(q.optionOrder as ("A" | "B" | "C" | "D")[]).map((letter) => {
                      const text = q.question[`option${letter}` as "optionA"];
                      const isStudent = q.studentAnswer === letter;
                      const isCorrectAnswer = q.question.correctOption === letter;
                      return (
                        <div
                          key={letter}
                          className={`rounded-md border px-3 py-2 text-sm ${
                            isCorrectAnswer
                              ? "border-success/50 bg-success/10 text-foreground"
                              : isStudent
                                ? "border-danger/50 bg-danger/10 text-foreground"
                                : "border-border text-foreground-muted"
                          }`}
                        >
                          {text}
                          {isStudent && !isCorrectAnswer && (
                            <span className="ml-2 text-xs text-danger">(your answer)</span>
                          )}
                          {isCorrectAnswer && (
                            <span className="ml-2 text-xs text-success">(correct)</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {q.question.explanation && (
                    <p className="mt-3 text-sm text-foreground-muted">{q.question.explanation}</p>
                  )}
                  {q.question.instructionalArea && (
                    <p className="mt-2 text-xs text-foreground-subtle">
                      {q.question.instructionalArea.name}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
