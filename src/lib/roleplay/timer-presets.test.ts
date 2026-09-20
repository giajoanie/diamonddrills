import { describe, expect, it } from "vitest";
import { getRoleplayTimerPreset } from "./timer-presets";

describe("getRoleplayTimerPreset", () => {
  it("gives Team Decision Making 30 min prep and 15 min presentation", () => {
    expect(getRoleplayTimerPreset("TEAM_DECISION_MAKING")).toEqual({
      prepSeconds: 1800,
      presentationSeconds: 900,
    });
  });

  it("gives every other format 10 min prep and 10 min presentation", () => {
    expect(getRoleplayTimerPreset("SERIES")).toEqual({ prepSeconds: 600, presentationSeconds: 600 });
    expect(getRoleplayTimerPreset("PROFESSIONAL_SELLING_CONSULTING")).toEqual({
      prepSeconds: 600,
      presentationSeconds: 600,
    });
  });
});
