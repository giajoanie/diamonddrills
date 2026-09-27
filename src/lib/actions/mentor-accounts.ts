"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import { generateTemporaryPassword, hashPassword } from "@/lib/auth/password";
import { destroyAllSessionsForUser } from "@/lib/auth/session";
import { SchoolIdSchema, ProgramSchema } from "@/lib/validation/auth";

export type CreateMentorState =
  | { error?: string; tempPassword?: string; schoolId?: string }
  | undefined;

/**
 * There's no ADMIN role in this app (see prisma/schema.prisma's Role enum) —
 * any mentor can create another mentor account, HS or EBL, since the two
 * seeded mentors predate the Program split and someone has to be able to
 * create the chapter's first EBL mentor account through the app itself.
 */
export async function createMentorAccount(
  _prevState: CreateMentorState,
  formData: FormData,
): Promise<CreateMentorState> {
  await requireRole("MENTOR");

  const schoolIdRaw = formData.get("schoolId");
  const firstNameRaw = formData.get("firstName");
  const programRaw = formData.get("program");

  const schoolIdResult = SchoolIdSchema.safeParse(schoolIdRaw);
  if (!schoolIdResult.success) {
    return { error: schoolIdResult.error.issues[0]?.message ?? "Invalid School ID." };
  }
  const programResult = ProgramSchema.safeParse(programRaw);
  if (!programResult.success) {
    return { error: "Choose a program." };
  }
  if (typeof firstNameRaw !== "string" || !firstNameRaw.trim()) {
    return { error: "Give this mentor a name." };
  }

  const schoolId = schoolIdResult.data;
  const existing = await prisma.user.findUnique({ where: { schoolId } });
  if (existing) {
    return { error: "That School ID is already in use." };
  }

  const tempPassword = generateTemporaryPassword();
  const passwordHash = await hashPassword(tempPassword);

  await prisma.user.create({
    data: {
      schoolId,
      role: "MENTOR",
      program: programResult.data,
      firstName: firstNameRaw.trim(),
      passwordHash,
      mustChangePassword: true,
    },
  });

  revalidatePath("/mentor/mentors");
  return { tempPassword, schoolId };
}

export async function setMentorActive(formData: FormData): Promise<void> {
  const actingMentor = await requireRole("MENTOR");
  const mentorId = formData.get("mentorId");
  const isActive = formData.get("isActive") === "true";
  if (typeof mentorId !== "string" || !mentorId) return;
  if (mentorId === actingMentor.id) return; // can't deactivate yourself

  await prisma.user.updateMany({
    where: { id: mentorId, role: "MENTOR" },
    data: { isActive },
  });

  if (!isActive) {
    await destroyAllSessionsForUser(mentorId);
  }

  revalidatePath("/mentor/mentors");
}
