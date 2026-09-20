"use client";

import { useActionState } from "react";
import { startRoleplaySession, type StartRoleplayState } from "@/lib/actions/roleplay";
import { Button } from "@/components/ui/Button";
import { Label, Select, FieldError } from "@/components/ui/Field";

type Event = { id: string; name: string };
type Resource = { id: string; name: string };

export function StartRoleplayForm({ events, caseStudies }: { events: Event[]; caseStudies: Resource[] }) {
  const [state, action, pending] = useActionState<StartRoleplayState, FormData>(
    startRoleplaySession,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      {state?.error && <FieldError messages={[state.error]} />}

      <div>
        <Label htmlFor="eventId">Roleplay event</Label>
        <Select id="eventId" name="eventId" defaultValue={events[0]?.id ?? ""}>
          {events.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </Select>
      </div>

      {caseStudies.length > 0 && (
        <div>
          <Label htmlFor="caseStudyResourceId">Case study (optional)</Label>
          <Select id="caseStudyResourceId" name="caseStudyResourceId" defaultValue="">
            <option value="">None</option>
            {caseStudies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Starting…" : "Start practice roleplay"}
      </Button>
    </form>
  );
}
