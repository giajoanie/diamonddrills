import type { CaseStudySeed, EventCaseStudySeed } from "./case-study-seed-data";

const FORMAT_LABEL: Record<EventCaseStudySeed["format"], string> = {
  PRINCIPLES: "Principles Event",
  SERIES: "Individual Series Event",
  TEAM_DECISION_MAKING: "Team Decision Making Event",
  PROFESSIONAL_SELLING_CONSULTING: "Professional Selling and Consulting Event",
  PERSONAL_FINANCIAL_LITERACY: "Personal Financial Literacy Event",
};

/**
 * Assembles one case study's full text, DECA-format (Participant
 * Instructions / Performance Indicators / Career Competencies / Event
 * Situation / judge-role notes), for storage in Resource.description and
 * display in CaseStudyDrawer's plain-text reader. Solution criteria and
 * Career Competencies are DECA-standard across every roleplay event (see
 * the AAM-26 sample), not event-specific, so they're constant here.
 */
export function formatCaseStudy(event: EventCaseStudySeed, caseStudy: CaseStudySeed): string {
  const lines: string[] = [];

  lines.push(`${event.eventName.toUpperCase()} — ${FORMAT_LABEL[event.format]}`);
  const meta = [
    `Career Cluster: ${event.careerCluster}`,
    ...(event.careerPathway ? [`Career Pathway: ${event.careerPathway}`] : []),
    `Instructional Area: ${caseStudy.instructionalArea}`,
  ];
  lines.push(meta.join(" | "));
  lines.push("");

  lines.push("PARTICIPANT INSTRUCTIONS");
  lines.push(
    `You have up to ${event.prepMinutes} minutes to review this event and prepare your presentation. ` +
      `You will have up to ${event.presentMinutes} minutes to present to the judge. You will be evaluated ` +
      "on your solution to the event situation, how you incorporate the performance indicators below, and " +
      "how you demonstrate the career competencies.",
  );
  lines.push("");

  lines.push("PERFORMANCE INDICATORS");
  caseStudy.performanceIndicators.forEach((pi, i) => {
    lines.push(`${i + 1}. ${pi.description} (${pi.code})`);
  });
  lines.push("");

  lines.push("SOLUTION");
  lines.push("- Unique – Demonstrate original thinking, fresh perspectives and an insightful approach.");
  lines.push("- Practical – Develop an actionable/viable solution in a real-world context.");
  lines.push("- Effective – Develop a solution that achieves relevant outcomes.");
  lines.push("");

  lines.push("CAREER COMPETENCIES");
  lines.push("- Critical Thinking – Think critically to understand and solve problems.");
  lines.push("- Communication – Communicate clearly, effectively and with reason.");
  lines.push("- Decision Making – Consider the impacts of decisions.");
  lines.push("");

  lines.push("EVENT SITUATION");
  lines.push(caseStudy.eventSituation);
  lines.push("");

  lines.push("FOR YOUR PRACTICE PARTNER (JUDGE ROLE)");
  lines.push(
    "Hand this section to whoever is judging your practice run — they should assume the counterpart " +
      "role described in the Event Situation above, not read it aloud as their own script.",
  );
  lines.push(
    "Begin the role-play by greeting the participant and asking to hear their ideas. During the " +
      "role-play, ask:",
  );
  lines.push(`1. ${caseStudy.judgeQuestions[0]}`);
  lines.push(`2. ${caseStudy.judgeQuestions[1]}`);
  lines.push(
    "Once the participant has presented their ideas and answered these questions, conclude the " +
      "role-play by thanking them for their work.",
  );

  return lines.join("\n");
}

/**
 * A short list-preview line for a formatted case study — its instructional
 * area, read back off the "Career Cluster: ... | Instructional Area: ..."
 * meta line formatCaseStudy() writes as line 2. Showing the raw first line
 * of the description instead (the event-name header, identical across
 * every case study for that event) told the student nothing useful in a
 * list of 20.
 */
export function getCaseStudyPreview(description: string): string | null {
  const metaLine = description.split("\n")[1];
  const match = metaLine?.match(/Instructional Area: (.+)$/);
  return match ? `Instructional area: ${match[1]}` : null;
}
