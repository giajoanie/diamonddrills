"use client";

import { useActionState, useState } from "react";
import { startRoleplaySession, type StartRoleplayState } from "@/lib/actions/roleplay";
import { Button } from "@/components/ui/Button";
import { Label, Select, FieldError } from "@/components/ui/Field";

type Event = { id: string; name: string };
type Resource = { id: string; name: string };
type Peer = { id: string; firstName: string };

export function StartRoleplayForm({
  events,
  caseStudies,
  peersByEventId,
  defaultPartnerId,
}: {
  events: Event[];
  caseStudies: Resource[];
  peersByEventId: Record<string, Peer[]>;
  defaultPartnerId: string;
}) {
  const [state, action, pending] = useActionState<StartRoleplayState, FormData>(
    startRoleplaySession,
    undefined,
  );
  const [eventId, setEventId] = useState(events[0]?.id ?? "");
  const peers = peersByEventId[eventId] ?? [];

  return (
    <form action={action} className="space-y-4">
      {state?.error && <FieldError messages={[state.error]} />}

      <div>
        <Label htmlFor="eventId">Roleplay event</Label>
        <Select id="eventId" name="eventId" value={eventId} onChange={(e) => setEventId(e.target.value)}>
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

      {peers.length > 0 && (
        <div>
          <Label htmlFor="partnerId">Practice with a partner (optional)</Label>
          <Select id="partnerId" name="partnerId" defaultValue={defaultPartnerId}>
            <option value="">Just me — I&apos;ll share the judge link myself</option>
            {peers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.firstName}
              </option>
            ))}
          </Select>
          <p className="mt-1 text-xs text-foreground-subtle">
            They&apos;ll see an invite to judge your presentation as soon as you start.
          </p>
        </div>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Starting…" : "Start practice roleplay"}
      </Button>
    </form>
  );
}
