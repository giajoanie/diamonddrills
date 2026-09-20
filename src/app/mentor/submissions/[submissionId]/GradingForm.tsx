"use client";

import { useActionState } from "react";
import { gradeSubmission, requestResubmission, type GradeSubmissionState } from "@/lib/actions/grading";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

type Criterion = { id: string; name: string; maxPoints: number };
type ExistingScore = { criterionId: string; score: number };

export function GradingForm({
  submissionId,
  criteria,
  existingScores,
  existingFeedback,
}: {
  submissionId: string;
  criteria: Criterion[];
  existingScores: ExistingScore[];
  existingFeedback: string | null;
}) {
  const [state, action, pending] = useActionState<GradeSubmissionState, FormData>(
    gradeSubmission,
    undefined,
  );
  const scoreByCriterion = new Map(existingScores.map((s) => [s.criterionId, s.score]));

  return (
    <div className="space-y-6">
      <form action={action} className="space-y-4">
        {state?.error && <FieldError messages={[state.error]} />}
        <input type="hidden" name="submissionId" value={submissionId} />

        {criteria.length > 0 && (
          <div className="space-y-3">
            {criteria.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-3">
                <Label htmlFor={`score-${c.id}`} className="mb-0">
                  {c.name}
                </Label>
                <Input
                  id={`score-${c.id}`}
                  name={`score-${c.id}`}
                  type="number"
                  min={0}
                  max={c.maxPoints}
                  defaultValue={scoreByCriterion.get(c.id) ?? ""}
                  className="w-24"
                />
                <span className="w-16 shrink-0 text-sm text-foreground-subtle">/ {c.maxPoints}</span>
              </div>
            ))}
          </div>
        )}

        <div>
          <Label htmlFor="feedback">Feedback</Label>
          <textarea
            id="feedback"
            name="feedback"
            rows={3}
            defaultValue={existingFeedback ?? ""}
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
          />
        </div>

        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save grade"}
        </Button>
      </form>

      <form action={requestResubmission} className="space-y-2 border-t border-border pt-4">
        <input type="hidden" name="submissionId" value={submissionId} />
        <Label htmlFor="resubmissionFeedback">Request a resubmission</Label>
        <textarea
          id="resubmissionFeedback"
          name="feedback"
          rows={2}
          placeholder="What should the student fix?"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
        />
        <Button type="submit" variant="secondary">
          Request resubmission
        </Button>
      </form>
    </div>
  );
}
