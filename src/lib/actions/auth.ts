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
    grade: formData.get("grade"),
    roleplayEventId: formData.get("roleplayEventId"),
    writtenEventId: formData.get("writtenEventId"),
  });

  if (!validated.success) {
    return { errors: flattenFieldErrors(validated.error) };
  }

  const { schoolId, firstName, password, grade, roleplayEventId, writtenEventId } =
    validated.data;

  const [roleplayEvent, writtenEvent] = await Promise.all([
    prisma.event.findUnique({ where: { id: roleplayEventId } }),
    prisma.event.findUnique({ where: { id: writtenEventId } }),
  ]);

  if (!roleplayEvent || roleplayEvent.category !== "ROLEPLAY" || !roleplayEvent.isActive) {
    return { message: "Choose a valid roleplay event." };
  }
  if (!writtenEvent || writtenEvent.category !== "WRITTEN" || !writtenEvent.isActive) {
    return { message: "Choose a valid written event." };
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
        grade,
        role: "STUDENT",
      },
    });

    await tx.eventEnrollment.createMany({
      data: [
        { userId: created.id, eventId: roleplayEvent.id },
        { userId: created.id, eventId: writtenEvent.id },
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
