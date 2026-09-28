/**
 * Seeds one official judge-evaluation rubric per roleplay event, per Program
 * — mirroring the real structure of DECA's own Judge's Evaluation Form (see
 * AAM-26 District Event 1: PERFORMANCE INDICATORS, SOLUTION, CAREER
 * COMPETENCIES, OVERALL IMPRESSION), scaled to each event's own
 * performance-indicator count (5 for most Series/Professional Selling
 * events, 4 for Principles, 7 for Team Decision Making, 3 "Standards" for
 * Personal Financial Literacy) — the same PI count already established per
 * event in case-study-seed-data.ts, read directly from there so the two
 * can never drift out of sync.
 *
 * Idempotent: replaces an event's official rubric's criteria on every run
 * rather than duplicating it, keyed by (creatorId, eventId, name).
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/seed-official-rubrics.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { CASE_STUDY_SEED } from "@/lib/case-study-seed-data";
import type { Program } from "@/generated/prisma/client";

const PROGRAMS: Program[] = ["HIGH_SCHOOL", "EBL"];

const PI_COUNT_BY_SLUG = new Map(
  CASE_STUDY_SEED.map((e) => [e.eventSlug, e.cases[0]?.performanceIndicators.length ?? 0]),
);

type CriterionSeed = { name: string; description: string; maxPoints: number };

// The fixed, non-PI section of DECA's real evaluation form — verified
// against AAM-26 District Event 1's Judge's Evaluation Form. Applied
// uniformly across formats since that's the one sample this was built
// from; the PI section above it is what scales per event.
const FIXED_CRITERIA: CriterionSeed[] = [
  { name: "Unique", description: "Demonstrate original thinking, fresh perspectives and an insightful approach.", maxPoints: 8 },
  { name: "Practical", description: "Develop an actionable/viable solution in a real-world context.", maxPoints: 8 },
  { name: "Effective", description: "Develop a solution that achieves relevant outcomes.", maxPoints: 8 },
  { name: "Critical Thinking", description: "Think critically to understand and solve problems.", maxPoints: 6 },
  { name: "Communication", description: "Communicate clearly, effectively and with reason.", maxPoints: 6 },
  { name: "Decision Making", description: "Consider the impacts of decisions.", maxPoints: 6 },
  { name: "Overall Impression", description: "Demonstrate overall career readiness through professionalism, poise and confidence.", maxPoints: 8 },
];

function piCriteria(count: number, label: "Performance Indicator" | "Standard"): CriterionSeed[] {
  return Array.from({ length: count }, (_, i) => ({
    name: `${label} ${i + 1}`,
    description:
      label === "Standard"
        ? `Judge the participant's grasp of Standard ${i + 1} listed on this case study.`
        : `Judge how well the participant addressed performance indicator ${i + 1} listed on this case study.`,
    maxPoints: 10,
  }));
}

async function seedForProgram(program: Program) {
  const uploader = await prisma.user.findFirst({
    where: { role: "MENTOR", isActive: true, program },
  });
  if (!uploader) {
    console.log(`${program}: no active mentor found, skipped entirely`);
    return;
  }

  const events = await prisma.event.findMany({
    where: { category: "ROLEPLAY", isActive: true },
    select: { id: true, slug: true, name: true, format: true },
  });

  console.log(`=== ${program} (creator: ${uploader.schoolId}) ===`);
  for (const event of events) {
    const piCount = PI_COUNT_BY_SLUG.get(event.slug);
    if (!piCount) {
      console.log(`${event.slug}: no case-study PI count found, skipped`);
      continue;
    }
    const label = event.format === "PERSONAL_FINANCIAL_LITERACY" ? "Standard" : "Performance Indicator";
    const criteria = [...piCriteria(piCount, label), ...FIXED_CRITERIA];
    const name = `${event.name} — Official Judge Rubric`;

    const existing = await prisma.rubric.findFirst({
      where: { creatorId: uploader.id, eventId: event.id, name },
    });

    const rubricId = existing
      ? existing.id
      : (
          await prisma.rubric.create({
            data: {
              name,
              description: `DECA-format judge evaluation rubric for ${event.name}, scaled to this event's ${piCount} performance indicator${piCount === 1 ? "" : "s"} per case study.`,
              creatorId: uploader.id,
              eventId: event.id,
            },
          })
        ).id;

    await prisma.$transaction([
      prisma.rubricCriterion.deleteMany({ where: { rubricId } }),
      prisma.rubricCriterion.createMany({
        data: criteria.map((c, i) => ({
          rubricId,
          name: c.name,
          description: c.description,
          maxPoints: c.maxPoints,
          orderIndex: i,
        })),
      }),
    ]);

    console.log(`${event.slug}: rubric ready (${criteria.length} criteria, ${criteria.reduce((s, c) => s + c.maxPoints, 0)} total points)`);
  }
}

async function main() {
  for (const program of PROGRAMS) {
    await seedForProgram(program);
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
