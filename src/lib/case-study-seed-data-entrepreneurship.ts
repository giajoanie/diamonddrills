/**
 * Entrepreneurship cluster case studies for the 3 roleplay events. The
 * Entrepreneurship cluster's own Cluster-tier PI bank is small (33 rows,
 * shared identically between the Series and TDM events since neither names
 * a Tier 3 pathway), so groups of indicators repeat across several cases
 * here the same way they would in DECA's own real Entrepreneurship prep
 * materials — the variety comes from the business situations, not from an
 * ever-expanding PI list. Performance indicators are pulled verbatim from
 * this app's own seeded PerformanceIndicator rows.
 */
import { buildSituation } from "./case-study-scenario-builder";
import type { CaseStudySeed, EventCaseStudySeed } from "./case-study-seed-data";

// ---------------------------------------------------------------------------
// entrepreneurship-series (SERIES, Entrepreneurship Cluster PIs)
// ---------------------------------------------------------------------------
const ENT_CASES: CaseStudySeed[] = [
  {
    title: "Launching Loop Bike Rentals' First Ad Campaign",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "You're three weeks from opening a bike-rental kiosk near the riverfront trail, and you have a small ad budget but no plan yet for how to actually spend it or what message should lead the launch.",
      ask:
        "The small-business mentor (judge) wants you to explain the promotional mix and propose a launch advertising plan within your limited budget.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your launch plan",
    }),
    judgeQuestions: [
      "With a limited budget, which advertising media would you prioritize first?",
      "What message should lead this launch campaign?",
    ],
  },
  {
    title: "Building Word-of-Mouth Before Loop Bike Rentals Even Opens",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:247", description: "Describe word-of-mouth channels used to communicate with targeted audiences" },
      { code: "PR:249", description: "Identify communications channels used in sales promotion" },
      { code: "PR:250", description: "Explain communications channels used in public-relations activities" },
      { code: "PR:252", description: "Identify types of public-relations activities" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "You have no advertising budget left after buying the bikes and kiosk equipment, and opening day is in two weeks with almost no one in town aware LOOP exists yet.",
      ask:
        "The small-business mentor (judge) wants you to propose low-cost word-of-mouth and PR activities that could build awareness before opening day.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "What's one PR activity you could pull off with almost no budget?",
      "How would you get people talking about LOOP before you've even opened?",
    ],
  },
  {
    title: "Deciding Whether to Hire Seasonal Staff at Loop Bike Rentals",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:303", description: "Discuss the nature of supply chain management" },
      { code: "OP:327", description: "Discuss the nature of business analysis" },
      { code: "OP:474", description: "Discuss business process thinking and its impact" },
      { code: "OP:475", description: "Describe the factors that influence business process design" },
      { code: "OP:476", description: "Explain the causes of business process changes" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "Summer demand is about to spike well beyond what you can handle alone at the kiosk, and you're weighing whether to hire your first seasonal employee, which means redesigning how the rental process actually works with two people instead of one.",
      ask:
        "The small-business mentor (judge) wants you to analyze this staffing decision and how it would change your current business process.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your analysis",
    }),
    judgeQuestions: [
      "What would actually change about your rental process with a second person working?",
      "How would you decide if the extra revenue justifies this new cost?",
    ],
  },
  {
    title: "A Bike Supplier Delay Threatens Loop Bike Rentals' Season",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:477", description: "Explain the impact of supply chains on business performance" },
      { code: "OP:303", description: "Discuss the nature of supply chain management" },
      { code: "OP:327", description: "Discuss the nature of business analysis" },
      { code: "OP:474", description: "Discuss business process thinking and its impact" },
      { code: "OP:475", description: "Describe the factors that influence business process design" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "The supplier you ordered ten new bikes from just told you the shipment is delayed a month, right before the busiest weekend of the summer, and you don't have enough bikes on hand to meet expected demand.",
      ask:
        "The small-business mentor (judge) wants you to analyze how this supply disruption affects your business and propose how to handle the shortfall.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "What are your options for covering this shortfall in the short term?",
      "What would you do differently in future ordering to avoid this risk?",
    ],
  },
  {
    title: "Estimating the Market Before Loop Bike Rentals Expands to a Second Location",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "FI:541", description: "Interpret cash-flow statements" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "After a strong first season, you're considering opening a second kiosk at a park across town, but you haven't identified whether that market actually has the foot traffic to support it, and your cash-flow statement shows less cushion than you thought.",
      ask:
        "The small-business mentor (judge) wants you to explain how you'd identify whether this new market is viable and what your cash flow tells you about timing.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your expansion analysis",
    }),
    judgeQuestions: [
      "What would you look at to confirm this second location has real demand?",
      "What does your cash-flow statement suggest about whether now is the right time?",
    ],
  },
  {
    title: "Should Loop Bike Rentals Add Electric Bikes?",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PM:003", description: "Explain the concept of product mix" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "Several customers have asked if LOOP rents electric bikes, and you're intrigued but the bikes cost significantly more to buy and maintain, and you have no real data yet on how many customers would actually pay a higher rental price for one.",
      ask:
        "The small-business mentor (judge) wants you to explain what research you'd do before adding this to your product mix and how you'd price it.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your research and pricing approach",
    }),
    judgeQuestions: [
      "What research would tell you if this investment is worth it?",
      "How would you price an e-bike rental relative to your standard bikes?",
    ],
  },
  {
    title: "Building Real Governance at Loop Bike Rentals Before Taking on a Partner",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
      { code: "PD:214", description: "Describe the components of a well-governed company (e.g., board of directors, reporting, transparency, internal and external audit functions)" },
      { code: "PD:302", description: "Identify the factors that impact governance structures" },
      { code: "QM:001", description: "Explain the nature of quality management" },
      { code: "RM:062", description: "Discuss the nature of enterprise risk management (ERM)" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "A friend wants to invest in LOOP and become a co-owner, and the small-business mentor (judge) is pushing you to think seriously about governance and how decisions would get made and reported once it isn't just your own money and judgment involved.",
      ask:
        "The small-business mentor (judge) wants you to explain what basic governance structure LOOP would need with a co-owner and how you'd manage the added risk.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What governance structure would you need in place before taking on this partner?",
      "What new risk does bringing on a co-owner introduce that you haven't had to think about before?",
    ],
  },
  {
    title: "Managing Change as Loop Bike Rentals Grows Beyond a One-Person Operation",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
      { code: "SM:095", description: "Explain the nature of change management" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
      { code: "QM:001", description: "Explain the nature of quality management" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "You've hired your first two employees, and something feels harder than expected, decisions that used to take you five minutes on your own now require explaining your reasoning, training people, and trusting them to sell rentals the way you would.",
      ask:
        "The small-business mentor (judge) wants you to reflect on this transition and how you'd manage this change as the business grows beyond just you.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your reflection on this transition",
    }),
    judgeQuestions: [
      "What's the hardest part of this transition from solo founder to employer?",
      "How would you make sure your employees sell rentals with the same quality mindset you have?",
    ],
  },
  {
    title: "A Slow Tuesday Ad Strategy for Loop Bike Rentals",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "Weekends at LOOP are consistently busy, but weekday mornings sit almost empty, and you have a small amount of leftover budget you could put toward changing that pattern.",
      ask:
        "The small-business mentor (judge) wants you to propose a targeted promotion to fill this weekday gap.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your idea",
    }),
    judgeQuestions: [
      "Who would you specifically target to fill this weekday gap?",
      "Which advertising media makes sense for reaching that specific group?",
    ],
  },
  {
    title: "Turning a Bad Review Into Buzz for Loop Bike Rentals",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:247", description: "Describe word-of-mouth channels used to communicate with targeted audiences" },
      { code: "PR:249", description: "Identify communications channels used in sales promotion" },
      { code: "PR:250", description: "Explain communications channels used in public-relations activities" },
      { code: "PR:252", description: "Identify types of public-relations activities" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "A customer left a harsh online review after a bike chain broke mid-ride, and while you fixed the bike and refunded her immediately, the review is still up and getting a few likes from other frustrated-sounding commenters.",
      ask:
        "The small-business mentor (judge) wants you to propose how to respond publicly and rebuild word-of-mouth after this.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your response plan",
    }),
    judgeQuestions: [
      "How would you respond to this review publicly without sounding defensive?",
      "What would you do to actively rebuild positive word-of-mouth after this?",
    ],
  },
  {
    title: "Redesigning the Rental Process After a Bottleneck at Loop Bike Rentals",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:303", description: "Discuss the nature of supply chain management" },
      { code: "OP:327", description: "Discuss the nature of business analysis" },
      { code: "OP:474", description: "Discuss business process thinking and its impact" },
      { code: "OP:475", description: "Describe the factors that influence business process design" },
      { code: "OP:476", description: "Explain the causes of business process changes" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "Last Saturday, a line of customers formed at the kiosk because the paper waiver and manual bike-condition checklist took too long to process one rental at a time, and several people walked away without renting.",
      ask:
        "The small-business mentor (judge) wants you to analyze what's causing this bottleneck and redesign the rental process to move faster.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your redesign",
    }),
    judgeQuestions: [
      "What's the biggest bottleneck in the current process?",
      "What would you change first to speed this up without cutting a necessary safety step?",
    ],
  },
  {
    title: "A Damaged Bike Shipment Right Before a Festival at Loop Bike Rentals",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:477", description: "Explain the impact of supply chains on business performance" },
      { code: "OP:303", description: "Discuss the nature of supply chain management" },
      { code: "OP:327", description: "Discuss the nature of business analysis" },
      { code: "OP:474", description: "Discuss business process thinking and its impact" },
      { code: "OP:475", description: "Describe the factors that influence business process design" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "A shipment of five new bikes arrived with bent frames from rough handling in transit, two days before a riverside festival expected to be LOOP's busiest day of the year.",
      ask:
        "The small-business mentor (judge) wants you to analyze your options for handling this before the festival and what to change about this supplier relationship going forward.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "What would you do in the next two days to be ready for the festival?",
      "What would you change about how you receive shipments to catch damage sooner?",
    ],
  },
  {
    title: "Setting Loop Bike Rentals' Prices for the New Season",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PM:003", description: "Explain the concept of product mix" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "A new bike-rental competitor opened downtown charging noticeably less per hour, and you're deciding whether to match, undercut, or hold your current price, which reflects your newer bikes and better-maintained fleet.",
      ask:
        "The small-business mentor (judge) wants you to explain how you'd research this competitor's real impact and decide on your pricing response.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your pricing decision",
    }),
    judgeQuestions: [
      "What would you want to know about this competitor before reacting to their price?",
      "Why might holding your price actually be the right move here?",
    ],
  },
  {
    title: "Deciding Whether to Franchise the Loop Bike Rentals Model",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
      { code: "PD:214", description: "Describe the components of a well-governed company (e.g., board of directors, reporting, transparency, internal and external audit functions)" },
      { code: "PD:302", description: "Identify the factors that impact governance structures" },
      { code: "QM:001", description: "Explain the nature of quality management" },
      { code: "RM:062", description: "Discuss the nature of enterprise risk management (ERM)" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "Someone in a neighboring town has asked to open a LOOP location under license, and while the extra revenue is tempting, you have no governance structure or quality standards written down for how a licensee should actually run things.",
      ask:
        "The small-business mentor (judge) wants you to think through what governance and quality standards you'd need before considering this offer.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What quality standards would you need to write down before letting someone else run a LOOP location?",
      "What's the biggest risk of licensing your brand before you've documented any of this?",
    ],
  },
  {
    title: "Innovating After a Slow First Half of the Season at Loop Bike Rentals",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
      { code: "SM:095", description: "Explain the nature of change management" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
      { code: "QM:001", description: "Explain the nature of quality management" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "Revenue is down noticeably compared to this time last season, and rather than panic, you want to treat this as a chance to genuinely rethink parts of the business, but you're not sure where to start looking for what to change.",
      ask:
        "The small-business mentor (judge) wants you to walk through how you'd approach this kind of reflective change process.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your approach",
    }),
    judgeQuestions: [
      "Where would you start looking to figure out what's actually changed since last season?",
      "How do you keep this from turning into panic-driven changes that make things worse?",
    ],
  },
  {
    title: "A Rainy Season Forecast Worries Loop Bike Rentals' Founder",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "FI:541", description: "Interpret cash-flow statements" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "The weather service is forecasting an unusually rainy summer this year, and your entire business depends on outdoor recreation, so you're worried about what this means for cash flow and whether a new indoor or off-season market could help.",
      ask:
        "The small-business mentor (judge) wants you to think through this risk and whether identifying a different market could offset it.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What alternative market could you identify to offset a rainy season?",
      "What does your cash flow tell you about how much runway you'd have if revenue drops?",
    ],
  },
  {
    title: "Loop Bike Rentals Considers Adding Guided Tours",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PM:003", description: "Explain the concept of product mix" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "You've noticed several rental customers ask if you offer guided tours of the riverfront trail, and you're intrigued by the higher price point a guided experience could command, but you have no idea how to test demand before committing to hiring and training a guide.",
      ask:
        "The small-business mentor (judge) wants you to explain how you'd research this idea and price a guided tour offering.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your research and pricing approach",
    }),
    judgeQuestions: [
      "How would you test demand for this before committing to hiring a guide?",
      "How would you price a guided tour relative to a standard rental?",
    ],
  },
  {
    title: "Writing Loop Bike Rentals' First Real Governance Policy",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
      { code: "PD:214", description: "Describe the components of a well-governed company (e.g., board of directors, reporting, transparency, internal and external audit functions)" },
      { code: "PD:302", description: "Identify the factors that impact governance structures" },
      { code: "QM:001", description: "Explain the nature of quality management" },
      { code: "RM:062", description: "Discuss the nature of enterprise risk management (ERM)" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "A local bank is requiring a written business governance and risk policy before approving a small expansion loan, something you've never had to formalize since it's always just been you making every call.",
      ask:
        "The small-business mentor (judge) wants you to draft the basics of what this policy should cover.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your draft policy",
    }),
    judgeQuestions: [
      "What's the most important thing this policy needs to cover for a business your size?",
      "How does having this written down actually change how you'll run things day to day?",
    ],
  },
  {
    title: "Loop Bike Rentals' Founder Faces Burnout Managing Everything Alone",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
      { code: "SM:095", description: "Explain the nature of change management" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
      { code: "QM:001", description: "Explain the nature of quality management" },
    ],
    eventSituation: buildSituation({
      role: "the founder",
      company: "LOOP BIKE RENTALS",
      judgeRole: "the small-business mentor",
      problem:
        "You've been handling every part of LOOP yourself, opening the kiosk, doing every rental transaction, managing repairs, and posting every social media update, and you're exhausted heading into the busiest month of the year.",
      ask:
        "The small-business mentor (judge) wants you to think through what change needs to happen here before burnout affects the business itself.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What's the first thing you'd hand off or change to reduce this load?",
      "How would you make sure quality doesn't slip if you start delegating parts of this?",
    ],
  },
];

