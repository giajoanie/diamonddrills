"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";

export type CreateRubricState = { error?: string } | undefined;

type CriterionInput = { name: string; description?: string; maxPoints: number };

export async function createRubric(
  _prevState: CreateRubricState,
  formData: FormData,
): Promise<CreateRubricState> {
  const mentor = await requireRole("MENTOR");

  const name = formData.get("name");
  const description = formData.get("description");
  const criteriaJson = formData.get("criteriaJson");

  if (typeof name !== "string" || !name.trim()) return { error: "Give the rubric a name." };
  if (typeof criteriaJson !== "string") return { error: "Add at least one criterion." };

  let criteria: CriterionInput[];
  try {
    criteria = JSON.parse(criteriaJson);
  } catch {
    return { error: "Something went wrong reading the criteria — try again." };
  }

  const validCriteria = criteria.filter(
    (c) => c.name?.trim() && Number.isFinite(c.maxPoints) && c.maxPoints > 0,
  );
  if (validCriteria.length === 0) {
    return { error: "Add at least one criterion with a name and a positive point value." };
  }

  await prisma.rubric.create({
    data: {
      name: name.trim(),
      description: typeof description === "string" && description.trim() ? description.trim() : null,
      creatorId: mentor.id,
      criteria: {
        create: validCriteria.map((c, index) => ({
          name: c.name.trim(),
          description: c.description?.trim() || null,
          maxPoints: Math.round(c.maxPoints),
          orderIndex: index,
        })),
      },
    },
  });

  revalidatePath("/mentor/rubrics");
}

export async function deactivateRubric(formData: FormData): Promise<void> {
  await requireRole("MENTOR");
  const rubricId = formData.get("rubricId");
  if (typeof rubricId !== "string") return;

  await prisma.rubric.update({ where: { id: rubricId }, data: { isActive: false } });
  revalidatePath("/mentor/rubrics");
}
