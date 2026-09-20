import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/guards";
import { toCsv, buildAnonymousIdMap } from "@/lib/csv/export";
import {
  getStudentsExportRows,
  getExamAttemptsExportRows,
  getQuestionResponsesExportRows,
  getInstructionalAreaResultsExportRows,
  getRubricScoresExportRows,
  getActivityLogsExportRows,
  getCompetitionResultsExportRows,
} from "@/lib/dal/exports";

const EXPORTS = {
  students: { columns: ["id", "schoolId", "firstName", "grade", "isActive", "createdAt"], fetch: getStudentsExportRows },
  "exam-attempts": {
    columns: ["attemptId", "studentId", "schoolId", "examBank", "mode", "isBaseline", "score", "percentage", "submittedAt", "timeUsedSeconds"],
    fetch: getExamAttemptsExportRows,
  },
  "question-responses": {
    columns: ["attemptId", "studentId", "schoolId", "questionId", "instructionalArea", "studentAnswer", "isCorrect", "answeredAt"],
    fetch: getQuestionResponsesExportRows,
  },
  "instructional-area-results": {
    columns: ["studentId", "schoolId", "instructionalArea", "correct", "total", "accuracy"],
    fetch: getInstructionalAreaResultsExportRows,
  },
  "rubric-scores": {
    columns: ["studentId", "schoolId", "assignment", "criterion", "score", "maxPoints", "scoredBy", "scoredAt"],
    fetch: getRubricScoresExportRows,
  },
  "activity-logs": {
    columns: ["studentId", "schoolId", "type", "metadata", "createdAt"],
    fetch: getActivityLogsExportRows,
  },
  "competition-results": {
    columns: ["studentId", "schoolId", "event", "year", "level", "placement", "testScore", "roleplayScore", "presentationScore", "advanced", "notes"],
    fetch: getCompetitionResultsExportRows,
  },
} as const;

type ExportType = keyof typeof EXPORTS;

function isExportType(value: string): value is ExportType {
  return value in EXPORTS;
}

export async function GET(request: Request, { params }: { params: Promise<{ type: string }> }) {
  await requireRole("MENTOR");

  const { type } = await params;
  if (!isExportType(type)) {
    return NextResponse.json({ error: "Unknown export type" }, { status: 404 });
  }

  const url = new URL(request.url);
  const dateFromRaw = url.searchParams.get("dateFrom");
  const dateToRaw = url.searchParams.get("dateTo");
  const anonymize = url.searchParams.get("anonymize") === "1";

  const dateFrom = dateFromRaw ? new Date(dateFromRaw) : new Date(0);
  const dateTo = dateToRaw ? new Date(dateToRaw) : new Date();

  const config = EXPORTS[type];
  const rows =
    type === "students"
      ? await getStudentsExportRows()
      : await config.fetch({ dateFrom, dateTo });

  let finalRows: Record<string, string | number | null | undefined>[] = rows;
  let columns: readonly string[] = config.columns;

  if (anonymize) {
    const studentIds = rows.map((r) => ("studentId" in r ? r.studentId : "id" in r ? r.id : null)).filter((id): id is string => !!id);
    const idMap = buildAnonymousIdMap(studentIds, "STU");

    finalRows = rows.map((r) => {
      const copy: Record<string, string | number | null | undefined> = { ...r };
      const key = "studentId" in copy ? "studentId" : "id" in copy ? "id" : null;
      if (key && typeof copy[key] === "string") {
        copy[key] = idMap.get(copy[key] as string) ?? copy[key];
      }
      delete copy.schoolId;
      delete copy.firstName;
      return copy;
    });
    columns = columns.filter((c) => c !== "schoolId" && c !== "firstName");
  }

  const csv = toCsv([...columns], finalRows);
  const filename = `${type}-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
