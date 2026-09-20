"use client";

import { useActionState, useState } from "react";
import { createAnnouncement, type CreateAnnouncementState } from "@/lib/actions/announcements";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select, FieldError } from "@/components/ui/Field";

type Cluster = { id: string; name: string; events: { id: string; name: string }[] };

export function AnnouncementForm({ clusters }: { clusters: Cluster[] }) {
  const [state, action, pending] = useActionState<CreateAnnouncementState, FormData>(
    createAnnouncement,
    undefined,
  );
  const [audience, setAudience] = useState("EVERYONE");

  return (
    <form action={action} className="space-y-4">
      {state?.error && <FieldError messages={[state.error]} />}

      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required />
      </div>

      <div>
        <Label htmlFor="body">Announcement</Label>
        <textarea
          id="body"
          name="body"
          rows={3}
          required
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
        />
      </div>

      <div>
        <Label htmlFor="audience">Audience</Label>
        <Select id="audience" name="audience" value={audience} onChange={(e) => setAudience(e.target.value)}>
          <option value="EVERYONE">Everyone</option>
          <option value="GRADE">Grade</option>
          <option value="CLUSTER">Cluster</option>
          <option value="EVENT">Event</option>
        </Select>
      </div>

      {audience === "GRADE" && (
        <div>
          <Label htmlFor="grade">Grade</Label>
          <Select id="grade" name="grade" defaultValue="">
            <option value="" disabled>
              Choose a grade
            </option>
            {[9, 10, 11, 12].map((g) => (
              <option key={g} value={g}>
                {g}th grade
              </option>
            ))}
          </Select>
        </div>
      )}

      {audience === "CLUSTER" && (
        <div>
          <Label htmlFor="clusterId">Cluster</Label>
          <Select id="clusterId" name="clusterId" defaultValue="">
            <option value="" disabled>
              Choose a cluster
            </option>
            {clusters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
      )}

      {audience === "EVENT" && (
        <div>
          <Label htmlFor="eventId">Event</Label>
          <Select id="eventId" name="eventId" defaultValue="">
            <option value="" disabled>
              Choose an event
            </option>
            {clusters.map((c) => (
              <optgroup key={c.id} label={c.name}>
                {c.events.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </Select>
        </div>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Posting…" : "Post announcement"}
      </Button>
    </form>
  );
}
