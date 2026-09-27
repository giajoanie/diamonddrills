/**
 * Marketing cluster case studies for the 10 roleplay events not covered by
 * the AAM sample batch (case-study-seed-data.ts). Performance indicators are
 * pulled verbatim from this app's own seeded PerformanceIndicator rows for
 * each event's exam bank/pathway (Cluster + Pathway tier for Series/TDM
 * events; Core tier, drawn from the shared Business Administration Core
 * bank, for Principles events — see getPerformanceIndicatorsForEvent).
 *
 * automotive-services-marketing-series, business-services-marketing-series,
 * food-marketing-series, and sports-and-entertainment-marketing-series all
 * share the identical "Marketing Management" pathway PI pool (144 rows), so
 * their 20 cases reuse the same PI groupings under different companies/
 * industries — the same way DECA's own prep materials work across events on
 * one pathway. The three Team Decision Making events share one 83-row pool
 * the same way.
 */
import { buildSituation } from "./case-study-scenario-builder";
import type { CaseStudySeed, EventCaseStudySeed } from "./case-study-seed-data";

// ---------------------------------------------------------------------------
// automotive-services-marketing-series (SERIES, Marketing Management pathway)
// ---------------------------------------------------------------------------
const AUTO_CASES: CaseStudySeed[] = [
  {
    title: "Confusing Quick-Lube Launch Ad at Velocity Auto Care",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:014", description: "Explain the components of advertisements" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the marketing manager",
      problem:
        "The marketing manager (judge) just reviewed the radio and social ads for VELOCITY's new 15-minute quick-lube service and found that most customers calling in still ask \"wait, do I need an appointment?\" and \"is this the same as your full service?\" The ads mention the price but never actually explain what the service includes or how it's different from a standard oil change.",
      ask:
        "The marketing manager (judge) wants you to identify which promotional elements the current ads are missing and propose a clearer ad concept, choosing the right mix of media, that actually tells customers what quick-lube is and how to use it.",
      location: "the marketing manager's office",
      greetingAsk: "to hear your read on the current ads",
    }),
    judgeQuestions: [
      "What's missing from the current ad that's causing all these confused phone calls?",
      "Which advertising media would you use to reach commuters who need a fast oil change?",
    ],
  },
  {
    title: "Spring Tire Sale Promotional Plan at Velocity Auto Care",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:073", description: "Explain the nature of a promotional plan" },
      { code: "PR:076", description: "Coordinate activities in the promotional mix" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
      { code: "PR:099", description: "Describe the use of business ethics in promotion" },
      { code: "PR:100", description: "Describe the use of technology in the promotion function" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the marketing manager",
      problem:
        "VELOCITY's annual spring tire sale is three weeks out, and last year's postcards, in-store signs, and email blast all went out on different days with different sale prices listed because no one coordinated them against a single plan. A customer this week called out a shop associate for quoting a price that didn't match the mailer she'd received.",
      ask:
        "The marketing manager (judge) wants you to build a promotional plan that coordinates direct mail, email, and in-store signage around one consistent offer and timeline, and to flag any ethical considerations in how the sale price gets advertised.",
      location: "the marketing manager's office",
      greetingAsk: "to walk through your plan",
    }),
    judgeQuestions: [
      "How would you make sure the mailer, the email, and the in-store signs all say the same thing this time?",
      "What's an ethical line we shouldn't cross when advertising a limited-time tire price?",
    ],
  },
  {
    title: "Free Inspection Offer Draws a Complaint at Velocity Auto Care",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:101", description: "Describe the regulation of promotion" },
      { code: "PR:123", description: "Describe the use of color in advertisements" },
      { code: "PR:222", description: "Describe the elements of design" },
      { code: "PR:247", description: "Describe word-of-mouth channels used to communicate with targeted audiences" },
      { code: "PR:249", description: "Identify communications channels used in sales promotion" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the marketing manager",
      problem:
        "A customer posted online that VELOCITY's \"free 21-point inspection\" flyer felt like a bait-and-switch once she was in the chair and quoted $400 in repairs. The marketing manager (judge) wants to know whether the flyer itself crossed a line, since it never disclosed that the inspection could lead to a paid-repair recommendation.",
      ask:
        "The marketing manager (judge) wants you to review the flyer against promotion regulations, redesign it so the offer is honest and still eye-catching, and recommend a word-of-mouth or sales-promotion channel to rebuild goodwill with past customers.",
      location: "the front counter area",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What disclosure was this flyer missing that could have avoided the complaint?",
      "What's one word-of-mouth channel you'd use to repair our reputation after this?",
    ],
  },
  {
    title: "Community Car-Care Clinic Needs a PR Push at Velocity Auto Care",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:250", description: "Explain communications channels used in public-relations activities" },
      { code: "PR:252", description: "Identify types of public-relations activities" },
      { code: "PR:253", description: "Discuss internal and external audiences for public-relations activities" },
      { code: "PR:271", description: "Create written briefs for outside agencies/consultants" },
      { code: "PR:315", description: "Explain the importance of company involvement in community activities" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the marketing manager",
      problem:
        "VELOCITY is hosting a free \"winter car-care clinic\" for the community next month, checking batteries and tire pressure for anyone who drives in, but the marketing manager (judge) has no press release drafted, hasn't decided which local outlets to contact, and hired a freelance PR consultant who has no brief to work from.",
      ask:
        "The marketing manager (judge) wants you to identify the right PR activities and audiences for this event and draft a brief the outside consultant can actually use to pitch local media.",
      location: "the marketing manager's office",
      greetingAsk: "to hear your PR plan",
    }),
    judgeQuestions: [
      "Who are the internal and external audiences we need to think about for this event?",
      "What belongs in the brief so the outside consultant doesn't have to guess what we want?",
    ],
  },
  {
    title: "Outdated Ad Creative at Velocity Auto Care",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:274", description: "Describe digital color concepts" },
      { code: "PR:295", description: "Discuss the nature of typography" },
      { code: "PR:314", description: "Explain the impact of color harmonies on composition" },
      { code: "PR:322", description: "Explain the use of illustrations in advertisements" },
      { code: "PR:334", description: "Identify types of drawing media" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the marketing manager",
      problem:
        "The marketing manager (judge) has noticed VELOCITY's digital ads still use a clashing color scheme and a cramped, hard-to-read font from a template someone downloaded years ago, and a competitor's clean, modern ad just started appearing right next to VELOCITY's on the same search results page.",
      ask:
        "The marketing manager (judge) wants you to propose a refreshed ad design, addressing color, type, and use of illustration, that looks current and actually stands out next to the competitor's ad.",
      location: "the marketing manager's office",
      greetingAsk: "to see your redesign concept",
    }),
    judgeQuestions: [
      "What's wrong with the current color and type choices, specifically?",
      "How would you use illustration or imagery to make this ad stand out?",
    ],
  },
  {
    title: "No Real Customer Research at Velocity Auto Care",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "IM:025", description: "Explain the role of ethics in marketing-information management" },
      { code: "IM:062", description: "Explain techniques for processing marketing data" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the marketing manager",
      problem:
        "VELOCITY has never formally researched its customers — the marketing manager (judge) has been picking new services and promotions based on gut feeling, and a recent guess (adding a detailing service) has sat mostly unused for two months while a service customers keep asking about, fleet maintenance, still isn't offered.",
      ask:
        "The marketing manager (judge) wants you to explain what marketing-information management actually involves and propose a simple, ethical way to start collecting and using real customer data before the next service decision.",
      location: "the marketing manager's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What's the risk of continuing to make service decisions without any real data?",
      "What's one ethical guardrail we should follow once we start collecting customer data?",
    ],
  },
  {
    title: "Designing a New-Service Survey at Velocity Auto Care",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:281", description: "Describe options businesses use to obtain marketing research data (i.e., primary and secondary research)" },
      { code: "IM:282", description: "Discuss the nature of marketing research problems/issues" },
      { code: "IM:284", description: "Describe methods used to design marketing research studies (i.e., descriptive, exploratory, and causal)" },
      { code: "IM:285", description: "Discuss the nature of sampling plans (i.e., who, how many, how chosen)" },
      { code: "IM:289", description: "Describe data-collection methods (e.g., observations, mail, diaries, phone, internet, discussion groups, interviews, scanners, tracking tools)" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the marketing manager",
      problem:
        "The marketing manager (judge) wants to know whether customers would actually pay for a fleet-maintenance package before building it out, but has no idea where to start beyond \"maybe just ask people at the counter.\"",
      ask:
        "The marketing manager (judge) wants you to design a short research study — what kind of research, who to sample, and how to collect the data — that would give a real answer before investing in the new service.",
      location: "the marketing manager's office",
      greetingAsk: "to hear your research design",
    }),
    judgeQuestions: [
      "Who exactly should we be sampling to answer this question?",
      "What data-collection method makes the most sense for a shop our size?",
    ],
  },
  {
    title: "A Flawed Satisfaction Survey at Velocity Auto Care",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:292", description: "Identify sources of error in a research project (e.g., response errors, interviewer errors, non-response errors, sample design)" },
      { code: "IM:293", description: "Evaluate questionnaire design (e.g., types of questions, question wording, routing, sequencing, length, layout)" },
      { code: "IM:418", description: "Explain characteristics of effective data-collection instruments" },
      { code: "IM:419", description: "Describe the regulation of marketing-information management" },
      { code: "IM:428", description: "Assess appropriateness of marketing research for the problem/issue (e.g., research methods, sources of information, timeliness of information, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the marketing manager",
      problem:
        "VELOCITY's new post-visit satisfaction survey is getting a 4% response rate, and the handful of responses that come in are almost all five-star ratings with no useful comments — the marketing manager (judge) suspects the survey itself is the problem, not the actual service quality.",
      ask:
        "The marketing manager (judge) wants you to evaluate the current survey's design and identify what's causing the low, skewed response rate, then propose a redesigned instrument that will actually collect usable feedback.",
      location: "the marketing manager's office",
      greetingAsk: "to hear what's wrong with the survey",
    }),
    judgeQuestions: [
      "What about this survey's design is likely scaring off honest, mixed feedback?",
      "What would you change first to raise the response rate?",
    ],
  },
  {
    title: "Which Marketing Channel Is Actually Working at Velocity Auto Care",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:347", description: "Display data in charts/graphs or in tables" },
      { code: "IM:390", description: "Prepare written reports for decision-making" },
      { code: "IM:394", description: "Provide sales analysis reports" },
      { code: "IM:469", description: "Monitor/measure customer “buzz”" },
      { code: "IM:470", description: "Track channel management cost data" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the shop owner",
      problem:
        "The shop owner (judge) is reviewing next year's marketing budget and wants to know whether the radio ads, the social media posts, or the postcard mailers are actually driving appointments, since all three currently get roughly the same monthly spend with no way to tell which is working.",
      ask:
        "The shop owner (judge) wants you to pull together a simple report, with the data displayed clearly, comparing the cost and results of each channel and recommending where next year's budget should shift.",
      location: "the shop owner's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "Which channel does your data say is earning its budget, and which isn't?",
      "How did you measure results for a channel like social media where a 'sale' isn't tracked directly?",
    ],
  },
  {
    title: "Should Velocity Auto Care Add EV Service?",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:021", description: "Explain the nature of product/service branding" },
      { code: "PM:024", description: "Identify the impact of product life cycles on marketing decisions" },
      { code: "PM:042", description: "Describe factors used by marketers to position products/services" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the shop owner",
      problem:
        "Electric vehicles are becoming common in the area, and the shop owner (judge) is deciding whether to add EV maintenance and tire service to VELOCITY's lineup, worried about diluting the shop's identity as a traditional gas-engine specialist while also not wanting to miss a growing market.",
      ask:
        "The shop owner (judge) wants you to recommend whether and how to add EV service to the product mix, including how it should be branded and positioned so it doesn't confuse existing customers.",
      location: "the shop owner's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "How would you position this new service so it doesn't feel disconnected from our current brand?",
      "What's the risk of waiting another year to decide on this?",
    ],
  },
  {
    title: "Bundling the Oil Change Package at Velocity Auto Care",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:020", description: "Explain warranties and guarantees" },
      { code: "PM:040", description: "Explain business ethics in product/service management" },
      { code: "PM:041", description: "Describe the nature of product bundling" },
      { code: "PM:127", description: "Identify methods/techniques to generate a product idea" },
      { code: "PM:128", description: "Generate product ideas" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the shop owner",
      problem:
        "The shop owner (judge) wants a new \"Complete Care\" bundle combining an oil change, tire rotation, and multi-point inspection at a single price, but is unsure what to promise as a warranty on the bundled work and worried that bundling could look like it's pressuring customers into services they don't need.",
      ask:
        "The shop owner (judge) wants you to propose the bundle's makeup and warranty terms, and explain how to market it so it's clearly a value, not a hidden upsell.",
      location: "the shop owner's office",
      greetingAsk: "to hear your bundle proposal",
    }),
    judgeQuestions: [
      "What warranty terms make sense for a bundle like this?",
      "How do we make sure this doesn't come across as pressuring customers into extra work?",
    ],
  },
  {
    title: "Rebranding Against a New Chain Competitor at Velocity Auto Care",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:206", description: "Explain the nature of corporate branding" },
      { code: "PM:207", description: "Describe factors used by businesses to position corporate brands" },
      { code: "PM:214", description: "Communicate core values of product/service" },
      { code: "PM:246", description: "Identify product's/service's competitive advantage" },
      { code: "PM:277", description: "Identify customer touch points" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the shop owner",
      problem:
        "A national auto-service chain just opened two blocks away with a slicker waiting room and a loyalty app, and the shop owner (judge) is worried VELOCITY's plain, no-frills brand will start to look outdated by comparison even though VELOCITY's technicians are more experienced.",
      ask:
        "The shop owner (judge) wants you to propose a brand positioning that leans into VELOCITY's real competitive advantages and identify every customer touch point where that positioning should show up.",
      location: "the shop owner's office",
      greetingAsk: "to hear your positioning idea",
    }),
    judgeQuestions: [
      "What's our real competitive advantage against a bigger, flashier chain?",
      "Which customer touch point would you fix first to reflect this new positioning?",
    ],
  },
  {
    title: "Advertising ASE-Certified Technicians at Velocity Auto Care",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:017", description: "Identify consumer protection provisions of appropriate agencies" },
      { code: "PM:019", description: "Describe the uses of grades and standards in marketing" },
      { code: "PM:039", description: "Describe the use of technology in the product/service management function" },
      { code: "PM:241", description: "Explain new product-development processes" },
      { code: "PM:278", description: "Determine the impact of product standards' issues associated with global business" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the shop owner",
      problem:
        "Every technician at VELOCITY just earned ASE certification, and the shop owner (judge) wants to advertise that fact prominently, but a competitor was recently fined for implying a certification it didn't actually hold, and the shop owner (judge) doesn't want to make the same mistake.",
      ask:
        "The shop owner (judge) wants you to explain how a real industry certification like ASE should be represented in marketing so it's accurate and compliant, and propose how to feature it across the shop's advertising.",
      location: "the shop owner's office",
      greetingAsk: "to hear how you'd feature this certification",
    }),
    judgeQuestions: [
      "What makes referencing a real certification like ASE different from just making a quality claim?",
      "Where would you feature this certification first?",
    ],
  },
  {
    title: "A New Parts-Distributor Partnership at Velocity Auto Care",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the shop owner",
      problem:
        "A regional auto-parts distributor has offered VELOCITY a preferred-partner deal with same-day delivery and a shared online parts-ordering portal, but the shop owner (judge) has never worked with a distributor this closely before and wants to understand what the relationship actually involves before signing anything.",
      ask:
        "The shop owner (judge) wants you to explain how this kind of channel relationship works, including the technology involved, and flag any legal or ethical considerations before recommending whether to move forward.",
      location: "the shop owner's office",
      greetingAsk: "to hear your read on this partnership",
    }),
    judgeQuestions: [
      "What legal considerations should we look at before signing this kind of channel agreement?",
      "How does the shared ordering portal actually change how we do business day to day?",
    ],
  },
  {
    title: "Coordinating an Insurer Affinity Program at Velocity Auto Care",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the shop owner",
      problem:
        "A local auto insurer wants to list VELOCITY as a preferred repair shop for its policyholders in exchange for a small referral fee, and the shop owner (judge) likes the idea of the referral volume but isn't sure how this affinity relationship should be coordinated with VELOCITY's own advertising so the two don't send mixed messages.",
      ask:
        "The shop owner (judge) wants you to explain how this affinity-partner relationship works and propose how to coordinate it with VELOCITY's existing promotions.",
      location: "the shop owner's office",
      greetingAsk: "to hear how you'd coordinate this partnership",
    }),
    judgeQuestions: [
      "What could go wrong if we don't coordinate this partnership with our regular advertising?",
      "What obligations does an affinity relationship like this usually come with?",
    ],
  },
  {
    title: "Listing on a Booking App at Velocity Auto Care",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the shop owner",
      problem:
        "A popular appointment-booking app wants VELOCITY to list its services, taking a percentage of each booking made through the app, and the shop owner (judge) is weighing the extra visibility against giving up a cut of every job and losing some control over how the shop's services are described online.",
      ask:
        "The shop owner (judge) wants you to weigh in on whether this new channel is worth it, including what to check legally and ethically before agreeing to the listing.",
      location: "the shop owner's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What should we check in this app's contract before agreeing to list our services?",
      "How much control would we actually be giving up over how we're presented online?",
    ],
  },
  {
    title: "Setting the Price for a New Diagnostic Service at Velocity Auto Care",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the shop owner",
      problem:
        "VELOCITY just bought a new computer diagnostic scanner and needs to set a price for the diagnostic service it enables, but the shop owner (judge) has only ever priced parts-and-labor jobs before and isn't sure how to price a service where the tool itself was expensive but the actual time involved is short.",
      ask:
        "The shop owner (judge) wants you to recommend a price for this diagnostic service and explain the factors, and any legal or ethical considerations, behind your number.",
      location: "the shop owner's office",
      greetingAsk: "to hear your pricing recommendation",
    }),
    judgeQuestions: [
      "What factors did you weigh in landing on this specific price?",
      "Is there any legal or ethical concern with pricing a quick service this high?",
    ],
  },
  {
    title: "Price-Matching a Competitor's Coupon at Velocity Auto Care",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the shop owner",
      problem:
        "A competitor down the street is running a deeply discounted oil-change coupon, and a few VELOCITY regulars have asked whether the shop will match it. The shop owner (judge) worries that matching it every time trains customers to always wait for a coupon, but ignoring it risks losing them.",
      ask:
        "The shop owner (judge) wants you to recommend a pricing response to the competitor's coupon that protects margins without training customers to always expect a discount.",
      location: "the shop owner's office",
      greetingAsk: "to hear your pricing recommendation",
    }),
    judgeQuestions: [
      "Why might matching every competitor discount actually hurt us long term?",
      "What alternative would you offer customers instead of a straight price match?",
    ],
  },
  {
    title: "Service Advisors Overselling at Velocity Auto Care",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
      { code: "SE:109", description: "Analyze product information to identify product features and benefits" },
    ],
    eventSituation: buildSituation({
      role: "a service advisor",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the shop owner",
      problem:
        "Two customers have complained this month that a service advisor pushed extra repairs on them without clearly explaining why they were needed, and one customer said she felt talked over rather than informed. The shop owner (judge) wants selling handled better without losing the extra revenue those recommendations can bring when they're legitimate.",
      ask:
        "The shop owner (judge) wants you to walk through how a service advisor should present a needed repair so it feels informative rather than pushy, using the actual selling process.",
      location: "the service bay",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What's the difference between informing a customer of a needed repair and pushing them into one?",
      "How would you rebuild trust with a customer who already feels oversold?",
    ],
  },
  {
    title: "Training New Advisors on Selling Policy at Velocity Auto Care",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:106", description: "Explain legal and ethical considerations in selling" },
      { code: "SE:107", description: "Describe the use of technology in the selling function" },
      { code: "SE:359", description: "Discuss motivational theories that impact buying behavior" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
    ],
    eventSituation: buildSituation({
      role: "a senior service advisor",
      company: "VELOCITY AUTO CARE",
      judgeRole: "the shop owner",
      problem:
        "VELOCITY just hired two new service advisors, and the shop owner (judge) wants them trained properly this time, on legal and ethical selling boundaries, the shop's own selling policies, and how to actually build repeat customers, rather than learning only by watching whoever happens to be on shift.",
      ask:
        "The shop owner (judge) wants you to put together a short training outline covering selling policy, ethics, and clientele-building for the new hires.",
      location: "the break room",
      greetingAsk: "to walk through your training outline",
    }),
    judgeQuestions: [
      "What's one selling boundary a new advisor absolutely needs to understand on day one?",
      "What would you tell a new advisor about building repeat clientele instead of one-time visits?",
    ],
  },
];

const AUTOMOTIVE_EVENT: EventCaseStudySeed = {
  eventSlug: "automotive-services-marketing-series",
  eventName: "Automotive Services Marketing Series",
  careerCluster: "Marketing",
  careerPathway: "Marketing Management",
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: AUTO_CASES,
};

