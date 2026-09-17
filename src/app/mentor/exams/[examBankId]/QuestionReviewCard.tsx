import {
  updateQuestionDraft,
  publishQuestion,
  deleteDraftQuestion,
} from "@/lib/actions/exam-import";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select } from "@/components/ui/Field";
import type { InstructionalArea, Question } from "@/generated/prisma/client";

const OPTIONS = ["A", "B", "C", "D"] as const;

export function QuestionReviewCard({
  question,
  instructionalAreas,
}: {
  question: Question;
  instructionalAreas: InstructionalArea[];
}) {
  const isComplete =
    !!question.correctOption &&
    !!question.stem &&
    !!question.optionA &&
    !!question.optionB &&
    !!question.optionC &&
    !!question.optionD;

  return (
    <div className="rounded-lg border border-border bg-background-elevated p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground-subtle">
          Question {question.numberInSource}
        </span>
        {!isComplete && (
          <span className="rounded bg-warning/20 px-1.5 py-0.5 text-xs text-warning">
            Needs review
          </span>
        )}
      </div>

      <form action={updateQuestionDraft} className="mt-2 space-y-3">
        <input type="hidden" name="questionId" value={question.id} />

        <div>
          <Label htmlFor={`stem-${question.id}`}>Stem</Label>
          <textarea
            id={`stem-${question.id}`}
            name="stem"
            defaultValue={question.stem}
            rows={2}
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {OPTIONS.map((letter) => (
            <div key={letter} className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-sm text-foreground-muted">
                <input
                  type="radio"
                  name="correctOption"
                  value={letter}
                  defaultChecked={question.correctOption === letter}
                />
                {letter}
              </label>
              <Input
                name={`option${letter}`}
                defaultValue={question[`option${letter}` as "optionA"]}
                className="flex-1"
              />
            </div>
          ))}
        </div>

        <div>
          <Label htmlFor={`area-${question.id}`}>Instructional area</Label>
          <Select
            id={`area-${question.id}`}
            name="instructionalAreaId"
            defaultValue={question.instructionalAreaId ?? ""}
          >
            <option value="">None</option>
            {instructionalAreas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor={`explanation-${question.id}`}>Explanation</Label>
          <textarea
            id={`explanation-${question.id}`}
            name="explanation"
            defaultValue={question.explanation ?? ""}
            rows={2}
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" variant="secondary">
            Save
          </Button>
        </div>
      </form>

      <div className="mt-3 flex gap-2 border-t border-border pt-3">
        <form action={publishQuestion}>
          <input type="hidden" name="questionId" value={question.id} />
          <Button type="submit" disabled={!isComplete}>
            Publish
          </Button>
        </form>
        <form action={deleteDraftQuestion}>
          <input type="hidden" name="questionId" value={question.id} />
          <Button type="submit" variant="ghost">
            Discard
          </Button>
        </form>
      </div>
    </div>
  );
}
