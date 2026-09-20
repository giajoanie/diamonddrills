import { describe, expect, it } from "vitest";
import {
  computeScoreChangeVsBaseline,
  computeAssignmentCompletionRate,
  computeRubricScoreImprovement,
  computePracticeSessionsPerWeek,
  computeResourceUsageByType,
  identifyNeedsAttention,
} from "./kpis";

describe("computeScoreChangeVsBaseline", () => {
  it("averages baseline and latest across students with both", () => {
    const students = [
      { baselinePercentage: 60, latestPercentage: 80 },
      { baselinePercentage: 40, latestPercentage: 50 },
    ];
    const result = computeScoreChangeVsBaseline(students);
    expect(result.avgBaseline).toBe(50);
    expect(result.avgLatest).toBe(65);
    expect(result.avgChange).toBe(15);
    expect(result.studentCount).toBe(2);
  });

  it("excludes students missing either baseline or latest", () => {
    const students = [
      { baselinePercentage: 60, latestPercentage: 80 },
      { baselinePercentage: null, latestPercentage: 50 },
      { baselinePercentage: 40, latestPercentage: null },
    ];
    const result = computeScoreChangeVsBaseline(students);
    expect(result.studentCount).toBe(1);
    expect(result.avgChange).toBe(20);
  });

  it("is all zero with no eligible students", () => {
    expect(computeScoreChangeVsBaseline([])).toEqual({
      avgBaseline: 0,
      avgLatest: 0,
      avgChange: 0,
      studentCount: 0,
    });
  });
});

describe("computeAssignmentCompletionRate", () => {
  it("computes completion and on-time rates", () => {
    const assignments = [
      { status: "GRADED", isLate: false },
      { status: "SUBMITTED", isLate: false },
      { status: "LATE", isLate: true },
      { status: "NOT_STARTED", isLate: false },
    ];
    const result = computeAssignmentCompletionRate(assignments);
    expect(result.completionRate).toBe(75);
    expect(result.onTimeRate).toBeCloseTo((2 / 3) * 100);
  });

  it("is zero/zero with no assignments", () => {
    expect(computeAssignmentCompletionRate([])).toEqual({ completionRate: 0, onTimeRate: 0 });
  });

  it("on-time rate is zero when nothing has been completed", () => {
    const result = computeAssignmentCompletionRate([{ status: "NOT_STARTED", isLate: false }]);
    expect(result).toEqual({ completionRate: 0, onTimeRate: 0 });
  });
});

describe("computeRubricScoreImprovement", () => {
  it("compares first vs latest score percentage per criterion, ordered by time", () => {
    const scores = [
      { criterionName: "Clarity", score: 5, maxPoints: 10, scoredAt: new Date("2026-01-10") },
      { criterionName: "Clarity", score: 8, maxPoints: 10, scoredAt: new Date("2026-02-10") },
      { criterionName: "Clarity", score: 6, maxPoints: 10, scoredAt: new Date("2026-01-20") },
    ];
    const result = computeRubricScoreImprovement(scores);
    expect(result).toEqual([{ criterionName: "Clarity", firstPct: 50, latestPct: 80, change: 30 }]);
  });

  it("handles multiple criteria independently", () => {
    const scores = [
      { criterionName: "Clarity", score: 5, maxPoints: 10, scoredAt: new Date("2026-01-01") },
      { criterionName: "Structure", score: 4, maxPoints: 20, scoredAt: new Date("2026-01-01") },
    ];
    const result = computeRubricScoreImprovement(scores);
    expect(result).toHaveLength(2);
  });

  it("is empty with no scores", () => {
    expect(computeRubricScoreImprovement([])).toEqual([]);
  });
});

describe("computePracticeSessionsPerWeek", () => {
  it("divides total sessions by student count and weeks", () => {
    const starts = Array.from({ length: 20 }, (_, i) => ({ userId: `s${i % 5}` }));
    expect(computePracticeSessionsPerWeek(starts, 5, 14)).toBe(2);
  });

  it("is zero with no students", () => {
    expect(computePracticeSessionsPerWeek([], 0, 7)).toBe(0);
  });
});

describe("computeResourceUsageByType", () => {
  it("counts opens grouped by resource type", () => {
    const opens = [
      { resourceType: "CASE_STUDY" },
      { resourceType: "CASE_STUDY" },
      { resourceType: "VIDEO" },
    ];
    expect(computeResourceUsageByType(opens)).toEqual({ CASE_STUDY: 2, VIDEO: 1 });
  });

  it("is empty with no opens", () => {
    expect(computeResourceUsageByType([])).toEqual({});
  });
});

describe("identifyNeedsAttention", () => {
  const now = new Date("2026-06-01T00:00:00Z");
  const opts = { now, inactiveDays: 14, decliningThreshold: 5, lowScoreThreshold: 60 };

  it("flags a student inactive beyond the threshold", () => {
    const students = [
      { userId: "a", lastActiveAt: new Date("2026-05-01"), scoreChange: 0, latestPercentage: 80 },
    ];
    expect(identifyNeedsAttention(students, opts)).toEqual([{ userId: "a", reasons: ["INACTIVE"] }]);
  });

  it("flags a student with no activity at all as inactive", () => {
    const students = [{ userId: "a", lastActiveAt: null, scoreChange: null, latestPercentage: null }];
    expect(identifyNeedsAttention(students, opts)).toEqual([{ userId: "a", reasons: ["INACTIVE"] }]);
  });

  it("flags a declining student", () => {
    const students = [
      { userId: "a", lastActiveAt: now, scoreChange: -10, latestPercentage: 80 },
    ];
    expect(identifyNeedsAttention(students, opts)).toEqual([{ userId: "a", reasons: ["DECLINING"] }]);
  });

  it("flags a student below the score threshold", () => {
    const students = [{ userId: "a", lastActiveAt: now, scoreChange: 0, latestPercentage: 40 }];
    expect(identifyNeedsAttention(students, opts)).toEqual([{ userId: "a", reasons: ["BELOW_THRESHOLD"] }]);
  });

  it("can flag multiple reasons at once", () => {
    const students = [
      { userId: "a", lastActiveAt: new Date("2026-01-01"), scoreChange: -20, latestPercentage: 30 },
    ];
    const result = identifyNeedsAttention(students, opts);
    expect(result[0].reasons).toEqual(
      expect.arrayContaining(["INACTIVE", "DECLINING", "BELOW_THRESHOLD"]),
    );
  });

  it("excludes a healthy student", () => {
    const students = [{ userId: "a", lastActiveAt: now, scoreChange: 5, latestPercentage: 90 }];
    expect(identifyNeedsAttention(students, opts)).toEqual([]);
  });
});
