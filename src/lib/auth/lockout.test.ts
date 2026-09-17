import { describe, expect, it } from "vitest";
import { MAX_FAILED_LOGIN_ATTEMPTS, nextFailedLoginState } from "./lockout";

describe("nextFailedLoginState", () => {
  it("increments the counter and does not lock before the threshold", () => {
    for (let attempts = 0; attempts < MAX_FAILED_LOGIN_ATTEMPTS - 1; attempts++) {
      const state = nextFailedLoginState(attempts);
      expect(state.failedLoginAttempts).toBe(attempts + 1);
      expect(state.lockedUntil).toBeNull();
    }
  });

  it("locks the account and resets the counter on the Nth failure", () => {
    const state = nextFailedLoginState(MAX_FAILED_LOGIN_ATTEMPTS - 1);
    expect(state.failedLoginAttempts).toBe(0);
    expect(state.lockedUntil).toBeInstanceOf(Date);
  });

  it("sets lockedUntil 15 minutes in the future", () => {
    const now = new Date("2026-01-01T00:00:00.000Z");
    const state = nextFailedLoginState(MAX_FAILED_LOGIN_ATTEMPTS - 1, now);
    expect(state.lockedUntil?.getTime()).toBe(now.getTime() + 15 * 60 * 1000);
  });
});
