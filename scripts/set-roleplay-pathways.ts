/**
 * One-off run of the roleplayPathway backfill for a database that already
 * has events seeded (prisma/seed.ts's seedRoleplayPathways covers this on
 * any future fresh seed — this script exists for applying it to existing data).
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/set-roleplay-pathways.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { ROLEPLAY_PATHWAY_SEED } from "@/lib/seed-data";

async function main() {
  for (const { slug, pathway } of ROLEPLAY_PATHWAY_SEED) {
    const result = await prisma.event.updateMany({ where: { slug }, data: { roleplayPathway: pathway } });
    console.log(`${slug} -> ${pathway}: ${result.count} updated`);
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
