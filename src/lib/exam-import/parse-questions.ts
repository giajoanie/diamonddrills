export type ParsedQuestionDraft = {
  numberInSource: number;
  stem: string;
  optionA: string | null;
  optionB: string | null;
  optionC: string | null;
  optionD: string | null;
};

/**
 * Matches an option line, which DECA exam PDFs render either as one option
 * per line ("A. Selective") or, when both options are short, two per line
 * in a two-column layout ("A. Selective    C. Exclusive") — with the column
 * gap rendered as tabs, multiple spaces, or (inconsistently, across PDF
 * export tools/years) a single space. The lazy capture group grows only
 * until the optional second-marker group can match, so it naturally finds
 * the two-column split when present and falls back to a single option
 * otherwise.
 */
function parseOptionLine(
  line: string,
  firstLetter: "A" | "B",
  secondLetter: "C" | "D",
): { first: string; second?: string } | null {
  const re = new RegExp(
    `^${firstLetter}\\.[\\t ]*(.*?)(?:[\\t ]+${secondLetter}\\.[\\t ]*(.*))?$`,
  );
  const m = line.match(re);
  if (!m) return null;
  return { first: m[1].trim(), second: m[2] !== undefined ? m[2].trim() : undefined };
}

/**
 * Parses the question-body section of an exam (already cleaned + sliced to
 * exclude the answer key) into draft questions. Best-effort: DECA exam PDF
 * layouts vary across years, so this is designed to be checked and fixed on
 * a mentor review screen afterward, not to be perfect.
 */
export function parseExamQuestions(bodyLines: string[]): {
  questions: ParsedQuestionDraft[];
  anomalies: string[];
} {
  const questions: ParsedQuestionDraft[] = [];
  const anomalies: string[] = [];
  let current: ParsedQuestionDraft | null = null;

  const pushCurrent = () => {
    if (!current) return;
    if (!current.optionA || !current.optionB || !current.optionC || !current.optionD) {
      anomalies.push(
        `Question ${current.numberInSource}: missing option(s) (A:${!!current.optionA} B:${!!current.optionB} C:${!!current.optionC} D:${!!current.optionD})`,
      );
    }
    questions.push(current);
  };

  for (const line of bodyLines) {
    const questionMatch = line.match(/^(\d{1,3})\.\s+(.*)$/);
    const acMatch = questionMatch ? null : parseOptionLine(line, "A", "C");
    const bdMatch = questionMatch || acMatch ? null : parseOptionLine(line, "B", "D");
    const cOnlyMatch =
      questionMatch || acMatch || bdMatch ? null : line.match(/^C\.\s*(.*)$/);
    const dOnlyMatch =
      questionMatch || acMatch || bdMatch || cOnlyMatch ? null : line.match(/^D\.\s*(.*)$/);

    if (questionMatch) {
      // Only treat "N. ..." as a new question if we're not mid-question —
      // i.e. there's no current question, or the current one already has
      // its first option, so this can't be a stem continuation line that
      // coincidentally starts with a number and a period.
      const looksLikeNewQuestion = !current || current.optionA !== null;
      if (looksLikeNewQuestion) {
        pushCurrent();
        current = {
          numberInSource: parseInt(questionMatch[1], 10),
          stem: questionMatch[2],
          optionA: null,
          optionB: null,
          optionC: null,
          optionD: null,
        };
        continue;
      }
    }

    if (acMatch && current) {
      current.optionA = acMatch.first;
      if (acMatch.second !== undefined) current.optionC = acMatch.second;
      continue;
    }
    if (bdMatch && current) {
      current.optionB = bdMatch.first;
      if (bdMatch.second !== undefined) current.optionD = bdMatch.second;
      continue;
    }
    if (cOnlyMatch && current) {
      current.optionC = cOnlyMatch[1].trim();
      continue;
    }
    if (dOnlyMatch && current) {
      current.optionD = dOnlyMatch[1].trim();
      continue;
    }

    // Continuation of a wrapped line: append to whichever field is open.
    if (current) {
      if (current.optionD !== null) current.optionD += ` ${line}`;
      else if (current.optionC !== null) current.optionC += ` ${line}`;
      else if (current.optionB !== null) current.optionB += ` ${line}`;
      else if (current.optionA !== null) current.optionA += ` ${line}`;
      else current.stem += ` ${line}`;
    }
  }
  pushCurrent();

  return { questions, anomalies };
}
