"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/guards";
import { pickRandomSubset } from "@/lib/exam-engine/shuffle";
import { isExpired } from "@/lib/exam-engine/timer";
import { TIMED_EXAM_PRESETS, BASELINE_PRESET } from "@/lib/exam-engine/presets";
import { startAttemptWithQuestionIds, finalizeAttempt } from "@/lib/exam-engine/attempt-lifecycle";
import type { ExamMode, OptionKey } from "@/generated/prisma/client";

export type StartExamState = { error?: string } | undefined;

// Competition Simulation Mode (Tier 3): a timed exam followed immediately by
// a timed roleplay, like competition day. Only offered for the student's
// current roleplay-category events that also have an exam component (a
// "Series" event, in DECA terms) — event-first rather than the usual
// bank-first /exam/start flow, since the roleplay leg needs a specific
// eventId to chain into afterward (see the results page's CTA).
export async function startCompetitionSimulation(
  _prevState: StartExamState,
  formData: FormData,
): Promise<StartExamState> {
  const student = await requireRole("STUDENT");

  const eventId = formData.get("eventId");
  if (typeof eventId !== "string" || !eventId) return { error: "Choose an event." };

  const enrollment = await prisma.eventEnrollment.findFirst({
    where: { userId: student.id, eventId, isCurrent: true },
    include: { event: true },
  });
  if (!enrollment || enrollment.event.category !== "ROLEPLAY" || !enrollment.event.hasExam) {
    return { error: "That isn't one of your current events with both an exam and a roleplay." };
  }
  const examBankId = enrollment.event.examBankId;
  if (!examBankId) return { error: "This event doesn't have an exam bank configured yet." };

  const preset = TIMED_EXAM_PRESETS[90]; // full competition format: 100 questions, 90 minutes
  const pool = await prisma.question.findMany({
    where: { examBankId, isActive: true },
    select: { id: true },
  });
  if (pool.length === 0) return { error: "No questions are available for this exam yet." };

  const selected = pickRandomSubset(pool, preset.questions);
  return startAttemptWithQuestionIds(
    student.id,
    examBankId,
    "COMPETITION_SIMULATION",
    false,
    preset.minutes * 60,
    selected.map((q) => q.id),
    selected.length < preset.questions,
    undefined,
    eventId,
  );
}

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
      where: { userId: user.id, examBankId, isMastered: false, nextDueAt: { lte: new Date() } },
      select: { questionId: true },
    });
    if (missed.length === 0) {
      return { error: "No missed questions are due for review right now — check back later." };
    }

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
