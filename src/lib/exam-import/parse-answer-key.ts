export type ParsedKeyEntry = {
  numberInSource: number;
  correctOption: "A" | "B" | "C" | "D";
  instructionalAreaCode: string | null;
  explanation: string;
};

/**
 * Parses the answer-key section of an exam (already cleaned + sliced to
 * start at the first bare "N. <letter>" line). Each entry looks like:
 *
 *   96. C
 *   Explanation paragraph(s)...
 *   SOURCE: CM:006 Describe ethical considerations in channel management
 *   SOURCE: LAP-CM-006—The Right Path (Ethics in Channel Management)
 *
 * Older exams sometimes put the code on its own SOURCE line with no
 * inline description, and separate "SOURCE:" from the code with a tab
 * instead of a space — both are handled here.
 */
export function parseAnswerKey(keyLines: string[]): Map<number, ParsedKeyEntry> {
  const entries = new Map<number, ParsedKeyEntry>();
  let current: ParsedKeyEntry | null = null;

  const pushCurrent = () => {
    if (current) entries.set(current.numberInSource, current);
  };

  for (const line of keyLines) {
    const startMatch = line.match(/^(\d{1,3})\.\s*([A-D])\s*$/);
    if (startMatch) {
      pushCurrent();
      current = {
        numberInSource: parseInt(startMatch[1], 10),
        correctOption: startMatch[2] as "A" | "B" | "C" | "D",
        instructionalAreaCode: null,
        explanation: "",
      };
      continue;
    }

    const sourceMatch = line.match(/^SOURCE:[\t ]*([A-Z]{2,5}):(\d+)\s*(.*)$/);
    if (sourceMatch && current && !current.instructionalAreaCode) {
      current.instructionalAreaCode = sourceMatch[1];
      continue;
    }
    if (/^SOURCE:/.test(line)) continue; // secondary SOURCE line (LAP title) — not needed

    if (current) {
      current.explanation += (current.explanation ? " " : "") + line;
    }
  }
  pushCurrent();

  return entries;
}
