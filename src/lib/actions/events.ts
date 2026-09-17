"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import type { EventCategory } from "@/generated/prisma/client";

export type ChangeEventState = { error?: string } | undefined;

/**
 * Changes a student's current roleplay or written event. The old enrollment
 * is closed (isCurrent = false, endedAt set) rather than deleted, so past
 * exam attempts and submissions stay linked to the event as it existed when
 * they were taken.
 */
export async function changeEvent(
  _prevState: ChangeEventState,
  formData: FormData,
): Promise<ChangeEventState> {
  const user = await requireRole("STUDENT");
  const category = formData.get("category");
  const newEventId = formData.get("newEventId");

  if (
    (category !== "ROLEPLAY" && category !== "WRITTEN") ||
    typeof newEventId !== "string"
  ) {
    return { error: "Invalid request." };
  }

  const newEvent = await prisma.event.findUnique({ where: { id: newEventId } });
  if (!newEvent || !newEvent.isActive || newEvent.category !== category) {
    return { error: "Choose a valid event." };
  }

  await prisma.$transaction(async (tx) => {
    const currentSameCategory = await tx.eventEnrollment.findMany({
      where: {
        userId: user.id,
        isCurrent: true,
        event: { category: category as EventCategory },
      },
    });

    if (currentSameCategory.some((e) => e.eventId === newEventId)) {
      // Already enrolled in this event — nothing to do.
      return;
    }

    await tx.eventEnrollment.updateMany({
      where: { id: { in: currentSameCategory.map((e) => e.id) } },
      data: { isCurrent: false, endedAt: new Date() },
    });

    await tx.eventEnrollment.create({
      data: { userId: user.id, eventId: newEventId },
    });
  });

  revalidatePath("/dashboard");
}
