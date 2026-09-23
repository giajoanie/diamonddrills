"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Link as LinkIcon, Pause, Play, RotateCcw, X } from "lucide-react";
import { logResourceOpen } from "@/lib/actions/resources";
import { Button } from "@/components/ui/Button";

type CaseStudy = {
  id: string;
  name: string;
  description: string | null;
  fileUrl: string | null;
  externalUrl: string | null;
};

function formatElapsed(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * On-demand case study access, separate from the graded roleplay session's
 * server-authoritative competition timer (RoleplayRunner). This is purely a
 * self-paced practice aid: the timer here is client-only, optional, and the
 * student fully controls start/pause/reset — nothing auto-submits.
 */
export function CaseStudyDrawer({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const tickStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isRunning) return;
    tickStartRef.current = Date.now() - elapsedMs;
    const id = setInterval(() => {
      setElapsedMs(Date.now() - (tickStartRef.current ?? Date.now()));
    }, 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only restart the interval on isRunning changes, not every elapsedMs tick
  }, [isRunning]);

  return (
    <>
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        Case studies{caseStudies.length > 0 ? ` (${caseStudies.length})` : ""}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Close case studies"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-foreground/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Case studies"
            className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-surface p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-foreground">Case studies</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="rounded-full p-1 text-foreground-muted hover:bg-surface-hover hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-sm text-foreground-muted">
              Open any of these whenever you want — no forced prep/present timer. Use the stopwatch
              below only if you want to time yourself, and pause it any time.
            </p>

            <div className="mt-4 flex items-center gap-3 rounded-md border border-border bg-surface-hover px-4 py-3">
              <span className="font-display text-2xl tabular-nums text-foreground">
                {formatElapsed(elapsedMs)}
              </span>
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsRunning((r) => !r)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent-strong hover:bg-accent-soft/80"
                  aria-label={isRunning ? "Pause timer" : "Start timer"}
                >
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRunning(false);
                    setElapsedMs(0);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-hover text-foreground-muted hover:text-foreground"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {caseStudies.length === 0 && (
                <p className="text-sm text-foreground-muted">
                  No case studies are available for your event yet — check back once your mentor
                  uploads some.
                </p>
              )}
              {caseStudies.map((c) => {
                const href = c.fileUrl ? `/files/${c.fileUrl}` : (c.externalUrl ?? "#");
                return (
                  <a
                    key={c.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => void logResourceOpen(c.id)}
                    className="flex items-start gap-3 rounded-md border border-border bg-surface p-3 transition-shadow hover:shadow-md"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                      {c.fileUrl ? (
                        <FileText className="h-4 w-4 text-accent-strong" aria-hidden />
                      ) : (
                        <LinkIcon className="h-4 w-4 text-accent-strong" aria-hidden />
                      )}
                    </span>
                    <div>
                      <p className="font-display font-bold text-foreground">{c.name}</p>
                      {c.description && (
                        <p className="mt-1 text-sm text-foreground-muted">{c.description}</p>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-6 rounded-md border border-border bg-accent-soft p-3">
              <p className="text-sm text-foreground-muted">
                AI-generated case studies scoped to NorCal&apos;s district instructional areas are
                planned here next — not live yet.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
