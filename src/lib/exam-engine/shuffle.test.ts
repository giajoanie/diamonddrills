import { describe, expect, it } from "vitest";
import { pickRandomSubset, shuffleArray, shuffleOptionOrder } from "./shuffle";

// Deterministic sequence for reproducible test assertions.
function sequenceRng(values: number[]): () => number {
  let i = 0;
  return () => values[i++ % values.length];
}

describe("shuffleArray", () => {
  it("returns an array with the same elements", () => {
    const result = shuffleArray([1, 2, 3, 4, 5], Math.random);
    expect(result.slice().sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it("does not mutate the input array", () => {
    const input = [1, 2, 3];
    const copy = [...input];
    shuffleArray(input, Math.random);
    expect(input).toEqual(copy);
  });

  it("is deterministic given a fixed rng", () => {
    const a = shuffleArray([1, 2, 3, 4], sequenceRng([0, 0, 0]));
    const b = shuffleArray([1, 2, 3, 4], sequenceRng([0, 0, 0]));
    expect(a).toEqual(b);
  });
});

describe("pickRandomSubset", () => {
  it("returns exactly `count` items when the pool is large enough", () => {
    const pool = Array.from({ length: 100 }, (_, i) => i);
    const subset = pickRandomSubset(pool, 33);
    expect(subset).toHaveLength(33);
    expect(new Set(subset).size).toBe(33); // no duplicates
  });

  it("returns all items (shuffled) when the pool is smaller than requested", () => {
    const pool = [1, 2, 3];
    const subset = pickRandomSubset(pool, 10);
    expect(subset).toHaveLength(3);
    expect(subset.slice().sort()).toEqual([1, 2, 3]);
  });

  it("returns an empty array for an empty pool", () => {
    expect(pickRandomSubset([], 5)).toEqual([]);
  });
});

describe("shuffleOptionOrder", () => {
  it("returns a permutation of exactly A, B, C, D", () => {
    const order = shuffleOptionOrder();
    expect(order.slice().sort()).toEqual(["A", "B", "C", "D"]);
    expect(order).toHaveLength(4);
  });
});
