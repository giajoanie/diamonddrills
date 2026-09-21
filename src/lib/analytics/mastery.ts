/**
 * Advanced mastery prediction per instructional area (spec §11, Tier 3) —
 * a step up from the flat/linearly-weighted accuracy used elsewhere
 * (computeWeightedWeakAreas, exam-engine/scoring.ts): per-question
 * exponential recency decay instead of per-attempt linear weighting, plus
 * Bayesian shrinkage toward a neutral 50% prior so a handful of lucky or
 * unlucky answers doesn't swing the estimate to 0% or 100%.
 */

export type MasteryConfidence = "low" | "medium" | "high";

export type MasteryPrediction = {
  estimatedMastery: number; // 0-1
  confidence: MasteryConfidence;
  sampleSize: number;
};

const RECENCY_HALF_LIFE = 10; // questions back until a past answer's weight halves
const PRIOR_MASTERY = 0.5;
const PRIOR_STRENGTH = 5; // pseudo-observations pulling small samples toward the prior

export function predictMastery(chronologicalIsCorrect: boolean[]): MasteryPrediction {
  const n = chronologicalIsCorrect.length;
  if (n === 0) return { estimatedMastery: PRIOR_MASTERY, confidence: "low", sampleSize: 0 };

  let weightedCorrect = 0;
  let totalWeight = 0;
  for (let i = 0; i < n; i++) {
    const distanceFromMostRecent = n - 1 - i;
    const weight = Math.pow(0.5, distanceFromMostRecent / RECENCY_HALF_LIFE);
    weightedCorrect += weight * (chronologicalIsCorrect[i] ? 1 : 0);
    totalWeight += weight;
  }

  const estimatedMastery = (PRIOR_STRENGTH * PRIOR_MASTERY + weightedCorrect) / (PRIOR_STRENGTH + totalWeight);
  const confidence: MasteryConfidence = n >= 20 ? "high" : n >= 8 ? "medium" : "low";

  return { estimatedMastery, confidence, sampleSize: n };
}
