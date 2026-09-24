import { format } from "date-fns";
import { requireActiveUser } from "@/lib/auth/guards";
import {
  getAttemptQuestionHistory,
  getMasteryEstimates,
} from "@/lib/dal/exam-engine";
import { getPracticeActivityDates } from "@/lib/dal/analytics";
import {
  computeAreaBreakdown,
  computeWeightedWeakAreas,
} from "@/lib/exam-engine/scoring";
import { computeLongestCorrectStreak } from "@/lib/exam-engine/streak";
import { computePracticeStreak } from "@/lib/analytics/streaks";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { AreaScoreBar } from "@/components/ui/AreaScoreBar";
import { ScoreTrendChart } from "@/components/charts/ScoreTrendChart";

export const metadata = { title: "Progress" };
export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const user = await requireActiveUser("STUDENT");
  const [attempts, practiceDates, masteryEstimates] = await Promise.all([
    getAttemptQuestionHistory(user.id),
    getPracticeActivityDates(user.id),
    getMasteryEstimates(user.id),
  ]);
  const practiceStreak = computePracticeStreak(practiceDates, new Date());

  if (attempts.length === 0) {
    return (
      <>
        <BinderPageShell user={user} homeHref="/dashboard">
          <TabbedCard>
            <div className="mx-auto max-w-3xl">
              <h1 className="text-2xl font-semibold text-foreground">
                Progress
              </h1>
              <Card className="mt-4">
                <p className="text-foreground-muted">
                  No completed exams yet — take your Baseline Diagnostic to
                  start tracking growth.
                </p>
              </Card>
              {practiceStreak.current > 0 && (
                <Card className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
                    Current practice streak
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {practiceStreak.current} day
                    {practiceStreak.current === 1 ? "" : "s"}
                  </p>
                </Card>
              )}
            </div>
          </TabbedCard>
        </BinderPageShell>
      </>
    );
  }

  const trendData = attempts.map((a) => ({
    label: a.submittedAt ? format(a.submittedAt, "MMM d") : "—",
    percentage: a.percentage ?? 0,
  }));

  const perAttemptBreakdowns = attempts.map((a) =>
    computeAreaBreakdown(a.questions),
  );
  const weakestAreas = computeWeightedWeakAreas(perAttemptBreakdowns, 5);

  const bestScore = Math.round(
    Math.max(...attempts.map((a) => a.percentage ?? 0)),
  );
  const longestStreak = Math.max(
    ...attempts.map((a) =>
      computeLongestCorrectStreak(a.questions.map((q) => q.isCorrect)),
    ),
  );

  return (
    <>
      <BinderPageShell user={user} homeHref="/dashboard">
        <TabbedCard>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold text-foreground">Progress</h1>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Card>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
                  Personal best
                </p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {bestScore}%
                </p>
              </Card>
              <Card>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
                  Longest correct streak
                </p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {longestStreak}
                </p>
              </Card>
              <Card>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
                  Current practice streak
                </p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {practiceStreak.current} day
                  {practiceStreak.current === 1 ? "" : "s"}
                </p>
              </Card>
              <Card>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
                  Longest practice streak
                </p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {practiceStreak.longest} day
                  {practiceStreak.longest === 1 ? "" : "s"}
                </p>
              </Card>
            </div>

            <Card className="mt-4">
              <h2 className="mb-2 font-medium text-foreground">
                Score over time
              </h2>
              <ScoreTrendChart data={trendData} />
            </Card>

            <Card className="mt-4">
              <h2 className="mb-2 font-medium text-foreground">
                Weakest instructional areas (weighted toward recent attempts)
              </h2>
              <div className="space-y-3">
                {weakestAreas.map((a) => (
                  <AreaScoreBar key={a.areaName} label={a.areaName} percentage={a.weightedAccuracy} />
                ))}
              </div>
            </Card>

            {masteryEstimates.length > 0 && (
              <Card className="mt-4">
                <h2 className="mb-2 font-medium text-foreground">
                  Predicted mastery by instructional area
                </h2>
                <p className="mb-2 text-xs text-foreground-subtle">
                  A model of how well you&apos;d likely do on a fresh question
                  in each area right now — weighted toward your most recent
                  answers, and cautious until you&apos;ve answered enough
                  questions to be confident.
                </p>
                <div className="space-y-3">
                  {masteryEstimates.map((a) => (
                    <AreaScoreBar key={a.areaId} label={a.areaName} percentage={a.estimatedMastery * 100} />
                  ))}
                </div>
              </Card>
            )}
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
