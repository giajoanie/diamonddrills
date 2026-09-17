/**
 * The exam timer is authoritative on the server: the client only displays a
 * countdown computed from `serverStartTime`, so closing the tab (or lying
 * about the local clock) can't pause or extend it (spec 6.4).
 */
export function computeRemainingSeconds(
  serverStartTime: Date,
  timeLimitSeconds: number,
  now: Date = new Date(),
): number {
  const elapsedSeconds = Math.floor((now.getTime() - serverStartTime.getTime()) / 1000);
  return Math.max(0, timeLimitSeconds - elapsedSeconds);
}

export function isExpired(
  serverStartTime: Date,
  timeLimitSeconds: number,
  now: Date = new Date(),
): boolean {
  return computeRemainingSeconds(serverStartTime, timeLimitSeconds, now) <= 0;
}

export function computeTimeUsedSeconds(
  serverStartTime: Date,
  timeLimitSeconds: number,
  now: Date = new Date(),
): number {
  const elapsedSeconds = Math.floor((now.getTime() - serverStartTime.getTime()) / 1000);
  return Math.min(Math.max(0, elapsedSeconds), timeLimitSeconds);
}

export const WARNING_THRESHOLDS_SECONDS = { five_minutes: 5 * 60, one_minute: 60 } as const;
