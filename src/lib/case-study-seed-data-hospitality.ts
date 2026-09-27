/**
 * Hospitality and Tourism cluster case studies for the 7 roleplay events.
 * Performance indicators are pulled verbatim from this app's own seeded
 * PerformanceIndicator rows (Cluster + Pathway tier for Series/TDM/
 * Professional Selling events; Core tier for the Principles event — see
 * getPerformanceIndicatorsForEvent and case-study-seed-data.ts).
 */
import { buildSituation } from "./case-study-scenario-builder";
import type { CaseStudySeed, EventCaseStudySeed } from "./case-study-seed-data";

// ---------------------------------------------------------------------------
// hotel-and-lodging-management-series (SERIES, Lodging pathway)
// ---------------------------------------------------------------------------
const HLM_CASES: CaseStudySeed[] = [
  {
    title: "Front Desk Reservation Errors at The Aldergate Hotel",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:548", description: "Book and confirm room reservations (i.e., direct and indirect)" },
      { code: "OP:549", description: "Modify/cancel guest reservations" },
      { code: "OP:550", description: "Extend reservations" },
      { code: "OP:551", description: "Complete guest check-in procedures" },
      { code: "OP:552", description: "Process front-desk transactions (e.g., check cashing, valet parking, call routing, requests)" },
    ],
    eventSituation: buildSituation({
      role: "the front office associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the front office manager",
      problem:
        "Three guests this week arrived to find their reservations either missing, booked for the wrong dates, or not reflecting a room-type change they'd requested by phone, and the front office manager (judge) traces it to inconsistent handling across the direct booking channels.",
      ask:
        "The front office manager (judge) wants you to identify what's going wrong with how reservations are booked, modified, and confirmed, and propose a more reliable process.",
      location: "the front desk office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What step is most likely getting skipped when a phone-requested change doesn't make it into the system?",
      "How would you confirm a reservation change actually stuck before the guest arrives?",
    ],
  },
  {
    title: "A Group Reservation Block Falls Apart at The Aldergate Hotel",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:553", description: "Process guest departures" },
      { code: "OP:554", description: "Block group reservations" },
      { code: "OP:555", description: "Describe distribution systems used in lodging (e.g., global distribution systems [GDS], intersell agencies, property direct reservation channels, central reservation system, affiliate and non-affiliate networks, Internet, etc.)" },
      { code: "OP:556", description: "Identify performance/productivity standards for lodging facilities" },
      { code: "OP:545", description: "Explain hotel security considerations" },
    ],
    eventSituation: buildSituation({
      role: "the front office associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the front office manager",
      problem:
        "A wedding block of 25 rooms was supposed to be held for a guest's family, but several rooms were released back into general inventory too early and booked by other guests through an online travel agency, leaving the wedding party scrambling the week of the event.",
      ask:
        "The front office manager (judge) wants you to determine what went wrong with this block and propose how to prevent it and handle the immediate fallout.",
      location: "the front desk office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What likely caused these blocked rooms to release too early?",
      "How would you handle the guests now displaced from this wedding block?",
    ],
  },
  {
    title: "A Housekeeping and Maintenance Backlog at The Aldergate Hotel",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:558", description: "Identify guest room/public area maintenance needs" },
      { code: "OP:559", description: "Process maintenance request" },
      { code: "OP:560", description: "Explain the housekeeping function" },
      { code: "OP:561", description: "Identify signs of pest infestations" },
      { code: "OP:562", description: "Describe pest control strategies" },
    ],
    eventSituation: buildSituation({
      role: "the housekeeping supervisor",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the general manager",
      problem:
        "Maintenance requests have been piling up for two weeks, and a guest just reported signs of a pest issue in a room that had an unaddressed maintenance ticket sitting open the entire time.",
      ask:
        "The general manager (judge) wants you to identify why this backlog built up and propose how to handle both the immediate pest concern and the maintenance process going forward.",
      location: "the housekeeping office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What should have happened with this maintenance ticket before it became a pest issue?",
      "How would you prioritize and clear this backlog without pulling housekeeping off room turnover?",
    ],
  },
  {
    title: "A Security Incident in the Parking Garage at The Aldergate Hotel",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:113", description: "Explain procedures for handling robbery situations" },
      { code: "OP:115", description: "Explain security considerations in the hospitality and tourism industry" },
      { code: "OP:119", description: "Handle emergency situations in hospitality and tourism" },
      { code: "OP:527", description: "Identify factors affecting evacuation procedures/protocols" },
      { code: "OP:537", description: "Handle emergency situations in hotel/lodging establishments" },
    ],
    eventSituation: buildSituation({
      role: "the security associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the general manager",
      problem:
        "A guest reported being followed and having a bag snatched in the hotel's parking garage last night, and the general manager (judge) needs to review current security procedures and communicate confidently with concerned guests.",
      ask:
        "The general manager (judge) wants you to review this incident and recommend security improvements and how to reassure guests.",
      location: "the security office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What security gap does this incident reveal in the parking garage?",
      "How would you communicate with guests about this without alarming them unnecessarily?",
    ],
  },
  {
    title: "A Hazardous Chemical Spill and a Fraud Alert at The Aldergate Hotel",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:538", description: "Identify hazardous chemicals/waste" },
      { code: "OP:539", description: "Label/store hazardous chemicals/waste" },
      { code: "OP:540", description: "Describe strategies for responding to biohazard incidents" },
      { code: "OP:653", description: "Identify credit card fraud prevention methods" },
      { code: "OP:654", description: "Explain the nature of identity theft controls" },
    ],
    eventSituation: buildSituation({
      role: "the operations associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the general manager",
      problem:
        "A cleaning chemical spilled in a housekeeping closet due to improper storage, and separately, the front desk flagged a guest check-in using a credit card that had already triggered a fraud alert elsewhere that morning.",
      ask:
        "The general manager (judge) wants you to address both the chemical storage issue and the potential fraud situation.",
      location: "the general manager's office",
      greetingAsk: "to hear how you'd handle both of these",
    }),
    judgeQuestions: [
      "What should proper hazardous chemical storage have prevented here?",
      "What steps should front desk staff take when a payment card raises a fraud concern?",
    ],
  },
  {
    title: "A VIP Guest During a Sold-Out Weekend at The Aldergate Hotel",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:038", description: "Identify strategies to manage customer experience during peaks in demand" },
      { code: "CR:039", description: "Maintain service standards during peaks in demand" },
      { code: "CR:052", description: "Identify factors associated with positive customer experiences" },
      { code: "CR:053", description: "Anticipate unspoken customer needs" },
      { code: "CR:054", description: "Accommodate special needs/specific requests of customers" },
    ],
    eventSituation: buildSituation({
      role: "the guest services associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the front office manager",
      problem:
        "The hotel is completely sold out this weekend for a citywide event, and a long-time loyalty member has arrived with a special request the front desk wasn't prepared for, right as the lobby is packed with other checking-in guests.",
      ask:
        "The front office manager (judge) wants you to explain how you'd handle this guest's needs while maintaining service standards for everyone else waiting.",
      location: "the front desk",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "How would you anticipate this guest's unspoken needs given their loyalty status?",
      "How do you maintain service standards for the rest of the line while handling this?",
    ],
  },
  {
    title: "Recovering a Guest After a Reservation Mix-Up at The Aldergate Hotel",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:043", description: "Describe customer-service challenges in the hospitality and tourism industry" },
      { code: "CR:044", description: "Resolve hospitality and tourism related conflicts for customers" },
      { code: "CR:045", description: "Explain the nature of guest recovery" },
      { code: "CR:046", description: "Determine strategies for resolving customer-service situations" },
      { code: "CR:049", description: "Explain the nature of customer service in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the guest services associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the front office manager",
      problem:
        "A guest arrived after a long flight to find her room type didn't match what she booked online, and she's visibly upset in the lobby, saying this is the second hotel this month to get her reservation wrong.",
      ask:
        "The front office manager (judge) wants you to walk through how you'd recover this guest's experience and resolve the situation.",
      location: "the front desk",
      greetingAsk: "to hear your recovery plan",
    }),
    judgeQuestions: [
      "What does real guest recovery look like here, beyond just fixing the room?",
      "How would you rebuild this guest's confidence given her frustration with hotels generally right now?",
    ],
  },
  {
    title: "Orienting a Confused First-Time Guest at The Aldergate Hotel",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:057", description: "Orient guests to lodging facility" },
      { code: "CR:058", description: "Offer services to guests" },
      { code: "CR:059", description: "Recommend alternative lodging facilities for guests" },
      { code: "CR:060", description: "Process guest room changes" },
      { code: "CR:061", description: "Resolve reservation issues" },
    ],
    eventSituation: buildSituation({
      role: "the guest services associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the front office manager",
      problem:
        "A first-time guest is overwhelmed navigating the property, doesn't know where the pool or restaurant are, and separately wants to know if a room change is possible after being placed near an elevator she finds noisy.",
      ask:
        "The front office manager (judge) wants you to walk through how you'd orient this guest and resolve her room concern.",
      location: "the front desk",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What would a thorough orientation for a first-time guest actually include?",
      "How would you handle the room-change request given how full the hotel is right now?",
    ],
  },
  {
    title: "Modernizing Guest Touchpoints at The Aldergate Hotel",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:021", description: "Process customer/guest orders" },
      { code: "CR:028", description: "Use digital media to enhance customer post-sales experience" },
      { code: "CR:051", description: "Identify factors affecting customer-service practices in hospitality and tourism" },
      { code: "CR:055", description: "Deliver positive moments of truth" },
      { code: "CR:067", description: "Explain the importance of meeting and exceeding customer/guest expectations" },
    ],
    eventSituation: buildSituation({
      role: "the guest services associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the front office manager",
      problem:
        "Guest satisfaction scores mention the stay felt \"fine but forgettable,\" and the front office manager (judge) wants to identify small moments during a guest's stay where the hotel could exceed expectations rather than just meet them.",
      ask:
        "The front office manager (judge) wants you to identify these key moments of truth and propose how digital tools could enhance them.",
      location: "the front desk",
      greetingAsk: "to hear your ideas",
    }),
    judgeQuestions: [
      "What's one moment during a stay where we could exceed rather than just meet expectations?",
      "How could a digital tool enhance one of these moments without feeling impersonal?",
    ],
  },
  {
    title: "Selling a Wedding Package at The Aldergate Hotel",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:491", description: "Acquire knowledge of property capacity/amenities" },
      { code: "SE:492", description: "Acquire knowledge of lodging meeting room capacity/requirements" },
      { code: "SE:493", description: "Acquire knowledge of food and beverage capabilities" },
      { code: "SE:494", description: "Identify lodging sales opportunities" },
      { code: "SE:495", description: "Identify factors influencing customer selection of lodging property for groups/events" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the director of sales",
      problem:
        "A bride-to-be is touring the property comparing THE ALDERGATE against two other venues, and the director of sales (judge) needs you to make a compelling case for why she should choose this property for her wedding.",
      ask:
        "The director of sales (judge) wants you to demonstrate your knowledge of the property's capacity and capabilities and identify what would sway her decision.",
      location: "the sales office",
      greetingAsk: "to hear how you'd pitch this",
    }),
    judgeQuestions: [
      "What about our property's capabilities would you lead with for this bride?",
      "What factors typically sway a decision between competing venues like this?",
    ],
  },
  {
    title: "Negotiating a Corporate Account Contract at The Aldergate Hotel",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:496", description: "Explain factors considered when determining group/event negotiation strategies" },
      { code: "SE:497", description: "Negotiate letters of agreement/block contracts" },
      { code: "SE:498", description: "Oversee fulfillment/delivery of client services" },
      { code: "SE:381", description: "Explain the nature of key account management" },
      { code: "SE:499", description: "Establish relationship with hospitality and tourism customer/guest" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the director of sales",
      problem:
        "A regional company wants to negotiate a corporate rate block for its frequent business travelers, but their opening ask on room rates and cancellation terms is well below what THE ALDERGATE typically accepts.",
      ask:
        "The director of sales (judge) wants you to propose a negotiation strategy for this account and how you'd manage it as an ongoing key account.",
      location: "the sales office",
      greetingAsk: "to hear your negotiation strategy",
    }),
    judgeQuestions: [
      "What would you counter with given their initial ask?",
      "How would you manage this as a key account once the contract is signed?",
    ],
  },
  {
    title: "Training Front Desk Staff to Up-Sell at The Aldergate Hotel",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:220", description: "Explain factors that motivate people to choose a hospitality and tourism site" },
      { code: "SE:221", description: "Recommend hospitality and tourism services" },
      { code: "SE:476", description: "Up-sell to enhance customer experience" },
      { code: "SE:499", description: "Establish relationship with hospitality and tourism customer/guest" },
      { code: "SE:500", description: "Determine hospitality and tourism customer/guest needs" },
    ],
    eventSituation: buildSituation({
      role: "a senior front desk associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the front office manager",
      problem:
        "Room-upgrade revenue has been flat for months, and the front office manager (judge) suspects front desk staff aren't confident up-selling because it can feel pushy, especially with guests who just want to check in quickly.",
      ask:
        "The front office manager (judge) wants you to design training on up-selling that feels helpful rather than pushy.",
      location: "the front desk office",
      greetingAsk: "to hear your training approach",
    }),
    judgeQuestions: [
      "What makes an up-sell feel helpful instead of pushy?",
      "How would you read a guest to know whether an up-sell attempt is even appropriate in the moment?",
    ],
  },
  {
    title: "Onboarding New Sales Staff at The Aldergate Hotel",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
    ],
    eventSituation: buildSituation({
      role: "a senior sales associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the director of sales",
      problem:
        "THE ALDERGATE just hired two new sales associates for the group-events team, and the director of sales (judge) wants them trained on the property's selling policies and how to build a real book of repeat corporate and event clients.",
      ask:
        "The director of sales (judge) wants you to put together a training outline covering the selling process, company policy, and clientele-building.",
      location: "the sales office",
      greetingAsk: "to walk through your training outline",
    }),
    judgeQuestions: [
      "What's one selling policy a new associate absolutely needs to know before their first client call?",
      "What would you tell a new hire about building a repeat client base in this business?",
    ],
  },
  {
    title: "Night Audit Discrepancies at The Aldergate Hotel",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:798", description: "Discuss the nature of lodging accounting systems" },
      { code: "FI:799", description: "Discuss lodging tax structures" },
      { code: "FI:800", description: "Explain the purpose of night audits" },
      { code: "FI:801", description: "Complete a night audit" },
      { code: "FI:802", description: "Reconcile accounting issues" },
    ],
    eventSituation: buildSituation({
      role: "the night auditor",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the controller",
      problem:
        "This week's night audits have shown small but recurring discrepancies between room charges and tax calculations, and the controller (judge) needs these resolved before month-end closing.",
      ask:
        "The controller (judge) wants you to explain the purpose of the night audit process and identify where these discrepancies are likely coming from.",
      location: "the accounting office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What's the core purpose of a night audit that this issue is undermining?",
      "Where in the process would you look first to find the source of this discrepancy?",
    ],
  },
  {
    title: "Investigating a Guest Billing Complaint at The Aldergate Hotel",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:803", description: "Produce daily reports" },
      { code: "FI:807", description: "Process refunds" },
      { code: "FI:808", description: "Process advance deposits" },
      { code: "FI:809", description: "Track credit availability/usage" },
      { code: "FI:810", description: "Post charges to guest folios" },
    ],
    eventSituation: buildSituation({
      role: "the front office associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the controller",
      problem:
        "A guest disputes charges on his final folio, claiming an advance deposit was never applied and that a refund from a canceled spa service never went through, and the controller (judge) needs this resolved accurately and quickly.",
      ask:
        "The controller (judge) wants you to investigate this billing complaint and correct the guest's folio.",
      location: "the accounting office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What would you check first to verify whether this advance deposit was actually applied?",
      "How would you explain this correction to the guest in a way that rebuilds trust?",
    ],
  },
  {
    title: "Reviewing Credit Card Processing Costs at The Aldergate Hotel",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:113", description: "Explain cash control procedures (e.g., signature cards, deposit slips, internal/external controls, cash clearing, etc.)" },
      { code: "FI:396", description: "Reconcile cash" },
      { code: "FI:541", description: "Interpret cash-flow statements" },
      { code: "FI:789", description: "Discuss considerations in accepting credit-card payments" },
      { code: "FI:790", description: "Calculate credit-card processing costs" },
    ],
    eventSituation: buildSituation({
      role: "the front office associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the controller",
      problem:
        "The controller (judge) has noticed credit-card processing fees have crept up significantly as more guests pay by card instead of cash, and wants a clear picture of what this is actually costing the hotel and whether the current processor is still the best option.",
      ask:
        "The controller (judge) wants you to calculate these processing costs and recommend whether to negotiate or switch processors.",
      location: "the accounting office",
      greetingAsk: "to hear your analysis",
    }),
    judgeQuestions: [
      "How would you calculate what these processing fees are really costing us?",
      "What would you negotiate for before considering a switch to a new processor?",
    ],
  },
  {
    title: "Upgrading the Property Management System at The Aldergate Hotel",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:300", description: "Explain the role and components of property management systems" },
      { code: "NF:301", description: "Discuss online guest reservation systems" },
      { code: "NF:302", description: "Maintain accurate guest room status/accounts" },
      { code: "NF:303", description: "Utilize property management system applications" },
      { code: "NF:304", description: "Describe system integration challenges in hotel management" },
    ],
    eventSituation: buildSituation({
      role: "the front office associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the general manager",
      problem:
        "THE ALDERGATE's aging property management system doesn't sync well with the newer online reservation platform, causing room-status mismatches that have led to double-bookings twice this month.",
      ask:
        "The general manager (judge) wants you to explain the integration problem and recommend whether to upgrade the system or find a workaround.",
      location: "the general manager's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What's causing this room-status mismatch between the two systems?",
      "What would you weigh in deciding between a full upgrade and a workaround?",
    ],
  },
  {
    title: "Researching the Market Before a Renovation at The Aldergate Hotel",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:279", description: "Explain the need for hospitality and tourism business information" },
      { code: "NF:280", description: "Identify information monitored for business decision making" },
      { code: "NF:281", description: "Explain sources of secondary hospitality and tourism information" },
      { code: "NF:282", description: "Explain types of primary hospitality and tourism market information" },
      { code: "NF:283", description: "Describe methods used to collect hospitality and tourism business information (e.g., observations, mail, telephone, Internet, discussion groups, interviews)" },
    ],
    eventSituation: buildSituation({
      role: "the front office associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the general manager",
      problem:
        "Ownership is considering a significant lobby and guest-room renovation, and the general manager (judge) wants real market data on what guests actually want before committing the budget, rather than guessing based on what a competitor recently did.",
      ask:
        "The general manager (judge) wants you to explain what business information should be gathered and how, before finalizing this renovation plan.",
      location: "the general manager's office",
      greetingAsk: "to hear your research plan",
    }),
    judgeQuestions: [
      "What primary information would you want to collect directly from our own guests?",
      "What secondary sources could tell us what's working at comparable properties?",
    ],
  },
  {
    title: "Launching a Concierge Program at The Aldergate Hotel",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:297", description: "Explain the role of guest services" },
      { code: "PM:298", description: "Discuss the nature of concierge services" },
      { code: "PM:299", description: "Describe the purpose of guest relations" },
      { code: "PM:314", description: "Explain guarantees in hospitality and tourism" },
      { code: "PM:317", description: "Describe the role of customer voice in hospitality and tourism branding" },
    ],
    eventSituation: buildSituation({
      role: "the guest services associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the general manager",
      problem:
        "The general manager (judge) wants to launch a formal concierge program to differentiate THE ALDERGATE from nearby chain hotels, but has never defined what services it should include or what guests should be able to expect and rely on.",
      ask:
        "The general manager (judge) wants you to propose what this concierge program should include and any service guarantees attached to it.",
      location: "the general manager's office",
      greetingAsk: "to hear your program proposal",
    }),
    judgeQuestions: [
      "What services would actually differentiate this concierge program from a typical front desk?",
      "What guarantee, if any, would you attach to this service?",
    ],
  },
  {
    title: "Rebranding After Being Acquired by a Hotel Chain at The Aldergate Hotel",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:206", description: "Explain the nature of corporate branding" },
      { code: "PM:214", description: "Communicate core values of product/service" },
      { code: "PM:239", description: "Evaluate vendors' goods and services" },
      { code: "PM:246", description: "Identify product's/service's competitive advantage" },
      { code: "PM:318", description: "Choose hospitality and tourism vendors" },
    ],
    eventSituation: buildSituation({
      role: "the guest services associate",
      company: "THE ALDERGATE HOTEL",
      judgeRole: "the general manager",
      problem:
        "THE ALDERGATE was just acquired by a national hotel chain, and the general manager (judge) is worried that adopting the chain's standard branding will erase the boutique character that longtime guests love, while also needing to align with the chain's approved vendor list.",
      ask:
        "The general manager (judge) wants you to propose how to preserve the property's competitive advantage within this new corporate branding structure.",
      location: "the general manager's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What's our real competitive advantage that shouldn't get lost in this rebrand?",
      "How would you evaluate whether the chain's approved vendors can maintain our current quality?",
    ],
  },
];

