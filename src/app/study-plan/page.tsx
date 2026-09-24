import { format, differenceInCalendarDays } from "date-fns";
import { Flame } from "lucide-react";
import { requireActiveUser } from "@/lib/auth/guards";
import { getStudyPlan, getNextCompetitionDate, getWeakAreaAccuracy } from "@/lib/dal/study-plan";
import { getPracticeActivityDates } from "@/lib/dal/analytics";
import { computePracticeStreak } from "@/lib/analytics/streaks";
import { groupStudyPlanByWeek } from "@/lib/analytics/study-plan";
import { areaColorForIndex } from "@/lib/ui/area-colors";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Sticker } from "@/components/binder/Sticker";
import { Card } from "@/components/ui/Card";
import { RegenerateStudyPlanForm } from "./RegenerateStudyPlanForm";
import { StudyPlanItemRow } from "./StudyPlanItemRow";

export const metadata = { title: "Study plan" };
export const dynamic = "force-dynamic";

const DEFAULT_MINUTES_PER_DAY_SUGGESTION = 20;

export default async function StudyPlanPage() {
  const user = await requireActiveUser("STUDENT");
  const [items, competition, weakAreas, practiceDates] = await Promise.all([
    getStudyPlan(user.id),
    getNextCompetitionDate(),
    getWeakAreaAccuracy(user.id),
    getPracticeActivityDates(user.id),
  ]);

  const now = new Date();
  const streak = computePracticeStreak(practiceDates, now);
  const doneCount = items.filter((i) => i.completed).length;
  const progressPercent = items.length > 0 ? Math.round((doneCount / items.length) * 100) : 0;
  const groups = groupStudyPlanByWeek(items, now);

  const colorByAreaId = new Map(weakAreas.map((a, i) => [a.areaId, areaColorForIndex(i)]));
  const areaColor = (areaId: string | null) =>
    (areaId && colorByAreaId.get(areaId)) || "var(--color-fg-subtle)";

  return (
    <>
      <BinderPageShell user={user} homeHref="/dashboard">
        <TabbedCard>
          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-foreground">Study plan</h1>
              <p className="mt-1 text-foreground-muted">
                {competition
                  ? `Practice sessions on your weakest areas, spaced out until ${competition.title}.`
                  : "No upcoming competition date is on the calendar yet."}
              </p>

              {items.length > 0 && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-hover">
                    <div
                      className="h-full rounded-full bg-accent-strong transition-[width]"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="shrink-0 text-xs font-medium text-foreground-muted">
                    {doneCount} of {items.length} done
                  </span>
                  {streak.current > 0 && (
                    <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent-strong">
                      <Flame className="h-3.5 w-3.5" aria-hidden />
                      {streak.current}-day streak
                    </span>
                  )}
                </div>
              )}

              {groups.length === 0 ? (
                <Card className="mt-6">
                  <p className="text-sm text-foreground-muted">
                    No sessions scheduled yet — generate a plan using the panel on the right.
                  </p>
                </Card>
              ) : (
                <div className="mt-6 space-y-6">
                  {groups.map((group) => (
                    <div key={group.label}>
                      <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-foreground-subtle">
                        {group.label}
                      </p>
                      <Card>
                        <ul>
                          {group.items.map((item) => (
                            <StudyPlanItemRow
                              key={item.id}
                              item={item}
                              color={areaColor(item.instructionalAreaId)}
                            />
                          ))}
                        </ul>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {competition && (
                <div className="relative rounded-xl border border-border bg-accent-soft p-5 shadow-sm">
                  <Sticker kind="tape" />
                  <p className="text-xs font-bold uppercase tracking-wide text-accent-strong">
                    {competition.title}
                  </p>
                  <p className="mt-1 flex items-baseline gap-1.5 font-display text-4xl font-bold text-foreground">
                    {Math.max(0, differenceInCalendarDays(competition.date, now))}
                    <span className="text-base font-normal text-foreground-muted">days</span>
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {format(competition.date, "EEE M/d/yyyy")}
                  </p>
                </div>
              )}

              {weakAreas.length > 0 && (
                <Card>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-foreground-subtle">
                    In rotation
                  </p>
                  <ul className="space-y-2">
                    {weakAreas.map((a, i) => (
                      <li key={a.areaId} className="flex items-center justify-between gap-2 text-sm">
                        <span className="flex min-w-0 items-center gap-2 text-foreground-muted">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: areaColorForIndex(i) }}
                            aria-hidden
                          />
                          <span className="truncate">{a.areaName}</span>
                        </span>
                        <span className="shrink-0 text-foreground-subtle">
                          {Math.round(a.weightedAccuracy)}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              <Card>
                <RegenerateStudyPlanForm
                  hasExistingPlan={doneCount < items.length}
                  defaultMinutesPerDay={user.dailyStudyMinutes ?? DEFAULT_MINUTES_PER_DAY_SUGGESTION}
                />
              </Card>
            </div>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
