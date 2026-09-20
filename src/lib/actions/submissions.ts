"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import { saveUploadedFile } from "@/lib/files/storage";
import { getAssignmentForStudent } from "@/lib/dal/assignments";
import { deriveSubmissionStatus } from "@/lib/assignments/status";
import { pickRandomSubset } from "@/lib/exam-engine/shuffle";
import { startAttemptWithQuestionIds } from "@/lib/actions/exam-engine";

export type SubmitAssignmentState = { error?: string } | undefined;

export async function submitAssignmentFile(
  _prevState: SubmitAssignmentState,
  formData: FormData,
): Promise<SubmitAssignmentState> {
  const student = await requireRole("STUDENT");

  const assignmentId = formData.get("assignmentId");
  const file = formData.get("file");
  if (typeof assignmentId !== "string" || !assignmentId) return { error: "Missing assignment." };
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a file to upload." };

  const assignment = await getAssignmentForStudent(assignmentId, student.id);
  if (!assignment) return { error: "That assignment isn't available." };
  if (assignment.type === "EXAM") return { error: "This assignment isn't a file submission." };

  const now = new Date();
  const status = deriveSubmissionStatus(now, assignment.dueAt);

  const submission = await prisma.submission.upsert({
    where: { assignmentId_userId: { assignmentId, userId: student.id } },
    create: {
      assignmentId,
      userId: student.id,
      status,
      submittedAt: now,
      isLate: status === "LATE",
    },
    update: {
      status,
      submittedAt: now,
      isLate: status === "LATE",
      resubmissionRequested: false,
    },
  });

  const lastVersion = await prisma.submissionFile.findFirst({
    where: { submissionId: submission.id },
    orderBy: { versionNumber: "desc" },
    select: { versionNumber: true },
  });
  const versionNumber = (lastVersion?.versionNumber ?? 0) + 1;

  const fileUrl = await saveUploadedFile(file, `submissions/${submission.id}`);
  await prisma.submissionFile.create({
    data: { submissionId: submission.id, fileUrl, versionNumber },
  });

  revalidatePath(`/assignments/${assignmentId}`);
  revalidatePath("/assignments");
}

export async function startAssignmentExam(formData: FormData): Promise<void> {
  const student = await requireRole("STUDENT");

  const assignmentId = formData.get("assignmentId");
  if (typeof assignmentId !== "string" || !assignmentId) return;

  const assignment = await getAssignmentForStudent(assignmentId, student.id);
  if (!assignment || assignment.type !== "EXAM") return;

  const config = assignment.examConfig as {
    examBankId: string;
    questionCount: number;
    timeLimitMinutes: number;
  } | null;
  if (!config) return;

  const pool = await prisma.question.findMany({
    where: { examBankId: config.examBankId, isActive: true },
    select: { id: true },
  });
  if (pool.length === 0) return;

  const selected = pickRandomSubset(pool, config.questionCount);

  await startAttemptWithQuestionIds(
    student.id,
    config.examBankId,
    "MENTOR_ASSIGNED",
    false,
    config.timeLimitMinutes * 60,
    selected.map((q) => q.id),
    selected.length < config.questionCount,
    assignmentId,
  );
}
