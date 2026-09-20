"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/guards";

export type AddCommentState = { error?: string } | undefined;

export async function addFileComment(
  _prevState: AddCommentState,
  formData: FormData,
): Promise<AddCommentState> {
  const user = await requireUser();

  const submissionFileId = formData.get("submissionFileId");
  const comment = formData.get("comment");
  if (typeof submissionFileId !== "string" || !submissionFileId) return { error: "Missing file." };
  if (typeof comment !== "string" || !comment.trim()) return { error: "Write a comment first." };

  const file = await prisma.submissionFile.findUnique({
    where: { id: submissionFileId },
    include: { submission: true },
  });
  if (!file) return { error: "That file no longer exists." };
  if (user.role !== "MENTOR" && file.submission.userId !== user.id) {
    return { error: "You can't comment on this file." };
  }

  await prisma.submissionFileComment.create({
    data: { submissionFileId, authorId: user.id, comment: comment.trim() },
  });

  revalidatePath(`/mentor/submissions/${file.submissionId}`);
  revalidatePath(`/assignments/${file.submission.assignmentId}`);
}
