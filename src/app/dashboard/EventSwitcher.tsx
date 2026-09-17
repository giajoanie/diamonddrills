"use client";

import { useActionState } from "react";
import { changeEvent, type ChangeEventState } from "@/lib/actions/events";
import { Select, FieldError } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import type { getSignupEventOptions } from "@/lib/dal/events";

type Clusters = Awaited<ReturnType<typeof getSignupEventOptions>>;

export function EventSwitcher({
  category,
  currentEventId,
  clusters,
}: {
  category: "ROLEPLAY" | "WRITTEN";
  currentEventId: string;
  clusters: Clusters;
}) {
  const [state, action, pending] = useActionState<ChangeEventState, FormData>(
    changeEvent,
    undefined,
  );
  const key = category === "ROLEPLAY" ? "roleplayEvents" : "writtenEvents";

  return (
    <form action={action} className="mt-3 flex items-center gap-2">
      <input type="hidden" name="category" value={category} />
      <Select name="newEventId" defaultValue={currentEventId} className="flex-1">
        {clusters.map(
          (cluster) =>
            cluster[key].length > 0 && (
              <optgroup key={cluster.id} label={cluster.name}>
                {cluster[key].map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </optgroup>
            ),
        )}
      </Select>
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Saving…" : "Switch"}
      </Button>
      {state?.error && <FieldError messages={[state.error]} />}
    </form>
  );
}
