import { cleanExamLines, findAnswerKeyStartIndex } from "./clean-lines";
import { parseExamQuestions } from "./parse-questions";
import { parseAnswerKey } from "./parse-answer-key";
import { instructionalAreaNameForCode } from "./instructional-areas";

export type MergedQuestionDraft = {
  numberInSource: number;
  stem: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: "A" | "B" | "C" | "D" | null;
  instructionalAreaCode: string | null;
  explanation: string | null;
};

export type ParseExamTextResult = {
  questions: MergedQuestionDraft[];
  anomalies: string[];
  stats: {
    questionsFound: number;
    keyEntriesFound: number;
    matched: number;
    missingKey: number;
    unknownInstructionalAreaCodes: string[];
  };
};

/** Parses a full exam document's raw extracted text end to end. */
export function parseExamText(rawText: string): ParseExamTextResult {
  const lines = cleanExamLines(rawText);
  const keyStart = findAnswerKeyStartIndex(lines);

  if (keyStart === -1) {
    return {
      questions: [],
      anomalies: [
        "No answer key section found — this PDF may be a scanned/image-only document with no extractable text layer, or uses an unrecognized layout. Skipped; needs manual entry.",
      ],
      stats: {
        questionsFound: 0,
        keyEntriesFound: 0,
        matched: 0,
        missingKey: 0,
        unknownInstructionalAreaCodes: [],
      },
    };
  }

  const bodyLines = lines.slice(0, keyStart);
  const keyLines = lines.slice(keyStart);

  const { questions: draftQuestions, anomalies: questionAnomalies } =
    parseExamQuestions(bodyLines);
  const keyEntries = parseAnswerKey(keyLines);

  const anomalies = [...questionAnomalies];
  const unknownCodes = new Set<string>();
  let matched = 0;
  let missingKey = 0;

  const questions: MergedQuestionDraft[] = draftQuestions.map((q) => {
    const key = keyEntries.get(q.numberInSource);
    if (key) {
      matched++;
      if (key.instructionalAreaCode && !instructionalAreaNameForCode(key.instructionalAreaCode)) {
        unknownCodes.add(key.instructionalAreaCode);
      }
    } else {
      missingKey++;
      anomalies.push(`Question ${q.numberInSource}: no matching answer key entry found.`);
    }

    return {
      numberInSource: q.numberInSource,
      stem: q.stem.trim(),
      optionA: q.optionA ?? "",
      optionB: q.optionB ?? "",
      optionC: q.optionC ?? "",
      optionD: q.optionD ?? "",
      correctOption: key?.correctOption ?? null,
      instructionalAreaCode: key?.instructionalAreaCode ?? null,
      explanation: key?.explanation.trim() ?? null,
    };
  });

  for (const keyNumber of keyEntries.keys()) {
    if (!draftQuestions.some((q) => q.numberInSource === keyNumber)) {
      anomalies.push(`Answer key entry ${keyNumber}: no matching question found in the exam body.`);
    }
  }

  if (unknownCodes.size > 0) {
    anomalies.push(
      `Unrecognized instructional area code(s), stored as-is: ${[...unknownCodes].join(", ")}`,
    );
  }

  return {
    questions,
    anomalies,
    stats: {
      questionsFound: draftQuestions.length,
      keyEntriesFound: keyEntries.size,
      matched,
      missingKey,
      unknownInstructionalAreaCodes: [...unknownCodes],
    },
  };
}