// ---------------------------------------------------------------------------
// business-services-marketing-series (SERIES, Marketing Management pathway)
// ---------------------------------------------------------------------------
const BIZ_SERVICES_CASES: CaseStudySeed[] = [
  {
    title: "Vague New-Client Ad at Meridian Business Solutions",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:014", description: "Explain the components of advertisements" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the marketing director",
      problem:
        "MERIDIAN, which provides outsourced IT support, payroll, and office-cleaning services to small businesses, just ran a LinkedIn ad campaign that generated clicks but almost no qualified leads. The marketing director (judge) has reviewed the ad and thinks it never actually says which specific services MERIDIAN offers or who it's for.",
      ask:
        "The marketing director (judge) wants you to identify what's missing from the current ad's components and recommend a clearer concept, along with the right advertising media, to reach small-business owners specifically.",
      location: "the marketing director's office",
      greetingAsk: "to hear your read on the campaign",
    }),
    judgeQuestions: [
      "What specific information is this ad missing that a small-business owner would need?",
      "Which advertising media would actually reach small-business decision-makers?",
    ],
  },
  {
    title: "Uncoordinated Referral Campaign at Meridian Business Solutions",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:073", description: "Explain the nature of a promotional plan" },
      { code: "PR:076", description: "Coordinate activities in the promotional mix" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
      { code: "PR:099", description: "Describe the use of business ethics in promotion" },
      { code: "PR:100", description: "Describe the use of technology in the promotion function" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the marketing director",
      problem:
        "MERIDIAN's client-referral incentive is being advertised differently by three different account managers, each emailing their own clients a different reward amount, with no shared plan or tracking of who's been contacted.",
      ask:
        "The marketing director (judge) wants you to build one coordinated promotional plan for the referral program, including which direct-marketing channel to standardize on, and flag any ethical issue with how it's currently being run.",
      location: "the marketing director's office",
      greetingAsk: "to walk through your plan",
    }),
    judgeQuestions: [
      "What's the ethical issue with three account managers offering three different referral amounts?",
      "How would you track who's already been contacted about this program?",
    ],
  },
  {
    title: "Misleading Free-Audit Offer at Meridian Business Solutions",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:101", description: "Describe the regulation of promotion" },
      { code: "PR:123", description: "Describe the use of color in advertisements" },
      { code: "PR:222", description: "Describe the elements of design" },
      { code: "PR:247", description: "Describe word-of-mouth channels used to communicate with targeted audiences" },
      { code: "PR:249", description: "Identify communications channels used in sales promotion" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the marketing director",
      problem:
        "A prospect complained publicly that MERIDIAN's \"free IT security audit\" flyer never disclosed that the audit report would come with a hard sales pitch for a $2,000 monthly support contract, and the marketing director (judge) is worried the flyer's wording could draw regulatory attention.",
      ask:
        "The marketing director (judge) wants you to review the flyer for regulatory and design issues, redesign it to be transparent, and recommend a word-of-mouth or sales-promotion channel to repair trust with prospects.",
      location: "the marketing director's office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What disclosure should this flyer have included from the start?",
      "How would you use word-of-mouth to rebuild trust with prospects who saw this complaint?",
    ],
  },
  {
    title: "Chamber of Commerce Sponsorship Needs a PR Plan at Meridian Business Solutions",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:250", description: "Explain communications channels used in public-relations activities" },
      { code: "PR:252", description: "Identify types of public-relations activities" },
      { code: "PR:253", description: "Discuss internal and external audiences for public-relations activities" },
      { code: "PR:271", description: "Create written briefs for outside agencies/consultants" },
      { code: "PR:315", description: "Explain the importance of company involvement in community activities" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the marketing director",
      problem:
        "MERIDIAN is sponsoring the local Chamber of Commerce's small-business expo next month, but the marketing director (judge) hasn't decided what PR activity to build around it and hasn't briefed the freelance publicist who was hired to help.",
      ask:
        "The marketing director (judge) wants you to recommend PR activities for the sponsorship, identify the right audiences, and draft a brief the publicist can act on.",
      location: "the marketing director's office",
      greetingAsk: "to hear your PR plan",
    }),
    judgeQuestions: [
      "What PR activity would make the most of this sponsorship beyond just a logo on a banner?",
      "What does the publicist need in the brief to represent us well at this event?",
    ],
  },
  {
    title: "Stale Website Copy at Meridian Business Solutions",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:274", description: "Describe digital color concepts" },
      { code: "PR:295", description: "Discuss the nature of typography" },
      { code: "PR:314", description: "Explain the impact of color harmonies on composition" },
      { code: "PR:322", description: "Explain the use of illustrations in advertisements" },
      { code: "PR:334", description: "Identify types of drawing media" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the marketing director",
      problem:
        "The marketing director (judge) has noticed prospects consistently comment that MERIDIAN's website \"looks like it's from ten years ago,\" with a dated color scheme, dense blocks of small type, and no visuals breaking up the service descriptions.",
      ask:
        "The marketing director (judge) wants you to propose a visual refresh for the website's promotional pages, addressing color, typography, and imagery, that looks current to a small-business owner researching vendors.",
      location: "the marketing director's office",
      greetingAsk: "to see your refresh concept",
    }),
    judgeQuestions: [
      "What specifically about the current design reads as outdated to a visitor?",
      "How would you use imagery or illustration to make the services page easier to scan?",
    ],
  },
  {
    title: "Guessing at Client Needs at Meridian Business Solutions",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "IM:025", description: "Explain the role of ethics in marketing-information management" },
      { code: "IM:062", description: "Explain techniques for processing marketing data" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the marketing director",
      problem:
        "MERIDIAN added a new cybersecurity-training service six months ago based on the marketing director's (judge's) hunch that clients wanted it, but signups have been nearly zero, while clients keep asking support staff informally about a bookkeeping add-on MERIDIAN doesn't offer.",
      ask:
        "The marketing director (judge) wants you to explain what marketing-information management would have caught here and propose a simple, ethical process for validating a service idea before building it out next time.",
      location: "the marketing director's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What data should we have gathered before launching the cybersecurity-training service?",
      "What's an ethical way to start systematically collecting this kind of client feedback?",
    ],
  },
  {
    title: "Researching the Bookkeeping Add-On at Meridian Business Solutions",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:281", description: "Describe options businesses use to obtain marketing research data (i.e., primary and secondary research)" },
      { code: "IM:282", description: "Discuss the nature of marketing research problems/issues" },
      { code: "IM:284", description: "Describe methods used to design marketing research studies (i.e., descriptive, exploratory, and causal)" },
      { code: "IM:285", description: "Discuss the nature of sampling plans (i.e., who, how many, how chosen)" },
      { code: "IM:289", description: "Describe data-collection methods (e.g., observations, mail, diaries, phone, internet, discussion groups, interviews, scanners, tracking tools)" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the marketing director",
      problem:
        "The marketing director (judge) wants a real answer on the bookkeeping add-on before committing budget to build it, and knows an informal poll of a few clients isn't reliable enough to make the call.",
      ask:
        "The marketing director (judge) wants you to design a short research study, including the method, sample, and data-collection approach, that would give a trustworthy answer.",
      location: "the marketing director's office",
      greetingAsk: "to hear your research design",
    }),
    judgeQuestions: [
      "Who exactly should be sampled to get a reliable answer on this?",
      "Why might an informal poll of a few current clients give us a misleading answer?",
    ],
  },
  {
    title: "A Broken Client Survey at Meridian Business Solutions",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:292", description: "Identify sources of error in a research project (e.g., response errors, interviewer errors, non-response errors, sample design)" },
      { code: "IM:293", description: "Evaluate questionnaire design (e.g., types of questions, question wording, routing, sequencing, length, layout)" },
      { code: "IM:418", description: "Explain characteristics of effective data-collection instruments" },
      { code: "IM:419", description: "Describe the regulation of marketing-information management" },
      { code: "IM:428", description: "Assess appropriateness of marketing research for the problem/issue (e.g., research methods, sources of information, timeliness of information, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the marketing director",
      problem:
        "MERIDIAN's annual client-satisfaction survey is 40 questions long, takes 20 minutes, and only a handful of clients out of 300 have finished it, leaving the marketing director (judge) with almost nothing usable this year.",
      ask:
        "The marketing director (judge) wants you to identify what's wrong with the survey's design and propose a shorter, better-structured version that clients will actually complete.",
      location: "the marketing director's office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What about a 20-minute survey is driving this low completion rate?",
      "What would you cut or restructure first?",
    ],
  },
  {
    title: "Justifying Next Year's Ad Budget at Meridian Business Solutions",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:347", description: "Display data in charts/graphs or in tables" },
      { code: "IM:390", description: "Prepare written reports for decision-making" },
      { code: "IM:394", description: "Provide sales analysis reports" },
      { code: "IM:469", description: "Monitor/measure customer “buzz”" },
      { code: "IM:470", description: "Track channel management cost data" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the company president",
      problem:
        "The company president (judge) wants to see proof that MERIDIAN's LinkedIn ads and trade-show sponsorships are worth their cost before approving next year's budget, and currently has only a spreadsheet of total spend with no results attached.",
      ask:
        "The company president (judge) wants a clear report, with the data visualized, comparing what each channel cost against what it actually produced in new clients.",
      location: "the president's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "Which channel does this data say is worth continuing, and which isn't?",
      "How did you attribute a new client to a specific channel like a trade show?",
    ],
  },
  {
    title: "Deciding Whether to Add a New Service Line at Meridian Business Solutions",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:021", description: "Explain the nature of product/service branding" },
      { code: "PM:024", description: "Identify the impact of product life cycles on marketing decisions" },
      { code: "PM:042", description: "Describe factors used by marketers to position products/services" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the company president",
      problem:
        "Several clients have asked whether MERIDIAN can handle their social-media management alongside IT and payroll, and the company president (judge) is weighing whether adding this service would strengthen MERIDIAN's mix or blur its identity as an operations-focused provider.",
      ask:
        "The company president (judge) wants you to recommend whether to add social-media management to the product mix and how it should be branded and positioned if MERIDIAN does.",
      location: "the president's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "How would adding this service change how clients see our core identity?",
      "How would you position this new service alongside our existing ones?",
    ],
  },
  {
    title: "Bundling IT and Payroll Support at Meridian Business Solutions",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:020", description: "Explain warranties and guarantees" },
      { code: "PM:040", description: "Explain business ethics in product/service management" },
      { code: "PM:041", description: "Describe the nature of product bundling" },
      { code: "PM:127", description: "Identify methods/techniques to generate a product idea" },
      { code: "PM:128", description: "Generate product ideas" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the company president",
      problem:
        "The company president (judge) wants to bundle IT support and payroll processing into one \"Business Essentials\" package at a discount, but isn't sure what service-level guarantee to promise across two very different service types, and worries the bundle could look like a pressure tactic to clients who only want one service.",
      ask:
        "The company president (judge) wants you to propose the bundle's structure and guarantee terms, and explain how to market it so it reads as a genuine value, not a forced upsell.",
      location: "the president's office",
      greetingAsk: "to hear your bundle proposal",
    }),
    judgeQuestions: [
      "What guarantee makes sense when you're bundling two very different services together?",
      "How do we market this without it feeling like we're forcing clients to buy more than they want?",
    ],
  },
  {
    title: "Rebranding After Losing the 'Boutique' Feel at Meridian Business Solutions",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:206", description: "Explain the nature of corporate branding" },
      { code: "PM:207", description: "Describe factors used by businesses to position corporate brands" },
      { code: "PM:214", description: "Communicate core values of product/service" },
      { code: "PM:246", description: "Identify product's/service's competitive advantage" },
      { code: "PM:277", description: "Identify customer touch points" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the company president",
      problem:
        "MERIDIAN has grown from 3 employees to 40, and a longtime client recently said in a review that \"it doesn't feel personal anymore,\" worrying the company president (judge) that the brand's original boutique, high-touch identity is getting lost as the company scales.",
      ask:
        "The company president (judge) wants you to propose a brand positioning that communicates MERIDIAN's core values at this new size and identify the touch points where that personal feel needs to show up again.",
      location: "the president's office",
      greetingAsk: "to hear your positioning idea",
    }),
    judgeQuestions: [
      "What's our real competitive advantage now that we're bigger, if it isn't 'small and personal' anymore?",
      "Which customer touch point would you fix first to bring back that personal feel?",
    ],
  },
  {
    title: "Advertising a New Industry Certification at Meridian Business Solutions",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:017", description: "Identify consumer protection provisions of appropriate agencies" },
      { code: "PM:019", description: "Describe the uses of grades and standards in marketing" },
      { code: "PM:039", description: "Describe the use of technology in the product/service management function" },
      { code: "PM:241", description: "Explain new product-development processes" },
      { code: "PM:278", description: "Determine the impact of product standards' issues associated with global business" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the company president",
      problem:
        "MERIDIAN's IT team just earned a recognized data-security certification, and the company president (judge) wants to advertise it heavily, but a competitor was recently called out publicly for vaguely implying a certification it didn't actually hold, and the president doesn't want MERIDIAN to make the same mistake.",
      ask:
        "The company president (judge) wants you to explain how to accurately represent a real industry certification in marketing materials and propose how to feature it across MERIDIAN's advertising.",
      location: "the president's office",
      greetingAsk: "to hear how you'd feature this certification",
    }),
    judgeQuestions: [
      "What's the difference between accurately citing a real certification and implying one we don't have?",
      "Where should this certification be featured first?",
    ],
  },
  {
    title: "Becoming a Reseller Partner at Meridian Business Solutions",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the company president",
      problem:
        "A major software company has invited MERIDIAN to become an authorized reseller of its accounting software, which would mean selling and supporting a product MERIDIAN didn't build, and the company president (judge) wants to understand this kind of channel relationship before agreeing.",
      ask:
        "The company president (judge) wants you to explain how a reseller channel relationship works, including any legal or ethical considerations, before recommending whether to move forward.",
      location: "the president's office",
      greetingAsk: "to hear your read on this partnership",
    }),
    judgeQuestions: [
      "What legal considerations should we look at before becoming an authorized reseller?",
      "What ethical obligation would we take on by reselling someone else's product?",
    ],
  },
  {
    title: "Coordinating a Co-Marketing Deal at Meridian Business Solutions",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the company president",
      problem:
        "A local commercial-insurance broker wants to co-market with MERIDIAN, referring clients to each other, and the company president (judge) likes the idea but isn't sure how to coordinate joint promotions without the two companies' messaging clashing.",
      ask:
        "The company president (judge) wants you to explain how this affinity relationship should work and propose how to coordinate it with MERIDIAN's own promotional activities.",
      location: "the president's office",
      greetingAsk: "to hear how you'd coordinate this partnership",
    }),
    judgeQuestions: [
      "What could go wrong if this co-marketing isn't coordinated with our regular promotions?",
      "What should each side commit to for this partnership to actually work?",
    ],
  },
  {
    title: "Joining an Online Marketplace at Meridian Business Solutions",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the company president",
      problem:
        "An online marketplace for business services wants MERIDIAN to list its offerings, taking a booking fee on every job sourced through the platform, and the company president (judge) is weighing the added visibility against giving up margin and some control over pricing shown to prospects.",
      ask:
        "The company president (judge) wants your recommendation on whether this channel is worth it, including what to check legally and ethically first.",
      location: "the president's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What should we check in this marketplace's terms before listing our services?",
      "How much pricing control would we be giving up by joining this platform?",
    ],
  },
  {
    title: "Pricing a New Consulting Package at Meridian Business Solutions",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the company president",
      problem:
        "MERIDIAN is launching a one-time \"business systems audit\" consulting package, and the company president (judge) has only ever priced ongoing monthly retainers before, unsure how to price a single project engagement fairly for both MERIDIAN and the client.",
      ask:
        "The company president (judge) wants you to recommend a price for this new consulting package and explain the factors, and any legal or ethical considerations, behind your number.",
      location: "the president's office",
      greetingAsk: "to hear your pricing recommendation",
    }),
    judgeQuestions: [
      "What factors led you to this specific price for a one-time engagement?",
      "Is there any ethical concern with how we'd need to disclose scope for this price to be fair?",
    ],
  },
  {
    title: "Undercut by a Freelancer's Rate at Meridian Business Solutions",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the company president",
      problem:
        "A prospective client told MERIDIAN a freelancer quoted half the price for similar IT support, and the company president (judge) worries that discounting to match will undercut the value of MERIDIAN's more reliable, team-backed service.",
      ask:
        "The company president (judge) wants you to recommend a pricing response to this objection that protects MERIDIAN's margins and clearly communicates the value difference.",
      location: "the president's office",
      greetingAsk: "to hear your pricing recommendation",
    }),
    judgeQuestions: [
      "Why might matching a freelancer's rate actually undersell what we offer?",
      "How would you communicate the value difference to this prospect instead of just discounting?",
    ],
  },
  {
    title: "Account Managers Skipping the Discovery Call at Meridian Business Solutions",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
      { code: "SE:109", description: "Analyze product information to identify product features and benefits" },
    ],
    eventSituation: buildSituation({
      role: "an account manager",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the company president",
      problem:
        "Two new clients canceled within their first month, both saying MERIDIAN's service didn't match what they thought they were signing up for, and the company president (judge) suspects account managers are skipping the discovery conversation and jumping straight to a proposal.",
      ask:
        "The company president (judge) wants you to walk through how the selling process should actually work here, from discovery through proposal, so this stops happening.",
      location: "the sales team's office",
      greetingAsk: "to hear how you'd fix this",
    }),
    judgeQuestions: [
      "What does skipping discovery cost us in a service business like this?",
      "What questions should an account manager always ask before proposing a package?",
    ],
  },
  {
    title: "Training New Account Managers on Selling Policy at Meridian Business Solutions",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:106", description: "Explain legal and ethical considerations in selling" },
      { code: "SE:107", description: "Describe the use of technology in the selling function" },
      { code: "SE:359", description: "Discuss motivational theories that impact buying behavior" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
    ],
    eventSituation: buildSituation({
      role: "a senior account manager",
      company: "MERIDIAN BUSINESS SOLUTIONS",
      judgeRole: "the company president",
      problem:
        "MERIDIAN just hired two new account managers, and the company president (judge) wants them trained on the company's real selling policies, legal and ethical boundaries, and how long-term client relationships actually get built, rather than picking it up piecemeal from whoever they happen to shadow.",
      ask:
        "The company president (judge) wants you to put together a short training outline covering selling policy, ethics, and clientele-building for the new hires.",
      location: "the conference room",
      greetingAsk: "to walk through your training outline",
    }),
    judgeQuestions: [
      "What's one selling boundary a new account manager needs to understand on day one here?",
      "What would you tell a new hire about building a lasting client relationship versus closing a one-time deal?",
    ],
  },
];

const BIZ_SERVICES_EVENT: EventCaseStudySeed = {
  eventSlug: "business-services-marketing-series",
  eventName: "Business Services Marketing Series",
  careerCluster: "Marketing",
  careerPathway: "Marketing Management",
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: BIZ_SERVICES_CASES,
};

