"use client";

import { useActionState } from "react";
import { saveChecklist, type SaveChecklistState } from "@/lib/actions/written-events";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

export function ChecklistForm({
  eventId,
  pageLimit,
  requiredSections,
  formattingNotes,
}: {
  eventId: string;
  pageLimit: number | null;
  requiredSections: string[];
  formattingNotes: string;
}) {
  const [state, action, pending] = useActionState<SaveChecklistState, FormData>(
    saveChecklist,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      {state?.error && <FieldError messages={[state.error]} />}
      <input type="hidden" name="eventId" value={eventId} />

      <div>
        <Label htmlFor="pageLimit">Page limit (optional)</Label>
        <Input id="pageLimit" name="pageLimit" type="number" min={1} defaultValue={pageLimit ?? ""} />
      </div>

      <div>
        <Label htmlFor="requiredSections">Required sections (one per line)</Label>
        <textarea
          id="requiredSections"
          name="requiredSections"
          rows={6}
          defaultValue={requiredSections.join("\n")}
          placeholder={"Executive Summary\nStatement of the Problem\n..."}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
        />
      </div>

      <div>
        <Label htmlFor="formattingNotes">Formatting requirements (optional)</Label>
        <textarea
          id="formattingNotes"
          name="formattingNotes"
          rows={3}
          defaultValue={formattingNotes}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
        />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save checklist"}
      </Button>
    </form>
  );
}
