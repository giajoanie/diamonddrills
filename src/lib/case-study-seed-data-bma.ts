/**
 * Business Management and Administration cluster case studies for the 3
 * roleplay events in this cluster. Performance indicators are pulled
 * verbatim from this app's own seeded PerformanceIndicator rows (Cluster +
 * Pathway tier for the Series/TDM events; Core tier for the Principles
 * event — see getPerformanceIndicatorsForEvent and case-study-seed-data.ts).
 */
import { buildSituation } from "./case-study-scenario-builder";
import type { CaseStudySeed, EventCaseStudySeed } from "./case-study-seed-data";

// ---------------------------------------------------------------------------
// human-resources-management-series (SERIES, Human Resources Management pathway)
// ---------------------------------------------------------------------------
const HRM_CASES: CaseStudySeed[] = [
  {
    title: "A Broken Hiring Process at Brightline Manufacturing Co.",
    instructionalArea: "Human Resources Management",
    performanceIndicators: [
      { code: "HR:413", description: "Explain human resources management functions" },
      { code: "HR:415", description: "Discuss factors that impact human resources management (e.g., availability of qualified employees, alternative staffing methods, employment laws/regulations, company policies/procedures, compensation and benefit programs, staff diversity, etc.)" },
      { code: "HR:416", description: "Describe planning techniques used in the hiring process (e.g., succession planning, forecasting)" },
      { code: "HR:423", description: "Administer and interpret employee selection tests" },
      { code: "HR:426", description: "Explain contingency factors affecting job offer (e.g., background checks, drug tests, physical results, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "Two recent hires fell through after verbal offers, one over a failed background check that should have been run earlier, and the other because BRIGHTLINE never explained the contingencies clearly, leaving the candidate confused and frustrated enough to walk away.",
      ask:
        "The HR director (judge) wants you to identify what's breaking down in the hiring process and propose a clearer sequence, including how contingencies should be communicated.",
      location: "the HR department conference room",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "At what point should the background check have happened in this process?",
      "How would you communicate job-offer contingencies so candidates aren't caught off guard?",
    ],
  },
  {
    title: "Relocating an Engineer Overseas at Brightline Manufacturing Co.",
    instructionalArea: "Human Resources Management",
    performanceIndicators: [
      { code: "HR:431", description: "Perform post-employment offer activities" },
      { code: "HR:432", description: "Explain the use of employment contracts" },
      { code: "HR:433", description: "Explain standard relocation practices" },
      { code: "HR:434", description: "Assist with employee relocation" },
      { code: "HR:435", description: "Describe expatriation and repatriation issues and practices" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "BRIGHTLINE just offered a senior engineer a two-year assignment leading a new overseas plant, and the HR director (judge) has never managed a full international relocation before, worried about missing something in the contract or the return process at the end of the assignment.",
      ask:
        "The HR director (judge) wants you to walk through what this relocation should include, from the employment contract through eventual repatriation.",
      location: "the HR department conference room",
      greetingAsk: "to hear your relocation plan",
    }),
    judgeQuestions: [
      "What should this employment contract specifically address for an international assignment?",
      "What repatriation issue is most commonly overlooked when the assignment ends?",
    ],
  },
  {
    title: "Building a New Forklift Certification Program at Brightline Manufacturing Co.",
    instructionalArea: "Human Resources Management",
    performanceIndicators: [
      { code: "HR:438", description: "Assess employee skills" },
      { code: "HR:439", description: "Conduct task/process analysis" },
      { code: "HR:440", description: "Assess company's learning needs" },
      { code: "HR:441", description: "Write training activities" },
      { code: "HR:442", description: "Select experts for employee development" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "A recent safety audit found several warehouse staff operating forklifts without current certification, and the HR director (judge) needs a real training program built, not just a one-time refresher, before operations resume at full capacity.",
      ask:
        "The HR director (judge) wants you to assess what's needed and design a training program, including who should lead it.",
      location: "the HR department conference room",
      greetingAsk: "to hear your training plan",
    }),
    judgeQuestions: [
      "How would you assess which employees actually need this certification first?",
      "Who would you select to lead this training, internal staff or an outside expert?",
    ],
  },
  {
    title: "An Underperforming Leadership Training Rollout at Brightline Manufacturing Co.",
    instructionalArea: "Human Resources Management",
    performanceIndicators: [
      { code: "HR:443", description: "Conduct gap and/or needs analysis to identify human-resources development needs" },
      { code: "HR:444", description: "Determine issues impacting human-resources development (e.g., organizational culture and policies, societal norms, etc.)" },
      { code: "HR:445", description: "Apply human-resources development theories" },
      { code: "HR:446", description: "Implement employee-development program" },
      { code: "HR:450", description: "Assess effectiveness of employee-relations activities" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "A new leadership-development program for shift supervisors rolled out six months ago, but attendance has dropped off and supervisors say in exit surveys it doesn't address problems they actually face on the floor.",
      ask:
        "The HR director (judge) wants you to conduct a gap analysis of what went wrong and propose how to fix the program going forward.",
      location: "the HR department conference room",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What's the gap between what this program teaches and what supervisors actually need?",
      "How would you measure whether your fix is actually working?",
    ],
  },
  {
    title: "A Layoff Raises a Workplace Diversity Concern at Brightline Manufacturing Co.",
    instructionalArea: "Human Resources Management",
    performanceIndicators: [
      { code: "HR:452", description: "Explain labor-relations issues" },
      { code: "HR:453", description: "Describe out-placement procedures and activities used in layoffs" },
      { code: "HR:454", description: "Document employee issues (e.g., reasonable suspicion, harassment, attendance) and recommend solutions" },
      { code: "HR:460", description: "Assist with establishment of work rules" },
      { code: "HR:515", description: "Discuss issues associated with workplace diversity (e.g., ethnic, generational, religious, gender)" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "A round of layoffs is planned for one department, and the HR director (judge) has noticed the proposed list disproportionately affects one demographic group, raising a concern that needs to be addressed before anything is finalized.",
      ask:
        "The HR director (judge) wants you to review this concern, recommend how the layoff selection and out-placement support should be handled fairly, and document the process.",
      location: "the HR department conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What would you check to make sure this layoff selection is actually fair and defensible?",
      "What out-placement support should be offered to affected employees?",
    ],
  },
  {
    title: "Redesigning the Benefits Package at Brightline Manufacturing Co.",
    instructionalArea: "Human Resources Management",
    performanceIndicators: [
      { code: "HR:465", description: "Explain payroll functions" },
      { code: "HR:467", description: "Explain components of total rewards system" },
      { code: "HR:469", description: "Discuss the nature of executive compensation" },
      { code: "HR:472", description: "Identify emerging compensation issues" },
      { code: "HR:475", description: "Explain the nature of benefit plans (e.g., health insurance, life insurance, educational assistance, health club membership, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "Exit interviews keep citing the benefits package as a reason employees leave for competitors, and the HR director (judge) wants a redesigned total rewards package that's competitive without blowing the budget, all while keeping pay equity questions from becoming a bigger issue.",
      ask:
        "The HR director (judge) wants you to propose changes to the benefits package and total rewards system that address this turnover driver.",
      location: "the HR department conference room",
      greetingAsk: "to hear your proposal",
    }),
    judgeQuestions: [
      "What's one specific benefit you'd change first, and why?",
      "What emerging compensation issue should we be watching as we redesign this?",
    ],
  },
  {
    title: "Launching a Wellness Program at Brightline Manufacturing Co.",
    instructionalArea: "Human Resources Management",
    performanceIndicators: [
      { code: "HR:476", description: "Explain the nature of retirement plans" },
      { code: "HR:477", description: "Conduct benefits need assessment" },
      { code: "HR:480", description: "Explain methods that can be used to analyze total rewards programs" },
      { code: "HR:482", description: "Explain the nature of fitness/wellness programs offered by businesses" },
      { code: "HR:483", description: "Assess company's employee fitness/wellness program" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "Leadership approved a modest budget for an employee wellness program after rising health-insurance claims, but the HR director (judge) has no needs assessment yet to know what employees would actually use, worried about spending on something like a gym discount few people redeem.",
      ask:
        "The HR director (judge) wants you to conduct a needs assessment approach and recommend a wellness program likely to get real use.",
      location: "the HR department conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "How would you find out what employees would actually use before committing this budget?",
      "How would you measure whether this program is worth continuing next year?",
    ],
  },
  {
    title: "A Weak Applicant Pipeline at Brightline Manufacturing Co.",
    instructionalArea: "Human Resources Management",
    performanceIndicators: [
      { code: "HR:485", description: "Evaluate effectiveness of company's injury/occupational illness prevention programs" },
      { code: "HR:487", description: "Explain the nature of organizational development" },
      { code: "HR:522", description: "Explain assessment methods used in the hiring process" },
      { code: "HR:523", description: "Track job applicants" },
      { code: "HR:527", description: "Determine learning objectives" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "Open machinist positions have sat unfilled for months, and the HR director (judge) suspects the assessment methods used to screen applicants are filtering out qualified candidates before anyone even sees a resume.",
      ask:
        "The HR director (judge) wants you to review how applicants are currently being tracked and assessed and recommend changes to fix this pipeline.",
      location: "the HR department conference room",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What in our current assessment methods might be filtering out good candidates?",
      "How would you track applicants better to catch a problem like this sooner?",
    ],
  },
  {
    title: "Designing a New Onboarding Module at Brightline Manufacturing Co.",
    instructionalArea: "Human Resources Management",
    performanceIndicators: [
      { code: "HR:528", description: "Choose learning methods" },
      { code: "HR:529", description: "Prepare a training plan" },
      { code: "HR:530", description: "Design a learning module" },
      { code: "HR:531", description: "Facilitate employee learning" },
      { code: "HR:532", description: "Evaluate learning" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "New hires currently get a single long orientation day covering everything from safety rules to benefits enrollment, and the HR director (judge) has noticed most of it doesn't stick, with new employees asking questions weeks later about things covered on day one.",
      ask:
        "The HR director (judge) wants you to design a better onboarding module, including how learning would be evaluated afterward.",
      location: "the HR department conference room",
      greetingAsk: "to hear your onboarding design",
    }),
    judgeQuestions: [
      "What learning method would work better than a single long orientation day?",
      "How would you evaluate whether new hires actually retained this information?",
    ],
  },
  {
    title: "Managing HR Through a Department Reorganization at Brightline Manufacturing Co.",
    instructionalArea: "Human Resources Management",
    performanceIndicators: [
      { code: "HR:543", description: "Describe talent management issues associated with organizational changes (e.g., right-sizing, downsizing, talent relocation, organizational restructuring or redesign)" },
      { code: "HR:547", description: "Manage flexible work arrangements" },
      { code: "HR:548", description: "Administer leave management procedures" },
      { code: "HR:549", description: "Administer employee fitness/wellness programs" },
      { code: "HR:550", description: "Arrange pension/retirement benefits for employees" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "Two departments are merging under a company reorganization, and several affected employees have questions piling up about their flexible work arrangements, ongoing medical leave, and retirement benefits that no one has clear answers for yet.",
      ask:
        "The HR director (judge) wants you to identify the talent-management issues this reorganization raises and propose how to communicate answers to affected employees.",
      location: "the HR department conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What talent-management risk does this reorganization create if it's handled poorly?",
      "How would you communicate answers to employees whose leave or benefits questions are still pending?",
    ],
  },
  {
    title: "A Workplace Injury Investigation at Brightline Manufacturing Co.",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:212", description: "Describe general health and safety practices monitored and assessed by human resources management" },
      { code: "OP:213", description: "Discuss the nature of incident and emergency response plans" },
      { code: "OP:214", description: "Describe the nature of employee-assistance programs" },
      { code: "OP:223", description: "Identify potential workplace violence conditions" },
      { code: "OP:317", description: "Recommend an emergency response plan" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "An employee was injured on the production line last week, and the HR director (judge) wants to review whether the current emergency response plan and safety practices are adequate before OSHA's follow-up visit next week.",
      ask:
        "The HR director (judge) wants you to review the incident and recommend improvements to the emergency response plan and related employee support.",
      location: "the HR department conference room",
      greetingAsk: "to hear your review",
    }),
    judgeQuestions: [
      "What gap in the current emergency response plan does this incident reveal?",
      "What support should be offered to the injured employee and their coworkers who witnessed it?",
    ],
  },
  {
    title: "Recommending a New Security Plan After a Break-In at Brightline Manufacturing Co.",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:318", description: "Recommend an incidence response plan" },
      { code: "OP:320", description: "Recommend a security plan for a business" },
      { code: "OP:481", description: "Conduct an accident investigation" },
      { code: "OP:482", description: "Monitor drug and alcohol testing" },
      { code: "OP:483", description: "Identify opportunities to “green” the workplace" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "A break-in at the loading dock over the weekend has the HR director (judge) reviewing overall workplace security, and separately, a supervisor has flagged a pattern that suggests the plant's drug-testing program may not be catching what it should.",
      ask:
        "The HR director (judge) wants you to recommend an updated security plan and review whether the drug-testing program needs changes.",
      location: "the HR department conference room",
      greetingAsk: "to hear your recommendations",
    }),
    judgeQuestions: [
      "What would you recommend to improve security after this break-in?",
      "What would you check about the current drug-testing program's coverage?",
    ],
  },
  {
    title: "A Data Security Concern in the HR System at Brightline Manufacturing Co.",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:517", description: "Comply with strategies for protecting business' digital assets (e.g., website, social media, email, etc.)" },
      { code: "OP:518", description: "Comply with strategies to protect digital customer data (e.g., information about customers, customers' credit-card numbers, passwords, customer transactions)" },
      { code: "OP:241", description: "Maintain vendor/supplier relationships" },
      { code: "OP:337", description: "Negotiate terms with vendors in business" },
      { code: "OP:339", description: "Discuss legal considerations in operations" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "The vendor that hosts BRIGHTLINE's employee records system just disclosed a security vulnerability, and the HR director (judge) needs to know how exposed employee data actually is and what to demand from the vendor going forward.",
      ask:
        "The HR director (judge) wants you to assess this security concern and recommend how to handle the vendor relationship and any legal considerations.",
      location: "the HR department conference room",
      greetingAsk: "to hear your assessment",
    }),
    judgeQuestions: [
      "What should we be asking this vendor before trusting them with employee data again?",
      "What legal consideration matters most here if employee data was actually exposed?",
    ],
  },
  {
    title: "Choosing a New HRIS Platform at Brightline Manufacturing Co.",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:159", description: "Explain the nature of a human resource information system (HRIS)" },
      { code: "NF:160", description: "Capture and store data in a human resource information system (HRIS)" },
      { code: "NF:161", description: "Mine data in human resource information system" },
      { code: "NF:264", description: "Adhere to data change best practices" },
      { code: "NF:275", description: "Explain trends in human resources management" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "BRIGHTLINE's current employee records system is a mix of spreadsheets and an outdated database, and the HR director (judge) wants to move to a real HRIS platform but isn't sure what to look for or how data would actually migrate over.",
      ask:
        "The HR director (judge) wants you to explain what a proper HRIS should provide and how data should be captured and migrated safely.",
      location: "the HR department conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What should we look for in an HRIS beyond just replacing our spreadsheets?",
      "What best practice would you follow when migrating existing employee data over?",
    ],
  },
  {
    title: "Diagnosing High Turnover with Real Data at Brightline Manufacturing Co.",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:265", description: "Explain the nature of a learning management system (LMS)" },
      { code: "NF:266", description: "Capture and store data in a learning management system (LMS)" },
      { code: "NF:267", description: "Mine data in learning management systems" },
      { code: "NF:276", description: "Determine turnover rate and its causes" },
      { code: "NF:277", description: "Identify and report factors negatively impacting productivity" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "Turnover on the second shift has been noticeably higher than other shifts for two quarters, and the HR director (judge) has only anecdotes about why, not real data connecting it to training completion, scheduling, or something else.",
      ask:
        "The HR director (judge) wants you to determine the actual turnover rate for this shift and identify likely causes using available data, including anything from the learning management system.",
      location: "the HR department conference room",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What data would help confirm the real cause of this shift's turnover?",
      "How might the learning management system's data connect to this pattern?",
    ],
  },
  {
    title: "Onboarding Paperwork Errors at Brightline Manufacturing Co.",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:269", description: "Verify new hire's employment eligibility" },
      { code: "NF:270", description: "Process immigration-related records" },
      { code: "NF:271", description: "Administer worker's compensation claim" },
      { code: "NF:272", description: "Process OSHA documentation" },
      { code: "NF:273", description: "Complete new hire documentation and reporting" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "An audit found incomplete employment-eligibility verification on three recent new hires and a workers' compensation claim that was filed weeks late because no one flagged it promptly, worrying the HR director (judge) about compliance exposure.",
      ask:
        "The HR director (judge) wants you to identify what's breaking down in new hire documentation and propose a checklist to prevent it from happening again.",
      location: "the HR department conference room",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What's the compliance risk of incomplete eligibility verification like this?",
      "What would you build into a checklist to catch this before it becomes a pattern?",
    ],
  },
  {
    title: "A Wrongful-Termination Claim at Brightline Manufacturing Co.",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:119", description: "Explain unfair labor practices" },
      { code: "BL:120", description: "Comply with compensation and benefit laws" },
      { code: "BL:159", description: "Describe factors affecting the settlement of legal matters" },
      { code: "BL:160", description: "Describe the litigation process" },
      { code: "BL:161", description: "Discuss the arbitration/mediation process" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "A recently terminated employee has filed a wrongful-termination claim alleging retaliation, and the HR director (judge) needs to understand the company's exposure and options before deciding how to respond.",
      ask:
        "The HR director (judge) wants you to explain the relevant legal considerations and recommend whether to pursue settlement, mediation, or prepare for litigation.",
      location: "the HR department conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What factors would push us toward settlement versus preparing for litigation here?",
      "What would mediation actually look like in a case like this?",
    ],
  },
  {
    title: "A Wage-and-Hour Compliance Audit at Brightline Manufacturing Co.",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:120", description: "Comply with compensation and benefit laws" },
      { code: "BL:119", description: "Explain unfair labor practices" },
      { code: "BL:159", description: "Describe factors affecting the settlement of legal matters" },
      { code: "BL:160", description: "Describe the litigation process" },
      { code: "BL:161", description: "Discuss the arbitration/mediation process" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "A routine wage-and-hour audit found several hourly employees weren't paid correctly for overtime over the past year, and the HR director (judge) needs to understand the company's legal obligations before deciding how to fix it.",
      ask:
        "The HR director (judge) wants you to explain the compliance obligations here and recommend how to correct the pay issue and reduce future legal exposure.",
      location: "the HR department conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What are our obligations once we've identified this kind of pay error?",
      "How would you prevent this same audit finding from happening again?",
    ],
  },
  {
    title: "Writing the Quarterly HR Analytics Report at Brightline Manufacturing Co.",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:185", description: "Write analytical reports (i.e., reports that examine a problem/issue and recommend an action)" },
      { code: "CO:186", description: "Write research reports" },
      { code: "CO:187", description: "Maintain confidentiality in dealing with personnel" },
      { code: "CO:188", description: "Describe elements of a human resources management's communications program" },
      { code: "CO:210", description: "Repurpose content for social media" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "The HR director (judge) needs a quarterly analytics report for the executive team covering hiring, turnover, and training metrics, but past reports have been dense data dumps that executives skim past without acting on.",
      ask:
        "The HR director (judge) wants you to draft a clearer analytical report that actually recommends action, while being careful about what personnel information is appropriate to share.",
      location: "the HR department conference room",
      greetingAsk: "to hear your draft",
    }),
    judgeQuestions: [
      "What makes an analytical report different from a data dump executives will skim past?",
      "What personnel information should stay out of a report like this?",
    ],
  },
  {
    title: "Getting HR a Seat at the Strategic Planning Table at Brightline Manufacturing Co.",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "SM:050", description: "Explain how human resources management participates in a company's strategic planning process" },
      { code: "SM:063", description: "Discuss the nature of managerial planning" },
      { code: "SM:064", description: "Explain managerial considerations in organizing" },
      { code: "SM:065", description: "Describe managerial considerations in staffing" },
      { code: "SM:066", description: "Discuss managerial considerations in directing" },
    ],
    eventSituation: buildSituation({
      role: "the HR associate",
      company: "BRIGHTLINE MANUFACTURING CO.",
      judgeRole: "the HR director",
      problem:
        "Executive leadership is finalizing a three-year strategic plan without much HR input beyond a headcount number, and the HR director (judge) believes HR should be shaping staffing and organizational decisions much earlier in this process, not just executing on them afterward.",
      ask:
        "The HR director (judge) wants you to make the case for HR's role in strategic planning and outline what HR should be contributing to this plan.",
      location: "the HR department conference room",
      greetingAsk: "to hear your case for this",
    }),
    judgeQuestions: [
      "What should HR be contributing to this strategic plan beyond a headcount number?",
      "How would you make this case to executives who see HR as purely administrative?",
    ],
  },
];

