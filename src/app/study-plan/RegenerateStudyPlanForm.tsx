"use client";

import { useActionState, useState } from "react";
import { regenerateStudyPlan, type RegenerateStudyPlanState } from "@/lib/actions/study-plan";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

export function RegenerateStudyPlanForm({
  hasExistingPlan,
  defaultMinutesPerDay,
}: {
  hasExistingPlan: boolean;
  defaultMinutesPerDay: number;
}) {
  const [state, action, pending] = useActionState<RegenerateStudyPlanState, FormData>(
    regenerateStudyPlan,
    undefined,
  );
  const [minutesPerDay, setMinutesPerDay] = useState(defaultMinutesPerDay);

  return (
    <form action={action}>
      {state?.error && <FieldError messages={[state.error]} />}
      <p className="mb-3 text-sm text-foreground-muted">
        Rebuilds your plan from your current weakest areas and the next competition date.{" "}
        {hasExistingPlan && "Unfinished sessions get replaced."}
      </p>

      <div className="mb-3">
        <Label htmlFor="minutesPerDay">Minutes a day you want to study</Label>
        <Input
          id="minutesPerDay"
          name="minutesPerDay"
          type="number"
          min={5}
          max={240}
          step={5}
          value={minutesPerDay}
          onChange={(e) => setMinutesPerDay(Number(e.target.value))}
        />
        <p className="mt-1 text-xs text-foreground-subtle">
          More time a day means closer-together, more frequent sessions.
        </p>
      </div>

      <Button type="submit" variant={hasExistingPlan ? "secondary" : "primary"} disabled={pending}>
        {pending ? "Generating…" : hasExistingPlan ? "Regenerate plan" : "Generate my study plan"}
      </Button>
    </form>
  );
}
