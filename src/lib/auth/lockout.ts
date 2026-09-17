export const MAX_FAILED_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MS = 15 * 60 * 1000;

/**
 * Pure decision logic for the failed-login counter, kept separate from the
 * `login` Server Action so it can be unit-tested without a Next.js request
 * context (the action itself needs `cookies()`/`redirect()`, which only
 * work inside a real request).
 */
export function nextFailedLoginState(
  currentFailedAttempts: number,
  now: Date = new Date(),
): { failedLoginAttempts: number; lockedUntil: Date | null } {
  const attempts = currentFailedAttempts + 1;
  const lockingOut = attempts >= MAX_FAILED_LOGIN_ATTEMPTS;
  return {
    failedLoginAttempts: lockingOut ? 0 : attempts,
    lockedUntil: lockingOut ? new Date(now.getTime() + LOCKOUT_DURATION_MS) : null,
  };
}
