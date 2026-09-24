"use client";

import { useActionState } from "react";
import { generateMilestonePlan, type GenerateMilestonePlanState } from "@/lib/actions/written-events";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

export function GenerateMilestonePlanForm({
  eventId,
  defaultTargetDate,
  hasSections,
}: {
  eventId: string;
  defaultTargetDate: string;
  hasSections: boolean;
}) {
  const [state, action, pending] = useActionState<GenerateMilestonePlanState, FormData>(
    generateMilestonePlan,
    undefined,
  );

  return (
    <form action={action} className="flex flex-wrap items-end gap-3 border-t border-border pt-4">
      <input type="hidden" name="eventId" value={eventId} />
      <div>
        <Label htmlFor="targetDate">Have the entire written done by</Label>
        <Input id="targetDate" name="targetDate" type="date" defaultValue={defaultTargetDate} required />
      </div>
      <Button type="submit" variant="secondary" disabled={pending || !hasSections}>
        {pending ? "Building plan…" : "Generate section-by-section plan"}
      </Button>
      {!hasSections && (
        <p className="w-full text-xs text-foreground-subtle">
          Add required sections to the checklist above first.
        </p>
      )}
      {state?.error && <FieldError messages={[state.error]} />}
    </form>
  );
}
