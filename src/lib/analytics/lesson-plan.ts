import type { AreaTrend } from "./trend";

/**
 * Rule-based lesson plan recommendations (spec §9.2): for each of the
 * weakest instructional areas, suggest a focus area, tagged resources, a
 * practice exam configuration, and which students would benefit most —
 * with a transparent, plain-language reason for each recommendation.
 * Optionally folds in a recency trend (declining/improving/stable, see
 * trend.ts) so the reason reflects direction, not just a flat average.
 */

export type WeakArea = { areaId: string; areaName: string; accuracy: number };

export type LessonPlanRecommendation = {
  areaId: string;
  areaName: string;
  accuracy: number;
  trend: AreaTrend;
  reason: string;
  resourceIds: string[];
  examConfig: { questionCount: number; timeLimitMinutes: number };
  beneficiaryStudentIds: string[];
};

const BENEFICIARY_THRESHOLD = 70;

const TREND_CLAUSES: Record<AreaTrend, string> = {
  declining: ", and has been trending down recently — worth prioritizing.",
  improving: ", but has been improving recently — keep the momentum going.",
  stable: ".",
};

export function generateLessonPlanRecommendations(
  weakAreas: WeakArea[],
  resourceIdsByArea: Record<string, string[]>,
  studentAccuracyByArea: Record<string, { userId: string; accuracy: number }[]>,
  topN = 3,
  trendByArea: Record<string, AreaTrend> = {},
): LessonPlanRecommendation[] {
  return weakAreas.slice(0, topN).map((area, index) => {
    const rank = index === 0 ? "weakest" : `${index + 1}${["st", "nd", "rd"][index] ?? "th"}-weakest`;
    const beneficiaryStudentIds = (studentAccuracyByArea[area.areaId] ?? [])
      .filter((s) => s.accuracy < BENEFICIARY_THRESHOLD)
      .sort((a, b) => a.accuracy - b.accuracy)
      .map((s) => s.userId);
    const trend = trendByArea[area.areaId] ?? "stable";

    return {
      areaId: area.areaId,
      areaName: area.areaName,
      accuracy: area.accuracy,
      trend,
      reason: `${area.areaName} is the ${rank} instructional area chapter-wide, averaging ${Math.round(area.accuracy)}% accuracy${TREND_CLAUSES[trend]}`,
      resourceIds: resourceIdsByArea[area.areaId] ?? [],
      examConfig: { questionCount: 15, timeLimitMinutes: 20 },
      beneficiaryStudentIds,
    };
  });
}
