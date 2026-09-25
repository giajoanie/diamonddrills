"use client";

import { useActionState, useState } from "react";
import { createMilestone, type CreateMilestoneState } from "@/lib/actions/calendar-milestones";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

const KIND_LABELS = { MILESTONE: "Milestone", DEADLINE: "Deadline", PRACTICE: "Practice" } as const;
type Kind = keyof typeof KIND_LABELS;

// Mentor-created milestones are always chapter-wide (scope: SHARED, decided
// server-side by role) — students see these alongside their own private
// ones on /calendar, same broadcast model as Announcements.
export function MilestoneForm() {
  const [state, formAction, pending] = useActionState<CreateMilestoneState, FormData>(
    createMilestone,
    undefined,
  );
  const [kind, setKind] = useState<Kind>("MILESTONE");
  const [formKey, setFormKey] = useState(0);

  // Adjusting state during render (rather than in an effect) per
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevState, setPrevState] = useState(state);
  if (state !== prevState) {
    setPrevState(state);
    if (state?.success) {
      setKind("MILESTONE");
      setFormKey((k) => k + 1);
    }
  }

  return (
    <form key={formKey} action={formAction} className="space-y-4">
      {state?.error && <FieldError messages={[state.error]} />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="milestone-title">Title</Label>
          <Input id="milestone-title" name="title" placeholder="e.g. Written outline due" required />
        </div>
        <div>
          <Label htmlFor="milestone-date">Date</Label>
          <Input id="milestone-date" name="date" type="date" required />
        </div>
      </div>

      <div>
        <Label>Type</Label>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(KIND_LABELS) as Kind[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`rounded-full border-2 px-3 py-1 text-xs font-semibold transition-colors ${
                kind === k
                  ? "border-accent-strong bg-accent-soft text-accent-strong"
                  : "border-border text-foreground-subtle hover:border-border-strong"
              }`}
            >
              {KIND_LABELS[k]}
            </button>
          ))}
        </div>
        <input type="hidden" name="kind" value={kind} />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Adding…" : "Add shared milestone"}
      </Button>
    </form>
  );
}