const HRM_EVENT: EventCaseStudySeed = {
  eventSlug: "human-resources-management-series",
  eventName: "Human Resources Management Series",
  careerCluster: "Business Management and Administration",
  careerPathway: "Human Resources Management",
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: HRM_CASES,
};

// ---------------------------------------------------------------------------
// principles-of-business-management-and-administration (PRINCIPLES, Core PIs)
// ---------------------------------------------------------------------------
const POBMA_CASES: CaseStudySeed[] = [
  {
    title: "Planning a Small Shop Renovation at Riverside Print & Frame Shop",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:001", description: "Develop project plan" },
      { code: "OP:002", description: "Apply project-management tools to monitor and communicate project progress" },
      { code: "OP:003", description: "Identify resources needed for project" },
      { code: "OP:519", description: "Plan project" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "The owner (judge) wants to renovate the shop's front counter area over a slow week but has only a rough idea in their head, no written plan, no list of what's needed, and no way to track whether it's on schedule once it starts.",
      ask:
        "The owner (judge) wants you to help build a basic project plan for this renovation, including what resources it will need.",
      location: "the shop's back workroom",
      greetingAsk: "to hear your project plan",
    }),
    judgeQuestions: [
      "What belongs in a basic project plan that we don't have written down yet?",
      "How would you track whether this renovation is staying on schedule?",
    ],
  },
  {
    title: "A Safety Concern After a Minor Cut at Riverside Print & Frame Shop",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:004", description: "Describe health and safety regulations in business" },
      { code: "OP:006", description: "Follow instructions for use of equipment, tools, and machinery" },
      { code: "OP:007", description: "Follow safety precautions" },
      { code: "OP:008", description: "Maintain a safe work environment" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "A coworker got a minor cut using the mat cutter without following the guard instructions, and the owner (judge) wants to review how equipment safety is actually being handled on the shop floor before it happens again with a worse outcome.",
      ask:
        "The owner (judge) wants you to review current equipment-use habits and propose how to reinforce safety precautions with the team.",
      location: "the shop's back workroom",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What likely went wrong in how this equipment was being used?",
      "How would you reinforce safety precautions without it feeling like a lecture?",
    ],
  },
  {
    title: "No Emergency Plan at Riverside Print & Frame Shop",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:009", description: "Explain procedures for handling accidents" },
      { code: "OP:010", description: "Handle and report emergency situations" },
      { code: "OP:013", description: "Explain routine security precautions" },
      { code: "OP:152", description: "Follow established security procedures/policies" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "During a fire drill at the strip mall the shop is in, the owner (judge) realized RIVERSIDE has no actual written plan for what staff should do in an emergency, from a fire to a break-in after hours.",
      ask:
        "The owner (judge) wants you to help draft basic emergency and security procedures the team can actually follow.",
      location: "the shop's back workroom",
      greetingAsk: "to hear your draft procedures",
    }),
    judgeQuestions: [
      "What should be the very first step in this shop's emergency procedure?",
      "What routine security precaution are we currently missing?",
    ],
  },
  {
    title: "Choosing a New Frame Supplier at Riverside Print & Frame Shop",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:015", description: "Explain the nature and scope of purchasing" },
      { code: "OP:160", description: "Manage the bid process in purchasing" },
      { code: "OP:161", description: "Select vendors" },
      { code: "OP:162", description: "Evaluate vendor performance" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "RIVERSIDE's current frame-molding supplier has raised prices twice this year, and the owner (judge) is considering two other suppliers but has never formally compared vendors before beyond just picking based on price alone.",
      ask:
        "The owner (judge) wants you to help evaluate these vendor options and recommend which one to choose.",
      location: "the shop's back workroom",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What besides price should factor into choosing between these vendors?",
      "How would you evaluate whether a new vendor is actually performing well after we switch?",
    ],
  },
  {
    title: "A Quality Problem with Recent Print Jobs at Riverside Print & Frame Shop",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:017", description: "Explain the concept of production" },
      { code: "OP:019", description: "Describe crucial elements of a quality culture" },
      { code: "OP:163", description: "Identify quality-control measures" },
      { code: "OP:164", description: "Utilize quality control methods at work" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "Two customers this month picked up prints with visible color mismatches that should have been caught before handing over the order, and the owner (judge) realizes there's no consistent quality check before an order leaves the shop.",
      ask:
        "The owner (judge) wants you to propose a simple quality-control step the team can build into every order before it leaves the shop.",
      location: "the shop's back workroom",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What quality check would have caught this color mismatch before the customer saw it?",
      "How do we build this into the process without slowing every order down significantly?",
    ],
  },
  {
    title: "Getting the Team Organized During the Holiday Rush at Riverside Print & Frame Shop",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:025", description: "Explain employee's role in expense control" },
      { code: "OP:196", description: "Coordinate activities with those of other departments" },
      { code: "OP:228", description: "Organize and prioritize work" },
      { code: "OP:230", description: "Coordinate work with that of team members" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "The holiday rush is starting, and last year orders got backed up because the print station and the framing station weren't coordinating on which orders were most urgent, with some staff also over-ordering supplies out of panic.",
      ask:
        "The owner (judge) wants you to propose how the team should organize and prioritize work this year to avoid the same backup, while being mindful of costs.",
      location: "the shop's back workroom",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "How would you decide which orders get priority when things get busy?",
      "How would you keep the print and framing stations coordinated this year?",
    ],
  },
  {
    title: "Assessing the Risk of a New Weekend Workshop at Riverside Print & Frame Shop",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "SM:001", description: "Explain the concept of management" },
      { code: "SM:075", description: "Explain the nature of risk management" },
      { code: "SM:076", description: "Conduct a risk assessment of an event" },
      { code: "SM:100", description: "Explain factors that affect management" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "The owner (judge) is considering hosting a weekend framing workshop for customers, using shop tools and materials, but hasn't thought through what could go wrong with letting customers use equipment themselves.",
      ask:
        "The owner (judge) wants you to conduct a basic risk assessment of this workshop idea before deciding whether to move forward.",
      location: "the shop's back workroom",
      greetingAsk: "to hear your risk assessment",
    }),
    judgeQuestions: [
      "What's the biggest risk you'd flag with letting customers use shop equipment themselves?",
      "Would you recommend moving forward with this workshop, and if so, with what safeguards?",
    ],
  },
  {
    title: "Onboarding the Shop's First New Hire in Two Years at Riverside Print & Frame Shop",
    instructionalArea: "Human Resources Management",
    performanceIndicators: [
      { code: "HR:360", description: "Orient new employees" },
      { code: "HR:410", description: "Discuss the nature of human resources management" },
      { code: "HR:411", description: "Explain the role of ethics in human resources management" },
      { code: "HR:412", description: "Describe the use of technology in human resources management" },
    ],
    eventSituation: buildSituation({
      role: "a senior part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "RIVERSIDE is hiring its first new employee in two years, and the owner (judge) has never had a real onboarding process, previously just having new hires \"shadow someone for a day.\"",
      ask:
        "The owner (judge) wants you to help design a simple, fair onboarding plan for this new hire.",
      location: "the shop's back workroom",
      greetingAsk: "to hear your onboarding plan",
    }),
    judgeQuestions: [
      "What should day one actually cover for a new hire here?",
      "What ethical consideration matters most in how we bring on and treat a new employee?",
    ],
  },
  {
    title: "Deciding What Career Path Fits at Riverside Print & Frame Shop",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:002", description: "Maintain appropriate personal appearance" },
      { code: "PD:009", description: "Demonstrate systematic behavior" },
      { code: "PD:013", description: "Assess personal interests and skills needed for success in business" },
      { code: "PD:017", description: "Make decisions" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "During a quiet afternoon, the owner (judge) asks what you're thinking about doing after school, since you've picked up the shop's systems quickly and seem to have a knack for organizing the workflow here.",
      ask:
        "The owner (judge) wants an honest, thoughtful answer about how you're assessing your own interests and skills as you think about this decision.",
      location: "the shop's back workroom",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What skills have you noticed in yourself working here that might point toward a career direction?",
      "How are you approaching a decision this big?",
    ],
  },
  {
    title: "Balancing School and Shifts at Riverside Print & Frame Shop",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:018", description: "Set personal goals" },
      { code: "PD:019", description: "Use time-management skills" },
      { code: "PD:020", description: "Analyze employer expectations in the business environment" },
      { code: "PD:021", description: "Explain the rights of workers" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "You're a full-time student balancing shifts at RIVERSIDE, and the owner (judge) has noticed you seem stretched thin and wants to talk through a schedule that works for both the shop's needs and yours.",
      ask:
        "The owner (judge) wants you to talk through your goals and time-management approach, and to understand what's fair for each of you as employer and employee.",
      location: "the shop's back workroom",
      greetingAsk: "to talk through your schedule",
    }),
    judgeQuestions: [
      "What time-management approach would help you balance school and shifts better?",
      "What do you think is a fair expectation for each of us in this working relationship?",
    ],
  },
  {
    title: "Preparing for a Job Interview at Riverside Print & Frame Shop",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:023", description: "Identify tentative occupational interest" },
      { code: "PD:025", description: "Explain employment opportunities in business" },
      { code: "PD:026", description: "Utilize job-search strategies" },
      { code: "PD:028", description: "Interview for a job" },
    ],
    eventSituation: buildSituation({
      role: "an applicant",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "You're applying for an open position at RIVERSIDE, and the owner (judge) wants to conduct a real interview rather than just a casual chat, since the shop has been burned before by hiring someone who wasn't actually a good fit.",
      ask:
        "The owner (judge) wants you to walk through why you're interested in this role and what you'd bring to it.",
      location: "the shop's back workroom",
      greetingAsk: "to begin the interview",
    }),
    judgeQuestions: [
      "What about this specific job interests you, beyond just needing a paycheck?",
      "What would you bring to this role that another applicant might not?",
    ],
  },
  {
    title: "Writing a Resume for Retail Experience at Riverside Print & Frame Shop",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:029", description: "Write a follow-up letter after job interviews" },
      { code: "PD:030", description: "Write a cover letter" },
      { code: "PD:031", description: "Prepare a resume" },
      { code: "PD:032", description: "Describe techniques for obtaining work experience (e.g., volunteer activities, internships)" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "You're applying for a summer internship at a design studio and want feedback on how to describe your experience at RIVERSIDE on your resume and cover letter, since it's your only real work experience so far.",
      ask:
        "The owner (judge) wants to hear how you'd frame your time here to a different kind of employer.",
      location: "the shop's back workroom",
      greetingAsk: "to hear how you'd describe this experience",
    }),
    judgeQuestions: [
      "How would you frame your experience here in a way that's relevant to a design studio?",
      "What would you include in a follow-up letter after that internship interview?",
    ],
  },
  {
    title: "Networking Toward a Future Career at Riverside Print & Frame Shop",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:034", description: "Explain possible advancement patterns for jobs" },
      { code: "PD:035", description: "Identify skills needed to enhance career progression" },
      { code: "PD:036", description: "Utilize resources that can contribute to professional development (e.g., trade journals/periodicals, professional/trade associations, classes/seminars, trade shows, and mentors)" },
      { code: "PD:037", description: "Use networking techniques to identify employment opportunities" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "A regular customer who works in graphic design mentioned she might be able to introduce you to people in that field, and the owner (judge) is encouraging you to actually follow up rather than let the opportunity pass.",
      ask:
        "The owner (judge) wants you to talk through how you'd follow up on this networking opportunity and what you'd do with it.",
      location: "the shop's back workroom",
      greetingAsk: "to hear how you'd approach this",
    }),
    judgeQuestions: [
      "How would you follow up with this customer without it feeling awkward or pushy?",
      "What other resources could help you build toward this kind of career?",
    ],
  },
  {
    title: "Reviewing a Vendor Contract at Riverside Print & Frame Shop",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:001", description: "Describe legal issues affecting businesses" },
      { code: "BL:002", description: "Describe the nature of legally binding contracts" },
      { code: "BL:003", description: "Explain types of business ownership" },
      { code: "BL:051", description: "Describe methods used to protect intellectual property" },
    ],
    eventSituation: buildSituation({
      role: "a senior part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "A new print-supply vendor sent over a contract with terms the owner (judge) doesn't fully understand, including a clause about who owns the rights to custom designs RIVERSIDE creates using their materials.",
      ask:
        "The owner (judge) wants you to help review this contract in plain terms and flag anything concerning, especially around intellectual property.",
      location: "the shop's back workroom",
      greetingAsk: "to hear what you found in this contract",
    }),
    judgeQuestions: [
      "What about this contract's intellectual-property clause concerns you most?",
      "What questions would you want answered before signing this?",
    ],
  },
  {
    title: "A Customer Injury Claim at Riverside Print & Frame Shop",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:067", description: "Discuss the nature of law and sources of law in the United States" },
      { code: "BL:068", description: "Describe the United States' judicial system" },
      { code: "BL:069", description: "Identify the basic torts relating to business enterprises" },
      { code: "BL:070", description: "Describe the nature of legal procedure" },
    ],
    eventSituation: buildSituation({
      role: "a senior part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "A customer says she cut her hand on an improperly finished frame edge purchased last month and is threatening legal action, and the owner (judge) has never had to think through a potential liability claim before.",
      ask:
        "The owner (judge) wants you to explain the basic legal concepts at play here and what steps typically happen if this claim moves forward.",
      location: "the shop's back workroom",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "What basic legal concept applies to a claim like this against a business?",
      "What would the general process look like if this claim actually moved forward?",
    ],
  },
  {
    title: "A Supplier Payment Dispute at Riverside Print & Frame Shop",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:071", description: "Discuss the nature of debtor-creditor relationships" },
      { code: "BL:072", description: "Explain the nature of agency relationships" },
      { code: "BL:073", description: "Discuss the nature of environmental law" },
      { code: "BL:074", description: "Discuss the role of administrative law" },
    ],
    eventSituation: buildSituation({
      role: "a senior part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "A supplier is claiming RIVERSIDE owes an outstanding balance the owner (judge) believes was already paid, and a separate letter arrived from the city about proper disposal of print chemicals that the owner (judge) doesn't fully understand.",
      ask:
        "The owner (judge) wants you to help sort through the payment dispute and explain what the city's chemical-disposal letter is actually asking for.",
      location: "the shop's back workroom",
      greetingAsk: "to hear how you'd handle these two things",
    }),
    judgeQuestions: [
      "What would you ask the supplier for to resolve this payment dispute?",
      "What would you want to understand about this chemical-disposal requirement before responding?",
    ],
  },
  {
    title: "Importing Specialty Frame Materials at Riverside Print & Frame Shop",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:126", description: "Describe the nature of customs regulations" },
      { code: "BL:145", description: "Explain the nature of import/export law" },
      { code: "BL:163", description: "Comply with the spirit and intent of laws and regulations" },
      { code: "BL:001", description: "Describe legal issues affecting businesses" },
    ],
    eventSituation: buildSituation({
      role: "a senior part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "The owner (judge) found a specialty wood-molding supplier overseas with prices well below domestic options, but has never imported materials before and isn't sure what's involved beyond just placing an order.",
      ask:
        "The owner (judge) wants you to explain what's involved in importing materials like this and what to watch for before placing an order.",
      location: "the shop's back workroom",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What would this shop need to understand about customs before this order ships?",
      "What could go wrong if we don't look into this properly first?",
    ],
  },
  {
    title: "A Tense Staff Meeting at Riverside Print & Frame Shop",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:059", description: "Interpret others' nonverbal cues" },
      { code: "CO:060", description: "Provide legitimate responses to inquiries" },
      { code: "CO:061", description: "Defend ideas objectively" },
      { code: "CO:063", description: "Participate in a staff meeting" },
    ],
    eventSituation: buildSituation({
      role: "a senior part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "A staff meeting about the new holiday schedule got tense when two coworkers disagreed sharply about who should work weekends, and the owner (judge) wants you to help keep the next meeting from repeating that dynamic.",
      ask:
        "The owner (judge) wants you to explain how you'd read the room and keep the discussion productive at the next meeting.",
      location: "the shop's back workroom",
      greetingAsk: "to hear how you'd approach this",
    }),
    judgeQuestions: [
      "What nonverbal cues would tell you a meeting is getting tense before it escalates?",
      "How would you defend a scheduling idea objectively without it turning personal?",
    ],
  },
  {
    title: "Preparing a Report for the Owner at Riverside Print & Frame Shop",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:085", description: "Utilize note-taking strategies" },
      { code: "CO:086", description: "Organize information" },
      { code: "CO:087", description: "Select and use appropriate graphic aids" },
      { code: "CO:089", description: "Edit and revise written work consistent with professional standards" },
    ],
    eventSituation: buildSituation({
      role: "a senior part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "The owner (judge) asked you to track a month of order-completion times and put together a short report, but your notes are scattered across several days and haven't been organized into anything presentable yet.",
      ask:
        "The owner (judge) wants you to walk through how you'd organize this into a clear, professional report.",
      location: "the shop's back workroom",
      greetingAsk: "to hear your approach to this report",
    }),
    judgeQuestions: [
      "How would you organize a month of scattered notes into something clear?",
      "What graphic aid would help show this data at a glance?",
    ],
  },
  {
    title: "A Miscommunication Over Text Leads to a Mixed-Up Order at Riverside Print & Frame Shop",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:091", description: "Write executive summaries" },
      { code: "CO:092", description: "Choose and use appropriate channel for workplace communication" },
      { code: "CO:094", description: "Prepare simple written reports" },
      { code: "CO:202", description: "Explain how digital communications (e.g., email, text messages, chats) exposes business to risk" },
    ],
    eventSituation: buildSituation({
      role: "a senior part-time employee",
      company: "RIVERSIDE PRINT & FRAME SHOP",
      judgeRole: "the owner",
      problem:
        "A customer order got mixed up because two coworkers coordinated the details over quick, informal text messages instead of the shop's order system, and important specifications got lost in the back-and-forth.",
      ask:
        "The owner (judge) wants you to explain what went wrong with using this channel for something this important and propose better communication habits going forward.",
      location: "the shop's back workroom",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "Why was texting the wrong channel for coordinating this order's details?",
      "What channel should the team use instead for something like this?",
    ],
  },
];

