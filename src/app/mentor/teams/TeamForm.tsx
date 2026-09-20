"use client";

import { useActionState } from "react";
import { createTeam, type CreateTeamState } from "@/lib/actions/teams";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select, FieldError } from "@/components/ui/Field";

type EventOption = { id: string; name: string; teamSizeMax: number; cluster: { name: string } };
type Student = { id: string; firstName: string; schoolId: string };

export function TeamForm({ events, students }: { events: EventOption[]; students: Student[] }) {
  const [state, action, pending] = useActionState<CreateTeamState, FormData>(createTeam, undefined);

  return (
    <form action={action} className="space-y-4">
      {state?.error && <FieldError messages={[state.error]} />}

      <div>
        <Label htmlFor="eventId">Event</Label>
        <Select id="eventId" name="eventId" defaultValue="">
          <option value="" disabled>
            Choose a team event
          </option>
          {events.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} ({e.cluster.name}) · up to {e.teamSizeMax}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="name">Team name (optional)</Label>
        <Input id="name" name="name" />
      </div>

      <div>
        <Label htmlFor="memberIds">Members (select 2 or more)</Label>
        <select
          id="memberIds"
          name="memberIds"
          multiple
          size={Math.min(students.length, 8)}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
        >
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.firstName} · {s.schoolId}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Creating…" : "Create team"}
      </Button>
    </form>
  );
}
