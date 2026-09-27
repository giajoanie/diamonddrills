/**
 * Assembles a case study's Event Situation text from parts, matching the
 * DECA-standard closing boilerplate hand-written in the AAM sample batch
 * (case-study-seed-data.ts) verbatim, so every new event's cases share the
 * same voice without re-typing the closing paragraph by hand each time.
 */
export function buildSituation(params: {
  /** e.g. "the receiving associate" */
  role: string;
  /** e.g. "THREAD & CO." */
  company: string;
  /** e.g. "the store manager" — lowercase, no trailing "(judge)" */
  judgeRole: string;
  /** One or more paragraphs describing the problem and its context. */
  problem: string;
  /** One paragraph: what the judge wants the participant to do. */
  ask: string;
  /** Where the role-play takes place, e.g. "the stockroom office" */
  location: string;
  /** What the judge asks to hear, e.g. "to hear your plan" */
  greetingAsk: string;
}): string {
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return [
    `You are to assume the role of ${params.role} at ${params.company}. ${params.problem}`,
    params.ask,
    `You will present your ideas to ${params.judgeRole} (judge) in a role-play to take place in ${params.location}. ${cap(params.judgeRole)} (judge) will begin by greeting you and asking ${params.greetingAsk}. After you have presented your ideas and answered ${params.judgeRole}'s (judge's) questions, ${params.judgeRole} (judge) will conclude the role-play by thanking you for your work.`,
  ].join("\n\n");
}
