"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/guards";
import type { MilestoneKind } from "@/generated/prisma/client";

export type CreateMilestoneState = { error?: string; success?: boolean } | undefined;

const KINDS: MilestoneKind[] = ["MILESTONE", "DEADLINE", "PRACTICE"];

// Both students and mentors can add milestones, but scope isn't a form
// choice — a student's milestone is always their own private one, and a
// mentor's is always shared chapter-wide, mirroring how Announcements work.
export async function createMilestone(
  _prevState: CreateMilestoneState,
  formData: FormData,
): Promise<CreateMilestoneState> {
  const user = await requireUser();

  const title = formData.get("title");
  const date = formData.get("date");
  const kind = formData.get("kind");

  if (typeof title !== "string" || !title.trim()) return { error: "Give the milestone a title." };
  if (typeof date !== "string" || !date) return { error: "Choose a date." };
  const dateValue = new Date(date);
  if (Number.isNaN(dateValue.getTime())) return { error: "That date isn't valid." };
  if (typeof kind !== "string" || !KINDS.includes(kind as MilestoneKind)) {
    return { error: "Choose a milestone type." };
  }

  await prisma.calendarMilestone.create({
    data: {
      title: title.trim().slice(0, 200),
      date: dateValue,
      kind: kind as MilestoneKind,
      scope: user.role === "MENTOR" ? "SHARED" : "PERSONAL",
      createdById: user.id,
    },
  });

  revalidatePath("/calendar");
  revalidatePath("/mentor/calendar");
  return { success: true };
}

export async function deleteMilestone(formData: FormData): Promise<void> {
  const user = await requireUser();
  const milestoneId = formData.get("milestoneId");
  if (typeof milestoneId !== "string") return;

  // Only the creator can remove their own milestone — a student can't
  // delete a mentor's shared one, and vice versa.
  await prisma.calendarMilestone.deleteMany({ where: { id: milestoneId, createdById: user.id } });

  revalidatePath("/calendar");
  revalidatePath("/mentor/calendar");
}
