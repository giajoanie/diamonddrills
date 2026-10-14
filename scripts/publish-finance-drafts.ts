/**
 * One-off: publishes any Finance exam questions still sitting as drafts
 * (isActive: false) from before the "FM" instructional-area-code fix in
 * src/lib/exam-import/instructional-areas.ts. The importer only auto-
 * publishes a PDF's questions when its parse has zero anomalies — "FM"
 * (Financial-Information Management) wasn't in the recognized-code map, so
 * every finance PDF got flagged "needs-review" and its questions were
 * created as drafts, even though only ~6% of each file's questions
 * actually used that code. Re-running the importer alone won't fix
 * already-created rows (it skips them as duplicates by stem), so this
 * flips them live now that the only known anomaly is resolved.
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/publish-finance-drafts.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
  const examBank = await prisma.examBank.findUnique({ where: { slug: "finance" } });
  if (!examBank) {
    console.error("No finance exam bank found.");
    process.exitCode = 1;
    return;
  }

  const result = await prisma.question.updateMany({
    where: { examBankId: examBank.id, isActive: false },
    data: { isActive: true },
  });

  console.log(`finance: ${result.count} draft question(s) published.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
