"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import type { CompetitionLevel } from "@/generated/prisma/client";

export type RecordResultState = { error?: string } | undefined;

const LEVELS: CompetitionLevel[] = ["DISTRICT", "STATE", "ICDC"];

function parseOptionalFloat(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export async function recordCompetitionResult(
  _prevState: RecordResultState,
  formData: FormData,
): Promise<RecordResultState> {
  const mentor = await requireRole("MENTOR");

  const mode = formData.get("mode");
  const userId = formData.get("userId");
  const teamId = formData.get("teamId");
  const eventId = formData.get("eventId");
  const year = formData.get("year");
  const level = formData.get("level");
  if (typeof year !== "string" || !year) return { error: "Enter a year." };
  if (typeof level !== "string" || !LEVELS.includes(level as CompetitionLevel)) {
    return { error: "Choose a competition level." };
  }
  const yearNum = parseInt(year, 10);
  if (!Number.isFinite(yearNum)) return { error: "That year isn't valid." };

  const shared = {
    year: yearNum,
    level: level as CompetitionLevel,
    placement: parseOptionalFloat(formData.get("placement")),
    testScore: parseOptionalFloat(formData.get("testScore")),
    roleplayScore: parseOptionalFloat(formData.get("roleplayScore")),
    presentationScore: parseOptionalFloat(formData.get("presentationScore")),
    advanced: formData.get("advanced") === "on",
    notes: (() => {
      const n = formData.get("notes");
      return typeof n === "string" && n.trim() ? n.trim() : null;
    })(),
    recordedById: mentor.id,
  };

  if (mode === "team") {
    if (typeof teamId !== "string" || !teamId) return { error: "Choose a team." };
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: { where: { leftAt: null } } },
    });
    if (!team || team.members.length === 0) return { error: "That team has no active members." };

    await prisma.competitionResult.createMany({
      data: team.members.map((m) => ({ ...shared, userId: m.userId, eventId: team.eventId, teamId })),
    });
  } else {
    if (typeof userId !== "string" || !userId) return { error: "Choose a student." };
    if (typeof eventId !== "string" || !eventId) return { error: "Choose an event." };
    await prisma.competitionResult.create({ data: { ...shared, userId, eventId } });
  }

  revalidatePath("/mentor/competition-results");
}

export async function deleteCompetitionResult(formData: FormData): Promise<void> {
  await requireRole("MENTOR");
  const resultId = formData.get("resultId");
  if (typeof resultId !== "string") return;

  await prisma.competitionResult.delete({ where: { id: resultId } });
  revalidatePath("/mentor/competition-results");
}
