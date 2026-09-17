"use client";

import { useActionState } from "react";
import { resetStudentPassword, type ResetPasswordState } from "@/lib/actions/mentor";
import { Button } from "@/components/ui/Button";

export function ResetPasswordButton({ studentId }: { studentId: string }) {
  const [state, action, pending] = useActionState<ResetPasswordState, FormData>(
    resetStudentPassword,
    undefined,
  );

  if (state?.tempPassword) {
    return (
      <div className="text-sm">
        <p className="text-foreground-muted">Temporary password (shown once):</p>
        <code className="rounded bg-surface px-2 py-1 font-mono text-accent">
          {state.tempPassword}
        </code>
      </div>
    );
  }

  return (
    <form action={action}>
      <input type="hidden" name="studentId" value={studentId} />
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Resetting…" : "Reset password"}
      </Button>
      {state?.error && <p className="mt-1 text-sm text-danger">{state.error}</p>}
    </form>
  );
}
