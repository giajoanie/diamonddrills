import { describe, expect, it } from "vitest";
import { formatTime } from "./format-time";

describe("formatTime", () => {
  it("formats seconds under a minute", () => {
    expect(formatTime(5)).toBe("0:05");
  });

  it("formats minutes and seconds", () => {
    expect(formatTime(125)).toBe("2:05");
  });

  it("pads single-digit seconds", () => {
    expect(formatTime(60)).toBe("1:00");
  });

  it("switches to H:MM:SS past an hour", () => {
    expect(formatTime(3661)).toBe("1:01:01");
  });

  it("clamps negative values to zero", () => {
    expect(formatTime(-5)).toBe("0:00");
  });

  it("floors fractional seconds", () => {
    expect(formatTime(59.9)).toBe("0:59");
  });
});
