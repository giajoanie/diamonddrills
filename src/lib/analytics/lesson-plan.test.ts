import { describe, expect, it } from "vitest";
import { generateLessonPlanRecommendations } from "./lesson-plan";

describe("generateLessonPlanRecommendations", () => {
  const weakAreas = [
    { areaId: "a1", areaName: "Economics", accuracy: 40 },
    { areaId: "a2", areaName: "Marketing", accuracy: 55 },
    { areaId: "a3", areaName: "Finance", accuracy: 60 },
    { areaId: "a4", areaName: "Management", accuracy: 65 },
  ];

  it("takes only the top N weakest areas", () => {
    const result = generateLessonPlanRecommendations(weakAreas, {}, {}, 2);
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.areaId)).toEqual(["a1", "a2"]);
  });

  it("labels the weakest area distinctly from the rest", () => {
    const result = generateLessonPlanRecommendations(weakAreas, {}, {}, 3);
    expect(result[0].reason).toContain("the weakest instructional area");
    expect(result[1].reason).toContain("2nd-weakest");
    expect(result[2].reason).toContain("3rd-weakest");
  });

  it("includes tagged resource ids for the area", () => {
    const resourceIdsByArea = { a1: ["r1", "r2"] };
    const result = generateLessonPlanRecommendations(weakAreas, resourceIdsByArea, {}, 1);
    expect(result[0].resourceIds).toEqual(["r1", "r2"]);
  });

  it("is empty for an area with no tagged resources", () => {
    const result = generateLessonPlanRecommendations(weakAreas, {}, {}, 1);
    expect(result[0].resourceIds).toEqual([]);
  });

  it("flags students below the beneficiary threshold, weakest first", () => {
    const studentAccuracyByArea = {
      a1: [
        { userId: "s1", accuracy: 80 },
        { userId: "s2", accuracy: 30 },
        { userId: "s3", accuracy: 65 },
      ],
    };
    const result = generateLessonPlanRecommendations(weakAreas, {}, studentAccuracyByArea, 1);
    expect(result[0].beneficiaryStudentIds).toEqual(["s2", "s3"]);
  });

  it("always includes a fixed practice exam configuration", () => {
    const result = generateLessonPlanRecommendations(weakAreas, {}, {}, 1);
    expect(result[0].examConfig).toEqual({ questionCount: 15, timeLimitMinutes: 20 });
  });

  it("is empty with no weak areas", () => {
    expect(generateLessonPlanRecommendations([], {}, {}, 3)).toEqual([]);
  });
});