const POBMA_EVENT: EventCaseStudySeed = {
  eventSlug: "principles-of-business-management-and-administration",
  eventName: "Principles of Business Management and Administration",
  careerCluster: "Business Management and Administration",
  careerPathway: null,
  format: "PRINCIPLES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: POBMA_CASES,
};

// ---------------------------------------------------------------------------
// business-law-and-ethics-team-decision-making (TDM, BMA Cluster PIs, 54 codes)
// ---------------------------------------------------------------------------
const BLE_CASES: CaseStudySeed[] = [
  {
    title: "A Vendor Contract Dispute at Alderbrook Industries",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:241", description: "Maintain vendor/supplier relationships" },
      { code: "OP:250", description: "Describe types of purchase orders" },
      { code: "OP:303", description: "Discuss the nature of supply chain management" },
      { code: "OP:327", description: "Discuss the nature of business analysis" },
      { code: "OP:336", description: "Discuss types of inventory" },
      { code: "OP:337", description: "Negotiate terms with vendors in business" },
      { code: "OP:339", description: "Discuss legal considerations in operations" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the general counsel",
      problem:
        "A key supplier delivered a shipment that doesn't match the purchase order's specifications, and now disputes responsibility, claiming a verbal change was agreed to that was never documented in writing.",
      ask:
        "The general counsel (judge) wants your team to analyze this dispute and recommend how to resolve it and protect against similar issues going forward.",
      location: "the legal department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What's the legal risk of relying on a verbal change to a written purchase order?",
      "What would you change in our vendor process to prevent this dispute from recurring?",
    ],
  },
  {
    title: "Redesigning a Business Process Without Losing Compliance at Alderbrook Industries",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:474", description: "Discuss business process thinking and its impact" },
      { code: "OP:475", description: "Describe the factors that influence business process design" },
      { code: "OP:476", description: "Explain the causes of business process changes" },
      { code: "OP:477", description: "Explain the impact of supply chains on business performance" },
      { code: "OP:478", description: "Describe the impact of technology on supply chain management" },
      { code: "OP:479", description: "Describe supply chain networks" },
      { code: "OP:480", description: "Discuss global supply chain issues" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the general counsel",
      problem:
        "Operations wants to redesign the receiving process to speed up throughput, but the general counsel (judge) is concerned the proposed changes could accidentally remove a documentation step required for a global supplier compliance agreement.",
      ask:
        "The general counsel (judge) wants your team to review the proposed redesign and recommend how to keep it compliant while still improving speed.",
      location: "the legal department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What compliance step is most at risk of being lost in this redesign?",
      "How would you preserve that requirement while still speeding up the process?",
    ],
  },
  {
    title: "A Data Breach in the Supply Chain System at Alderbrook Industries",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:517", description: "Comply with strategies for protecting business' digital assets (e.g., website, social media, email, etc.)" },
      { code: "OP:518", description: "Comply with strategies to protect digital customer data (e.g., information about customers, customers' credit-card numbers, passwords, customer transactions)" },
      { code: "OP:677", description: "Discuss ethical considerations in supply chain management" },
      { code: "OP:241", description: "Maintain vendor/supplier relationships" },
      { code: "OP:303", description: "Discuss the nature of supply chain management" },
      { code: "OP:478", description: "Describe the impact of technology on supply chain management" },
      { code: "OP:339", description: "Discuss legal considerations in operations" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the general counsel",
      problem:
        "A third-party supplier's system, which stores some of Alderbrook's customer order data for fulfillment, was breached, and the general counsel (judge) needs to determine Alderbrook's own legal exposure and ethical obligations to notify affected customers.",
      ask:
        "The general counsel (judge) wants your team to assess this exposure and recommend how to respond, including any notification obligations.",
      location: "the legal department conference room",
      greetingAsk: "to hear your team's assessment",
    }),
    judgeQuestions: [
      "What's our exposure here even though the breach happened at the supplier, not us?",
      "What ethical obligation do we have to notify customers, beyond the strict legal requirement?",
    ],
  },
  {
    title: "Suspected Inventory Fraud at Alderbrook Industries",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:336", description: "Discuss types of inventory" },
      { code: "OP:337", description: "Negotiate terms with vendors in business" },
      { code: "OP:339", description: "Discuss legal considerations in operations" },
      { code: "OP:241", description: "Maintain vendor/supplier relationships" },
      { code: "OP:250", description: "Describe types of purchase orders" },
      { code: "OP:303", description: "Discuss the nature of supply chain management" },
      { code: "OP:327", description: "Discuss the nature of business analysis" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the general counsel",
      problem:
        "An internal audit found inventory counts at one warehouse consistently don't match purchase order records, and the general counsel (judge) suspects this could be an honest process failure or something more serious involving a vendor relationship.",
      ask:
        "The general counsel (judge) wants your team to analyze what the evidence suggests and recommend next steps, including any legal considerations before accusing anyone.",
      location: "the legal department conference room",
      greetingAsk: "to hear your team's analysis",
    }),
    judgeQuestions: [
      "What would you look at first to determine if this is fraud or a process failure?",
      "What legal considerations should guide how we investigate this before drawing conclusions?",
    ],
  },
  {
    title: "Global Supply Chain Ethics Review at Alderbrook Industries",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:480", description: "Discuss global supply chain issues" },
      { code: "OP:479", description: "Describe supply chain networks" },
      { code: "OP:478", description: "Describe the impact of technology on supply chain management" },
      { code: "OP:477", description: "Explain the impact of supply chains on business performance" },
      { code: "OP:476", description: "Explain the causes of business process changes" },
      { code: "OP:475", description: "Describe the factors that influence business process design" },
      { code: "OP:677", description: "Discuss ethical considerations in supply chain management" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the general counsel",
      problem:
        "A journalist's investigation into labor practices at an overseas factory has named a company several tiers deep in Alderbrook's supply chain, and the general counsel (judge) needs to understand Alderbrook's actual exposure and responsibility here before responding publicly.",
      ask:
        "The general counsel (judge) wants your team to review this supply chain relationship and recommend both an ethical and practical response.",
      location: "the legal department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What responsibility do we actually have for a supplier several tiers removed from us?",
      "What would you recommend we say publicly about this, if anything, right now?",
    ],
  },
  {
    title: "Reorganizing the Management Structure at Alderbrook Industries",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "SM:004", description: "Describe the nature of managerial control (control process, types of control, what is controlled)" },
      { code: "SM:063", description: "Discuss the nature of managerial planning" },
      { code: "SM:064", description: "Explain managerial considerations in organizing" },
      { code: "SM:065", description: "Describe managerial considerations in staffing" },
      { code: "SM:066", description: "Discuss managerial considerations in directing" },
      { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
      { code: "SM:095", description: "Explain the nature of change management" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the chief compliance officer",
      problem:
        "Leadership wants to flatten a layer of middle management to speed up decision-making, but the chief compliance officer (judge) is concerned the change could create gaps in oversight and accountability that matter for compliance purposes.",
      ask:
        "The chief compliance officer (judge) wants your team to review this reorganization plan and recommend how to preserve necessary oversight through the change.",
      location: "the compliance department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What oversight function is most at risk of falling through the cracks in this reorganization?",
      "How would you manage this change so accountability doesn't get lost?",
    ],
  },
  {
    title: "Managing a Contentious Policy Change at Alderbrook Industries",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "SM:096", description: "Explain the change-management lifecycle" },
      { code: "SM:004", description: "Describe the nature of managerial control (control process, types of control, what is controlled)" },
      { code: "SM:063", description: "Discuss the nature of managerial planning" },
      { code: "SM:064", description: "Explain managerial considerations in organizing" },
      { code: "SM:065", description: "Describe managerial considerations in staffing" },
      { code: "SM:066", description: "Discuss managerial considerations in directing" },
      { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the chief compliance officer",
      problem:
        "A new expense-reporting policy rolled out without much explanation, and employees across departments are confused and frustrated, with several openly ignoring parts of it, worrying the chief compliance officer (judge) about a policy that isn't actually being followed.",
      ask:
        "The chief compliance officer (judge) wants your team to explain what went wrong with this rollout using change-management principles and propose how to fix adoption.",
      location: "the compliance department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What stage of change management did this rollout likely skip?",
      "How would you get employees to actually adopt this policy at this point?",
    ],
  },
  {
    title: "A Staffing Decision Raises a Discrimination Concern at Alderbrook Industries",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "SM:065", description: "Describe managerial considerations in staffing" },
      { code: "SM:066", description: "Discuss managerial considerations in directing" },
      { code: "SM:004", description: "Describe the nature of managerial control (control process, types of control, what is controlled)" },
      { code: "SM:063", description: "Discuss the nature of managerial planning" },
      { code: "SM:064", description: "Explain managerial considerations in organizing" },
      { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
      { code: "SM:095", description: "Explain the nature of change management" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the chief compliance officer",
      problem:
        "A department manager's recent round of promotions all went to employees of one demographic group, and while the manager insists it was based purely on merit, the pattern has raised a discrimination concern that the chief compliance officer (judge) needs addressed carefully.",
      ask:
        "The chief compliance officer (judge) wants your team to review this staffing decision and recommend how to investigate and respond appropriately.",
      location: "the compliance department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would you look at to determine if this pattern reflects a real problem or coincidence?",
      "How would you address this with the manager without assuming guilt before investigating?",
    ],
  },
  {
    title: "Launching a Compliance Tracking Project at Alderbrook Industries",
    instructionalArea: "Project Management",
    performanceIndicators: [
      { code: "PJ:005", description: "Initiate project" },
      { code: "PJ:006", description: "Prepare work breakdown structure (WBS)" },
      { code: "PJ:007", description: "Manage project team" },
      { code: "PJ:008", description: "Close project" },
      { code: "PJ:009", description: "Execute and control projects" },
      { code: "PJ:010", description: "Manage project schedule" },
      { code: "KM:001", description: "Explain the nature of knowledge management" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the chief compliance officer",
      problem:
        "After a near-miss compliance issue, the chief compliance officer (judge) wants to launch a project building a centralized system for tracking regulatory deadlines across departments, but has never scoped a project like this and worries it could sprawl out of control.",
      ask:
        "The chief compliance officer (judge) wants your team to outline how to initiate and structure this project so it stays on schedule and delivers something usable.",
      location: "the compliance department conference room",
      greetingAsk: "to hear your team's project plan",
    }),
    judgeQuestions: [
      "What would you put in the work breakdown structure for a project like this?",
      "How would you keep this project from sprawling out of control?",
    ],
  },
  {
    title: "A Project Team Conflict Threatens a Deadline at Alderbrook Industries",
    instructionalArea: "Project Management",
    performanceIndicators: [
      { code: "PJ:007", description: "Manage project team" },
      { code: "PJ:008", description: "Close project" },
      { code: "PJ:009", description: "Execute and control projects" },
      { code: "PJ:010", description: "Manage project schedule" },
      { code: "PJ:005", description: "Initiate project" },
      { code: "PJ:006", description: "Prepare work breakdown structure (WBS)" },
      { code: "KM:002", description: "Discuss the role of ethics in knowledge management" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the chief compliance officer",
      problem:
        "Two team members on a regulatory-filing project have stopped communicating directly after a disagreement over whose analysis was correct, and the filing deadline is in ten days with several tasks now stalled because of it.",
      ask:
        "The chief compliance officer (judge) wants your team to recommend how to resolve this team conflict and get the project schedule back on track.",
      location: "the compliance department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "How would you get these two team members working together again with the deadline this close?",
      "What would you do differently to prevent a stall like this earlier next time?",
    ],
  },
  {
    title: "Closing Out a Troubled Audit Response Project at Alderbrook Industries",
    instructionalArea: "Project Management",
    performanceIndicators: [
      { code: "PJ:008", description: "Close project" },
      { code: "PJ:009", description: "Execute and control projects" },
      { code: "PJ:010", description: "Manage project schedule" },
      { code: "PJ:005", description: "Initiate project" },
      { code: "PJ:006", description: "Prepare work breakdown structure (WBS)" },
      { code: "PJ:007", description: "Manage project team" },
      { code: "RM:043", description: "Discuss legal considerations affecting risk management" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the chief compliance officer",
      problem:
        "A months-long project responding to a regulatory audit finding is finally wrapping up, but ran over schedule twice and the chief compliance officer (judge) wants a proper close-out that captures what went wrong for next time, not just a quiet end.",
      ask:
        "The chief compliance officer (judge) wants your team to walk through how to close this project properly and what legal considerations should be documented for the record.",
      location: "the compliance department conference room",
      greetingAsk: "to hear your team's close-out approach",
    }),
    judgeQuestions: [
      "What should be documented as this project closes, beyond just marking it done?",
      "What legal consideration matters most to capture from this audit response for the record?",
    ],
  },
  {
    title: "Choosing a Quality Framework Amid Ethical Pressure at Alderbrook Industries",
    instructionalArea: "Quality Management",
    performanceIndicators: [
      { code: "QM:001", description: "Explain the nature of quality management" },
      { code: "QM:002", description: "Describe the nature of quality management frameworks (e.g., Six Sigma, ITIL, CMMI)" },
      { code: "QM:003", description: "Discuss the need for continuous improvement of the quality process" },
      { code: "QM:012", description: "Discuss ethical considerations in quality management" },
      { code: "RM:041", description: "Explain the role of ethics in risk management" },
      { code: "RM:042", description: "Describe the use of technology in risk management" },
      { code: "RM:043", description: "Discuss legal considerations affecting risk management" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the chief compliance officer",
      problem:
        "Production leadership wants to adopt a quality framework that would technically pass inspection with a lower defect-detection threshold than the current one, arguing it saves money, but the chief compliance officer (judge) is uneasy about the ethics of loosening this standard.",
      ask:
        "The chief compliance officer (judge) wants your team to weigh in on whether this framework change is appropriate, considering both quality and ethical implications.",
      location: "the compliance department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What's the ethical concern with loosening this defect-detection threshold?",
      "What would you recommend instead if cost savings are genuinely needed?",
    ],
  },
  {
    title: "Assessing International Risk for a New Market at Alderbrook Industries",
    instructionalArea: "Risk Management",
    performanceIndicators: [
      { code: "RM:092", description: "Describe international considerations affecting risk management" },
      { code: "RM:041", description: "Explain the role of ethics in risk management" },
      { code: "RM:042", description: "Describe the use of technology in risk management" },
      { code: "RM:043", description: "Discuss legal considerations affecting risk management" },
      { code: "QM:001", description: "Explain the nature of quality management" },
      { code: "QM:002", description: "Describe the nature of quality management frameworks (e.g., Six Sigma, ITIL, CMMI)" },
      { code: "QM:003", description: "Discuss the need for continuous improvement of the quality process" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the chief compliance officer",
      problem:
        "Alderbrook is considering entering a new international market with different regulatory and business-custom norms, and the chief compliance officer (judge) needs a real risk assessment before leadership commits budget to the expansion.",
      ask:
        "The chief compliance officer (judge) wants your team to identify the international risk considerations at play and recommend how to proceed responsibly.",
      location: "the compliance department conference room",
      greetingAsk: "to hear your team's risk assessment",
    }),
    judgeQuestions: [
      "What international consideration concerns you most about this expansion?",
      "How would you balance moving quickly on this opportunity against doing this risk assessment properly?",
    ],
  },
  {
    title: "Protecting Trade Secrets After a Departure at Alderbrook Industries",
    instructionalArea: "Knowledge Management",
    performanceIndicators: [
      { code: "KM:001", description: "Explain the nature of knowledge management" },
      { code: "KM:002", description: "Discuss the role of ethics in knowledge management" },
      { code: "KM:003", description: "Explain the use of technology in knowledge management" },
      { code: "KM:004", description: "Explain legal considerations for knowledge management" },
      { code: "KM:005", description: "Identify techniques that can be used to capture and transfer knowledge in an organization" },
      { code: "KM:018", description: "Apply knowledge management processes" },
      { code: "OP:327", description: "Discuss the nature of business analysis" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the chief compliance officer",
      problem:
        "A senior engineer with deep knowledge of a proprietary process just resigned to join a competitor, and the chief compliance officer (judge) is worried both about what knowledge left with him and about how little of his expertise was ever documented for others.",
      ask:
        "The chief compliance officer (judge) wants your team to explain the legal considerations here and propose how the company should capture and protect this kind of knowledge going forward.",
      location: "the compliance department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What legal considerations apply to a departing employee who holds this kind of proprietary knowledge?",
      "What technique would you use to capture this kind of expertise from key employees before they leave?",
    ],
  },
  {
    title: "Weighing a Crowdsourcing Idea Against IP Risk at Alderbrook Industries",
    instructionalArea: "Knowledge Management",
    performanceIndicators: [
      { code: "KM:017", description: "Identify ways to use crowdsourcing in business" },
      { code: "KM:002", description: "Discuss the role of ethics in knowledge management" },
      { code: "KM:003", description: "Explain the use of technology in knowledge management" },
      { code: "KM:004", description: "Explain legal considerations for knowledge management" },
      { code: "KM:001", description: "Explain the nature of knowledge management" },
      { code: "KM:005", description: "Identify techniques that can be used to capture and transfer knowledge in an organization" },
      { code: "BL:159", description: "Describe factors affecting the settlement of legal matters" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the chief compliance officer",
      problem:
        "A product team wants to crowdsource design ideas from the public for a new product line, and the chief compliance officer (judge) is concerned about who would legally own ideas submitted by outside contributors and what happens if a dispute arises over one.",
      ask:
        "The chief compliance officer (judge) wants your team to weigh the legal risk of this crowdsourcing idea and recommend how to structure it safely if it moves forward.",
      location: "the compliance department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What legal protection would we need in place before opening this up to public submissions?",
      "What would you do if a dispute arose over who came up with a winning idea?",
    ],
  },
  {
    title: "Settling a Legal Matter with a Cash-Flow Review at Alderbrook Industries",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:159", description: "Describe factors affecting the settlement of legal matters" },
      { code: "BL:160", description: "Describe the litigation process" },
      { code: "BL:161", description: "Discuss the arbitration/mediation process" },
      { code: "FI:541", description: "Interpret cash-flow statements" },
      { code: "CO:185", description: "Write analytical reports (i.e., reports that examine a problem/issue and recommend an action)" },
      { code: "CO:186", description: "Write research reports" },
      { code: "NF:130", description: "Utilize project-management software" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the general counsel",
      problem:
        "A contract dispute with a former partner company could be settled now for a moderate amount or fought in litigation with an uncertain outcome, and the general counsel (judge) needs your team's read on both the legal factors and whether the company's current cash flow can absorb either option comfortably.",
      ask:
        "The general counsel (judge) wants your team to prepare an analytical report weighing settlement against litigation, factoring in the cash-flow picture.",
      location: "the legal department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What factors would push you toward settling rather than litigating this?",
      "What does the cash-flow picture tell you about which option is more feasible right now?",
    ],
  },
  {
    title: "Handling a Discrimination Complaint's Paper Trail at Alderbrook Industries",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:159", description: "Describe factors affecting the settlement of legal matters" },
      { code: "BL:160", description: "Describe the litigation process" },
      { code: "BL:161", description: "Discuss the arbitration/mediation process" },
      { code: "NF:264", description: "Adhere to data change best practices" },
      { code: "PD:297", description: "Discuss employment opportunities in business management and administration" },
      { code: "KM:002", description: "Discuss the role of ethics in knowledge management" },
      { code: "RM:041", description: "Explain the role of ethics in risk management" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the general counsel",
      problem:
        "An employee has filed a formal discrimination complaint, and the general counsel (judge) has discovered that some of the relevant personnel records were edited after the complaint was filed, without a clear record of who made the changes or why.",
      ask:
        "The general counsel (judge) wants your team to address both the underlying complaint and the serious concern raised by this undocumented record change.",
      location: "the legal department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "Why is this undocumented record change potentially more serious than the original complaint?",
      "What would you recommend doing about both issues right now?",
    ],
  },
  {
    title: "Arbitration or Litigation for a Contract Breach at Alderbrook Industries",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:159", description: "Describe factors affecting the settlement of legal matters" },
      { code: "BL:160", description: "Describe the litigation process" },
      { code: "BL:161", description: "Discuss the arbitration/mediation process" },
      { code: "CO:185", description: "Write analytical reports (i.e., reports that examine a problem/issue and recommend an action)" },
      { code: "CO:186", description: "Write research reports" },
      { code: "NF:130", description: "Utilize project-management software" },
      { code: "NF:264", description: "Adhere to data change best practices" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the general counsel",
      problem:
        "A long-term contract partner allegedly breached a key delivery term, and the contract itself includes a mandatory arbitration clause, but the general counsel (judge) wants a second opinion before committing to that path over pursuing the matter in court.",
      ask:
        "The general counsel (judge) wants your team to prepare an analytical report recommending whether to pursue arbitration or challenge the clause in court.",
      location: "the legal department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would make arbitration the better path here compared to litigation?",
      "What would you need to document carefully as this process moves forward?",
    ],
  },
  {
    title: "Legal Exposure After a Customer Data Breach at Alderbrook Industries",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:159", description: "Describe factors affecting the settlement of legal matters" },
      { code: "BL:160", description: "Describe the litigation process" },
      { code: "BL:161", description: "Discuss the arbitration/mediation process" },
      { code: "OP:517", description: "Comply with strategies for protecting business' digital assets (e.g., website, social media, email, etc.)" },
      { code: "OP:518", description: "Comply with strategies to protect digital customer data (e.g., information about customers, customers' credit-card numbers, passwords, customer transactions)" },
      { code: "RM:043", description: "Discuss legal considerations affecting risk management" },
      { code: "RM:041", description: "Explain the role of ethics in risk management" },
    ],
    eventSituation: buildSituation({
      role: "the business law and ethics analysts",
      company: "ALDERBROOK INDUSTRIES",
      judgeRole: "the general counsel",
      problem:
        "Alderbrook's own e-commerce system was breached, exposing customer payment data, and several affected customers are already threatening legal action while the general counsel (judge) needs to understand the company's actual legal exposure before responding.",
      ask:
        "The general counsel (judge) wants your team to assess this legal exposure and recommend an ethical and practical response to affected customers.",
      location: "the legal department conference room",
      greetingAsk: "to hear your team's assessment",
    }),
    judgeQuestions: [
      "What factors will determine how much legal exposure we actually face here?",
      "What ethical obligation do we have to these customers beyond the minimum legal requirement?",
    ],
  },
];

BLE_CASES.push({
  title: "Applying Knowledge Management to a Recurring Compliance Miss at Alderbrook Industries",
  instructionalArea: "Knowledge Management",
  performanceIndicators: [
    { code: "KM:018", description: "Apply knowledge management processes" },
    { code: "KM:001", description: "Explain the nature of knowledge management" },
    { code: "KM:003", description: "Explain the use of technology in knowledge management" },
    { code: "KM:004", description: "Explain legal considerations for knowledge management" },
    { code: "KM:005", description: "Identify techniques that can be used to capture and transfer knowledge in an organization" },
    { code: "NF:264", description: "Adhere to data change best practices" },
    { code: "RM:043", description: "Discuss legal considerations affecting risk management" },
  ],
  eventSituation: buildSituation({
    role: "the business law and ethics analysts",
    company: "ALDERBROOK INDUSTRIES",
    judgeRole: "the chief compliance officer",
    problem:
      "The same minor regulatory filing error has now happened three times across two years, each time by a different employee who apparently didn't know a past employee had already solved this exact problem, because nothing was ever documented.",
    ask:
      "The chief compliance officer (judge) wants your team to explain what a real knowledge-management process would look like here and propose one that prevents this from happening a fourth time.",
    location: "the compliance department conference room",
    greetingAsk: "to hear your team's recommendation",
  }),
  judgeQuestions: [
    "What should have been captured the first time this error was solved?",
    "What technique would you use to make sure this fix stays known even as employees turn over?",
  ],
});

const BLE_EVENT: EventCaseStudySeed = {
  eventSlug: "business-law-and-ethics-team-decision-making",
  eventName: "Business Law and Ethics Team Decision Making",
  careerCluster: "Business Management and Administration",
  careerPathway: null,
  format: "TEAM_DECISION_MAKING",
  prepMinutes: 30,
  presentMinutes: 15,
  cases: BLE_CASES,
};

export const BMA_CASE_STUDY_SEED: EventCaseStudySeed[] = [HRM_EVENT, POBMA_EVENT, BLE_EVENT];
