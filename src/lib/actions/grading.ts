"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";

export type GradeSubmissionState = { error?: string } | undefined;

export async function gradeSubmission(
  _prevState: GradeSubmissionState,
  formData: FormData,
): Promise<GradeSubmissionState> {
  const mentor = await requireRole("MENTOR");

  const submissionId = formData.get("submissionId");
  const feedback = formData.get("feedback");
  if (typeof submissionId !== "string" || !submissionId) return { error: "Missing submission." };

  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: { assignment: { include: { rubric: { include: { criteria: true } } } } },
  });
  if (!submission) return { error: "That submission no longer exists." };

  const criteria = submission.assignment.rubric?.criteria ?? [];
  const scores: { criterionId: string; score: number }[] = [];
  for (const criterion of criteria) {
    const raw = formData.get(`score-${criterion.id}`);
    const value = Number(raw);
    if (raw !== null && raw !== "" && Number.isFinite(value)) {
      if (value < 0 || value > criterion.maxPoints) {
        return { error: `${criterion.name} must be between 0 and ${criterion.maxPoints}.` };
      }
      scores.push({ criterionId: criterion.id, score: Math.round(value) });
    }
  }

  await prisma.$transaction([
    prisma.rubricScore.deleteMany({ where: { submissionId } }),
    ...(scores.length > 0
      ? [
          prisma.rubricScore.createMany({
            data: scores.map((s) => ({
              submissionId,
              criterionId: s.criterionId,
              score: s.score,
              scoredById: mentor.id,
            })),
          }),
        ]
      : []),
    prisma.submission.update({
      where: { id: submissionId },
      data: {
        status: "GRADED",
        gradedAt: new Date(),
        gradedById: mentor.id,
        feedback: typeof feedback === "string" && feedback.trim() ? feedback.trim() : null,
        resubmissionRequested: false,
      },
    }),
  ]);

  revalidatePath(`/mentor/submissions/${submissionId}`);
  revalidatePath(`/mentor/assignments/${submission.assignmentId}`);
}

export async function requestResubmission(formData: FormData): Promise<void> {
  const mentor = await requireRole("MENTOR");

  const submissionId = formData.get("submissionId");
  const feedback = formData.get("feedback");
  if (typeof submissionId !== "string" || !submissionId) return;

  const submission = await prisma.submission.update({
    where: { id: submissionId },
    data: {
      status: "RESUBMISSION_REQUESTED",
      resubmissionRequested: true,
      feedback: typeof feedback === "string" && feedback.trim() ? feedback.trim() : null,
      gradedAt: new Date(),
      gradedById: mentor.id,
    },
  });

  revalidatePath(`/mentor/submissions/${submissionId}`);
  revalidatePath(`/mentor/assignments/${submission.assignmentId}`);
  revalidatePath(`/assignments/${submission.assignmentId}`);
}
