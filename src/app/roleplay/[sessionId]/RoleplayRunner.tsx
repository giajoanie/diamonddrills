"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { saveRoleplayNotes, completeRoleplaySession, type CompleteRoleplayState } from "@/lib/actions/roleplay";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

type Criterion = { id: string; name: string; maxPoints: number };
type Rubric = { id: string; name: string; criteria: Criterion[] };

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function RoleplayRunner({
  sessionId,
  startedAtIso,
  prepSeconds,
  presentationSeconds,
  initialNotes,
  caseStudy,
  rubrics,
}: {
  sessionId: string;
  startedAtIso: string;
  prepSeconds: number;
  presentationSeconds: number;
  initialNotes: string;
  caseStudy: { name: string; fileUrl: string | null; externalUrl: string | null } | null;
  rubrics: Rubric[];
}) {
  const startedAt = useMemo(() => new Date(startedAtIso), [startedAtIso]);
  const [now, setNow] = useState(() => Date.now());
  const [notes, setNotes] = useState(initialNotes);

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
          <a
            href={caseStudy.fileUrl ? `/files/${caseStudy.fileUrl}` : (caseStudy.externalUrl ?? "#")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline"
          >
            {caseStudy.name}
          </a>
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

      {phase === "DONE" && (
        <div className="rounded-lg border border-border bg-background-elevated p-5">
          <p className="mb-3 font-medium text-foreground">Self-rating</p>
          {rubrics.length === 0 ? (
            <p className="text-sm text-foreground-muted">
              No rubrics have been created yet — ask a mentor to build one to self-rate against.
            </p>
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

              {selectedRubric?.criteria.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-3">
                  <input type="hidden" name="criterionId" value={c.id} />
                  <Label htmlFor={`rating-${c.id}`} className="mb-0">
                    {c.name}
                  </Label>
                  <Input
                    id={`rating-${c.id}`}
                    name={`rating-${c.id}`}
                    type="number"
                    min={0}
                    max={c.maxPoints}
                    className="w-24"
                  />
                  <span className="w-16 shrink-0 text-sm text-foreground-subtle">/ {c.maxPoints}</span>
                </div>
              ))}

              <Button type="submit" disabled={completing}>
                {completing ? "Saving…" : "Save self-rating"}
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
