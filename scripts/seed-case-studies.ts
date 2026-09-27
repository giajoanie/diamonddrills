/**
 * Loads bulk-authored roleplay case studies (src/lib/case-study-seed-data.ts)
 * as plain-text Resource entries (type CASE_STUDY), tagged to their event via
 * ResourceEvent. Idempotent by (event, case study title, uploader) — safe to
 * re-run after editing the seed data.
 *
 * Seeds once per Program that has an active mentor, using that mentor as the
 * uploader, since resource visibility is scoped by uploader.program (HS and
 * EBL rosters never cross) — EBL shares the same roleplay event catalog as
 * HS, so its students need their own copies of these case studies to see
 * them at all. A program with no active mentor yet is skipped and logged.
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/seed-case-studies.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { CASE_STUDY_SEED } from "@/lib/case-study-seed-data";
import { formatCaseStudy } from "@/lib/case-study-format";
import type { Program } from "@/generated/prisma/client";

const PROGRAMS: Program[] = ["HIGH_SCHOOL", "EBL"];

async function main() {
  for (const program of PROGRAMS) {
    const uploader = await prisma.user.findFirst({
      where: { role: "MENTOR", isActive: true, program },
    });
    if (!uploader) {
      console.log(`${program}: no active mentor found, skipped entirely`);
      continue;
    }

    console.log(`=== ${program} (uploader: ${uploader.schoolId}) ===`);
    for (const eventSeed of CASE_STUDY_SEED) {
      const event = await prisma.event.findUnique({ where: { slug: eventSeed.eventSlug } });
      if (!event) {
        console.log(`${eventSeed.eventSlug}: no matching event, skipped`);
        continue;
      }

      const existing = await prisma.resource.findMany({
        where: { type: "CASE_STUDY", uploaderId: uploader.id, resourceEvents: { some: { eventId: event.id } } },
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
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
