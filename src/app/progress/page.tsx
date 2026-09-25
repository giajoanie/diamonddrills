import { format } from "date-fns";
import { requireActiveUser } from "@/lib/auth/guards";
import {
  getAttemptQuestionHistory,
  getMasteryEstimates,
  getStudentExamBanks,
  getInstructionalAreasForExamBanks,
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
import { StatNote } from "@/components/progress/StatNote";
import { ProgressScoreChart } from "@/components/progress/ProgressScoreChart";
import { WeakestAreasList } from "@/components/progress/WeakestAreasList";

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
      <BinderPageShell user={user} homeHref="/dashboard">
        <TabbedCard ruled>
          <h1 className="font-display text-[30px] font-extrabold text-foreground">My progress</h1>
          <Card className="mt-4">
            <p className="text-foreground-muted">
              No completed exams yet — take your Baseline Diagnostic to start tracking growth.
            </p>
          </Card>
          {practiceStreak.current > 0 && (
            <Card className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
                Current practice streak
              </p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {practiceStreak.current} day{practiceStreak.current === 1 ? "" : "s"}
              </p>
            </Card>
          )}
        </TabbedCard>
      </BinderPageShell>
    );
  }

  const examBanks = await getStudentExamBanks(user.id);
  const relevantAreas = await getInstructionalAreasForExamBanks(examBanks.map((b) => b.id));

  const trendData = attempts.map((a) => ({
    label: a.submittedAt ? format(a.submittedAt, "MMM d") : "—",
    pct: Math.round(a.percentage ?? 0),
  }));

  const perAttemptBreakdowns = attempts.map((a) => computeAreaBreakdown(a.questions));

  const nameToId = new Map(relevantAreas.map((a) => [a.name, a.id]));
  const attemptedNames = new Set(perAttemptBreakdowns.flat().map((a) => a.areaName));
  const neverAttempted = relevantAreas
    .filter((a) => !attemptedNames.has(a.name))
    .map((a) => ({ name: a.name, pct: null as number | null, areaId: a.id }));
  const weightedWeak = computeWeightedWeakAreas(perAttemptBreakdowns, 5).map((a) => ({
    name: a.areaName,
    pct: a.weightedAccuracy,
    areaId: nameToId.get(a.areaName),
  }));
  const weakestAreas = [...neverAttempted, ...weightedWeak].slice(0, 5);

  const bestScore = Math.round(Math.max(...attempts.map((a) => a.percentage ?? 0)));
  const longestCorrectStreak = Math.max(
    ...attempts.map((a) => computeLongestCorrectStreak(a.questions.map((q) => q.isCorrect))),
  );

  return (
    <BinderPageShell user={user} homeHref="/dashboard">
      <TabbedCard ruled>
        <div className="flex items-baseline justify-between">
          <h1 className="font-display text-[30px] font-extrabold text-foreground">My progress</h1>
          <div className="font-hand text-[17px] text-[rgba(18,58,122,.6)]">
            {attempts.length} exam{attempts.length === 1 ? "" : "s"} taken so far
          </div>
        </div>

        <div className="mt-[22px] grid grid-cols-2 gap-5 lg:grid-cols-4">
          <StatNote
            color="blue"
            tiltDeg={-0.8}
            tape={{ side: "left", rotateDeg: -3 }}
            label="PERSONAL BEST"
            value={`${bestScore}%`}
            caption="exam score"
          />
          <StatNote
            color="yellow"
            tiltDeg={0.6}
            tape={{ side: "right", rotateDeg: 3 }}
            label="CORRECT STREAK"
            labelColor="#8a6412"
            value={longestCorrectStreak}
            caption="questions in a row, best"
          />
          <StatNote
            color="blue"
            tiltDeg={-0.4}
            tape={{ side: "left", rotateDeg: -2 }}
            label="PRACTICE STREAK"
            value={practiceStreak.current}
            unit={practiceStreak.current === 1 ? "day" : "days"}
            caption="current"
          />
          <StatNote
            color="white"
            tiltDeg={0.8}
            tape={{ side: "right", rotateDeg: 2, white: true }}
            label="LONGEST STREAK"
            value={practiceStreak.longest}
            unit={practiceStreak.longest === 1 ? "day" : "days"}
            caption="practice days in a row"
          />
        </div>

        <div className="mt-[38px] grid items-start gap-[34px] lg:grid-cols-[1.35fr_1fr]">
          <div>
            <div className="sec border-b-2 border-border pb-1.5 font-display text-xs font-bold uppercase tracking-[.08em] text-accent">
              Score over time
            </div>
            <ProgressScoreChart scores={trendData} goal={user.examScoreGoal} />
          </div>
          <div>
            <div className="border-b-2 border-border pb-1.5 font-display text-xs font-bold uppercase tracking-[.08em] text-accent">
              Weakest areas
            </div>
            <p className="mt-2 text-xs text-[rgba(18,58,122,.62)]">Recent attempts count more.</p>
            <div className="mt-2">
              <WeakestAreasList areas={weakestAreas} />
            </div>
          </div>
        </div>

        {masteryEstimates.length > 0 && (
          <Card className="mt-8">
            <h2 className="mb-2 font-medium text-foreground">
              Predicted mastery by instructional area
            </h2>
            <p className="mb-2 text-xs text-foreground-subtle">
              A model of how well you&apos;d likely do on a fresh question in each area right
              now — weighted toward your most recent answers, and cautious until you&apos;ve
              answered enough questions to be confident.
            </p>
            <div className="space-y-3">
              {masteryEstimates.map((a) => (
                <AreaScoreBar key={a.areaId} label={a.areaName} percentage={a.estimatedMastery * 100} />
              ))}
            </div>
          </Card>
        )}
      </TabbedCard>
    </BinderPageShell>
  );
}
