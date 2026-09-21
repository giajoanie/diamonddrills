"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import { getAttemptQuestionHistory, getInstructionalAreasForBank } from "@/lib/dal/exam-engine";
import { getNextCompetitionDate } from "@/lib/dal/study-plan";
import { getResourceForArea } from "@/lib/dal/resources";
import { computeAreaBreakdown, computeWeightedWeakAreas } from "@/lib/exam-engine/scoring";
import { generateStudyPlan } from "@/lib/analytics/study-plan";

export type RegenerateStudyPlanState = { error?: string } | undefined;

// Signature shaped for useActionState even though this action takes no
// student-supplied input — it only ever acts on the current user.
export async function regenerateStudyPlan(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _prevState: RegenerateStudyPlanState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _formData: FormData,
): Promise<RegenerateStudyPlanState> {
  const student = await requireRole("STUDENT");

  const competition = await getNextCompetitionDate();
  if (!competition) {
    return { error: "No upcoming competition date is on the calendar yet — ask a mentor to add one." };
  }

  const [attempts, instructionalAreas] = await Promise.all([
    getAttemptQuestionHistory(student.id),
    getInstructionalAreasForBank(),
  ]);
  if (attempts.length === 0) {
    return { error: "Take a few exams first so there's data to build a plan from." };
  }

  const perAttemptBreakdowns = attempts.map((a) => computeAreaBreakdown(a.questions));
  const nameToId = new Map(instructionalAreas.map((a) => [a.name, a.id]));
  const weakAreaIds = computeWeightedWeakAreas(perAttemptBreakdowns, 5)
    .map((a) => nameToId.get(a.areaName))
    .filter((id): id is string => !!id);

  const items = generateStudyPlan(weakAreaIds, new Date(), competition.date);
  if (items.length === 0) {
    return { error: "Not enough time before the competition to schedule any sessions." };
  }

  const resourceByArea = new Map<string, string | null>();
  for (const areaId of new Set(items.map((i) => i.areaId))) {
    const resource = await getResourceForArea(student.id, areaId);
    resourceByArea.set(areaId, resource?.id ?? null);
  }

  await prisma.$transaction([
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

  await prisma.studyPlanItem.update({ where: { id: itemId }, data: { completed: !completed } });
  revalidatePath("/study-plan");
}
