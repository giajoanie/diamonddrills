import { describe, expect, it } from "vitest";
import { isRateLimited } from "./rate-limit";

describe("isRateLimited", () => {
  it("allows up to maxHits within the window", () => {
    const key = `test-${Math.random()}`;
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) {
      expect(isRateLimited(key, 3, 1000, now)).toBe(false);
    }
  });

  it("blocks once maxHits is exceeded within the window", () => {
    const key = `test-${Math.random()}`;
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) isRateLimited(key, 3, 1000, now);
    expect(isRateLimited(key, 3, 1000, now)).toBe(true);
  });

  it("forgets hits once they age out of the window", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 3; i++) isRateLimited(key, 3, 1000, 1_000_000);
    expect(isRateLimited(key, 3, 1000, 1_000_000 + 2000)).toBe(false);
  });

  it("tracks separate keys independently", () => {
    const keyA = `test-a-${Math.random()}`;
    const keyB = `test-b-${Math.random()}`;
    for (let i = 0; i < 3; i++) isRateLimited(keyA, 3, 1000, 1_000_000);
    expect(isRateLimited(keyB, 3, 1000, 1_000_000)).toBe(false);
  });
});
