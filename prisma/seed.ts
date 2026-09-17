/**
 * Rebuilds reference + seed data from scratch. Safe to re-run (upserts).
 */
import "dotenv/config"; // running via `tsx` directly does not auto-load .env like the Prisma CLI does
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { CLUSTER_SEED, EXAM_BANK_SEED, EVENT_SEED } from "@/lib/seed-data";

async function seedClusters() {
  for (const cluster of CLUSTER_SEED) {
    await prisma.cluster.upsert({
      where: { slug: cluster.slug },
      update: { name: cluster.name },
      create: { slug: cluster.slug, name: cluster.name },
    });
  }
  console.log(`Seeded ${CLUSTER_SEED.length} clusters.`);
}

async function seedExamBanks() {
  for (const bank of EXAM_BANK_SEED) {
    const cluster = bank.clusterSlug
      ? await prisma.cluster.findUniqueOrThrow({
          where: { slug: bank.clusterSlug },
        })
      : null;

    await prisma.examBank.upsert({
      where: { slug: bank.slug },
      update: { name: bank.name, clusterId: cluster?.id ?? null },
      create: { slug: bank.slug, name: bank.name, clusterId: cluster?.id ?? null },
    });
  }
  console.log(`Seeded ${EXAM_BANK_SEED.length} exam banks.`);
}

async function seedEvents() {
  for (const event of EVENT_SEED) {
    const cluster = await prisma.cluster.findUniqueOrThrow({
      where: { slug: event.clusterSlug },
    });
    const examBank = event.examBankSlug
      ? await prisma.examBank.findUniqueOrThrow({
          where: { slug: event.examBankSlug },
        })
      : null;

    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {
        name: event.name,
        clusterId: cluster.id,
        category: event.category,
        format: event.format,
        hasExam: event.hasExam,
        examBankId: examBank?.id ?? null,
        teamSizeMin: event.teamSizeMin,
        teamSizeMax: event.teamSizeMax,
      },
      create: {
        slug: event.slug,
        name: event.name,
        clusterId: cluster.id,
        category: event.category,
        format: event.format,
        hasExam: event.hasExam,
        examBankId: examBank?.id ?? null,
        teamSizeMin: event.teamSizeMin,
        teamSizeMax: event.teamSizeMax,
      },
    });
  }
  console.log(`Seeded ${EVENT_SEED.length} events.`);
}

async function seedMentors() {
  const seedPassword = process.env.SEED_MENTOR_PASSWORD;
  if (!seedPassword) {
    throw new Error(
      "SEED_MENTOR_PASSWORD is not set. Set it in .env before seeding — see .env.example.",
    );
  }
  const passwordHash = await hashPassword(seedPassword);

  for (const schoolId of ["1071632", "1078913"]) {
    await prisma.user.upsert({
      where: { schoolId },
      update: {},
      create: {
        schoolId,
        role: "MENTOR",
        firstName: "Advisor",
        passwordHash,
        mustChangePassword: true,
      },
    });
  }
  console.log("Seeded 2 mentor accounts (password change forced on first login).");
}

async function main() {
  await seedClusters();
  await seedExamBanks();
  await seedEvents();
  await seedMentors();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
