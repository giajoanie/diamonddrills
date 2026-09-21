"use client";

import { useActionState } from "react";
import { startCompetitionSimulation, type StartExamState } from "@/lib/actions/exam-engine";
import { Button } from "@/components/ui/Button";
import { Label, Select, FieldError } from "@/components/ui/Field";

type Event = { id: string; name: string };

export function StartSimulationForm({ events }: { events: Event[] }) {
  const [state, action, pending] = useActionState<StartExamState, FormData>(
    startCompetitionSimulation,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      {state?.error && <FieldError messages={[state.error]} />}

      <div>
        <Label htmlFor="eventId">Event</Label>
        <Select id="eventId" name="eventId" defaultValue={events[0]?.id ?? ""}>
          {events.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </Select>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Starting…" : "Begin competition simulation"}
      </Button>
    </form>
  );
}
