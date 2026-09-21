import { describe, expect, it } from "vitest";
import { describeActivity } from "./activity-labels";

describe("describeActivity", () => {
  it("returns a human-readable label for a known type", () => {
    expect(describeActivity("EXAM_COMPLETE")).toBe("Completed an exam");
  });

  it("covers every activity type introduced for Judge Mode and roleplay logging", () => {
    expect(describeActivity("ROLEPLAY_SESSION_START")).not.toBe("ROLEPLAY_SESSION_START");
    expect(describeActivity("JUDGE_SCORE_SUBMITTED")).not.toBe("JUDGE_SCORE_SUBMITTED");
    expect(describeActivity("INTERVENTION_LOGGED")).not.toBe("INTERVENTION_LOGGED");
  });
});
