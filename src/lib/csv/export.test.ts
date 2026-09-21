import { describe, expect, it } from "vitest";
import { toCsv, buildAnonymousIdMap } from "./export";

describe("toCsv", () => {
  it("renders a header row and data rows in column order", () => {
    const csv = toCsv(["name", "score"], [{ name: "Ada", score: 95 }, { name: "Grace", score: 88 }]);
    expect(csv).toBe("name,score\r\nAda,95\r\nGrace,88");
  });

  it("quotes fields containing commas", () => {
    const csv = toCsv(["name"], [{ name: "Smith, Jane" }]);
    expect(csv).toBe('name\r\n"Smith, Jane"');
  });

  it("doubles internal quotes and wraps the field in quotes", () => {
    const csv = toCsv(["note"], [{ note: 'She said "hi"' }]);
    expect(csv).toBe('note\r\n"She said ""hi"""');
  });

  it("quotes fields containing newlines", () => {
    const csv = toCsv(["note"], [{ note: "line one\nline two" }]);
    expect(csv).toBe('note\r\n"line one\nline two"');
  });

  it("renders null/undefined as an empty field", () => {
    const csv = toCsv(["name", "score"], [{ name: "Ada", score: null }]);
    expect(csv).toBe("name,score\r\nAda,");
  });

  it("produces just the header with no rows", () => {
    expect(toCsv(["a", "b"], [])).toBe("a,b");
  });

  it("neutralizes a leading formula character in a string field", () => {
    expect(toCsv(["note"], [{ note: "=cmd|'/c calc'!A1" }])).toBe("note\r\n'=cmd|'/c calc'!A1");
    expect(toCsv(["note"], [{ note: "+1" }])).toBe("note\r\n'+1");
    expect(toCsv(["note"], [{ note: "@SUM(A1)" }])).toBe("note\r\n'@SUM(A1)");
  });

  it("does not mangle a legitimately negative number", () => {
    expect(toCsv(["change"], [{ change: -5 }])).toBe("change\r\n-5");
  });

  it("applies the same guard to any string starting with a formula character, even if not a real formula", () => {
    // A deliberate tradeoff: spreadsheet software can't tell a real formula
    // from ordinary text starting with =/+/-/@ either, so this errs safe.
    expect(toCsv(["note"], [{ note: "-5 points this week" }])).toBe("note\r\n'-5 points this week");
  });
});

describe("buildAnonymousIdMap", () => {
  it("assigns sequential, prefixed labels in first-seen order", () => {
    const map = buildAnonymousIdMap(["u3", "u1", "u3", "u2"], "STU");
    expect(map.get("u3")).toBe("STU-0001");
    expect(map.get("u1")).toBe("STU-0002");
    expect(map.get("u2")).toBe("STU-0003");
  });

  it("pads to four digits", () => {
    const map = buildAnonymousIdMap(["a"], "STU");
    expect(map.get("a")).toBe("STU-0001");
  });

  it("is empty for no ids", () => {
    expect(buildAnonymousIdMap([], "STU").size).toBe(0);
  });
});