ENT_CASES.push({
  title: "Training a New Hire to Sell Rentals the Loop Bike Rentals Way",
  instructionalArea: "Selling",
  performanceIndicators: [
    { code: "SE:017", description: "Explain the nature and scope of the selling function" },
    { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
    { code: "QM:001", description: "Explain the nature of quality management" },
    { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
    { code: "SM:095", description: "Explain the nature of change management" },
  ],
  eventSituation: buildSituation({
    role: "the founder",
    company: "LOOP BIKE RENTALS",
    judgeRole: "the small-business mentor",
    problem:
      "Your newly hired employee is technically completing rentals correctly but isn't upselling helmets or longer rental periods the way you naturally do, and you're not sure how to teach a selling style without making it feel scripted.",
    ask:
      "The small-business mentor (judge) wants you to explain how you'd train this employee on selling naturally while maintaining consistent quality.",
    location: "the mentor's small-business office",
    greetingAsk: "to hear your training approach",
  }),
  judgeQuestions: [
    "How would you teach a natural selling style rather than a script?",
    "How would you know if this training is actually working after a few weeks?",
  ],
});

const ENT_EVENT: EventCaseStudySeed = {
  eventSlug: "entrepreneurship-series",
  eventName: "Entrepreneurship Series",
  careerCluster: "Entrepreneurship",
  careerPathway: null,
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: ENT_CASES,
};

// ---------------------------------------------------------------------------
// principles-of-entrepreneurship (PRINCIPLES, Business Administration Core PIs)
// ---------------------------------------------------------------------------
const POE_CASES: CaseStudySeed[] = [
  {
    title: "What Makes Someone an Entrepreneur at Hollow Creek Bakery",
    instructionalArea: "Entrepreneurship",
    performanceIndicators: [
      { code: "EN:039", description: "Describe the nature of entrepreneurship" },
      { code: "EN:040", description: "Explain the role requirements of entrepreneurs and owners" },
      { code: "EN:041", description: "Describe small-business opportunities in international trade" },
      { code: "EN:044", description: "Describe the use of business ethics in entrepreneurship" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "A local news reporter is coming by to interview the owner (judge) about starting a small business, and the owner (judge), who's nervous about interviews, has asked you to help prepare talking points about what entrepreneurship actually involves.",
      ask:
        "The owner (judge) wants you to help articulate what entrepreneurship really is, what it requires, and how ethics fits into running a business.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your talking points",
    }),
    judgeQuestions: [
      "How would you describe what entrepreneurship actually requires to someone who's never run a business?",
      "Why does business ethics matter specifically for a small business owner?",
    ],
  },
  {
    title: "Setting a Personal Budget While Starting Hollow Creek Bakery",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:065", description: "Set financial goals" },
      { code: "FI:066", description: "Develop personal budget" },
      { code: "FI:067", description: "Explain the nature of tax liabilities" },
      { code: "FI:068", description: "Interpret a pay stub" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "The owner (judge) left a steady job to start HOLLOW CREEK and is now managing personal expenses on much less predictable income, worried about setting a personal budget that actually works during the business's uncertain first year.",
      ask:
        "The owner (judge) wants you to help think through a personal budget approach and financial goals that make sense for this transition.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your budgeting approach",
    }),
    judgeQuestions: [
      "How should a personal budget change when income becomes unpredictable like this?",
      "What financial goal would you prioritize first during this first uncertain year?",
    ],
  },
  {
    title: "Personal and Business Money Got Mixed Up at Hollow Creek Bakery",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:069", description: "Maintain financial records" },
      { code: "FI:070", description: "Balance a bank account" },
      { code: "FI:071", description: "Demonstrate the wise use of credit" },
      { code: "FI:072", description: "Validate credit history" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "The owner (judge) has been using one personal bank account for both household and bakery expenses, and now can't tell how much the bakery actually earned last month or reconcile the account balance with confidence.",
      ask:
        "The owner (judge) wants you to help explain why this needs to change and how to start keeping proper financial records.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "Why does mixing personal and business money make it so hard to know if the bakery is profitable?",
      "What's the first step in separating these and keeping proper records going forward?",
    ],
  },
  {
    title: "Choosing a Bank for Hollow Creek Bakery",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:073", description: "Protect against identity theft" },
      { code: "FI:074", description: "Prepare personal income tax forms" },
      { code: "FI:075", description: "Describe types of financial-services providers" },
      { code: "FI:076", description: "Discuss considerations in selecting a financial-services provider" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "The owner (judge) is finally opening a dedicated business bank account and is choosing between a large national bank and a local credit union, unsure what actually matters in this decision beyond which one is closer.",
      ask:
        "The owner (judge) wants you to help think through what to consider in choosing a financial-services provider for the bakery.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What should actually matter in choosing between these two options, beyond distance?",
      "What would you want to protect against once the business account is open?",
    ],
  },
  {
    title: "Setting Up Basic Bookkeeping at Hollow Creek Bakery",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:077", description: "Explain types of investments" },
      { code: "FI:081", description: "Describe the concept of insurance" },
      { code: "FI:085", description: "Explain the concept of accounting" },
      { code: "FI:091", description: "Describe the nature of cash flow statements" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "The owner (judge) has been tracking sales on a paper notepad and has no real accounting system, no idea whether the bakery needs business insurance yet, and no picture of cash flow month to month.",
      ask:
        "The owner (judge) wants you to explain the basics of accounting and cash flow and what kind of insurance a business like this might need.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What's the most basic accounting habit HOLLOW CREEK should start with immediately?",
      "What kind of insurance would you flag as worth looking into for a bakery?",
    ],
  },
  {
    title: "Reading the Bakery's First Financial Statements at Hollow Creek Bakery",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:093", description: "Explain the nature of balance sheets" },
      { code: "FI:094", description: "Describe the nature of income statements" },
      { code: "FI:106", description: "Describe the nature of budgets" },
      { code: "FI:270", description: "Explain the need to save and invest" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "An accountant just handed the owner (judge) the bakery's first income statement and balance sheet, and the owner (judge) is staring at them, unsure what the numbers actually mean or how to use them to plan ahead.",
      ask:
        "The owner (judge) wants you to help explain what these two statements show and how they should inform next quarter's budget.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "In plain terms, what's the difference between what these two statements tell us?",
      "How should this information shape next quarter's budget?",
    ],
  },
  {
    title: "Deciding Whether to Hire a Bookkeeper at Hollow Creek Bakery",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:351", description: "Discuss the role of ethics in accounting" },
      { code: "FI:352", description: "Explain the use of technology in accounting" },
      { code: "FI:353", description: "Explain legal considerations for accounting" },
      { code: "FI:354", description: "Explain the role of finance in business" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "The owner (judge) is considering hiring a part-time bookkeeper instead of continuing to handle the books alone, weighing the cost against the time it would free up and the risk of continuing to do it without real training.",
      ask:
        "The owner (judge) wants you to help weigh this decision, including what to look for in a bookkeeper and any legal considerations involved.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What legal consideration should factor into who handles the bakery's books?",
      "What would you look for in a bookkeeper beyond just their price?",
    ],
  },
  {
    title: "Checking Personal Net Worth Before a Business Loan at Hollow Creek Bakery",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:355", description: "Discuss the role of ethics in finance" },
      { code: "FI:356", description: "Explain legal considerations for finance" },
      { code: "FI:560", description: "Write checks" },
      { code: "FI:562", description: "Determine personal net worth" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "The owner (judge) is applying for a small-business loan to buy a second oven, and the lender wants a personal financial statement including net worth, something the owner (judge) has never actually calculated before.",
      ask:
        "The owner (judge) wants you to help calculate and explain personal net worth and flag any legal or ethical considerations in this loan application.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your approach",
    }),
    judgeQuestions: [
      "What goes into calculating personal net worth?",
      "What ethical consideration matters in how this loan application is presented?",
    ],
  },
  {
    title: "Managing a New Business Credit Card at Hollow Creek Bakery",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:565", description: "Pay bills" },
      { code: "FI:568", description: "Control debt" },
      { code: "FI:782", description: "Calculate the cost of credit" },
      { code: "FI:783", description: "Make responsible financial decisions" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "The owner (judge) just got approved for a business credit card and is tempted to use it to buy a large batch of specialty ingredients on sale, worried about whether that's a responsible use of credit or setting up debt that's hard to pay off.",
      ask:
        "The owner (judge) wants you to help think through whether this purchase makes sense and how to use this new credit responsibly.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What would you calculate before deciding to make this purchase on credit?",
      "What would responsible use of this new credit card actually look like?",
    ],
  },
  {
    title: "Understanding the Basics of Running a Business at Hollow Creek Bakery",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "EC:001", description: "Describe the concepts of economics and economic activities" },
      { code: "EC:002", description: "Distinguish between economic goods and services" },
      { code: "EC:003", description: "Explain the concept of economic resources" },
      { code: "EC:004", description: "Determine economic utilities created by business activities" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "A curious customer asked the owner (judge) what actually makes a loaf of bread \"worth\" the price on the tag, and the owner (judge) struggled to explain it clearly in the moment.",
      ask:
        "The owner (judge) wants you to help put together a clear, simple explanation using basic economic concepts.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear how you'd explain this",
    }),
    judgeQuestions: [
      "How would you explain what makes this bread 'worth' its price using economic resources?",
      "What's the difference between the good (the bread) and the value the bakery adds through its service?",
    ],
  },
  {
    title: "Pricing a New Sourdough Loaf at Hollow Creek Bakery",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "EC:005", description: "Explain the principles of supply and demand" },
      { code: "EC:006", description: "Describe the functions of prices in markets" },
      { code: "EC:009", description: "Explain the concept of private enterprise" },
      { code: "EC:010", description: "Identify factors affecting a business's profit" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "A new artisan sourdough loaf has become surprisingly popular, selling out within an hour every day, and the owner (judge) is deciding whether to raise the price, bake more, or leave things as they are.",
      ask:
        "The owner (judge) wants you to explain the economic factors at play and recommend what to do.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What does selling out this fast tell us according to supply and demand?",
      "What factors would you weigh in deciding whether to raise the price or bake more?",
    ],
  },
  {
    title: "Weighing the Risk of a Second Bakery Location at Hollow Creek Bakery",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "EC:011", description: "Determine factors affecting business risk" },
      { code: "EC:012", description: "Explain the concept of competition" },
      { code: "EC:013", description: "Explain the concept of productivity" },
      { code: "EC:018", description: "Determine the impact of business cycles on business activities" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "The owner (judge) is considering opening a second HOLLOW CREEK location downtown, where two other bakeries already compete for the same morning coffee-and-pastry crowd, and is unsure about the real risk of expanding right now.",
      ask:
        "The owner (judge) wants you to walk through the business-risk and competitive factors involved in this decision.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your analysis",
    }),
    judgeQuestions: [
      "What's the actual business risk in opening across from two competitors?",
      "How might broader economic ups and downs affect a second location's success?",
    ],
  },
  {
    title: "Explaining the Bakery's Role in the Community at Hollow Creek Bakery",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "EC:070", description: "Explain the role of business in society" },
      { code: "EC:071", description: "Describe types of business activities" },
      { code: "EC:072", description: "Describe the nature of taxes" },
      { code: "EC:106", description: "Explain the nature of business ethics" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "A local elementary school class is visiting the bakery for a field trip, and the owner (judge) asked you to help explain, in kid-friendly terms, what a small business actually does for the neighborhood and why it has to pay taxes and act ethically.",
      ask:
        "The owner (judge) wants you to be ready to explain this simply to a group of young students.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear how you'd explain this to the kids",
    }),
    judgeQuestions: [
      "How would you explain this bakery's role in the neighborhood to a group of kids?",
      "How would you explain, simply, why the bakery has to pay taxes?",
    ],
  },
  {
    title: "Reading an Economic Slowdown's Effect on Hollow Creek Bakery",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "EC:081", description: "Discuss the measure of consumer spending as an economic indicator" },
      { code: "EC:082", description: "Discuss the impact of a nation's unemployment rates" },
      { code: "EC:083", description: "Describe the economic impact of inflation on business" },
      { code: "EC:084", description: "Explain the economic impact of interest-rate fluctuations" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "Sales at HOLLOW CREEK have softened noticeably this month, and the owner (judge) has heard about rising interest rates and inflation on the news but isn't sure how those bigger trends connect to fewer people buying a loaf of bread.",
      ask:
        "The owner (judge) wants you to explain how these broader economic conditions could realistically be affecting a small bakery like this one.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your read on this",
    }),
    judgeQuestions: [
      "How might inflation be changing customers' daily spending habits here?",
      "What would you watch for to know if this softening is part of a bigger trend?",
    ],
  },
  {
    title: "Sourcing Flour From Overseas for the First Time at Hollow Creek Bakery",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "EC:016", description: "Explain the nature of global trade" },
      { code: "EC:109", description: "Discuss the impact of globalization on business" },
      { code: "EC:110", description: "Explain cultural considerations that impact global business relations" },
      { code: "EC:141", description: "Identify requirements for international business travel (e.g., passport, visa, proof of citizenship, immunizations, and sponsorship letters)" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "A specialty flour mill overseas has offered HOLLOW CREEK a great price on a unique grain, and the owner (judge) is even considering visiting the mill in person to build the relationship, but has never dealt with global trade or international travel for business before.",
      ask:
        "The owner (judge) wants you to explain what's involved in sourcing internationally and what to prepare for if this trip happens.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What cultural consideration should the owner keep in mind building this relationship?",
      "What would need to be prepared for international business travel like this?",
    ],
  },
  {
    title: "Deciding to Become an Entrepreneur at Hollow Creek Bakery",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:002", description: "Maintain appropriate personal appearance" },
      { code: "PD:009", description: "Demonstrate systematic behavior" },
      { code: "PD:013", description: "Assess personal interests and skills needed for success in business" },
      { code: "PD:017", description: "Make decisions" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "You've mentioned wanting to eventually start your own business someday, and the owner (judge), during a quiet afternoon, asks what's actually stopping you and what skills you think you'd need to make that decision.",
      ask:
        "The owner (judge) wants an honest reflection on what interests and skills you'd need to assess before taking that leap.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What skills do you think you'd need to assess in yourself before starting a business?",
      "What's actually holding you back from making this decision right now?",
    ],
  },
  {
    title: "Balancing a Day Job While Dreaming of Starting a Business at Hollow Creek Bakery",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:018", description: "Set personal goals" },
      { code: "PD:019", description: "Use time-management skills" },
      { code: "PD:020", description: "Analyze employer expectations in the business environment" },
      { code: "PD:021", description: "Explain the rights of workers" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "You want to start experimenting with your own baking side project on weekends, but you're worried about how it might look to the owner (judge) if you're also working shifts here, and whether that's even something you're allowed to do.",
      ask:
        "The owner (judge) wants you to talk through how you'd manage your time and expectations around this without it creating a conflict.",
      location: "the bakery's back kitchen",
      greetingAsk: "to talk through this",
    }),
    judgeQuestions: [
      "How would you manage your time between this job and your own side project?",
      "What would you want to understand about your rights and obligations as an employee here?",
    ],
  },
  {
    title: "Hiring the Bakery's First Employee at Hollow Creek Bakery",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:026", description: "Utilize job-search strategies" },
      { code: "PD:027", description: "Complete a job application" },
      { code: "PD:028", description: "Interview for a job" },
      { code: "PD:031", description: "Prepare a resume" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "The owner (judge) needs to hire the bakery's first employee besides you and wants to build a real application and interview process rather than just hiring the first friend who asks about a job.",
      ask:
        "The owner (judge) wants you to help design a simple application and interview process for this hire.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your hiring process idea",
    }),
    judgeQuestions: [
      "What should this application actually ask beyond just availability?",
      "What would you want to find out in the interview that an application can't tell you?",
    ],
  },
  {
    title: "Continuing to Learn as a First-Time Business Owner at Hollow Creek Bakery",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:033", description: "Explain the need for ongoing education as a worker" },
      { code: "PD:034", description: "Explain possible advancement patterns for jobs" },
      { code: "PD:035", description: "Identify skills needed to enhance career progression" },
      { code: "PD:077", description: "Demonstrate problem-solving skills" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "The owner (judge) admits to feeling behind on basic business skills like accounting and marketing, having jumped straight from baking as a hobby into running a business without any formal training in those areas.",
      ask:
        "The owner (judge) wants you to help identify what ongoing learning would help most right now and how to prioritize it.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What skill gap would you recommend addressing first?",
      "What resources would you suggest for learning this without taking too much time away from running the bakery?",
    ],
  },
  {
    title: "Finding a Mentor for Hollow Creek Bakery",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:036", description: "Utilize resources that can contribute to professional development (e.g., trade journals/periodicals, professional/trade associations, classes/seminars, trade shows, and mentors)" },
      { code: "PD:037", description: "Use networking techniques to identify employment opportunities" },
      { code: "PD:022", description: "Identify sources of career information" },
      { code: "PD:023", description: "Identify tentative occupational interest" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "HOLLOW CREEK BAKERY",
      judgeRole: "the owner",
      problem:
        "The owner (judge) has been running HOLLOW CREEK alone with no outside guidance and is starting to realize how much a mentor or local small-business association could have helped avoid some early mistakes.",
      ask:
        "The owner (judge) wants you to help identify what resources or networking opportunities could provide that support going forward.",
      location: "the bakery's back kitchen",
      greetingAsk: "to hear what you'd recommend",
    }),
    judgeQuestions: [
      "What kind of resource or association would you look into first?",
      "How would you go about actually finding and approaching a potential mentor?",
    ],
  },
];

