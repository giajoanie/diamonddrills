import { describe, expect, it } from "vitest";
import { parseExamText } from "./parse-exam-text";

const SINGLE_COLUMN_EXAM = `
Marketing Cluster Exam
INSTRUCTIONS: This is a timed exam.

-- 1 of 2 --

2026 HS ICDC MARKETING CLUSTER EXAM 2
Copyright © 2026 by MBA Research and Curriculum Center®, Columbus, Ohio
1. Luke, a product manager, is torn between using an attractive material versus a recyclable one. Luke is
facing an ethical issue related to
A. safety of materials.
B. hazard warnings.
C. product size.
D. environmental impact.
2. Which of the following is an example of a post-sale opportunity:
A. Asking the customer what brings them into the store today
B. Thanking the customer for their purchase
C. Ensuring the order is processed successfully without any delay
D. Explaining the unique features of a product

-- 2 of 2 --

2026 HS ICDC MARKETING CLUSTER EXAM—KEY 1
Copyright © 2026 by MBA Research and Curriculum Center®, Columbus, Ohio
1. D
Environmental impact. Product managers must consider the impact that packaging will have on the earth.
SOURCE: PM:206 Explain the nature of corporate branding
SOURCE: LAP-PM-206—Corporate Identity (Nature of Corporate Branding)
2. B
Thanking the customer for their purchase. This is a simple post-sale opportunity.
SOURCE: SE:048 Close the sale
`;

const TWO_COLUMN_EXAM = `
2012 HS ICDC 	MARKETING CLUSTER EXAM 	1
1. A primary responsibility of administrative law is to
A. 	enforce agency regulations.
B. 	establish congressional/parliamentary committees.
C. 	interpret constitutional laws.
D. 	overturn lower courts' decisions.
2. What distribution method is best for a manufacturer to use when the product is complex?
A. 	Selective 	C. 	Exclusive
B. 	Intensive 	D. 	Invasive

2012 HS ICDC 	MARKETING CLUSTER EXAM—KEY 	2
1. A
Enforce agency regulations. Administrative law deals with the rules and regulations set by agencies.
SOURCE: 	BL:015
SOURCE: 	LAP-BL-015—Rule of Law
2. C
Exclusive. Exclusive distribution involves selling a product through just one middleman in a market.
SOURCE: 	CM:009
SOURCE: 	CM LAP 9—Pick One (Exclusive Distribution)
`;

// A real 2013 DECA exam PDF had a typo'd header on its first key page (it
// still said "EXAM" without "KEY"), so the parser must not rely on header
// text alone to find the body/key boundary.
const MISLABELED_KEY_HEADER_EXAM = `
2013 HS ICDC MARKETING CLUSTER EXAM 1
1. What type of debtor-creditor relationship involves the acquisition and use of credit cards?
A. Customary C. Voluntary
B. Unintentional D. Implied

2013 HS ICDC MARKETING CLUSTER EXAM 2
1. C
Voluntary. Both the debtor and creditor enter the relationship willingly.
SOURCE: BL:071
`;

describe("parseExamText — single-column layout", () => {
  const result = parseExamText(SINGLE_COLUMN_EXAM);

  it("parses both questions with all four options", () => {
    expect(result.questions).toHaveLength(2);
    expect(result.questions[0]).toMatchObject({
      numberInSource: 1,
      optionA: "safety of materials.",
      optionB: "hazard warnings.",
      optionC: "product size.",
      optionD: "environmental impact.",
      correctOption: "D",
      instructionalAreaCode: "PM",
    });
  });

  it("captures the explanation text", () => {
    expect(result.questions[0].explanation).toContain("Environmental impact");
  });

  it("reports no anomalies for a clean exam", () => {
    expect(result.anomalies).toHaveLength(0);
  });

  it("reports accurate match stats", () => {
    expect(result.stats).toMatchObject({ questionsFound: 2, keyEntriesFound: 2, matched: 2, missingKey: 0 });
  });
});

describe("parseExamText — two-column option layout", () => {
  const result = parseExamText(TWO_COLUMN_EXAM);

  it("parses four separate option lines (question 1)", () => {
    expect(result.questions[0]).toMatchObject({
      optionA: "enforce agency regulations.",
      optionB: "establish congressional/parliamentary committees.",
      optionC: "interpret constitutional laws.",
      optionD: "overturn lower courts' decisions.",
      correctOption: "A",
    });
  });

  it("parses combined two-column option lines (question 2)", () => {
    expect(result.questions[1]).toMatchObject({
      optionA: "Selective",
      optionB: "Intensive",
      optionC: "Exclusive",
      optionD: "Invasive",
      correctOption: "C",
    });
  });

  it("has no anomalies", () => {
    expect(result.anomalies).toHaveLength(0);
  });
});

describe("parseExamText — mislabeled key-section header", () => {
  it("still finds the key section via content structure, not header text", () => {
    const result = parseExamText(MISLABELED_KEY_HEADER_EXAM);
    expect(result.questions).toHaveLength(1);
    expect(result.questions[0].correctOption).toBe("C");
    expect(result.stats.missingKey).toBe(0);
  });
});

describe("parseExamText — missing key section", () => {
  it("flags an anomaly and returns no questions for unextractable/scanned PDFs", () => {
    const result = parseExamText("-- 1 of 34 --\n\n-- 2 of 34 --\n");
    expect(result.questions).toHaveLength(0);
    expect(result.anomalies[0]).toMatch(/no answer key section found/i);
  });
});

describe("parseExamText — mismatched question/key counts", () => {
  it("flags a question with no matching key entry", () => {
    const text = `
1. What is the capital of France?
A. Berlin
B. Paris
C. Madrid
D. Rome
2. What is 2+2?
A. 3
B. 4
C. 5
D. 6

1. B
Paris is the capital of France.
SOURCE: EC:001
`;
    const result = parseExamText(text);
    expect(result.stats.missingKey).toBe(1);
    expect(result.anomalies.some((a) => a.includes("Question 2"))).toBe(true);
  });
});
