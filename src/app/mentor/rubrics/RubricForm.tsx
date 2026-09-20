"use client";

import { useActionState, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { createRubric, type CreateRubricState } from "@/lib/actions/rubrics";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

type Criterion = { name: string; description: string; maxPoints: number };

const EMPTY_CRITERION: Criterion = { name: "", description: "", maxPoints: 10 };

export function RubricForm() {
  const [state, action, pending] = useActionState<CreateRubricState, FormData>(
    createRubric,
    undefined,
  );
  const [criteria, setCriteria] = useState<Criterion[]>([{ ...EMPTY_CRITERION }]);

  function updateCriterion(index: number, patch: Partial<Criterion>) {
    setCriteria((prev) => prev.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }

  return (
    <form action={action} className="space-y-4">
      {state?.error && <FieldError messages={[state.error]} />}
      <input type="hidden" name="criteriaJson" value={JSON.stringify(criteria)} />

      <div>
        <Label htmlFor="name">Rubric name</Label>
        <Input id="name" name="name" required />
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

      <div className="space-y-3">
        <Label>Criteria</Label>
        {criteria.map((c, i) => (
          <div key={i} className="flex items-start gap-2 rounded-md border border-border p-3">
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Criterion name"
                value={c.name}
                onChange={(e) => updateCriterion(i, { name: e.target.value })}
              />
              <Input
                placeholder="Description (optional)"
                value={c.description}
                onChange={(e) => updateCriterion(i, { description: e.target.value })}
              />
              <div className="flex items-center gap-2">
                <Label htmlFor={`points-${i}`} className="mb-0">
                  Max points
                </Label>
                <Input
                  id={`points-${i}`}
                  type="number"
                  min={1}
                  className="w-24"
                  value={c.maxPoints}
                  onChange={(e) => updateCriterion(i, { maxPoints: Number(e.target.value) })}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCriteria((prev) => prev.filter((_, idx) => idx !== i))}
              disabled={criteria.length === 1}
              className="rounded p-1.5 text-foreground-subtle hover:text-danger disabled:opacity-30"
              aria-label="Remove criterion"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() => setCriteria((prev) => [...prev, { ...EMPTY_CRITERION }])}
        >
          <Plus className="h-4 w-4" /> Add criterion
        </Button>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Create rubric"}
      </Button>
    </form>
  );
}
