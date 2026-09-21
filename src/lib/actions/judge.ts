"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth/session";
import { isRateLimited } from "@/lib/rate-limit";

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

  if (isRateLimited(`judge-score:${sessionId}`, 20, 10 * 60 * 1000)) {
    return { error: "Too many scores submitted for this session recently. Try again in a few minutes." };
  }

  const session = await prisma.roleplayPracticeSession.findUnique({ where: { id: sessionId } });
  if (!session) return { error: "That judging link is no longer valid." };

  const judgeName = formData.get("judgeName");
  const judge = await getSessionUser();
  if (!judge && (typeof judgeName !== "string" || !judgeName.trim())) {
    return { error: "Enter your name so the student knows who scored them." };
  }

  const criterionIds = formData.getAll("criterionId").map(String);
  if (criterionIds.length === 0) return { error: "Choose a rubric to score against." };

  // Look up the real criteria (and their maxPoints) rather than trusting
  // whatever criterionIds/scores the client posted, so a score can't exceed
  // its criterion's max or reference a criterion from an unrelated rubric.
  const criteria = await prisma.rubricCriterion.findMany({ where: { id: { in: criterionIds } } });
  const criterionById = new Map(criteria.map((c) => [c.id, c]));

  const scores: Record<string, number> = {};
  for (const criterionId of criterionIds) {
    const criterion = criterionById.get(criterionId);
    if (!criterion) continue;
    const raw = formData.get(`score-${criterionId}`);
    const value = Number(raw);
    if (Number.isFinite(value)) scores[criterionId] = Math.max(0, Math.min(value, criterion.maxPoints));
  }
  if (Object.keys(scores).length === 0) return { error: "Enter at least one valid score." };

  const comments = formData.get("comments");
  const trimmedComments = typeof comments === "string" ? comments.trim().slice(0, 2000) : "";
  const trimmedJudgeName = typeof judgeName === "string" ? judgeName.trim().slice(0, 100) : "";

  await prisma.judgeScore.create({
    data: {
      roleplaySessionId: sessionId,
      judgeId: judge?.id ?? null,
      judgeName: judge ? null : trimmedJudgeName,
      scores,
      comments: trimmedComments || null,
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: session.userId,
      type: "JUDGE_SCORE_SUBMITTED",
      metadata: { sessionId, judgeName: judge ? judge.firstName : trimmedJudgeName },
    },
  });

  return { success: true };
}
