"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import { getRoleplayTimerPreset } from "@/lib/roleplay/timer-presets";

export type StartRoleplayState = { error?: string } | undefined;

export async function startRoleplaySession(
  _prevState: StartRoleplayState,
  formData: FormData,
): Promise<StartRoleplayState> {
  const student = await requireRole("STUDENT");

  const eventId = formData.get("eventId");
  const caseStudyResourceId = formData.get("caseStudyResourceId");
  if (typeof eventId !== "string" || !eventId) return { error: "Choose your roleplay event." };

  const enrollment = await prisma.eventEnrollment.findFirst({
    where: { userId: student.id, eventId, isCurrent: true },
    include: { event: true },
  });
  if (!enrollment || enrollment.event.category !== "ROLEPLAY") {
    return { error: "That isn't one of your current roleplay events." };
  }

  const preset = getRoleplayTimerPreset(enrollment.event.format);

  const session = await prisma.roleplayPracticeSession.create({
    data: {
      userId: student.id,
      eventId,
      caseStudyResourceId:
        typeof caseStudyResourceId === "string" && caseStudyResourceId ? caseStudyResourceId : null,
      prepSeconds: preset.prepSeconds,
      presentationSeconds: preset.presentationSeconds,
    },
  });

  await prisma.activityLog.create({
    data: { userId: student.id, type: "ROLEPLAY_SESSION_START", metadata: { sessionId: session.id, eventId } },
  });

  const partnerId = formData.get("partnerId");
  if (typeof partnerId === "string" && partnerId && partnerId !== student.id) {
    // Re-check the partner is a real, current peer in this same event rather
    // than trusting the posted id — the dropdown only ever offers valid
    // peers, but the field is still client-controlled.
    const partnerEnrollment = await prisma.eventEnrollment.findFirst({
      where: { userId: partnerId, eventId, isCurrent: true, user: { isActive: true, role: "STUDENT" } },
    });
    if (partnerEnrollment) {
      await prisma.practiceInvite.create({
        data: { roleplaySessionId: session.id, fromUserId: student.id, toUserId: partnerId },
      });
    }
  }

  redirect(`/roleplay/${session.id}`);
}

export async function dismissPracticeInvite(formData: FormData): Promise<void> {
  const student = await requireRole("STUDENT");

  const inviteId = formData.get("inviteId");
  if (typeof inviteId !== "string" || !inviteId) return;

  await prisma.practiceInvite.deleteMany({ where: { id: inviteId, toUserId: student.id } });
}

export async function saveRoleplayNotes(formData: FormData): Promise<void> {
  const student = await requireRole("STUDENT");

  const sessionId = formData.get("sessionId");
  const notes = formData.get("notes");
  if (typeof sessionId !== "string" || !sessionId) return;

  const session = await prisma.roleplayPracticeSession.findUnique({ where: { id: sessionId } });
  if (!session || session.userId !== student.id) return;

  await prisma.roleplayPracticeSession.update({
    where: { id: sessionId },
    data: { notes: typeof notes === "string" ? notes : null },
  });
}

// Plain form-action wrapper so a server component (e.g. the exam results
// page's "start your roleplay now" CTA after Competition Simulation Mode)
// can hand this straight to <form action={...}> without a client component
// — startRoleplaySession's two-arg signature is shaped for useActionState.
export async function startRoleplayFromExamResults(formData: FormData): Promise<void> {
  await startRoleplaySession(undefined, formData);
}

export type CompleteRoleplayState = { error?: string } | undefined;

export async function completeRoleplaySession(
  _prevState: CompleteRoleplayState,
  formData: FormData,
): Promise<CompleteRoleplayState> {
  const student = await requireRole("STUDENT");

  const sessionId = formData.get("sessionId");
  if (typeof sessionId !== "string" || !sessionId) return { error: "Missing session." };

  const session = await prisma.roleplayPracticeSession.findUnique({ where: { id: sessionId } });
  if (!session || session.userId !== student.id) return { error: "Session not found." };
  if (session.completedAt) return { error: "This session is already complete." };

  const criterionIds = formData.getAll("criterionId").map(String);
  const selfRatings: Record<string, number> = {};
  for (const criterionId of criterionIds) {
    const raw = formData.get(`rating-${criterionId}`);
    const value = Number(raw);
    if (Number.isFinite(value)) selfRatings[criterionId] = value;
  }

  await prisma.roleplayPracticeSession.update({
    where: { id: sessionId },
    data: { completedAt: new Date(), selfRatings },
  });

  await prisma.activityLog.create({
    data: { userId: student.id, type: "ROLEPLAY_SESSION_COMPLETE", metadata: { sessionId } },
  });

  revalidatePath(`/roleplay/${sessionId}`);
  redirect(`/roleplay/${sessionId}/results`);
}