// ---------------------------------------------------------------------------
// food-marketing-series (SERIES, Marketing Management pathway)
// ---------------------------------------------------------------------------
const FOOD_CASES: CaseStudySeed[] = [
  {
    title: "New Snack Line Ad Falls Flat at Harvest & Co. Foods",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:014", description: "Explain the components of advertisements" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the brand manager",
      problem:
        "HARVEST's new line of granola bars just launched with a grocery-circular ad and a social post, but the brand manager (judge) has noticed neither one explains what actually makes the bars different from a dozen other bars on the shelf, and sales are far below projections two weeks in.",
      ask:
        "The brand manager (judge) wants you to identify what the current ads are missing and propose a clearer concept, with the right media mix, that gives shoppers a real reason to pick this bar over the competition.",
      location: "the brand manager's office",
      greetingAsk: "to hear your read on the current ads",
    }),
    judgeQuestions: [
      "What's missing from these ads that would actually differentiate the bars on a crowded shelf?",
      "Which advertising media would you use to reach grocery shoppers specifically?",
    ],
  },
  {
    title: "Uncoordinated Holiday Promotion at Harvest & Co. Foods",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:073", description: "Explain the nature of a promotional plan" },
      { code: "PR:076", description: "Coordinate activities in the promotional mix" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
      { code: "PR:099", description: "Describe the use of business ethics in promotion" },
      { code: "PR:100", description: "Describe the use of technology in the promotion function" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the brand manager",
      problem:
        "HARVEST's holiday gift-basket promotion is going out through email, in-store demos, and retailer coupons, all planned separately, and the retailer coupon lists a lower price than what the email promises, which a customer already flagged as confusing.",
      ask:
        "The brand manager (judge) wants you to build one coordinated promotional plan across these channels and flag the ethical issue with the mismatched pricing.",
      location: "the brand manager's office",
      greetingAsk: "to walk through your plan",
    }),
    judgeQuestions: [
      "What's the ethical issue with two channels advertising two different prices for the same basket?",
      "How would you keep these three channels coordinated going forward?",
    ],
  },
  {
    title: "\"All Natural\" Label Draws Scrutiny at Harvest & Co. Foods",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:101", description: "Describe the regulation of promotion" },
      { code: "PR:123", description: "Describe the use of color in advertisements" },
      { code: "PR:222", description: "Describe the elements of design" },
      { code: "PR:247", description: "Describe word-of-mouth channels used to communicate with targeted audiences" },
      { code: "PR:249", description: "Identify communications channels used in sales promotion" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the brand manager",
      problem:
        "A food blogger pointed out that HARVEST's \"all natural\" claim on its fruit snacks' packaging doesn't clearly match FTC guidance on that term, and the post is getting shared, worrying the brand manager (judge) about a bigger regulatory or reputational problem.",
      ask:
        "The brand manager (judge) wants you to review the claim and packaging design against promotion regulation, propose a compliant revision, and recommend a word-of-mouth or sales-promotion channel to address the concern publicly.",
      location: "the brand manager's office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What makes a claim like 'all natural' risky from a regulatory standpoint?",
      "How would you address this concern publicly without drawing more attention to it?",
    ],
  },
  {
    title: "Farmers Market Sampling Event Needs a PR Plan at Harvest & Co. Foods",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:250", description: "Explain communications channels used in public-relations activities" },
      { code: "PR:252", description: "Identify types of public-relations activities" },
      { code: "PR:253", description: "Discuss internal and external audiences for public-relations activities" },
      { code: "PR:271", description: "Create written briefs for outside agencies/consultants" },
      { code: "PR:315", description: "Explain the importance of company involvement in community activities" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the brand manager",
      problem:
        "HARVEST is sponsoring a booth at the regional farmers market festival next month, but the brand manager (judge) hasn't planned any PR activity around it beyond showing up, and the outside PR consultant hired for local media outreach has no brief to work from.",
      ask:
        "The brand manager (judge) wants you to recommend PR activities for the sponsorship, identify the right audiences, and draft a brief the consultant can use.",
      location: "the brand manager's office",
      greetingAsk: "to hear your PR plan",
    }),
    judgeQuestions: [
      "What PR activity would make the most of this sponsorship beyond just handing out samples?",
      "What does the consultant need in this brief to pitch local media effectively?",
    ],
  },
  {
    title: "Cluttered Packaging Design at Harvest & Co. Foods",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:274", description: "Describe digital color concepts" },
      { code: "PR:295", description: "Discuss the nature of typography" },
      { code: "PR:314", description: "Explain the impact of color harmonies on composition" },
      { code: "PR:322", description: "Explain the use of illustrations in advertisements" },
      { code: "PR:334", description: "Identify types of drawing media" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the brand manager",
      problem:
        "The brand manager (judge) has heard feedback that HARVEST's packaging is cluttered, with clashing colors, five different fonts, and icons that don't clearly represent what's actually in the product, making it hard to spot on a busy shelf.",
      ask:
        "The brand manager (judge) wants you to propose a cleaner packaging design, addressing color, typography, and imagery, that stands out and communicates the product clearly at a glance.",
      location: "the brand manager's office",
      greetingAsk: "to see your redesign concept",
    }),
    judgeQuestions: [
      "What specifically makes the current packaging hard to read on a shelf?",
      "How would you use color and imagery to make this product pop out to shoppers?",
    ],
  },
  {
    title: "Launching Without Market Data at Harvest & Co. Foods",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "IM:025", description: "Explain the role of ethics in marketing-information management" },
      { code: "IM:062", description: "Explain techniques for processing marketing data" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the brand manager",
      problem:
        "HARVEST launched a low-sugar cereal based on the brand manager's (judge's) instinct that health-conscious shoppers wanted it, but it's sitting on shelves while a flavor customers keep requesting on social media, a spicy trail mix, still doesn't exist.",
      ask:
        "The brand manager (judge) wants you to explain what marketing-information management would have caught here and propose an ethical process for validating a product idea before the next launch.",
      location: "the brand manager's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What data should have been gathered before launching the low-sugar cereal?",
      "What's an ethical way to start systematically collecting this kind of customer input?",
    ],
  },
  {
    title: "Researching the Spicy Trail Mix Idea at Harvest & Co. Foods",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:281", description: "Describe options businesses use to obtain marketing research data (i.e., primary and secondary research)" },
      { code: "IM:282", description: "Discuss the nature of marketing research problems/issues" },
      { code: "IM:284", description: "Describe methods used to design marketing research studies (i.e., descriptive, exploratory, and causal)" },
      { code: "IM:285", description: "Discuss the nature of sampling plans (i.e., who, how many, how chosen)" },
      { code: "IM:289", description: "Describe data-collection methods (e.g., observations, mail, diaries, phone, internet, discussion groups, interviews, scanners, tracking tools)" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the brand manager",
      problem:
        "The brand manager (judge) wants a real answer on whether the spicy trail mix idea is worth developing before committing production budget, rather than relying on a handful of enthusiastic social media comments.",
      ask:
        "The brand manager (judge) wants you to design a short research study, including method, sample, and data-collection approach, that would give a trustworthy answer.",
      location: "the brand manager's office",
      greetingAsk: "to hear your research design",
    }),
    judgeQuestions: [
      "Why might a handful of social comments give us a misleading picture of real demand?",
      "Who should we be sampling to get a reliable answer here?",
    ],
  },
  {
    title: "A Confusing Taste-Test Survey at Harvest & Co. Foods",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:292", description: "Identify sources of error in a research project (e.g., response errors, interviewer errors, non-response errors, sample design)" },
      { code: "IM:293", description: "Evaluate questionnaire design (e.g., types of questions, question wording, routing, sequencing, length, layout)" },
      { code: "IM:418", description: "Explain characteristics of effective data-collection instruments" },
      { code: "IM:419", description: "Describe the regulation of marketing-information management" },
      { code: "IM:428", description: "Assess appropriateness of marketing research for the problem/issue (e.g., research methods, sources of information, timeliness of information, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the brand manager",
      problem:
        "A recent in-store taste-test survey came back with contradictory results, most tasters rated the new sauce highly but almost none said they'd buy it, and the brand manager (judge) suspects the questionnaire itself is confusing rather than the product being the problem.",
      ask:
        "The brand manager (judge) wants you to evaluate the survey's design, identify the source of the contradiction, and propose a clearer version.",
      location: "the brand manager's office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What in this survey's design could produce a 'liked it but wouldn't buy it' contradiction?",
      "What would you change first to get a clearer read?",
    ],
  },
  {
    title: "Proving the Sampling Program's Worth at Harvest & Co. Foods",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:347", description: "Display data in charts/graphs or in tables" },
      { code: "IM:390", description: "Prepare written reports for decision-making" },
      { code: "IM:394", description: "Provide sales analysis reports" },
      { code: "IM:469", description: "Monitor/measure customer “buzz”" },
      { code: "IM:470", description: "Track channel management cost data" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the company owner",
      problem:
        "The company owner (judge) is deciding whether to renew HARVEST's in-store sampling program for another year, which costs a significant amount per store, but has no clear data yet showing whether sampling actually moves sales versus just giving away product.",
      ask:
        "The company owner (judge) wants a clear report, with the data displayed visually, comparing sampling's cost against its measurable impact on sales.",
      location: "the owner's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What does this data say about whether sampling is worth its cost?",
      "How did you isolate sampling's effect from other things happening in those stores at the same time?",
    ],
  },
  {
    title: "Should Harvest & Co. Foods Add a Plant-Based Line?",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:021", description: "Explain the nature of product/service branding" },
      { code: "PM:024", description: "Identify the impact of product life cycles on marketing decisions" },
      { code: "PM:042", description: "Describe factors used by marketers to position products/services" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the company owner",
      problem:
        "Plant-based products are a growing category at grocery stores, and the company owner (judge) is weighing whether to add a plant-based line to HARVEST's mostly traditional snack lineup, worried about diluting the brand's identity while also not wanting to miss the trend.",
      ask:
        "The company owner (judge) wants you to recommend whether and how to add this line to the product mix, including how it should be branded and positioned.",
      location: "the owner's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "How would you position this new line so it fits with, rather than confuses, our existing brand?",
      "What's the risk of waiting another year on this decision?",
    ],
  },
  {
    title: "Bundling the Snack Variety Pack at Harvest & Co. Foods",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:020", description: "Explain warranties and guarantees" },
      { code: "PM:040", description: "Explain business ethics in product/service management" },
      { code: "PM:041", description: "Describe the nature of product bundling" },
      { code: "PM:127", description: "Identify methods/techniques to generate a product idea" },
      { code: "PM:128", description: "Generate product ideas" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the company owner",
      problem:
        "The company owner (judge) wants a new variety-pack bundle combining HARVEST's three best-selling snacks at a discount, but wants to make sure the freshness guarantee is clear across products with different shelf lives, and worries the bundle could hide the weaker-selling item inside it.",
      ask:
        "The company owner (judge) wants you to propose the bundle's makeup and freshness guarantee, and explain how to market it honestly.",
      location: "the owner's office",
      greetingAsk: "to hear your bundle proposal",
    }),
    judgeQuestions: [
      "How do we handle a freshness guarantee across products with different shelf lives in one bundle?",
      "How do we market this honestly if one item in the bundle sells slower than the others?",
    ],
  },
  {
    title: "Rebranding After a Recipe Change at Harvest & Co. Foods",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:206", description: "Explain the nature of corporate branding" },
      { code: "PM:207", description: "Describe factors used by businesses to position corporate brands" },
      { code: "PM:214", description: "Communicate core values of product/service" },
      { code: "PM:246", description: "Identify product's/service's competitive advantage" },
      { code: "PM:277", description: "Identify customer touch points" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the company owner",
      problem:
        "HARVEST reformulated its flagship granola to remove an artificial preservative, and while the change is good news, some loyal customers online are asking \"why does it taste different\" without knowing why, and the company owner (judge) is worried the brand's story isn't being communicated.",
      ask:
        "The company owner (judge) wants you to propose how to communicate this change and reposition it as a core value, and identify where customers need to hear this story.",
      location: "the owner's office",
      greetingAsk: "to hear your positioning idea",
    }),
    judgeQuestions: [
      "What's our real competitive advantage in making this recipe change?",
      "Which customer touch point would you use first to explain this to loyal customers?",
    ],
  },
  {
    title: "Advertising a New Non-GMO Certification at Harvest & Co. Foods",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:017", description: "Identify consumer protection provisions of appropriate agencies" },
      { code: "PM:019", description: "Describe the uses of grades and standards in marketing" },
      { code: "PM:039", description: "Describe the use of technology in the product/service management function" },
      { code: "PM:241", description: "Explain new product-development processes" },
      { code: "PM:278", description: "Determine the impact of product standards' issues associated with global business" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the company owner",
      problem:
        "HARVEST's fruit snacks just earned a recognized non-GMO certification, and the company owner (judge) wants to feature the seal prominently, but a competitor was recently criticized for using a similar-looking unofficial seal, and the owner doesn't want HARVEST's real certification to look equally suspect.",
      ask:
        "The company owner (judge) wants you to explain how to accurately and clearly represent this real certification in packaging and advertising.",
      location: "the owner's office",
      greetingAsk: "to hear how you'd feature this certification",
    }),
    judgeQuestions: [
      "How do we make sure our real certification doesn't look like the fake ones people are wary of?",
      "Where should this certification appear first?",
    ],
  },
  {
    title: "Getting Into a Regional Grocery Chain at Harvest & Co. Foods",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the company owner",
      problem:
        "A regional grocery chain has offered HARVEST shelf space in 40 stores, but wants exclusive distribution rights in that region, and the company owner (judge) has never negotiated a channel-distribution agreement of this scale before.",
      ask:
        "The company owner (judge) wants you to explain how this channel relationship works, including legal and ethical considerations of an exclusivity clause, before recommending whether to accept.",
      location: "the owner's office",
      greetingAsk: "to hear your read on this deal",
    }),
    judgeQuestions: [
      "What are the risks of agreeing to regional exclusivity with one chain?",
      "What should we check legally before signing this kind of distribution agreement?",
    ],
  },
  {
    title: "Coordinating a Co-Branded Promotion at Harvest & Co. Foods",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the company owner",
      problem:
        "A regional coffee brand wants to co-brand a limited pairing box with HARVEST's granola, and the company owner (judge) likes the exposure but isn't sure how to coordinate the joint promotion with HARVEST's own retailer relationships without confusing which company customers should contact.",
      ask:
        "The company owner (judge) wants you to explain how this affinity relationship should work and propose how to coordinate it with our existing channel relationships.",
      location: "the owner's office",
      greetingAsk: "to hear how you'd coordinate this partnership",
    }),
    judgeQuestions: [
      "What could go wrong with our retailer relationships if this co-branded promotion isn't coordinated well?",
      "What should each brand be responsible for in this partnership?",
    ],
  },
  {
    title: "Selling Direct Through an Online Grocery Platform at Harvest & Co. Foods",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the company owner",
      problem:
        "An online grocery-delivery platform wants HARVEST to sell direct-to-consumer through its app, which would mean competing for visibility against HARVEST's own retail partners on the same platform, and the company owner (judge) is unsure whether this creates channel conflict.",
      ask:
        "The company owner (judge) wants your recommendation on whether to join this platform and how to manage the relationship with existing retail partners if we do.",
      location: "the owner's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "How could this create tension with our existing retail partners?",
      "What would you check legally before agreeing to sell direct on this platform?",
    ],
  },
  {
    title: "Pricing the New Snack Line at Harvest & Co. Foods",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the company owner",
      problem:
        "HARVEST's new granola bars cost more to produce than existing products because of a pricier ingredient, and the company owner (judge) isn't sure how to price them competitively against cheaper bars on the shelf without losing money on every unit sold.",
      ask:
        "The company owner (judge) wants you to recommend a price for the new bars and explain the factors, and any legal or ethical considerations, behind your number.",
      location: "the owner's office",
      greetingAsk: "to hear your pricing recommendation",
    }),
    judgeQuestions: [
      "What factors led you to this specific price point?",
      "Is there a legal or ethical concern with how we'd need to justify this price to retailers?",
    ],
  },
  {
    title: "A Retailer Demands a Price Cut at Harvest & Co. Foods",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the company owner",
      problem:
        "A major retail partner is threatening to drop HARVEST's product line unless the wholesale price drops 15%, and the company owner (judge) worries that caving sets a precedent other retailers will demand too, while losing the account would hurt significantly.",
      ask:
        "The company owner (judge) wants you to recommend how to respond to this pricing demand in a way that protects margins and doesn't set an unsustainable precedent.",
      location: "the owner's office",
      greetingAsk: "to hear your pricing recommendation",
    }),
    judgeQuestions: [
      "What's the risk of simply agreeing to this retailer's demand?",
      "What would you offer instead of a straight price cut?",
    ],
  },
  {
    title: "Distributor Reps Overpromising Delivery at Harvest & Co. Foods",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
      { code: "SE:109", description: "Analyze product information to identify product features and benefits" },
    ],
    eventSituation: buildSituation({
      role: "a sales representative",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the company owner",
      problem:
        "A retail buyer canceled an order after a HARVEST sales rep promised a delivery timeline the production team couldn't actually meet, and the company owner (judge) is concerned the sales team is overselling to close deals without checking what's realistic.",
      ask:
        "The company owner (judge) wants you to walk through how the selling process should work here so reps close deals on accurate information instead of promises they can't keep.",
      location: "the sales office",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What information should a rep confirm internally before promising a delivery date?",
      "How would you repair trust with this buyer after the missed promise?",
    ],
  },
  {
    title: "Training New Sales Reps on Company Policy at Harvest & Co. Foods",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:106", description: "Explain legal and ethical considerations in selling" },
      { code: "SE:107", description: "Describe the use of technology in the selling function" },
      { code: "SE:359", description: "Discuss motivational theories that impact buying behavior" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
    ],
    eventSituation: buildSituation({
      role: "a senior sales representative",
      company: "HARVEST & CO. FOODS",
      judgeRole: "the company owner",
      problem:
        "HARVEST just hired two new sales reps to call on regional grocery buyers, and the company owner (judge) wants them trained on the company's selling policies, ethical and legal boundaries, and how to build lasting retailer relationships, rather than learning it inconsistently in the field.",
      ask:
        "The company owner (judge) wants you to put together a short training outline covering selling policy, ethics, and relationship-building for the new hires.",
      location: "the break room",
      greetingAsk: "to walk through your training outline",
    }),
    judgeQuestions: [
      "What's one selling boundary a new rep needs to understand before their first buyer meeting?",
      "What would you tell a new rep about building a lasting relationship with a retail buyer?",
    ],
  },
];

const FOOD_EVENT: EventCaseStudySeed = {
  eventSlug: "food-marketing-series",
  eventName: "Food Marketing Series",
  careerCluster: "Marketing",
  careerPathway: "Marketing Management",
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: FOOD_CASES,
};

// ---------------------------------------------------------------------------
// sports-and-entertainment-marketing-series (SERIES, Marketing Management pathway)
// ---------------------------------------------------------------------------
const SEM_CASES: CaseStudySeed[] = [
  {
    title: "Vague Season-Ticket Ad at Summit Sports & Entertainment Group",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:014", description: "Explain the components of advertisements" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the marketing director",
      problem:
        "SUMMIT, which handles ticket sales and sponsorships for the local minor-league hockey team, ran a season-ticket ad that generated views but almost no renewals, and the marketing director (judge) suspects the ad never actually explained the specific perks season-ticket holders get.",
      ask:
        "The marketing director (judge) wants you to identify what's missing from the ad and propose a clearer concept, with the right media mix, that actually sells the value of a season ticket.",
      location: "the marketing director's office",
      greetingAsk: "to hear your read on this campaign",
    }),
    judgeQuestions: [
      "What specific information is this ad missing that would drive a renewal decision?",
      "Which media would best reach lapsed season-ticket holders specifically?",
    ],
  },
  {
    title: "Uncoordinated Playoff Promotion at Summit Sports & Entertainment Group",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:073", description: "Explain the nature of a promotional plan" },
      { code: "PR:076", description: "Coordinate activities in the promotional mix" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
      { code: "PR:099", description: "Describe the use of business ethics in promotion" },
      { code: "PR:100", description: "Describe the use of technology in the promotion function" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the marketing director",
      problem:
        "With the team headed to the playoffs, SUMMIT's ticket app push notification, email blast, and radio spot each listed a different discount code for the same ticket bundle, sent out on three different days with no shared plan.",
      ask:
        "The marketing director (judge) wants you to build one coordinated promotional plan across these channels and flag the ethical issue with fans getting different discount offers depending on which channel they saw.",
      location: "the marketing director's office",
      greetingAsk: "to walk through your plan",
    }),
    judgeQuestions: [
      "What's the ethical issue with fans seeing different discount codes for the same tickets?",
      "How would you keep these channels coordinated for the rest of the playoff run?",
    ],
  },
  {
    title: "Misleading Meet-and-Greet Offer at Summit Sports & Entertainment Group",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:101", description: "Describe the regulation of promotion" },
      { code: "PR:123", description: "Describe the use of color in advertisements" },
      { code: "PR:222", description: "Describe the elements of design" },
      { code: "PR:247", description: "Describe word-of-mouth channels used to communicate with targeted audiences" },
      { code: "PR:249", description: "Identify communications channels used in sales promotion" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the marketing director",
      problem:
        "A fan complained online that SUMMIT's \"win a meet-and-greet\" ticket promotion never disclosed the odds of winning or that it required an additional purchase to enter, and the marketing director (judge) is worried the ad's design buried that fine print on purpose.",
      ask:
        "The marketing director (judge) wants you to review the ad against promotion regulation, redesign it to disclose terms honestly, and recommend a channel to rebuild trust with fans.",
      location: "the marketing director's office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What disclosure should this promotion have included from the start?",
      "What channel would you use to rebuild trust with fans after this complaint?",
    ],
  },
  {
    title: "Youth Hockey Clinic Needs a PR Push at Summit Sports & Entertainment Group",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:250", description: "Explain communications channels used in public-relations activities" },
      { code: "PR:252", description: "Identify types of public-relations activities" },
      { code: "PR:253", description: "Discuss internal and external audiences for public-relations activities" },
      { code: "PR:271", description: "Create written briefs for outside agencies/consultants" },
      { code: "PR:315", description: "Explain the importance of company involvement in community activities" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the marketing director",
      problem:
        "The team is hosting a free youth hockey clinic next month, but the marketing director (judge) hasn't planned any PR activity around it and the freelance publicist brought on for local media outreach has no brief to work from.",
      ask:
        "The marketing director (judge) wants you to recommend PR activities for the clinic, identify the right audiences, and draft a brief the publicist can use.",
      location: "the marketing director's office",
      greetingAsk: "to hear your PR plan",
    }),
    judgeQuestions: [
      "What PR activity would make the most of this clinic beyond just running it?",
      "What does the publicist need in this brief to pitch local media well?",
    ],
  },
  {
    title: "Outdated Game-Day Ad Creative at Summit Sports & Entertainment Group",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:274", description: "Describe digital color concepts" },
      { code: "PR:295", description: "Discuss the nature of typography" },
      { code: "PR:314", description: "Explain the impact of color harmonies on composition" },
      { code: "PR:322", description: "Explain the use of illustrations in advertisements" },
      { code: "PR:334", description: "Identify types of drawing media" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the marketing director",
      problem:
        "The marketing director (judge) has noticed SUMMIT's game-day digital ads still use last season's clashing color scheme and cramped type, while a rival team's ads in the same market look sharp and modern.",
      ask:
        "The marketing director (judge) wants you to propose a refreshed ad design, addressing color, type, and imagery, that feels current and competes visually with the rival team's ads.",
      location: "the marketing director's office",
      greetingAsk: "to see your redesign concept",
    }),
    judgeQuestions: [
      "What's wrong with the current color and type choices?",
      "How would you use imagery to make this ad feel more like game-day energy?",
    ],
  },
  {
    title: "No Fan Data to Guide Decisions at Summit Sports & Entertainment Group",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "IM:025", description: "Explain the role of ethics in marketing-information management" },
      { code: "IM:062", description: "Explain techniques for processing marketing data" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the marketing director",
      problem:
        "SUMMIT added a premium tailgate-lot upgrade based on the marketing director's (judge's) guess that fans wanted it, but it's barely sold while fans keep asking guest services informally about extended concourse hours, something SUMMIT has never offered.",
      ask:
        "The marketing director (judge) wants you to explain what marketing-information management would have caught here and propose a simple, ethical way to start collecting real fan data before the next decision.",
      location: "the marketing director's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What data should have been gathered before launching the tailgate-lot upgrade?",
      "What's an ethical way to start systematically collecting fan feedback like this?",
    ],
  },
  {
    title: "Researching Extended Concourse Hours at Summit Sports & Entertainment Group",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:281", description: "Describe options businesses use to obtain marketing research data (i.e., primary and secondary research)" },
      { code: "IM:282", description: "Discuss the nature of marketing research problems/issues" },
      { code: "IM:284", description: "Describe methods used to design marketing research studies (i.e., descriptive, exploratory, and causal)" },
      { code: "IM:285", description: "Discuss the nature of sampling plans (i.e., who, how many, how chosen)" },
      { code: "IM:289", description: "Describe data-collection methods (e.g., observations, mail, diaries, phone, internet, discussion groups, interviews, scanners, tracking tools)" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the marketing director",
      problem:
        "The marketing director (judge) wants a real answer on whether extending concourse hours would actually increase concession sales before asking ownership to approve the added staffing cost.",
      ask:
        "The marketing director (judge) wants you to design a short research study, including method, sample, and data-collection approach, that would give a trustworthy answer.",
      location: "the marketing director's office",
      greetingAsk: "to hear your research design",
    }),
    judgeQuestions: [
      "Who should we sample to get a reliable answer on this?",
      "What data-collection method fits best for a question like this at a live event?",
    ],
  },
  {
    title: "A Confusing Fan Survey at Summit Sports & Entertainment Group",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:292", description: "Identify sources of error in a research project (e.g., response errors, interviewer errors, non-response errors, sample design)" },
      { code: "IM:293", description: "Evaluate questionnaire design (e.g., types of questions, question wording, routing, sequencing, length, layout)" },
      { code: "IM:418", description: "Explain characteristics of effective data-collection instruments" },
      { code: "IM:419", description: "Describe the regulation of marketing-information management" },
      { code: "IM:428", description: "Assess appropriateness of marketing research for the problem/issue (e.g., research methods, sources of information, timeliness of information, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the marketing director",
      problem:
        "SUMMIT's post-game fan survey, sent by email the morning after, has a response rate under 3%, and the marketing director (judge) suspects both the timing and a confusing question layout are to blame.",
      ask:
        "The marketing director (judge) wants you to evaluate the survey's design and timing and propose a version that will actually collect usable feedback.",
      location: "the marketing director's office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What about this survey's timing or design is likely driving away responses?",
      "What would you change first to raise the response rate?",
    ],
  },
  {
    title: "Which Sponsorship Package Is Working at Summit Sports & Entertainment Group",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:347", description: "Display data in charts/graphs or in tables" },
      { code: "IM:390", description: "Prepare written reports for decision-making" },
      { code: "IM:394", description: "Provide sales analysis reports" },
      { code: "IM:469", description: "Monitor/measure customer “buzz”" },
      { code: "IM:470", description: "Track channel management cost data" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the general manager",
      problem:
        "The general manager (judge) is renewing sponsorship packages for next season and wants to know which of SUMMIT's three sponsorship tiers actually delivers the most value to sponsors, since renewal conversations start next week and there's no comparison report ready.",
      ask:
        "The general manager (judge) wants a clear report, with data visualized, comparing the tiers' costs and measurable sponsor benefits.",
      location: "the general manager's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "Which sponsorship tier does this data say delivers the most real value?",
      "How did you measure something like sponsor visibility or 'buzz' at games?",
    ],
  },
  {
    title: "Should Summit Add an Esports Division?",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:021", description: "Explain the nature of product/service branding" },
      { code: "PM:024", description: "Identify the impact of product life cycles on marketing decisions" },
      { code: "PM:042", description: "Describe factors used by marketers to position products/services" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the general manager",
      problem:
        "A local esports organization has approached SUMMIT about co-managing an amateur esports league, and the general manager (judge) is weighing whether this fits SUMMIT's traditional-sports identity or would confuse fans about what SUMMIT actually represents.",
      ask:
        "The general manager (judge) wants you to recommend whether to add this to SUMMIT's mix of offerings and how it should be branded and positioned if so.",
      location: "the general manager's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "How would this fit with, or clash with, our current brand identity?",
      "How would you position this so existing fans understand what it is?",
    ],
  },
  {
    title: "Bundling the Family Game-Day Package at Summit Sports & Entertainment Group",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:020", description: "Explain warranties and guarantees" },
      { code: "PM:040", description: "Explain business ethics in product/service management" },
      { code: "PM:041", description: "Describe the nature of product bundling" },
      { code: "PM:127", description: "Identify methods/techniques to generate a product idea" },
      { code: "PM:128", description: "Generate product ideas" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the general manager",
      problem:
        "The general manager (judge) wants a new \"Family Night\" bundle combining tickets, concessions, and a jersey giveaway at one price, but isn't sure what to promise if a game gets postponed, and worries the bundle could feel like it's pressuring families into buying more concessions credit than they'll use.",
      ask:
        "The general manager (judge) wants you to propose the bundle's structure and a fair postponement policy, and explain how to market it as a genuine value.",
      location: "the general manager's office",
      greetingAsk: "to hear your bundle proposal",
    }),
    judgeQuestions: [
      "What should our policy be if a game in this bundle gets postponed?",
      "How do we make sure this doesn't feel like we're overselling concessions credit families won't use?",
    ],
  },
  {
    title: "Rebranding After a Losing Season at Summit Sports & Entertainment Group",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:206", description: "Explain the nature of corporate branding" },
      { code: "PM:207", description: "Describe factors used by businesses to position corporate brands" },
      { code: "PM:214", description: "Communicate core values of product/service" },
      { code: "PM:246", description: "Identify product's/service's competitive advantage" },
      { code: "PM:277", description: "Identify customer touch points" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the general manager",
      problem:
        "After a losing season, ticket renewals are down, and the general manager (judge) is worried that SUMMIT's brand has been entirely tied to winning, with nothing else for fans to connect with when the team struggles.",
      ask:
        "The general manager (judge) wants you to propose a brand positioning built on values beyond the scoreboard, and identify the touch points where fans need to feel that connection.",
      location: "the general manager's office",
      greetingAsk: "to hear your positioning idea",
    }),
    judgeQuestions: [
      "What's our competitive advantage as an entertainment option, separate from wins and losses?",
      "Which fan touch point would you focus on first to rebuild that connection?",
    ],
  },
  {
    title: "Promoting a New League-Wide Fan Safety Standard at Summit Sports & Entertainment Group",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:017", description: "Identify consumer protection provisions of appropriate agencies" },
      { code: "PM:019", description: "Describe the uses of grades and standards in marketing" },
      { code: "PM:039", description: "Describe the use of technology in the product/service management function" },
      { code: "PM:241", description: "Explain new product-development processes" },
      { code: "PM:278", description: "Determine the impact of product standards' issues associated with global business" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the general manager",
      problem:
        "The league just adopted a new arena safety-inspection standard, and the general manager (judge) wants to promote SUMMIT's compliance to reassure fans, but a rival venue was recently criticized for overstating its own safety record, and the GM doesn't want SUMMIT's real compliance to look equally exaggerated.",
      ask:
        "The general manager (judge) wants you to explain how to accurately communicate this real standard to fans without it sounding like empty marketing.",
      location: "the general manager's office",
      greetingAsk: "to hear how you'd communicate this",
    }),
    judgeQuestions: [
      "How do we make this claim feel credible rather than like a marketing line?",
      "Where should this message reach fans first?",
    ],
  },
  {
    title: "A New Streaming Rights Deal at Summit Sports & Entertainment Group",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the general manager",
      problem:
        "A streaming platform wants exclusive rights to broadcast SUMMIT's games, which would mean fans could no longer watch on the local cable channel they're used to, and the general manager (judge) wants to understand this distribution shift before agreeing.",
      ask:
        "The general manager (judge) wants you to explain how this channel relationship works and flag any legal or ethical considerations, especially fan access, before recommending whether to move forward.",
      location: "the general manager's office",
      greetingAsk: "to hear your read on this deal",
    }),
    judgeQuestions: [
      "What's the risk to our fan base if we move exclusively to this streaming platform?",
      "What should we check legally in this kind of distribution agreement?",
    ],
  },
  {
    title: "Coordinating with a Local Radio Broadcast Partner at Summit Sports & Entertainment Group",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the general manager",
      problem:
        "SUMMIT's longtime local radio broadcast partner wants to expand into co-promoting ticket giveaways, and the general manager (judge) likes the idea but isn't sure how to coordinate the giveaway promotions with SUMMIT's own ticket-sales calendar.",
      ask:
        "The general manager (judge) wants you to explain how this partner relationship should work and propose how to coordinate it with our own promotional calendar.",
      location: "the general manager's office",
      greetingAsk: "to hear how you'd coordinate this partnership",
    }),
    judgeQuestions: [
      "What could go wrong if this isn't coordinated with our own ticket-sales promotions?",
      "What should each side be responsible for in this partnership?",
    ],
  },
  {
    title: "Listing Tickets on a Secondary Marketplace at Summit Sports & Entertainment Group",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the general manager",
      problem:
        "A secondary ticket-resale marketplace wants to feature SUMMIT's games prominently in exchange for a cut of resale transactions, and the general manager (judge) is weighing the added exposure against a platform known for price-gouging that could reflect poorly on SUMMIT.",
      ask:
        "The general manager (judge) wants your recommendation on whether this channel is worth it, including what to check legally and ethically first.",
      location: "the general manager's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What reputational risk comes with this kind of resale marketplace?",
      "What would you check in this platform's terms before agreeing to the partnership?",
    ],
  },
  {
    title: "Pricing Premium Seats for a Rivalry Game at Summit Sports & Entertainment Group",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the general manager",
      problem:
        "The rivalry game against the top team in the league is expected to sell out, and the general manager (judge) is deciding whether to use dynamic pricing that raises ticket prices as demand increases, worried fans could see it as price-gouging their most loyal supporters.",
      ask:
        "The general manager (judge) wants you to recommend a pricing approach for this game and explain the factors, and any ethical considerations, behind it.",
      location: "the general manager's office",
      greetingAsk: "to hear your pricing recommendation",
    }),
    judgeQuestions: [
      "What's the ethical line between smart dynamic pricing and price-gouging loyal fans?",
      "What factors would you weigh in setting the ceiling on this dynamic price?",
    ],
  },
  {
    title: "Undercut by a Rival Venue's Ticket Prices at Summit Sports & Entertainment Group",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
    ],
    eventSituation: buildSituation({
      role: "the marketing associate",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the general manager",
      problem:
        "A new entertainment venue in town is offering rock-bottom ticket prices for competing events on the same nights as SUMMIT's games, and the general manager (judge) worries that discounting to compete will undercut the perceived value of a SUMMIT game night.",
      ask:
        "The general manager (judge) wants you to recommend a pricing response that protects margins and value perception rather than racing to the bottom.",
      location: "the general manager's office",
      greetingAsk: "to hear your pricing recommendation",
    }),
    judgeQuestions: [
      "Why might matching this rival venue's rock-bottom pricing hurt us long term?",
      "What would you offer instead of a straight price cut to compete for that night?",
    ],
  },
  {
    title: "Group-Sales Reps Overpromising Seating at Summit Sports & Entertainment Group",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
      { code: "SE:109", description: "Analyze product information to identify product features and benefits" },
    ],
    eventSituation: buildSituation({
      role: "a group-sales representative",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the general manager",
      problem:
        "A youth sports league that booked a 60-person group outing showed up to find their seats split across two sections instead of together as promised, and the general manager (judge) is concerned group-sales reps are promising seating arrangements without confirming availability first.",
      ask:
        "The general manager (judge) wants you to walk through how the group-sales process should work so reps stop promising seating they haven't actually confirmed.",
      location: "the group-sales office",
      greetingAsk: "to hear how you'd fix this",
    }),
    judgeQuestions: [
      "What should a rep confirm before promising a group can sit together?",
      "How would you make this right with the youth league that showed up split apart?",
    ],
  },
  {
    title: "Training New Group-Sales Reps on Company Policy at Summit Sports & Entertainment Group",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:106", description: "Explain legal and ethical considerations in selling" },
      { code: "SE:107", description: "Describe the use of technology in the selling function" },
      { code: "SE:359", description: "Discuss motivational theories that impact buying behavior" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
    ],
    eventSituation: buildSituation({
      role: "a senior group-sales representative",
      company: "SUMMIT SPORTS & ENTERTAINMENT GROUP",
      judgeRole: "the general manager",
      problem:
        "SUMMIT just hired two new group-sales reps ahead of the busy fall booking season, and the general manager (judge) wants them trained on company selling policy, ethical and legal boundaries, and how to turn one-time group bookings into repeat clients, rather than learning it inconsistently on the job.",
      ask:
        "The general manager (judge) wants you to put together a short training outline covering selling policy, ethics, and repeat-client building for the new hires.",
      location: "the group-sales office",
      greetingAsk: "to walk through your training outline",
    }),
    judgeQuestions: [
      "What's one selling boundary a new rep needs to understand before their first booking call?",
      "What would you tell a new rep about turning a one-time group booking into a repeat client?",
    ],
  },
];

