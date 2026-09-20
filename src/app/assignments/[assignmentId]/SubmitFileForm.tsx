"use client";

import { useActionState } from "react";
import { submitAssignmentFile, type SubmitAssignmentState } from "@/lib/actions/submissions";
import { Button } from "@/components/ui/Button";
import { Label, Input, FieldError } from "@/components/ui/Field";

export function SubmitFileForm({ assignmentId, hasSubmission }: { assignmentId: string; hasSubmission: boolean }) {
  const [state, action, pending] = useActionState<SubmitAssignmentState, FormData>(
    submitAssignmentFile,
    undefined,
  );

  return (
    <form action={action} className="space-y-3">
      {state?.error && <FieldError messages={[state.error]} />}
      <input type="hidden" name="assignmentId" value={assignmentId} />
      <div>
        <Label htmlFor="file">{hasSubmission ? "Upload a new version" : "Upload your file"}</Label>
        <Input id="file" name="file" type="file" required />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Uploading…" : hasSubmission ? "Upload new version" : "Submit"}
      </Button>
    </form>
  );
}
