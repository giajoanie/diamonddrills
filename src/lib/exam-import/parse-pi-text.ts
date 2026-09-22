/**
 * Parser for MBA Research's "Performance Indicators" PDFs (Tier 1 Business
 * Administration Core, Tier 2 career cluster, Tier 3 pathway). These are a
 * different document shape than the exam PDFs (parse-exam-text.ts) — plain
 * prose lists, not question/answer-key pairs — so they get their own parser.
 *
 * Text layout per page (confirmed against the source PDFs):
 *   Instructional Area: Business Law (BL)
 *   Standard: <prose, may wrap onto the next line>
 *   Performance Element: <prose>.
 *   Performance Indicators:
 *   Comply with the spirit and intent of laws and regulations (BL:163) (CS)
 *   Discuss the nature of law and sources of law in the United States (BL:067) (SP)
 *
 * A description occasionally wraps across two physical lines before its
 * trailing "(CODE) (LEVEL)" — those get buffered and joined rather than
 * treating the second half-line as its own (truncated) indicator.
 */

export type PiPageRange = {
  startPage: number; // 1-indexed, inclusive
  endPage: number; // 1-indexed, inclusive
  tier: "Core" | "Cluster" | "Pathway";
  pathway: string | null;
};

export type ParsedPerformanceIndicator = {
  tier: string;
  pathway: string | null;
  instructionalArea: string;
  code: string;
  level: string;
  description: string;
};

const IA_HEADER_RE = /^Instructional Area:\s*(.+?)\s*\(([A-Z]{2,4})\)\s*$/;
const RESET_LABEL_RE = /^(Standard:|Performance Element:|Performance Indicators:)/;
const TRAILING_CODE_RE = /^(.*)\s\(([A-Z]{2,4}:\d+)\)\s\((PQ|CS|SP)\)$/;

// Every page opens with three boilerplate lines (section title + "Page N",
// the cluster/year line, and the copyright line) before any real content —
// confirmed across every sampled page in every source PDF. Skipping them
// unconditionally also prevents a description wrapping across a page
// boundary from picking up the next page's header as part of its text.
const PAGE_HEADER_LINES = 3;

function rangeFor(pageNum: number, ranges: PiPageRange[]): PiPageRange | null {
  return ranges.find((r) => pageNum >= r.startPage && pageNum <= r.endPage) ?? null;
}

export function parsePiPages(
  pages: string[],
  ranges: PiPageRange[],
): ParsedPerformanceIndicator[] {
  const results: ParsedPerformanceIndicator[] = [];
  let currentIA: string | null = null;
  let buffer: string[] = [];

  pages.forEach((pageText, idx) => {
    const pageNum = idx + 1;
    const range = rangeFor(pageNum, ranges);
    if (!range) return;

    const lines = pageText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(PAGE_HEADER_LINES);

    for (const line of lines) {
      const iaMatch = line.match(IA_HEADER_RE);
      if (iaMatch) {
        currentIA = iaMatch[1];
        buffer = [];
        continue;
      }

      if (RESET_LABEL_RE.test(line)) {
        buffer = [];
        continue;
      }

      buffer.push(line);
      const joined = buffer.join(" ");
      const trailingMatch = joined.match(TRAILING_CODE_RE);
      if (trailingMatch && currentIA) {
        const [, description, code, level] = trailingMatch;
        results.push({
          tier: range.tier,
          pathway: range.pathway,
          instructionalArea: currentIA,
          code,
          level,
          description: description.trim(),
        });
        buffer = [];
      }
    }
  });

  return results;
}