const SEM_EVENT: EventCaseStudySeed = {
  eventSlug: "sports-and-entertainment-marketing-series",
  eventName: "Sports and Entertainment Marketing Series",
  careerCluster: "Marketing",
  careerPathway: "Marketing Management",
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: SEM_CASES,
};

// ---------------------------------------------------------------------------
// marketing-communications-series (SERIES, Marketing Communications pathway)
// ---------------------------------------------------------------------------
const MARCOMM_CASES: CaseStudySeed[] = [
  {
    title: "New Client Confused by the Promotional Mix at Bright Spark Creative",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:014", description: "Explain the components of advertisements" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "A new client, a local dental practice, signed on for \"marketing help\" but has no idea what BRIGHT SPARK actually plans to do, asking the account director (judge) in the kickoff call, \"so are you just doing ads, or what?\"",
      ask:
        "The account director (judge) wants you to explain the promotional mix in plain terms and recommend which elements and media make sense for this client's budget and goals.",
      location: "the agency conference room",
      greetingAsk: "to hear how you'd explain this to the client",
    }),
    judgeQuestions: [
      "How would you explain the promotional mix to a client with no marketing background?",
      "Which media would you recommend for a small local practice like this one?",
    ],
  },
  {
    title: "Uncoordinated Multi-Channel Campaign at Bright Spark Creative",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:073", description: "Explain the nature of a promotional plan" },
      { code: "PR:076", description: "Coordinate activities in the promotional mix" },
      { code: "PR:081", description: "Explain the use of advertising agencies" },
      { code: "PR:099", description: "Describe the use of business ethics in promotion" },
      { code: "PR:100", description: "Describe the use of technology in the promotion function" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "A retail client's launch campaign is running behind schedule because the print ad, the paid social, and the influencer posts were each assigned to a different team member with no shared calendar, and the influencer already posted with a price that doesn't match the print ad going out next week.",
      ask:
        "The account director (judge) wants you to build one coordinated promotional plan across these pieces and flag the ethical issue with the mismatched pricing information already public.",
      location: "the agency conference room",
      greetingAsk: "to walk through your plan",
    }),
    judgeQuestions: [
      "What's the ethical issue with the influencer post and print ad showing different prices?",
      "How would you keep a multi-person campaign like this coordinated going forward?",
    ],
  },
  {
    title: "Weak Email Campaign Copy at Bright Spark Creative",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:164", description: "Explain the nature of online advertising (e.g., email, search, social media, display, mobile)" },
      { code: "PR:165", description: "Explain the nature of email marketing tactics" },
      { code: "PR:166", description: "Execute targeted emails" },
      { code: "PR:362", description: "Write email marketing copy" },
      { code: "PR:371", description: "Write content for use in social media" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "A client's holiday email campaign has an open rate half the industry average, and the account director (judge) suspects the subject lines and copy are generic and not actually targeted to the different customer segments on the client's list.",
      ask:
        "The account director (judge) wants you to rework the email approach, including targeting and copy, and recommend how a matching social post could reinforce the campaign.",
      location: "the agency conference room",
      greetingAsk: "to hear your revised approach",
    }),
    judgeQuestions: [
      "What's likely causing this low open rate beyond just the subject line?",
      "How would you tailor this email copy differently for different customer segments?",
    ],
  },
  {
    title: "Client's Website Isn't Driving Traffic at Bright Spark Creative",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:299", description: "Discuss the use of search engine optimization tactics for digital marketing" },
      { code: "PR:328", description: "Explain website-development process" },
      { code: "PR:333", description: "Identify strategies for attracting targeted audience to website" },
      { code: "PR:364", description: "Explain the role of business websites in digital marketing" },
      { code: "PR:365", description: "Explain the use of social media for digital marketing" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "A client's newly redesigned website looks great but is getting almost no organic traffic three months after launch, and the client is asking why the redesign investment isn't showing results.",
      ask:
        "The account director (judge) wants you to diagnose what's missing, likely SEO and audience-attraction strategy, and propose a plan connecting the website to the client's social presence.",
      location: "the agency conference room",
      greetingAsk: "to hear your diagnosis",
    }),
    judgeQuestions: [
      "What's most likely missing that's keeping this redesigned site from getting traffic?",
      "How would you connect the client's social media activity to driving people to this site?",
    ],
  },
  {
    title: "A Client Wants Into a Regional Trade Show at Bright Spark Creative",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:236", description: "Participate in trade shows/expositions" },
      { code: "PR:250", description: "Explain communications channels used in public-relations activities" },
      { code: "PR:252", description: "Identify types of public-relations activities" },
      { code: "PR:253", description: "Discuss internal and external audiences for public-relations activities" },
      { code: "PR:254", description: "Explain how businesses can use trade-show/exposition participation to communicate with targeted audiences" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "A manufacturing client wants BRIGHT SPARK to plan its presence at a major regional trade show in six weeks, but has never exhibited before and has no idea what a booth presence should actually accomplish beyond \"getting our name out there.\"",
      ask:
        "The account director (judge) wants you to explain how trade-show participation fits into PR strategy and propose specific goals and activities for the client's booth.",
      location: "the agency conference room",
      greetingAsk: "to hear your trade-show plan",
    }),
    judgeQuestions: [
      "What should this client's booth actually be trying to accomplish, beyond visibility?",
      "Who are the internal and external audiences we need to think about for this event?",
    ],
  },
  {
    title: "A Client's Ad Design Looks Amateurish at Bright Spark Creative",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:123", description: "Describe the use of color in advertisements" },
      { code: "PR:222", description: "Describe the elements of design" },
      { code: "PR:274", description: "Describe digital color concepts" },
      { code: "PR:295", description: "Discuss the nature of typography" },
      { code: "PR:314", description: "Explain the impact of color harmonies on composition" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the creative director",
      problem:
        "A junior designer's first client ad draft uses five clashing colors and three different fonts, and the creative director (judge) needs it fixed before the client review tomorrow morning without discouraging the new designer.",
      ask:
        "The creative director (judge) wants you to identify what's wrong with the current design, using real design principles, and coach the junior designer toward a cleaner revision.",
      location: "the creative studio",
      greetingAsk: "to hear your feedback on this draft",
    }),
    judgeQuestions: [
      "What design principles is this draft violating, specifically?",
      "How would you give this feedback to the junior designer without discouraging them?",
    ],
  },
  {
    title: "A Client Wants a Viral Moment at Bright Spark Creative",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:312", description: "Explain considerations in developing viral marketing campaigns" },
      { code: "PR:317", description: "Explain the nature of buzz-marketing" },
      { code: "PR:319", description: "Explain the nature of word-of-mouth (WOM) strategies" },
      { code: "PR:321", description: "Explain the use of celebrities/influencers as a WOM strategy" },
      { code: "PR:247", description: "Describe word-of-mouth channels used to communicate with targeted audiences" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the creative director",
      problem:
        "A client saw a competitor's video go viral and wants BRIGHT SPARK to \"make us go viral too\" with a small budget and no clear concept, not understanding that virality can't simply be purchased or guaranteed.",
      ask:
        "The creative director (judge) wants you to explain, honestly, what actually goes into a buzz-worthy campaign and propose a realistic word-of-mouth strategy within this client's budget.",
      location: "the creative studio",
      greetingAsk: "to hear your honest take on this request",
    }),
    judgeQuestions: [
      "What would you tell this client about the reality of trying to 'go viral' on purpose?",
      "What's a realistic word-of-mouth strategy you'd propose instead?",
    ],
  },
  {
    title: "No Research Process Before Pitching Clients at Bright Spark Creative",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "IM:025", description: "Explain the role of ethics in marketing-information management" },
      { code: "IM:062", description: "Explain techniques for processing marketing data" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "BRIGHT SPARK has been pitching campaign concepts to prospective clients based on what \"feels right\" creatively, and lost a recent pitch to a competitor who opened with actual audience data about the prospect's own customers.",
      ask:
        "The account director (judge) wants you to explain what a real marketing-information process would look like for pitches and propose how to build simple research into the agency's pitch process, ethically.",
      location: "the agency conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What did the competitor likely do differently in their winning pitch?",
      "What's an ethical way to gather quick audience data before a pitch?",
    ],
  },
  {
    title: "Designing Research for a Client Rebrand at Bright Spark Creative",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:281", description: "Describe options businesses use to obtain marketing research data (i.e., primary and secondary research)" },
      { code: "IM:282", description: "Discuss the nature of marketing research problems/issues" },
      { code: "IM:284", description: "Describe methods used to design marketing research studies (i.e., descriptive, exploratory, and causal)" },
      { code: "IM:285", description: "Discuss the nature of sampling plans (i.e., who, how many, how chosen)" },
      { code: "IM:289", description: "Describe data-collection methods (e.g., observations, mail, diaries, phone, internet, discussion groups, interviews, scanners, tracking tools)" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "A client wants a full rebrand but the account director (judge) doesn't want to recommend a new visual identity based purely on internal opinion, given how much the rebrand will cost the client to roll out.",
      ask:
        "The account director (judge) wants you to design a short research study, including method, sample, and data-collection approach, to validate rebrand directions with real customers before committing.",
      location: "the agency conference room",
      greetingAsk: "to hear your research design",
    }),
    judgeQuestions: [
      "Why is it risky to base a rebrand purely on the agency's internal opinion?",
      "Who should we be sampling to validate a rebrand direction?",
    ],
  },
  {
    title: "A Confusing Client Brand-Perception Survey at Bright Spark Creative",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:292", description: "Identify sources of error in a research project (e.g., response errors, interviewer errors, non-response errors, sample design)" },
      { code: "IM:293", description: "Evaluate questionnaire design (e.g., types of questions, question wording, routing, sequencing, length, layout)" },
      { code: "IM:418", description: "Explain characteristics of effective data-collection instruments" },
      { code: "IM:419", description: "Describe the regulation of marketing-information management" },
      { code: "IM:428", description: "Assess appropriateness of marketing research for the problem/issue (e.g., research methods, sources of information, timeliness of information, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "A brand-perception survey sent out to a client's customer list came back with wildly inconsistent answers to nearly identical questions, and the account director (judge) suspects the survey's own wording is confusing respondents rather than perceptions actually being that inconsistent.",
      ask:
        "The account director (judge) wants you to evaluate the survey's design and identify the wording issue, then propose a clearer version.",
      location: "the agency conference room",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What in this survey's wording could produce such inconsistent answers?",
      "What would you change first to get a cleaner read on brand perception?",
    ],
  },
  {
    title: "Proving Campaign ROI to a Skeptical Client at Bright Spark Creative",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:410", description: "Track performance of promotional activities" },
      { code: "IM:411", description: "Track trends (e.g., social, buying, social media, advertising agency, etc.)" },
      { code: "IM:429", description: "Monitor competitors' promotional efforts" },
      { code: "IM:430", description: "Manage online brand and reputation" },
      { code: "IM:468", description: "Monitor daily social-media analytics" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "A client is questioning whether to renew BRIGHT SPARK's contract, saying they \"don't see results\" from the last quarter's campaign, even though the account director (judge) believes the work performed well.",
      ask:
        "The account director (judge) wants you to pull together a performance report tracking the campaign against trends and competitor activity that makes the results concrete for this client.",
      location: "the agency conference room",
      greetingAsk: "to hear how you'd build this case",
    }),
    judgeQuestions: [
      "What data would make this client actually feel the campaign worked?",
      "How would you frame competitor activity to show this campaign's relative performance?",
    ],
  },
  {
    title: "A Junior Account Exec Struggles to Write the Pitch Deck at Bright Spark Creative",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:174", description: "Make client presentations (includes strategies and research findings)" },
      { code: "CO:175", description: "Prepare contact reports" },
      { code: "CO:177", description: "Write new-business pitches" },
      { code: "CO:178", description: "Write white papers" },
      { code: "CO:179", description: "Write pitch/sales letters" },
    ],
    eventSituation: buildSituation({
      role: "a senior account executive",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "A junior account executive has been asked to draft the new-business pitch for a major prospective client, but their draft reads like an internal memo rather than a persuasive pitch, and the meeting is in two days.",
      ask:
        "The account director (judge) wants you to coach the junior exec through reworking the pitch into something that actually persuades, and explain what belongs in a strong client presentation.",
      location: "the agency conference room",
      greetingAsk: "to hear how you'd coach this",
    }),
    judgeQuestions: [
      "What's the difference between an internal memo and a persuasive new-business pitch?",
      "What would you tell this junior exec to cut or add before the meeting?",
    ],
  },
  {
    title: "No Communications Plan for a Client's Social Presence at Bright Spark Creative",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:193", description: "Maintain day-to-day content on social platforms" },
      { code: "CO:195", description: "Explain the nature of communications plans" },
      { code: "CO:196", description: "Implement a communications plan" },
      { code: "CO:197", description: "Monitor communications plan" },
      { code: "CO:198", description: "Develop communications plan" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "A client's social media accounts have been posting whatever content someone happens to think of each morning, with no actual plan, and the client just asked why their posting feels random and unfocused.",
      ask:
        "The account director (judge) wants you to explain what a real communications plan involves and propose one for this client's social presence, including how it would be monitored.",
      location: "the agency conference room",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "What's missing from just 'posting whatever comes to mind' each day?",
      "How would you monitor whether this new communications plan is actually working?",
    ],
  },
  {
    title: "Adjusting a Communications Plan Mid-Campaign at Bright Spark Creative",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:196", description: "Implement a communications plan" },
      { code: "CO:197", description: "Monitor communications plan" },
      { code: "CO:198", description: "Develop communications plan" },
      { code: "CO:199", description: "Adjust communications plan" },
      { code: "CO:174", description: "Make client presentations (includes strategies and research findings)" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "Three weeks into a client's quarterly communications plan, engagement is well below what was projected, and the client is asking in a check-in call whether the plan is even working.",
      ask:
        "The account director (judge) wants you to review the plan's performance so far, propose specific adjustments, and prepare how you'd present the change to the client.",
      location: "the agency conference room",
      greetingAsk: "to hear your recommended adjustments",
    }),
    judgeQuestions: [
      "What would you actually change in this plan based on the underperformance?",
      "How would you present this pivot to the client without shaking their confidence in us?",
    ],
  },
  {
    title: "Outdated Design Tools Slowing Down Bright Spark Creative",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:037", description: "Demonstrate effective use of audiovisual aids" },
      { code: "NF:038", description: "Demonstrate basic desktop publishing functions to prepare promotional materials" },
      { code: "NF:039", description: "Integrate software applications to prepare promotional materials" },
      { code: "NF:053", description: "Explain the capabilities of tools used in web-site creation" },
      { code: "NF:206", description: "Describe current issues/trends in marketing communications" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the creative director",
      problem:
        "Several team members are still building client presentations and promotional materials using outdated desktop publishing habits, exporting files that don't integrate cleanly across the software the agency actually uses, slowing every project down.",
      ask:
        "The creative director (judge) wants you to identify where the team's current tool use is falling behind and propose a plan to modernize how materials get built and shared.",
      location: "the creative studio",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "Where specifically is the current workflow creating bottlenecks?",
      "What current marketing-communications trend should factor into how we modernize this?",
    ],
  },
  {
    title: "A Client Wants a Mobile-First Social Strategy at Bright Spark Creative",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:096", description: "Compare the capabilities of SMS with MMS" },
      { code: "NF:097", description: "Discuss considerations in using mobile technology for promotional activities" },
      { code: "NF:099", description: "Explain how to effectively incorporate video into multimedia" },
      { code: "NF:209", description: "Evaluate the impact of mobile-device capabilities and usage patterns on social-media effectiveness" },
      { code: "NF:210", description: "Identify trends in social-media space" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the creative director",
      problem:
        "A retail client wants a \"mobile-first\" social media strategy after hearing the term at an industry conference, but isn't sure what that actually means beyond \"make sure it works on phones,\" and the creative director (judge) needs a concrete plan to bring back to them.",
      ask:
        "The creative director (judge) wants you to explain what mobile-first actually requires, including video and current platform trends, and propose a concrete strategy for this client.",
      location: "the creative studio",
      greetingAsk: "to hear your mobile-first strategy",
    }),
    judgeQuestions: [
      "What does 'mobile-first' actually change about how we should design this content?",
      "What current social-media trend would you build into this strategy?",
    ],
  },
  {
    title: "Building a Client Database for Better Targeting at Bright Spark Creative",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:100", description: "Explain ways that technology impacts marketing communications" },
      { code: "NF:101", description: "Maintain databases of information for marketing communications" },
      { code: "NF:103", description: "Mine databases for information useful in marketing communications" },
      { code: "NF:115", description: "Describe considerations in using databases in marketing communications" },
      { code: "NF:208", description: "Use analytics tracking tools for marketing communications" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the creative director",
      problem:
        "A client has years of customer purchase data sitting unused in an old system, and the creative director (judge) sees an opportunity to use it for much sharper campaign targeting, but the agency has never mined a client's database like this before.",
      ask:
        "The creative director (judge) wants you to explain how this database could be used for marketing communications and propose a plan for organizing and mining it responsibly.",
      location: "the creative studio",
      greetingAsk: "to hear your plan for this database",
    }),
    judgeQuestions: [
      "What consideration should we keep in mind when mining a client's customer database?",
      "How would you turn this raw data into something that actually improves targeting?",
    ],
  },
  {
    title: "Explaining What 'Product' Means for a Services Client at Bright Spark Creative",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:082", description: "Explain the nature of product extension in services marketing" },
      { code: "PM:091", description: "Explain the concept of “product” in marketing communications" },
      { code: "PM:187", description: "Generate marketing communications ideas" },
      { code: "PM:220", description: "Describe services offered by the marketing-communications industry" },
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the creative director",
      problem:
        "A new client that sells consulting services keeps asking BRIGHT SPARK to market their \"product,\" confused about how to promote something intangible the same way they'd promote a physical item.",
      ask:
        "The creative director (judge) wants you to explain how \"product\" applies in a marketing-communications context for a services business and generate campaign ideas that fit.",
      location: "the creative studio",
      greetingAsk: "to hear how you'd explain this to the client",
    }),
    judgeQuestions: [
      "How would you explain the concept of 'product' to a client who only sells a service?",
      "What's one campaign idea that would work for marketing an intangible service like consulting?",
    ],
  },
  {
    title: "Helping a Client Build Online Credibility at Bright Spark Creative",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:274", description: "Establish credibility with Internet users" },
      { code: "PM:275", description: "Identify opportunities in the social-media space" },
      { code: "PM:276", description: "Describe the role of customer voice in branding" },
      { code: "PM:277", description: "Identify customer touch points" },
      { code: "PM:206", description: "Explain the nature of corporate branding" },
    ],
    eventSituation: buildSituation({
      role: "the account coordinator",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the creative director",
      problem:
        "A newer client's online presence feels untrustworthy to prospective customers, with almost no reviews, a bare-bones \"About\" page, and no visible customer voices anywhere, even though the client has a decade of happy customers offline.",
      ask:
        "The creative director (judge) wants you to identify where this client could build online credibility and propose how to surface real customer voice across their touch points.",
      location: "the creative studio",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What's the fastest way to start building online credibility for this client?",
      "Which customer touch point would you prioritize first to surface their customer voice?",
    ],
  },
  {
    title: "An Account Exec's Follow-Up Falls Through at Bright Spark Creative",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:347", description: "Pitch marketing communications idea to client" },
      { code: "SE:360", description: "Acquire knowledge of client's products/brands" },
      { code: "SE:395", description: "Present an advertising campaign to clients" },
      { code: "SE:398", description: "Provide service after the sale" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
    ],
    eventSituation: buildSituation({
      role: "an account executive",
      company: "BRIGHT SPARK CREATIVE",
      judgeRole: "the account director",
      problem:
        "A client whose campaign was approved and launched a month ago hasn't heard from their account exec since, and just emailed asking if BRIGHT SPARK has \"moved on\" to other clients, worrying the account director (judge) about the relationship.",
      ask:
        "The account director (judge) wants you to explain what proper after-the-sale service should look like here and how you'd re-engage this client to rebuild confidence.",
      location: "the agency conference room",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What should ongoing service have looked like after this campaign launched?",
      "How would you re-engage this client without it feeling like damage control?",
    ],
  },
];

