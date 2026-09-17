"use client";

import { useActionState } from "react";
import { changePassword } from "@/lib/actions/auth";
import type { FormState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    changePassword,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      {state?.message && <FieldError messages={[state.message]} />}

      <div>
        <Label htmlFor="currentPassword">Current password</Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          autoFocus
        />
        <FieldError messages={state?.errors?.currentPassword} />
      </div>

      <div>
        <Label htmlFor="newPassword">New password</Label>
        <Input id="newPassword" name="newPassword" type="password" minLength={8} required />
        <FieldError messages={state?.errors?.newPassword} />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm new password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          minLength={8}
          required
        />
        <FieldError messages={state?.errors?.confirmPassword} />
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Saving…" : "Save new password"}
      </Button>
    </form>
  );
}
