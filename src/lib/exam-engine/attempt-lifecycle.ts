/**
 * Exam attempt creation/finalization, shared by several Server Actions in
 * src/lib/actions/exam-engine.ts and submissions.ts.
 *
 * Deliberately NOT in a "use server" file: every export of a file with that
 * directive becomes its own directly network-callable Server Action, with
 * no guarantee the caller went through any UI or auth check first. These
 * two functions trust their arguments completely (they create/finalize an
 * attempt for whichever userId/attemptId they're given), so they must only
 * ever be reached through an already-authenticated, ownership-checked
 * caller — never exposed as a callable endpoint of their own. See
 * DECISIONS.md, Phase 7 security review.
 */
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { shuffleOptionOrder } from "@/lib/exam-engine/shuffle";
import { computeScore } from "@/lib/exam-engine/scoring";
import { computeTimeUsedSeconds } from "@/lib/exam-engine/timer";
import { computeNextDueAt, MASTERY_STREAK } from "@/lib/exam-engine/spaced-repetition";
import { predictMastery } from "@/lib/analytics/mastery";
import type { ExamMode } from "@/generated/prisma/client";

export async function startAttemptWithQuestionIds(
  userId: string,
  examBankId: string,
  mode: ExamMode,
  isBaseline: boolean,
  timeLimitSeconds: number,
  questionIds: string[],
  shortfall = false,
  assignmentId?: string,
  eventId?: string,
): Promise<never> {
  const attempt = await prisma.$transaction(async (tx) => {
    const created = await tx.examAttempt.create({
      data: {
        userId,
        examBankId,
        mode,
        isBaseline,
        timeLimitSeconds,
        questionCount: questionIds.length,
        status: "IN_PROGRESS",
        assignmentId,
        eventId,
      },
    });

    await tx.examAttemptQuestion.createMany({
      data: questionIds.map((id, index) => ({
        examAttemptId: created.id,
        questionId: id,
        orderIndex: index,
        optionOrder: shuffleOptionOrder(),
      })),
    });

    return created;
  });

  await prisma.activityLog.create({
    data: { userId, type: "EXAM_START", metadata: { attemptId: attempt.id, mode } },
  });

  redirect(`/exam/${attempt.id}${shortfall ? "?shortfall=1" : ""}`);
}

/** Shared by manual submission and the page-load auto-submit-on-expiry check. */
export async function finalizeAttempt(
  attemptId: string,
  finalStatus: "SUBMITTED" | "AUTO_SUBMITTED",
): Promise<void> {
  const attempt = await prisma.examAttempt.findUniqueOrThrow({
    where: { id: attemptId },
    include: { questions: { include: { question: true } } },
  });
  if (attempt.status !== "IN_PROGRESS") return;

  const now = new Date();
  const timeUsedSeconds = computeTimeUsedSeconds(attempt.serverStartTime, attempt.timeLimitSeconds, now);

  await prisma.$transaction(async (tx) => {
    for (const q of attempt.questions) {
      const isCorrect =
        q.studentAnswer !== null && q.question.correctOption !== null
          ? q.studentAnswer === q.question.correctOption
          : false;
      await tx.examAttemptQuestion.update({
        where: { id: q.id },
        data: { isCorrect },
      });

      if (!isCorrect) {
        await tx.missedQuestion.upsert({
          where: { userId_questionId: { userId: attempt.userId, questionId: q.questionId } },
          create: {
            userId: attempt.userId,
            questionId: q.questionId,
            examBankId: attempt.examBankId,
            instructionalAreaId: q.question.instructionalAreaId,
            timesMissed: 1,
            correctStreak: 0,
            nextDueAt: computeNextDueAt(0, now),
          },
          update: {
            timesMissed: { increment: 1 },
            correctStreak: 0,
            isMastered: false,
            lastSeenAt: now,
            nextDueAt: computeNextDueAt(0, now),
          },
        });
      } else {
        const missed = await tx.missedQuestion.findUnique({
          where: { userId_questionId: { userId: attempt.userId, questionId: q.questionId } },
        });
        if (missed) {
          const correctStreak = missed.correctStreak + 1;
          await tx.missedQuestion.update({
            where: { id: missed.id },
            data: {
              correctStreak,
              isMastered: correctStreak >= MASTERY_STREAK,
              lastSeenAt: now,
              nextDueAt: computeNextDueAt(correctStreak, now),
            },
          });
        }
      }
    }

    const { score, percentage } = computeScore(
      attempt.questions.map((q) => ({
        correctOption: q.question.correctOption,
        studentAnswer: q.studentAnswer,
      })),
    );

    await tx.examAttempt.update({
      where: { id: attemptId },
      data: { status: finalStatus, submittedAt: now, score, percentage, timeUsedSeconds },
    });
  });

  await prisma.activityLog.create({
    data: { userId: attempt.userId, type: "EXAM_COMPLETE", metadata: { attemptId, status: finalStatus } },
  });

  await updateMasteryEstimates(
    attempt.userId,
    attempt.examBankId,
    [...new Set(attempt.questions.map((q) => q.question.instructionalAreaId).filter((id): id is string => !!id))],
  );
}

/**
 * Recomputes the advanced mastery prediction (src/lib/analytics/mastery.ts)
 * for each instructional area touched by a just-finalized attempt, using
 * that student's full chronological history in this exam bank — not just
 * this attempt — then caches it in MasteryEstimate (anticipated by the
 * Phase 0 schema, unused until now) so mentor/student views can read a
 * precomputed estimate instead of recomputing it on every page load.
 */
async function updateMasteryEstimates(userId: string, examBankId: string, areaIds: string[]): Promise<void> {
  for (const instructionalAreaId of areaIds) {
    const results = await prisma.examAttemptQuestion.findMany({
      where: {
        question: { instructionalAreaId },
        examAttempt: { userId, examBankId, status: { in: ["SUBMITTED", "AUTO_SUBMITTED"] } },
      },
      select: { isCorrect: true, examAttempt: { select: { submittedAt: true } } },
      orderBy: { examAttempt: { submittedAt: "asc" } },
    });

    const { estimatedMastery } = predictMastery(results.map((r) => r.isCorrect ?? false));

    await prisma.masteryEstimate.upsert({
      where: { userId_instructionalAreaId: { userId, instructionalAreaId } },
      create: { userId, examBankId, instructionalAreaId, estimatedMastery },
      update: { estimatedMastery },
    });
  }
}