const MARCOMM_EVENT: EventCaseStudySeed = {
  eventSlug: "marketing-communications-series",
  eventName: "Marketing Communications Series",
  careerCluster: "Marketing",
  careerPathway: "Marketing Communications",
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: MARCOMM_CASES,
};

// ---------------------------------------------------------------------------
// retail-merchandising-series (SERIES, Merchandising pathway)
// ---------------------------------------------------------------------------
const RETAIL_CASES: CaseStudySeed[] = [
  {
    title: "Delayed Online Pickup Orders at Cascade Home & Goods",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:040", description: "Follow up orders" },
      { code: "OP:377", description: "Explain distribution issues and trends" },
      { code: "OP:378", description: "Discuss the use of electronic data interchange (EDI)" },
      { code: "OP:380", description: "Use an information system for order fulfillment" },
      { code: "OP:381", description: "Fulfill orders" },
    ],
    eventSituation: buildSituation({
      role: "the operations associate",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "Several customers have shown up for buy-online-pickup-in-store orders that weren't actually ready, and the store manager (judge) has found that associates are pulling these orders manually from a paper printout instead of using the fulfillment system, causing items to get missed or fulfilled late.",
      ask:
        "The store manager (judge) wants you to propose a reliable process for fulfilling and following up on online pickup orders using the store's own systems correctly.",
      location: "the pickup counter",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "What's going wrong with relying on a paper printout for these orders?",
      "How would you make sure a customer never shows up to an order that isn't ready?",
    ],
  },
  {
    title: "Shrinkage Spike in the Housewares Aisle at Cascade Home & Goods",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:122", description: "Explain policies/procedures for handling shoplifters" },
      { code: "OP:172", description: "Devise/Enact merchandise security measures to minimize inventory shrinkage" },
      { code: "OP:389", description: "Attach source and anti-theft tags" },
      { code: "OP:415", description: "Determine inventory shrinkage" },
      { code: "OP:526", description: "Describe ethical considerations in distribution" },
    ],
    eventSituation: buildSituation({
      role: "the loss-prevention associate",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "The quarterly count shows shrinkage in small kitchen appliances has nearly tripled, and a walkthrough found a batch of blenders that reached the floor without anti-theft tags, plus a camera blind spot near that aisle that staff mentioned but never escalated.",
      ask:
        "The store manager (judge) wants you to determine what's driving this specific spike and recommend changes to tagging and floor procedures, without turning the store into one that makes honest shoppers feel watched.",
      location: "the manager's office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "Where is a small appliance most likely to slip through without a tag?",
      "How do we fix this without making customers feel like suspects?",
    ],
  },
  {
    title: "Register Drawers Off at Closing at Cascade Home & Goods",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:194", description: "Prepare cash drawers/banks" },
      { code: "OP:195", description: "Open/Close register/terminal" },
      { code: "OP:398", description: "Enter product descriptions into a PoS system" },
      { code: "OP:391", description: "Make and record price changes" },
      { code: "OP:390", description: "Price mark merchandise" },
    ],
    eventSituation: buildSituation({
      role: "a shift lead",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "Register drawers have come up short at closing twice this week, and a customer was overcharged when a clearance item scanned at full price because the shelf tag hadn't been updated to match a system price change made two days earlier.",
      ask:
        "The store manager (judge) wants you to design a clear opening/closing checklist for registers and a reliable process for keeping shelf tags in sync with system price changes.",
      location: "the front registers",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "What's the first thing an associate should do when opening a cash drawer?",
      "How do we make sure a price change reaches the shelf tag the same day?",
    ],
  },
  {
    title: "New Furniture Line Stuck in the Stockroom at Cascade Home & Goods",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:392", description: "Identify hang-tag needs" },
      { code: "OP:393", description: "Assign codes to each product item" },
      { code: "OP:394", description: "Route stock to sales floor" },
      { code: "OP:395", description: "Rotate stock" },
      { code: "OP:417", description: "Implement category management process" },
    ],
    eventSituation: buildSituation({
      role: "the stockroom associate",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "A new small-furniture line has been sitting in the stockroom for a week because no one is sure which category it belongs in or where it should go on the floor, while last season's décor items are still blocking the aisle they're supposed to be rotated out of.",
      ask:
        "The store manager (judge) wants you to propose a category-management system for organizing incoming stock and rotating older merchandise so nothing gets stranded again.",
      location: "the stockroom",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "How would you decide which category this new furniture line belongs in?",
      "What's your plan for rotating older décor items out on schedule?",
    ],
  },
  {
    title: "A Branch Transfer Goes Missing at Cascade Home & Goods",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:396", description: "Process returned/damaged product" },
      { code: "OP:397", description: "Transfer stock to/from branches" },
      { code: "OP:409", description: "Complete inventory counts" },
      { code: "OP:408", description: "Report out-of-stocks" },
      { code: "OP:407", description: "Maintain inventory levels" },
    ],
    eventSituation: buildSituation({
      role: "the inventory associate",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "A shipment of patio furniture transferred to a sister store last month was never logged as leaving this location, so the system still shows stock that isn't physically here, while a popular item reported as out-of-stock was actually sitting unscanned in the stockroom.",
      ask:
        "The store manager (judge) wants you to determine what broke down in this transfer and recommend a clearer process for transfers and inventory counts so the system matches the shelves.",
      location: "the inventory office",
      greetingAsk: "to hear your findings",
    }),
    judgeQuestions: [
      "What step in the transfer process likely broke down here?",
      "How often should we be doing counts to catch a mismatch like this sooner?",
    ],
  },
  {
    title: "Stockroom Can't Handle the Holiday Delivery at Cascade Home & Goods",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:400", description: "Explain storing considerations" },
      { code: "OP:401", description: "Explain the nature of warehousing" },
      { code: "OP:402", description: "Store inventory" },
      { code: "OP:405", description: "Explain shipping processes" },
      { code: "OP:406", description: "Identify factors considered when selecting best shipping method" },
    ],
    eventSituation: buildSituation({
      role: "the stockroom lead",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "A holiday delivery twice the store's normal weekly volume is arriving next week, and the stockroom, currently a mix of overstock, packaging supplies, and pending customer transfers with no clear zones, can't physically absorb it without boxes ending up in walkways.",
      ask:
        "The store manager (judge) wants you to propose how to organize stockroom space into zones and a plan for outbound shipping so this delivery can be handled safely.",
      location: "the stockroom",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "What categories of items need their own zone before this delivery arrives?",
      "What shipping method considerations matter most for our outbound transfers right now?",
    ],
  },
  {
    title: "Over Budget on the Seasonal Décor Buy at Cascade Home & Goods",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:058", description: "Calculate open-to-buy" },
      { code: "PM:061", description: "Explain the nature of merchandise plans (budgets)" },
      { code: "PM:062", description: "Plan stock" },
      { code: "PM:063", description: "Plan reductions (e.g., anticipated markdowns, employee/other discounts, stock shortages)" },
      { code: "PM:064", description: "Plan purchases" },
    ],
    eventSituation: buildSituation({
      role: "the assistant buyer",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "The store manager (judge) just discovered CASCADE is significantly over its open-to-buy for fall décor, with more purchase orders still arriving even though the stockroom is already full of last year's fall stock that never sold through.",
      ask:
        "The store manager (judge) wants you to recalculate open-to-buy, recommend which orders to delay or cancel, and propose a markdown plan for the leftover stock.",
      location: "the buying office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "Walk me through how you'd recalculate our open-to-buy before the next order.",
      "How would you decide which leftover items get marked down first?",
    ],
  },
  {
    title: "An Overseas Cookware Vendor's Offer at Cascade Home & Goods",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:192", description: "Compare and contrast buying from domestic sources with that of foreign sources" },
      { code: "PM:193", description: "Determine final cost of purchases from domestic and international sources" },
      { code: "PM:239", description: "Evaluate vendors' goods and services" },
      { code: "PM:263", description: "Choose vendors" },
      { code: "PM:264", description: "Negotiate terms with suppliers" },
    ],
    eventSituation: buildSituation({
      role: "the assistant buyer",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "An overseas cookware manufacturer has offered CASCADE a bulk-pricing deal that looks much cheaper than the current domestic vendor, but the store manager (judge) suspects that once shipping, customs, and a longer lead time are factored in, the real savings may be smaller than they look, and there's no track record with this new vendor's quality.",
      ask:
        "The store manager (judge) wants you to evaluate both options and recommend whether to switch, stay domestic, or negotiate better terms with the current vendor.",
      location: "the buying office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What costs beyond unit price should factor into this comparison?",
      "If we stay with our current vendor, what would you try to negotiate given this offer?",
    ],
  },
  {
    title: "Bestselling Candles Keep Running Out at Cascade Home & Goods",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:232", description: "Establish reorder points" },
      { code: "PM:258", description: "Write purchase orders" },
      { code: "PM:260", description: "Determine what to buy/reorder" },
      { code: "PM:261", description: "Determine quantities to buy/reorder" },
      { code: "PM:262", description: "Determine when to buy/reorder" },
    ],
    eventSituation: buildSituation({
      role: "the assistant buyer",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "A scented candle line has become a surprise bestseller and keeps selling out between reorders, while several slow-moving décor items still get reordered on the same fixed monthly schedule despite sitting untouched on the shelf.",
      ask:
        "The store manager (judge) wants you to establish a new reorder point for the candles and propose a more responsive reorder approach overall.",
      location: "the buying office",
      greetingAsk: "to hear your findings",
    }),
    judgeQuestions: [
      "How would you set a new reorder point for these candles specifically?",
      "Why doesn't a fixed monthly schedule work well for every item in this store?",
    ],
  },
  {
    title: "Planning Next Season's Kitchen Assortment at Cascade Home & Goods",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:219", description: "Create/maintain daily sales plan" },
      { code: "PM:223", description: "Determine quality of merchandise to offer" },
      { code: "PM:224", description: "Determine stock turnover" },
      { code: "PM:254", description: "Plan merchandise assortment (e.g., styling, sizes, quantities, colors)" },
      { code: "PM:257", description: "Identify emerging trends" },
    ],
    eventSituation: buildSituation({
      role: "the assistant buyer",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "The store manager (judge) is finalizing next season's kitchenware assortment, and turnover data shows certain colorways sell through quickly while others sit for months, right as a trend report shows customers increasingly asking for a style CASCADE currently under-stocks.",
      ask:
        "The store manager (judge) wants you to recommend an assortment plan that reflects the emerging trend and the turnover data, and explain how you'd track it with a daily sales plan.",
      location: "the buying office",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "How should this emerging trend change our buy compared to last season?",
      "What would you track daily to know if this new assortment is working?",
    ],
  },
  {
    title: "New Safety-Labeling Rule for Small Appliances at Cascade Home & Goods",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:017", description: "Identify consumer protection provisions of appropriate agencies" },
      { code: "PM:019", description: "Describe the uses of grades and standards in marketing" },
      { code: "PM:020", description: "Explain warranties and guarantees" },
    ],
    eventSituation: buildSituation({
      role: "the assistant buyer",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "A new consumer-safety labeling requirement now applies to the small-appliance category, and the store manager (judge) has learned some of CASCADE's current stock doesn't display the required information, putting part of the product mix at risk of being pulled.",
      ask:
        "The store manager (judge) wants you to explain what this labeling requirement covers and propose how to bring the affected products into compliance without disrupting the floor.",
      location: "the buying office",
      greetingAsk: "to hear your compliance plan",
    }),
    judgeQuestions: [
      "What does this new labeling requirement actually protect against?",
      "How would you handle stock that's already on the floor without the required label?",
    ],
  },
  {
    title: "A New Associate Struggling to Connect at Cascade Home & Goods",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:110", description: "Establish relationship with customer/client" },
      { code: "SE:111", description: "Determine customer/client needs" },
      { code: "SE:114", description: "Recommend specific products" },
      { code: "SE:374", description: "Demonstrate good/service" },
      { code: "SE:396", description: "Provide information about incoming merchandise to sales staff" },
    ],
    eventSituation: buildSituation({
      role: "a senior sales associate",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "The store manager (judge) has asked you to coach a newly hired associate whose customer interactions are short and transactional, pointing toward an aisle and moving on rather than actually helping shoppers find what they need, and a customer recently left without finding an item CASCADE did carry.",
      ask:
        "The store manager (judge) wants you to put together coaching on building rapport, uncovering needs, recommending products, and staying informed on incoming stock.",
      location: "the sales floor",
      greetingAsk: "to hear your coaching plan",
    }),
    judgeQuestions: [
      "What's a better opening than 'let me know if you need anything'?",
      "How should an associate use information about incoming merchandise in a customer conversation?",
    ],
  },
  {
    title: "Checkout Bottleneck During the Warehouse Sale at Cascade Home & Goods",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:116", description: "Calculate miscellaneous charges for retail sales" },
      { code: "SE:117", description: "Process retail sales documentation" },
      { code: "SE:152", description: "Accept checks from customers" },
      { code: "SE:153", description: "Operate register/terminal" },
      { code: "SE:329", description: "Process sales transactions (e.g., cash, credit, check)" },
    ],
    eventSituation: buildSituation({
      role: "a shift lead",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "During the recent warehouse clearance sale, checkout lines backed up toward the entrance, and a review found associates were unsure how to calculate mixed discounts and delivery fees together, and one associate had to call a manager over just to accept a personal check.",
      ask:
        "The store manager (judge) wants you to identify what specifically slowed checkout down and propose training so the next big sale doesn't repeat it.",
      location: "the front registers",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What's the fastest, most accurate way to calculate a mixed discount and delivery fee together?",
      "What should an associate know about accepting a check so they don't need a manager next time?",
    ],
  },
  {
    title: "A Customer's Complicated Request at Cascade Home & Goods",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:009", description: "Process special orders for retail sales" },
      { code: "SE:016", description: "Sell gift certificates" },
      { code: "SE:023", description: "Arrange delivery of purchases" },
      { code: "SE:162", description: "Process returns/exchanges" },
      { code: "SE:835", description: "Process retail telephone orders" },
    ],
    eventSituation: buildSituation({
      role: "a sales associate",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "A regular customer calls to special-order a dining set CASCADE doesn't have in the store's size, wants to use a gift certificate as partial payment, arrange delivery, and separately mentions she needs to return a lamp from last month without her receipt.",
      ask:
        "The store manager (judge) wants you to walk through how you'd handle this customer's full request accurately and without making her feel like a hassle.",
      location: "customer service",
      greetingAsk: "to hear how you'd handle this call",
    }),
    judgeQuestions: [
      "What information do you need before processing the special order?",
      "How would you verify the receipt-free return without making her feel distrusted?",
    ],
  },
  {
    title: "Losing Sales to Online Comparison Shoppers at Cascade Home & Goods",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:019", description: "Explain the use of brand names in selling" },
      { code: "SE:389", description: "Monitor on-floor selling activities" },
      { code: "SE:489", description: "Plan follow-up strategies for use in retail selling" },
      { code: "SE:874", description: "Convert customer/client objections into selling points" },
      { code: "SE:875", description: "Demonstrate suggestion selling" },
    ],
    eventSituation: buildSituation({
      role: "a sales associate",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "The store manager (judge) has noticed customers try out furniture in-store, seem interested, then say they'll \"check the price online\" and leave, and almost none of them are followed up with afterward.",
      ask:
        "The store manager (judge) wants you to develop a selling approach for handling the online-price objection in the moment and a follow-up plan for customers who leave without buying.",
      location: "the sales floor",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "How would you respond when a customer says they'll just check the price online?",
      "What would a realistic follow-up plan look like for someone who leaves without buying?",
    ],
  },
  {
    title: "Training New Hires on Closing the Sale at Cascade Home & Goods",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:887", description: "Pack and wrap purchases" },
      { code: "SE:895", description: "Close the sale" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
      { code: "SE:109", description: "Analyze product information to identify product features and benefits" },
    ],
    eventSituation: buildSituation({
      role: "a senior sales associate",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "CASCADE just hired three new seasonal associates, and the store manager (judge) wants them trained properly on closing a sale, wrapping fragile purchases correctly, and the store's actual selling policies, rather than learning it inconsistently from whoever's on shift.",
      ask:
        "The store manager (judge) wants you to put together a short training outline covering closing techniques, careful wrapping, and company policy for the new hires.",
      location: "the break room",
      greetingAsk: "to walk through your training outline",
    }),
    judgeQuestions: [
      "What's one thing a new associate needs to know about closing a sale confidently?",
      "What would you tell a new hire about building repeat clientele instead of one-time visits?",
    ],
  },
  {
    title: "Window Display Not Driving Traffic at Cascade Home & Goods",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:023", description: "Explain the use of visual merchandising in retailing" },
      { code: "PR:026", description: "Explain types of display arrangements" },
      { code: "PR:031", description: "Select and use display fixtures/forms" },
      { code: "PR:047", description: "Create displays" },
      { code: "PR:302", description: "Distinguish between visual merchandising and display" },
    ],
    eventSituation: buildSituation({
      role: "the visual merchandising associate",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "Foot traffic hasn't picked up since the new fall window display went up two weeks ago, even though CASCADE invested in new props and fixtures for it. The current window groups items loosely by color rather than telling a clear \"cozy fall home\" story.",
      ask:
        "The store manager (judge) wants you to propose a redesigned window concept that tells a clearer story and explain the difference between visual merchandising and a single display so the team is aligned going forward.",
      location: "the front window",
      greetingAsk: "to hear your concept",
    }),
    judgeQuestions: [
      "What story would your redesigned window tell, and why would it pull someone inside?",
      "How would you explain visual merchandising versus a display to a new hire?",
    ],
  },
  {
    title: "In-Store Displays Falling Apart Mid-Season at Cascade Home & Goods",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:052", description: "Maintain displays" },
      { code: "PR:054", description: "Dismantle/Store displays/display fixtures/forms" },
      { code: "PR:077", description: "Plan/Schedule displays/themes with management" },
      { code: "PR:349", description: "Read/Implement planograms" },
      { code: "PR:359", description: "Use lighting to highlight products" },
    ],
    eventSituation: buildSituation({
      role: "the visual merchandising associate",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "Midway through the current seasonal theme, a folded-linens display has collapsed, a decor vignette has drifted out of its planogram position, and a customer mentioned that the accent-lighting fixture over the tableware wall appears burnt out.",
      ask:
        "The store manager (judge) wants you to propose a maintenance routine for displays already on the floor and a better process for planning and storing display materials between themes.",
      location: "the sales floor",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "How often should displays be checked once they're set up, and for what?",
      "What would a better process for storing fixtures between themes look like?",
    ],
  },
  {
    title: "Weak Turnout for the Anniversary Sale at Cascade Home & Goods",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:068", description: "Prepare store/department for special event" },
      { code: "PR:109", description: "Create promotional signs" },
      { code: "PR:114", description: "Set up point-of-sale displays and handouts" },
      { code: "PR:209", description: "Develop promotional calendar" },
      { code: "PR:360", description: "Plan special events" },
    ],
    eventSituation: buildSituation({
      role: "the promotions associate",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "Last year's store anniversary sale drew a strong crowd, but this year's event had noticeably lighter turnout despite a similar budget. Signage went up the day before, point-of-sale handouts weren't ready until the morning of, and the event wasn't on the promotional calendar until a week out.",
      ask:
        "The store manager (judge) wants you to figure out what went wrong with this year's planning and put together a timeline for the next special event that gives it a real chance at strong turnout.",
      location: "the manager's office",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "How far in advance should signage and promotion for an event like this actually start?",
      "What belongs on a promotional calendar, and how far out should it be planned?",
    ],
  },
  {
    title: "Cross-Merchandising a New Product Line at Cascade Home & Goods",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:284", description: "Determine on-floor assortments" },
      { code: "PR:342", description: "Place merchandise for impact" },
      { code: "PR:346", description: "Proof ads" },
      { code: "PR:358", description: "Use cross-merchandising techniques" },
      { code: "PR:023", description: "Explain the use of visual merchandising in retailing" },
    ],
    eventSituation: buildSituation({
      role: "the visual merchandising associate",
      company: "CASCADE HOME & GOODS",
      judgeRole: "the store manager",
      problem:
        "CASCADE just added a new line of outdoor string lights, but they're shelved alone in the lighting aisle while patio furniture, a natural pairing, sits in a completely different part of the store, and the store manager (judge) suspects this is costing add-on sales.",
      ask:
        "The store manager (judge) wants you to propose an on-floor placement and cross-merchandising plan that pairs these products for more impact, and to double-check the upcoming circular ad reflects it accurately.",
      location: "the sales floor",
      greetingAsk: "to hear your placement plan",
    }),
    judgeQuestions: [
      "Where would you place these lights to actually drive add-on sales?",
      "What should you double-check on the ad proof before it goes out?",
    ],
  },
];

const RETAIL_EVENT: EventCaseStudySeed = {
  eventSlug: "retail-merchandising-series",
  eventName: "Retail Merchandising Series",
  careerCluster: "Marketing",
  careerPathway: "Merchandising",
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: RETAIL_CASES,
};

