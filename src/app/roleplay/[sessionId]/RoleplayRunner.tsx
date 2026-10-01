"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { saveRoleplayNotes, completeRoleplaySession, type CompleteRoleplayState } from "@/lib/actions/roleplay";
import { formatTime } from "@/lib/format-time";
import {
  getCaseStudyPreview,
  getCaseStudyPerformanceIndicators,
  getCaseStudyForParticipant,
} from "@/lib/case-study-format";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

// Matches the generic criterion names seed-official-rubrics.ts writes
// ("Performance Indicator 3", "Standard 2") so position N can be swapped
// for this session's actual PI text from its case study.
const PI_CRITERION_NAME = /^(Performance Indicator|Standard) (\d+)$/;

type Criterion = { id: string; name: string; maxPoints: number };
type Rubric = { id: string; name: string; criteria: Criterion[] };
type JudgeScore = {
  id: string;
  judgeId: string | null;
  judgeName: string | null;
  judge: { firstName: string } | null;
  scores: unknown;
  comments: string | null;
};

export function RoleplayRunner({
  sessionId,
  startedAtIso,
  prepSeconds,
  presentationSeconds,
  initialNotes,
  caseStudy,
  rubrics,
  judgeScores,
}: {
  sessionId: string;
  startedAtIso: string;
  prepSeconds: number;
  presentationSeconds: number;
  initialNotes: string;
  caseStudy: {
    name: string;
    fileUrl: string | null;
    externalUrl: string | null;
    description: string | null;
  } | null;
  rubrics: Rubric[];
  judgeScores: JudgeScore[];
}) {
  const startedAt = useMemo(() => new Date(startedAtIso), [startedAtIso]);
  const [now, setNow] = useState(() => Date.now());
  const [notes, setNotes] = useState(initialNotes);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const formData = new FormData();
      formData.set("sessionId", sessionId);
      formData.set("notes", notes);
      void saveRoleplayNotes(formData);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [sessionId, notes]);

  const elapsedSeconds = Math.floor((now - startedAt.getTime()) / 1000);
  const phase =
    elapsedSeconds < prepSeconds
      ? "PREP"
      : elapsedSeconds < prepSeconds + presentationSeconds
        ? "PRESENTATION"
        : "DONE";
  const remaining =
    phase === "PREP"
      ? prepSeconds - elapsedSeconds
      : phase === "PRESENTATION"
        ? prepSeconds + presentationSeconds - elapsedSeconds
        : 0;

  const [selectedRubricId, setSelectedRubricId] = useState(rubrics[0]?.id ?? "");
  const selectedRubric = rubrics.find((r) => r.id === selectedRubricId) ?? null;
  const criteriaById = useMemo(() => {
    const map = new Map<string, Criterion>();
    for (const rubric of rubrics) {
      for (const criterion of rubric.criteria) map.set(criterion.id, criterion);
    }
    return map;
  }, [rubrics]);
  const caseStudyPIs = useMemo(
    () => (caseStudy?.description ? getCaseStudyPerformanceIndicators(caseStudy.description) : []),
    [caseStudy],
  );
  function piTextFor(criterionName: string): string | undefined {
    const match = criterionName.match(PI_CRITERION_NAME);
    return match ? caseStudyPIs[Number(match[2]) - 1] : undefined;
  }

  const [completeState, completeAction, completing] = useActionState<CompleteRoleplayState, FormData>(
    completeRoleplaySession,
    undefined,
  );

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-background-elevated p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
          {phase === "PREP" ? "Prep time" : phase === "PRESENTATION" ? "Presentation time" : "Time's up"}
        </p>
        <p className="text-3xl font-semibold text-foreground">{formatTime(Math.max(0, remaining))}</p>
      </div>

      {caseStudy && (
        <div className="rounded-lg border border-border bg-background-elevated p-5">
          <p className="mb-1 font-medium text-foreground">Case study</p>
          <p className="text-sm text-foreground">{caseStudy.name}</p>
          {caseStudy.description && (
            <p className="mt-0.5 text-xs text-foreground-subtle">
              {getCaseStudyPreview(caseStudy.description)}
            </p>
          )}

          {/* Case studies are plain text, not files (see ResourceCard's reader) —
             an external link only exists for the rare mentor-uploaded case study. */}
          {caseStudy.fileUrl || caseStudy.externalUrl ? (
            <a
              href={caseStudy.fileUrl ? `/files/${caseStudy.fileUrl}` : caseStudy.externalUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-accent hover:underline"
            >
              Open case study ↗
            </a>
          ) : (
            caseStudy.description && (
              <>
                <button
                  type="button"
                  onClick={() => setCaseStudyOpen((o) => !o)}
                  className="mt-2 text-sm font-medium text-accent hover:underline"
                >
                  {caseStudyOpen ? "Hide case study" : "Read case study"}
                </button>
                {caseStudyOpen && (
                  <div className="mt-3 max-h-96 overflow-y-auto whitespace-pre-wrap rounded-md border border-border bg-surface p-3 text-sm leading-relaxed text-foreground-muted">
                    {getCaseStudyForParticipant(caseStudy.description)}
                  </div>
                )}
              </>
            )
          )}
        </div>
      )}

      <div className="rounded-lg border border-border bg-background-elevated p-5">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          rows={8}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
        />
      </div>

      {phase === "DONE" && judgeScores.length > 0 && (
        <div className="rounded-lg border border-border bg-background-elevated p-5">
          <p className="mb-3 font-medium text-foreground">
            {judgeScores.length === 1 ? "What your judge scored" : "What your judges scored"}
          </p>
          <div className="space-y-4">
            {judgeScores.map((js) => {
              const scores = (js.scores as Record<string, number>) ?? {};
              const ids = Object.keys(scores);
              const earned = ids.reduce((sum, id) => sum + scores[id], 0);
              const possible = ids.reduce((sum, id) => sum + (criteriaById.get(id)?.maxPoints ?? 0), 0);
              const judgeDisplayName = js.judgeName ?? js.judge?.firstName ?? "A judge";
              return (
                <div key={js.id} className="border-t border-border pt-3 first:border-0 first:pt-0">
                  <p className="text-sm font-medium text-foreground">
                    {judgeDisplayName} · {earned} / {possible}
                  </p>
                  <ul className="mt-1 space-y-1 text-sm">
                    {ids.map((id) => {
                      const criterionName = criteriaById.get(id)?.name ?? id;
                      return (
                        <li key={id} className="flex items-center justify-between gap-3">
                          <span className="text-foreground-muted">
                            {piTextFor(criterionName) ?? criterionName}
                          </span>
                          <span className="text-foreground-subtle">
                            {scores[id]} / {criteriaById.get(id)?.maxPoints ?? "?"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  {js.comments && (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-foreground-muted">{js.comments}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {phase === "DONE" && (
        <div className="rounded-lg border border-border bg-background-elevated p-5">
          <p className="mb-3 font-medium text-foreground">Self-rating</p>
          {rubrics.length === 0 ? (
            <form action={completeAction} className="space-y-3">
              {completeState?.error && <FieldError messages={[completeState.error]} />}
              <input type="hidden" name="sessionId" value={sessionId} />
              <p className="text-sm text-foreground-muted">
                No rubrics have been created yet — ask a mentor to build one to self-rate against.
              </p>
              <Button type="submit" disabled={completing}>
                {completing ? "Finishing…" : "Finish without self-rating"}
              </Button>
            </form>
          ) : (
            <form action={completeAction} className="space-y-3">
              {completeState?.error && <FieldError messages={[completeState.error]} />}
              <input type="hidden" name="sessionId" value={sessionId} />
              <div>
                <Label htmlFor="rubricId">Rubric</Label>
                <select
                  id="rubricId"
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
                  value={selectedRubricId}
                  onChange={(e) => setSelectedRubricId(e.target.value)}
                >
                  {rubrics.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedRubric?.criteria.map((c) => {
                const piText = piTextFor(c.name);
                return (
                  <div key={c.id} className="border-b border-border pb-3">
                    <input type="hidden" name="criterionId" value={c.id} />
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
                      {c.name}
                    </p>
                    {piText && <p className="mt-0.5 text-sm text-foreground">{piText}</p>}
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        id={`rating-${c.id}`}
                        name={`rating-${c.id}`}
                        type="number"
                        min={0}
                        max={c.maxPoints}
                        className="w-20"
                        aria-label={`Self-rating for ${c.name}`}
                      />
                      <span className="text-sm text-foreground-subtle">/ {c.maxPoints}</span>
                    </div>
                  </div>
                );
              })}

              <div className="flex flex-wrap gap-2">
                <Button type="submit" disabled={completing}>
                  {completing ? "Saving…" : "Save self-rating"}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
