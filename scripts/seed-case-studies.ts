/**
 * Loads bulk-authored roleplay case studies (src/lib/case-study-seed-data.ts)
 * as plain-text Resource entries (type CASE_STUDY), tagged to their event via
 * ResourceEvent. Idempotent by (event, case study title) — safe to re-run
 * after editing the seed data.
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/seed-case-studies.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { CASE_STUDY_SEED } from "@/lib/case-study-seed-data";
import { formatCaseStudy } from "@/lib/case-study-format";

async function main() {
  const uploader = await prisma.user.findFirst({ where: { role: "MENTOR", isActive: true } });
  if (!uploader) {
    throw new Error("No active mentor found to use as the case studies' uploader.");
  }

  for (const eventSeed of CASE_STUDY_SEED) {
    const event = await prisma.event.findUnique({ where: { slug: eventSeed.eventSlug } });
    if (!event) {
      console.log(`${eventSeed.eventSlug}: no matching event, skipped`);
      continue;
    }

    const existing = await prisma.resource.findMany({
      where: { type: "CASE_STUDY", resourceEvents: { some: { eventId: event.id } } },
      select: { name: true },
    });
    const existingTitles = new Set(existing.map((r) => r.name));
    const toCreate = eventSeed.cases.filter((c) => !existingTitles.has(c.title));

    for (const caseStudy of toCreate) {
      await prisma.resource.create({
        data: {
          uploaderId: uploader.id,
          name: caseStudy.title,
          type: "CASE_STUDY",
          description: formatCaseStudy(eventSeed, caseStudy),
          resourceEvents: { create: { eventId: event.id } },
        },
      });
    }
    console.log(`${eventSeed.eventSlug}: ${toCreate.length} created, ${eventSeed.cases.length - toCreate.length} already present`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