const POE_EVENT: EventCaseStudySeed = {
  eventSlug: "principles-of-entrepreneurship",
  eventName: "Principles of Entrepreneurship",
  careerCluster: "Entrepreneurship",
  careerPathway: null,
  format: "PRINCIPLES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: POE_CASES,
};

// ---------------------------------------------------------------------------
// entrepreneurship-team-decision-making (TDM, same 33-code Cluster pool)
// ---------------------------------------------------------------------------
const ETDM_CASES: CaseStudySeed[] = [
  {
    title: "Launching Cinder & Sage's First Ad Campaign",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
      { code: "PR:247", description: "Describe word-of-mouth channels used to communicate with targeted audiences" },
      { code: "PR:249", description: "Identify communications channels used in sales promotion" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "You're two weeks from launching your handmade candle business at a local market stall, and between the two of you, you have a small budget but no shared plan for how to actually spend it or which channels matter most for reaching first-time buyers.",
      ask:
        "The small-business mentor (judge) wants your team to explain the promotional mix and propose a launch plan across paid and word-of-mouth channels.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your launch plan",
    }),
    judgeQuestions: [
      "With this budget, which channels would your team prioritize first?",
      "How would you use word-of-mouth to extend the reach of a small ad budget?",
    ],
  },
  {
    title: "A Bad Review Threatens Cinder & Sage's Launch Buzz",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:250", description: "Explain communications channels used in public-relations activities" },
      { code: "PR:252", description: "Identify types of public-relations activities" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "A candle from your very first batch had an uneven scent throw, and the customer left a public review calling the whole line \"inconsistent,\" right as your launch social posts were starting to gain traction.",
      ask:
        "The small-business mentor (judge) wants your team to propose a PR response to this review and how to keep your promotional momentum going despite it.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's response plan",
    }),
    judgeQuestions: [
      "How would your team respond publicly to this review without sounding defensive?",
      "What PR activity would help rebuild momentum after this?",
    ],
  },
  {
    title: "Redesigning Cinder & Sage's Pouring Process After a Bottleneck",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:303", description: "Discuss the nature of supply chain management" },
      { code: "OP:327", description: "Discuss the nature of business analysis" },
      { code: "OP:474", description: "Discuss business process thinking and its impact" },
      { code: "OP:475", description: "Describe the factors that influence business process design" },
      { code: "OP:476", description: "Explain the causes of business process changes" },
      { code: "OP:477", description: "Explain the impact of supply chains on business performance" },
      { code: "PM:003", description: "Explain the concept of product mix" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "A wholesale order for 200 candles came in, far more than your current one-batch-at-a-time pouring process was ever designed to handle, and you're realizing your current workflow won't scale without a redesign.",
      ask:
        "The small-business mentor (judge) wants your team to analyze the current process and propose a redesign that can handle this order size.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What's the biggest bottleneck in your current process at this order size?",
      "What would your team change first to make this scalable?",
    ],
  },
  {
    title: "Identifying Cinder & Sage's Real Target Market",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "FI:541", description: "Interpret cash-flow statements" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "The two of you disagree about who CINDER & SAGE is actually for, one of you wants to chase budget-conscious gift shoppers, the other wants to target higher-end home decor customers, and your cash flow can't support marketing to both audiences well right now.",
      ask:
        "The small-business mentor (judge) wants your team to work through this disagreement and identify one clear target market and pricing approach.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear how your team resolved this",
    }),
    judgeQuestions: [
      "How did your team decide between these two target markets?",
      "How does this choice change your pricing approach?",
    ],
  },
  {
    title: "Should Cinder & Sage Sell Through a Distribution Channel?",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "A regional gift-shop chain wants to carry CINDER & SAGE candles, but would require a wholesale discount that cuts your margin significantly, and you have no research yet on whether this distribution channel would actually grow your business or just cannibalize direct sales.",
      ask:
        "The small-business mentor (judge) wants your team to explain what research would inform this decision and recommend whether to pursue this channel.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What research would tell your team if this channel is worth the margin cut?",
      "How might this channel affect your direct sales at markets and online?",
    ],
  },
  {
    title: "Building Real Governance Before Cinder & Sage Takes on Investors",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
      { code: "PD:214", description: "Describe the components of a well-governed company (e.g., board of directors, reporting, transparency, internal and external audit functions)" },
      { code: "PD:302", description: "Identify the factors that impact governance structures" },
      { code: "QM:001", description: "Explain the nature of quality management" },
      { code: "RM:062", description: "Discuss the nature of enterprise risk management (ERM)" },
      { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
      { code: "SM:095", description: "Explain the nature of change management" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "A local investor is interested in putting money into CINDER & SAGE to fund a bigger production space, but wants to see a real governance structure and quality process in place first, something the two of you have only ever handled with a handshake agreement between yourselves.",
      ask:
        "The small-business mentor (judge) wants your team to propose a basic governance and quality structure that would satisfy this investor.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's proposal",
    }),
    judgeQuestions: [
      "What would this investor actually want to see beyond a handshake agreement?",
      "What quality process would you put in place to back this up?",
    ],
  },
  {
    title: "Managing Change as Cinder & Sage Hires Its First Employee",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "OP:303", description: "Discuss the nature of supply chain management" },
      { code: "OP:327", description: "Discuss the nature of business analysis" },
      { code: "OP:474", description: "Discuss business process thinking and its impact" },
      { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
      { code: "SM:095", description: "Explain the nature of change management" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "QM:001", description: "Explain the nature of quality management" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "For the first time, you're bringing on a part-time employee to help with production, and both of you are realizing that decisions you used to make instantly between the two of you now need to be explained, trained, and trusted to someone new.",
      ask:
        "The small-business mentor (judge) wants your team to think through how to manage this change and keep quality consistent as you're no longer the only two people making every candle.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What's the hardest part of this transition for a two-person founding team?",
      "How would you make sure quality stays consistent with someone new in the process?",
    ],
  },
  {
    title: "A Wax Supplier Shortage Threatens Cinder & Sage's Holiday Season",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "Your primary soy-wax supplier just announced a shortage right before the holiday season, your busiest time of year, and finding a backup supplier means either paying more or reformulating slightly, which could affect both cost and how you market the product.",
      ask:
        "The small-business mentor (judge) wants your team to weigh this supplier situation and recommend how to handle sourcing, pricing, and messaging through the holiday season.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "How would your team decide between paying more or reformulating the product?",
      "How would you message this change to customers if you do reformulate?",
    ],
  },
  {
    title: "Cinder & Sage's Second Ad Campaign for a New Scent Line",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
      { code: "PR:247", description: "Describe word-of-mouth channels used to communicate with targeted audiences" },
      { code: "PR:249", description: "Identify communications channels used in sales promotion" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "You're launching a new fall scent line, but the two of you disagree on the promotional approach, one wants to spend the whole budget on paid social ads, the other wants to rely on sending free samples to past customers for word-of-mouth.",
      ask:
        "The small-business mentor (judge) wants your team to resolve this and propose one coordinated promotional plan for the launch.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "How did your team decide between these two approaches, or did you combine them?",
      "What would make this launch's word-of-mouth actually spread?",
    ],
  },
  {
    title: "Responding to a Copycat Competitor at Cinder & Sage",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:250", description: "Explain communications channels used in public-relations activities" },
      { code: "PR:252", description: "Identify types of public-relations activities" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "Another local maker has started selling candles in nearly identical packaging to yours, and while you're not sure it's legally actionable, you want to make sure customers still know which brand is the original.",
      ask:
        "The small-business mentor (judge) wants your team to propose a promotional response that reinforces your brand identity without picking a public fight.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "How would your team reinforce your brand identity without directly calling out the copycat?",
      "What PR activity would help here without escalating this into a public dispute?",
    ],
  },
  {
    title: "Scaling Cinder & Sage's Production for a Big Retail Order",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:303", description: "Discuss the nature of supply chain management" },
      { code: "OP:327", description: "Discuss the nature of business analysis" },
      { code: "OP:474", description: "Discuss business process thinking and its impact" },
      { code: "OP:475", description: "Describe the factors that influence business process design" },
      { code: "OP:476", description: "Explain the causes of business process changes" },
      { code: "OP:477", description: "Explain the impact of supply chains on business performance" },
      { code: "PM:003", description: "Explain the concept of product mix" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "A regional retailer wants a standing monthly order of 500 candles, which would require CINDER & SAGE to essentially double its current production capacity without disrupting the smaller custom orders that built your reputation.",
      ask:
        "The small-business mentor (judge) wants your team to analyze what's needed to scale production and propose how to protect the custom-order side of the business.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What would your team need to change first to hit this production volume?",
      "How would you protect your custom-order business while scaling for this retailer?",
    ],
  },
  {
    title: "Picking a Distribution Strategy for Cinder & Sage's Online Store",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "FI:541", description: "Interpret cash-flow statements" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "You're finally launching an online store, and need to decide whether to ship nationally right away or start with a smaller regional market to manage cash flow and fulfillment more carefully.",
      ask:
        "The small-business mentor (judge) wants your team to identify the right initial market and how it should affect pricing and shipping decisions.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would push your team toward starting regional rather than national?",
      "How does this choice affect your pricing and shipping strategy?",
    ],
  },
  {
    title: "Testing a Wholesale Partnership Idea at Cinder & Sage",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "A boutique hotel wants to offer CINDER & SAGE candles in its rooms as a co-branded amenity, an idea that excites one founder and worries the other about diluting the brand and setting a bad pricing precedent.",
      ask:
        "The small-business mentor (judge) wants your team to research this opportunity and reach a shared recommendation.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would your team want to learn before committing to this partnership?",
      "How would you price this deal without setting a bad precedent for future wholesale asks?",
    ],
  },
  {
    title: "Writing Cinder & Sage's First Real Business Plan",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
      { code: "PD:214", description: "Describe the components of a well-governed company (e.g., board of directors, reporting, transparency, internal and external audit functions)" },
      { code: "PD:302", description: "Identify the factors that impact governance structures" },
      { code: "QM:001", description: "Explain the nature of quality management" },
      { code: "RM:062", description: "Discuss the nature of enterprise risk management (ERM)" },
      { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
      { code: "SM:095", description: "Explain the nature of change management" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "A local business grant program requires a written business plan covering governance, quality standards, and risk management, and the two of you have run everything so far on instinct and informal agreement between yourselves.",
      ask:
        "The small-business mentor (judge) wants your team to draft the basics of this plan together.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's draft",
    }),
    judgeQuestions: [
      "What governance structure makes sense for a two-person founding team like yours?",
      "What's the biggest risk to your business that this plan should address?",
    ],
  },
  {
    title: "A Disagreement Over Equal Ownership at Cinder & Sage",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "OP:303", description: "Discuss the nature of supply chain management" },
      { code: "OP:327", description: "Discuss the nature of business analysis" },
      { code: "OP:474", description: "Discuss business process thinking and its impact" },
      { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
      { code: "SM:095", description: "Explain the nature of change management" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "QM:001", description: "Explain the nature of quality management" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "One founder has been putting in significantly more hours on production while the other has focused on sales and social media, and now there's tension about whether the original 50/50 ownership split still feels fair to both of you.",
      ask:
        "The small-business mentor (judge) wants your team to work through this disagreement and propose how to resolve it fairly.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear how your team is thinking about this",
    }),
    judgeQuestions: [
      "How would your team fairly evaluate each partner's actual contribution here?",
      "What would you propose changing, if anything, about the ownership structure?",
    ],
  },
  {
    title: "Choosing Between Two Packaging Suppliers at Cinder & Sage",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "You're choosing between a cheaper standard packaging supplier and a pricier eco-friendly one that fits your brand's sustainability messaging better, and the two of you disagree about whether customers actually care enough to justify the added cost.",
      ask:
        "The small-business mentor (judge) wants your team to weigh this decision and its effect on pricing and brand messaging.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "How would your team find out whether customers actually value this sustainability angle?",
      "How would this choice affect your pricing and how you promote the brand?",
    ],
  },
  {
    title: "Handling a Late Wholesale Payment at Cinder & Sage",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "FI:541", description: "Interpret cash-flow statements" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "Your largest wholesale account is now 45 days late on payment, and it's straining your cash flow right as you need to buy materials for the next production run, putting your team in a tough spot with a customer you don't want to alienate.",
      ask:
        "The small-business mentor (judge) wants your team to recommend how to handle this payment issue while protecting the relationship and your own cash flow.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "How would your team approach this account without damaging the relationship?",
      "What would you change about payment terms going forward to avoid this again?",
    ],
  },
  {
    title: "Deciding Whether to Trademark the Cinder & Sage Brand",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "After the copycat packaging incident, you're considering trademarking your brand name and logo, but it costs more than either of you expected, and you're not sure it's worth it at your current size.",
      ask:
        "The small-business mentor (judge) wants your team to research what a trademark would actually protect and recommend whether it's worth the cost now.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would a trademark actually protect that you don't already have?",
      "How would your team decide if this cost is worth it at your current size?",
    ],
  },
  {
    title: "Preparing Cinder & Sage for Its First Trade Show",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
      { code: "PD:214", description: "Describe the components of a well-governed company (e.g., board of directors, reporting, transparency, internal and external audit functions)" },
      { code: "PD:302", description: "Identify the factors that impact governance structures" },
      { code: "QM:001", description: "Explain the nature of quality management" },
      { code: "RM:062", description: "Discuss the nature of enterprise risk management (ERM)" },
      { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
      { code: "SM:095", description: "Explain the nature of change management" },
    ],
    eventSituation: buildSituation({
      role: "the co-founders",
      company: "CINDER & SAGE",
      judgeRole: "the small-business mentor",
      problem:
        "CINDER & SAGE was accepted into a regional gift trade show, a huge opportunity, but preparing a professional booth presence and enough inventory represents a real financial risk if the show doesn't generate the orders you're hoping for.",
      ask:
        "The small-business mentor (judge) wants your team to think through how to manage this opportunity's risk while presenting the business professionally.",
      location: "the mentor's small-business office",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "How would your team manage the financial risk of this show if orders don't come through?",
      "What would 'presenting professionally' actually require for a business your size?",
    ],
  },
];

