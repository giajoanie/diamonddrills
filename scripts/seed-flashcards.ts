/**
 * One-off load of key-terms flashcard decks, one per career cluster.
 * Idempotent by (clusterId, term) — safe to re-run after editing
 * src/lib/flashcard-seed-data.ts.
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/seed-flashcards.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { FLASHCARD_SEED } from "@/lib/flashcard-seed-data";

async function main() {
  for (const [clusterSlug, cards] of Object.entries(FLASHCARD_SEED)) {
    const cluster = await prisma.cluster.findUnique({ where: { slug: clusterSlug } });
    if (!cluster) {
      console.log(`${clusterSlug}: no matching cluster, skipped`);
      continue;
    }

    const existing = await prisma.flashcard.findMany({
      where: { clusterId: cluster.id },
      select: { term: true },
    });
    const existingTerms = new Set(existing.map((f) => f.term));
    const toCreate = cards.filter((c) => !existingTerms.has(c.term));

    if (toCreate.length > 0) {
      await prisma.flashcard.createMany({
        data: toCreate.map((c) => ({ clusterId: cluster.id, term: c.term, definition: c.definition })),
      });
    }
    console.log(`${clusterSlug}: ${toCreate.length} created, ${cards.length - toCreate.length} already present`);
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
