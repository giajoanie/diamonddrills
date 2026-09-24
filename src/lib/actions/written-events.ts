"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import { generateSectionMilestones } from "@/lib/analytics/written-event-plan";

export type SaveChecklistState = { error?: string } | undefined;

export async function saveChecklist(
  _prevState: SaveChecklistState,
  formData: FormData,
): Promise<SaveChecklistState> {
  await requireRole("MENTOR");

  const eventId = formData.get("eventId");
  const pageLimitRaw = formData.get("pageLimit");
  const requiredSectionsRaw = formData.get("requiredSections");
  const formattingNotes = formData.get("formattingNotes");

  if (typeof eventId !== "string" || !eventId) return { error: "Missing event." };

  const pageLimit = pageLimitRaw && pageLimitRaw.toString() ? parseInt(pageLimitRaw.toString(), 10) : null;
  const requiredSections =
    typeof requiredSectionsRaw === "string"
      ? requiredSectionsRaw
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
  const formattingRequirements =
    typeof formattingNotes === "string" && formattingNotes.trim()
      ? { notes: formattingNotes.trim() }
      : undefined;

  await prisma.writtenEventChecklist.upsert({
    where: { eventId },
    create: {
      eventId,
      pageLimit,
      requiredSections,
      formattingRequirements,
    },
    update: {
      pageLimit,
      requiredSections,
      formattingRequirements,
    },
  });

  revalidatePath(`/mentor/written-events/${eventId}`);
  revalidatePath("/written-event");
}

export type GenerateMilestonePlanState = { error?: string } | undefined;

/**
 * Replaces an event's milestones with one per required-sections entry,
 * evenly spaced so the last section is due exactly on the target date —
 * e.g. "the entire written done by Nov 1" for every student in the event.
 */
export async function generateMilestonePlan(
  _prevState: GenerateMilestonePlanState,
  formData: FormData,
): Promise<GenerateMilestonePlanState> {
  await requireRole("MENTOR");

  const eventId = formData.get("eventId");
  const targetDateRaw = formData.get("targetDate");
  if (typeof eventId !== "string" || !eventId) return { error: "Missing event." };
  if (typeof targetDateRaw !== "string" || !targetDateRaw) return { error: "Pick a target completion date." };

  const targetDate = new Date(targetDateRaw);
  if (Number.isNaN(targetDate.getTime())) return { error: "Pick a valid target completion date." };

  const checklist = await prisma.writtenEventChecklist.findUnique({ where: { eventId } });
  const sections = Array.isArray(checklist?.requiredSections) ? (checklist.requiredSections as string[]) : [];
  if (sections.length === 0) {
    return { error: "Add required sections to the checklist above first." };
  }

  const milestones = generateSectionMilestones(sections, new Date(), targetDate);
  if (milestones.length === 0) {
    return { error: "The target date needs to be at least a day out." };
  }

  await prisma.$transaction([
    prisma.milestone.deleteMany({ where: { eventId } }),
    prisma.milestone.createMany({
      data: milestones.map((m, i) => ({ eventId, name: m.name, dueAt: m.dueAt, orderIndex: i })),
    }),
  ]);

  revalidatePath(`/mentor/written-events/${eventId}`);
  revalidatePath("/written-event");
}

export async function createMilestone(formData: FormData): Promise<void> {
  await requireRole("MENTOR");

  const eventId = formData.get("eventId");
  const name = formData.get("name");
  const dueAtRaw = formData.get("dueAt");
  if (typeof eventId !== "string" || !eventId) return;
  if (typeof name !== "string" || !name.trim()) return;
  if (typeof dueAtRaw !== "string" || !dueAtRaw) return;

  const dueAt = new Date(dueAtRaw);
  if (Number.isNaN(dueAt.getTime())) return;

  const count = await prisma.milestone.count({ where: { eventId } });
  await prisma.milestone.create({
    data: { eventId, name: name.trim(), dueAt, orderIndex: count },
  });

  revalidatePath(`/mentor/written-events/${eventId}`);
  revalidatePath("/written-event");
}

export async function deleteMilestone(formData: FormData): Promise<void> {
  await requireRole("MENTOR");

  const milestoneId = formData.get("milestoneId");
  const eventId = formData.get("eventId");
  if (typeof milestoneId !== "string" || !milestoneId) return;

  await prisma.milestone.delete({ where: { id: milestoneId } });

  if (typeof eventId === "string" && eventId) {
    revalidatePath(`/mentor/written-events/${eventId}`);
    revalidatePath("/written-event");
  }
}
