import Link from "next/link";
import { requireActiveUser } from "@/lib/auth/guards";
import { getCurrentEnrollments, getSignupEventOptions } from "@/lib/dal/events";
import {
  getStudentExamBanks,
  getExistingBaselineAttempt,
  getScoreHistory,
  getMissedQuestionCount,
} from "@/lib/dal/exam-engine";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EventSwitcher } from "./EventSwitcher";

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

  const [baselineFlags, scoreHistory, missedCount] = await Promise.all([
    Promise.all(
      examBanks.map(async (bank) => ({
        bank,
        hasBaseline: !!(await getExistingBaselineAttempt(user.id, bank.id)),
      })),
    ),
    getScoreHistory(user.id),
    getMissedQuestionCount(user.id),
  ]);

  const banksMissingBaseline = baselineFlags.filter((b) => !b.hasBaseline).map((b) => b.bank.name);
  const latestAttempt = scoreHistory[scoreHistory.length - 1];

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome, {user.firstName}
          </h1>
          <nav className="flex gap-4 text-sm">
            <Link href="/assignments" className="text-accent hover:underline">
              Assignments
            </Link>
            <Link href="/resources" className="text-accent hover:underline">
              Resources
            </Link>
            <Link href="/progress" className="text-accent hover:underline">
              Progress
            </Link>
          </nav>
        </div>

        {banksMissingBaseline.length > 0 && (
          <Card className="mt-4 border-accent/40 bg-accent-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-foreground">
                You haven&apos;t taken your Baseline Diagnostic for {banksMissingBaseline.join(", ")}{" "}
                yet. All your growth metrics compare against it.
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
          </Card>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
              Roleplay event
            </p>
            <p className="mt-1 font-medium text-foreground">{roleplay?.event.name}</p>
            <p className="text-sm text-foreground-muted">{roleplay?.event.cluster.name}</p>
            {roleplay && (
              <>
                <Link href="/roleplay/start" className="mt-1 block text-sm text-accent hover:underline">
                  Practice roleplay
                </Link>
                <EventSwitcher
                  category="ROLEPLAY"
                  currentEventId={roleplay.event.id}
                  clusters={clusters}
                />
              </>
            )}
          </Card>

          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
              Written event
            </p>
            <p className="mt-1 font-medium text-foreground">{written?.event.name}</p>
            <p className="text-sm text-foreground-muted">{written?.event.cluster.name}</p>
            {written && (
              <>
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
          </Card>
        </div>
      </main>
    </>
  );
}
