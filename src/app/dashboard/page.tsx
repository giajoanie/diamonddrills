import Link from "next/link";
import { format } from "date-fns";
import { requireActiveUser } from "@/lib/auth/guards";
import { getCurrentEnrollments, getSignupEventOptions } from "@/lib/dal/events";
import {
  getStudentExamBanks,
  getExistingBaselineAttempt,
  getScoreHistory,
  getDueMissedQuestionCount,
  getAttemptQuestionHistory,
  getInstructionalAreasForBank,
} from "@/lib/dal/exam-engine";
import { getRecommendedResources } from "@/lib/dal/resources";
import {
  computeAreaBreakdown,
  computeWeightedWeakAreas,
} from "@/lib/exam-engine/scoring";
import { getTeamForStudentEvent } from "@/lib/dal/teams";
import { getPendingPracticeInvites } from "@/lib/dal/practice-invites";
import { logResourceOpen } from "@/lib/actions/resources";
import { dismissPracticeInvite } from "@/lib/actions/roleplay";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Sticker } from "@/components/binder/Sticker";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AreaScoreBar } from "@/components/ui/AreaScoreBar";
import { ScoreTrendChart } from "@/components/charts/ScoreTrendChart";
import { EventSwitcher } from "./EventSwitcher";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Per-page check (not layout-only) — see DECISIONS.md on Next 16 partial rendering.
  const user = await requireActiveUser("STUDENT");
  const [enrollments, clusters, examBanks, pendingInvites] = await Promise.all([
    getCurrentEnrollments(user.id),
    getSignupEventOptions(),
    getStudentExamBanks(user.id),
    getPendingPracticeInvites(user.id),
  ]);

  const roleplay = enrollments.find((e) => e.event.category === "ROLEPLAY");
  const written = enrollments.find((e) => e.event.category === "WRITTEN");

  const [roleplayTeam, writtenTeam] = await Promise.all([
    roleplay ? getTeamForStudentEvent(user.id, roleplay.event.id) : null,
    written ? getTeamForStudentEvent(user.id, written.event.id) : null,
  ]);

  const [
    baselineFlags,
    scoreHistory,
    missedCount,
    questionHistory,
    instructionalAreas,
  ] = await Promise.all([
    Promise.all(
      examBanks.map(async (bank) => ({
        bank,
        hasBaseline: !!(await getExistingBaselineAttempt(user.id, bank.id)),
      })),
    ),
    getScoreHistory(user.id),
    getDueMissedQuestionCount(user.id),
    getAttemptQuestionHistory(user.id),
    getInstructionalAreasForBank(),
  ]);

  const banksMissingBaseline = baselineFlags
    .filter((b) => !b.hasBaseline)
    .map((b) => b.bank.name);
  const latestAttempt = scoreHistory[scoreHistory.length - 1];

  const perAttemptBreakdowns = questionHistory.map((a) =>
    computeAreaBreakdown(a.questions),
  );
  const nameToId = new Map(instructionalAreas.map((a) => [a.name, a.id]));
  const recommendedPractice = computeWeightedWeakAreas(perAttemptBreakdowns, 3)
    .map((a) => ({ ...a, areaId: nameToId.get(a.areaName) }))
    .filter((a): a is typeof a & { areaId: string } => !!a.areaId);

  const recommendedResources = await getRecommendedResources(
    user.id,
    recommendedPractice.map((a) => a.areaId),
  );

  const trendData = scoreHistory.slice(-7).map((a) => ({
    label: a.submittedAt ? format(a.submittedAt, "MMM d") : "—",
    percentage: a.percentage ?? 0,
  }));

  return (
    <BinderPageShell user={user} homeHref="/dashboard">
      <TabbedCard>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Welcome, {user.firstName}
          </h2>

          {pendingInvites.length > 0 && (
            <Card className="relative mt-4 overflow-visible border-highlight/60 bg-warning-soft">
              <div className="space-y-2">
                {pendingInvites.map((invite) => (
                  <div
                    key={invite.id}
                    className="flex flex-wrap items-center justify-between gap-3"
                  >
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{invite.fromUser.firstName}</span>{" "}
                      wants you to judge their {invite.roleplaySession.event.name}{" "}
                      roleplay live.
                    </p>
                    <div className="flex items-center gap-2">
                      <Link href={`/judge/${invite.roleplaySession.id}`}>
                        <Button>Judge now</Button>
                      </Link>
                      <form action={dismissPracticeInvite}>
                        <input type="hidden" name="inviteId" value={invite.id} />
                        <button
                          type="submit"
                          className="text-xs text-foreground-subtle hover:text-foreground-muted"
                        >
                          Dismiss
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {banksMissingBaseline.length > 0 && (
            <Card className="relative mt-4 overflow-visible border-highlight/60 bg-warning-soft">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-foreground">
                  You haven&apos;t taken your Baseline Diagnostic for{" "}
                  {banksMissingBaseline.join(", ")} yet. All your growth metrics
                  compare against it.
                </p>
                <Link href="/exam/start">
                  <Button>Take baseline</Button>
                </Link>
              </div>
            </Card>
          )}

          {examBanks.length > 0 && (
            <Card className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                {latestAttempt ? (
                  <p className="text-sm text-foreground">
                    Latest exam score:{" "}
                    <span className="font-medium">
                      {Math.round(latestAttempt.percentage ?? 0)}%
                    </span>{" "}
                    ·{" "}
                    <Link
                      href="/progress"
                      className="text-accent hover:underline"
                    >
                      View progress
                    </Link>
                  </p>
                ) : (
                  <p className="text-sm text-foreground-muted">
                    No exam attempts yet.
                  </p>
                )}
                {missedCount > 0 && (
                  <p className="mt-1 text-sm text-foreground-muted">
                    {missedCount} missed question{missedCount === 1 ? "" : "s"}{" "}
                    to review.
                  </p>
                )}
              </div>
              <Link href="/exam/start">
                <Button variant="secondary">Practice now</Button>
              </Link>
            </Card>
          )}

          {trendData.length > 1 && (
            <Card className="mt-4">
              <p className="font-display text-sm font-bold text-foreground">Score trend</p>
              <ScoreTrendChart data={trendData} />
            </Card>
          )}

          {recommendedPractice.length > 0 && (
            <Card className="mt-4">
              <p className="font-display text-sm font-bold text-foreground">
                Recommended for you
              </p>
              <p className="text-sm text-foreground-muted">
                Your weakest areas, weighted toward recent attempts.
              </p>
              <div className="mt-3 space-y-3">
                {recommendedPractice.map((a) => (
                  <div key={a.areaId}>
                    <AreaScoreBar label={a.areaName} percentage={a.weightedAccuracy} />
                    <Link
                      href={`/exam/start?mode=PRACTICE_AREA&area=${a.areaId}`}
                      className="mt-1 inline-block text-xs text-accent hover:underline"
                    >
                      Practice this →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {recommendedResources.length > 0 && (
            <Card className="mt-4">
              <p className="font-display text-sm font-bold text-foreground">Clipped for you</p>
              <div className="mt-2 space-y-2">
                {recommendedResources.slice(0, 3).map((r) => {
                  const href = r.fileUrl ? `/files/${r.fileUrl}` : (r.externalUrl ?? "#");
                  return (
                    <a
                      key={r.id}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => void logResourceOpen(r.id)}
                      className="relative flex items-start gap-3 rounded-md border border-border bg-surface p-3 transition-shadow hover:shadow-md"
                    >
                      <Sticker kind="paperclip" />
                      <div>
                        <p className="font-display text-sm font-bold text-foreground">{r.name}</p>
                        <p className="text-xs text-foreground-subtle">
                          {r.type} {r.description ? `· ${r.description}` : ""}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </Card>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
                Roleplay event
              </p>
              <p className="mt-1 font-display font-bold text-foreground">
                {roleplay?.event.name}
              </p>
              <p className="text-sm text-foreground-muted">
                {roleplay?.event.cluster.name}
              </p>
              {roleplay && (
                <>
                  {roleplayTeam && (
                    <p className="mt-1 text-sm text-foreground-muted">
                      Team:{" "}
                      {roleplayTeam.members
                        .filter((m) => m.userId !== user.id)
                        .map((m) => m.user.firstName)
                        .join(", ") || "You're the only member"}
                    </p>
                  )}
                  <Link
                    href="/roleplay/start"
                    className="mt-1 block text-sm text-accent hover:underline"
                  >
                    Practice roleplay
                  </Link>
                  {roleplay.event.hasExam && (
                    <Link
                      href="/exam/simulation/start"
                      className="mt-1 block text-sm text-accent hover:underline"
                    >
                      Competition simulation (exam + roleplay)
                    </Link>
                  )}
                  <EventSwitcher
                    category="ROLEPLAY"
                    currentEventId={roleplay.event.id}
                    clusters={clusters}
                  />
                </>
              )}
            </Card>

            <Card>
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
                Written event
              </p>
              <p className="mt-1 font-display font-bold text-foreground">
                {written?.event.name}
              </p>
              <p className="text-sm text-foreground-muted">
                {written?.event.cluster.name}
              </p>
              {written && (
                <>
                  {writtenTeam && (
                    <p className="mt-1 text-sm text-foreground-muted">
                      Team:{" "}
                      {writtenTeam.members
                        .filter((m) => m.userId !== user.id)
                        .map((m) => m.user.firstName)
                        .join(", ") || "You're the only member"}
                    </p>
                  )}
                  <Link
                    href="/written-event"
                    className="mt-1 block text-sm text-accent hover:underline"
                  >
                    Checklist &amp; milestones
                  </Link>
                  <EventSwitcher
                    category="WRITTEN"
                    currentEventId={written.event.id}
                    clusters={clusters}
                  />
                </>
              )}
            </Card>
          </div>
        </div>
      </TabbedCard>
    </BinderPageShell>
  );
}
