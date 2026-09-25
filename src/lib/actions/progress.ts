"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";

export type UpdateExamScoreGoalState = { error?: string } | undefined;

export async function updateExamScoreGoal(
  _prevState: UpdateExamScoreGoalState,
  formData: FormData,
): Promise<UpdateExamScoreGoalState> {
  const student = await requireRole("STUDENT");

  const raw = formData.get("examScoreGoal");
  const goal = typeof raw === "string" ? Number(raw) : NaN;
  if (!Number.isInteger(goal) || goal < 1 || goal > 100) {
    return { error: "Goal must be a whole number between 1 and 100." };
  }

  await prisma.user.update({ where: { id: student.id }, data: { examScoreGoal: goal } });
  revalidatePath("/progress");
  return undefined;
}
