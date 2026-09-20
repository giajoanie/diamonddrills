"use client";

import { useActionState, useState } from "react";
import { createAssignment, type CreateAssignmentState } from "@/lib/actions/assignments";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select, FieldError } from "@/components/ui/Field";

const ASSIGNMENT_TYPE_LABELS: Record<string, string> = {
  FILE_SUBMISSION: "File submission",
  EXAM: "Timed exam",
  PRACTICE_ROLEPLAY: "Roleplay practice (written prep)",
};

type Cluster = { id: string; name: string; events: { id: string; name: string }[] };
type Student = { id: string; firstName: string; schoolId: string; grade: number | null };
type Rubric = { id: string; name: string };
type Resource = { id: string; name: string };
type ExamBank = { id: string; name: string; _count: { questions: number } };

export function AssignmentForm({
  clusters,
  students,
  rubrics,
  resources,
  examBanks,
}: {
  clusters: Cluster[];
  students: Student[];
  rubrics: Rubric[];
  resources: Resource[];
  examBanks: ExamBank[];
}) {
  const [state, action, pending] = useActionState<CreateAssignmentState, FormData>(
    createAssignment,
    undefined,
  );
  const [type, setType] = useState("FILE_SUBMISSION");
  const [targetType, setTargetType] = useState("EVERYONE");

  const selectSize = (count: number) => Math.min(Math.max(count, 3), 6);

  return (
    <form action={action} className="space-y-4">
      {state?.error && <FieldError messages={[state.error]} />}

      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required />
      </div>

      <div>
        <Label htmlFor="instructions">Instructions</Label>
        <textarea
          id="instructions"
          name="instructions"
          rows={3}
          required
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="type">Type</Label>
          <Select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
            {Object.entries(ASSIGNMENT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="dueAt">Due</Label>
          <Input id="dueAt" name="dueAt" type="datetime-local" required />
        </div>
      </div>

      {type === "EXAM" && (
        <div className="grid grid-cols-1 gap-4 rounded-md border border-border p-3 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <Label htmlFor="examBankId">Exam bank</Label>
            <Select id="examBankId" name="examBankId" defaultValue="">
              <option value="" disabled>
                Choose a bank
              </option>
              {examBanks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b._count.questions} questions)
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="questionCount">Question count</Label>
            <Input id="questionCount" name="questionCount" type="number" min={1} defaultValue={20} />
          </div>
          <div>
            <Label htmlFor="timeLimitMinutes">Time limit (minutes)</Label>
            <Input id="timeLimitMinutes" name="timeLimitMinutes" type="number" min={1} defaultValue={30} />
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="rubricId">Rubric (optional)</Label>
        <Select id="rubricId" name="rubricId" defaultValue="">
          <option value="">No rubric</option>
          {rubrics.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </Select>
      </div>

      {resources.length > 0 && (
        <div>
          <Label htmlFor="resourceIds">Attach resources (optional)</Label>
          <select
            id="resourceIds"
            name="resourceIds"
            multiple
            size={selectSize(resources.length)}
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
          >
            {resources.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <Label htmlFor="targetType">Assign to</Label>
        <Select
          id="targetType"
          name="targetType"
          value={targetType}
          onChange={(e) => setTargetType(e.target.value)}
        >
          <option value="EVERYONE">Everyone</option>
          <option value="GRADE">Grade(s)</option>
          <option value="EVENT">Event(s)</option>
          <option value="CLUSTER">Cluster(s)</option>
          <option value="INDIVIDUAL">Specific student(s)</option>
        </Select>
      </div>

      {targetType === "GRADE" && (
        <select
          name="targetValues"
          multiple
          size={4}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
        >
          {[9, 10, 11, 12].map((g) => (
            <option key={g} value={g}>
              {g}th grade
            </option>
          ))}
        </select>
      )}

      {targetType === "EVENT" && (
        <select
          name="targetValues"
          multiple
          size={selectSize(clusters.length)}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
        >
          {clusters.map((c) => (
            <optgroup key={c.id} label={c.name}>
              {c.events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      )}

      {targetType === "CLUSTER" && (
        <select
          name="targetValues"
          multiple
          size={selectSize(clusters.length)}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
        >
          {clusters.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      )}

      {targetType === "INDIVIDUAL" && (
        <select
          name="targetValues"
          multiple
          size={selectSize(students.length)}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
        >
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.firstName} · {s.schoolId} · Grade {s.grade}
            </option>
          ))}
        </select>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Creating…" : "Create assignment"}
      </Button>
    </form>
  );
}
