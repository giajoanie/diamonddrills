"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";

export type CreateAssignmentState = { error?: string } | undefined;

const ASSIGNMENT_TYPES = ["FILE_SUBMISSION", "EXAM", "PRACTICE_ROLEPLAY"] as const;
const TARGET_TYPES = ["EVERYONE", "GRADE", "EVENT", "CLUSTER", "INDIVIDUAL"] as const;

export async function createAssignment(
  _prevState: CreateAssignmentState,
  formData: FormData,
): Promise<CreateAssignmentState> {
  const mentor = await requireRole("MENTOR");

  const title = formData.get("title");
  const instructions = formData.get("instructions");
  const type = formData.get("type");
  const dueAtRaw = formData.get("dueAt");
  const rubricId = formData.get("rubricId");
  const targetType = formData.get("targetType");
  const targetValues = formData.getAll("targetValues").filter((v): v is string => typeof v === "string");
  const resourceIds = formData.getAll("resourceIds").filter((v): v is string => typeof v === "string");

  if (typeof title !== "string" || !title.trim()) return { error: "Give the assignment a title." };
  if (typeof instructions !== "string" || !instructions.trim()) {
    return { error: "Add instructions for students." };
  }
  if (typeof type !== "string" || !ASSIGNMENT_TYPES.includes(type as (typeof ASSIGNMENT_TYPES)[number])) {
    return { error: "Choose an assignment type." };
  }
  if (typeof dueAtRaw !== "string" || !dueAtRaw) return { error: "Set a due date." };
  const dueAt = new Date(dueAtRaw);
  if (Number.isNaN(dueAt.getTime())) return { error: "That due date isn't valid." };

  if (typeof targetType !== "string" || !TARGET_TYPES.includes(targetType as (typeof TARGET_TYPES)[number])) {
    return { error: "Choose who this assignment is for." };
  }

  if (targetType !== "EVERYONE" && targetValues.length === 0) {
    return { error: "Pick at least one target for this assignment." };
  }

  let examConfig: { examBankId: string; questionCount: number; timeLimitMinutes: number } | null = null;
  if (type === "EXAM") {
    const examBankId = formData.get("examBankId");
    const questionCount = Number(formData.get("questionCount"));
    const timeLimitMinutes = Number(formData.get("timeLimitMinutes"));
    if (typeof examBankId !== "string" || !examBankId) return { error: "Choose an exam bank." };
    if (!Number.isFinite(questionCount) || questionCount <= 0) {
      return { error: "Set a positive question count." };
    }
    if (!Number.isFinite(timeLimitMinutes) || timeLimitMinutes <= 0) {
      return { error: "Set a positive time limit." };
    }
    examConfig = { examBankId, questionCount: Math.round(questionCount), timeLimitMinutes: Math.round(timeLimitMinutes) };
  }

  const targets =
    targetType === "EVERYONE"
      ? [{ targetType: "EVERYONE" as const }]
      : targetType === "GRADE"
        ? targetValues.map((v) => ({ targetType: "GRADE" as const, grade: Number(v) }))
        : targetType === "EVENT"
          ? targetValues.map((v) => ({ targetType: "EVENT" as const, eventId: v }))
          : targetType === "CLUSTER"
            ? targetValues.map((v) => ({ targetType: "CLUSTER" as const, clusterId: v }))
            : targetValues.map((v) => ({ targetType: "INDIVIDUAL" as const, userId: v }));

  await prisma.assignment.create({
    data: {
      title: title.trim(),
      instructions: instructions.trim(),
      type: type as (typeof ASSIGNMENT_TYPES)[number],
      dueAt,
      creatorId: mentor.id,
      rubricId: typeof rubricId === "string" && rubricId ? rubricId : null,
      examConfig: examConfig ?? undefined,
      targets: { create: targets },
      resources: { create: resourceIds.map((resourceId) => ({ resourceId })) },
    },
  });

  revalidatePath("/mentor/assignments");
}

export async function deactivateAssignment(formData: FormData): Promise<void> {
  await requireRole("MENTOR");
  const assignmentId = formData.get("assignmentId");
  if (typeof assignmentId !== "string") return;

  await prisma.assignment.update({ where: { id: assignmentId }, data: { isActive: false } });
  revalidatePath("/mentor/assignments");
}
