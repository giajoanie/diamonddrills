import "server-only";
import { prisma } from "@/lib/prisma";
import { instructionalAreaNameForCode } from "@/lib/exam-import/instructional-areas";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Instructional areas are kept global (examBankId = null) rather than scoped
 * per exam bank, since the same code (e.g. "BL" = Business Law) names the
 * same area across every cluster's exam per research in DECISIONS.md.
 *
 * Postgres does not enforce uniqueness across NULL values in a composite
 * unique index, so this can't use `upsert` against the
 * `@@unique([examBankId, slug])` constraint — it does its own
 * find-then-create instead.
 */
export async function getOrCreateGlobalInstructionalArea(code: string) {
  const name = instructionalAreaNameForCode(code) ?? code;
  const slug = slugify(name);

  const existing = await prisma.instructionalArea.findFirst({
    where: { examBankId: null, slug },
  });
  if (existing) return existing;

  return prisma.instructionalArea.create({
    data: { examBankId: null, slug, name },
  });
}
