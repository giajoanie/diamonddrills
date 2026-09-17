"use client";

import { useActionState } from "react";
import Link from "next/link";
import { importExamPdf, type ImportExamState } from "@/lib/actions/exam-import";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select, FieldError } from "@/components/ui/Field";

type ExamBank = { id: string; name: string };

export function UploadExamForm({ examBanks }: { examBanks: ExamBank[] }) {
  const [state, action, pending] = useActionState<ImportExamState, FormData>(
    importExamPdf,
    undefined,
  );

  return (
    <div>
      <form action={action} className="space-y-4">
        <div>
          <Label htmlFor="examBankId">Exam bank</Label>
          <Select id="examBankId" name="examBankId" defaultValue="" required>
            <option value="" disabled>
              Select an exam bank
            </option>
            {examBanks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="sourceExam">Source exam name</Label>
          <Input
            id="sourceExam"
            name="sourceExam"
            placeholder='e.g. "2026 Marketing ICDC Exam"'
            required
          />
        </div>

        <div>
          <Label htmlFor="sourceYear">Year (optional)</Label>
          <Input id="sourceYear" name="sourceYear" type="number" placeholder="2026" />
        </div>

        <div>
          <Label htmlFor="file">Exam PDF</Label>
          <Input id="file" name="file" type="file" accept="application/pdf" required />
        </div>

        {state?.error && <FieldError messages={[state.error]} />}

        <Button type="submit" disabled={pending}>
          {pending ? "Parsing…" : "Upload and parse"}
        </Button>
      </form>

      {state?.summary && (
        <div className="mt-6 rounded-md border border-border-strong bg-surface p-4 text-sm">
          <p className="font-medium text-foreground">
            {state.summary.sourceExam}: {state.summary.created} question
            {state.summary.created === 1 ? "" : "s"} staged for review
            {state.summary.duplicatesSkipped > 0 &&
              ` (${state.summary.duplicatesSkipped} duplicate${state.summary.duplicatesSkipped === 1 ? "" : "s"} skipped)`}
            .
          </p>
          {state.summary.anomalies.length > 0 && (
            <div className="mt-2">
              <p className="font-medium text-warning">
                {state.summary.anomalies.length} anomal
                {state.summary.anomalies.length === 1 ? "y" : "ies"} to check:
              </p>
              <ul className="mt-1 list-inside list-disc text-foreground-muted">
                {state.summary.anomalies.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          {state.summary.created > 0 && (
            <Link
              href={`/mentor/exams/${state.summary.examBankId}?sourceExam=${encodeURIComponent(state.summary.sourceExam)}`}
              className="mt-3 inline-block text-accent hover:underline"
            >
              Review these questions →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
