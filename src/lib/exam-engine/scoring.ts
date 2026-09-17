import type { OptionKey } from "@/generated/prisma/client";

export type ScoredItem = {
  correctOption: OptionKey | null;
  studentAnswer: OptionKey | null;
};

export function computeScore(items: ScoredItem[]): {
  score: number;
  totalQuestions: number;
  percentage: number;
} {
  const totalQuestions = items.length;
  const score = items.filter(
    (i) => i.studentAnswer !== null && i.studentAnswer === i.correctOption,
  ).length;
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  return { score, totalQuestions, percentage };
}

export type AreaBreakdownItem = {
  areaName: string;
  correct: number;
  total: number;
  accuracy: number;
};

/** Accuracy per instructional area, sorted weakest first (spec 6.5). */
export function computeAreaBreakdown(
  items: { areaName: string | null; isCorrect: boolean }[],
): AreaBreakdownItem[] {
  const byArea = new Map<string, { correct: number; total: number }>();

  for (const item of items) {
    const key = item.areaName ?? "Uncategorized";
    const entry = byArea.get(key) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (item.isCorrect) entry.correct += 1;
    byArea.set(key, entry);
  }

  return [...byArea.entries()]
    .map(([areaName, { correct, total }]) => ({
      areaName,
      correct,
      total,
      accuracy: total > 0 ? (correct / total) * 100 : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);
}

/**
 * Weakest N areas across multiple attempts, weighted toward recent ones
 * (spec 6.7). Each attempt's per-area accuracy is averaged with a linearly
 * increasing weight by recency (oldest = weight 1, newest = weight N).
 */
export function computeWeightedWeakAreas(
  attempts: { areaName: string; accuracy: number }[][],
  topN = 5,
): { areaName: string; weightedAccuracy: number }[] {
  const weighted = new Map<string, { sum: number; weight: number }>();

  attempts.forEach((attemptAreas, index) => {
    const weight = index + 1; // attempts are assumed oldest-to-newest
    for (const { areaName, accuracy } of attemptAreas) {
      const entry = weighted.get(areaName) ?? { sum: 0, weight: 0 };
      entry.sum += accuracy * weight;
      entry.weight += weight;
      weighted.set(areaName, entry);
    }
  });

  return [...weighted.entries()]
    .map(([areaName, { sum, weight }]) => ({
      areaName,
      weightedAccuracy: weight > 0 ? sum / weight : 0,
    }))
    .sort((a, b) => a.weightedAccuracy - b.weightedAccuracy)
    .slice(0, topN);
}
