"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { signup, type FormState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select, FieldError } from "@/components/ui/Field";
import type { getSignupEventOptions } from "@/lib/dal/events";

type Clusters = Awaited<ReturnType<typeof getSignupEventOptions>>;

const STEP_LABELS = ["Your info", "Grade", "Events"];
const STEP_FIELDS = [
  ["schoolId", "firstName", "password", "confirmPassword"],
  ["grade"],
  ["roleplayEventId", "writtenEventId"],
] as const;

export function SignupForm({ clusters }: { clusters: Clusters }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    signup,
    undefined,
  );
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // If the server action returns field errors, jump back to the earliest
  // step that contains one so the student can see and fix it. Adjusting
  // state during render (rather than in an effect) per
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevState, setPrevState] = useState(state);
  if (state !== prevState) {
    setPrevState(state);
    if (state?.errors) {
      const erroredFields = Object.keys(state.errors);
      const earliestStep = STEP_FIELDS.findIndex((fields) =>
        fields.some((f) => erroredFields.includes(f)),
      );
      if (earliestStep !== -1) setStep(earliestStep);
    }
  }

  // Hidden (display:none) fields are skipped by the browser's constraint
  // validation, so reportValidity() here only checks the current step.
  function goNext() {
    if (formRef.current?.reportValidity()) {
      setStep((s) => Math.min(s + 1, STEP_FIELDS.length - 1));
    }
  }

  return (
    <form ref={formRef} action={action} className="space-y-5">
      {state?.message && <FieldError messages={[state.message]} />}

      <ol className="flex items-center justify-center gap-2">
        {STEP_LABELS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 font-display text-xs font-bold ${
                i === step
                  ? "border-accent-strong bg-accent-strong text-accent-foreground"
                  : i < step
                    ? "border-accent-strong bg-accent-soft text-accent-strong"
                    : "border-border text-foreground-subtle"
              }`}
            >
              {i + 1}
            </span>
            <span className="hidden text-xs font-medium text-foreground-muted sm:inline">
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <span className="h-0.5 w-6 bg-border" aria-hidden />
            )}
          </li>
        ))}
      </ol>

      <div className={step === 0 ? "space-y-4" : "hidden"}>
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
      </div>

      <div className={step === 1 ? "space-y-4" : "hidden"}>
        <div>
          <Label htmlFor="grade">Grade</Label>
          <Select id="grade" name="grade" defaultValue="" required={step === 1}>
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
      </div>

      <div className={step === 2 ? "space-y-4" : "hidden"}>
        <div>
          <Label htmlFor="roleplayEventId">Roleplay event</Label>
          <Select id="roleplayEventId" name="roleplayEventId" defaultValue="" required={step === 2}>
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
          <Select id="writtenEventId" name="writtenEventId" defaultValue="" required={step === 2}>
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
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        {step > 0 ? (
          <Button type="button" variant="secondary" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < STEP_FIELDS.length - 1 ? (
          <Button type="button" onClick={goNext}>
            Next
          </Button>
        ) : (
          <Button type="submit" disabled={pending}>
            {pending ? "Creating account…" : "Sign up"}
          </Button>
        )}
      </div>

      <p className="text-center text-sm text-foreground-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
