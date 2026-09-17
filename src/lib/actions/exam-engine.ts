"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import { pickRandomSubset, shuffleOptionOrder } from "@/lib/exam-engine/shuffle";
import { computeScore } from "@/lib/exam-engine/scoring";
import { computeTimeUsedSeconds, isExpired } from "@/lib/exam-engine/timer";
import { TIMED_EXAM_PRESETS, BASELINE_PRESET } from "@/lib/exam-engine/presets";
import type { ExamMode, OptionKey } from "@/generated/prisma/client";

export type StartExamState = { error?: string } | undefined;

export async function startExam(
  _prevState: StartExamState,
  formData: FormData,
): Promise<StartExamState> {
  const user = await requireRole("STUDENT");

  const examBankId = formData.get("examBankId");
  const examModeInput = formData.get("examModeInput"); // "BASELINE" | "TIMED" | "PRACTICE_AREA"
  if (typeof examBankId !== "string" || !examBankId) return { error: "Choose an exam bank." };
  if (typeof examModeInput !== "string") return { error: "Choose a mode." };

  const examBank = await prisma.examBank.findUnique({ where: { id: examBankId } });
  if (!examBank) return { error: "That exam bank doesn't exist." };

  let timeLimitSeconds: number;
  let requestedCount: number;
  let mode: ExamMode;
  let isBaseline = false;
  let instructionalAreaIds: string[] = [];

  if (examModeInput === "BASELINE") {
    const existing = await prisma.examAttempt.findFirst({
      where: { userId: user.id, examBankId, isBaseline: true },
    });
    if (existing) {
      return { error: "You've already taken your Baseline Diagnostic for this bank. Ask a mentor to reset it if needed." };
    }
    timeLimitSeconds = BASELINE_PRESET.minutes * 60;
    requestedCount = BASELINE_PRESET.questions;
    mode = "BASELINE";
    isBaseline = true;
  } else if (examModeInput === "TIMED") {
    const presetMinutes = parseInt(formData.get("presetMinutes")?.toString() ?? "", 10);
    const preset = TIMED_EXAM_PRESETS[presetMinutes];
    if (!preset) return { error: "Choose a valid time limit." };
    timeLimitSeconds = preset.minutes * 60;
    requestedCount = preset.questions;
    mode = presetMinutes === 90 ? "TIMED_FULL" : "TIMED_PARTIAL";
  } else if (examModeInput === "PRACTICE_AREA") {
    instructionalAreaIds = formData.getAll("instructionalAreaIds").map(String).filter(Boolean);
    if (instructionalAreaIds.length === 0) return { error: "Choose at least one instructional area." };
    requestedCount = parseInt(formData.get("questionCount")?.toString() ?? "20", 10);
    if (!Number.isFinite(requestedCount) || requestedCount < 1) requestedCount = 20;
    const timedOption = formData.get("timed") === "on";
    const practiceMinutes = parseInt(formData.get("practiceMinutes")?.toString() ?? "", 10);
    timeLimitSeconds = timedOption && Number.isFinite(practiceMinutes) && practiceMinutes > 0
      ? practiceMinutes * 60
      : 3 * 60 * 60; // effectively untimed practice, capped generously as a backstop
    mode = "PRACTICE_BY_AREA";
  } else if (examModeInput === "MISSED_REVIEW") {
    const missed = await prisma.missedQuestion.findMany({
      where: { userId: user.id, examBankId, isMastered: false },
      select: { questionId: true },
    });
    if (missed.length === 0) return { error: "No missed questions to review for this bank yet." };

    const selected = pickRandomSubset(missed.map((m) => m.questionId), missed.length);
    return startAttemptWithQuestionIds(
      user.id,
      examBankId,
      "MISSED_QUESTION_REVIEW",
      false,
      3 * 60 * 60, // untimed, generous backstop
      selected,
    );
  } else {
    return { error: "Choose a mode." };
  }

  const pool = await prisma.question.findMany({
    where: {
      examBankId,
      isActive: true,
      ...(instructionalAreaIds.length > 0 ? { instructionalAreaId: { in: instructionalAreaIds } } : {}),
    },
    select: { id: true },
  });
  if (pool.length === 0) return { error: "No questions are available for this configuration yet." };

  const selected = pickRandomSubset(pool, requestedCount);
  const shortfall = selected.length < requestedCount;

  return startAttemptWithQuestionIds(
    user.id,
    examBankId,
    mode,
    isBaseline,
    timeLimitSeconds,
    selected.map((q) => q.id),
    shortfall,
  );
}

async function startAttemptWithQuestionIds(
  userId: string,
  examBankId: string,
  mode: ExamMode,
  isBaseline: boolean,
  timeLimitSeconds: number,
  questionIds: string[],
  shortfall = false,
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

async function verifyOwnership(attemptId: string, userId: string) {
  const attempt = await prisma.examAttempt.findUnique({ where: { id: attemptId } });
  if (!attempt || attempt.userId !== userId) return null;
  return attempt;
}

export async function saveAnswer(
  attemptId: string,
  questionId: string,
  answer: OptionKey | null,
): Promise<{ ok: boolean }> {
  const user = await requireRole("STUDENT");
  const attempt = await verifyOwnership(attemptId, user.id);
  if (!attempt || attempt.status !== "IN_PROGRESS") return { ok: false };

  await prisma.examAttemptQuestion.update({
    where: { examAttemptId_questionId: { examAttemptId: attemptId, questionId } },
    data: { studentAnswer: answer, answeredAt: answer ? new Date() : null },
  });
  return { ok: true };
}

export async function toggleFlag(
  attemptId: string,
  questionId: string,
  isFlagged: boolean,
): Promise<{ ok: boolean }> {
  const user = await requireRole("STUDENT");
  const attempt = await verifyOwnership(attemptId, user.id);
  if (!attempt || attempt.status !== "IN_PROGRESS") return { ok: false };

  await prisma.examAttemptQuestion.update({
    where: { examAttemptId_questionId: { examAttemptId: attemptId, questionId } },
    data: { isFlagged },
  });
  return { ok: true };
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
          },
          update: { timesMissed: { increment: 1 }, correctStreak: 0, isMastered: false, lastSeenAt: now },
        });
      } else {
        const missed = await tx.missedQuestion.findUnique({
          where: { userId_questionId: { userId: attempt.userId, questionId: q.questionId } },
        });
        if (missed) {
          const correctStreak = missed.correctStreak + 1;
          await tx.missedQuestion.update({
            where: { id: missed.id },
            data: { correctStreak, isMastered: correctStreak >= 3, lastSeenAt: now },
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
}

export async function submitExam(attemptId: string): Promise<void> {
  const user = await requireRole("STUDENT");
  const attempt = await verifyOwnership(attemptId, user.id);
  if (!attempt) return;

  const expired = isExpired(attempt.serverStartTime, attempt.timeLimitSeconds);
  await finalizeAttempt(attemptId, expired ? "AUTO_SUBMITTED" : "SUBMITTED");
  redirect(`/exam/${attemptId}/results`);
}

export async function abandonExam(attemptId: string): Promise<void> {
  const user = await requireRole("STUDENT");
  const attempt = await verifyOwnership(attemptId, user.id);
  if (!attempt || attempt.status !== "IN_PROGRESS") {
    redirect("/dashboard");
  }

  await prisma.examAttempt.update({ where: { id: attemptId }, data: { status: "ABANDONED" } });
  await prisma.activityLog.create({
    data: { userId: user.id, type: "EXAM_ABANDON", metadata: { attemptId } },
  });
  redirect("/dashboard");
}
