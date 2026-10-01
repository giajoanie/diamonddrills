"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitJudgeScore, type SubmitJudgeScoreState } from "@/lib/actions/judge";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

type Criterion = { id: string; name: string; description: string | null; maxPoints: number };
type Rubric = { id: string; name: string; criteria: Criterion[] };
type SwapRolesWith = { partnerId: string; partnerName: string };

// Matches the generic criterion names seed-official-rubrics.ts writes
// ("Performance Indicator 3", "Standard 2") so position N can be swapped
// for that session's actual PI text from its case study.
const PI_CRITERION_NAME = /^(Performance Indicator|Standard) (\d+)$/;

export function JudgeScoreForm({
  sessionId,
  rubrics,
  caseStudyPIs,
  judgeDisplayName,
  swapRolesWith,
}: {
  sessionId: string;
  rubrics: Rubric[];
  caseStudyPIs: string[];
  judgeDisplayName: string | null;
  swapRolesWith: SwapRolesWith | null;
}) {
  const [selectedRubricId, setSelectedRubricId] = useState(rubrics[0]?.id ?? "");
  const selectedRubric = rubrics.find((r) => r.id === selectedRubricId) ?? null;

  const [state, formAction, submitting] = useActionState<SubmitJudgeScoreState, FormData>(
    submitJudgeScore,
    undefined,
  );

  if (state?.success) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-foreground-muted">
          Score submitted. The student will see your feedback on their roleplay results.
        </p>
        {swapRolesWith && (
          <div>
            <p className="mb-2 text-sm text-foreground-muted">
              Now it&apos;s your turn — start your own roleplay and{" "}
              {swapRolesWith.partnerName} will get invited to judge you back.
            </p>
            <Link href={`/roleplay/start?invitePartnerId=${swapRolesWith.partnerId}`}>
              <Button variant="secondary">Start my roleplay</Button>
            </Link>
          </div>
        )}
      </div>
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

      {selectedRubric?.criteria.map((c) => {
        const piMatch = c.name.match(PI_CRITERION_NAME);
        const piText = piMatch ? caseStudyPIs[Number(piMatch[2]) - 1] : undefined;

        return (
          <div key={c.id} className="border-b border-border pb-3">
            <input type="hidden" name="criterionId" value={c.id} />
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              {c.name}
            </p>
            <p className="mt-0.5 text-sm text-foreground">{piText ?? c.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <Input
                id={`score-${c.id}`}
                name={`score-${c.id}`}
                type="number"
                min={0}
                max={c.maxPoints}
                className="w-20"
                aria-label={`Score for ${c.name}`}
                required
              />
              <span className="text-sm text-foreground-subtle">/ {c.maxPoints}</span>
            </div>
          </div>
        );
      })}

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