ETDM_CASES.push({
  title: "Training Cinder & Sage's First Employee to Sell at the Market Stall",
  instructionalArea: "Selling",
  performanceIndicators: [
    { code: "SE:017", description: "Explain the nature and scope of the selling function" },
    { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
    { code: "QM:001", description: "Explain the nature of quality management" },
    { code: "RM:062", description: "Discuss the nature of enterprise risk management (ERM)" },
    { code: "SM:094", description: "Describe relationship among innovation, learning, and change" },
    { code: "SM:095", description: "Explain the nature of change management" },
    { code: "PD:302", description: "Identify the factors that impact governance structures" },
  ],
  eventSituation: buildSituation({
    role: "the co-founders",
    company: "CINDER & SAGE",
    judgeRole: "the small-business mentor",
    problem:
      "Your new part-time employee is friendly with market customers but doesn't know the story behind each scent the way the two of you do, and a few customers have mentioned missing that personal touch that made them buy in the first place.",
    ask:
      "The small-business mentor (judge) wants your team to figure out how to train this employee to sell with the same personal connection without it feeling forced.",
    location: "the mentor's small-business office",
    greetingAsk: "to hear your team's training plan",
  }),
  judgeQuestions: [
    "How would your team teach this personal connection rather than just product facts?",
    "How would you know if this training is actually translating into sales?",
  ],
});

const ETDM_EVENT: EventCaseStudySeed = {
  eventSlug: "entrepreneurship-team-decision-making",
  eventName: "Entrepreneurship Team Decision Making",
  careerCluster: "Entrepreneurship",
  careerPathway: null,
  format: "TEAM_DECISION_MAKING",
  prepMinutes: 30,
  presentMinutes: 15,
  cases: ETDM_CASES,
};

export const ENTREPRENEURSHIP_CASE_STUDY_SEED: EventCaseStudySeed[] = [ENT_EVENT, POE_EVENT, ETDM_EVENT];