// ---------------------------------------------------------------------------
// principles-of-marketing (PRINCIPLES, Business Administration Core PIs)
// A first-year/entry-level event, so PIs are foundational business concepts
// (Core tier) rather than cluster-specific ones — see getPerformanceIndicators
// ForEvent's comment on why Principles events end up Core-only.
// ---------------------------------------------------------------------------
const POM_CASES: CaseStudySeed[] = [
  {
    title: "Explaining Why Marketing Matters at Junction Coffee & Goods",
    instructionalArea: "Marketing",
    performanceIndicators: [
      { code: "MK:001", description: "Explain marketing and its importance in a global economy" },
      { code: "MK:002", description: "Describe marketing functions and related activities" },
      { code: "MK:014", description: "Explain factors that influence customer/client/business buying behavior" },
      { code: "MK:019", description: "Describe connections between company actions and results (e.g., influencing consumer buying behavior, gaining market share, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "On your first day, the owner (judge) mentions that JUNCTION is thinking about spending more on marketing next quarter, but a family member who helps out at the shop said, \"we make good coffee, why do we need to market at all?\"",
      ask:
        "The owner (judge) wants you to explain, in simple terms, what marketing actually is and why it matters even for a small shop with loyal regulars.",
      location: "the shop's back counter",
      greetingAsk: "to hear how you'd explain this",
    }),
    judgeQuestions: [
      "How would you explain marketing to someone who thinks good products sell themselves?",
      "What's one factor that influences whether a new customer decides to walk in?",
    ],
  },
  {
    title: "Understanding Why Prices Change at Junction Coffee & Goods",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "EC:001", description: "Describe the concepts of economics and economic activities" },
      { code: "EC:002", description: "Distinguish between economic goods and services" },
      { code: "EC:003", description: "Explain the concept of economic resources" },
      { code: "EC:004", description: "Determine economic utilities created by business activities" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "A regular customer complained that a bag of coffee beans costs more than it did six months ago, and asked you to explain why, since the coffee itself \"tastes the same.\"",
      ask:
        "The owner (judge) wants you to be able to explain, using basic economic concepts, why the cost of resources affects what the shop has to charge.",
      location: "the front counter",
      greetingAsk: "to hear how you'd explain this to a customer",
    }),
    judgeQuestions: [
      "How would you explain to this customer why the price went up even though the product didn't change?",
      "What's the difference between the 'good' (the coffee bag) and the 'service' (making a latte) in terms of how they're priced?",
    ],
  },
  {
    title: "Setting a Fair Price for the New Pastry Case at Junction Coffee & Goods",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "EC:005", description: "Explain the principles of supply and demand" },
      { code: "EC:006", description: "Describe the functions of prices in markets" },
      { code: "EC:009", description: "Explain the concept of private enterprise" },
      { code: "EC:010", description: "Identify factors affecting a business's profit" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "JUNCTION just added a pastry case with items from a local bakery, and the owner (judge) is deciding how to price them, wanting a price that covers costs and earns a fair profit without scaring off customers who are used to a cheaper shop down the street.",
      ask:
        "The owner (judge) wants you to explain the basic economic factors that should guide this pricing decision.",
      location: "the shop's back counter",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What role does supply and demand play in pricing these pastries?",
      "What factors besides the cost of the pastry itself affect our profit here?",
    ],
  },
  {
    title: "Weighing the Risk of Staying Open Late at Junction Coffee & Goods",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "EC:011", description: "Determine factors affecting business risk" },
      { code: "EC:012", description: "Explain the concept of competition" },
      { code: "EC:013", description: "Explain the concept of productivity" },
      { code: "EC:018", description: "Determine the impact of business cycles on business activities" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "A new café opened nearby with extended evening hours, and the owner (judge) is weighing whether JUNCTION should stay open later too, worried about the added labor cost if evening traffic doesn't actually show up.",
      ask:
        "The owner (judge) wants you to walk through the business risk and competitive factors involved in this decision.",
      location: "the shop's back counter",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What's the actual business risk in staying open later?",
      "How does the new competitor's move change what we should consider here?",
    ],
  },
  {
    title: "Explaining the Shop's Role in the Neighborhood at Junction Coffee & Goods",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "EC:070", description: "Explain the role of business in society" },
      { code: "EC:071", description: "Describe types of business activities" },
      { code: "EC:072", description: "Describe the nature of taxes" },
      { code: "EC:106", description: "Explain the nature of business ethics" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "A local high schooler doing a class project asked to interview someone at JUNCTION about \"what a small business actually does for the neighborhood,\" and the owner (judge) is busy and asked you to handle the interview.",
      ask:
        "The owner (judge) wants you to be ready to explain the shop's role in the community, its basic obligations like taxes, and why doing business ethically matters.",
      location: "the shop's back counter",
      greetingAsk: "to hear how you'd answer this student",
    }),
    judgeQuestions: [
      "How would you explain this shop's role in the neighborhood to a student?",
      "Why does acting ethically matter for a small business like ours?",
    ],
  },
  {
    title: "Reading This Month's Sales Dip at Junction Coffee & Goods",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "EC:081", description: "Discuss the measure of consumer spending as an economic indicator" },
      { code: "EC:082", description: "Discuss the impact of a nation's unemployment rates" },
      { code: "EC:083", description: "Describe the economic impact of inflation on business" },
      { code: "EC:084", description: "Explain the economic impact of interest-rate fluctuations" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "Sales at JUNCTION dipped noticeably this month, and the owner (judge) has heard on the news about rising prices and interest rates but isn't sure how those bigger economic trends connect to fewer people buying a $5 latte.",
      ask:
        "The owner (judge) wants you to explain how these broader economic conditions could realistically be affecting a small shop like this one.",
      location: "the shop's back counter",
      greetingAsk: "to hear your read on this",
    }),
    judgeQuestions: [
      "How might inflation be affecting customers' decisions to buy a daily coffee?",
      "What would you watch for to know if this dip is part of a bigger trend?",
    ],
  },
  {
    title: "A Customer's Order Gets Botched at Junction Coffee & Goods",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:001", description: "Identify company's brand promise" },
      { code: "CR:002", description: "Determine ways of reinforcing the company's image through employee performance" },
      { code: "CR:003", description: "Explain the nature of positive customer relations" },
      { code: "CR:004", description: "Demonstrate a customer service mindset" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "A customer's order came out completely wrong during the morning rush, and she's visibly frustrated at the counter, saying this is the second time it's happened, right as the owner (judge) walks by.",
      ask:
        "The owner (judge) wants you to handle this in a way that reflects what JUNCTION actually promises its customers.",
      location: "the front counter",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What does 'the company's brand promise' actually mean in a moment like this?",
      "How does one employee's handling of this moment affect the shop's overall image?",
    ],
  },
  {
    title: "A Regular Complains About a Policy at Junction Coffee & Goods",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:005", description: "Reinforce service orientation through communication" },
      { code: "CR:006", description: "Respond to customer inquiries" },
      { code: "CR:007", description: "Interpret business policies to customers/clients" },
      { code: "CR:009", description: "Handle difficult customers" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "A longtime regular is upset that JUNCTION recently stopped accepting a discontinued loyalty punch card and is arguing loudly with another employee at the register about it.",
      ask:
        "The owner (judge) wants you to explain how you'd step in, explain the policy clearly, and keep this from turning into a bigger scene.",
      location: "the front counter",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "How would you explain this policy change in a way that doesn't feel dismissive?",
      "What would you do differently for a longtime regular versus a first-time customer in this situation?",
    ],
  },
  {
    title: "Handling a Complaint Left Online at Junction Coffee & Goods",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:010", description: "Handle customer/client complaints" },
      { code: "CR:016", description: "Discuss the nature of customer relationship management" },
      { code: "CR:017", description: "Explain the role of ethics in customer relationship management" },
      { code: "CR:018", description: "Describe the use of technology in customer relationship management" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "A customer left a harsh one-star review online claiming an employee was rude, and the owner (judge) doesn't know whether it's accurate but wants a thoughtful response posted before it sits unanswered any longer.",
      ask:
        "The owner (judge) wants you to draft a response and explain how a shop like ours should generally manage customer relationships online.",
      location: "the shop's back counter",
      greetingAsk: "to hear how you'd respond to this",
    }),
    judgeQuestions: [
      "What's the ethical way to respond to a complaint when you don't know if it's fully accurate?",
      "How can technology help us manage customer relationships better going forward?",
    ],
  },
  {
    title: "A Non-English-Speaking Customer at Junction Coffee & Goods",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:019", description: "Adapt communication to the cultural and social differences among clients" },
      { code: "CR:029", description: "Develop rapport with customers" },
      { code: "CR:030", description: "Build and maintain relationships with customers" },
      { code: "CR:003", description: "Explain the nature of positive customer relations" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "A customer who speaks limited English is struggling to order, and the line behind her is growing, while another employee seems to be getting impatient with the back-and-forth.",
      ask:
        "The owner (judge) wants you to explain how you'd handle this interaction warmly and effectively despite the language gap, and how it fits into building repeat customers.",
      location: "the front counter",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What would you actually do in the moment to help this customer order comfortably?",
      "How does handling a moment like this well help build a repeat customer?",
    ],
  },
  {
    title: "A Customer Wants a Refund the Shop Doesn't Normally Give at Junction Coffee & Goods",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:016", description: "Discuss the nature of customer relationship management" },
      { code: "CR:017", description: "Explain the role of ethics in customer relationship management" },
      { code: "CR:029", description: "Develop rapport with customers" },
      { code: "CR:009", description: "Handle difficult customers" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "A customer wants a full refund on a bag of coffee beans she opened and didn't like, which is outside JUNCTION's usual policy of exchanges only on opened food items, and she's getting increasingly frustrated at the counter.",
      ask:
        "The owner (judge) wants you to explain how you'd handle this respectfully while staying fair and consistent with other customers.",
      location: "the front counter",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "How do you stay fair to this customer without abandoning our policy for everyone else?",
      "What would you say to de-escalate her frustration in the moment?",
    ],
  },
  {
    title: "Writing the New Employee Handbook Section at Junction Coffee & Goods",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:014", description: "Explain the nature of staff communication" },
      { code: "CO:016", description: "Explain the nature of effective written communications" },
      { code: "CO:017", description: "Demonstrate active listening skills" },
      { code: "CO:025", description: "Make oral presentations" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "The owner (judge) wants to add a short customer-service section to the shop's employee handbook but has been putting it off, and the current handbook is just a list of rules with no guidance on how staff should actually talk to customers or each other.",
      ask:
        "The owner (judge) wants you to draft this section and be ready to walk the team through it at the next staff meeting.",
      location: "the shop's back counter",
      greetingAsk: "to hear your draft",
    }),
    judgeQuestions: [
      "What makes written communication in a handbook actually effective versus just a list of rules?",
      "How would you present this section at a staff meeting so people actually listen?",
    ],
  },
  {
    title: "Persuading the Owner to Try a New Idea at Junction Coffee & Goods",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:031", description: "Write persuasive messages" },
      { code: "CO:039", description: "Write informational messages" },
      { code: "CO:040", description: "Write inquiries" },
      { code: "CO:053", description: "Participate in group discussions" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "You think JUNCTION should try a weekly rotating specialty drink, but the owner (judge) has been hesitant about adding complexity, and the topic is coming up at this week's staff meeting where everyone will weigh in.",
      ask:
        "The owner (judge) wants you to make the case for this idea persuasively, both in writing beforehand and out loud in the meeting.",
      location: "the break room",
      greetingAsk: "to hear your pitch for this idea",
    }),
    judgeQuestions: [
      "What makes this message persuasive rather than just informational?",
      "How would you handle it if another employee pushes back on your idea in the meeting?",
    ],
  },
  {
    title: "Researching a Supplier Before Switching at Junction Coffee & Goods",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:054", description: "Identify sources that provide relevant, valid written material" },
      { code: "CO:055", description: "Extract relevant information from written materials" },
      { code: "CO:056", description: "Apply written directions to achieve tasks" },
      { code: "CO:058", description: "Ask relevant questions" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "The owner (judge) is considering a new milk supplier and handed you a stack of the supplier's spec sheets and a sample contract, asking you to review them and flag anything important before a decision is made.",
      ask:
        "The owner (judge) wants you to walk through what you found in these materials and what questions still need to be asked before switching.",
      location: "the shop's back counter",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What's the most important thing you pulled from these materials?",
      "What questions would you still want answered before we switch suppliers?",
    ],
  },
  {
    title: "Coaching a Discouraged Coworker at Junction Coffee & Goods",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:082", description: "Explain communication techniques that support and encourage a speaker" },
      { code: "CO:083", description: "Give verbal directions" },
      { code: "CO:084", description: "Employ communication styles appropriate to target audience" },
      { code: "CO:090", description: "Write professional emails" },
    ],
    eventSituation: buildSituation({
      role: "a senior part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "A newer coworker made a mistake on the register in front of a full line and has seemed discouraged and hesitant ever since, and the owner (judge) has asked you to help them get back on track before their next shift.",
      ask:
        "The owner (judge) wants you to explain how you'd talk to this coworker supportively and also draft a short follow-up email confirming what was discussed.",
      location: "the break room",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What communication approach would actually encourage this coworker rather than embarrass them further?",
      "What would you include in a follow-up email after this conversation?",
    ],
  },
  {
    title: "Handling an Angry Phone Call at Junction Coffee & Goods",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:114", description: "Handle phone calls in a businesslike manner" },
      { code: "CO:119", description: "Follow oral directions" },
      { code: "CO:133", description: "Write business letters" },
      { code: "CO:147", description: "Explain the nature of effective verbal communications" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "A catering customer calls upset that a large order was delivered an hour late to her office event, and the owner (judge), currently helping a customer, quickly tells you to \"just handle it\" before stepping away.",
      ask:
        "The owner (judge) wants you to handle this call professionally and be ready to follow up with a written apology afterward.",
      location: "the shop's back counter",
      greetingAsk: "to hear how the call went",
    }),
    judgeQuestions: [
      "What does handling this call 'in a businesslike manner' actually look like here?",
      "What would you include in a follow-up written apology to this customer?",
    ],
  },
  {
    title: "Deciding If This Job Is Right for You at Junction Coffee & Goods",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:002", description: "Maintain appropriate personal appearance" },
      { code: "PD:009", description: "Demonstrate systematic behavior" },
      { code: "PD:013", description: "Assess personal interests and skills needed for success in business" },
      { code: "PD:017", description: "Make decisions" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "Three weeks into the job, the owner (judge) checks in to see how things are going and asks directly whether you think this kind of customer-facing retail work is actually a good fit for you long-term.",
      ask:
        "The owner (judge) wants an honest, thoughtful answer about your fit for this kind of work and what you've noticed about what it takes to succeed here.",
      location: "the shop's back counter",
      greetingAsk: "to hear your honest reflection",
    }),
    judgeQuestions: [
      "What skills have you noticed matter most for succeeding in a job like this?",
      "How are you deciding whether this type of work is a good long-term fit for you?",
    ],
  },
  {
    title: "Balancing School and Shifts at Junction Coffee & Goods",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:018", description: "Set personal goals" },
      { code: "PD:019", description: "Use time-management skills" },
      { code: "PD:020", description: "Analyze employer expectations in the business environment" },
      { code: "PD:021", description: "Explain the rights of workers" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "You're a full-time student balancing shifts at JUNCTION, and the owner (judge) has noticed you seem stretched thin lately and wants to talk through a schedule that works for both the shop's needs and your own.",
      ask:
        "The owner (judge) wants you to talk through your goals and how you'd manage your time, and to understand what's reasonable to expect from each other as employer and employee.",
      location: "the shop's back counter",
      greetingAsk: "to talk through your schedule",
    }),
    judgeQuestions: [
      "What time-management approach would help you balance school and shifts better?",
      "What do you think is a fair expectation for each of us in this working relationship?",
    ],
  },
  {
    title: "Applying for a Shift-Lead Promotion at Junction Coffee & Goods",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:026", description: "Utilize job-search strategies" },
      { code: "PD:027", description: "Complete a job application" },
      { code: "PD:028", description: "Interview for a job" },
      { code: "PD:031", description: "Prepare a resume" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "JUNCTION is promoting one employee to shift lead, and the owner (judge) wants applicants to actually go through a short internal application and interview process rather than just picking someone informally.",
      ask:
        "The owner (judge) wants you to walk through how you prepared for this internal application and interview, including how you'd present your experience.",
      location: "the shop's back counter",
      greetingAsk: "to hear how you approached this application",
    }),
    judgeQuestions: [
      "How did you decide what to highlight from your time here on your application?",
      "What would you say if asked why you're the right fit for this promotion?",
    ],
  },
  {
    title: "Thinking About What's Next After This Job at Junction Coffee & Goods",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:033", description: "Explain the need for ongoing education as a worker" },
      { code: "PD:034", description: "Explain possible advancement patterns for jobs" },
      { code: "PD:035", description: "Identify skills needed to enhance career progression" },
      { code: "PD:077", description: "Demonstrate problem-solving skills" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "JUNCTION COFFEE & GOODS",
      judgeRole: "the owner",
      problem:
        "During a slow afternoon, the owner (judge) asks what you're hoping to do after this job, since JUNCTION has had a few former employees move on to bigger roles in retail and food service management.",
      ask:
        "The owner (judge) wants you to talk through what skills you're building here that could help you advance, and how you're thinking about ongoing learning.",
      location: "the shop's back counter",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What skills from this job do you think would transfer to a bigger role somewhere else?",
      "How are you thinking about continuing to learn and grow from here?",
    ],
  },
];

const POM_EVENT: EventCaseStudySeed = {
  eventSlug: "principles-of-marketing",
  eventName: "Principles of Marketing",
  careerCluster: "Marketing",
  careerPathway: null,
  format: "PRINCIPLES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: POM_CASES,
};

