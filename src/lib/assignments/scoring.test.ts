import { describe, expect, it } from "vitest";
import { computeRubricTotal } from "./scoring";

describe("computeRubricTotal", () => {
  it("sums earned and possible points across all criteria", () => {
    const scores = [{ score: 8 }, { score: 15 }];
    const criteria = [{ maxPoints: 10 }, { maxPoints: 20 }];
    expect(computeRubricTotal(scores, criteria)).toEqual({ earned: 23, possible: 30 });
  });

  it("counts an ungraded criterion toward possible but not earned", () => {
    const scores = [{ score: 8 }];
    const criteria = [{ maxPoints: 10 }, { maxPoints: 20 }];
    expect(computeRubricTotal(scores, criteria)).toEqual({ earned: 8, possible: 30 });
  });

  it("is zero/zero with no scores or criteria", () => {
    expect(computeRubricTotal([], [])).toEqual({ earned: 0, possible: 0 });
  });
});
