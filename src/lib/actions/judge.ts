"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth/session";

// Judge Mode's submit endpoint is deliberately public (no requireRole) — a
// peer judge scoring a live practice roleplay from their phone may not have
// an account at all. A logged-in visitor (mentor or student) is still
// recorded as the judge via judgeId; everyone else supplies a display name.
export type SubmitJudgeScoreState = { error?: string; success?: boolean } | undefined;

export async function submitJudgeScore(
  _prevState: SubmitJudgeScoreState,
  formData: FormData,
): Promise<SubmitJudgeScoreState> {
  const sessionId = formData.get("sessionId");
  if (typeof sessionId !== "string" || !sessionId) return { error: "Missing session." };

  const session = await prisma.roleplayPracticeSession.findUnique({ where: { id: sessionId } });
  if (!session) return { error: "That judging link is no longer valid." };

  const judgeName = formData.get("judgeName");
  const judge = await getSessionUser();
  if (!judge && (typeof judgeName !== "string" || !judgeName.trim())) {
    return { error: "Enter your name so the student knows who scored them." };
  }

  const criterionIds = formData.getAll("criterionId").map(String);
  if (criterionIds.length === 0) return { error: "Choose a rubric to score against." };

  const scores: Record<string, number> = {};
  for (const criterionId of criterionIds) {
    const raw = formData.get(`score-${criterionId}`);
    const value = Number(raw);
    if (Number.isFinite(value)) scores[criterionId] = value;
  }

  const comments = formData.get("comments");

  await prisma.judgeScore.create({
    data: {
      roleplaySessionId: sessionId,
      judgeId: judge?.id ?? null,
      judgeName: judge ? null : String(judgeName).trim(),
      scores,
      comments: typeof comments === "string" && comments.trim() ? comments.trim() : null,
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: session.userId,
      type: "JUDGE_SCORE_SUBMITTED",
      metadata: { sessionId, judgeName: judge ? judge.firstName : String(judgeName).trim() },
    },
  });

  return { success: true };
}