const HLM_EVENT: EventCaseStudySeed = {
  eventSlug: "hotel-and-lodging-management-series",
  eventName: "Hotel and Lodging Management Series",
  careerCluster: "Hospitality and Tourism",
  careerPathway: "Lodging",
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: HLM_CASES,
};

// ---------------------------------------------------------------------------
// quick-serve-restaurant-management-series (SERIES, Restaurant Management pathway)
// ---------------------------------------------------------------------------
const QSR_CASES: CaseStudySeed[] = [
  {
    title: "A Food Temperature Compliance Check at Skyline Quick Bites",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:601", description: "Monitor food temperatures" },
      { code: "OP:608", description: "Identify time and temperature control for food safety (TCS)" },
      { code: "OP:609", description: "Identify temperature danger zone (TDZ) foods" },
      { code: "OP:607", description: "Identify potentially hazardous foods (PHF)" },
      { code: "OP:606", description: "Identify biological hazards" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "During a busy lunch rush, the restaurant manager (judge) noticed the hot-holding cabinet's temperature log hadn't been checked in over two hours, and a batch of chicken sandwiches may have sat in the danger zone longer than allowed.",
      ask:
        "The restaurant manager (judge) wants you to explain what should have happened with this holding cabinet and what to do with the potentially compromised batch right now.",
      location: "the kitchen line",
      greetingAsk: "to hear what you'd do right now",
    }),
    judgeQuestions: [
      "What should you do with this batch of chicken sandwiches right now?",
      "How would you make sure temperature checks don't get skipped during a rush again?",
    ],
  },
  {
    title: "Preparing for a Surprise Health Inspection at Skyline Quick Bites",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:582", description: "Discuss the role of personal hygiene in food safety" },
      { code: "OP:583", description: "Identify personal health conditions that affect food safety" },
      { code: "OP:584", description: "Demonstrate proper hand-washing technique" },
      { code: "OP:585", description: "Use proper work attire" },
      { code: "OP:586", description: "Follow safety precautions for lifting/moving materials" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "A health inspector is due for a surprise visit sometime this week, and the restaurant manager (judge) wants to make sure the whole crew is genuinely following personal hygiene and safety practices, not just when someone's watching.",
      ask:
        "The restaurant manager (judge) wants you to review and reinforce these practices with the team before the inspection.",
      location: "the kitchen line",
      greetingAsk: "to hear your prep plan",
    }),
    judgeQuestions: [
      "What personal hygiene practice do you see slipping most often during a rush?",
      "How would you reinforce proper hand-washing without it feeling like a lecture?",
    ],
  },
  {
    title: "A Kitchen Safety Audit After a Minor Burn at Skyline Quick Bites",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:592", description: "Identify physical hazards" },
      { code: "OP:593", description: "Assess fire hazards" },
      { code: "OP:594", description: "Identify fire prevention strategies" },
      { code: "OP:595", description: "Identify equipment safety requirements" },
      { code: "OP:596", description: "Analyze the cause of accidents" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "A crew member got a minor burn on the fryer last week, and the restaurant manager (judge) wants a full safety review of the kitchen before it happens again, worse, or to someone else.",
      ask:
        "The restaurant manager (judge) wants you to analyze what caused this accident and identify other hazards that need addressing.",
      location: "the kitchen line",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What likely caused this burn, and what would have prevented it?",
      "What other hazard in this kitchen would you flag as a priority to fix?",
    ],
  },
  {
    title: "Drive-Thru Speed and Waste Problem at Skyline Quick Bites",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:617", description: "Identify factors affecting wait time" },
      { code: "OP:618", description: "Describe strategies for managing table turns" },
      { code: "OP:620", description: "Identify quality-control measures in food establishments" },
      { code: "OP:621", description: "Utilize quality control methods in food establishments" },
      { code: "OP:622", description: "Identify common sources of food loss" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "Drive-thru wait times have crept up past the chain's target during peak hours, and the restaurant manager (judge) has also noticed a rise in wasted, remade orders that seem connected to the rush to move cars through faster.",
      ask:
        "The restaurant manager (judge) wants you to identify what's driving both the slower times and the waste, and propose fixes for each.",
      location: "the drive-thru window",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What's the connection between rushing drive-thru times and this rise in waste?",
      "What quality-control step would you add without slowing the line down further?",
    ],
  },
  {
    title: "A Sanitation Procedure Lapse at Skyline Quick Bites",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:630", description: "Distinguish among cleaning, sterilizing, and sanitizing" },
      { code: "OP:631", description: "Label cleaning/sanitation solutions" },
      { code: "OP:632", description: "Follow sanitization procedures" },
      { code: "OP:633", description: "Mix cleaning/sanitation solutions" },
      { code: "OP:634", description: "Determine cleaning requirements" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "The restaurant manager (judge) found an unlabeled spray bottle at a prep station and isn't sure whether it's a cleaner or a sanitizer, and worse, the crew member using it wasn't clear on the difference either.",
      ask:
        "The restaurant manager (judge) wants you to explain the difference between these processes and fix this labeling gap immediately.",
      location: "the kitchen line",
      greetingAsk: "to hear how you'd fix this",
    }),
    judgeQuestions: [
      "What's the actual difference between cleaning, sterilizing, and sanitizing here?",
      "How would you make sure every solution in this kitchen is properly labeled going forward?",
    ],
  },
  {
    title: "Choosing More Sustainable Suppliers at Skyline Quick Bites",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:643", description: "Identify factors influencing food and beverage purchasing decisions" },
      { code: "OP:644", description: "Identify sustainability factors affecting the purchase of food and nonfood products" },
      { code: "OP:645", description: "Identify alternative sources for food products" },
      { code: "OP:489", description: "Describe strategies to minimize the cost of maintaining inventory" },
      { code: "OP:407", description: "Maintain inventory levels" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "Corporate is encouraging locations to source more sustainable packaging and ingredients, but the restaurant manager (judge) worries this could raise costs and complicate inventory if the alternative suppliers have less reliable delivery schedules.",
      ask:
        "The restaurant manager (judge) wants you to weigh these purchasing factors and recommend an approach to sourcing more sustainably.",
      location: "the manager's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What sustainability factor would you prioritize first without blowing up costs?",
      "How would you manage inventory risk if a new supplier's delivery schedule is less reliable?",
    ],
  },
  {
    title: "A Foodborne Illness Scare at Skyline Quick Bites",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:374", description: "Explain the nature of pathogens" },
      { code: "PD:375", description: "Identify types of harmful bacteria" },
      { code: "PD:380", description: "Identify foodborne illnesses and their causes" },
      { code: "PD:381", description: "Identify conditions affecting the rate of multiplication in bacteria" },
      { code: "PD:387", description: "Describe strategies for preventing bacteria multiplication in food" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "Two customers reported getting sick after eating at this location over the weekend, and the restaurant manager (judge) needs to understand what could have gone wrong and respond to health authorities credibly.",
      ask:
        "The restaurant manager (judge) wants you to explain what conditions could have led to this and what preventive steps should be reinforced immediately.",
      location: "the manager's office",
      greetingAsk: "to hear your assessment",
    }),
    judgeQuestions: [
      "What conditions in a kitchen typically allow bacteria to multiply to dangerous levels?",
      "What would you reinforce with the crew immediately to prevent a repeat?",
    ],
  },
  {
    title: "An Allergic Reaction Incident at Skyline Quick Bites",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:382", description: "Identify common food allergies" },
      { code: "PD:383", description: "Identify common food intolerances" },
      { code: "PD:384", description: "Describe consequences of exposure to food allergens" },
      { code: "PD:385", description: "Describe consequences of exposure to food intolerances" },
      { code: "PD:386", description: "Discuss strategies for preventing exposure to food allergens" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "A customer had a mild allergic reaction after a sandwich was made on a surface that had just handled a different item containing a common allergen, and the restaurant manager (judge) needs to review cross-contact prevention with the whole crew.",
      ask:
        "The restaurant manager (judge) wants you to explain what went wrong and propose how to prevent allergen cross-contact going forward.",
      location: "the kitchen line",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What specifically caused this allergen cross-contact?",
      "What strategy would you put in place to prevent this from happening again?",
    ],
  },
  {
    title: "A Food Safety Review of Receiving and Storage at Skyline Quick Bites",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:391", description: "Identify food-safety warning signs observable during the receiving and storing processes" },
      { code: "PD:392", description: "Identify food-safety warning signs observable during the storing process" },
      { code: "PD:393", description: "Identify food-safety warning signs observable during the serving process" },
      { code: "PD:394", description: "Explain the purpose of temperature probes" },
      { code: "PD:388", description: "Describe the effect of water characteristics on food safety and sanitation" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "A recent delivery was accepted and stored without anyone checking it closely, and the restaurant manager (judge) later noticed some packaging looked damaged, worrying that warning signs are being missed at receiving.",
      ask:
        "The restaurant manager (judge) wants you to walk through what warning signs should be checked at receiving, storing, and serving.",
      location: "the kitchen line",
      greetingAsk: "to hear your review",
    }),
    judgeQuestions: [
      "What warning signs should have been caught when this delivery arrived?",
      "What's the purpose of a temperature probe in catching problems like this?",
    ],
  },
  {
    title: "Talking Career Paths with a Crew Member at Skyline Quick Bites",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:395", description: "Explain employment opportunities in the foodservice industry" },
      { code: "PD:396", description: "Describe culinary certifications" },
      { code: "PD:397", description: "Explain restaurant-management certifications" },
      { code: "PD:398", description: "Explain the roles and responsibilities of hospitality and tourism organizations" },
      { code: "PD:399", description: "Describe the interdependence of segments of the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "A reliable crew member has mentioned wanting to move up into management someday, and the restaurant manager (judge) wants you to have a real conversation with them about what that path could look like.",
      ask:
        "The restaurant manager (judge) wants you to explain the career opportunities and certifications available in this industry to this crew member.",
      location: "the manager's office",
      greetingAsk: "to hear how you'd have this conversation",
    }),
    judgeQuestions: [
      "What certification would you point this crew member toward first?",
      "How would you explain the range of opportunities in this industry beyond just this one restaurant?",
    ],
  },
  {
    title: "Rolling Out a New Ordering System at Skyline Quick Bites",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:306", description: "Explain the role of restaurant management systems" },
      { code: "NF:308", description: "Utilize restaurant management system applications" },
      { code: "NF:309", description: "Describe system integration challenges in restaurant management" },
      { code: "NF:310", description: "Assess trends affecting food preparation" },
      { code: "NF:313", description: "Describe the impact of mobile technology on the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "Corporate is rolling out a new mobile ordering and kitchen-display system chain-wide, and the restaurant manager (judge) is worried it won't integrate well with the current point-of-sale system and will confuse the crew during the transition.",
      ask:
        "The restaurant manager (judge) wants you to think through this rollout and how to manage the integration and training challenges.",
      location: "the manager's office",
      greetingAsk: "to hear your rollout plan",
    }),
    judgeQuestions: [
      "What integration challenge would you anticipate with this new system?",
      "How would you train the crew so mobile orders don't get lost or delayed?",
    ],
  },
  {
    title: "Using Loyalty App Data to Improve the Menu at Skyline Quick Bites",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:279", description: "Explain the need for hospitality and tourism business information" },
      { code: "NF:280", description: "Identify information monitored for business decision making" },
      { code: "NF:284", description: "Obtain business information from customer databases" },
      { code: "NF:285", description: "Identify challenges with the use of unstructured business data" },
      { code: "NF:288", description: "Monitor hospitality and tourism sales data" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "The restaurant manager (judge) has access to a year of loyalty-app order data but has never actually used it for anything beyond sending occasional coupons, and wants to know if it could inform menu decisions.",
      ask:
        "The restaurant manager (judge) wants you to explain how this data could be used and what challenges to expect in working with it.",
      location: "the manager's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What kind of menu decision could this loyalty data actually inform?",
      "What challenge would you expect in working with this kind of raw order data?",
    ],
  },
  {
    title: "Managing the Lunch Rush Chaos at Skyline Quick Bites",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:038", description: "Identify strategies to manage customer experience during peaks in demand" },
      { code: "CR:039", description: "Maintain service standards during peaks in demand" },
      { code: "CR:065", description: "Identify customer dynamics affecting food establishments" },
      { code: "CR:066", description: "Describe strategies for managing customer dynamics" },
      { code: "CR:067", description: "Explain the importance of meeting and exceeding customer/guest expectations" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "The lunch rush regularly overwhelms the counter, with impatient customers, mixed-up orders, and a line stretching out the door, and the restaurant manager (judge) wants a real strategy for managing this peak rather than just hoping the crew keeps up.",
      ask:
        "The restaurant manager (judge) wants you to propose strategies for managing customer experience and service standards during this peak.",
      location: "the front counter",
      greetingAsk: "to hear your plan",
    }),
    judgeQuestions: [
      "What's one strategy that would meaningfully improve this rush without adding staff?",
      "How do you maintain service standards when everyone's moving as fast as possible?",
    ],
  },
  {
    title: "Recovering a Guest After a Wrong Order at Skyline Quick Bites",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:043", description: "Describe customer-service challenges in the hospitality and tourism industry" },
      { code: "CR:044", description: "Resolve hospitality and tourism related conflicts for customers" },
      { code: "CR:045", description: "Explain the nature of guest recovery" },
      { code: "CR:046", description: "Determine strategies for resolving customer-service situations" },
      { code: "CR:049", description: "Explain the nature of customer service in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "A customer drove off with the wrong order, came back frustrated after realizing it at home, and is now at the counter demanding a full refund plus something extra for the trouble.",
      ask:
        "The restaurant manager (judge) wants you to walk through how you'd recover this guest's experience and resolve the situation fairly.",
      location: "the front counter",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What does fair guest recovery look like here without overcorrecting?",
      "How would you make sure this doesn't happen again on a busy shift?",
    ],
  },
  {
    title: "Accommodating a Dietary Request at the Counter at Skyline Quick Bites",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:021", description: "Process customer/guest orders" },
      { code: "CR:028", description: "Use digital media to enhance customer post-sales experience" },
      { code: "CR:052", description: "Identify factors associated with positive customer experiences" },
      { code: "CR:053", description: "Anticipate unspoken customer needs" },
      { code: "CR:054", description: "Accommodate special needs/specific requests of customers" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "A customer at the counter is trying to figure out what she can order given a gluten sensitivity, and the crew member helping her doesn't seem confident about which menu items are actually safe.",
      ask:
        "The restaurant manager (judge) wants you to walk through how you'd help this customer and what training gap this reveals.",
      location: "the front counter",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What would you do right now to help this customer confidently?",
      "What training gap does this reveal that needs fixing?",
    ],
  },
  {
    title: "Redesigning the Menu for New Nutrition Guidelines at Skyline Quick Bites",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:306", description: "Describe the uses of grades and standards in foodservice" },
      { code: "PM:307", description: "Determine effect of changes in nutritional guidelines" },
      { code: "PM:308", description: "Discuss the nature of the menu as a management tool" },
      { code: "PM:313", description: "Describe foodservice branding strategies (e.g., retail-item, restaurant, in-house/signature, branded concept)" },
      { code: "PM:317", description: "Describe the role of customer voice in hospitality and tourism branding" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "New local nutritional-disclosure requirements mean the menu board needs updating, and the restaurant manager (judge) sees this as a chance to also rethink which items are actually worth featuring based on customer feedback.",
      ask:
        "The restaurant manager (judge) wants you to propose how the menu should be reorganized to meet these requirements and reflect what customers actually want.",
      location: "the manager's office",
      greetingAsk: "to hear your menu proposal",
    }),
    judgeQuestions: [
      "How would you use the menu itself as a management tool beyond just listing items?",
      "What customer feedback would you weigh most in deciding what to feature?",
    ],
  },
  {
    title: "Adding a New Value-Meal Bundle at Skyline Quick Bites",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:021", description: "Explain the nature of product/service branding" },
      { code: "PM:041", description: "Describe the nature of product bundling" },
      { code: "PM:099", description: "Explain the nature of product extensions in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "Corporate wants each location to test a new value-meal bundle, and the restaurant manager (judge) needs to decide which existing items to pair together in a way that feels like a genuine deal rather than just repackaging slow sellers.",
      ask:
        "The restaurant manager (judge) wants you to propose this bundle and how it should be branded on the menu.",
      location: "the manager's office",
      greetingAsk: "to hear your bundle proposal",
    }),
    judgeQuestions: [
      "How would you make sure this bundle doesn't just look like a way to move slow sellers?",
      "How would you brand this bundle to make it stand out on the menu?",
    ],
  },
  {
    title: "Training the Counter Team on Suggestive Selling at Skyline Quick Bites",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:149", description: "Process complimentary offers and coupons/discounts" },
      { code: "SE:220", description: "Explain factors that motivate people to choose a hospitality and tourism site" },
      { code: "SE:221", description: "Recommend hospitality and tourism services" },
      { code: "SE:476", description: "Up-sell to enhance customer experience" },
      { code: "SE:932", description: "Explain company selling policies" },
    ],
    eventSituation: buildSituation({
      role: "a senior crew member",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "Average order size has been flat for months, and the restaurant manager (judge) believes the counter team isn't confidently suggesting add-ons like drink upgrades or sides, worried it will slow down the line.",
      ask:
        "The restaurant manager (judge) wants you to design quick, natural suggestive-selling training that doesn't add time to each order.",
      location: "the front counter",
      greetingAsk: "to hear your training approach",
    }),
    judgeQuestions: [
      "How do you suggest an add-on without slowing down a fast-paced counter interaction?",
      "What's one selling policy the team needs to understand for handling coupons correctly?",
    ],
  },
  {
    title: "Building Repeat Customers in a Fast-Food Setting at Skyline Quick Bites",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:499", description: "Establish relationship with hospitality and tourism customer/guest" },
      { code: "SE:500", description: "Determine hospitality and tourism customer/guest needs" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
    ],
    eventSituation: buildSituation({
      role: "a senior crew member",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "The restaurant manager (judge) has noticed most customers are one-time visitors from nearby offices, and wants to understand how a fast-food counter interaction could still build the kind of repeat relationship a sit-down restaurant might.",
      ask:
        "The restaurant manager (judge) wants you to explain how relationship-building applies even in a quick-serve setting.",
      location: "the front counter",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "How can a 30-second counter interaction still build a real relationship with a regular?",
      "What would you tell the team about recognizing and treating regulars differently?",
    ],
  },
  {
    title: "Deciding Whether to Make or Buy a New Sauce at Skyline Quick Bites",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:819", description: "Discuss the use of make-or-buy analysis in food establishments" },
      { code: "FI:820", description: "Describe factors influencing make-or-buy decisions" },
      { code: "FI:821", description: "Calculate food product unit costs" },
      { code: "FI:822", description: "Calculate food product total cost" },
      { code: "FI:823", description: "Calculate standard recipe yield measure" },
    ],
    eventSituation: buildSituation({
      role: "the shift lead",
      company: "SKYLINE QUICK BITES",
      judgeRole: "the restaurant manager",
      problem:
        "A new signature sauce could either be made in-house from a recipe or purchased pre-made from a supplier at a set cost per unit, and the restaurant manager (judge) needs the numbers worked out before deciding which way to go.",
      ask:
        "The restaurant manager (judge) wants you to calculate and compare the costs of both options and recommend which makes more sense.",
      location: "the manager's office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What factors beyond just unit cost should go into this make-or-buy decision?",
      "What would you recommend, and why?",
    ],
  },
];

