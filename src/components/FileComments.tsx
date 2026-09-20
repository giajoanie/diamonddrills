"use client";

import { useActionState } from "react";
import { addFileComment, type AddCommentState } from "@/lib/actions/comments";
import { Button } from "@/components/ui/Button";
import { FieldError } from "@/components/ui/Field";

type Comment = {
  id: string;
  comment: string;
  createdAt: Date;
  author: { firstName: string; role: string };
};

export function FileComments({ submissionFileId, comments }: { submissionFileId: string; comments: Comment[] }) {
  const [state, action, pending] = useActionState<AddCommentState, FormData>(addFileComment, undefined);

  return (
    <div className="mt-2 space-y-2 border-l-2 border-border pl-3">
      {comments.map((c) => (
        <div key={c.id} className="text-sm">
          <span className="font-medium text-foreground">
            {c.author.firstName}
            {c.author.role === "MENTOR" ? " (mentor)" : ""}
          </span>{" "}
          <span className="text-foreground-subtle">· {c.createdAt.toLocaleString()}</span>
          <p className="text-foreground-muted">{c.comment}</p>
        </div>
      ))}

      <form action={action}>
        {state?.error && <FieldError messages={[state.error]} />}
        <div className="flex items-start gap-2">
          <input type="hidden" name="submissionFileId" value={submissionFileId} />
          <textarea
            name="comment"
            rows={1}
            placeholder="Add a comment on this version…"
            className="w-full rounded-md border border-border bg-surface px-2 py-1 text-sm text-foreground focus:border-accent"
          />
          <Button type="submit" variant="secondary" disabled={pending}>
            {pending ? "…" : "Comment"}
          </Button>
        </div>
      </form>
    </div>
  );
}
