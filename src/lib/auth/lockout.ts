export const MAX_FAILED_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MS = 15 * 60 * 1000;
export const MAX_LOCKOUT_DURATION_MS = 24 * 60 * 60 * 1000;

/**
 * Pure decision logic for the failed-login counter, kept separate from the
 * `login` Server Action so it can be unit-tested without a Next.js request
 * context (the action itself needs `cookies()`/`redirect()`, which only
 * work inside a real request).
 *
 * The counter is never reset by a lockout (only a successful login resets
 * it, in the `login` action) and each additional lockout past the
 * threshold doubles the wait, capped at 24h — resetting to a fresh 5
 * guesses every 15 minutes would let an attacker grind indefinitely.
 */
export function nextFailedLoginState(
  currentFailedAttempts: number,
  now: Date = new Date(),
): { failedLoginAttempts: number; lockedUntil: Date | null } {
  const attempts = currentFailedAttempts + 1;
  if (attempts < MAX_FAILED_LOGIN_ATTEMPTS) {
    return { failedLoginAttempts: attempts, lockedUntil: null };
  }

  const cyclesOverThreshold = attempts - MAX_FAILED_LOGIN_ATTEMPTS;
  const durationMs = Math.min(
    LOCKOUT_DURATION_MS * 2 ** cyclesOverThreshold,
    MAX_LOCKOUT_DURATION_MS,
  );
  return { failedLoginAttempts: attempts, lockedUntil: new Date(now.getTime() + durationMs) };
}
