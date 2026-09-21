/**
 * A minimal in-memory sliding-window rate limiter. Deliberately not backed
 * by Redis or similar — this app targets a single small-school deployment,
 * typically one server instance, so an in-process Map is a reasonable
 * tradeoff. Note the real limitation: it resets on every deploy/restart and
 * doesn't share state across multiple instances, so it stops obvious abuse
 * (scripted signup spam, judge-link flooding) rather than being a hard
 * guarantee — revisit with a shared store if this ever runs multi-instance.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, maxHits: number, windowMs: number, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > maxHits;
}
