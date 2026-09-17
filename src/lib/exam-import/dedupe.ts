/** Normalizes a question stem for duplicate detection across exam years — the
 * same MBA Research item bank question is often reused verbatim in multiple
 * years' exams. */
export function normalizeStem(stem: string): string {
  return stem.trim().toLowerCase().replace(/\s+/g, " ");
}
