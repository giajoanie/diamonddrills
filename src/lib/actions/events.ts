"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import type { EventCategory } from "@/generated/prisma/client";

export type ChangeEventState = { error?: string } | undefined;

/**
 * Swaps one specific current enrollment for a new event in the same
 * category. Targets oldEventId exactly, rather than closing every current
 * enrollment in the category — a student can have more than one current
 * roleplay (EBL's Principles + Series/TDM pair) or written (written +
 * project management) enrollment at once, and swapping one must not drop
 * the other. The old enrollment is closed (isCurrent = false, endedAt set)
 * rather than deleted, so past exam attempts and submissions stay linked to
 * the event as it existed when they were taken.
 */
export async function changeEvent(
  _prevState: ChangeEventState,
  formData: FormData,
): Promise<ChangeEventState> {
  const user = await requireRole("STUDENT");
  const category = formData.get("category");
  const oldEventId = formData.get("oldEventId");
  const newEventId = formData.get("newEventId");

  if (
    (category !== "ROLEPLAY" && category !== "WRITTEN") ||
    typeof oldEventId !== "string" ||
    typeof newEventId !== "string"
  ) {
    return { error: "Invalid request." };
  }
  if (category === "WRITTEN" && user.program === "EBL") {
    return { error: "EBL doesn't have written events." };
  }
  if (oldEventId === newEventId) return;

  const newEvent = await prisma.event.findUnique({ where: { id: newEventId } });
  if (!newEvent || !newEvent.isActive || newEvent.category !== category) {
    return { error: "Choose a valid event." };
  }

  await prisma.$transaction(async (tx) => {
    const oldEnrollment = await tx.eventEnrollment.findFirst({
      where: {
        userId: user.id,
        eventId: oldEventId,
        isCurrent: true,
        event: { category: category as EventCategory },
      },
    });
    if (!oldEnrollment) return;

    const alreadyEnrolledInNew = await tx.eventEnrollment.findFirst({
      where: { userId: user.id, eventId: newEventId, isCurrent: true },
    });
    if (alreadyEnrolledInNew) return;

    await tx.eventEnrollment.update({
      where: { id: oldEnrollment.id },
      data: { isCurrent: false, endedAt: new Date() },
    });
    await tx.eventEnrollment.create({
      data: { userId: user.id, eventId: newEventId },
    });
  });

  revalidatePath("/dashboard");
}

export type AddRoleplayEventState = { error?: string } | undefined;

/**
 * EBL-only: adds a second current roleplay enrollment alongside the
 * student's first, rather than replacing it (changeEvent always swaps one
 * specific enrollment for another). Every EBL student needs one Principles
 * event and one Series/Team Decision Making event — this fills whichever
 * slot their existing enrollment(s) don't already cover. For a pre-existing
 * EBL account whose one enrollment predates this pairing (some other
 * format), either slot is accepted as the second pick.
 */
export async function addSecondRoleplayEvent(
  _prevState: AddRoleplayEventState,
  formData: FormData,
): Promise<AddRoleplayEventState> {
  const user = await requireRole("STUDENT");
  if (user.program !== "EBL") {
    return { error: "This is only for EBL students." };
  }

  const newEventId = formData.get("eventId");
  if (typeof newEventId !== "string" || !newEventId) {
    return { error: "Choose an event." };
  }

  const newEvent = await prisma.event.findUnique({ where: { id: newEventId } });
  if (!newEvent || !newEvent.isActive || newEvent.category !== "ROLEPLAY") {
    return { error: "Choose a valid roleplay event." };
  }

  const current = await prisma.eventEnrollment.findMany({
    where: { userId: user.id, isCurrent: true, event: { category: "ROLEPLAY" } },
    include: { event: true },
  });

  if (current.length >= 2) {
    return { error: "You already have two roleplay events." };
  }
  if (current.some((e) => e.eventId === newEventId)) {
    return { error: "You're already enrolled in that event." };
  }
  const hasPrinciples = current.some((e) => e.event.format === "PRINCIPLES");
  const hasSeriesOrTdm = current.some(
    (e) => e.event.format === "SERIES" || e.event.format === "TEAM_DECISION_MAKING",
  );
  if (hasPrinciples && newEvent.format !== "SERIES" && newEvent.format !== "TEAM_DECISION_MAKING") {
    return { error: "Your second roleplay event must be a Series or Team Decision Making event." };
  }
  if (hasSeriesOrTdm && newEvent.format !== "PRINCIPLES") {
    return { error: "Your second roleplay event must be a Principles event." };
  }

  await prisma.eventEnrollment.create({ data: { userId: user.id, eventId: newEventId } });
  revalidatePath("/dashboard");
}
