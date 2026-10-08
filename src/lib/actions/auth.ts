"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import {
  createSession,
  destroyCurrentSession,
  getSessionUser,
} from "@/lib/auth/session";
import { ChangePasswordSchema, LoginSchema, SignupSchema } from "@/lib/validation/auth";
import { requireUser } from "@/lib/auth/guards";
import { nextFailedLoginState } from "@/lib/auth/lockout";
import { isRateLimited } from "@/lib/rate-limit";

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
}

export type FormState = {
  errors?: Record<string, string[]>;
  message?: string;
} | undefined;

export async function signup(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isRateLimited(`signup:${await clientIp()}`, 5, 60 * 60 * 1000)) {
    return { message: "Too many signup attempts from this network. Try again later." };
  }

  const validated = SignupSchema.safeParse({
    schoolId: formData.get("schoolId"),
    firstName: formData.get("firstName"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    program: formData.get("program"),
    grade: formData.get("grade"),
    roleplayEventId: formData.get("roleplayEventId"),
    roleplayEventId2: formData.get("roleplayEventId2"),
    writtenEventId: formData.get("writtenEventId"),
    projectManagementEventId: formData.get("projectManagementEventId"),
  });

  if (!validated.success) {
    return { errors: flattenFieldErrors(validated.error) };
  }

  const {
    schoolId,
    firstName,
    password,
    program,
    grade,
    roleplayEventId,
    roleplayEventId2,
    writtenEventId,
    projectManagementEventId,
  } = validated.data;
  const isHighSchool = program === "HIGH_SCHOOL";

  const [roleplayEvent, roleplayEvent2, writtenEvent, projectManagementEvent] = await Promise.all([
    prisma.event.findUnique({ where: { id: roleplayEventId } }),
    !isHighSchool && roleplayEventId2
      ? prisma.event.findUnique({ where: { id: roleplayEventId2 } })
      : Promise.resolve(null),
    isHighSchool && writtenEventId
      ? prisma.event.findUnique({ where: { id: writtenEventId } })
      : Promise.resolve(null),
    isHighSchool && projectManagementEventId
      ? prisma.event.findUnique({ where: { id: projectManagementEventId } })
      : Promise.resolve(null),
  ]);

  if (!roleplayEvent || roleplayEvent.category !== "ROLEPLAY" || !roleplayEvent.isActive) {
    return { message: "Choose a valid roleplay event." };
  }
  // EBL takes two roleplay events — one Principles-format, one Series or
  // Team Decision Making-format — rather than HIGH_SCHOOL's single pick.
  if (!isHighSchool) {
    if (roleplayEvent.format !== "PRINCIPLES") {
      return { message: "Your first roleplay event must be a Principles event." };
    }
    if (
      !roleplayEvent2 ||
      roleplayEvent2.category !== "ROLEPLAY" ||
      !roleplayEvent2.isActive ||
      (roleplayEvent2.format !== "SERIES" && roleplayEvent2.format !== "TEAM_DECISION_MAKING")
    ) {
      return {
        message: "Your second roleplay event must be a Series or Team Decision Making event.",
      };
    }
  }
  // EBL (Emerging Business Leaders, middle school) is roleplay-only — a
  // written event is never created for it, even if one was somehow posted.
  if (isHighSchool && (!writtenEvent || writtenEvent.category !== "WRITTEN" || !writtenEvent.isActive)) {
    return { message: "Choose a valid written event." };
  }
  // Project management event is an optional third pick — only validated
  // when the student actually chose one.
  if (
    isHighSchool &&
    projectManagementEventId &&
    (!projectManagementEvent ||
      projectManagementEvent.category !== "WRITTEN" ||
      projectManagementEvent.format !== "PROJECT_MANAGEMENT" ||
      !projectManagementEvent.isActive)
  ) {
    return { message: "Choose a valid project management event." };
  }

  const existing = await prisma.user.findUnique({ where: { schoolId } });
  if (existing) {
    return { errors: { schoolId: ["That School ID is already registered."] } };
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        schoolId,
        firstName,
        passwordHash,
        program,
        grade,
        role: "STUDENT",
      },
    });

    await tx.eventEnrollment.createMany({
      data: [
        { userId: created.id, eventId: roleplayEvent.id },
        ...(roleplayEvent2 ? [{ userId: created.id, eventId: roleplayEvent2.id }] : []),
        ...(writtenEvent ? [{ userId: created.id, eventId: writtenEvent.id }] : []),
        ...(projectManagementEvent ? [{ userId: created.id, eventId: projectManagementEvent.id }] : []),
      ],
    });

    return created;
  });

  await createSession(user.id);
  redirect("/dashboard");
}

export async function login(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validated = LoginSchema.safeParse({
    schoolId: formData.get("schoolId"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: flattenFieldErrors(validated.error) };
  }

  const { schoolId, password } = validated.data;
  const genericError = { message: "Incorrect School ID or password." };

  const user = await prisma.user.findUnique({ where: { schoolId } });
  if (!user || !user.isActive) {
    return genericError;
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return {
      message: "This account is temporarily locked due to failed login attempts. Try again later.",
    };
  }

  const validPassword = await verifyPassword(password, user.passwordHash);

  if (!validPassword) {
    await prisma.user.update({
      where: { id: user.id },
      data: nextFailedLoginState(user.failedLoginAttempts),
    });
    return genericError;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: new Date() },
  });

  await createSession(user.id);
  await prisma.activityLog.create({
    data: { userId: user.id, type: "LOGIN" },
  });

  if (user.mustChangePassword) {
    redirect("/change-password");
  }
  redirect(user.role === "MENTOR" ? "/mentor" : "/dashboard");
}

export async function changePassword(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await requireUser();

  const validated = ChangePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validated.success) {
    return { errors: flattenFieldErrors(validated.error) };
  }

  const { currentPassword, newPassword } = validated.data;

  const validCurrent = await verifyPassword(currentPassword, user.passwordHash);
  if (!validCurrent) {
    return { errors: { currentPassword: ["Current password is incorrect."] } };
  }

  const newPasswordHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: newPasswordHash, mustChangePassword: false },
  });

  redirect(user.role === "MENTOR" ? "/mentor" : "/dashboard");
}

export async function logout(): Promise<void> {
  const user = await getSessionUser();
  if (user) {
    await prisma.activityLog.create({ data: { userId: user.id, type: "LOGOUT" } });
  }
  await destroyCurrentSession();
  redirect("/");
}

function flattenFieldErrors(error: {
  flatten: () => { fieldErrors: Record<string, string[] | undefined> };
}): Record<string, string[]> {
  const { fieldErrors } = error.flatten();
  const out: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(fieldErrors)) {
    if (value) out[key] = value;
  }
  return out;
}