// ---------------------------------------------------------------------------
// buying-and-merchandising-team-decision-making (TDM, shared 83-PI pool)
// ---------------------------------------------------------------------------
const BMTDM_CASES: CaseStudySeed[] = [
  {
    title: "A New Vendor Wants an Exclusive Deal at Willow Creek Retail Group",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "A growing home-goods vendor has offered WILLOW CREEK exclusive regional distribution rights in exchange for a large upfront purchase commitment, and the vice president of merchandising (judge) wants your team's read on this channel relationship before signing anything.",
      ask:
        "The vice president (judge) wants your team to explain how this kind of channel relationship works and recommend whether to accept the exclusivity terms, flagging any legal or ethical concerns.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What's the risk of committing to exclusivity with a vendor this size?",
      "What should we check legally before agreeing to these terms?",
    ],
  },
  {
    title: "Coordinating a New Online Marketplace Channel at Willow Creek Retail Group",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "WILLOW CREEK is considering listing select products on a major online marketplace, which would mean a new kind of channel relationship alongside its physical stores, and the vice president of merchandising (judge) worries this could create pricing conflicts between the two.",
      ask:
        "The vice president (judge) wants your team to explain how this new channel should be coordinated with existing store operations without creating conflict.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "How would you prevent pricing conflicts between our stores and this marketplace?",
      "What ethical or legal issue should we watch for in this kind of channel relationship?",
    ],
  },
  {
    title: "A Regional Distributor Relationship Is Fraying at Willow Creek Retail Group",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "WILLOW CREEK's longtime regional distributor has started missing delivery windows since being acquired by a larger company, and the vice president of merchandising (judge) isn't sure whether to push for better terms, diversify to a second distributor, or end the relationship.",
      ask:
        "The vice president (judge) wants your team to weigh in on how to handle this channel-member relationship going forward.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would you try first before ending this distributor relationship entirely?",
      "What's the risk of adding a second distributor alongside this one?",
    ],
  },
  {
    title: "Building Next Quarter's Market Plan at Willow Creek Retail Group",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "MP:006", description: "Explain the nature of marketing planning" },
      { code: "MP:007", description: "Explain the nature of marketing plans" },
      { code: "MP:008", description: "Explain the role of situation analysis in the marketing planning process" },
      { code: "MP:013", description: "Explain the nature of sales forecasts" },
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "The vice president of merchandising (judge) needs a marketing plan for next quarter but has only a rough sales forecast and no real situation analysis of where WILLOW CREEK stands against competitors right now.",
      ask:
        "The vice president (judge) wants your team to walk through a situation analysis and build out the core of a marketing plan grounded in it.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What belongs in a situation analysis that this forecast alone doesn't tell us?",
      "How confident should we be in a sales forecast built without that analysis?",
    ],
  },
  {
    title: "Identifying a New Target Market at Willow Creek Retail Group",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "MP:006", description: "Explain the nature of marketing planning" },
      { code: "MP:007", description: "Explain the nature of marketing plans" },
      { code: "MP:008", description: "Explain the role of situation analysis in the marketing planning process" },
      { code: "MP:013", description: "Explain the nature of sales forecasts" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "A nearby university has doubled its enrollment in five years, and the vice president of merchandising (judge) wonders whether WILLOW CREEK should specifically target this growing student population, but has no real market identification work done yet.",
      ask:
        "The vice president (judge) wants your team to identify whether this is a viable target market and outline what research would confirm it.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would you need to confirm before committing resources to this new target market?",
      "How would you identify this market's specific needs versus our current customers?",
    ],
  },
  {
    title: "Forecasting Sales for a Store Relocation at Willow Creek Retail Group",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "MP:006", description: "Explain the nature of marketing planning" },
      { code: "MP:007", description: "Explain the nature of marketing plans" },
      { code: "MP:008", description: "Explain the role of situation analysis in the marketing planning process" },
      { code: "MP:013", description: "Explain the nature of sales forecasts" },
      { code: "IM:012", description: "Describe the need for marketing data" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "WILLOW CREEK is considering relocating its weakest-performing store to a busier shopping center a mile away, and the vice president of merchandising (judge) needs a sales forecast for the new site before the lease decision is finalized next week.",
      ask:
        "The vice president (judge) wants your team to outline how you'd build a credible sales forecast for this relocation and what data it depends on.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your forecasting approach",
    }),
    judgeQuestions: [
      "What data would this forecast absolutely need to be credible?",
      "What risk should we flag to leadership if that data isn't available before the deadline?",
    ],
  },
  {
    title: "Pricing a New Private-Label Line at Willow Creek Retail Group",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "WILLOW CREEK's first private-label product line launches next month, and the vice president of merchandising (judge) needs a pricing strategy that positions it as a genuine value next to name brands without looking cheap or low-quality.",
      ask:
        "The vice president (judge) wants your team to recommend a pricing approach and explain how it fits into the broader product mix.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your pricing recommendation",
    }),
    judgeQuestions: [
      "How do we price this so it reads as good value, not just cheap?",
      "What legal or ethical consideration matters most in pricing a private-label line?",
    ],
  },
  {
    title: "Responding to a Competitor's Price War at Willow Creek Retail Group",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "A big-box competitor just launched an aggressive discount campaign on the same product categories WILLOW CREEK relies on most, and the vice president of merchandising (judge) is under pressure from ownership to respond immediately with matching discounts.",
      ask:
        "The vice president (judge) wants your team to recommend a pricing and promotional response that protects margins rather than racing to the bottom.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "Why might matching this competitor's discounts hurt us more than it helps?",
      "What promotional response would you pair with your pricing recommendation?",
    ],
  },
  {
    title: "A Vague New Ad Campaign at Willow Creek Retail Group",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:014", description: "Explain the components of advertisements" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
      { code: "PR:099", description: "Describe the use of business ethics in promotion" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "WILLOW CREEK's latest ad campaign generated impressions but almost no foot traffic increase, and the vice president of merchandising (judge) suspects the ad never clearly stated what's actually on sale or why customers should visit this week specifically.",
      ask:
        "The vice president (judge) wants your team to identify what's missing from the current campaign and recommend a clearer promotional mix.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What's missing from this campaign that would actually drive a store visit?",
      "Which direct-marketing channel would you add to reach existing customers directly?",
    ],
  },
  {
    title: "A Confusing In-Store Sales Promotion at Willow Creek Retail Group",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:100", description: "Describe the use of technology in the promotion function" },
      { code: "PR:101", description: "Describe the regulation of promotion" },
      { code: "PR:247", description: "Describe word-of-mouth channels used to communicate with targeted audiences" },
      { code: "PR:249", description: "Identify communications channels used in sales promotion" },
      { code: "PR:250", description: "Explain communications channels used in public-relations activities" },
      { code: "PR:251", description: "Explain the importance of coordinating elements in advertisements" },
      { code: "PR:252", description: "Identify types of public-relations activities" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "A \"buy more, save more\" in-store promotion has confused customers at checkout because the signage, the app, and the register system each describe the discount tiers slightly differently, and a customer's complaint about it is already circulating online.",
      ask:
        "The vice president of merchandising (judge) wants your team to identify the source of the confusion, check it against promotion regulation, and recommend a PR response to the complaint.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear what your team found",
    }),
    judgeQuestions: [
      "Where exactly is this promotion's messaging breaking down?",
      "What PR response would you recommend for the complaint already circulating?",
    ],
  },
  {
    title: "Deciding Whether to Sponsor a Local Festival at Willow Creek Retail Group",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:253", description: "Discuss internal and external audiences for public-relations activities" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:014", description: "Explain the components of advertisements" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
      { code: "PR:099", description: "Describe the use of business ethics in promotion" },
      { code: "PR:100", description: "Describe the use of technology in the promotion function" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "A local community festival has offered WILLOW CREEK a sponsorship package, and the vice president of merchandising (judge) is deciding whether it's worth the cost compared to putting that budget into direct advertising instead.",
      ask:
        "The vice president (judge) wants your team to weigh the sponsorship against direct promotion options and recommend where the budget should go.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What audiences would this sponsorship actually reach that direct advertising wouldn't?",
      "How would you measure whether this sponsorship was worth the cost afterward?",
    ],
  },
  {
    title: "No Real Data Behind the Last Product Launch at Willow Creek Retail Group",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "IM:025", description: "Explain the role of ethics in marketing-information management" },
      { code: "IM:062", description: "Explain techniques for processing marketing data" },
      { code: "IM:183", description: "Describe the use of technology in the marketing-information management function" },
      { code: "IM:184", description: "Identify data monitored for marketing decision making" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "A new outdoor-living product line launched last quarter based on the vice president's (judge's) instinct and is underperforming badly, while customers keep asking store staff informally about a category WILLOW CREEK doesn't carry at all.",
      ask:
        "The vice president (judge) wants your team to explain what a proper marketing-information process would have caught and propose one for future launches.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What data should have been gathered before this launch?",
      "What ethical guardrail should guide how we collect this kind of data going forward?",
    ],
  },
  {
    title: "Designing Research Before a Store Remodel at Willow Creek Retail Group",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:191", description: "Explain the use of descriptive statistics in marketing decision making" },
      { code: "IM:281", description: "Describe options businesses use to obtain marketing research data (i.e., primary and secondary research)" },
      { code: "IM:282", description: "Discuss the nature of marketing research problems/issues" },
      { code: "IM:284", description: "Describe methods used to design marketing research studies (i.e., descriptive, exploratory, and causal)" },
      { code: "IM:285", description: "Discuss the nature of sampling plans (i.e., who, how many, how chosen)" },
      { code: "IM:289", description: "Describe data-collection methods (e.g., observations, mail, diaries, phone, internet, discussion groups, interviews, scanners, tracking tools)" },
      { code: "IM:292", description: "Identify sources of error in a research project (e.g., response errors, interviewer errors, non-response errors, sample design)" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "Leadership is considering a major layout remodel across all stores, a costly and disruptive project, and the vice president of merchandising (judge) wants real research behind the decision rather than copying what a competitor recently did.",
      ask:
        "The vice president (judge) wants your team to design a research study, including sampling and data collection, that would validate whether this remodel is worth the investment.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your research design",
    }),
    judgeQuestions: [
      "Why is copying a competitor's remodel risky without our own research?",
      "Who should we sample to get a reliable answer on this?",
    ],
  },
  {
    title: "A Flawed Customer-Loyalty Survey at Willow Creek Retail Group",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:293", description: "Evaluate questionnaire design (e.g., types of questions, question wording, routing, sequencing, length, layout)" },
      { code: "IM:418", description: "Explain characteristics of effective data-collection instruments" },
      { code: "IM:419", description: "Describe the regulation of marketing-information management" },
      { code: "IM:428", description: "Assess appropriateness of marketing research for the problem/issue (e.g., research methods, sources of information, timeliness of information, etc.)" },
      { code: "IM:469", description: "Monitor/measure customer “buzz”" },
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "WILLOW CREEK's new loyalty-program survey has a response rate under 5%, and the vice president of merchandising (judge) suspects the survey's length and confusing question order are driving members away before they finish it.",
      ask:
        "The vice president (judge) wants your team to evaluate the survey's design and propose a version members will actually complete.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear what your team found",
    }),
    judgeQuestions: [
      "What about this survey's design is likely causing such a low response rate?",
      "What would you change first to raise completion?",
    ],
  },
  {
    title: "Deciding on a New Housewares Product Line at Willow Creek Retail Group",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:017", description: "Identify consumer protection provisions of appropriate agencies" },
      { code: "PM:019", description: "Describe the uses of grades and standards in marketing" },
      { code: "PM:020", description: "Explain warranties and guarantees" },
      { code: "PM:021", description: "Explain the nature of product/service branding" },
      { code: "PM:024", description: "Identify the impact of product life cycles on marketing decisions" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "A vendor has pitched a new line of smart kitchen gadgets, and the vice president of merchandising (judge) needs to know how it fits WILLOW CREEK's existing product mix, what warranty terms make sense for electronics, and whether the products meet the right safety standards.",
      ask:
        "The vice president (judge) wants your team to evaluate this line against the product mix and recommend warranty and compliance terms before committing to carry it.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "How does this new line fit, or not fit, our existing product mix?",
      "What warranty terms make sense for electronics like these?",
    ],
  },
  {
    title: "Generating Ideas for a Private-Label Refresh at Willow Creek Retail Group",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:039", description: "Describe the use of technology in the product/service management function" },
      { code: "PM:040", description: "Explain business ethics in product/service management" },
      { code: "PM:041", description: "Describe the nature of product bundling" },
      { code: "PM:042", description: "Describe factors used by marketers to position products/services" },
      { code: "PM:127", description: "Identify methods/techniques to generate a product idea" },
      { code: "PM:128", description: "Generate product ideas" },
      { code: "PM:134", description: "Identify product opportunities" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "WILLOW CREEK's five-year-old private-label brand feels stale next to newer store brands at competitors, and the vice president of merchandising (judge) wants fresh product and bundling ideas before the next planning cycle.",
      ask:
        "The vice president (judge) wants your team to generate and position new product ideas for this refresh, including any bundling opportunities.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's ideas",
    }),
    judgeQuestions: [
      "What's one fresh product idea you'd bring to this refresh, and why?",
      "How would you position it against newer competitor store brands?",
    ],
  },
  {
    title: "Repositioning the Corporate Brand After Negative Press at Willow Creek Retail Group",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:206", description: "Explain the nature of corporate branding" },
      { code: "PM:207", description: "Describe factors used by businesses to position corporate brands" },
      { code: "PM:276", description: "Describe the role of customer voice in branding" },
      { code: "PM:277", description: "Identify customer touch points" },
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:017", description: "Identify consumer protection provisions of appropriate agencies" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "A regional news story about a supplier's labor practices has put WILLOW CREEK's brand under scrutiny even though the company wasn't directly involved, and the vice president of merchandising (judge) wants to get ahead of any customer concern.",
      ask:
        "The vice president (judge) wants your team to propose how to reposition the brand around trust and identify the customer touch points where that message needs to show up.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What's the first message we should get in front of customers here?",
      "Which customer touch point matters most for rebuilding trust right now?",
    ],
  },
  {
    title: "Sales Associates Struggling to Answer Product Questions at Willow Creek Retail Group",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
      { code: "SE:106", description: "Explain legal and ethical considerations in selling" },
      { code: "SE:107", description: "Describe the use of technology in the selling function" },
      { code: "SE:109", description: "Analyze product information to identify product features and benefits" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "Customer surveys show shoppers frequently leave without buying because associates can't answer basic questions about new product features, and the vice president of merchandising (judge) traces it back to how little product information actually reaches the floor before a launch.",
      ask:
        "The vice president (judge) wants your team to propose how product information should flow to sales associates so they can sell new items confidently and accurately.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What should change about how product information reaches associates before launch?",
      "What ethical or legal line should associates be careful not to cross when unsure about a product?",
    ],
  },
  {
    title: "Building Repeat Clientele Through Better Selling Policy at Willow Creek Retail Group",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:359", description: "Discuss motivational theories that impact buying behavior" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
    ],
    eventSituation: buildSituation({
      role: "the buying and merchandising co-managers",
      company: "WILLOW CREEK RETAIL GROUP",
      judgeRole: "the vice president of merchandising",
      problem:
        "WILLOW CREEK's customer data shows most shoppers only ever visit once, and the vice president of merchandising (judge) wants to understand what's motivating buying decisions and build a selling approach that actually creates repeat customers.",
      ask:
        "The vice president (judge) wants your team to explain the motivational factors at play and propose a selling policy focused on building lasting clientele.",
      location: "the merchandising department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What's motivating a one-time shopper not to come back?",
      "What would you build into our selling policy to encourage repeat visits?",
    ],
  },
];

BMTDM_CASES.push({
  title: "Legal and Ethical Selling Boundaries for a New Loyalty App at Willow Creek Retail Group",
  instructionalArea: "Selling",
  performanceIndicators: [
    { code: "SE:106", description: "Explain legal and ethical considerations in selling" },
    { code: "SE:107", description: "Describe the use of technology in the selling function" },
    { code: "SE:109", description: "Analyze product information to identify product features and benefits" },
    { code: "SE:017", description: "Explain the nature and scope of the selling function" },
    { code: "SE:048", description: "Explain the selling process" },
    { code: "SE:062", description: "Acquire product information for use in selling" },
    { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
  ],
  eventSituation: buildSituation({
    role: "the buying and merchandising co-managers",
    company: "WILLOW CREEK RETAIL GROUP",
    judgeRole: "the vice president of merchandising",
    problem:
      "WILLOW CREEK is rolling out a new loyalty app that collects purchase history to recommend products, and the vice president of merchandising (judge) wants sales associates trained to sell its benefits to customers without overstating what the data is used for.",
    ask:
      "The vice president (judge) wants your team to outline how associates should sell this app's value honestly and within legal and ethical bounds.",
    location: "the merchandising department conference room",
    greetingAsk: "to hear your team's training outline",
  }),
  judgeQuestions: [
    "What should associates avoid overstating when selling this app to customers?",
    "How would you explain this app's real benefit to a skeptical customer?",
  ],
});

const BMTDM_EVENT: EventCaseStudySeed = {
  eventSlug: "buying-and-merchandising-team-decision-making",
  eventName: "Buying and Merchandising Team Decision Making",
  careerCluster: "Marketing",
  careerPathway: null,
  format: "TEAM_DECISION_MAKING",
  prepMinutes: 30,
  presentMinutes: 15,
  cases: BMTDM_CASES,
};

// ---------------------------------------------------------------------------
// marketing-management-team-decision-making (TDM, shared 83-PI pool)
// ---------------------------------------------------------------------------
const MMTDM_CASES: CaseStudySeed[] = [
  {
    title: "A Retailer Wants Exclusive Distribution at Fenwick Consumer Brands",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "A large national retailer wants exclusive rights to sell FENWICK's newest skincare line for its first year, offering major shelf placement in exchange, and the vice president of marketing (judge) wants your team's read on this channel relationship before responding.",
      ask:
        "The vice president (judge) wants your team to explain how this kind of channel relationship works and recommend whether to accept exclusivity, flagging legal or ethical concerns.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What do we give up by agreeing to exclusivity with one retailer?",
      "What should we check legally before agreeing to these terms?",
    ],
  },
  {
    title: "Coordinating a Direct-to-Consumer Channel at Fenwick Consumer Brands",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "FENWICK is launching a direct-to-consumer website alongside its existing retail partnerships, and the vice president of marketing (judge) is worried retail partners will see the new channel as competition rather than a complement.",
      ask:
        "The vice president (judge) wants your team to propose how to coordinate this new channel with existing retail relationships without alienating partners.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "How would you reassure retail partners this new channel isn't competing with them?",
      "What technology consideration matters most in launching this direct channel?",
    ],
  },
  {
    title: "A Key Retail Partner Relationship Is Strained at Fenwick Consumer Brands",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "FENWICK's largest retail partner is upset that a competitor got a product launch a week earlier, and is threatening to reduce FENWICK's shelf space in retaliation, right before the busy holiday season.",
      ask:
        "The vice president (judge) wants your team to recommend how to repair this channel-member relationship before the holiday season begins.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would you offer this partner to repair the relationship without setting a bad precedent?",
      "How do we prevent this kind of conflict with future product launches?",
    ],
  },
  {
    title: "Planning the Launch Market for a New Product Line at Fenwick Consumer Brands",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "MP:006", description: "Explain the nature of marketing planning" },
      { code: "MP:007", description: "Explain the nature of marketing plans" },
      { code: "MP:008", description: "Explain the role of situation analysis in the marketing planning process" },
      { code: "MP:013", description: "Explain the nature of sales forecasts" },
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "FENWICK's new men's grooming line is ready to launch, but the vice president of marketing (judge) has no situation analysis identifying which regional markets to prioritize first with a limited launch budget.",
      ask:
        "The vice president (judge) wants your team to build a launch market plan, including a situation analysis and sales forecast, to guide where the budget goes first.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "How would you decide which markets to prioritize with a limited launch budget?",
      "What would this situation analysis need to include to be credible?",
    ],
  },
  {
    title: "Reaching a New Generation of Customers at Fenwick Consumer Brands",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "MP:006", description: "Explain the nature of marketing planning" },
      { code: "MP:007", description: "Explain the nature of marketing plans" },
      { code: "MP:008", description: "Explain the role of situation analysis in the marketing planning process" },
      { code: "MP:013", description: "Explain the nature of sales forecasts" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "FENWICK's core customer base is aging, and the vice president of marketing (judge) knows the brand needs to reach a younger generation of shoppers but has no real identification of what that market actually wants from the brand.",
      ask:
        "The vice president (judge) wants your team to identify this new target market and outline what research would confirm the right approach.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would you need to learn about this younger market before changing our strategy?",
      "What's the risk of chasing a new market too aggressively and losing our core customers?",
    ],
  },
  {
    title: "Forecasting Demand for a Limited-Edition Release at Fenwick Consumer Brands",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "MP:006", description: "Explain the nature of marketing planning" },
      { code: "MP:007", description: "Explain the nature of marketing plans" },
      { code: "MP:008", description: "Explain the role of situation analysis in the marketing planning process" },
      { code: "MP:013", description: "Explain the nature of sales forecasts" },
      { code: "IM:012", description: "Describe the need for marketing data" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "FENWICK is planning a limited-edition holiday collection, and manufacturing needs a firm production number in two weeks, but the vice president of marketing (judge) has no forecast yet and is worried about either running out fast or getting stuck with leftover inventory.",
      ask:
        "The vice president (judge) wants your team to outline how you'd build a credible demand forecast for this limited release under a tight deadline.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your forecasting approach",
    }),
    judgeQuestions: [
      "What data would you lean on most for a forecast this time-sensitive?",
      "How would you build in a safety margin without over-committing to inventory?",
    ],
  },
  {
    title: "Pricing the Premium Line Extension at Fenwick Consumer Brands",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "FENWICK is launching a premium version of its bestselling lotion at nearly triple the price, and the vice president of marketing (judge) is worried customers will see it as the same product with a markup rather than a genuinely premium offering.",
      ask:
        "The vice president (judge) wants your team to recommend a pricing strategy that justifies this premium position and explain how it fits the product mix.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your pricing recommendation",
    }),
    judgeQuestions: [
      "What would actually justify this price jump in customers' eyes?",
      "How does this premium version need to be positioned differently from the original?",
    ],
  },
  {
    title: "Responding to a Competitor's Aggressive Discounting at Fenwick Consumer Brands",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "A rival brand just launched a deep-discount promotion on a directly competing product, and the vice president of marketing (judge) is under pressure from sales leadership to match the discount immediately to avoid losing market share.",
      ask:
        "The vice president (judge) wants your team to recommend a pricing and promotional response that protects the brand's value rather than matching the discount outright.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "Why might matching this discount undermine our brand's positioning?",
      "What would you do instead of a straight price match?",
    ],
  },
  {
    title: "A National Ad Campaign Missing Its Mark at Fenwick Consumer Brands",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:014", description: "Explain the components of advertisements" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
      { code: "PR:099", description: "Describe the use of business ethics in promotion" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "FENWICK's national TV and streaming campaign for the new product line is generating high awareness in tracking studies but almost no lift in actual sales, and the vice president of marketing (judge) needs to understand the disconnect before more budget goes out the door.",
      ask:
        "The vice president (judge) wants your team to diagnose what's missing between awareness and purchase and recommend adjustments to the promotional mix.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's diagnosis",
    }),
    judgeQuestions: [
      "What could explain high awareness but no sales lift here?",
      "What would you add to this promotional mix to close that gap?",
    ],
  },
  {
    title: "A Promotion's Fine Print Draws Complaints at Fenwick Consumer Brands",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:100", description: "Describe the use of technology in the promotion function" },
      { code: "PR:101", description: "Describe the regulation of promotion" },
      { code: "PR:247", description: "Describe word-of-mouth channels used to communicate with targeted audiences" },
      { code: "PR:249", description: "Identify communications channels used in sales promotion" },
      { code: "PR:250", description: "Explain communications channels used in public-relations activities" },
      { code: "PR:251", description: "Explain the importance of coordinating elements in advertisements" },
      { code: "PR:252", description: "Identify types of public-relations activities" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "A \"buy one, get one free\" promotion is drawing complaints online because customers didn't realize the free item had to be the lower-priced product, a detail buried in small print, and the vice president of marketing (judge) wants to head off a bigger backlash.",
      ask:
        "The vice president of marketing (judge) wants your team to review this promotion against regulation and recommend a PR response.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear what your team found",
    }),
    judgeQuestions: [
      "What disclosure should this promotion have made clearer from the start?",
      "What PR response would you recommend for the complaints already out there?",
    ],
  },
  {
    title: "Deciding on an Influencer Partnership at Fenwick Consumer Brands",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:253", description: "Discuss internal and external audiences for public-relations activities" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:014", description: "Explain the components of advertisements" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
      { code: "PR:099", description: "Describe the use of business ethics in promotion" },
      { code: "PR:100", description: "Describe the use of technology in the promotion function" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "A popular influencer has offered to promote FENWICK's new line, but the vice president of marketing (judge) is weighing the reach against the influencer's history of controversial posts that could reflect poorly on the brand.",
      ask:
        "The vice president (judge) wants your team to weigh this partnership's risk and reward and recommend how it should fit into the broader promotional mix if approved.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What ethical consideration should weigh most heavily in this decision?",
      "If we move forward, how would you structure this to limit our exposure to their controversies?",
    ],
  },
  {
    title: "No Real Data Behind the Last Rebrand at Fenwick Consumer Brands",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "IM:025", description: "Explain the role of ethics in marketing-information management" },
      { code: "IM:062", description: "Explain techniques for processing marketing data" },
      { code: "IM:183", description: "Describe the use of technology in the marketing-information management function" },
      { code: "IM:184", description: "Identify data monitored for marketing decision making" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "FENWICK's last packaging redesign, based on internal opinion rather than customer input, has drawn confused reactions on social media, and the vice president of marketing (judge) doesn't want to repeat the mistake on the upcoming logo refresh.",
      ask:
        "The vice president (judge) wants your team to explain what a proper marketing-information process would have caught and propose one for the upcoming refresh.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What data should have guided the packaging redesign that apparently didn't?",
      "What ethical guardrail should guide how we collect customer input this time?",
    ],
  },
  {
    title: "Designing Research Before a Logo Refresh at Fenwick Consumer Brands",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:191", description: "Explain the use of descriptive statistics in marketing decision making" },
      { code: "IM:281", description: "Describe options businesses use to obtain marketing research data (i.e., primary and secondary research)" },
      { code: "IM:282", description: "Discuss the nature of marketing research problems/issues" },
      { code: "IM:284", description: "Describe methods used to design marketing research studies (i.e., descriptive, exploratory, and causal)" },
      { code: "IM:285", description: "Discuss the nature of sampling plans (i.e., who, how many, how chosen)" },
      { code: "IM:289", description: "Describe data-collection methods (e.g., observations, mail, diaries, phone, internet, discussion groups, interviews, scanners, tracking tools)" },
      { code: "IM:292", description: "Identify sources of error in a research project (e.g., response errors, interviewer errors, non-response errors, sample design)" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "Leadership wants to validate the new logo direction with real customers before the costly full rollout across packaging, signage, and advertising, and the vice president of marketing (judge) needs a research plan ready by next week.",
      ask:
        "The vice president (judge) wants your team to design a research study, including sampling and data collection, to validate the logo direction before rollout.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your research design",
    }),
    judgeQuestions: [
      "Who should we sample to get a meaningful read on this new logo?",
      "What data-collection method fits best for testing a visual design like this?",
    ],
  },
  {
    title: "A Flawed Brand-Tracking Survey at Fenwick Consumer Brands",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:293", description: "Evaluate questionnaire design (e.g., types of questions, question wording, routing, sequencing, length, layout)" },
      { code: "IM:418", description: "Explain characteristics of effective data-collection instruments" },
      { code: "IM:419", description: "Describe the regulation of marketing-information management" },
      { code: "IM:428", description: "Assess appropriateness of marketing research for the problem/issue (e.g., research methods, sources of information, timeliness of information, etc.)" },
      { code: "IM:469", description: "Monitor/measure customer “buzz”" },
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "FENWICK's quarterly brand-tracking survey has returned wildly different results from last quarter with no clear explanation, and the vice president of marketing (judge) suspects a change made to the questionnaire itself, not an actual shift in brand perception, is behind it.",
      ask:
        "The vice president (judge) wants your team to evaluate what changed in the survey's design and propose how to get a reliable read going forward.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear what your team found",
    }),
    judgeQuestions: [
      "What in the survey's design could produce results this different from last quarter?",
      "How would you make sure future tracking surveys stay comparable quarter to quarter?",
    ],
  },
  {
    title: "Deciding Whether to Extend the Product Line at Fenwick Consumer Brands",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:017", description: "Identify consumer protection provisions of appropriate agencies" },
      { code: "PM:019", description: "Describe the uses of grades and standards in marketing" },
      { code: "PM:020", description: "Explain warranties and guarantees" },
      { code: "PM:021", description: "Explain the nature of product/service branding" },
      { code: "PM:024", description: "Identify the impact of product life cycles on marketing decisions" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "FENWICK's flagship lotion is showing signs of a maturing product life cycle, and the vice president of marketing (judge) is weighing whether to extend the line with new scents and formulas or invest in something entirely new instead.",
      ask:
        "The vice president (judge) wants your team to recommend whether to extend this product line and how it should be positioned within the brand.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What does this product's life-cycle stage tell us about whether extension makes sense?",
      "How should a line extension be positioned so it doesn't cannibalize the original?",
    ],
  },
  {
    title: "Generating Ideas for a Sustainable Packaging Redesign at Fenwick Consumer Brands",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:039", description: "Describe the use of technology in the product/service management function" },
      { code: "PM:040", description: "Explain business ethics in product/service management" },
      { code: "PM:041", description: "Describe the nature of product bundling" },
      { code: "PM:042", description: "Describe factors used by marketers to position products/services" },
      { code: "PM:127", description: "Identify methods/techniques to generate a product idea" },
      { code: "PM:128", description: "Generate product ideas" },
      { code: "PM:134", description: "Identify product opportunities" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "Customers have been asking FENWICK to reduce plastic packaging, and the vice president of marketing (judge) wants genuinely sustainable packaging ideas rather than a surface-level change that could look like greenwashing.",
      ask:
        "The vice president (judge) wants your team to generate real packaging ideas and explain how to position the change honestly.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's ideas",
    }),
    judgeQuestions: [
      "What's one packaging idea you'd bring forward, and why is it more than surface-level?",
      "How do we position this change so it doesn't look like greenwashing?",
    ],
  },
  {
    title: "Repositioning the Corporate Brand After a Product Recall at Fenwick Consumer Brands",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:206", description: "Explain the nature of corporate branding" },
      { code: "PM:207", description: "Describe factors used by businesses to position corporate brands" },
      { code: "PM:276", description: "Describe the role of customer voice in branding" },
      { code: "PM:277", description: "Identify customer touch points" },
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:017", description: "Identify consumer protection provisions of appropriate agencies" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "FENWICK recently completed a voluntary recall of one product over a minor labeling issue, handled correctly but still covered by local news, and the vice president of marketing (judge) wants to rebuild customer trust in the brand as a whole.",
      ask:
        "The vice president (judge) wants your team to propose a brand-repositioning approach centered on trust and identify the customer touch points that matter most right now.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What message should we lead with to rebuild trust after this recall?",
      "Which customer touch point would you prioritize first?",
    ],
  },
  {
    title: "Retail Sales Teams Struggling to Sell a New Formula at Fenwick Consumer Brands",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
      { code: "SE:106", description: "Explain legal and ethical considerations in selling" },
      { code: "SE:107", description: "Describe the use of technology in the selling function" },
      { code: "SE:109", description: "Analyze product information to identify product features and benefits" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "Retail sales associates carrying FENWICK's new reformulated skincare product aren't confident explaining what changed from the old formula, and the vice president of marketing (judge) is hearing from retail partners that this is slowing sales at the shelf.",
      ask:
        "The vice president (judge) wants your team to propose how to get retail associates the product knowledge and selling points they need.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What should retail associates know about this reformulation that they clearly don't right now?",
      "How would you get this information to associates across hundreds of retail locations?",
    ],
  },
  {
    title: "Building Brand Loyalty Beyond a One-Time Purchase at Fenwick Consumer Brands",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:359", description: "Discuss motivational theories that impact buying behavior" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
    ],
    eventSituation: buildSituation({
      role: "the marketing management team",
      company: "FENWICK CONSUMER BRANDS",
      judgeRole: "the vice president of marketing",
      problem:
        "FENWICK's customer data shows most buyers purchase once and never repurchase, and the vice president of marketing (judge) wants to understand the motivations behind buying decisions and build a strategy that turns first-time buyers into loyal customers.",
      ask:
        "The vice president (judge) wants your team to explain the motivational factors involved and propose a strategy focused on building lasting brand loyalty.",
      location: "the brand marketing conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What's likely preventing a first-time buyer from repurchasing?",
      "What would you build into our approach to encourage brand loyalty?",
    ],
  },
];

