/**
 * Rule-based lesson plan recommendations (spec §9.2): for each of the
 * weakest instructional areas, suggest a focus area, tagged resources, a
 * practice exam configuration, and which students would benefit most —
 * with a transparent, plain-language reason for each recommendation.
 */

export type WeakArea = { areaId: string; areaName: string; accuracy: number };

export type LessonPlanRecommendation = {
  areaId: string;
  areaName: string;
  accuracy: number;
  reason: string;
  resourceIds: string[];
  examConfig: { questionCount: number; timeLimitMinutes: number };
  beneficiaryStudentIds: string[];
};

const BENEFICIARY_THRESHOLD = 70;

export function generateLessonPlanRecommendations(
  weakAreas: WeakArea[],
  resourceIdsByArea: Record<string, string[]>,
  studentAccuracyByArea: Record<string, { userId: string; accuracy: number }[]>,
  topN = 3,
): LessonPlanRecommendation[] {
  return weakAreas.slice(0, topN).map((area, index) => {
    const rank = index === 0 ? "weakest" : `${index + 1}${["st", "nd", "rd"][index] ?? "th"}-weakest`;
    const beneficiaryStudentIds = (studentAccuracyByArea[area.areaId] ?? [])
      .filter((s) => s.accuracy < BENEFICIARY_THRESHOLD)
      .sort((a, b) => a.accuracy - b.accuracy)
      .map((s) => s.userId);

    return {
      areaId: area.areaId,
      areaName: area.areaName,
      accuracy: area.accuracy,
      reason: `${area.areaName} is the ${rank} instructional area chapter-wide, averaging ${Math.round(area.accuracy)}% accuracy.`,
      resourceIds: resourceIdsByArea[area.areaId] ?? [],
      examConfig: { questionCount: 15, timeLimitMinutes: 20 },
      beneficiaryStudentIds,
    };
  });
}
