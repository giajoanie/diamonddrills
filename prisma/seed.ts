/**
 * Rebuilds reference + seed data from scratch. Safe to re-run (upserts).
 * Clusters, events, exam banks, and mentor accounts are seeded in Phase 1 —
 * this is currently a stub so `prisma migrate dev` has a working seed hook.
 */
import { prisma } from "@/lib/prisma";

async function main() {
  console.log("Seed script placeholder — cluster/event/mentor seeding lands in Phase 1.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
