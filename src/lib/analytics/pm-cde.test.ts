import { describe, expect, it } from "vitest";
import { bucketByEngagement, computeEngagementVsImprovement, computeOutcomesByEngagement } from "./pm-cde";

describe("bucketByEngagement", () => {
  it("buckets low, medium, and high correctly at the boundaries", () => {
    expect(bucketByEngagement(0)).toBe("low");
    expect(bucketByEngagement(2)).toBe("low");
    expect(bucketByEngagement(3)).toBe("medium");
    expect(bucketByEngagement(7)).toBe("medium");
    expect(bucketByEngagement(8)).toBe("high");
    expect(bucketByEngagement(50)).toBe("high");
  });
});

describe("computeEngagementVsImprovement", () => {
  it("averages score change within each engagement bucket", () => {
    const result = computeEngagementVsImprovement([
      { practiceActivityCount: 0, scoreChange: 2, advanced: null },
      { practiceActivityCount: 1, scoreChange: 4, advanced: null },
      { practiceActivityCount: 10, scoreChange: 20, advanced: null },
      { practiceActivityCount: 12, scoreChange: 30, advanced: null },
    ]);
    const low = result.find((r) => r.bucket === "low");
    const high = result.find((r) => r.bucket === "high");
    expect(low?.avgScoreChange).toBe(3);
    expect(high?.avgScoreChange).toBe(25);
  });

  it("excludes students with no measurable score change from the average but still counts them", () => {
    const result = computeEngagementVsImprovement([
      { practiceActivityCount: 0, scoreChange: null, advanced: null },
      { practiceActivityCount: 0, scoreChange: 10, advanced: null },
    ]);
    const low = result.find((r) => r.bucket === "low");
    expect(low?.studentCount).toBe(2);
    expect(low?.avgScoreChange).toBe(10);
  });

  it("omits buckets with no students", () => {
    const result = computeEngagementVsImprovement([{ practiceActivityCount: 0, scoreChange: 5, advanced: null }]);
    expect(result.map((r) => r.bucket)).toEqual(["low"]);
  });

  it("returns an empty array for no students", () => {
    expect(computeEngagementVsImprovement([])).toEqual([]);
  });
});

describe("computeOutcomesByEngagement", () => {
  it("computes advancement rate only among students with a recorded result", () => {
    const result = computeOutcomesByEngagement([
      { practiceActivityCount: 10, scoreChange: null, advanced: true },
      { practiceActivityCount: 10, scoreChange: null, advanced: false },
      { practiceActivityCount: 10, scoreChange: null, advanced: null },
    ]);
    const high = result.find((r) => r.bucket === "high");
    expect(high?.studentCount).toBe(3);
    expect(high?.advancementRate).toBe(50);
  });

  it("returns a 0% rate for a bucket where no one has a recorded result", () => {
    const result = computeOutcomesByEngagement([{ practiceActivityCount: 0, scoreChange: null, advanced: null }]);
    expect(result[0].advancementRate).toBe(0);
  });
});
