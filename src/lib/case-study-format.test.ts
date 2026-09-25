import { describe, it, expect } from "vitest";
import { formatCaseStudy } from "./case-study-format";
import { CASE_STUDY_SEED } from "./case-study-seed-data";

describe("formatCaseStudy", () => {
  const event = CASE_STUDY_SEED[0];
  const caseStudy = event.cases[0];
  const text = formatCaseStudy(event, caseStudy);

  it("includes the event name, cluster, pathway, and instructional area", () => {
    expect(text).toContain(event.eventName.toUpperCase());
    expect(text).toContain(`Career Cluster: ${event.careerCluster}`);
    expect(text).toContain(`Career Pathway: ${event.careerPathway}`);
    expect(text).toContain(`Instructional Area: ${caseStudy.instructionalArea}`);
  });

  it("lists every performance indicator with its code", () => {
    for (const pi of caseStudy.performanceIndicators) {
      expect(text).toContain(pi.description);
      expect(text).toContain(pi.code);
    }
  });

  it("includes the standard Solution and Career Competency criteria", () => {
    expect(text).toContain("Unique");
    expect(text).toContain("Practical");
    expect(text).toContain("Effective");
    expect(text).toContain("Critical Thinking");
    expect(text).toContain("Communication");
    expect(text).toContain("Decision Making");
  });

  it("includes the event situation and both judge questions", () => {
    expect(text).toContain(caseStudy.eventSituation);
    expect(text).toContain(caseStudy.judgeQuestions[0]);
    expect(text).toContain(caseStudy.judgeQuestions[1]);
  });

  it("every SERIES-format case study lists exactly 5 performance indicators", () => {
    for (const eventSeed of CASE_STUDY_SEED) {
      if (eventSeed.format !== "SERIES") continue;
      for (const c of eventSeed.cases) {
        expect(c.performanceIndicators).toHaveLength(5);
      }
    }
  });
});
