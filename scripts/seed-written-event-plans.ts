/**
 * Seeds the chapter-wide written-event checklist (required document
 * sections) and milestone timeline for the two written-event families with
 * a shared process across their sibling events:
 *
 *  - Operations Research (BOR/BMOR/SEOR/FOR/HTOR) — DECA's OR process:
 *    select business -> design research study -> conduct research ->
 *    analyze results -> develop strategic plan -> develop budget -> present.
 *  - Integrated Marketing Campaign (IMCE/IMCP/IMCS) — same written
 *    structure across all three, differing only in what's being marketed
 *    (event/product/service).
 *
 * Every event within a family gets an identical copy of that family's
 * checklist + milestones (the Milestone/WrittenEventChecklist models are
 * per-event, so "one shared chapter timeline" means replicating the same
 * rows across each sibling event, not a new shared-timeline concept).
 *
 * Idempotent: upserts the checklist and replaces (deletes + recreates)
 * milestones per event on every run.
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/seed-written-event-plans.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";

type MilestoneSeed = { name: string; dueAt: string };

const OR_EVENT_SLUGS = [
  "business-services-operations-research", // BOR
  "buying-and-merchandising-operations-research", // BMOR
  "sports-and-entertainment-marketing-operations-research", // SEOR
  "finance-operations-research", // FOR
  "hospitality-and-tourism-operations-research", // HTOR
];

const OR_REQUIRED_SECTIONS: string[] = [
  "I. Executive Summary (1-3 pages)",
  "II. Introduction",
  "II.A. Description of business/organization",
  "II.B. Target market (demographics, psychographics)",
  "II.C. Current state of business",
  "III. Research Methods Used in the Study",
  "III.A. Research methodologies + rationale",
  "III.B. Process used to conduct research",
  "IV. Findings and Conclusions",
  "IV.A. Research findings",
  "IV.B. Conclusions based on findings",
  "V. Proposed Strategic Plan",
  "V.A. Objectives + rationale",
  "V.B. Activities + timelines",
  "V.C. Metrics/KPIs",
  "VI. Proposed Budget",
  "VII. Bibliography",
  "VIII. Appendix",
];

// 2026 OR chapter timeline. DO NOT write the strategic plan before the
// research is analyzed — the event is Research -> Findings -> Conclusions
// -> Strategy, never Idea -> Find research that supports idea.
const OR_MILESTONES: MilestoneSeed[] = [
  { name: "Business + Problem Selection: business/organization selected, research question defined", dueAt: "2026-10-02T23:59:00" },
  { name: "Introduction: business profile, target market, current state", dueAt: "2026-10-06T23:59:00" },
  { name: "Research Design: surveys/interviews/secondary research finalized", dueAt: "2026-10-11T23:59:00" },
  { name: "Research Collection: research conducted, responses/interviews/data collected", dueAt: "2026-10-17T23:59:00" },
  { name: "Analysis: charts, patterns, findings, statistical/qualitative analysis", dueAt: "2026-10-20T23:59:00" },
  { name: "Conclusions: findings -> conclusions -> implications", dueAt: "2026-10-23T23:59:00" },
  { name: "Strategic Plan: objectives, strategies, implementation timeline, KPIs", dueAt: "2026-10-25T23:59:00" },
  { name: "Budget: cost projections completed", dueAt: "2026-10-25T23:59:00" },
  { name: "FULL DRAFT: Sections I-VIII complete", dueAt: "2026-10-25T23:59:00" },
  { name: "Rubric Revision: research -> strategy connection strengthened", dueAt: "2026-10-28T23:59:00" },
  { name: "Design + Evidence: charts, graphics, citations, appendix", dueAt: "2026-10-30T23:59:00" },
  { name: "Final Audit: page limit + penalty checklist + rubric", dueAt: "2026-10-31T23:59:00" },
  { name: "SUBMISSION: final PDF", dueAt: "2026-11-01T23:59:00" },
];

const IMC_EVENT_SLUGS = [
  "integrated-marketing-campaign-event", // IMCE
  "integrated-marketing-campaign-product", // IMCP
  "integrated-marketing-campaign-service", // IMCS
];

const IMC_REQUIRED_SECTIONS: string[] = [
  "I. Executive Summary (one-page campaign overview)",
  "II. Description of Event/Product/Service",
  "III. Campaign Objectives",
  "IV. Campaign Target Market",
  "V. Campaign Activities and Schedule (include creative samples)",
  "VI. Budget (detailed projected costs)",
  "VII. Key Metrics (KPIs measuring campaign success)",
  "VIII. Bibliography",
  "IX. Appendix",
];

// Objective -> Audience -> Message -> Tactic -> Schedule -> KPI. Every
// campaign activity should have a reason for existing.
const IMC_MILESTONES: MilestoneSeed[] = [
  { name: "Campaign Concept: event/product/service + business identified", dueAt: "2026-10-02T23:59:00" },
  { name: "Research + Target Market: market research + customer profile", dueAt: "2026-10-06T23:59:00" },
  { name: "Objectives: SMART campaign objectives + KPIs", dueAt: "2026-10-09T23:59:00" },
  { name: "Campaign Strategy: core message, channels, tactics", dueAt: "2026-10-15T23:59:00" },
  { name: "Creative Production: social posts, posters, email, video concepts, etc.", dueAt: "2026-10-20T23:59:00" },
  { name: "Campaign Schedule: 45-day campaign timeline + activities", dueAt: "2026-10-23T23:59:00" },
  { name: "Budget: actual projected costs", dueAt: "2026-10-24T23:59:00" },
  { name: "FULL DRAFT: Sections I-IX complete", dueAt: "2026-10-25T23:59:00" },
  { name: "Marketing Revision: ensure every tactic connects to an objective", dueAt: "2026-10-28T23:59:00" },
  { name: "Design + Citations: creative samples + professional formatting", dueAt: "2026-10-30T23:59:00" },
  { name: "Final Audit: rubric + penalty checklist", dueAt: "2026-10-31T23:59:00" },
  { name: "SUBMISSION: final PDF", dueAt: "2026-11-01T23:59:00" },
];

async function seedFamily(slugs: string[], requiredSections: string[], milestones: MilestoneSeed[], familyLabel: string) {
  for (const slug of slugs) {
    const event = await prisma.event.findUnique({ where: { slug } });
    if (!event) {
      console.log(`${slug}: no matching event, skipped`);
      continue;
    }

    await prisma.writtenEventChecklist.upsert({
      where: { eventId: event.id },
      create: { eventId: event.id, requiredSections },
      update: { requiredSections },
    });

    await prisma.$transaction([
      prisma.milestone.deleteMany({ where: { eventId: event.id } }),
      prisma.milestone.createMany({
        data: milestones.map((m, i) => ({
          eventId: event.id,
          name: m.name,
          dueAt: new Date(m.dueAt),
          orderIndex: i,
        })),
      }),
    ]);

    console.log(`${slug}: ${familyLabel} checklist (${requiredSections.length} sections) + ${milestones.length} milestones applied`);
  }
}

async function main() {
  await seedFamily(OR_EVENT_SLUGS, OR_REQUIRED_SECTIONS, OR_MILESTONES, "Operations Research");
  await seedFamily(IMC_EVENT_SLUGS, IMC_REQUIRED_SECTIONS, IMC_MILESTONES, "Integrated Marketing Campaign");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
