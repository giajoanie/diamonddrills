"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type FormState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select, FieldError } from "@/components/ui/Field";
import type { getSignupEventOptions } from "@/lib/dal/events";

type Clusters = Awaited<ReturnType<typeof getSignupEventOptions>>;

export function SignupForm({ clusters }: { clusters: Clusters }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    signup,
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
        />
        <FieldError messages={state?.errors?.schoolId} />
      </div>

      <div>
        <Label htmlFor="firstName">First name</Label>
        <Input id="firstName" name="firstName" required />
        <FieldError messages={state?.errors?.firstName} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" minLength={8} required />
          <FieldError messages={state?.errors?.password} />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            minLength={8}
            required
          />
          <FieldError messages={state?.errors?.confirmPassword} />
        </div>
      </div>

      <div>
        <Label htmlFor="grade">Grade</Label>
        <Select id="grade" name="grade" defaultValue="" required>
          <option value="" disabled>
            Select your grade
          </option>
          {[9, 10, 11, 12].map((g) => (
            <option key={g} value={g}>
              {g}th grade
            </option>
          ))}
        </Select>
        <FieldError messages={state?.errors?.grade} />
      </div>

      <div>
        <Label htmlFor="roleplayEventId">Roleplay event</Label>
        <Select id="roleplayEventId" name="roleplayEventId" defaultValue="" required>
          <option value="" disabled>
            Select a roleplay event
          </option>
          {clusters.map(
            (cluster) =>
              cluster.roleplayEvents.length > 0 && (
                <optgroup key={cluster.id} label={cluster.name}>
                  {cluster.roleplayEvents.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </optgroup>
              ),
          )}
        </Select>
        <FieldError messages={state?.errors?.roleplayEventId} />
      </div>

      <div>
        <Label htmlFor="writtenEventId">Written event</Label>
        <Select id="writtenEventId" name="writtenEventId" defaultValue="" required>
          <option value="" disabled>
            Select a written event
          </option>
          {clusters.map(
            (cluster) =>
              cluster.writtenEvents.length > 0 && (
                <optgroup key={cluster.id} label={cluster.name}>
                  {cluster.writtenEvents.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </optgroup>
              ),
          )}
        </Select>
        <FieldError messages={state?.errors?.writtenEventId} />
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Creating account…" : "Sign up"}
      </Button>

      <p className="text-center text-sm text-foreground-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
