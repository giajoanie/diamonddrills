"use client";

import { useActionState, useState } from "react";
import { submitJudgeScore, type SubmitJudgeScoreState } from "@/lib/actions/judge";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

type Criterion = { id: string; name: string; maxPoints: number };
type Rubric = { id: string; name: string; criteria: Criterion[] };

export function JudgeScoreForm({
  sessionId,
  rubrics,
  judgeDisplayName,
}: {
  sessionId: string;
  rubrics: Rubric[];
  judgeDisplayName: string | null;
}) {
  const [selectedRubricId, setSelectedRubricId] = useState(rubrics[0]?.id ?? "");
  const selectedRubric = rubrics.find((r) => r.id === selectedRubricId) ?? null;

  const [state, formAction, submitting] = useActionState<SubmitJudgeScoreState, FormData>(
    submitJudgeScore,
    undefined,
  );

  if (state?.success) {
    return (
      <p className="text-sm text-foreground-muted">
        Score submitted. The student will see your feedback on their roleplay results.
      </p>
    );
  }

  if (rubrics.length === 0) {
    return (
      <p className="text-sm text-foreground-muted">
        No rubrics have been created yet — ask a mentor to build one before judging.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      {state?.error && <FieldError messages={[state.error]} />}
      <input type="hidden" name="sessionId" value={sessionId} />

      {judgeDisplayName ? (
        <p className="text-sm text-foreground-muted">Judging as {judgeDisplayName}</p>
      ) : (
        <div>
          <Label htmlFor="judgeName">Your name</Label>
          <Input id="judgeName" name="judgeName" type="text" required />
        </div>
      )}

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
          <Label htmlFor={`score-${c.id}`} className="mb-0">
            {c.name}
          </Label>
          <Input
            id={`score-${c.id}`}
            name={`score-${c.id}`}
            type="number"
            min={0}
            max={c.maxPoints}
            className="w-24"
            required
          />
          <span className="w-16 shrink-0 text-sm text-foreground-subtle">/ {c.maxPoints}</span>
        </div>
      ))}

      <div>
        <Label htmlFor="comments">Comments (optional)</Label>
        <textarea
          id="comments"
          name="comments"
          rows={4}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
        />
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit score"}
      </Button>
    </form>
  );
}
