"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import type { AnnouncementAudience } from "@/generated/prisma/client";

export type CreateAnnouncementState = { error?: string } | undefined;

const AUDIENCES: AnnouncementAudience[] = ["EVERYONE", "GRADE", "CLUSTER", "EVENT"];

export async function createAnnouncement(
  _prevState: CreateAnnouncementState,
  formData: FormData,
): Promise<CreateAnnouncementState> {
  const mentor = await requireRole("MENTOR");

  const title = formData.get("title");
  const body = formData.get("body");
  const audience = formData.get("audience");
  const grade = formData.get("grade");
  const clusterId = formData.get("clusterId");
  const eventId = formData.get("eventId");

  if (typeof title !== "string" || !title.trim()) return { error: "Give the announcement a title." };
  if (typeof body !== "string" || !body.trim()) return { error: "Write the announcement body." };
  if (typeof audience !== "string" || !AUDIENCES.includes(audience as AnnouncementAudience)) {
    return { error: "Choose an audience." };
  }
  if (audience === "GRADE" && (typeof grade !== "string" || !grade)) {
    return { error: "Choose a grade." };
  }
  if (audience === "CLUSTER" && (typeof clusterId !== "string" || !clusterId)) {
    return { error: "Choose a cluster." };
  }
  if (audience === "EVENT" && (typeof eventId !== "string" || !eventId)) {
    return { error: "Choose an event." };
  }

  await prisma.announcement.create({
    data: {
      authorId: mentor.id,
      title: title.trim(),
      body: body.trim(),
      audience: audience as AnnouncementAudience,
      grade: audience === "GRADE" && typeof grade === "string" ? parseInt(grade, 10) : null,
      clusterId: audience === "CLUSTER" && typeof clusterId === "string" ? clusterId : null,
      eventId: audience === "EVENT" && typeof eventId === "string" ? eventId : null,
    },
  });

  revalidatePath("/mentor/announcements");
  revalidatePath("/announcements");
}

export async function deleteAnnouncement(formData: FormData): Promise<void> {
  await requireRole("MENTOR");
  const announcementId = formData.get("announcementId");
  if (typeof announcementId !== "string") return;

  await prisma.announcement.delete({ where: { id: announcementId } });
  revalidatePath("/mentor/announcements");
  revalidatePath("/announcements");
}

export type CreateCalendarEventState = { error?: string } | undefined;

export async function createCalendarEvent(
  _prevState: CreateCalendarEventState,
  formData: FormData,
): Promise<CreateCalendarEventState> {
  const mentor = await requireRole("MENTOR");

  const title = formData.get("title");
  const date = formData.get("date");
  const description = formData.get("description");
  const level = formData.get("level");

  if (typeof title !== "string" || !title.trim()) return { error: "Give the event a title." };
  if (typeof date !== "string" || !date) return { error: "Choose a date." };
  const dateValue = new Date(date);
  if (Number.isNaN(dateValue.getTime())) return { error: "That date isn't valid." };

  await prisma.calendarEvent.create({
    data: {
      title: title.trim(),
      description: typeof description === "string" && description.trim() ? description.trim() : null,
      date: dateValue,
      level: typeof level === "string" && level ? (level as "DISTRICT" | "STATE" | "ICDC") : null,
      createdById: mentor.id,
    },
  });

  revalidatePath("/mentor/calendar");
  revalidatePath("/calendar");
}

export async function deleteCalendarEvent(formData: FormData): Promise<void> {
  await requireRole("MENTOR");
  const eventId = formData.get("calendarEventId");
  if (typeof eventId !== "string") return;

  await prisma.calendarEvent.delete({ where: { id: eventId } });
  revalidatePath("/mentor/calendar");
  revalidatePath("/calendar");
}
