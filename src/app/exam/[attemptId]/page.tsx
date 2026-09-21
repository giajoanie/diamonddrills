import { notFound, redirect } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import { getAttemptForTaking } from "@/lib/dal/exam-engine";
import { isExpired } from "@/lib/exam-engine/timer";
import { finalizeAttempt } from "@/lib/exam-engine/attempt-lifecycle";
import { ExamRunner } from "./ExamRunner";

export const metadata = { title: "Exam in progress" };
export const dynamic = "force-dynamic";

export default async function ExamAttemptPage({
  params,
  searchParams,
}: {
  params: Promise<{ attemptId: string }>;
  searchParams: Promise<{ shortfall?: string }>;
}) {
  const user = await requireActiveUser("STUDENT");
  const { attemptId } = await params;
  const { shortfall } = await searchParams;

  const attempt = await getAttemptForTaking(attemptId);
  if (!attempt || attempt.userId !== user.id) notFound();

  if (attempt.status === "SUBMITTED" || attempt.status === "AUTO_SUBMITTED") {
    redirect(`/exam/${attemptId}/results`);
  }
  if (attempt.status === "ABANDONED") {
    redirect("/dashboard");
  }

  // Server-authoritative expiry check — catches a student who closed the
  // tab past the time limit and only comes back later (spec 6.4).
  if (isExpired(attempt.serverStartTime, attempt.timeLimitSeconds)) {
    await finalizeAttempt(attemptId, "AUTO_SUBMITTED");
    redirect(`/exam/${attemptId}/results`);
  }

  const questions = attempt.questions.map((q) => ({
    questionId: q.questionId,
    orderIndex: q.orderIndex,
    stem: q.question.stem,
    instructionalArea: q.question.instructionalArea?.name ?? null,
    options: {
      A: q.question.optionA,
      B: q.question.optionB,
      C: q.question.optionC,
      D: q.question.optionD,
    },
    optionOrder: q.optionOrder as ("A" | "B" | "C" | "D")[],
    studentAnswer: q.studentAnswer,
    isFlagged: q.isFlagged,
  }));

  return (
    <ExamRunner
      user={user}
      attemptId={attemptId}
      examName={attempt.examBank.name}
      serverStartTimeIso={attempt.serverStartTime.toISOString()}
      timeLimitSeconds={attempt.timeLimitSeconds}
      questions={questions}
      showShortfallNotice={shortfall === "1"}
    />
  );
}
