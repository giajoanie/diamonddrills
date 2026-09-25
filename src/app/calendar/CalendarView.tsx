"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useActionState } from "react";
import { format } from "date-fns";
import { createMilestone, deleteMilestone, type CreateMilestoneState } from "@/lib/actions/calendar-milestones";
import {
  competitionDayIndex,
  daysToGo,
  defaultSeasonIndex,
  getMonthGridDays,
  getSeasonMonths,
  isSameDay,
} from "@/lib/calendar/season";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";

type CompetitionLevel = "DISTRICT" | "STATE" | "ICDC";
type Competition = {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  endDate: Date | null;
  level: CompetitionLevel | null;
};
type MilestoneKind = "MILESTONE" | "DEADLINE" | "PRACTICE";
type Milestone = {
  id: string;
  title: string;
  date: Date;
  kind: MilestoneKind;
  scope: "PERSONAL" | "SHARED";
  createdById: string;
};

const LEVEL_LABELS: Record<CompetitionLevel, string> = { DISTRICT: "District", STATE: "State", ICDC: "ICDC" };
const KIND_LABELS: Record<MilestoneKind, string> = { MILESTONE: "Milestone", DEADLINE: "Deadline", PRACTICE: "Practice" };
const KIND_COLORS: Record<MilestoneKind, string> = { MILESTONE: "#2a58b8", DEADLINE: "#c2562f", PRACTICE: "#8a6412" };
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_ABBR = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function competitionLevelLabel(c: Competition): string {
  if (c.level) return LEVEL_LABELS[c.level];
  return c.title.toLowerCase().includes("chapter") ? "Chapter" : "Competition";
}

function formatDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDateInputValue(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

export function CalendarView({
  competitions,
  milestones,
  currentUserId,
  now,
}: {
  competitions: Competition[];
  milestones: Milestone[];
  currentUserId: string;
  now: Date;
}) {
  const seasonMonths = useMemo(() => getSeasonMonths(now), [now]);
  const [monthIndex, setMonthIndex] = useState(() => defaultSeasonIndex(now, seasonMonths));
  const [flipClass, setFlipClass] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [titleInput, setTitleInput] = useState("");
  const [kindInput, setKindInput] = useState<MilestoneKind>("MILESTONE");

  const isFlippingRef = useRef(false);
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
  }, []);

  const [state, formAction, pending] = useActionState<CreateMilestoneState, FormData>(
    createMilestone,
    undefined,
  );
  // Adjusting state during render (rather than in an effect) per
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevState, setPrevState] = useState(state);
  if (state !== prevState) {
    setPrevState(state);
    if (state?.success) setTitleInput("");
  }

  function goToMonthIndex(targetIndex: number) {
    const clamped = Math.max(0, Math.min(seasonMonths.length - 1, targetIndex));
    if (clamped === monthIndex || isFlippingRef.current) return;
    const direction = clamped > monthIndex ? "next" : "prev";
    isFlippingRef.current = true;
    setFlipClass(direction === "next" ? "is-flipping-out-next" : "is-flipping-out-prev");
    flipTimeoutRef.current = setTimeout(() => {
      setMonthIndex(clamped);
      setFlipClass(direction === "next" ? "is-flipping-in-from-next" : "is-flipping-in-from-prev");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlipClass("");
          isFlippingRef.current = false;
        });
      });
    }, 190);
  }

  function goToDate(date: Date) {
    const idx = seasonMonths.findIndex((m) => m.year === date.getFullYear() && m.month === date.getMonth());
    if (idx !== -1) goToMonthIndex(idx);
    setSelectedDate(date);
  }

  const { year, month } = seasonMonths[monthIndex];
  const gridDays = useMemo(() => getMonthGridDays(year, month), [year, month]);

  const upcomingCompetitions = useMemo(
    () =>
      competitions
        .filter((c) => (c.endDate ?? c.date).getTime() >= new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime())
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 4),
    [competitions, now],
  );

  const upcomingMilestones = useMemo(
    () =>
      milestones
        .filter((m) => m.date.getTime() >= new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime())
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [milestones, now],
  );

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-2xl font-bold text-foreground">Competition calendar</h1>

      {upcomingCompetitions.length > 0 && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {upcomingCompetitions.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => goToDate(c.date)}
              className="relative rounded-xl border border-border bg-accent-soft px-5 py-4 text-left shadow-sm transition-transform hover:-translate-y-0.5"
              style={{ transform: `rotate(${i % 2 === 0 ? -0.6 : 0.5}deg)` }}
            >
              <span
                className="absolute -top-2.5 left-6 h-5 w-20 rounded-sm bg-white/70"
                style={{ border: "1px solid rgba(18,58,122,.12)" }}
                aria-hidden
              />
              <div className="flex items-center gap-4">
                <div
                  className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border-2 bg-white"
                  style={{ borderColor: "#c0392b", transform: "rotate(-4deg)" }}
                >
                  <span className="font-display text-[10.5px] font-bold" style={{ color: "#c0392b" }}>
                    {MONTH_ABBR[c.date.getMonth()]}
                  </span>
                  <span className="font-hand text-2xl text-foreground">{c.date.getDate()}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-accent">
                    {competitionLevelLabel(c)}
                  </p>
                  <p className="truncate font-display text-lg font-bold text-foreground">{c.title}</p>
                  <p className="truncate text-xs text-foreground-muted">
                    {c.endDate
                      ? `${format(c.date, "EEE")}–${format(c.endDate, "EEE")} · ${format(c.date, "MMM d")}–${format(c.endDate, "d, yyyy")}`
                      : format(c.date, "EEE M/d/yyyy")}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-hand text-3xl leading-none text-foreground">{daysToGo(c.date, now)}</p>
                  <p className="font-hand text-xs text-foreground-muted">days to go</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <div className="flex flex-wrap gap-1.5">
            {seasonMonths.map((m, i) => (
              <button
                key={`${m.year}-${m.month}`}
                type="button"
                onClick={() => goToMonthIndex(i)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold font-display transition-colors ${
                  i === monthIndex
                    ? "bg-accent-strong text-accent-foreground"
                    : "bg-surface-hover text-foreground-muted hover:bg-border/60"
                }`}
              >
                {MONTH_ABBR[m.month]}
              </button>
            ))}
          </div>

          <div className="calendar-sheet-stack mt-8">
            <div className={`calendar-sheet ${flipClass}`}>
              <div className="calendar-spiral">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span key={i} className="calendar-spiral-ring" />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => goToMonthIndex(monthIndex - 1)}
                  disabled={monthIndex === 0}
                  aria-label="Previous month"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-accent disabled:opacity-30"
                  style={{ borderColor: "#3f72d4" }}
                >
                  ‹
                </button>
                <div className="text-center">
                  <p className="font-hand text-lg text-accent">{year}</p>
                  <p className="font-display text-4xl font-extrabold text-foreground sm:text-5xl">
                    {MONTH_NAMES[month]}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => goToMonthIndex(monthIndex + 1)}
                  disabled={monthIndex === seasonMonths.length - 1}
                  aria-label="Next month"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-accent disabled:opacity-30"
                  style={{ borderColor: "#3f72d4" }}
                >
                  ›
                </button>
              </div>

              <div className="mt-5 grid grid-cols-7 border border-border/60">
                {WEEKDAYS.map((w) => (
                  <div
                    key={w}
                    className="border border-border/40 py-2 text-center font-hand text-sm text-accent"
                  >
                    {w}
                  </div>
                ))}
                {gridDays.map((day, i) => {
                  if (!day) {
                    return <div key={i} className="min-h-[84px] border border-border/40 bg-surface-hover" />;
                  }
                  const today = isSameDay(day, now);
                  const selected = selectedDate && isSameDay(day, selectedDate);
                  const competitionHit = competitions
                    .map((c) => ({ c, span: competitionDayIndex(day, c.date, c.endDate) }))
                    .find((x) => x.span);
                  const dayMilestones = milestones.filter((m) => isSameDay(m.date, day));

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={`min-h-[84px] border border-border/40 p-1.5 text-left align-top ${
                        selected ? "bg-accent-soft" : "hover:bg-surface-hover"
                      }`}
                    >
                      <span
                        className={`inline-flex h-[22px] w-[22px] items-center justify-center rounded-full text-xs font-semibold ${
                          today ? "" : "text-foreground"
                        }`}
                        style={today ? { background: "#f2c14e", color: "#6b4c08" } : undefined}
                      >
                        {day.getDate()}
                      </span>

                      {competitionHit && competitionHit.span && (
                        <div className="mt-1">
                          {competitionHit.span.day === 1 ? (
                            <span
                              className="calendar-day-ring flex h-9 items-center justify-center px-1 text-center font-hand text-[13px] leading-tight text-foreground"
                            >
                              {competitionHit.c.title}
                            </span>
                          ) : (
                            <span className="font-hand text-xs text-foreground-muted">
                              {competitionLevelLabel(competitionHit.c)} · day {competitionHit.span.day}/
                              {competitionHit.span.totalDays}
                            </span>
                          )}
                        </div>
                      )}

                      {dayMilestones.map((m) => (
                        <p
                          key={m.id}
                          className="mt-1 truncate font-hand text-[13px] leading-tight"
                          style={{ color: KIND_COLORS[m.kind] }}
                        >
                          {m.title}
                        </p>
                      ))}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-7 pt-1">
          <div className="relative rounded-xl border border-border bg-background-elevated p-4 shadow-sm" style={{ transform: "rotate(-0.8deg)" }}>
            <span
              className="absolute -top-2.5 left-5 h-5 w-16 rounded-sm bg-white/70"
              style={{ border: "1px solid rgba(18,58,122,.12)" }}
              aria-hidden
            />
            <p className="text-[11px] font-bold uppercase tracking-wide text-foreground-subtle">
              Add a milestone
            </p>
            <form action={formAction} className="mt-2 space-y-2.5">
              {state?.error && <p className="text-xs text-danger">{state.error}</p>}
              <Input
                name="title"
                placeholder="e.g. Written outline due"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="font-hand text-lg"
              />
              <Input
                name="date"
                type="date"
                value={selectedDate ? formatDateInputValue(selectedDate) : ""}
                onChange={(e) => setSelectedDate(parseDateInputValue(e.target.value))}
              />
              <p className="text-xs text-foreground-subtle">or tap a day on the calendar</p>

              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(KIND_LABELS) as MilestoneKind[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKindInput(k)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                      kindInput === k
                        ? "border-transparent text-white"
                        : "border-border text-foreground-muted hover:bg-surface-hover"
                    }`}
                    style={kindInput === k ? { background: KIND_COLORS[k] } : undefined}
                  >
                    {KIND_LABELS[k]}
                  </button>
                ))}
              </div>
              <input type="hidden" name="kind" value={kindInput} />

              <Button
                type="submit"
                variant={titleInput.trim() ? "primary" : "secondary"}
                disabled={pending || !titleInput.trim() || !selectedDate}
                className="w-full"
              >
                {pending ? "Adding…" : "Add to calendar"}
              </Button>
            </form>
          </div>

          <div>
            <p className="border-b-2 border-border pb-1.5 text-xs font-bold uppercase tracking-wide text-accent">
              Upcoming milestones
            </p>
            <ul className="mt-2 space-y-2">
              {upcomingMilestones.length === 0 && (
                <li className="text-sm text-foreground-subtle">Nothing scheduled yet.</li>
              )}
              {upcomingMilestones.map((m) => (
                <li key={m.id} className="flex items-center gap-2 text-sm">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: KIND_COLORS[m.kind] }}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => goToDate(m.date)}
                    className="min-w-0 flex-1 truncate text-left text-foreground hover:underline"
                  >
                    {m.title}
                  </button>
                  <span className="shrink-0 font-hand text-sm text-foreground-subtle">
                    {format(m.date, "M/d")}
                  </span>
                  {m.createdById === currentUserId && (
                    <form action={deleteMilestone}>
                      <input type="hidden" name="milestoneId" value={m.id} />
                      <button
                        type="submit"
                        aria-label={`Remove ${m.title}`}
                        className="shrink-0 text-foreground-subtle hover:text-danger"
                      >
                        ×
                      </button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-foreground-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border-2" style={{ borderColor: "#c0392b" }} aria-hidden />
              Competition
            </span>
            {(Object.keys(KIND_LABELS) as MilestoneKind[]).map((k) => (
              <span key={k} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: KIND_COLORS[k] }} aria-hidden />
                {KIND_LABELS[k]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
