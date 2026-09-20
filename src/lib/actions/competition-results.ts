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

  const userId = formData.get("userId");
  const eventId = formData.get("eventId");
  const year = formData.get("year");
  const level = formData.get("level");
  if (typeof userId !== "string" || !userId) return { error: "Choose a student." };
  if (typeof eventId !== "string" || !eventId) return { error: "Choose an event." };
  if (typeof year !== "string" || !year) return { error: "Enter a year." };
  if (typeof level !== "string" || !LEVELS.includes(level as CompetitionLevel)) {
    return { error: "Choose a competition level." };
  }

  const yearNum = parseInt(year, 10);
  if (!Number.isFinite(yearNum)) return { error: "That year isn't valid." };

  await prisma.competitionResult.create({
    data: {
      userId,
      eventId,
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
    },
  });

  revalidatePath("/mentor/competition-results");
}

export async function deleteCompetitionResult(formData: FormData): Promise<void> {
  await requireRole("MENTOR");
  const resultId = formData.get("resultId");
  if (typeof resultId !== "string") return;

  await prisma.competitionResult.delete({ where: { id: resultId } });
  revalidatePath("/mentor/competition-results");
}
