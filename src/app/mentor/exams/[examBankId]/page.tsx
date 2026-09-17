import Link from "next/link";
import { notFound } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import {
  getExamBank,
  getInstructionalAreas,
  getPendingImportBatches,
  getPendingQuestions,
  getPublishedQuestionCount,
} from "@/lib/dal/exams";
import { publishAllComplete } from "@/lib/actions/exam-import";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QuestionReviewCard } from "./QuestionReviewCard";

export const metadata = { title: "Review exam" };
export const dynamic = "force-dynamic";

export default async function ExamBankDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ examBankId: string }>;
  searchParams: Promise<{ sourceExam?: string }>;
}) {
  const user = await requireActiveUser("MENTOR");
  const { examBankId } = await params;
  const { sourceExam } = await searchParams;

  const examBank = await getExamBank(examBankId);
  if (!examBank) notFound();

  const [publishedCount, pendingBatches, instructionalAreas] = await Promise.all([
    getPublishedQuestionCount(examBankId),
    getPendingImportBatches(examBankId),
    getInstructionalAreas(),
  ]);

  const activeSourceExam = sourceExam ?? pendingBatches[0];
  const pendingQuestions = activeSourceExam
    ? await getPendingQuestions(examBankId, activeSourceExam)
    : [];

  return (
    <>
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">{examBank.name}</h1>
        <p className="mt-1 text-foreground-muted">{publishedCount} published questions</p>

        {pendingBatches.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {pendingBatches.map((batch) => (
              <Link
                key={batch}
                href={`/mentor/exams/${examBankId}?sourceExam=${encodeURIComponent(batch)}`}
                className={`rounded-md border px-3 py-1.5 text-sm ${
                  batch === activeSourceExam
                    ? "border-accent text-accent"
                    : "border-border text-foreground-muted hover:border-border-strong"
                }`}
              >
                {batch}
              </Link>
            ))}
          </div>
        )}

        {activeSourceExam && pendingQuestions.length > 0 && (
          <>
            <div className="mt-6 flex items-center justify-between">
              <h2 className="text-lg font-medium text-foreground">
                Reviewing: {activeSourceExam} ({pendingQuestions.length} pending)
              </h2>
              <form action={publishAllComplete}>
                <input type="hidden" name="examBankId" value={examBankId} />
                <input type="hidden" name="sourceExam" value={activeSourceExam} />
                <Button type="submit">Publish all complete</Button>
              </form>
            </div>

            <div className="mt-4 space-y-4">
              {pendingQuestions.map((q) => (
                <QuestionReviewCard key={q.id} question={q} instructionalAreas={instructionalAreas} />
              ))}
            </div>
          </>
        )}

        {pendingBatches.length === 0 && (
          <Card className="mt-6">
            <p className="text-foreground-muted">
              No pending imports for this bank. Upload an exam from the{" "}
              <Link href="/mentor/exams" className="text-accent hover:underline">
                exam banks page
              </Link>
              .
            </p>
          </Card>
        )}
      </main>
    </>
  );
}