MMTDM_CASES.push({
  title: "Legal and Ethical Boundaries for a New Customer Data Program at Fenwick Consumer Brands",
  instructionalArea: "Selling",
  performanceIndicators: [
    { code: "SE:106", description: "Explain legal and ethical considerations in selling" },
    { code: "SE:107", description: "Describe the use of technology in the selling function" },
    { code: "SE:109", description: "Analyze product information to identify product features and benefits" },
    { code: "SE:017", description: "Explain the nature and scope of the selling function" },
    { code: "SE:048", description: "Explain the selling process" },
    { code: "SE:062", description: "Acquire product information for use in selling" },
    { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
  ],
  eventSituation: buildSituation({
    role: "the marketing management team",
    company: "FENWICK CONSUMER BRANDS",
    judgeRole: "the vice president of marketing",
    problem:
      "FENWICK is launching a new program where retail associates collect customer emails at checkout in exchange for a discount, and the vice president of marketing (judge) wants to make sure this is sold to customers honestly, not through pressure or unclear terms.",
    ask:
      "The vice president (judge) wants your team to outline how associates should present this program's value within legal and ethical bounds.",
    location: "the brand marketing conference room",
    greetingAsk: "to hear your team's outline",
  }),
  judgeQuestions: [
    "What should associates avoid implying when asking for a customer's email at checkout?",
    "How would you explain this program's benefit to a hesitant customer?",
  ],
});

const MMTDM_EVENT: EventCaseStudySeed = {
  eventSlug: "marketing-management-team-decision-making",
  eventName: "Marketing Management Team Decision Making",
  careerCluster: "Marketing",
  careerPathway: null,
  format: "TEAM_DECISION_MAKING",
  prepMinutes: 30,
  presentMinutes: 15,
  cases: MMTDM_CASES,
};

// ---------------------------------------------------------------------------
// sports-and-entertainment-marketing-team-decision-making (TDM, shared 83-PI pool)
// ---------------------------------------------------------------------------
const SEMTDM_CASES: CaseStudySeed[] = [
  {
    title: "A Streaming Platform Wants Exclusive Rights at Ridgeline Sports & Entertainment",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "A streaming platform wants exclusive rights to broadcast RIDGELINE's concert-venue events, which would mean fans could no longer watch on the local cable partner they're used to, and the vice president of marketing (judge) wants your team's read on this shift.",
      ask:
        "The vice president (judge) wants your team to explain how this channel relationship works and flag legal or ethical considerations, especially fan access, before recommending whether to proceed.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What's the risk to our fan base if we move exclusively to this streaming platform?",
      "What should we check legally in this kind of distribution agreement?",
    ],
  },
  {
    title: "Coordinating a New Ticket-Resale Channel at Ridgeline Sports & Entertainment",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:004", description: "Describe the use of technology in the channel management function" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "RIDGELINE is considering an official partnership with a ticket-resale marketplace, and the vice president of marketing (judge) is worried this new channel could clash with the venue's own primary ticket sales if it isn't coordinated carefully.",
      ask:
        "The vice president (judge) wants your team to propose how to coordinate this new channel with primary ticket sales without creating conflict.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "How would you prevent this resale channel from undercutting our primary ticket sales?",
      "What ethical concern should we flag about partnering with a resale marketplace?",
    ],
  },
  {
    title: "A Long-Time Media Partner Relationship Is Strained at Ridgeline Sports & Entertainment",
    instructionalArea: "Channel Management",
    performanceIndicators: [
      { code: "CM:001", description: "Explain the nature and scope of channel management" },
      { code: "CM:003", description: "Explain the nature of channels of distribution" },
      { code: "CM:005", description: "Explain legal considerations in channel management" },
      { code: "CM:006", description: "Describe ethical considerations in channel management" },
      { code: "CM:007", description: "Coordinate channel management with other marketing activities" },
      { code: "CM:008", description: "Explain the nature of channel-member relationships" },
      { code: "CM:021", description: "Explain the nature of affinity partner relationships" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "RIDGELINE's longtime local radio broadcast partner is upset that a digital platform got early access to interview clips before the radio station did, and is threatening to scale back its promotional support right before the venue's biggest event of the year.",
      ask:
        "The vice president (judge) wants your team to recommend how to repair this channel-member relationship before the big event.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would you offer this partner to repair the relationship without setting a bad precedent?",
      "How do we avoid this kind of conflict with future digital content releases?",
    ],
  },
  {
    title: "Planning the Market for a New Concert Season at Ridgeline Sports & Entertainment",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "MP:006", description: "Explain the nature of marketing planning" },
      { code: "MP:007", description: "Explain the nature of marketing plans" },
      { code: "MP:008", description: "Explain the role of situation analysis in the marketing planning process" },
      { code: "MP:013", description: "Explain the nature of sales forecasts" },
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "RIDGELINE's concert booking calendar for next season is set, but the vice president of marketing (judge) has no situation analysis of which genres and price points are actually drawing this market right now before marketing dollars go out.",
      ask:
        "The vice president (judge) wants your team to build a market plan, including situation analysis and sales forecasts, to guide how this season is marketed.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What would this situation analysis need to tell us before we commit marketing spend?",
      "How would you forecast demand differently for a big-name act versus a lesser-known one?",
    ],
  },
  {
    title: "Identifying an Underserved Fan Segment at Ridgeline Sports & Entertainment",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "MP:006", description: "Explain the nature of marketing planning" },
      { code: "MP:007", description: "Explain the nature of marketing plans" },
      { code: "MP:008", description: "Explain the role of situation analysis in the marketing planning process" },
      { code: "MP:013", description: "Explain the nature of sales forecasts" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "Ticket data shows RIDGELINE's audience skews heavily toward one age group, and the vice president of marketing (judge) suspects there's an underserved younger segment nearby but has no real market identification confirming what they'd actually come out for.",
      ask:
        "The vice president (judge) wants your team to identify this potential new market and outline what research would confirm the right programming to attract them.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would you need to learn about this younger segment before booking around them?",
      "What's the risk of chasing this new segment and alienating our current audience?",
    ],
  },
  {
    title: "Forecasting Attendance for a First-Time Festival at Ridgeline Sports & Entertainment",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "MP:001", description: "Explain the concept of marketing strategies" },
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "MP:006", description: "Explain the nature of marketing planning" },
      { code: "MP:007", description: "Explain the nature of marketing plans" },
      { code: "MP:008", description: "Explain the role of situation analysis in the marketing planning process" },
      { code: "MP:013", description: "Explain the nature of sales forecasts" },
      { code: "IM:012", description: "Describe the need for marketing data" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "RIDGELINE is hosting its first multi-day music festival, and vendors need a firm attendance estimate within two weeks to finalize staffing and supply orders, but the vice president of marketing (judge) has no forecast for an event this new and different from anything RIDGELINE has run before.",
      ask:
        "The vice president (judge) wants your team to outline how you'd build a credible attendance forecast for this first-time event under a tight deadline.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your forecasting approach",
    }),
    judgeQuestions: [
      "What would you lean on for a forecast when there's no direct history to compare to?",
      "How would you build in a safety margin for an event this unpredictable?",
    ],
  },
  {
    title: "Pricing VIP Packages for a Sold-Out Show at Ridgeline Sports & Entertainment",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "A sold-out show is generating strong demand for a new VIP package, and the vice president of marketing (judge) is deciding how high to price it without it looking like RIDGELINE is exploiting sold-out demand from its most dedicated fans.",
      ask:
        "The vice president (judge) wants your team to recommend a price for this package and explain the ethical line to keep in mind.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your pricing recommendation",
    }),
    judgeQuestions: [
      "Where's the ethical line between smart pricing and exploiting sold-out demand?",
      "What would actually justify this VIP price to fans?",
    ],
  },
  {
    title: "Responding to a Competing Venue's Ticket Discounts at Ridgeline Sports & Entertainment",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:002", description: "Explain factors affecting pricing decisions" },
      { code: "PI:015", description: "Describe the role of business ethics in pricing" },
      { code: "PI:016", description: "Explain the use of technology in the pricing function" },
      { code: "PI:017", description: "Explain legal considerations for pricing" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "A competing venue nearby just slashed prices for shows on the same nights as several RIDGELINE events, and the vice president of marketing (judge) is under pressure to discount immediately to avoid losing ticket sales.",
      ask:
        "The vice president (judge) wants your team to recommend a pricing and promotional response that protects RIDGELINE's value rather than racing to match the discount.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "Why might matching this discount hurt us more than it helps?",
      "What would you offer instead of a straight price match?",
    ],
  },
  {
    title: "A New Show Announcement Falls Flat at Ridgeline Sports & Entertainment",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:007", description: "Explain types of advertising media" },
      { code: "PR:014", description: "Explain the components of advertisements" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
      { code: "PR:099", description: "Describe the use of business ethics in promotion" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "RIDGELINE's announcement for a major upcoming show generated a lot of social impressions but ticket sales in the first 48 hours were far below projections, and the vice president of marketing (judge) needs to understand why before the on-sale window closes further.",
      ask:
        "The vice president (judge) wants your team to diagnose what's missing from the announcement campaign and recommend adjustments to the promotional mix.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's diagnosis",
    }),
    judgeQuestions: [
      "What could explain strong social impressions but weak ticket sales here?",
      "What would you add to this promotional mix to drive sales in this critical window?",
    ],
  },
  {
    title: "A Contest Promotion's Rules Draw Complaints at Ridgeline Sports & Entertainment",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:100", description: "Describe the use of technology in the promotion function" },
      { code: "PR:101", description: "Describe the regulation of promotion" },
      { code: "PR:247", description: "Describe word-of-mouth channels used to communicate with targeted audiences" },
      { code: "PR:249", description: "Identify communications channels used in sales promotion" },
      { code: "PR:250", description: "Explain communications channels used in public-relations activities" },
      { code: "PR:251", description: "Explain the importance of coordinating elements in advertisements" },
      { code: "PR:252", description: "Identify types of public-relations activities" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "A \"win front-row seats\" social media contest is drawing complaints because entrants didn't realize a ticket purchase was required to qualify, a detail that was only in the contest's linked terms page, and the vice president of marketing (judge) wants to head off a bigger backlash.",
      ask:
        "The vice president (judge) wants your team to review this contest against promotion regulation and recommend a PR response.",
      location: "the marketing department conference room",
      greetingAsk: "to hear what your team found",
    }),
    judgeQuestions: [
      "What disclosure should this contest have made clearer from the start?",
      "What PR response would you recommend for the complaints already circulating?",
    ],
  },
  {
    title: "Deciding on a Local Sports Team Cross-Promotion at Ridgeline Sports & Entertainment",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:253", description: "Discuss internal and external audiences for public-relations activities" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:014", description: "Explain the components of advertisements" },
      { code: "PR:089", description: "Explain the nature of direct marketing channels" },
      { code: "PR:099", description: "Describe the use of business ethics in promotion" },
      { code: "PR:100", description: "Describe the use of technology in the promotion function" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "A local minor-league team has proposed a cross-promotion bundling their game tickets with a RIDGELINE concert discount, and the vice president of marketing (judge) is weighing whether this reaches a genuinely new audience or just discounts sales that would have happened anyway.",
      ask:
        "The vice president (judge) wants your team to weigh this cross-promotion's audiences and recommend whether and how to move forward.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "How would you tell whether this actually reaches a new audience versus just discounting existing demand?",
      "What would you want structured differently in this partnership before agreeing?",
    ],
  },
  {
    title: "No Real Data Behind Last Season's Programming at Ridgeline Sports & Entertainment",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
      { code: "IM:012", description: "Describe the need for marketing data" },
      { code: "IM:025", description: "Explain the role of ethics in marketing-information management" },
      { code: "IM:062", description: "Explain techniques for processing marketing data" },
      { code: "IM:183", description: "Describe the use of technology in the marketing-information management function" },
      { code: "IM:184", description: "Identify data monitored for marketing decision making" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "Last season's booking decisions were made mostly on the vice president's (judge's) gut sense of what would sell, and several shows underperformed badly while fans kept requesting a genre RIDGELINE never booked at all.",
      ask:
        "The vice president (judge) wants your team to explain what a real marketing-information process would have caught and propose one for next season's booking decisions.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What data should have guided last season's booking decisions?",
      "What's an ethical way to start systematically collecting fan input like this?",
    ],
  },
  {
    title: "Designing Research Before Adding a New Venue Section at Ridgeline Sports & Entertainment",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:191", description: "Explain the use of descriptive statistics in marketing decision making" },
      { code: "IM:281", description: "Describe options businesses use to obtain marketing research data (i.e., primary and secondary research)" },
      { code: "IM:282", description: "Discuss the nature of marketing research problems/issues" },
      { code: "IM:284", description: "Describe methods used to design marketing research studies (i.e., descriptive, exploratory, and causal)" },
      { code: "IM:285", description: "Discuss the nature of sampling plans (i.e., who, how many, how chosen)" },
      { code: "IM:289", description: "Describe data-collection methods (e.g., observations, mail, diaries, phone, internet, discussion groups, interviews, scanners, tracking tools)" },
      { code: "IM:292", description: "Identify sources of error in a research project (e.g., response errors, interviewer errors, non-response errors, sample design)" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "Leadership is considering converting part of general admission into a costly new premium standing section, and the vice president of marketing (judge) wants real research validating demand before committing the construction budget.",
      ask:
        "The vice president (judge) wants your team to design a research study, including sampling and data collection, to validate this investment.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your research design",
    }),
    judgeQuestions: [
      "Who should we sample to get a reliable answer on this investment?",
      "What data-collection method fits best for a question like this at a live event?",
    ],
  },
  {
    title: "A Confusing Post-Event Fan Survey at Ridgeline Sports & Entertainment",
    instructionalArea: "Marketing-Information Management",
    performanceIndicators: [
      { code: "IM:293", description: "Evaluate questionnaire design (e.g., types of questions, question wording, routing, sequencing, length, layout)" },
      { code: "IM:418", description: "Explain characteristics of effective data-collection instruments" },
      { code: "IM:419", description: "Describe the regulation of marketing-information management" },
      { code: "IM:428", description: "Assess appropriateness of marketing research for the problem/issue (e.g., research methods, sources of information, timeliness of information, etc.)" },
      { code: "IM:469", description: "Monitor/measure customer “buzz”" },
      { code: "IM:001", description: "Explain the nature and scope of the marketing-information management function" },
      { code: "IM:010", description: "Explain the nature of marketing research" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "RIDGELINE's post-event survey, sent the morning after each show, has a response rate under 3%, and the vice president of marketing (judge) suspects both the timing and a confusing layout of questions are driving the low response.",
      ask:
        "The vice president (judge) wants your team to evaluate the survey's design and timing and propose a version fans will actually complete.",
      location: "the marketing department conference room",
      greetingAsk: "to hear what your team found",
    }),
    judgeQuestions: [
      "What about this survey's timing or design is likely driving away responses?",
      "What would you change first to raise the response rate?",
    ],
  },
  {
    title: "Deciding Whether to Add an All-Ages Section at Ridgeline Sports & Entertainment",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:017", description: "Identify consumer protection provisions of appropriate agencies" },
      { code: "PM:019", description: "Describe the uses of grades and standards in marketing" },
      { code: "PM:020", description: "Explain warranties and guarantees" },
      { code: "PM:021", description: "Explain the nature of product/service branding" },
      { code: "PM:024", description: "Identify the impact of product life cycles on marketing decisions" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "Several parents have asked RIDGELINE to add an all-ages section for family-friendly shows, and the vice president of marketing (judge) is weighing whether this fits the venue's product mix or would complicate its identity as a 21-and-up concert venue for most of the calendar.",
      ask:
        "The vice president (judge) wants your team to recommend whether and how to add this offering to the venue's mix.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "How would this fit with, or clash with, our current identity?",
      "What compliance considerations come with offering an all-ages section?",
    ],
  },
  {
    title: "Generating Ideas for a New Fan-Loyalty Product at Ridgeline Sports & Entertainment",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:039", description: "Describe the use of technology in the product/service management function" },
      { code: "PM:040", description: "Explain business ethics in product/service management" },
      { code: "PM:041", description: "Describe the nature of product bundling" },
      { code: "PM:042", description: "Describe factors used by marketers to position products/services" },
      { code: "PM:127", description: "Identify methods/techniques to generate a product idea" },
      { code: "PM:128", description: "Generate product ideas" },
      { code: "PM:134", description: "Identify product opportunities" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "RIDGELINE has no loyalty program for repeat attendees, and the vice president of marketing (judge) wants fresh ideas for one that could bundle perks like early ticket access and merchandise discounts without becoming a giveaway that hurts margins.",
      ask:
        "The vice president (judge) wants your team to generate and position ideas for this new loyalty product.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's ideas",
    }),
    judgeQuestions: [
      "What's one loyalty perk you'd bring forward, and why would it actually drive repeat visits?",
      "How do we bundle this without giving away too much margin?",
    ],
  },
  {
    title: "Repositioning the Brand After a Difficult Season at Ridgeline Sports & Entertainment",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:206", description: "Explain the nature of corporate branding" },
      { code: "PM:207", description: "Describe factors used by businesses to position corporate brands" },
      { code: "PM:276", description: "Describe the role of customer voice in branding" },
      { code: "PM:277", description: "Identify customer touch points" },
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:017", description: "Identify consumer protection provisions of appropriate agencies" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "After a season of lower-than-usual attendance, the vice president of marketing (judge) is worried RIDGELINE's brand has become associated only with big-name headliners, with nothing else drawing fans when a season lacks one.",
      ask:
        "The vice president (judge) wants your team to propose a brand positioning built on values beyond headliner names and identify where fans need to feel that connection.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What's our real draw as a venue beyond just who's headlining?",
      "Which fan touch point would you focus on first to rebuild that connection?",
    ],
  },
  {
    title: "Box Office Staff Struggling to Sell Season Packages at Ridgeline Sports & Entertainment",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
      { code: "SE:106", description: "Explain legal and ethical considerations in selling" },
      { code: "SE:107", description: "Describe the use of technology in the selling function" },
      { code: "SE:109", description: "Analyze product information to identify product features and benefits" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "Box office staff aren't confident explaining what's included in the new season ticket package, leading several callers to just buy single-show tickets instead, and the vice president of marketing (judge) is losing season-package revenue to this confusion.",
      ask:
        "The vice president (judge) wants your team to propose how to get box office staff the product knowledge and selling approach they need for this package.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What information should staff be leading with when someone calls about single tickets?",
      "How would you train staff to confidently explain this package's value?",
    ],
  },
  {
    title: "Turning First-Time Attendees Into Repeat Fans at Ridgeline Sports & Entertainment",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:359", description: "Discuss motivational theories that impact buying behavior" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
    ],
    eventSituation: buildSituation({
      role: "the sports and entertainment marketing team",
      company: "RIDGELINE SPORTS & ENTERTAINMENT",
      judgeRole: "the vice president of marketing",
      problem:
        "Ticketing data shows most attendees only ever come to one show, and the vice president of marketing (judge) wants to understand what's motivating a first visit and build an approach that actually turns first-timers into repeat fans.",
      ask:
        "The vice president (judge) wants your team to explain the motivational factors involved and propose a strategy for building lasting attendance.",
      location: "the marketing department conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What's likely preventing a first-time attendee from coming back?",
      "What would you build into our approach to encourage a second visit?",
    ],
  },
];

SEMTDM_CASES.push({
  title: "Legal and Ethical Boundaries for a New Fan-Data Program at Ridgeline Sports & Entertainment",
  instructionalArea: "Selling",
  performanceIndicators: [
    { code: "SE:106", description: "Explain legal and ethical considerations in selling" },
    { code: "SE:107", description: "Describe the use of technology in the selling function" },
    { code: "SE:109", description: "Analyze product information to identify product features and benefits" },
    { code: "SE:017", description: "Explain the nature and scope of the selling function" },
    { code: "SE:048", description: "Explain the selling process" },
    { code: "SE:062", description: "Acquire product information for use in selling" },
    { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
  ],
  eventSituation: buildSituation({
    role: "the sports and entertainment marketing team",
    company: "RIDGELINE SPORTS & ENTERTAINMENT",
    judgeRole: "the vice president of marketing",
    problem:
      "RIDGELINE is launching a program where box office staff collect fan emails and birthdays at the ticket window in exchange for a small perk, and the vice president of marketing (judge) wants this sold to fans honestly, without pressure or unclear terms.",
    ask:
      "The vice president (judge) wants your team to outline how staff should present this program's value within legal and ethical bounds.",
    location: "the marketing department conference room",
    greetingAsk: "to hear your team's outline",
  }),
  judgeQuestions: [
    "What should staff avoid implying when asking fans for this information?",
    "How would you explain this program's benefit to a hesitant fan?",
  ],
});

const SEMTDM_EVENT: EventCaseStudySeed = {
  eventSlug: "sports-and-entertainment-marketing-team-decision-making",
  eventName: "Sports and Entertainment Marketing Team Decision Making",
  careerCluster: "Marketing",
  careerPathway: null,
  format: "TEAM_DECISION_MAKING",
  prepMinutes: 30,
  presentMinutes: 15,
  cases: SEMTDM_CASES,
};

export const MARKETING_CASE_STUDY_SEED: EventCaseStudySeed[] = [
  AUTOMOTIVE_EVENT,
  BIZ_SERVICES_EVENT,
  FOOD_EVENT,
  SEM_EVENT,
  MARCOMM_EVENT,
  RETAIL_EVENT,
  POM_EVENT,
  BMTDM_EVENT,
  MMTDM_EVENT,
  SEMTDM_EVENT,
];
