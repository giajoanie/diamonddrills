import Link from "next/link";
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
import { computeAreaBreakdown, computeWeightedWeakAreas } from "@/lib/exam-engine/scoring";
import { getTeamForStudentEvent } from "@/lib/dal/teams";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { BinderTabNav } from "@/components/binder/BinderTabNav";
import { RuledCard } from "@/components/binder/RuledCard";
import { Button } from "@/components/ui/Button";
import { EventSwitcher } from "./EventSwitcher";

const QUICK_LINKS = [
  { label: "Assignments", href: "/assignments" },
  { label: "Resources", href: "/resources" },
  { label: "Progress", href: "/progress" },
  { label: "Activity", href: "/activity" },
  { label: "Study plan", href: "/study-plan" },
  { label: "Announcements", href: "/announcements" },
  { label: "Calendar", href: "/calendar" },
];

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Per-page check (not layout-only) — see DECISIONS.md on Next 16 partial rendering.
  const user = await requireActiveUser("STUDENT");
  const [enrollments, clusters, examBanks] = await Promise.all([
    getCurrentEnrollments(user.id),
    getSignupEventOptions(),
    getStudentExamBanks(user.id),
  ]);

  const roleplay = enrollments.find((e) => e.event.category === "ROLEPLAY");
  const written = enrollments.find((e) => e.event.category === "WRITTEN");

  const [roleplayTeam, writtenTeam] = await Promise.all([
    roleplay ? getTeamForStudentEvent(user.id, roleplay.event.id) : null,
    written ? getTeamForStudentEvent(user.id, written.event.id) : null,
  ]);

  const [baselineFlags, scoreHistory, missedCount, questionHistory, instructionalAreas] = await Promise.all([
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

  const banksMissingBaseline = baselineFlags.filter((b) => !b.hasBaseline).map((b) => b.bank.name);
  const latestAttempt = scoreHistory[scoreHistory.length - 1];

  const perAttemptBreakdowns = questionHistory.map((a) => computeAreaBreakdown(a.questions));
  const nameToId = new Map(instructionalAreas.map((a) => [a.name, a.id]));
  const recommendedPractice = computeWeightedWeakAreas(perAttemptBreakdowns, 3)
    .map((a) => ({ ...a, areaId: nameToId.get(a.areaName) }))
    .filter((a): a is typeof a & { areaId: string } => !!a.areaId);

  return (
    <BinderPageShell
      user={user}
      homeHref="/dashboard"
      title="My Binder"
      nav={
        <BinderTabNav
          tabs={QUICK_LINKS.map((l) => ({ label: l.label, href: l.href }))}
        />
      }
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Welcome, {user.firstName}
          </h2>
          <nav className="flex flex-wrap gap-2 text-xs lg:hidden">
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-border-strong bg-surface px-3 py-1.5 font-medium text-accent hover:bg-surface-hover"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {banksMissingBaseline.length > 0 && (
          <RuledCard className="relative mt-4 overflow-visible border-highlight/60 bg-warning-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-foreground">
                You haven&apos;t taken your Baseline Diagnostic for {banksMissingBaseline.join(", ")}{" "}
                yet. All your growth metrics compare against it.
              </p>
              <Link href="/exam/start">
                <Button>Take baseline</Button>
              </Link>
            </div>
          </RuledCard>
        )}

        {examBanks.length > 0 && (
          <RuledCard className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              {latestAttempt ? (
                <p className="text-sm text-foreground">
                  Latest exam score:{" "}
                  <span className="font-medium">{Math.round(latestAttempt.percentage ?? 0)}%</span>{" "}
                  ·{" "}
                  <Link href="/progress" className="text-accent hover:underline">
                    View progress
                  </Link>
                </p>
              ) : (
                <p className="text-sm text-foreground-muted">No exam attempts yet.</p>
              )}
              {missedCount > 0 && (
                <p className="mt-1 text-sm text-foreground-muted">
                  {missedCount} missed question{missedCount === 1 ? "" : "s"} to review.
                </p>
              )}
            </div>
            <Link href="/exam/start">
              <Button variant="secondary">Practice now</Button>
            </Link>
          </RuledCard>
        )}

        {recommendedPractice.length > 0 && (
          <RuledCard className="mt-4">
            <p className="font-display text-sm font-bold text-foreground">Recommended for you</p>
            <p className="text-sm text-foreground-muted">Your weakest areas, weighted toward recent attempts.</p>
            <ul className="mt-2 space-y-1">
              {recommendedPractice.map((a) => (
                <li key={a.areaId} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-foreground-muted">
                    {a.areaName} · {Math.round(a.weightedAccuracy)}%
                  </span>
                  <Link
                    href={`/exam/start?mode=PRACTICE_AREA&area=${a.areaId}`}
                    className="text-accent hover:underline"
                  >
                    Practice this →
                  </Link>
                </li>
              ))}
            </ul>
          </RuledCard>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <RuledCard>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              Roleplay event
            </p>
            <p className="mt-1 font-display font-bold text-foreground">{roleplay?.event.name}</p>
            <p className="text-sm text-foreground-muted">{roleplay?.event.cluster.name}</p>
            {roleplay && (
              <>
                {roleplayTeam && (
                  <p className="mt-1 text-sm text-foreground-muted">
                    Team: {roleplayTeam.members
                      .filter((m) => m.userId !== user.id)
                      .map((m) => m.user.firstName)
                      .join(", ") || "You're the only member"}
                  </p>
                )}
                <Link href="/roleplay/start" className="mt-1 block text-sm text-accent hover:underline">
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
          </RuledCard>

          <RuledCard>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              Written event
            </p>
            <p className="mt-1 font-display font-bold text-foreground">{written?.event.name}</p>
            <p className="text-sm text-foreground-muted">{written?.event.cluster.name}</p>
            {written && (
              <>
                {writtenTeam && (
                  <p className="mt-1 text-sm text-foreground-muted">
                    Team: {writtenTeam.members
                      .filter((m) => m.userId !== user.id)
                      .map((m) => m.user.firstName)
                      .join(", ") || "You're the only member"}
                  </p>
                )}
                <Link href="/written-event" className="mt-1 block text-sm text-accent hover:underline">
                  Checklist &amp; milestones
                </Link>
                <EventSwitcher
                  category="WRITTEN"
                  currentEventId={written.event.id}
                  clusters={clusters}
                />
              </>
            )}
          </RuledCard>
        </div>
      </div>
    </BinderPageShell>
  );
}
