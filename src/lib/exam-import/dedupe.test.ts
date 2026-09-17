import { describe, expect, it } from "vitest";
import { normalizeStem } from "./dedupe";

describe("normalizeStem", () => {
  it("trims, lowercases, and collapses internal whitespace", () => {
    expect(normalizeStem("  What   is  the CAPITAL of France?  ")).toBe(
      "what is the capital of france?",
    );
  });

  it("treats a re-wrapped stem (different line breaks) as identical", () => {
    const a = normalizeStem("Luke, a product manager, is torn\nbetween using an attractive material");
    const b = normalizeStem("Luke, a product manager, is torn between using an attractive material");
    expect(a).toBe(b);
  });

  it("does not consider different questions equal", () => {
    expect(normalizeStem("What is 2+2?")).not.toBe(normalizeStem("What is 3+3?"));
  });
});
