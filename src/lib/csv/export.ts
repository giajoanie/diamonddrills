/**
 * Minimal CSV serialization, kept dependency-free and pure so it's
 * unit-testable. Escapes per RFC 4180: any field containing a comma,
 * double quote, or newline is wrapped in quotes, with quotes doubled.
 */
function escapeCsvField(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function toCsv(
  columns: string[],
  rows: Record<string, string | number | null | undefined>[],
): string {
  const header = columns.map(escapeCsvField).join(",");
  const lines = rows.map((row) => columns.map((col) => escapeCsvField(row[col])).join(","));
  return [header, ...lines].join("\r\n");
}

/** Maps real IDs to sequential anonymous labels (e.g. "STU-0001"), stable within one export. */
export function buildAnonymousIdMap(ids: string[], prefix: string): Map<string, string> {
  const unique = [...new Set(ids)];
  return new Map(unique.map((id, index) => [id, `${prefix}-${String(index + 1).padStart(4, "0")}`]));
}
