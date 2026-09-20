"use client";

import { useActionState } from "react";
import { logIntervention, type LogInterventionState } from "@/lib/actions/mentor";
import { Button } from "@/components/ui/Button";
import { Label, Select, FieldError } from "@/components/ui/Field";

type InstructionalArea = { id: string; name: string };

export function InterventionForm({
  studentId,
  instructionalAreas,
}: {
  studentId: string;
  instructionalAreas: InstructionalArea[];
}) {
  const [state, action, pending] = useActionState<LogInterventionState, FormData>(
    logIntervention,
    undefined,
  );

  return (
    <form action={action} className="space-y-3">
      {state?.error && <FieldError messages={[state.error]} />}
      <input type="hidden" name="studentId" value={studentId} />
      <div>
        <Label htmlFor="note">Add a note</Label>
        <textarea
          id="note"
          name="note"
          rows={2}
          required
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
        />
      </div>
      <div>
        <Label htmlFor="instructionalAreaId">Instructional area (optional)</Label>
        <Select id="instructionalAreaId" name="instructionalAreaId" defaultValue="">
          <option value="">None</option>
          {instructionalAreas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </Select>
      </div>
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Saving…" : "Add note"}
      </Button>
    </form>
  );
}
