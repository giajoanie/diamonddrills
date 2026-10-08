"use client";

import { useActionState } from "react";
import { addSecondRoleplayEvent, type AddRoleplayEventState } from "@/lib/actions/events";
import { Select, FieldError } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import type { getSignupEventOptions } from "@/lib/dal/events";

type Clusters = Awaited<ReturnType<typeof getSignupEventOptions>>;

const SERIES_OR_TDM = ["SERIES", "TEAM_DECISION_MAKING"];

/**
 * EBL-only "pick your second roleplay event" form, shown on the dashboard
 * when a student has fewer than two current roleplay enrollments — see
 * addSecondRoleplayEvent in src/lib/actions/events.ts. Pre-filters the
 * dropdown to whichever format slot (Principles vs. Series/Team Decision
 * Making) the student's existing enrollment(s) don't already cover.
 */
export function AddRoleplayEventForm({
  clusters,
  currentFormats,
}: {
  clusters: Clusters;
  currentFormats: string[];
}) {
  const [state, action, pending] = useActionState<AddRoleplayEventState, FormData>(
    addSecondRoleplayEvent,
    undefined,
  );

  const hasPrinciples = currentFormats.includes("PRINCIPLES");
  const hasSeriesOrTdm = currentFormats.some((f) => SERIES_OR_TDM.includes(f));
  const allowedFormats = hasPrinciples
    ? SERIES_OR_TDM
    : hasSeriesOrTdm
      ? ["PRINCIPLES"]
      : ["PRINCIPLES", ...SERIES_OR_TDM];

  return (
    <form action={action} className="mt-3 flex items-center gap-2">
      <Select name="eventId" defaultValue="" required className="flex-1">
        <option value="" disabled>
          Select an event
        </option>
        {clusters.map((cluster) => {
          const events = cluster.roleplayEvents.filter((e) => allowedFormats.includes(e.format));
          return (
            events.length > 0 && (
              <optgroup key={cluster.id} label={cluster.name}>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </optgroup>
            )
          );
        })}
      </Select>
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Adding…" : "Add"}
      </Button>
      {state?.error && <FieldError messages={[state.error]} />}
    </form>
  );
}
