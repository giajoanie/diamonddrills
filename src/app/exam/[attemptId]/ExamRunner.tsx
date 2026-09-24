"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Flag, AlertTriangle } from "lucide-react";
import {
  saveAnswer,
  toggleFlag,
  submitExam,
  abandonExam,
} from "@/lib/actions/exam-engine";
import { computeRemainingSeconds } from "@/lib/exam-engine/timer";
import { formatTime } from "@/lib/format-time";
import { Button } from "@/components/ui/Button";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import type { User } from "@/generated/prisma/client";

type OptionKey = "A" | "B" | "C" | "D";

type ExamQuestion = {
  questionId: string;
  orderIndex: number;
  stem: string;
  instructionalArea: string | null;
  options: Record<OptionKey, string>;
  optionOrder: OptionKey[];
  studentAnswer: OptionKey | null;
  isFlagged: boolean;
};

export function ExamRunner({
  user,
  attemptId,
  examName,
  serverStartTimeIso,
  timeLimitSeconds,
  questions: initialQuestions,
  showShortfallNotice,
}: {
  user: User;
  attemptId: string;
  examName: string;
  serverStartTimeIso: string;
  timeLimitSeconds: number;
  questions: ExamQuestion[];
  showShortfallNotice: boolean;
}) {
  const serverStartTime = useMemo(
    () => new Date(serverStartTimeIso),
    [serverStartTimeIso],
  );
  const [remaining, setRemaining] = useState(() =>
    computeRemainingSeconds(serverStartTime, timeLimitSeconds),
  );
  const [answers, setAnswers] = useState<Record<string, OptionKey | null>>(() =>
    Object.fromEntries(
      initialQuestions.map((q) => [q.questionId, q.studentAnswer]),
    ),
  );
  const [flags, setFlags] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      initialQuestions.map((q) => [q.questionId, q.isFlagged]),
    ),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saving, setSaving] = useState(false);
  // Seconds elapsed since the last successful autosave, recomputed every
  // tick from a ref (not read during render) so the label stays live
  // without calling the impure Date.now() while rendering.
  const [secondsSinceSave, setSecondsSinceSave] = useState<number | null>(
    null,
  );

  const current = initialQuestions[currentIndex];

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    await submitExam(attemptId);
  }, [attemptId]);

  // Server-authoritative countdown: recomputed from serverStartTime every
  // tick, so the client clock can't pause or extend it (spec 6.4).
  useEffect(() => {
    const interval = setInterval(() => {
      const next = computeRemainingSeconds(serverStartTime, timeLimitSeconds);
      setRemaining(next);
      setSecondsSinceSave((s) => (s === null ? null : s + 1));
      if (next <= 0) {
        clearInterval(interval);
        void handleSubmit();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [serverStartTime, timeLimitSeconds, handleSubmit]);

  function selectAnswer(questionId: string, letter: OptionKey) {
    setAnswers((prev) => ({ ...prev, [questionId]: letter }));
    setSaving(true);
    void saveAnswer(attemptId, questionId, letter).then(() => {
      setSaving(false);
      setSecondsSinceSave(0);
    });
  }

  function toggleCurrentFlag() {
    const next = !flags[current.questionId];
    setFlags((prev) => ({ ...prev, [current.questionId]: next }));
    setSaving(true);
    void toggleFlag(attemptId, current.questionId, next).then(() => {
      setSaving(false);
      setSecondsSinceSave(0);
    });
  }

  const answeredCount = Object.values(answers).filter((a) => a !== null).length;
  const flaggedCount = Object.values(flags).filter(Boolean).length;
  const unansweredCount = initialQuestions.length - answeredCount;

  const isLowTime = remaining <= 60;
  const isWarningTime = remaining <= 300;

  const autosaveLabel = saving
    ? "Saving…"
    : secondsSinceSave === null
      ? "Autosave on"
      : `autosaved ${secondsSinceSave}s ago`;

  return (
    <BinderPageShell user={user} homeHref="/dashboard">
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-accent-strong px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-accent-strong">
              {examName}
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white/85">
              {autosaveLabel}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-white/85 sm:inline">
              Answered {answeredCount} · Flagged {flaggedCount}
            </span>
            <span
              className={`rounded-lg bg-background-elevated px-4 py-2 font-mono text-lg font-bold shadow-lg ${
                isLowTime
                  ? "animate-pulse text-danger"
                  : isWarningTime
                    ? "text-warning"
                    : "text-accent-strong"
              }`}
            >
              {formatTime(remaining)}
            </span>
            <form
              action={async () => {
                if (
                  confirm("Abandon this exam? Your progress will not be scored.")
                ) {
                  await abandonExam(attemptId);
                }
              }}
            >
              <button
                type="submit"
                className="rounded-full px-2 py-1 text-sm font-medium text-white/70 hover:bg-white/15 hover:text-white"
              >
                Abandon
              </button>
            </form>
          </div>
        </div>

        <div className="bg-background-elevated p-5 sm:p-7">
        <main className="grid w-full flex-1 gap-6 md:grid-cols-[1fr_220px]">
          <div>
            {showShortfallNotice && (
              <div className="mb-4 rounded-md border border-warning-border bg-warning-soft p-3 text-sm text-warning">
                Fewer questions were available than requested, so this exam
                uses all the questions currently in the bank.
              </div>
            )}
            {isWarningTime && (
              <div className="mb-4 flex items-center gap-2 rounded-md border border-warning-border bg-warning-soft p-3 text-sm text-warning">
                <AlertTriangle className="h-4 w-4" aria-hidden />
                {isLowTime ? "Less than 1 minute left!" : "5 minutes remaining."}
              </div>
            )}

            {/* "Test booklet" panel */}
            <div className="rounded-xl border border-border bg-background-elevated p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-lg font-bold text-accent-strong">
                    Q{currentIndex + 1}
                  </span>
                  {current.instructionalArea && (
                    <span className="text-xs font-bold uppercase tracking-wide text-foreground-subtle">
                      {current.instructionalArea}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={toggleCurrentFlag}
                  aria-pressed={flags[current.questionId]}
                  aria-label="Flag this question for review"
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-bold ${
                    flags[current.questionId]
                      ? "border-warning-border bg-warning-soft text-warning"
                      : "border-border text-foreground-subtle hover:border-border-strong"
                  }`}
                >
                  <Flag
                    className="h-3.5 w-3.5"
                    fill={flags[current.questionId] ? "currentColor" : "none"}
                  />
                  Flagged
                </button>
              </div>

              <p className="mt-3 font-body text-foreground">{current.stem}</p>

              <div className="mt-4 space-y-2">
                {(["A", "B", "C", "D"] as const).map((displayLetter, i) => {
                  const originalLetter = current.optionOrder[i];
                  const isSelected =
                    answers[current.questionId] === originalLetter;
                  return (
                    <button
                      key={displayLetter}
                      type="button"
                      onClick={() =>
                        selectAnswer(current.questionId, originalLetter)
                      }
                      className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                        isSelected
                          ? "border-accent-strong border-l-4 bg-accent-soft text-foreground"
                          : "border-border text-foreground-muted hover:border-border-strong"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                          isSelected
                            ? "border-accent-strong bg-accent-strong text-accent-foreground"
                            : "border-border-strong text-foreground-subtle"
                        }`}
                      >
                        {displayLetter}
                      </span>
                      <span>{current.options[originalLetter]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <Button
                variant="secondary"
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
              >
                ← Previous
              </Button>
              <p className="hidden text-center text-xs text-foreground-subtle sm:block">
                Time does NOT pause when you leave the browser!! Complete it
                in one sitting.
              </p>
              {currentIndex < initialQuestions.length - 1 ? (
                <Button onClick={() => setCurrentIndex((i) => i + 1)}>
                  Next →
                </Button>
              ) : (
                <Button onClick={() => setShowConfirmSubmit(true)}>
                  Submit exam
                </Button>
              )}
            </div>
          </div>

          {/* "Punched answer sheet" navigator */}
          <nav
            aria-label="Question navigator"
            className="order-first md:order-none"
          >
            <div className="rounded-xl border border-border bg-background-elevated p-3 shadow-sm">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-foreground-subtle">
                Answer sheet
              </p>
              <div className="grid grid-cols-8 gap-1.5 md:grid-cols-5">
                {initialQuestions.map((q, i) => {
                  const answered = answers[q.questionId] !== null;
                  const flagged = flags[q.questionId];
                  const isCurrent = i === currentIndex;
                  return (
                    <button
                      key={q.questionId}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={`relative h-9 rounded-md text-xs font-bold ${
                        isCurrent
                          ? "bg-accent-strong text-accent-foreground"
                          : flagged
                            ? "bg-highlight text-highlight-foreground"
                            : answered
                              ? "bg-accent text-accent-foreground"
                              : "border border-border bg-background-elevated text-foreground-muted"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex flex-col gap-1.5 border-t border-border pt-3 text-xs text-foreground-muted">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-accent" /> Answered
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm border border-border bg-background-elevated" />{" "}
                  Unanswered
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-highlight" /> Flagged
                </span>
              </div>

              <p className="mt-3 text-center text-xs text-foreground-subtle">
                {unansweredCount} unanswered · {flaggedCount} flagged
              </p>
            </div>
            <Button
              className="mt-4 w-full"
              onClick={() => setShowConfirmSubmit(true)}
            >
              Submit exam
            </Button>
          </nav>
        </main>
        </div>
      </div>

      {showConfirmSubmit && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-xl border border-border bg-background-elevated p-5 shadow-lg">
            <h2 className="font-display text-lg font-bold text-foreground">
              Submit this exam?
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              {unansweredCount} unanswered, {flaggedCount} flagged for review.
              This can&apos;t be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowConfirmSubmit(false)}
              >
                Keep working
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting…" : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </BinderPageShell>
  );
}
