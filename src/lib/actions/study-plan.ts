"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import { getNextCompetitionDate, getWeakAreaAccuracy } from "@/lib/dal/study-plan";
import { getResourceForArea } from "@/lib/dal/resources";
import { generateStudyPlan } from "@/lib/analytics/study-plan";

export type RegenerateStudyPlanState = { error?: string } | undefined;

const MIN_MINUTES_PER_DAY = 5;
const MAX_MINUTES_PER_DAY = 240;

export async function regenerateStudyPlan(
  _prevState: RegenerateStudyPlanState,
  formData: FormData,
): Promise<RegenerateStudyPlanState> {
  const student = await requireRole("STUDENT");

  const minutesPerDayRaw = Number(formData.get("minutesPerDay"));
  const minutesPerDay = Number.isFinite(minutesPerDayRaw)
    ? Math.min(MAX_MINUTES_PER_DAY, Math.max(MIN_MINUTES_PER_DAY, Math.round(minutesPerDayRaw)))
    : null;
  if (minutesPerDay === null) {
    return { error: "Enter how many minutes a day you want to study." };
  }

  const competition = await getNextCompetitionDate();
  if (!competition) {
    return { error: "No upcoming competition date is on the calendar yet — ask a mentor to add one." };
  }

  const weakAreas = await getWeakAreaAccuracy(student.id);
  if (weakAreas.length === 0) {
    return { error: "Take a few exams first so there's data to build a plan from." };
  }

  const items = generateStudyPlan(
    weakAreas.map((a) => a.areaId),
    new Date(),
    competition.date,
    minutesPerDay,
  );
  if (items.length === 0) {
    return { error: "Not enough time before the competition to schedule any sessions." };
  }

  const resourceByArea = new Map<string, string | null>();
  for (const areaId of new Set(items.map((i) => i.areaId))) {
    const resource = await getResourceForArea(student.id, areaId);
    resourceByArea.set(areaId, resource?.id ?? null);
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: student.id }, data: { dailyStudyMinutes: minutesPerDay } }),
    prisma.studyPlanItem.deleteMany({ where: { userId: student.id, completed: false } }),
    prisma.studyPlanItem.createMany({
      data: items.map((item) => ({
        userId: student.id,
        instructionalAreaId: item.areaId,
        resourceId: resourceByArea.get(item.areaId) ?? null,
        dueDate: item.dueDate,
      })),
    }),
  ]);

  revalidatePath("/study-plan");
}

export async function toggleStudyPlanItem(formData: FormData): Promise<void> {
  const student = await requireRole("STUDENT");

  const itemId = formData.get("itemId");
  const completed = formData.get("completed") === "true";
  if (typeof itemId !== "string" || !itemId) return;

  const item = await prisma.studyPlanItem.findUnique({ where: { id: itemId } });
  if (!item || item.userId !== student.id) return;

  const nowCompleted = !completed;
  await prisma.studyPlanItem.update({ where: { id: itemId }, data: { completed: nowCompleted } });

  // Only completing (not un-completing) counts toward the practice streak —
  // otherwise a toggle-off-and-on would double-count the same day's work.
  if (nowCompleted) {
    await prisma.activityLog.create({
      data: { userId: student.id, type: "PRACTICE_SESSION_COMPLETE", metadata: { studyPlanItemId: item.id } },
    });
  }

  revalidatePath("/study-plan");
}
