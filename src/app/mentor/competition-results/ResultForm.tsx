"use client";

import { useActionState, useState } from "react";
import { recordCompetitionResult, type RecordResultState } from "@/lib/actions/competition-results";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select, FieldError } from "@/components/ui/Field";

type Student = { id: string; firstName: string; schoolId: string };
type Cluster = { id: string; name: string; events: { id: string; name: string }[] };
type Team = { id: string; name: string | null; event: { name: string } };

export function ResultForm({
  students,
  clusters,
  teams,
}: {
  students: Student[];
  clusters: Cluster[];
  teams: Team[];
}) {
  const [state, action, pending] = useActionState<RecordResultState, FormData>(
    recordCompetitionResult,
    undefined,
  );
  const [mode, setMode] = useState<"student" | "team">("student");

  return (
    <form action={action} className="space-y-4">
      {state?.error && <FieldError messages={[state.error]} />}
      <input type="hidden" name="mode" value={mode} />

      <div className="flex gap-4 text-sm text-foreground">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "student"}
            onChange={() => setMode("student")}
          />
          Individual student
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" checked={mode === "team"} onChange={() => setMode("team")} />
          Team
        </label>
      </div>

      {mode === "student" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="userId">Student</Label>
            <Select id="userId" name="userId" defaultValue="">
              <option value="" disabled>
                Choose a student
              </option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} · {s.schoolId}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="eventId">Event</Label>
            <Select id="eventId" name="eventId" defaultValue="">
              <option value="" disabled>
                Choose an event
              </option>
              {clusters.map((c) => (
                <optgroup key={c.id} label={c.name}>
                  {c.events.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </div>
        </div>
      ) : (
        <div>
          <Label htmlFor="teamId">Team</Label>
          <Select id="teamId" name="teamId" defaultValue="">
            <option value="" disabled>
              Choose a team
            </option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name ?? "Unnamed team"} ({t.event.name})
              </option>
            ))}
          </Select>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="year">Year</Label>
          <Input id="year" name="year" type="number" defaultValue={new Date().getFullYear()} required />
        </div>
        <div>
          <Label htmlFor="level">Level</Label>
          <Select id="level" name="level" defaultValue="DISTRICT">
            <option value="DISTRICT">District</option>
            <option value="STATE">State</option>
            <option value="ICDC">ICDC</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div>
          <Label htmlFor="placement">Placement</Label>
          <Input id="placement" name="placement" type="number" min={1} />
        </div>
        <div>
          <Label htmlFor="testScore">Test score</Label>
          <Input id="testScore" name="testScore" type="number" step="0.1" />
        </div>
        <div>
          <Label htmlFor="roleplayScore">Roleplay score</Label>
          <Input id="roleplayScore" name="roleplayScore" type="number" step="0.1" />
        </div>
        <div>
          <Label htmlFor="presentationScore">Presentation score</Label>
          <Input id="presentationScore" name="presentationScore" type="number" step="0.1" />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" name="advanced" />
        Advanced to the next level
      </label>

      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
        />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Record result"}
      </Button>
    </form>
  );
}
