"use client";

import { useActionState } from "react";
import { regenerateStudyPlan, type RegenerateStudyPlanState } from "@/lib/actions/study-plan";
import { Button } from "@/components/ui/Button";
import { FieldError } from "@/components/ui/Field";

export function RegenerateStudyPlanForm({ hasExistingPlan }: { hasExistingPlan: boolean }) {
  const [state, action, pending] = useActionState<RegenerateStudyPlanState, FormData>(
    regenerateStudyPlan,
    undefined,
  );

  return (
    <form action={action}>
      {state?.error && <FieldError messages={[state.error]} />}
      <p className="mb-2 text-sm text-foreground-muted">
        Rebuilds your plan from scratch based on your current weakest areas and the next
        competition date. {hasExistingPlan && "Replaces any sessions you haven't completed yet."}
      </p>
      <Button type="submit" variant={hasExistingPlan ? "secondary" : "primary"} disabled={pending}>
        {pending ? "Generating…" : hasExistingPlan ? "Regenerate plan" : "Generate my study plan"}
      </Button>
    </form>
  );
}
