/**
 * Strips page markers, copyright boilerplate, and repeated running
 * headers/footers from raw PDF-extracted text, returning one trimmed,
 * non-empty string per remaining line. Pure function — no PDF/Prisma
 * dependency — so it's directly unit-testable against fixture text.
 */
export function cleanExamLines(rawText: string): string[] {
  const lines = rawText.split(/\r?\n/);
  const cleaned: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === "") continue;
    if (/^--\s*\d+\s*of\s*\d+\s*--$/i.test(line)) continue; // "-- 12 of 34 --"
    if (/^copyright\s*©/i.test(line)) continue;
    // Running header/footer, e.g. "2026 HS ICDC MARKETING CLUSTER EXAM 2",
    // "2012 HS ICDC MARKETING CLUSTER EXAM—KEY 11", "ST-MKTG-10A MARKETING
    // CLUSTER EXAM – KEY 10", "SAMPLE MARKETING CLUSTER EXAM—KEY". Kept
    // short-length-gated so a legitimately long question stem that happens
    // to start with a year-like number is never mistaken for a header.
    if (/^(\d{4}|ST-|SAMPLE)\S*.*\bEXAM\b/i.test(line) && line.length < 90) continue;
    cleaned.push(line);
  }

  return cleaned;
}

/**
 * The first line that is EXACTLY "<number>. <single letter A-D>" and
 * nothing else unambiguously marks the start of the answer-key section —
 * a real question stem is never that short. This is more robust than
 * matching header text: a real 2013 DECA exam PDF had a typo'd first-key-page
 * header that still said "EXAM" without "KEY", but its content structure
 * (bare "1. C") was unaffected.
 */
export function findAnswerKeyStartIndex(lines: string[]): number {
  return lines.findIndex((line) => /^1\.\s*[A-D]\s*$/.test(line));
}
