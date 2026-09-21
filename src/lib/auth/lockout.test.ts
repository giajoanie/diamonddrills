import { describe, expect, it } from "vitest";
import { MAX_FAILED_LOGIN_ATTEMPTS, MAX_LOCKOUT_DURATION_MS, nextFailedLoginState } from "./lockout";

describe("nextFailedLoginState", () => {
  it("increments the counter and does not lock before the threshold", () => {
    for (let attempts = 0; attempts < MAX_FAILED_LOGIN_ATTEMPTS - 1; attempts++) {
      const state = nextFailedLoginState(attempts);
      expect(state.failedLoginAttempts).toBe(attempts + 1);
      expect(state.lockedUntil).toBeNull();
    }
  });

  it("locks the account on the Nth failure without resetting the counter", () => {
    const state = nextFailedLoginState(MAX_FAILED_LOGIN_ATTEMPTS - 1);
    expect(state.failedLoginAttempts).toBe(MAX_FAILED_LOGIN_ATTEMPTS);
    expect(state.lockedUntil).toBeInstanceOf(Date);
  });

  it("sets lockedUntil 15 minutes in the future on the first lockout", () => {
    const now = new Date("2026-01-01T00:00:00.000Z");
    const state = nextFailedLoginState(MAX_FAILED_LOGIN_ATTEMPTS - 1, now);
    expect(state.lockedUntil?.getTime()).toBe(now.getTime() + 15 * 60 * 1000);
  });

  it("escalates the lockout duration on repeated failures after the threshold", () => {
    const now = new Date("2026-01-01T00:00:00.000Z");
    const first = nextFailedLoginState(MAX_FAILED_LOGIN_ATTEMPTS - 1, now); // 1st lockout: 15 min
    const second = nextFailedLoginState(first.failedLoginAttempts, now); // 2nd: 30 min
    const third = nextFailedLoginState(second.failedLoginAttempts, now); // 3rd: 60 min
    expect(second.lockedUntil!.getTime() - now.getTime()).toBe(30 * 60 * 1000);
    expect(third.lockedUntil!.getTime() - now.getTime()).toBe(60 * 60 * 1000);
  });

  it("caps the escalating lockout duration at 24 hours", () => {
    const now = new Date("2026-01-01T00:00:00.000Z");
    const state = nextFailedLoginState(MAX_FAILED_LOGIN_ATTEMPTS + 20, now);
    expect(state.lockedUntil!.getTime() - now.getTime()).toBe(MAX_LOCKOUT_DURATION_MS);
  });
});
