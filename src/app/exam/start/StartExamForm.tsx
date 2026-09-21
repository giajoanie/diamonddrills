"use client";

import { useActionState, useState } from "react";
import { startExam, type StartExamState } from "@/lib/actions/exam-engine";
import {
  TIMED_EXAM_PRESETS,
  DEFAULT_TIMED_PRESET_MINUTES,
  BASELINE_PRESET,
} from "@/lib/exam-engine/presets";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select, FieldError } from "@/components/ui/Field";

type ExamBank = { id: string; name: string };
type InstructionalArea = { id: string; name: string };
type Mode = "BASELINE" | "TIMED" | "PRACTICE_AREA" | "MISSED_REVIEW";

export function StartExamForm({
  examBanks,
  instructionalAreas,
  baselineStatuses,
  missedCount,
  defaultExamBankId,
  defaultMode = "TIMED",
  defaultAreaId,
}: {
  examBanks: ExamBank[];
  instructionalAreas: InstructionalArea[];
  baselineStatuses: { examBankId: string; hasBaseline: boolean }[];
  missedCount: number;
  defaultExamBankId?: string;
  defaultMode?: Mode;
  defaultAreaId?: string;
}) {
  const [state, action, pending] = useActionState<StartExamState, FormData>(startExam, undefined);
  const [examBankId, setExamBankId] = useState(defaultExamBankId ?? examBanks[0]?.id ?? "");
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [timedPractice, setTimedPractice] = useState(false);

  const hasBaseline = baselineStatuses.find((b) => b.examBankId === examBankId)?.hasBaseline ?? false;

  return (
    <form action={action} className="space-y-5">
      {state?.error && <FieldError messages={[state.error]} />}

      <div>
        <Label htmlFor="examBankId">Exam bank</Label>
        <Select
          id="examBankId"
          name="examBankId"
          value={examBankId}
          onChange={(e) => setExamBankId(e.target.value)}
        >
          {examBanks.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.name}
            </option>
          ))}
        </Select>
      </div>

      <fieldset className="space-y-2">
        <legend className="mb-1.5 text-sm font-medium text-foreground-muted">Mode</legend>
        <input type="hidden" name="examModeInput" value={mode} />

        {!hasBaseline && (
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="radio"
              checked={mode === "BASELINE"}
              onChange={() => setMode("BASELINE")}
            />
            Baseline Diagnostic ({BASELINE_PRESET.questions} questions, {BASELINE_PRESET.minutes}{" "}
            minutes)
          </label>
        )}
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="radio" checked={mode === "TIMED"} onChange={() => setMode("TIMED")} />
          Timed exam
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="radio"
            checked={mode === "PRACTICE_AREA"}
            onChange={() => setMode("PRACTICE_AREA")}
          />
          Practice by instructional area
        </label>
        {missedCount > 0 && (
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="radio"
              checked={mode === "MISSED_REVIEW"}
              onChange={() => setMode("MISSED_REVIEW")}
            />
            Review missed questions due now ({missedCount})
          </label>
        )}
      </fieldset>

      {mode === "TIMED" && (
        <div>
          <Label htmlFor="presetMinutes">Time limit</Label>
          <Select id="presetMinutes" name="presetMinutes" defaultValue={DEFAULT_TIMED_PRESET_MINUTES}>
            {Object.values(TIMED_EXAM_PRESETS)
              .sort((a, b) => b.minutes - a.minutes)
              .map((preset) => (
                <option key={preset.minutes} value={preset.minutes}>
                  {preset.minutes} minutes — {preset.questions} questions
                </option>
              ))}
          </Select>
        </div>
      )}

      {mode === "PRACTICE_AREA" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="instructionalAreaIds">Instructional area(s)</Label>
            <select
              id="instructionalAreaIds"
              name="instructionalAreaIds"
              multiple
              size={Math.min(instructionalAreas.length, 8)}
              defaultValue={defaultAreaId ? [defaultAreaId] : undefined}
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
            >
              {instructionalAreas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-foreground-subtle">
              Hold Ctrl/Cmd to select more than one.
            </p>
          </div>

          <div>
            <Label htmlFor="questionCount">Number of questions</Label>
            <Input id="questionCount" name="questionCount" type="number" defaultValue={20} min={1} max={100} />
          </div>

          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="timed"
              checked={timedPractice}
              onChange={(e) => setTimedPractice(e.target.checked)}
            />
            Time this practice session
          </label>

          {timedPractice && (
            <div>
              <Label htmlFor="practiceMinutes">Minutes</Label>
              <Input id="practiceMinutes" name="practiceMinutes" type="number" defaultValue={20} min={1} />
            </div>
          )}
        </div>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Starting…" : "Start exam"}
      </Button>
    </form>
  );
}
