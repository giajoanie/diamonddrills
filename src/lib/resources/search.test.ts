import { describe, expect, it } from "vitest";
import { matchesSearchQuery } from "./search";

describe("matchesSearchQuery", () => {
  it("matches on name, case-insensitively", () => {
    expect(matchesSearchQuery({ name: "Economics Study Guide", description: null }, "economics")).toBe(true);
  });

  it("matches on description when name doesn't match", () => {
    expect(
      matchesSearchQuery({ name: "Unit 3", description: "Covers supply and demand" }, "supply"),
    ).toBe(true);
  });

  it("returns false when neither field matches", () => {
    expect(matchesSearchQuery({ name: "Marketing Mix", description: "The 4 Ps" }, "finance")).toBe(false);
  });

  it("treats an empty or whitespace-only query as matching everything", () => {
    expect(matchesSearchQuery({ name: "Anything", description: null }, "")).toBe(true);
    expect(matchesSearchQuery({ name: "Anything", description: null }, "   ")).toBe(true);
  });

  it("handles a null description safely", () => {
    expect(matchesSearchQuery({ name: "Roleplay Rubric", description: null }, "rubric")).toBe(true);
  });
});
