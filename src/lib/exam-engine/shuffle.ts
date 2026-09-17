import type { OptionKey } from "@/generated/prisma/client";

/** Fisher-Yates shuffle. Pure and rng-injectable so it's deterministic in tests. */
export function shuffleArray<T>(items: T[], rng: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Picks up to `count` items at random from the pool. If the pool has fewer
 * than `count` items, returns all of them (shuffled) — the caller is
 * responsible for surfacing the "fewer questions available than requested"
 * notice required by the spec.
 */
export function pickRandomSubset<T>(
  pool: T[],
  count: number,
  rng: () => number = Math.random,
): T[] {
  return shuffleArray(pool, rng).slice(0, Math.min(count, pool.length));
}

const OPTION_KEYS: OptionKey[] = ["A", "B", "C", "D"];

/** A random permutation of A-D, used as the displayed option order for one question. */
export function shuffleOptionOrder(rng: () => number = Math.random): OptionKey[] {
  return shuffleArray(OPTION_KEYS, rng);
}