const QSR_EVENT: EventCaseStudySeed = {
  eventSlug: "quick-serve-restaurant-management-series",
  eventName: "Quick Serve Restaurant Management Series",
  careerCluster: "Hospitality and Tourism",
  careerPathway: "Restaurant Management",
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: QSR_CASES,
};

// ---------------------------------------------------------------------------
// restaurant-and-food-service-management-series (SERIES, Restaurant Management pathway)
// ---------------------------------------------------------------------------
const RFSM_CASES: CaseStudySeed[] = [
  {
    title: "A Table-Turn Bottleneck on a Busy Friday at The Copper Kettle",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:617", description: "Identify factors affecting wait time" },
      { code: "OP:618", description: "Describe strategies for managing table turns" },
      { code: "OP:620", description: "Identify quality-control measures in food establishments" },
      { code: "OP:621", description: "Utilize quality control methods in food establishments" },
      { code: "OP:596", description: "Analyze the cause of accidents" },
    ],
    eventSituation: buildSituation({
      role: "the floor manager",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "Friday night wait times have grown past 45 minutes even with several tables sitting empty for extended periods after guests finish eating, and the general manager (judge) suspects servers aren't turning tables efficiently.",
      ask:
        "The general manager (judge) wants you to identify what's slowing table turns and propose strategies to fix it without rushing guests.",
      location: "the dining room",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What's likely causing tables to sit empty-but-occupied for so long?",
      "How do you speed up turns without making guests feel rushed?",
    ],
  },
  {
    title: "A Health Inspection Prep Review at The Copper Kettle",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:582", description: "Discuss the role of personal hygiene in food safety" },
      { code: "OP:601", description: "Monitor food temperatures" },
      { code: "OP:604", description: "Store foods properly" },
      { code: "OP:605", description: "Identify critical control points" },
      { code: "OP:610", description: "Adjust equipment/workstations to prevent cross-contamination" },
    ],
    eventSituation: buildSituation({
      role: "the kitchen supervisor",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "A routine health inspection is scheduled for next week, and the general manager (judge) wants a real walkthrough of critical control points in the kitchen rather than a last-minute scramble the night before.",
      ask:
        "The general manager (judge) wants you to identify the critical control points and any gaps in current storage or workstation setup.",
      location: "the kitchen",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What critical control point in this kitchen concerns you most right now?",
      "What would you fix first to prevent cross-contamination?",
    ],
  },
  {
    title: "A Fire Hazard Found During a Line Check at The Copper Kettle",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:592", description: "Identify physical hazards" },
      { code: "OP:593", description: "Assess fire hazards" },
      { code: "OP:594", description: "Identify fire prevention strategies" },
      { code: "OP:595", description: "Identify equipment safety requirements" },
      { code: "OP:657", description: "Provide first-aid" },
    ],
    eventSituation: buildSituation({
      role: "the kitchen supervisor",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "During a routine line check, you noticed grease buildup near the range hood that looks like a real fire risk, and the general manager (judge) wants this addressed immediately along with a broader safety review.",
      ask:
        "The general manager (judge) wants you to assess this fire hazard and identify fire-prevention and equipment-safety steps going forward.",
      location: "the kitchen",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What should happen with this grease buildup right now?",
      "What fire-prevention routine should be added to regular kitchen checks?",
    ],
  },
  {
    title: "A Sanitation Lapse Found in the Dish Pit at The Copper Kettle",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:630", description: "Distinguish among cleaning, sterilizing, and sanitizing" },
      { code: "OP:631", description: "Label cleaning/sanitation solutions" },
      { code: "OP:632", description: "Follow sanitization procedures" },
      { code: "OP:633", description: "Mix cleaning/sanitation solutions" },
      { code: "OP:634", description: "Determine cleaning requirements" },
    ],
    eventSituation: buildSituation({
      role: "the kitchen supervisor",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "The dish pit's sanitizer concentration hasn't been tested in days, and the general manager (judge) discovered the test strips were sitting unused in a drawer, meaning dishes may not have been properly sanitized during that stretch.",
      ask:
        "The general manager (judge) wants you to explain the correct sanitization procedure and how to make sure this testing doesn't get skipped again.",
      location: "the dish pit",
      greetingAsk: "to hear how you'd fix this",
    }),
    judgeQuestions: [
      "What should have happened with this sanitizer testing that clearly didn't?",
      "How would you build a routine that makes sure this never gets skipped again?",
    ],
  },
  {
    title: "Reviewing Food Waste in the Kitchen at The Copper Kettle",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:622", description: "Identify common sources of food loss" },
      { code: "OP:623", description: "Describe strategies for reducing food loss" },
      { code: "OP:629", description: "Dispose of food and food by-products" },
      { code: "OP:643", description: "Identify factors influencing food and beverage purchasing decisions" },
      { code: "OP:644", description: "Identify sustainability factors affecting the purchase of food and nonfood products" },
    ],
    eventSituation: buildSituation({
      role: "the kitchen supervisor",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "The general manager (judge) has noticed the walk-in cooler regularly has produce going bad before it's used, and wants to understand where food loss is happening and how purchasing decisions could reduce it.",
      ask:
        "The general manager (judge) wants you to identify the sources of this food loss and propose purchasing and prep changes to reduce it.",
      location: "the kitchen",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "Where in the current process is food most likely being lost?",
      "What purchasing change would you recommend to reduce this waste?",
    ],
  },
  {
    title: "Managing Inventory Shrinkage in the Bar at The Copper Kettle",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:336", description: "Discuss types of inventory" },
      { code: "OP:407", description: "Maintain inventory levels" },
      { code: "OP:415", description: "Determine inventory shrinkage" },
      { code: "OP:489", description: "Describe strategies to minimize the cost of maintaining inventory" },
      { code: "OP:250", description: "Describe types of purchase orders" },
    ],
    eventSituation: buildSituation({
      role: "the floor manager",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "Liquor inventory counts at the bar have consistently come up short of what sales records would suggest, and the general manager (judge) isn't sure whether this is over-pouring, waste, theft, or a counting error.",
      ask:
        "The general manager (judge) wants you to investigate this shrinkage and recommend how to tighten inventory control.",
      location: "the bar",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What would you check first to narrow down the cause of this shrinkage?",
      "What inventory control would you put in place to catch this faster next time?",
    ],
  },
  {
    title: "A Foodborne Illness Complaint at The Copper Kettle",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:374", description: "Explain the nature of pathogens" },
      { code: "PD:375", description: "Identify types of harmful bacteria" },
      { code: "PD:380", description: "Identify foodborne illnesses and their causes" },
      { code: "PD:381", description: "Identify conditions affecting the rate of multiplication in bacteria" },
      { code: "PD:387", description: "Describe strategies for preventing bacteria multiplication in food" },
    ],
    eventSituation: buildSituation({
      role: "the kitchen supervisor",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "A party of four called to report getting sick after dining last night, and the general manager (judge) needs to determine what in the kitchen's process could have allowed this and respond credibly to the complaint.",
      ask:
        "The general manager (judge) wants you to explain what conditions could have caused this and what to reinforce with the kitchen team.",
      location: "the kitchen",
      greetingAsk: "to hear your assessment",
    }),
    judgeQuestions: [
      "What conditions in this kitchen could allow bacteria to multiply to dangerous levels?",
      "What would you reinforce with the team immediately after this complaint?",
    ],
  },
  {
    title: "An Allergy Incident During Service at The Copper Kettle",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:382", description: "Identify common food allergies" },
      { code: "PD:383", description: "Identify common food intolerances" },
      { code: "PD:384", description: "Describe consequences of exposure to food allergens" },
      { code: "PD:385", description: "Describe consequences of exposure to food intolerances" },
      { code: "PD:386", description: "Discuss strategies for preventing exposure to food allergens" },
    ],
    eventSituation: buildSituation({
      role: "the floor manager",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "A guest with a shellfish allergy had a reaction after a dish was prepared using a pan that had just cooked shrimp, despite her server noting the allergy at the table, and the general manager (judge) needs to review how allergy information is communicated to the kitchen.",
      ask:
        "The general manager (judge) wants you to identify what broke down in this communication and propose a process to prevent it.",
      location: "the dining room",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "Where did the communication break down between the server and the kitchen?",
      "What process would you put in place to make sure allergy information is never missed?",
    ],
  },
  {
    title: "Reviewing Table-Service Standards at The Copper Kettle",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:366", description: "Differentiate among segments of the culinary and foodservice operations industry" },
      { code: "PD:367", description: "Discuss types of table service" },
      { code: "PD:368", description: "Identify types of food service in different segments of the culinary and foodservice operations industry" },
      { code: "PD:369", description: "Identify domestic cuisines" },
      { code: "PD:400", description: "Discuss the role of ethics in hospitality and tourism" },
    ],
    eventSituation: buildSituation({
      role: "a senior server",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "Two new servers have inconsistent table-service habits, one plating from the wrong side, another rushing courses out of order, and the general manager (judge) wants a proper refresher on service standards for the whole floor team.",
      ask:
        "The general manager (judge) wants you to put together a training refresher on proper table service standards.",
      location: "the dining room",
      greetingAsk: "to hear your training plan",
    }),
    judgeQuestions: [
      "What's one table-service standard that's most commonly overlooked by new servers?",
      "How would you deliver this refresher without singling anyone out?",
    ],
  },
  {
    title: "Talking Career Paths with a Line Cook at The Copper Kettle",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:395", description: "Explain employment opportunities in the foodservice industry" },
      { code: "PD:396", description: "Describe culinary certifications" },
      { code: "PD:397", description: "Explain restaurant-management certifications" },
      { code: "PD:398", description: "Explain the roles and responsibilities of hospitality and tourism organizations" },
      { code: "PD:399", description: "Describe the interdependence of segments of the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the kitchen supervisor",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "A talented line cook has mentioned wanting to eventually become a sous chef or open their own place someday, and the general manager (judge) wants you to have a real conversation about the career paths and certifications available.",
      ask:
        "The general manager (judge) wants you to explain the career opportunities and certifications relevant to this cook's goals.",
      location: "the kitchen",
      greetingAsk: "to hear how you'd have this conversation",
    }),
    judgeQuestions: [
      "What certification would you point this cook toward first?",
      "How would you explain the range of paths available beyond just working the line?",
    ],
  },
  {
    title: "Choosing a New Reservation System at The Copper Kettle",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:306", description: "Explain the role of restaurant management systems" },
      { code: "NF:307", description: "Discuss online reservation systems" },
      { code: "NF:308", description: "Utilize restaurant management system applications" },
      { code: "NF:309", description: "Describe system integration challenges in restaurant management" },
      { code: "NF:313", description: "Describe the impact of mobile technology on the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the floor manager",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "The current reservation book is still handwritten, leading to double-bookings on busy nights, and the general manager (judge) is considering an online reservation system but worries about how it would integrate with the existing point-of-sale.",
      ask:
        "The general manager (judge) wants you to explain what to look for in this system and how to manage the integration transition.",
      location: "the host stand",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What integration challenge would you anticipate moving off a handwritten book?",
      "What would you look for in a reservation system given how mobile-first guests are now?",
    ],
  },
  {
    title: "Using Sales Data to Adjust the Menu at The Copper Kettle",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:288", description: "Monitor hospitality and tourism sales data" },
      { code: "NF:289", description: "Display hospitality and tourism data in charts/graphs or in tables" },
      { code: "NF:310", description: "Assess trends affecting food preparation" },
      { code: "NF:311", description: "Evaluate trends affecting food presentation" },
      { code: "NF:312", description: "Analyze trends in food habits/preferences" },
    ],
    eventSituation: buildSituation({
      role: "the floor manager",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "The general manager (judge) suspects a few menu items are underperforming and taking up kitchen bandwidth that could go toward better sellers, but has never actually pulled sales data to confirm which items to cut.",
      ask:
        "The general manager (judge) wants you to analyze sales data and present findings on which items should stay, change, or go.",
      location: "the manager's office",
      greetingAsk: "to hear your analysis",
    }),
    judgeQuestions: [
      "How would you present this sales data to make the case for cutting an item clearly?",
      "What food trend would you factor into deciding what replaces a cut item?",
    ],
  },
  {
    title: "Handling a Large Party During Peak Hours at The Copper Kettle",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:038", description: "Identify strategies to manage customer experience during peaks in demand" },
      { code: "CR:039", description: "Maintain service standards during peaks in demand" },
      { code: "CR:062", description: "Provide table service" },
      { code: "CR:063", description: "Provide beverage service" },
      { code: "CR:067", description: "Explain the importance of meeting and exceeding customer/guest expectations" },
    ],
    eventSituation: buildSituation({
      role: "the floor manager",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "A party of 14 arrived without a reservation during Saturday's peak dinner rush, and seating and serving them properly risks slowing service for every other table in the section.",
      ask:
        "The general manager (judge) wants you to walk through how you'd handle this large party while maintaining standards for everyone else.",
      location: "the dining room",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "How would you structure service for this large party without neglecting other tables?",
      "What would you tell the assigned server about managing beverage service for a group this size?",
    ],
  },
  {
    title: "Recovering a Guest After a Long Wait at The Copper Kettle",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:043", description: "Describe customer-service challenges in the hospitality and tourism industry" },
      { code: "CR:044", description: "Resolve hospitality and tourism related conflicts for customers" },
      { code: "CR:045", description: "Explain the nature of guest recovery" },
      { code: "CR:046", description: "Determine strategies for resolving customer-service situations" },
      { code: "CR:049", description: "Explain the nature of customer service in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the floor manager",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "A couple celebrating an anniversary waited nearly an hour past their reservation time with no update from staff, and they're now at the host stand, frustrated and considering leaving.",
      ask:
        "The general manager (judge) wants you to walk through how you'd recover this couple's experience and resolve the situation.",
      location: "the host stand",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What does real guest recovery look like for a special occasion like this?",
      "What would you change about how wait updates are communicated to avoid this next time?",
    ],
  },
  {
    title: "Accommodating a Special Dietary Group at The Copper Kettle",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:021", description: "Process customer/guest orders" },
      { code: "CR:052", description: "Identify factors associated with positive customer experiences" },
      { code: "CR:053", description: "Anticipate unspoken customer needs" },
      { code: "CR:054", description: "Accommodate special needs/specific requests of customers" },
      { code: "CR:065", description: "Identify customer dynamics affecting food establishments" },
    ],
    eventSituation: buildSituation({
      role: "the floor manager",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "A reserved group of eight includes several guests with different dietary restrictions, vegan, gluten-free, and a shellfish allergy, and the server assigned to the table seems overwhelmed trying to track it all.",
      ask:
        "The general manager (judge) wants you to walk through how you'd support this table to make sure every guest's needs are met accurately.",
      location: "the dining room",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "How would you help this server track multiple dietary needs at one table accurately?",
      "What would you anticipate this group needing that they might not think to ask for?",
    ],
  },
  {
    title: "Rebranding the Menu as a Signature Concept at The Copper Kettle",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:308", description: "Discuss the nature of the menu as a management tool" },
      { code: "PM:313", description: "Describe foodservice branding strategies (e.g., retail-item, restaurant, in-house/signature, branded concept)" },
      { code: "PM:317", description: "Describe the role of customer voice in hospitality and tourism branding" },
      { code: "PM:206", description: "Explain the nature of corporate branding" },
      { code: "PM:246", description: "Identify product's/service's competitive advantage" },
    ],
    eventSituation: buildSituation({
      role: "the floor manager",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "THE COPPER KETTLE's menu has grown to over 40 items with no clear identity, and the general manager (judge) wants to reposition it as a signature concept restaurant with a tighter, more distinctive menu.",
      ask:
        "The general manager (judge) wants you to propose how to rebrand the menu around a clearer competitive advantage.",
      location: "the manager's office",
      greetingAsk: "to hear your rebrand proposal",
    }),
    judgeQuestions: [
      "What's our real competitive advantage that this rebrand should lean into?",
      "How would you use customer voice to decide what stays on this tighter menu?",
    ],
  },
  {
    title: "Adding a Catering Service Line at The Copper Kettle",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:041", description: "Describe the nature of product bundling" },
      { code: "PM:095", description: "Describe services offered by the hospitality and tourism industry" },
      { code: "PM:099", description: "Explain the nature of product extensions in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the floor manager",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "Several regular guests have asked whether THE COPPER KETTLE offers catering for private events, and the general manager (judge) is considering adding this as a new service line but is unsure how it fits alongside the dine-in business.",
      ask:
        "The general manager (judge) wants you to propose how catering would fit the product mix and what bundled packages might look like.",
      location: "the manager's office",
      greetingAsk: "to hear your proposal",
    }),
    judgeQuestions: [
      "How would this catering line need to be staffed without pulling from dine-in service?",
      "What would a bundled catering package actually include?",
    ],
  },
  {
    title: "Training Servers on Wine Recommendations at The Copper Kettle",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:220", description: "Explain factors that motivate people to choose a hospitality and tourism site" },
      { code: "SE:221", description: "Recommend hospitality and tourism services" },
      { code: "SE:476", description: "Up-sell to enhance customer experience" },
      { code: "SE:499", description: "Establish relationship with hospitality and tourism customer/guest" },
      { code: "SE:500", description: "Determine hospitality and tourism customer/guest needs" },
    ],
    eventSituation: buildSituation({
      role: "a senior server",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "Wine sales are noticeably lower than industry benchmarks for a restaurant this size, and the general manager (judge) suspects servers default to whatever guests ask for rather than confidently recommending pairings.",
      ask:
        "The general manager (judge) wants you to design training that builds confidence in recommending wine pairings without feeling pushy.",
      location: "the dining room",
      greetingAsk: "to hear your training approach",
    }),
    judgeQuestions: [
      "How would you teach servers to read what a guest actually wants before recommending a wine?",
      "What would make a wine recommendation feel helpful rather than like an upsell?",
    ],
  },
  {
    title: "Building a Private Event Sales Process at The Copper Kettle",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
    ],
    eventSituation: buildSituation({
      role: "the floor manager",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "Private event inquiries for the back dining room have been coming in more often, but there's no consistent sales process, sometimes the host handles it, sometimes a manager, and no one follows up the same way twice.",
      ask:
        "The general manager (judge) wants you to design a consistent selling process for private events that builds repeat corporate and celebration clients.",
      location: "the manager's office",
      greetingAsk: "to hear your process design",
    }),
    judgeQuestions: [
      "What information should always be gathered on the first inquiry call?",
      "What would you build into this process to encourage repeat private-event bookings?",
    ],
  },
  {
    title: "Deciding Whether to Make or Buy Desserts at The Copper Kettle",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:819", description: "Discuss the use of make-or-buy analysis in food establishments" },
      { code: "FI:820", description: "Describe factors influencing make-or-buy decisions" },
      { code: "FI:824", description: "Calculate per plate costs" },
      { code: "FI:825", description: "Calculate per person buffet/salad bar costs" },
      { code: "FI:823", description: "Calculate standard recipe yield measure" },
    ],
    eventSituation: buildSituation({
      role: "the kitchen supervisor",
      company: "THE COPPER KETTLE",
      judgeRole: "the general manager",
      problem:
        "The pastry chef just left, and the general manager (judge) is deciding whether to hire a replacement to keep making desserts in-house or switch to a wholesale bakery supplier, and needs the real per-plate cost comparison before deciding.",
      ask:
        "The general manager (judge) wants you to calculate and compare these costs and recommend which direction to take.",
      location: "the kitchen",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What non-cost factors should weigh into this make-or-buy decision?",
      "What would you recommend, and why?",
    ],
  },
];

const RFSM_EVENT: EventCaseStudySeed = {
  eventSlug: "restaurant-and-food-service-management-series",
  eventName: "Restaurant and Food Service Management Series",
  careerCluster: "Hospitality and Tourism",
  careerPathway: "Restaurant Management",
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: RFSM_CASES,
};

export const HOSPITALITY_CASE_STUDY_SEED: EventCaseStudySeed[] = [HLM_EVENT, QSR_EVENT, RFSM_EVENT];
