import { describe, expect, it } from "vitest";
import { predictMastery } from "./mastery";

describe("predictMastery", () => {
  it("returns the neutral prior with low confidence for no data", () => {
    const result = predictMastery([]);
    expect(result).toEqual({ estimatedMastery: 0.5, confidence: "low", sampleSize: 0 });
  });

  it("shrinks a tiny all-correct sample toward the prior instead of reporting 100%", () => {
    const result = predictMastery([true, true]);
    expect(result.estimatedMastery).toBeGreaterThan(0.5);
    expect(result.estimatedMastery).toBeLessThan(0.9);
    expect(result.confidence).toBe("low");
  });

  it("approaches the true accuracy as sample size grows, bounded by recency decay", () => {
    // Exponential recency weighting caps the effective sample size even for a
    // long history, so a long all-correct run converges toward — but doesn't
    // fully reach — 100%; this is intentional, not a bug (see file header).
    const allCorrect = Array(30).fill(true);
    const result = predictMastery(allCorrect);
    expect(result.estimatedMastery).toBeGreaterThan(0.8);
    expect(result.confidence).toBe("high");
  });

  it("weights recent answers more heavily than older ones", () => {
    const recentlyImproved = [false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true];
    const recentlyDeclined = [true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false];
    expect(predictMastery(recentlyImproved).estimatedMastery).toBeGreaterThan(
      predictMastery(recentlyDeclined).estimatedMastery,
    );
  });

  it("assigns confidence tiers by sample size", () => {
    expect(predictMastery(Array(5).fill(true)).confidence).toBe("low");
    expect(predictMastery(Array(10).fill(true)).confidence).toBe("medium");
    expect(predictMastery(Array(25).fill(true)).confidence).toBe("high");
  });
});
