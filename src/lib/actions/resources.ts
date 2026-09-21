"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, requireUser } from "@/lib/auth/guards";
import { saveUploadedFile, MAX_UPLOAD_BYTES } from "@/lib/files/storage";
import type { CompetitionLevel, ResourceType } from "@/generated/prisma/client";

export type CreateResourceState = { error?: string } | undefined;

const RESOURCE_TYPES: ResourceType[] = [
  "CASE_STUDY",
  "EXAM",
  "LESSON",
  "VIDEO",
  "STUDY_GUIDE",
  "SAMPLE_WRITTEN",
  "RUBRIC",
  "PRESENTATION",
  "OTHER",
];
const COMPETITION_LEVELS: CompetitionLevel[] = ["DISTRICT", "STATE", "ICDC"];

export async function createResource(
  _prevState: CreateResourceState,
  formData: FormData,
): Promise<CreateResourceState> {
  const mentor = await requireRole("MENTOR");

  const name = formData.get("name");
  const type = formData.get("type");
  const description = formData.get("description");
  const gradeRaw = formData.get("grade");
  const competitionLevelRaw = formData.get("competitionLevel");
  const allEvents = formData.get("allEvents") === "on";
  const clusterIds = formData.getAll("clusterIds").map(String).filter(Boolean);
  const eventIds = formData.getAll("eventIds").map(String).filter(Boolean);
  const instructionalAreaIds = formData.getAll("instructionalAreaIds").map(String).filter(Boolean);
  const externalUrl = formData.get("externalUrl");
  const file = formData.get("file");

  if (typeof name !== "string" || !name.trim()) return { error: "Give the resource a name." };
  if (typeof type !== "string" || !RESOURCE_TYPES.includes(type as ResourceType)) {
    return { error: "Choose a resource type." };
  }
  const hasFile = file instanceof File && file.size > 0;
  const hasUrl = typeof externalUrl === "string" && externalUrl.trim().length > 0;
  if (!hasFile && !hasUrl) return { error: "Attach a file or an external URL." };
  if (hasFile && (file as File).size > MAX_UPLOAD_BYTES) {
    return { error: `That file is too large — the limit is ${MAX_UPLOAD_BYTES / (1024 * 1024)} MB.` };
  }
  if (!allEvents && clusterIds.length === 0 && eventIds.length === 0) {
    return { error: "Tag this resource to at least one cluster, event, or \"all events\"." };
  }

  const grade = gradeRaw && gradeRaw.toString() ? parseInt(gradeRaw.toString(), 10) : null;
  const competitionLevel =
    competitionLevelRaw && COMPETITION_LEVELS.includes(competitionLevelRaw as CompetitionLevel)
      ? (competitionLevelRaw as CompetitionLevel)
      : null;

  const resource = await prisma.resource.create({
    data: {
      uploaderId: mentor.id,
      name: name.trim(),
      type: type as ResourceType,
      description: typeof description === "string" && description.trim() ? description.trim() : null,
      grade,
      competitionLevel,
      allEvents,
      externalUrl: hasUrl ? externalUrl!.toString().trim() : null,
    },
  });

  if (hasFile) {
    const fileUrl = await saveUploadedFile(file as File, `resources/${resource.id}`);
    await prisma.resource.update({ where: { id: resource.id }, data: { fileUrl } });
  }

  await prisma.$transaction([
    ...clusterIds.map((clusterId) =>
      prisma.resourceCluster.create({ data: { resourceId: resource.id, clusterId } }),
    ),
    ...eventIds.map((eventId) =>
      prisma.resourceEvent.create({ data: { resourceId: resource.id, eventId } }),
    ),
    ...instructionalAreaIds.map((instructionalAreaId) =>
      prisma.resourceInstructionalArea.create({
        data: { resourceId: resource.id, instructionalAreaId },
      }),
    ),
  ]);

  revalidatePath("/mentor/resources");
  revalidatePath("/resources");
}

export async function deactivateResource(formData: FormData): Promise<void> {
  await requireRole("MENTOR");
  const resourceId = formData.get("resourceId");
  if (typeof resourceId !== "string") return;

  await prisma.resource.update({ where: { id: resourceId }, data: { isActive: false } });
  revalidatePath("/mentor/resources");
  revalidatePath("/resources");
}

export async function logResourceOpen(resourceId: string): Promise<void> {
  const user = await requireUser();
  await prisma.activityLog.create({
    data: { userId: user.id, type: "RESOURCE_OPEN", metadata: { resourceId } },
  });
}
