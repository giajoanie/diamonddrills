"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Flag, AlertTriangle } from "lucide-react";
import { saveAnswer, toggleFlag, submitExam, abandonExam } from "@/lib/actions/exam-engine";
import { computeRemainingSeconds } from "@/lib/exam-engine/timer";
import { formatTime } from "@/lib/format-time";
import { Button } from "@/components/ui/Button";

type OptionKey = "A" | "B" | "C" | "D";

type ExamQuestion = {
  questionId: string;
  orderIndex: number;
  stem: string;
  options: Record<OptionKey, string>;
  optionOrder: OptionKey[];
  studentAnswer: OptionKey | null;
  isFlagged: boolean;
};

export function ExamRunner({
  attemptId,
  serverStartTimeIso,
  timeLimitSeconds,
  questions: initialQuestions,
  showShortfallNotice,
}: {
  attemptId: string;
  serverStartTimeIso: string;
  timeLimitSeconds: number;
  questions: ExamQuestion[];
  showShortfallNotice: boolean;
}) {
  const serverStartTime = useMemo(() => new Date(serverStartTimeIso), [serverStartTimeIso]);
  const [remaining, setRemaining] = useState(() =>
    computeRemainingSeconds(serverStartTime, timeLimitSeconds),
  );
  const [answers, setAnswers] = useState<Record<string, OptionKey | null>>(() =>
    Object.fromEntries(initialQuestions.map((q) => [q.questionId, q.studentAnswer])),
  );
  const [flags, setFlags] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(initialQuestions.map((q) => [q.questionId, q.isFlagged])),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
      if (next <= 0) {
        clearInterval(interval);
        void handleSubmit();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [serverStartTime, timeLimitSeconds, handleSubmit]);

  function selectAnswer(questionId: string, letter: OptionKey) {
    setAnswers((prev) => ({ ...prev, [questionId]: letter }));
    void saveAnswer(attemptId, questionId, letter);
  }

  function toggleCurrentFlag() {
    const next = !flags[current.questionId];
    setFlags((prev) => ({ ...prev, [current.questionId]: next }));
    void toggleFlag(attemptId, current.questionId, next);
  }

  const answeredCount = Object.values(answers).filter((a) => a !== null).length;
  const flaggedCount = Object.values(flags).filter(Boolean).length;
  const unansweredCount = initialQuestions.length - answeredCount;

  const isLowTime = remaining <= 60;
  const isWarningTime = remaining <= 300;

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={`sticky top-0 z-10 border-b border-border px-4 py-3 sm:px-6 ${
          isLowTime ? "bg-danger/10" : isWarningTime ? "bg-warning/10" : "bg-background"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-medium text-foreground">
            Question {currentIndex + 1} of {initialQuestions.length}
          </span>
          <span
            className={`font-mono text-lg font-semibold ${
              isLowTime ? "text-danger" : isWarningTime ? "text-warning" : "text-foreground"
            }`}
          >
            {formatTime(remaining)}
          </span>
          <form
            action={async () => {
              if (confirm("Abandon this exam? Your progress will not be scored.")) {
                await abandonExam(attemptId);
              }
            }}
          >
            <Button type="submit" variant="ghost">
              Abandon
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-5xl flex-1 gap-6 px-4 py-6 sm:px-6 md:grid-cols-[1fr_220px]">
        <div>
          {showShortfallNotice && (
            <div className="mb-4 rounded-md border border-warning/40 bg-warning/10 p-3 text-sm text-warning">
              Fewer questions were available than requested, so this exam uses all the questions
              currently in the bank.
            </div>
          )}
          {isWarningTime && (
            <div className="mb-4 flex items-center gap-2 rounded-md border border-warning/40 bg-warning/10 p-3 text-sm text-warning">
              <AlertTriangle className="h-4 w-4" aria-hidden />
              {isLowTime ? "Less than 1 minute left!" : "5 minutes remaining."}
            </div>
          )}

          <div className="rounded-lg border border-border bg-background-elevated p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="text-foreground">{current.stem}</p>
              <button
                type="button"
                onClick={toggleCurrentFlag}
                aria-pressed={flags[current.questionId]}
                aria-label="Flag this question for review"
                className={`shrink-0 rounded-md p-2 ${
                  flags[current.questionId]
                    ? "text-warning"
                    : "text-foreground-subtle hover:text-foreground-muted"
                }`}
              >
                <Flag className="h-5 w-5" fill={flags[current.questionId] ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {(["A", "B", "C", "D"] as const).map((displayLetter, i) => {
                const originalLetter = current.optionOrder[i];
                const isSelected = answers[current.questionId] === originalLetter;
                return (
                  <button
                    key={displayLetter}
                    type="button"
                    onClick={() => selectAnswer(current.questionId, originalLetter)}
                    className={`flex w-full items-start gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors ${
                      isSelected
                        ? "border-accent bg-accent-soft text-foreground"
                        : "border-border text-foreground-muted hover:border-border-strong"
                    }`}
                  >
                    <span className="font-medium">{displayLetter}.</span>
                    <span>{current.options[originalLetter]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <Button
              variant="secondary"
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>
            {currentIndex < initialQuestions.length - 1 ? (
              <Button onClick={() => setCurrentIndex((i) => i + 1)}>Next</Button>
            ) : (
              <Button onClick={() => setShowConfirmSubmit(true)}>Submit exam</Button>
            )}
          </div>
        </div>

        <nav aria-label="Question navigator" className="order-first md:order-none">
          <p className="mb-2 text-sm font-medium text-foreground-muted">
            {answeredCount}/{initialQuestions.length} answered
          </p>
          <div className="grid grid-cols-8 gap-1.5 md:grid-cols-5">
            {initialQuestions.map((q, i) => {
              const answered = answers[q.questionId] !== null;
              const flagged = flags[q.questionId];
              return (
                <button
                  key={q.questionId}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  className={`relative h-9 rounded text-xs font-medium ${
                    i === currentIndex
                      ? "ring-2 ring-accent"
                      : answered
                        ? "bg-accent-soft text-foreground"
                        : "bg-surface text-foreground-muted"
                  }`}
                >
                  {i + 1}
                  {flagged && (
                    <Flag className="absolute -right-1 -top-1 h-3 w-3 fill-warning text-warning" />
                  )}
                </button>
              );
            })}
          </div>
          <Button className="mt-4 w-full" onClick={() => setShowConfirmSubmit(true)}>
            Submit exam
          </Button>
        </nav>
      </main>

      {showConfirmSubmit && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-lg border border-border bg-background-elevated p-5">
            <h2 className="text-lg font-semibold text-foreground">Submit this exam?</h2>
            <p className="mt-2 text-sm text-foreground-muted">
              {unansweredCount} unanswered, {flaggedCount} flagged for review. This can&apos;t be
              undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowConfirmSubmit(false)}>
                Keep working
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting…" : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
