"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";

export type CreateTeamState = { error?: string } | undefined;

export async function createTeam(
  _prevState: CreateTeamState,
  formData: FormData,
): Promise<CreateTeamState> {
  const mentor = await requireRole("MENTOR");

  const eventId = formData.get("eventId");
  const name = formData.get("name");
  const memberIds = formData.getAll("memberIds").map(String).filter(Boolean);

  if (typeof eventId !== "string" || !eventId) return { error: "Choose an event." };
  if (memberIds.length < 2) return { error: "A team needs at least two students." };

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.teamSizeMax <= 1) return { error: "That event isn't a team event." };
  if (memberIds.length > event.teamSizeMax) {
    return { error: `${event.name} allows at most ${event.teamSizeMax} teammates.` };
  }

  const validMembers = await prisma.user.findMany({
    where: { id: { in: memberIds }, role: "STUDENT", program: mentor.program },
    select: { id: true },
  });
  if (validMembers.length !== memberIds.length) {
    return { error: "One or more of these students could not be found." };
  }

  // A student can only be on one active team per event.
  const existing = await prisma.teamMember.findMany({
    where: { userId: { in: memberIds }, leftAt: null, team: { eventId } },
  });
  if (existing.length > 0) {
    return { error: "One or more of these students is already on a team for this event." };
  }

  await prisma.team.create({
    data: {
      eventId,
      name: typeof name === "string" && name.trim() ? name.trim() : null,
      members: { create: memberIds.map((userId) => ({ userId })) },
    },
  });

  revalidatePath("/mentor/teams");
}

export async function removeTeamMember(formData: FormData): Promise<void> {
  const mentor = await requireRole("MENTOR");
  const teamMemberId = formData.get("teamMemberId");
  if (typeof teamMemberId !== "string") return;

  await prisma.teamMember.updateMany({
    where: { id: teamMemberId, user: { program: mentor.program } },
    data: { leftAt: new Date() },
  });
  revalidatePath("/mentor/teams");
}

export async function disbandTeam(formData: FormData): Promise<void> {
  const mentor = await requireRole("MENTOR");
  const teamId = formData.get("teamId");
  if (typeof teamId !== "string") return;

  await prisma.teamMember.updateMany({
    where: { teamId, leftAt: null, user: { program: mentor.program } },
    data: { leftAt: new Date() },
  });
  revalidatePath("/mentor/teams");
}
