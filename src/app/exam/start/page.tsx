import { requireActiveUser } from "@/lib/auth/guards";
import {
  getStudentExamBanks,
  getInstructionalAreasForBank,
  getExistingBaselineAttempt,
  getDueMissedQuestionCount,
} from "@/lib/dal/exam-engine";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { StartExamForm } from "./StartExamForm";

export const metadata = { title: "Start an exam" };
export const dynamic = "force-dynamic";

export default async function StartExamPage({
  searchParams,
}: {
  searchParams: Promise<{ examBankId?: string; area?: string; mode?: string }>;
}) {
  const user = await requireActiveUser("STUDENT");
  const { examBankId, area, mode } = await searchParams;
  const examBanks = await getStudentExamBanks(user.id);

  if (examBanks.length === 0) {
    return (
      <>
        <AppHeader user={user} homeHref="/dashboard" />
        <main className="mx-auto max-w-2xl flex-1 px-4 py-8 sm:px-6">
          <Card>
            <p className="text-foreground-muted">
              None of your current events have an exam component, so there&apos;s nothing to
              practice here yet.
            </p>
          </Card>
        </main>
      </>
    );
  }

  const [areas, baselineStatuses, missedCount] = await Promise.all([
    getInstructionalAreasForBank(),
    Promise.all(
      examBanks.map(async (bank) => ({
        examBankId: bank.id,
        hasBaseline: !!(await getExistingBaselineAttempt(user.id, bank.id)),
      })),
    ),
    getDueMissedQuestionCount(user.id),
  ]);

  const validMode = ["BASELINE", "TIMED", "PRACTICE_AREA", "MISSED_REVIEW"].includes(mode ?? "")
    ? (mode as "BASELINE" | "TIMED" | "PRACTICE_AREA" | "MISSED_REVIEW")
    : undefined;

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Start an exam</h1>
        <Card className="mt-6">
          <StartExamForm
            examBanks={examBanks}
            instructionalAreas={areas}
            baselineStatuses={baselineStatuses}
            missedCount={missedCount}
            defaultExamBankId={examBankId}
            defaultMode={validMode ?? (area ? "PRACTICE_AREA" : undefined)}
            defaultAreaId={area}
          />
        </Card>
      </main>
    </>
  );
}
