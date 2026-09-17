import { describe, expect, it } from "vitest";
import { computeAreaBreakdown, computeScore, computeWeightedWeakAreas } from "./scoring";

describe("computeScore", () => {
  it("counts only correctly-answered questions", () => {
    const result = computeScore([
      { correctOption: "A", studentAnswer: "A" },
      { correctOption: "B", studentAnswer: "C" },
      { correctOption: "C", studentAnswer: "C" },
      { correctOption: "D", studentAnswer: null },
    ]);
    expect(result).toEqual({ score: 2, totalQuestions: 4, percentage: 50 });
  });

  it("treats an unanswered question as incorrect, not a crash", () => {
    const result = computeScore([{ correctOption: "A", studentAnswer: null }]);
    expect(result.score).toBe(0);
  });

  it("returns 0% for an empty attempt rather than dividing by zero", () => {
    expect(computeScore([])).toEqual({ score: 0, totalQuestions: 0, percentage: 0 });
  });

  it("scores 100% when every answer is correct", () => {
    const result = computeScore([
      { correctOption: "A", studentAnswer: "A" },
      { correctOption: "B", studentAnswer: "B" },
    ]);
    expect(result.percentage).toBe(100);
  });
});

describe("computeAreaBreakdown", () => {
  it("groups by area and sorts weakest-first", () => {
    const breakdown = computeAreaBreakdown([
      { areaName: "Economics", isCorrect: true },
      { areaName: "Economics", isCorrect: true },
      { areaName: "Selling", isCorrect: false },
      { areaName: "Selling", isCorrect: false },
      { areaName: "Selling", isCorrect: true },
    ]);

    expect(breakdown[0]).toMatchObject({ areaName: "Selling", correct: 1, total: 3 });
    expect(breakdown[1]).toMatchObject({ areaName: "Economics", correct: 2, total: 2 });
    expect(breakdown[0].accuracy).toBeLessThan(breakdown[1].accuracy);
  });

  it("buckets a null area as Uncategorized", () => {
    const breakdown = computeAreaBreakdown([{ areaName: null, isCorrect: true }]);
    expect(breakdown[0].areaName).toBe("Uncategorized");
  });
});

describe("computeWeightedWeakAreas", () => {
  it("weights more recent attempts more heavily", () => {
    // Economics: weak long ago (20%), now strong (90%) -> should not be the weakest
    // Selling: always weak (20%) -> should be the weakest
    const attempts = [
      [
        { areaName: "Economics", accuracy: 20 },
        { areaName: "Selling", accuracy: 20 },
      ],
      [
        { areaName: "Economics", accuracy: 90 },
        { areaName: "Selling", accuracy: 20 },
      ],
    ];
    const weakest = computeWeightedWeakAreas(attempts, 2);
    expect(weakest[0].areaName).toBe("Selling");
  });

  it("limits to topN areas", () => {
    const attempts = [
      [
        { areaName: "A", accuracy: 10 },
        { areaName: "B", accuracy: 20 },
        { areaName: "C", accuracy: 30 },
      ],
    ];
    expect(computeWeightedWeakAreas(attempts, 2)).toHaveLength(2);
  });
});
