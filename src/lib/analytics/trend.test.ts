import { describe, expect, it } from "vitest";
import { computeAreaTrend } from "./trend";

describe("computeAreaTrend", () => {
  it("is 'improving' when later accuracy is well above earlier accuracy", () => {
    const results = [false, false, false, false, true, true, true, true];
    expect(computeAreaTrend(results)).toBe("improving");
  });

  it("is 'declining' when later accuracy is well below earlier accuracy", () => {
    const results = [true, true, true, true, false, false, false, false];
    expect(computeAreaTrend(results)).toBe("declining");
  });

  it("is 'stable' when the change is within the threshold", () => {
    const results = [true, false, true, false, true, false, true, false];
    expect(computeAreaTrend(results)).toBe("stable");
  });

  it("is 'stable' with too few data points to compare", () => {
    expect(computeAreaTrend([true, false, true])).toBe("stable");
  });

  it("is 'stable' with no data", () => {
    expect(computeAreaTrend([])).toBe("stable");
  });
});
