"use client";

import { useActionState } from "react";
import { createMentorAccount, type CreateMentorState } from "@/lib/actions/mentor-accounts";
import { Label, Input, Select, FieldError } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function CreateMentorForm() {
  const [state, action, pending] = useActionState<CreateMentorState, FormData>(
    createMentorAccount,
    undefined,
  );

  return (
    <Card>
      <h2 className="mb-3 font-medium text-foreground">Add a mentor</h2>

      {state?.tempPassword && (
        <div className="mb-4 rounded-lg border border-border bg-surface-hover p-3 text-sm">
          <p className="text-foreground-muted">
            Mentor {state.schoolId} created. Temporary password (shown once):
          </p>
          <code className="rounded bg-surface px-2 py-1 font-mono text-accent">
            {state.tempPassword}
          </code>
        </div>
      )}

      <form action={action} className="flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="mentor-schoolId">School ID</Label>
          <Input
            id="mentor-schoolId"
            name="schoolId"
            inputMode="numeric"
            pattern="\d{7}"
            maxLength={7}
            placeholder="1234567"
            required
          />
        </div>
        <div>
          <Label htmlFor="mentor-firstName">Name</Label>
          <Input id="mentor-firstName" name="firstName" required />
        </div>
        <div>
          <Label htmlFor="mentor-program">Program</Label>
          <Select id="mentor-program" name="program" defaultValue="HIGH_SCHOOL" required>
            <option value="HIGH_SCHOOL">High School</option>
            <option value="EBL">EBL (Middle School)</option>
          </Select>
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create mentor"}
        </Button>
      </form>
      {state?.error && <FieldError messages={[state.error]} />}
    </Card>
  );
}
