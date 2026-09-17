"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import { generateTemporaryPassword, hashPassword } from "@/lib/auth/password";
import { destroyAllSessionsForUser } from "@/lib/auth/session";

export type ResetPasswordState = {
  tempPassword?: string;
  error?: string;
} | undefined;

/** Mentor-only: resets a student's password to a random temp password and forces a change. */
export async function resetStudentPassword(
  _prevState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const mentor = await requireRole("MENTOR");
  const studentId = formData.get("studentId");
  if (typeof studentId !== "string") {
    return { error: "Missing student." };
  }

  const student = await prisma.user.findUnique({ where: { id: studentId } });
  if (!student || student.role !== "STUDENT") {
    return { error: "Student not found." };
  }

  const tempPassword = generateTemporaryPassword();
  const passwordHash = await hashPassword(tempPassword);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: studentId },
      data: { passwordHash, mustChangePassword: true, failedLoginAttempts: 0, lockedUntil: null },
    }),
    prisma.auditLog.create({
      data: {
        actorId: mentor.id,
        targetUserId: studentId,
        action: "PASSWORD_RESET",
      },
    }),
  ]);

  // Force the student to re-authenticate with the new temporary password.
  await destroyAllSessionsForUser(studentId);

  revalidatePath("/mentor/students");
  return { tempPassword };
}

/** Mentor-only: soft-deletes (or restores) a student account. Data is preserved for analytics. */
export async function setStudentActive(formData: FormData): Promise<void> {
  const mentor = await requireRole("MENTOR");
  const studentId = formData.get("studentId");
  const isActive = formData.get("isActive") === "true";
  if (typeof studentId !== "string") return;

  const student = await prisma.user.findUnique({ where: { id: studentId } });
  if (!student || student.role !== "STUDENT") return;

  await prisma.$transaction([
    prisma.user.update({ where: { id: studentId }, data: { isActive } }),
    prisma.auditLog.create({
      data: {
        actorId: mentor.id,
        targetUserId: studentId,
        action: isActive ? "ACCOUNT_REACTIVATED" : "ACCOUNT_DEACTIVATED",
      },
    }),
  ]);

  if (!isActive) {
    await destroyAllSessionsForUser(studentId);
  }

  revalidatePath("/mentor/students");
}

/** Mentor-only: clears a student's Baseline Diagnostic attempt(s) so they can retake one (spec 6.6). */
export async function resetStudentBaseline(formData: FormData): Promise<void> {
  const mentor = await requireRole("MENTOR");
  const studentId = formData.get("studentId");
  if (typeof studentId !== "string") return;

  const student = await prisma.user.findUnique({ where: { id: studentId } });
  if (!student || student.role !== "STUDENT") return;

  // ExamAttemptQuestion rows cascade-delete with their attempt; MissedQuestion
  // history from that baseline is intentionally left in place.
  const { count } = await prisma.examAttempt.deleteMany({
    where: { userId: studentId, isBaseline: true },
  });
  if (count === 0) return;

  await prisma.auditLog.create({
    data: { actorId: mentor.id, targetUserId: studentId, action: "BASELINE_RESET" },
  });

  revalidatePath("/mentor/students");
}
