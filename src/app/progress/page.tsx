import { format } from "date-fns";
import { requireActiveUser } from "@/lib/auth/guards";
import { getAttemptQuestionHistory } from "@/lib/dal/exam-engine";
import { computeAreaBreakdown, computeWeightedWeakAreas } from "@/lib/exam-engine/scoring";
import { computeLongestCorrectStreak } from "@/lib/exam-engine/streak";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { ScoreTrendChart } from "@/components/charts/ScoreTrendChart";

export const metadata = { title: "Progress" };
export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const user = await requireActiveUser("STUDENT");
  const attempts = await getAttemptQuestionHistory(user.id);

  if (attempts.length === 0) {
    return (
      <>
        <AppHeader user={user} homeHref="/dashboard" />
        <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-semibold text-foreground">Progress</h1>
          <Card className="mt-4">
            <p className="text-foreground-muted">
              No completed exams yet — take your Baseline Diagnostic to start tracking growth.
            </p>
          </Card>
        </main>
      </>
    );
  }

  const trendData = attempts.map((a) => ({
    label: a.submittedAt ? format(a.submittedAt, "MMM d") : "—",
    percentage: a.percentage ?? 0,
  }));

  const perAttemptBreakdowns = attempts.map((a) => computeAreaBreakdown(a.questions));
  const weakestAreas = computeWeightedWeakAreas(perAttemptBreakdowns, 5);

  const bestScore = Math.round(Math.max(...attempts.map((a) => a.percentage ?? 0)));
  const longestStreak = Math.max(
    ...attempts.map((a) => computeLongestCorrectStreak(a.questions.map((q) => q.isCorrect))),
  );

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Progress</h1>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
              Personal best
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{bestScore}%</p>
          </Card>
          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
              Longest correct streak
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{longestStreak}</p>
          </Card>
        </div>

        <Card className="mt-4">
          <h2 className="mb-2 font-medium text-foreground">Score over time</h2>
          <ScoreTrendChart data={trendData} />
        </Card>

        <Card className="mt-4">
          <h2 className="mb-2 font-medium text-foreground">
            Weakest instructional areas (weighted toward recent attempts)
          </h2>
          <ul className="space-y-1.5 text-sm">
            {weakestAreas.map((a) => (
              <li key={a.areaName} className="flex justify-between text-foreground-muted">
                <span>{a.areaName}</span>
                <span>{Math.round(a.weightedAccuracy)}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </main>
    </>
  );
}
