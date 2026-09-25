"use client";

import { useActionState } from "react";
import { createCalendarEvent, type CreateCalendarEventState } from "@/lib/actions/announcements";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select, FieldError } from "@/components/ui/Field";

export function CalendarForm() {
  const [state, action, pending] = useActionState<CreateCalendarEventState, FormData>(
    createCalendarEvent,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      {state?.error && <FieldError messages={[state.error]} />}

      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="datetime-local" required />
        </div>
        <div>
          <Label htmlFor="endDate">End date (optional, for multi-day competitions)</Label>
          <Input id="endDate" name="endDate" type="datetime-local" />
        </div>
      </div>

      <div>
        <Label htmlFor="level">Level (optional)</Label>
        <Select id="level" name="level" defaultValue="">
          <option value="">Not level-specific</option>
          <option value="DISTRICT">District</option>
          <option value="STATE">State</option>
          <option value="ICDC">ICDC</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description (optional)</Label>
        <textarea
          id="description"
          name="description"
          rows={2}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
        />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Adding…" : "Add to calendar"}
      </Button>
    </form>
  );
}
