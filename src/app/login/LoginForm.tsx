"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type FormState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

export function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    login,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      {state?.message && <FieldError messages={[state.message]} />}

      <div>
        <Label htmlFor="schoolId">School ID</Label>
        <Input
          id="schoolId"
          name="schoolId"
          inputMode="numeric"
          pattern="\d{7}"
          maxLength={7}
          placeholder="1234567"
          required
          autoFocus
        />
        <FieldError messages={state?.errors?.schoolId} />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
        <FieldError messages={state?.errors?.password} />
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Logging in…" : "Log in"}
      </Button>

      <p className="text-center text-sm text-foreground-muted">
        Need an account?{" "}
        <Link href="/signup" className="text-accent hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
