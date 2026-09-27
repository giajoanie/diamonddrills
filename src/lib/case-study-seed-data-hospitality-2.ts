/**
 * Remaining Hospitality and Tourism cluster case studies: the Principles
 * event (Core PIs) and the two TDM events plus Professional Selling, which
 * share one 123-row Cluster-tier PI pool since none of the three name a
 * Tier 3 pathway. Performance indicators are pulled verbatim from this
 * app's own seeded PerformanceIndicator rows.
 */
import { buildSituation } from "./case-study-scenario-builder";
import type { CaseStudySeed, EventCaseStudySeed } from "./case-study-seed-data";

// ---------------------------------------------------------------------------
// hospitality-services-team-decision-making (TDM, shared 123-code pool)
// ---------------------------------------------------------------------------
const HSTDM_CASES: CaseStudySeed[] = [
  {
    title: "Selling a Spa Package to a Hesitant Guest at Marlowe Resort & Spa",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:220", description: "Explain factors that motivate people to choose a hospitality and tourism site" },
      { code: "SE:221", description: "Recommend hospitality and tourism services" },
      { code: "SE:499", description: "Establish relationship with hospitality and tourism customer/guest" },
      { code: "SE:500", description: "Determine hospitality and tourism customer/guest needs" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the spa director",
      problem:
        "A guest checking in mentioned she's \"not really a spa person\" but seemed curious when asked about it, and the spa director (judge) wants your team to figure out how to turn that curiosity into an actual booking without being pushy.",
      ask:
        "The spa director (judge) wants your team to walk through how you'd determine this guest's real needs and recommend a package that fits.",
      location: "the spa reception desk",
      greetingAsk: "to hear your team's approach",
    }),
    judgeQuestions: [
      "How would your team figure out what's actually holding this guest back?",
      "What package would you recommend, and why that one specifically?",
    ],
  },
  {
    title: "Training on Up-Selling and Special Requests at Marlowe Resort & Spa",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:476", description: "Up-sell to enhance customer experience" },
      { code: "SE:477", description: "Process telephone orders in hospitality and tourism" },
      { code: "SE:478", description: "Process special orders in hospitality and tourism" },
      { code: "SE:479", description: "Sell gift certificates in hospitality and tourism" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the spa director",
      problem:
        "New front-desk staff are handling phone bookings and gift-certificate sales inconsistently, some up-sell naturally, others just process the base request, and the spa director (judge) wants a real training standard.",
      ask:
        "The spa director (judge) wants your team to design training covering phone orders, special requests, gift certificates, and appropriate up-selling.",
      location: "the spa reception desk",
      greetingAsk: "to hear your team's training plan",
    }),
    judgeQuestions: [
      "What would your team teach about up-selling that feels natural rather than scripted?",
      "What selling policy matters most for staff to understand before their first phone booking?",
    ],
  },
  {
    title: "Handling Complimentary Offers Fairly at Marlowe Resort & Spa",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:149", description: "Process complimentary offers and coupons/discounts" },
      { code: "SE:329", description: "Process sales transactions (e.g., cash, credit, check)" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:220", description: "Explain factors that motivate people to choose a hospitality and tourism site" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the spa director",
      problem:
        "A guest is requesting a complimentary treatment upgrade, claiming a staff member promised it verbally last visit, but there's no record of that promise, and the spa director (judge) needs a consistent way to handle requests like this.",
      ask:
        "The spa director (judge) wants your team to propose how to handle this request and how to process complimentary offers more consistently going forward.",
      location: "the spa reception desk",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "How would your team handle this specific guest's request fairly?",
      "What would you put in place so this kind of undocumented promise doesn't happen again?",
    ],
  },
  {
    title: "Managing Peak Season Guest Experience at Marlowe Resort & Spa",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:038", description: "Identify strategies to manage customer experience during peaks in demand" },
      { code: "CR:039", description: "Maintain service standards during peaks in demand" },
      { code: "CR:052", description: "Identify factors associated with positive customer experiences" },
      { code: "CR:053", description: "Anticipate unspoken customer needs" },
      { code: "CR:054", description: "Accommodate special needs/specific requests of customers" },
      { code: "CR:055", description: "Deliver positive moments of truth" },
      { code: "CR:067", description: "Explain the importance of meeting and exceeding customer/guest expectations" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "Peak holiday season is starting, and the general manager (judge) is worried that service quality will slip as the resort fills to capacity, the way it did last year when guest satisfaction scores dropped noticeably.",
      ask:
        "The general manager (judge) wants your team to propose strategies for maintaining service standards and creating positive moments even at full capacity.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What went wrong last peak season that your team wants to avoid repeating?",
      "What's one moment of truth your team would focus on creating this season?",
    ],
  },
  {
    title: "Designing a Guest Complaint Recovery Process at Marlowe Resort & Spa",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:043", description: "Describe customer-service challenges in the hospitality and tourism industry" },
      { code: "CR:044", description: "Resolve hospitality and tourism related conflicts for customers" },
      { code: "CR:045", description: "Explain the nature of guest recovery" },
      { code: "CR:046", description: "Determine strategies for resolving customer-service situations" },
      { code: "CR:049", description: "Explain the nature of customer service in the hospitality and tourism industry" },
      { code: "CR:051", description: "Identify factors affecting customer-service practices in hospitality and tourism" },
      { code: "CR:021", description: "Process customer/guest orders" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "Guest complaints have been handled inconsistently, some staff offer discounts immediately, others escalate everything to a manager, leaving guests confused about what to expect when something goes wrong.",
      ask:
        "The general manager (judge) wants your team to design a consistent guest recovery process for the whole team to follow.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's process",
    }),
    judgeQuestions: [
      "What should stay consistent about how complaints are handled, regardless of who's on shift?",
      "When should a complaint actually be escalated versus resolved on the spot?",
    ],
  },
  {
    title: "Modernizing Guest Touchpoints With Digital Media at Marlowe Resort & Spa",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:028", description: "Use digital media to enhance customer post-sales experience" },
      { code: "CR:067", description: "Explain the importance of meeting and exceeding customer/guest expectations" },
      { code: "CR:052", description: "Identify factors associated with positive customer experiences" },
      { code: "CR:053", description: "Anticipate unspoken customer needs" },
      { code: "CR:054", description: "Accommodate special needs/specific requests of customers" },
      { code: "CR:055", description: "Deliver positive moments of truth" },
      { code: "CR:038", description: "Identify strategies to manage customer experience during peaks in demand" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "Guest satisfaction surveys mention the stay felt \"fine but forgettable,\" and the general manager (judge) wants your team to identify small moments during a guest's visit that digital tools could enhance without feeling impersonal.",
      ask:
        "The general manager (judge) wants your team to propose specific digital touchpoints that would create memorable moments.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's ideas",
    }),
    judgeQuestions: [
      "What's one moment during a stay where a digital touch could make it memorable?",
      "How would you avoid this feeling impersonal or gimmicky to guests?",
    ],
  },
  {
    title: "A Safety and Fraud Prevention Review at Marlowe Resort & Spa",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:115", description: "Explain security considerations in the hospitality and tourism industry" },
      { code: "OP:119", description: "Handle emergency situations in hospitality and tourism" },
      { code: "OP:527", description: "Identify factors affecting evacuation procedures/protocols" },
      { code: "OP:657", description: "Provide first-aid" },
      { code: "OP:653", description: "Identify credit card fraud prevention methods" },
      { code: "OP:654", description: "Explain the nature of identity theft controls" },
      { code: "OP:517", description: "Comply with strategies for protecting business' digital assets (e.g., website, social media, email, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the operations team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "A recent fire drill revealed staff weren't clear on evacuation routes for the spa wing, and separately, the front desk flagged a suspicious card transaction that turned out to be fraudulent, prompting the general manager (judge) to want a full safety and fraud-prevention review.",
      ask:
        "The general manager (judge) wants your team to review both issues and recommend improvements.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's recommendations",
    }),
    judgeQuestions: [
      "What would your team fix first about the evacuation procedure gap?",
      "What fraud-prevention step should front desk staff always follow?",
    ],
  },
  {
    title: "An Inventory and Distribution Review at Marlowe Resort & Spa",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:134", description: "Practice safe and sanitary handling/disposal of wastes/recyclables" },
      { code: "OP:184", description: "Track invoices" },
      { code: "OP:250", description: "Describe types of purchase orders" },
      { code: "OP:336", description: "Discuss types of inventory" },
      { code: "OP:522", description: "Explain the nature and scope of distribution" },
      { code: "OP:523", description: "Explain the relationship between customer service and distribution" },
      { code: "OP:529", description: "Explain the concept of place (distribution) in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the operations team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "Spa product inventory (oils, towels, retail items) has been running short unpredictably, and the general manager (judge) suspects the purchase-order and invoice-tracking process isn't giving a clear picture of what's actually on hand.",
      ask:
        "The general manager (judge) wants your team to review this inventory and distribution process and recommend improvements.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's recommendations",
    }),
    judgeQuestions: [
      "What's likely causing this unpredictable inventory shortfall?",
      "How would your team improve invoice tracking to catch this sooner?",
    ],
  },
  {
    title: "A Guest Data Security Incident at Marlowe Resort & Spa",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:518", description: "Comply with strategies to protect digital customer data (e.g., information about customers, customers' credit-card numbers, passwords, customer transactions)" },
      { code: "OP:653", description: "Identify credit card fraud prevention methods" },
      { code: "OP:654", description: "Explain the nature of identity theft controls" },
      { code: "OP:517", description: "Comply with strategies for protecting business' digital assets (e.g., website, social media, email, etc.)" },
      { code: "OP:115", description: "Explain security considerations in the hospitality and tourism industry" },
      { code: "OP:119", description: "Handle emergency situations in hospitality and tourism" },
      { code: "OP:527", description: "Identify factors affecting evacuation procedures/protocols" },
    ],
    eventSituation: buildSituation({
      role: "the operations team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "A booking-software vendor used by the spa just disclosed a security vulnerability that may have exposed some guest payment information, and the general manager (judge) needs to understand the resort's exposure and how to respond to affected guests.",
      ask:
        "The general manager (judge) wants your team to assess this and recommend an appropriate response.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's assessment",
    }),
    judgeQuestions: [
      "What's our exposure here even though this happened at the vendor's system, not ours?",
      "What would your team recommend telling affected guests, and how quickly?",
    ],
  },
  {
    title: "Redesigning the Spa's Product Mix at Marlowe Resort & Spa",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:021", description: "Explain the nature of product/service branding" },
      { code: "PM:041", description: "Describe the nature of product bundling" },
      { code: "PM:081", description: "Explain the concept of product in the hospitality and tourism industry" },
      { code: "PM:095", description: "Describe services offered by the hospitality and tourism industry" },
      { code: "PM:099", description: "Explain the nature of product extensions in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the spa director",
      problem:
        "The spa's treatment menu hasn't changed in three years while a competitor down the road keeps launching seasonal offerings, and the spa director (judge) wants a fresh look at the overall product mix.",
      ask:
        "The spa director (judge) wants your team to propose changes to the product mix, including any new bundled or extended offerings.",
      location: "the spa reception desk",
      greetingAsk: "to hear your team's proposal",
    }),
    judgeQuestions: [
      "What's one new offering your team would add, and why does it fit our brand?",
      "How would you bundle existing services to feel fresh without a full menu overhaul?",
    ],
  },
  {
    title: "Rebranding After a Round of Negative Reviews at Marlowe Resort & Spa",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:206", description: "Explain the nature of corporate branding" },
      { code: "PM:214", description: "Communicate core values of product/service" },
      { code: "PM:239", description: "Evaluate vendors' goods and services" },
      { code: "PM:246", description: "Identify product's/service's competitive advantage" },
      { code: "PM:314", description: "Explain guarantees in hospitality and tourism" },
      { code: "PM:317", description: "Describe the role of customer voice in hospitality and tourism branding" },
      { code: "PM:318", description: "Choose hospitality and tourism vendors" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the spa director",
      problem:
        "Several recent reviews criticize inconsistent product quality, tracing back to a recent switch to a cheaper supplier for spa products, and the spa director (judge) needs to address both the brand perception and the vendor decision.",
      ask:
        "The spa director (judge) wants your team to propose how to address this brand concern and re-evaluate the vendor relationship.",
      location: "the spa reception desk",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would your team do about the vendor relationship that caused this?",
      "How would you communicate this fix to guests who left negative reviews?",
    ],
  },
  {
    title: "Researching the Market Before an Expansion at Marlowe Resort & Spa",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:279", description: "Explain the need for hospitality and tourism business information" },
      { code: "NF:280", description: "Identify information monitored for business decision making" },
      { code: "NF:281", description: "Explain sources of secondary hospitality and tourism information" },
      { code: "NF:282", description: "Explain types of primary hospitality and tourism market information" },
      { code: "NF:283", description: "Describe methods used to collect hospitality and tourism business information (e.g., observations, mail, telephone, Internet, discussion groups, interviews)" },
      { code: "NF:284", description: "Obtain business information from customer databases" },
      { code: "NF:285", description: "Identify challenges with the use of unstructured business data" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "Ownership is considering expanding the spa's footprint with a new wellness wing, and the general manager (judge) wants real market research behind this decision rather than assuming demand exists.",
      ask:
        "The general manager (judge) wants your team to propose what business information should be gathered and how, before committing to this expansion.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's research plan",
    }),
    judgeQuestions: [
      "What primary information would your team want to collect directly from current guests?",
      "What challenge would you expect in using our existing customer database for this?",
    ],
  },
  {
    title: "Presenting Quarterly Performance to Ownership at Marlowe Resort & Spa",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:286", description: "Obtain hospitality and tourism information from online sources (e.g., search engines, online databases, blogs, forums, listservs, web analytics, social media, geolocation services)" },
      { code: "NF:287", description: "Track environmental changes that impact hospitality and tourism (e.g., technological changes, guest trends, economic changes, regulatory changes)" },
      { code: "NF:288", description: "Monitor hospitality and tourism sales data" },
      { code: "NF:289", description: "Display hospitality and tourism data in charts/graphs or in tables" },
      { code: "NF:290", description: "Prepare and use presentation software to aid in making oral reports" },
      { code: "NF:291", description: "Present hospitality and tourism findings orally" },
      { code: "NF:292", description: "Prepare written reports for hospitality and tourism decision-making" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "Ownership wants a quarterly performance presentation covering sales trends and broader industry changes, and the general manager (judge) has only ever sent a spreadsheet before, never an actual presentation.",
      ask:
        "The general manager (judge) wants your team to outline what this presentation should include and how the data should be displayed.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's presentation outline",
    }),
    judgeQuestions: [
      "What industry trend would your team highlight as most relevant to ownership right now?",
      "How would you display this sales data to make the story clear at a glance?",
    ],
  },
  {
    title: "Reorganizing the Management Team at Marlowe Resort & Spa",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "SM:063", description: "Discuss the nature of managerial planning" },
      { code: "SM:064", description: "Explain managerial considerations in organizing" },
      { code: "SM:065", description: "Describe managerial considerations in staffing" },
      { code: "SM:066", description: "Discuss managerial considerations in directing" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "The resort is adding a new wellness wing and needs to reorganize management responsibilities to cover it, while also launching a promotional campaign to announce the expansion to past guests.",
      ask:
        "The general manager (judge) wants your team to propose both the management reorganization and the promotional launch plan.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What staffing consideration matters most in covering this new wing?",
      "What promotional elements would you use to announce this expansion to past guests?",
    ],
  },
  {
    title: "Promoting a New Resort Amenity at Marlowe Resort & Spa",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:082", description: "Explain promotional methods used by the hospitality and tourism industry" },
      { code: "PR:121", description: "Describe the concept of promotion in the hospitality and tourism industry" },
      { code: "PR:422", description: "Explain the relationship between promotion and brand" },
      { code: "SM:063", description: "Discuss the nature of managerial planning" },
      { code: "SM:064", description: "Explain managerial considerations in organizing" },
      { code: "SM:065", description: "Describe managerial considerations in staffing" },
      { code: "SM:066", description: "Discuss managerial considerations in directing" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "A new outdoor meditation garden just opened, and the general manager (judge) wants a promotional push that reinforces the resort's wellness brand rather than feeling like a generic \"new amenity\" announcement.",
      ask:
        "The general manager (judge) wants your team to propose a promotional approach tied clearly to the resort's brand.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's promotional plan",
    }),
    judgeQuestions: [
      "How would your team tie this promotion to our wellness brand specifically?",
      "What promotional method would reach guests most likely to actually use this garden?",
    ],
  },
  {
    title: "Reviewing Payment Processing and Pricing Strategy at Marlowe Resort & Spa",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:113", description: "Explain cash control procedures (e.g., signature cards, deposit slips, internal/external controls, cash clearing, etc.)" },
      { code: "FI:396", description: "Reconcile cash" },
      { code: "FI:541", description: "Interpret cash-flow statements" },
      { code: "FI:789", description: "Discuss considerations in accepting credit-card payments" },
      { code: "FI:790", description: "Calculate credit-card processing costs" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:029", description: "Explain the concept of price in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "Credit-card processing fees have crept up as more guests pay by card, and the general manager (judge) wants to know if current treatment pricing is even accounting for this cost properly.",
      ask:
        "The general manager (judge) wants your team to calculate these processing costs and recommend whether pricing needs to adjust.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's analysis",
    }),
    judgeQuestions: [
      "How would your team calculate what these processing fees are really costing us?",
      "Would you recommend adjusting prices, and if so, how would you communicate that to guests?",
    ],
  },
  {
    title: "Setting Seasonal Pricing for the Spa at Marlowe Resort & Spa",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:029", description: "Explain the concept of price in the hospitality and tourism industry" },
      { code: "FI:541", description: "Interpret cash-flow statements" },
      { code: "FI:789", description: "Discuss considerations in accepting credit-card payments" },
      { code: "FI:790", description: "Calculate credit-card processing costs" },
      { code: "FI:113", description: "Explain cash control procedures (e.g., signature cards, deposit slips, internal/external controls, cash clearing, etc.)" },
      { code: "FI:396", description: "Reconcile cash" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "The spa has always charged flat rates year-round, but the general manager (judge) is wondering whether seasonal pricing, higher during peak season, lower during slow months, could improve cash flow without upsetting regular guests.",
      ask:
        "The general manager (judge) wants your team to recommend whether and how to implement seasonal pricing.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's pricing recommendation",
    }),
    judgeQuestions: [
      "How would your team introduce this without upsetting regulars used to flat pricing?",
      "What would you watch in cash flow to know if this change is working?",
    ],
  },
  {
    title: "An Enterprise Risk Review With Legal Considerations at Marlowe Resort & Spa",
    instructionalArea: "Risk Management",
    performanceIndicators: [
      { code: "RM:058", description: "Discuss the nature of risk control (i.e., internal and external)" },
      { code: "RM:062", description: "Discuss the nature of enterprise risk management (ERM)" },
      { code: "RM:088", description: "Describe types of indicators used to manage business risk (e.g., key risk indicators, key performance indicators, key process indicators)" },
      { code: "QM:001", description: "Explain the nature of quality management" },
      { code: "QM:003", description: "Discuss the need for continuous improvement of the quality process" },
      { code: "BL:065", description: "Explain the nature of regulations affecting the hospitality and tourism industry" },
      { code: "BL:135", description: "Describe the rights of customers in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the guest services team",
      company: "MARLOWE RESORT & SPA",
      judgeRole: "the general manager",
      problem:
        "After a minor injury during a spa treatment, insurance is requiring a formal enterprise risk review before renewing the resort's liability policy, and the general manager (judge) has never gone through a process like this.",
      ask:
        "The general manager (judge) wants your team to outline what this risk review should cover, including relevant regulations and guest rights.",
      location: "the general manager's office",
      greetingAsk: "to hear your team's review outline",
    }),
    judgeQuestions: [
      "What key risk indicator would your team want to start tracking after this incident?",
      "What guest right is most relevant to keep in mind through this review?",
    ],
  },
];

HSTDM_CASES.push({
  title: "Segmenting the Market for a New Wellness Package at Marlowe Resort & Spa",
  instructionalArea: "Market Planning",
  performanceIndicators: [
    { code: "MP:003", description: "Explain the concept of market and market identification" },
    { code: "MP:035", description: "Identify ways to segment hospitality and tourism markets" },
    { code: "MP:041", description: "Explain the use of marketing strategies in hospitality and tourism" },
    { code: "MK:008", description: "Differentiate between service marketing and product marketing" },
    { code: "EC:136", description: "Explain the relationship between the economy and hospitality and tourism" },
    { code: "EI:090", description: "Describe personal traits important to success in hospitality and tourism" },
    { code: "HR:452", description: "Explain labor-relations issues" },
  ],
  eventSituation: buildSituation({
    role: "the guest services team",
    company: "MARLOWE RESORT & SPA",
    judgeRole: "the general manager",
    problem:
      "A new multi-day wellness retreat package is ready to launch, but the general manager (judge) isn't sure which guest segment to target first, weekend leisure travelers, corporate wellness groups, or destination-retreat seekers, and each would need a different marketing approach and staffing plan.",
    ask:
      "The general manager (judge) wants your team to identify the right market segment to target first and how staffing needs would differ.",
    location: "the general manager's office",
    greetingAsk: "to hear your team's recommendation",
  }),
  judgeQuestions: [
    "Which segment would your team target first, and why?",
    "How would staffing needs differ depending on which segment you prioritize?",
  ],
});

HSTDM_CASES.push({
  title: "Addressing a Workplace Diversity Concern on the Spa Team at Marlowe Resort & Spa",
  instructionalArea: "Human Resources Management",
  performanceIndicators: [
    { code: "HR:452", description: "Explain labor-relations issues" },
    { code: "HR:515", description: "Discuss issues associated with workplace diversity (e.g., ethnic, generational, religious, gender)" },
    { code: "EI:090", description: "Describe personal traits important to success in hospitality and tourism" },
    { code: "CR:049", description: "Explain the nature of customer service in the hospitality and tourism industry" },
    { code: "SM:065", description: "Describe managerial considerations in staffing" },
    { code: "SM:066", description: "Discuss managerial considerations in directing" },
    { code: "PD:400", description: "Discuss the role of ethics in hospitality and tourism" },
  ],
  eventSituation: buildSituation({
    role: "the guest services team",
    company: "MARLOWE RESORT & SPA",
    judgeRole: "the general manager",
    problem:
      "A younger staff member and a longtime senior therapist have clashed repeatedly over scheduling and communication styles, and other staff say it's starting to create an uncomfortable atmosphere on the spa floor.",
    ask:
      "The general manager (judge) wants your team to address this workplace dynamic fairly and propose how to prevent it from escalating further.",
    location: "the general manager's office",
    greetingAsk: "to hear your team's recommendation",
  }),
  judgeQuestions: [
    "What would your team do to address this fairly without favoring either staff member?",
    "What personal trait would you look for in future hires to help avoid this kind of friction?",
  ],
});

const HSTDM_EVENT: EventCaseStudySeed = {
  eventSlug: "hospitality-services-team-decision-making",
  eventName: "Hospitality Services Team Decision Making",
  careerCluster: "Hospitality and Tourism",
  careerPathway: null,
  format: "TEAM_DECISION_MAKING",
  prepMinutes: 30,
  presentMinutes: 15,
  cases: HSTDM_CASES,
};

// ---------------------------------------------------------------------------
// travel-and-tourism-team-decision-making (TDM, same shared 123-code pool)
// ---------------------------------------------------------------------------
const TTTDM_CASES: CaseStudySeed[] = [
  {
    title: "Selling a Custom Itinerary to a Hesitant Client at Journey Point Travel Agency",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:220", description: "Explain factors that motivate people to choose a hospitality and tourism site" },
      { code: "SE:221", description: "Recommend hospitality and tourism services" },
      { code: "SE:499", description: "Establish relationship with hospitality and tourism customer/guest" },
      { code: "SE:500", description: "Determine hospitality and tourism customer/guest needs" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "A client keeps saying she could \"just book this online herself\" while still coming back with more questions about a custom multi-country itinerary, and the agency owner (judge) wants your team to figure out how to actually close this booking.",
      ask:
        "The agency owner (judge) wants your team to determine what's holding this client back and recommend how to move her toward booking.",
      location: "the agency office",
      greetingAsk: "to hear your team's approach",
    }),
    judgeQuestions: [
      "What's really holding this client back from booking?",
      "What value would your team emphasize that she can't easily get booking it herself online?",
    ],
  },
  {
    title: "Training on Special Requests and Gift Certificates at Journey Point Travel Agency",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:476", description: "Up-sell to enhance customer experience" },
      { code: "SE:477", description: "Process telephone orders in hospitality and tourism" },
      { code: "SE:478", description: "Process special orders in hospitality and tourism" },
      { code: "SE:479", description: "Sell gift certificates in hospitality and tourism" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "New travel consultants are handling phone inquiries and gift-certificate sales inconsistently, and the agency owner (judge) wants a real training standard covering these interactions and appropriate upgrade suggestions.",
      ask:
        "The agency owner (judge) wants your team to design training covering phone inquiries, special requests, gift certificates, and up-selling.",
      location: "the agency office",
      greetingAsk: "to hear your team's training plan",
    }),
    judgeQuestions: [
      "What would your team teach about suggesting an upgrade without sounding like a sales pitch?",
      "What selling policy matters most for a new consultant to know before their first call?",
    ],
  },
  {
    title: "Handling a Promotional Discount Dispute at Journey Point Travel Agency",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:149", description: "Process complimentary offers and coupons/discounts" },
      { code: "SE:329", description: "Process sales transactions (e.g., cash, credit, check)" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:220", description: "Explain factors that motivate people to choose a hospitality and tourism site" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "A client insists an expired promotional discount code should still apply to his booking, and the agency owner (judge) needs a consistent policy for handling situations like this that's fair to the client without setting a bad precedent.",
      ask:
        "The agency owner (judge) wants your team to propose how to resolve this specific request and how to handle discount disputes consistently.",
      location: "the agency office",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "How would your team handle this specific client's request?",
      "What precedent are you trying to avoid setting with your answer?",
    ],
  },
  {
    title: "Managing Peak Booking Season at Journey Point Travel Agency",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:038", description: "Identify strategies to manage customer experience during peaks in demand" },
      { code: "CR:039", description: "Maintain service standards during peaks in demand" },
      { code: "CR:052", description: "Identify factors associated with positive customer experiences" },
      { code: "CR:053", description: "Anticipate unspoken customer needs" },
      { code: "CR:054", description: "Accommodate special needs/specific requests of customers" },
      { code: "CR:055", description: "Deliver positive moments of truth" },
      { code: "CR:067", description: "Explain the importance of meeting and exceeding customer/guest expectations" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "Booking season for summer travel is starting, and the agency owner (judge) is worried that response times and service quality will slip as inquiries pile up, the way they did last year when several clients complained about slow replies.",
      ask:
        "The agency owner (judge) wants your team to propose strategies for maintaining service quality during this peak period.",
      location: "the agency office",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What went wrong last peak season that your team wants to avoid repeating?",
      "What's one way your team could still create a memorable moment even when inquiries are piling up?",
    ],
  },
  {
    title: "Designing a Trip-Disruption Recovery Process at Journey Point Travel Agency",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:043", description: "Describe customer-service challenges in the hospitality and tourism industry" },
      { code: "CR:044", description: "Resolve hospitality and tourism related conflicts for customers" },
      { code: "CR:045", description: "Explain the nature of guest recovery" },
      { code: "CR:046", description: "Determine strategies for resolving customer-service situations" },
      { code: "CR:049", description: "Explain the nature of customer service in the hospitality and tourism industry" },
      { code: "CR:051", description: "Identify factors affecting customer-service practices in hospitality and tourism" },
      { code: "CR:021", description: "Process customer/guest orders" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "A client's flight was canceled mid-trip and she called the agency frantic, but different consultants have handled trip-disruption calls differently in the past, some rebooking immediately, others telling clients to call the airline directly.",
      ask:
        "The agency owner (judge) wants your team to design a consistent process for handling trip disruptions like this.",
      location: "the agency office",
      greetingAsk: "to hear your team's process",
    }),
    judgeQuestions: [
      "What should stay consistent about how a disruption call like this gets handled?",
      "When should a consultant handle this directly versus directing the client to the airline?",
    ],
  },
  {
    title: "Modernizing Client Touchpoints With Digital Media at Journey Point Travel Agency",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:028", description: "Use digital media to enhance customer post-sales experience" },
      { code: "CR:067", description: "Explain the importance of meeting and exceeding customer/guest expectations" },
      { code: "CR:052", description: "Identify factors associated with positive customer experiences" },
      { code: "CR:053", description: "Anticipate unspoken customer needs" },
      { code: "CR:054", description: "Accommodate special needs/specific requests of customers" },
      { code: "CR:055", description: "Deliver positive moments of truth" },
      { code: "CR:038", description: "Identify strategies to manage customer experience during peaks in demand" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "Client feedback mentions the booking experience feels transactional, and the agency owner (judge) wants your team to identify moments during a client's trip planning where digital tools could enhance the experience without feeling impersonal.",
      ask:
        "The agency owner (judge) wants your team to propose specific digital touchpoints that would create memorable moments.",
      location: "the agency office",
      greetingAsk: "to hear your team's ideas",
    }),
    judgeQuestions: [
      "What's one moment in trip planning where a digital touch could make it memorable?",
      "How would you avoid this feeling like an automated, impersonal message?",
    ],
  },
  {
    title: "A Data Security Review After a Booking Platform Breach at Journey Point Travel Agency",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:518", description: "Comply with strategies to protect digital customer data (e.g., information about customers, customers' credit-card numbers, passwords, customer transactions)" },
      { code: "OP:653", description: "Identify credit card fraud prevention methods" },
      { code: "OP:654", description: "Explain the nature of identity theft controls" },
      { code: "OP:517", description: "Comply with strategies for protecting business' digital assets (e.g., website, social media, email, etc.)" },
      { code: "OP:115", description: "Explain security considerations in the hospitality and tourism industry" },
      { code: "OP:119", description: "Handle emergency situations in hospitality and tourism" },
      { code: "OP:527", description: "Identify factors affecting evacuation procedures/protocols" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "The booking platform JOURNEY POINT relies on to process client payments just disclosed a security breach, and the agency owner (judge) needs to understand the agency's exposure and how to respond to clients.",
      ask:
        "The agency owner (judge) wants your team to assess this and recommend an appropriate response.",
      location: "the agency office",
      greetingAsk: "to hear your team's assessment",
    }),
    judgeQuestions: [
      "What's our exposure here even though this happened at the platform's system, not ours?",
      "What would your team recommend telling affected clients, and how quickly?",
    ],
  },
  {
    title: "Reviewing Invoicing and Vendor Payments at Journey Point Travel Agency",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:134", description: "Practice safe and sanitary handling/disposal of wastes/recyclables" },
      { code: "OP:184", description: "Track invoices" },
      { code: "OP:250", description: "Describe types of purchase orders" },
      { code: "OP:336", description: "Discuss types of inventory" },
      { code: "OP:522", description: "Explain the nature and scope of distribution" },
      { code: "OP:523", description: "Explain the relationship between customer service and distribution" },
      { code: "OP:529", description: "Explain the concept of place (distribution) in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "Several vendor payments (hotels, tour operators) have gone out late, and the agency owner (judge) suspects the invoice-tracking process isn't giving a clear enough picture of what's owed and when.",
      ask:
        "The agency owner (judge) wants your team to review this process and recommend improvements.",
      location: "the agency office",
      greetingAsk: "to hear your team's recommendations",
    }),
    judgeQuestions: [
      "What's likely causing these late vendor payments?",
      "How would your team improve invoice tracking to catch this sooner?",
    ],
  },
  {
    title: "Handling an Emergency During a Client's Overseas Trip at Journey Point Travel Agency",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:115", description: "Explain security considerations in the hospitality and tourism industry" },
      { code: "OP:119", description: "Handle emergency situations in hospitality and tourism" },
      { code: "OP:527", description: "Identify factors affecting evacuation procedures/protocols" },
      { code: "OP:657", description: "Provide first-aid" },
      { code: "OP:653", description: "Identify credit card fraud prevention methods" },
      { code: "OP:654", description: "Explain the nature of identity theft controls" },
      { code: "OP:517", description: "Comply with strategies for protecting business' digital assets (e.g., website, social media, email, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "A client on a booked trip abroad called in a panic about a regional safety alert near her destination, and the agency owner (judge) realizes JOURNEY POINT has no real emergency-response protocol for clients already traveling.",
      ask:
        "The agency owner (judge) wants your team to handle this immediate situation and propose a protocol for future travel emergencies.",
      location: "the agency office",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What would your team do right now for this client currently abroad?",
      "What should a real emergency protocol for traveling clients include going forward?",
    ],
  },
  {
    title: "Building Out a New Adventure-Travel Product Line at Journey Point Travel Agency",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:021", description: "Explain the nature of product/service branding" },
      { code: "PM:041", description: "Describe the nature of product bundling" },
      { code: "PM:081", description: "Explain the concept of product in the hospitality and tourism industry" },
      { code: "PM:095", description: "Describe services offered by the hospitality and tourism industry" },
      { code: "PM:099", description: "Explain the nature of product extensions in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "The agency owner (judge) has noticed growing client interest in adventure travel (hiking trips, expeditions) but JOURNEY POINT's current offerings are almost entirely relaxation-focused resort bookings.",
      ask:
        "The agency owner (judge) wants your team to propose how to add adventure travel to the product mix and how it should be branded.",
      location: "the agency office",
      greetingAsk: "to hear your team's proposal",
    }),
    judgeQuestions: [
      "How would this new line fit alongside our current relaxation-focused offerings?",
      "How would you brand this so it doesn't feel disconnected from our existing identity?",
    ],
  },
  {
    title: "Rebranding After a Vendor Quality Complaint at Journey Point Travel Agency",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:206", description: "Explain the nature of corporate branding" },
      { code: "PM:214", description: "Communicate core values of product/service" },
      { code: "PM:239", description: "Evaluate vendors' goods and services" },
      { code: "PM:246", description: "Identify product's/service's competitive advantage" },
      { code: "PM:314", description: "Explain guarantees in hospitality and tourism" },
      { code: "PM:317", description: "Describe the role of customer voice in hospitality and tourism branding" },
      { code: "PM:318", description: "Choose hospitality and tourism vendors" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "Several clients have complained about a tour operator JOURNEY POINT frequently books with, tracing back to cost-cutting that lowered service quality, and the agency owner (judge) needs to address both the vendor relationship and the brand impact.",
      ask:
        "The agency owner (judge) wants your team to propose how to address this vendor issue and any brand guarantee to offer affected clients.",
      location: "the agency office",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would your team do about this vendor relationship going forward?",
      "What guarantee, if any, would you offer clients affected by this vendor's quality issues?",
    ],
  },
  {
    title: "Researching Demand Before Adding a New Destination at Journey Point Travel Agency",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:279", description: "Explain the need for hospitality and tourism business information" },
      { code: "NF:280", description: "Identify information monitored for business decision making" },
      { code: "NF:281", description: "Explain sources of secondary hospitality and tourism information" },
      { code: "NF:282", description: "Explain types of primary hospitality and tourism market information" },
      { code: "NF:283", description: "Describe methods used to collect hospitality and tourism business information (e.g., observations, mail, telephone, Internet, discussion groups, interviews)" },
      { code: "NF:284", description: "Obtain business information from customer databases" },
      { code: "NF:285", description: "Identify challenges with the use of unstructured business data" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "The agency owner (judge) is considering building out a new specialty in a destination the agency has never focused on before, but wants real research behind this decision rather than assuming client demand exists.",
      ask:
        "The agency owner (judge) wants your team to propose what business information should be gathered and how, before committing to this new specialty.",
      location: "the agency office",
      greetingAsk: "to hear your team's research plan",
    }),
    judgeQuestions: [
      "What primary information would your team want to gather directly from current clients?",
      "What secondary sources could tell us if this destination is trending?",
    ],
  },
  {
    title: "Presenting Quarterly Booking Trends to Ownership at Journey Point Travel Agency",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:286", description: "Obtain hospitality and tourism information from online sources (e.g., search engines, online databases, blogs, forums, listservs, web analytics, social media, geolocation services)" },
      { code: "NF:287", description: "Track environmental changes that impact hospitality and tourism (e.g., technological changes, guest trends, economic changes, regulatory changes)" },
      { code: "NF:288", description: "Monitor hospitality and tourism sales data" },
      { code: "NF:289", description: "Display hospitality and tourism data in charts/graphs or in tables" },
      { code: "NF:290", description: "Prepare and use presentation software to aid in making oral reports" },
      { code: "NF:291", description: "Present hospitality and tourism findings orally" },
      { code: "NF:292", description: "Prepare written reports for hospitality and tourism decision-making" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "The agency owner (judge) wants a quarterly presentation covering booking trends and broader travel industry changes for an upcoming partner meeting, but has only ever kept informal notes rather than an actual report.",
      ask:
        "The agency owner (judge) wants your team to outline what this presentation should include and how the data should be displayed.",
      location: "the agency office",
      greetingAsk: "to hear your team's presentation outline",
    }),
    judgeQuestions: [
      "What industry trend would your team highlight as most relevant to this meeting?",
      "How would you display booking trend data to make the story clear at a glance?",
    ],
  },
  {
    title: "Reorganizing Roles for Growing Group-Travel Demand at Journey Point Travel Agency",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "SM:063", description: "Discuss the nature of managerial planning" },
      { code: "SM:064", description: "Explain managerial considerations in organizing" },
      { code: "SM:065", description: "Describe managerial considerations in staffing" },
      { code: "SM:066", description: "Discuss managerial considerations in directing" },
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "Group-travel bookings have grown enough that the agency owner (judge) wants to dedicate a consultant specifically to this segment, while also launching a promotional push to attract more group business.",
      ask:
        "The agency owner (judge) wants your team to propose both the staffing reorganization and the promotional plan for group travel.",
      location: "the agency office",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What staffing consideration matters most in dedicating someone to this segment?",
      "What promotional elements would you use to attract more group bookings?",
    ],
  },
  {
    title: "Promoting a New Sustainable Travel Line at Journey Point Travel Agency",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:082", description: "Explain promotional methods used by the hospitality and tourism industry" },
      { code: "PR:121", description: "Describe the concept of promotion in the hospitality and tourism industry" },
      { code: "PR:422", description: "Explain the relationship between promotion and brand" },
      { code: "SM:063", description: "Discuss the nature of managerial planning" },
      { code: "SM:064", description: "Explain managerial considerations in organizing" },
      { code: "SM:065", description: "Describe managerial considerations in staffing" },
      { code: "SM:066", description: "Discuss managerial considerations in directing" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "JOURNEY POINT just launched a sustainable-travel line partnering only with eco-certified operators, and the agency owner (judge) wants a promotional push that reinforces the agency's values rather than feeling like a trend chase.",
      ask:
        "The agency owner (judge) wants your team to propose a promotional approach tied clearly to the agency's brand values.",
      location: "the agency office",
      greetingAsk: "to hear your team's promotional plan",
    }),
    judgeQuestions: [
      "How would your team make this feel authentic rather than like a trend chase?",
      "What promotional method would reach clients most likely to actually book this line?",
    ],
  },
  {
    title: "Reviewing Payment Processing Costs at Journey Point Travel Agency",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:113", description: "Explain cash control procedures (e.g., signature cards, deposit slips, internal/external controls, cash clearing, etc.)" },
      { code: "FI:396", description: "Reconcile cash" },
      { code: "FI:541", description: "Interpret cash-flow statements" },
      { code: "FI:789", description: "Discuss considerations in accepting credit-card payments" },
      { code: "FI:790", description: "Calculate credit-card processing costs" },
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:029", description: "Explain the concept of price in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "Credit-card processing fees have crept up as more clients pay deposits online by card, and the agency owner (judge) wants to know if current service fees even account for this cost properly.",
      ask:
        "The agency owner (judge) wants your team to calculate these processing costs and recommend whether fees need to adjust.",
      location: "the agency office",
      greetingAsk: "to hear your team's analysis",
    }),
    judgeQuestions: [
      "How would your team calculate what these processing fees are really costing us?",
      "Would you recommend adjusting our service fee, and how would you communicate that to clients?",
    ],
  },
  {
    title: "Setting Prices for a New Package Ahead of Peak Season at Journey Point Travel Agency",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:029", description: "Explain the concept of price in the hospitality and tourism industry" },
      { code: "FI:541", description: "Interpret cash-flow statements" },
      { code: "FI:789", description: "Discuss considerations in accepting credit-card payments" },
      { code: "FI:790", description: "Calculate credit-card processing costs" },
      { code: "FI:113", description: "Explain cash control procedures (e.g., signature cards, deposit slips, internal/external controls, cash clearing, etc.)" },
      { code: "FI:396", description: "Reconcile cash" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "A new all-inclusive package needs a price set before peak booking season starts next month, and the agency owner (judge) wants a price that covers agency fees and vendor costs while still looking competitive against big online booking sites.",
      ask:
        "The agency owner (judge) wants your team to recommend a price for this package and explain your reasoning.",
      location: "the agency office",
      greetingAsk: "to hear your team's pricing recommendation",
    }),
    judgeQuestions: [
      "What factors led your team to this specific price?",
      "How would you justify this price against a big online booking site's rate to a price-conscious client?",
    ],
  },
  {
    title: "An Enterprise Risk Review After a Client Complaint at Journey Point Travel Agency",
    instructionalArea: "Risk Management",
    performanceIndicators: [
      { code: "RM:058", description: "Discuss the nature of risk control (i.e., internal and external)" },
      { code: "RM:062", description: "Discuss the nature of enterprise risk management (ERM)" },
      { code: "RM:088", description: "Describe types of indicators used to manage business risk (e.g., key risk indicators, key performance indicators, key process indicators)" },
      { code: "QM:001", description: "Explain the nature of quality management" },
      { code: "QM:003", description: "Discuss the need for continuous improvement of the quality process" },
      { code: "BL:065", description: "Explain the nature of regulations affecting the hospitality and tourism industry" },
      { code: "BL:135", description: "Describe the rights of customers in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "A client is threatening legal action after a booked tour operator canceled without notice, and the agency's liability insurer is requiring a formal risk review before renewing coverage.",
      ask:
        "The agency owner (judge) wants your team to outline what this risk review should cover, including relevant regulations and client rights.",
      location: "the agency office",
      greetingAsk: "to hear your team's review outline",
    }),
    judgeQuestions: [
      "What key risk indicator would your team want to start tracking after this incident?",
      "What client right is most relevant to keep in mind through this review?",
    ],
  },
  {
    title: "Segmenting the Market for a New Family-Travel Line at Journey Point Travel Agency",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "MP:035", description: "Identify ways to segment hospitality and tourism markets" },
      { code: "MP:041", description: "Explain the use of marketing strategies in hospitality and tourism" },
      { code: "MK:008", description: "Differentiate between service marketing and product marketing" },
      { code: "EC:136", description: "Explain the relationship between the economy and hospitality and tourism" },
      { code: "EI:090", description: "Describe personal traits important to success in hospitality and tourism" },
      { code: "HR:452", description: "Explain labor-relations issues" },
    ],
    eventSituation: buildSituation({
      role: "the travel consultant team",
      company: "JOURNEY POINT TRAVEL AGENCY",
      judgeRole: "the agency owner",
      problem:
        "The agency owner (judge) wants to build out a family-travel specialty but isn't sure which segment to prioritize, budget-conscious families, multi-generational trips, or luxury family resorts, and each requires different consultant expertise and staffing.",
      ask:
        "The agency owner (judge) wants your team to identify the right segment to prioritize and how staffing needs would differ.",
      location: "the agency office",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "Which segment would your team prioritize first, and why?",
      "How would consultant expertise needs differ depending on which segment you choose?",
    ],
  },
];

TTTDM_CASES.push({
  title: "Addressing a Workplace Diversity Concern at Journey Point Travel Agency",
  instructionalArea: "Human Resources Management",
  performanceIndicators: [
    { code: "HR:452", description: "Explain labor-relations issues" },
    { code: "HR:515", description: "Discuss issues associated with workplace diversity (e.g., ethnic, generational, religious, gender)" },
    { code: "EI:090", description: "Describe personal traits important to success in hospitality and tourism" },
    { code: "CR:049", description: "Explain the nature of customer service in the hospitality and tourism industry" },
    { code: "SM:065", description: "Describe managerial considerations in staffing" },
    { code: "SM:066", description: "Discuss managerial considerations in directing" },
    { code: "PD:400", description: "Discuss the role of ethics in hospitality and tourism" },
  ],
  eventSituation: buildSituation({
    role: "the travel consultant team",
    company: "JOURNEY POINT TRAVEL AGENCY",
    judgeRole: "the agency owner",
    problem:
      "A newer consultant and a longtime senior agent have clashed over how to handle client outreach, and other staff say the tension is starting to affect the office atmosphere and how new hires are being mentored.",
    ask:
      "The agency owner (judge) wants your team to address this workplace dynamic fairly and propose how to prevent it from escalating further.",
    location: "the agency office",
    greetingAsk: "to hear your team's recommendation",
  }),
  judgeQuestions: [
    "What would your team do to address this fairly without favoring either consultant?",
    "What personal trait would you look for in future hires to help avoid this kind of friction?",
  ],
});

const TTTDM_EVENT: EventCaseStudySeed = {
  eventSlug: "travel-and-tourism-team-decision-making",
  eventName: "Travel and Tourism Team Decision Making",
  careerCluster: "Hospitality and Tourism",
  careerPathway: null,
  format: "TEAM_DECISION_MAKING",
  prepMinutes: 30,
  presentMinutes: 15,
  cases: TTTDM_CASES,
};

// ---------------------------------------------------------------------------
// principles-of-hospitality-and-tourism (PRINCIPLES, Business Administration Core PIs)
// ---------------------------------------------------------------------------
const POHT_CASES: CaseStudySeed[] = [
  {
    title: "Living Up to the Brand Promise at Windmere Inn",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:001", description: "Identify company's brand promise" },
      { code: "CR:002", description: "Determine ways of reinforcing the company's image through employee performance" },
      { code: "CR:003", description: "Explain the nature of positive customer relations" },
      { code: "CR:004", description: "Demonstrate a customer service mindset" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "On your first day, the innkeeper (judge) mentions that WINDMERE's whole reputation rests on guests feeling like they're staying with old friends, not checking into a hotel, and wants to make sure you understand what that actually means in practice.",
      ask:
        "The innkeeper (judge) wants you to explain how you'd reinforce this brand promise through your own daily interactions with guests.",
      location: "the inn's front parlor",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What does 'feeling like old friends, not a hotel stay' actually look like in a daily interaction?",
      "How would your own performance reinforce or hurt this brand promise?",
    ],
  },
  {
    title: "A Guest Feels Ignored at Check-In at Windmere Inn",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:005", description: "Reinforce service orientation through communication" },
      { code: "CR:006", description: "Respond to customer inquiries" },
      { code: "CR:007", description: "Interpret business policies to customers/clients" },
      { code: "CR:009", description: "Handle difficult customers" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "A guest checking in seems annoyed that the inn's early check-in policy wasn't clearly explained when she booked online, and is now pushing back at the front desk about having to wait until the standard time.",
      ask:
        "The innkeeper (judge) wants you to explain how you'd handle this guest and communicate the policy clearly without escalating her frustration.",
      location: "the inn's front desk",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "How would you explain this policy without sounding like you're just reciting a rule?",
      "What would you do to keep this guest's frustration from escalating further?",
    ],
  },
  {
    title: "Handling a Complaint About the Inn's Wifi at Windmere Inn",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:010", description: "Handle customer/client complaints" },
      { code: "CR:016", description: "Discuss the nature of customer relationship management" },
      { code: "CR:017", description: "Explain the role of ethics in customer relationship management" },
      { code: "CR:018", description: "Describe the use of technology in customer relationship management" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "A guest working remotely during his stay is frustrated that the wifi keeps dropping during video calls, and he's asking what WINDMERE is going to do about it, right as another guest overhears and adds her own complaint.",
      ask:
        "The innkeeper (judge) wants you to handle this complaint and explain how a small inn like this should think about managing guest relationships around issues like this.",
      location: "the inn's front parlor",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What would you actually do for this guest right now, beyond apologizing?",
      "What's an ethical way to handle a second guest piling onto this complaint?",
    ],
  },
  {
    title: "A Guest From Another Culture Feels Unwelcome at Windmere Inn",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:019", description: "Adapt communication to the cultural and social differences among clients" },
      { code: "CR:029", description: "Develop rapport with customers" },
      { code: "CR:030", description: "Build and maintain relationships with customers" },
      { code: "CR:003", description: "Explain the nature of positive customer relations" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "A guest visiting from overseas seems uncertain about local breakfast customs and hesitant to ask questions, and the innkeeper (judge) wants to make sure she feels genuinely welcomed rather than just tolerated.",
      ask:
        "The innkeeper (judge) wants you to explain how you'd build rapport with this guest despite the cultural gap.",
      location: "the inn's breakfast room",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What would you actually do to help this guest feel comfortable asking questions?",
      "How does building this kind of rapport turn into a repeat guest down the line?",
    ],
  },
  {
    title: "A Guest Leaves a Mixed Review of Windmere Inn",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:001", description: "Identify company's brand promise" },
      { code: "CR:004", description: "Demonstrate a customer service mindset" },
      { code: "CR:006", description: "Respond to customer inquiries" },
      { code: "CR:010", description: "Handle customer/client complaints" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "A guest left a review praising the staff's warmth but criticizing a squeaky floorboard outside her room that kept her up, and the innkeeper (judge) wants a thoughtful public response that stays true to WINDMERE's brand.",
      ask:
        "The innkeeper (judge) wants you to draft a response to this review.",
      location: "the inn's front parlor",
      greetingAsk: "to hear your response",
    }),
    judgeQuestions: [
      "How would you acknowledge the fair criticism without sounding defensive?",
      "How does this response reflect WINDMERE's brand promise?",
    ],
  },
  {
    title: "Writing a Welcome Note for New Guests at Windmere Inn",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:014", description: "Explain the nature of staff communication" },
      { code: "CO:016", description: "Explain the nature of effective written communications" },
      { code: "CO:017", description: "Demonstrate active listening skills" },
      { code: "CO:025", description: "Make oral presentations" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "The innkeeper (judge) wants to start leaving a short handwritten welcome note in each room but hasn't decided what it should actually say, and wants you to also be ready to greet guests warmly in person when they arrive.",
      ask:
        "The innkeeper (judge) wants you to draft this welcome note and explain how you'd greet guests verbally on arrival.",
      location: "the inn's front parlor",
      greetingAsk: "to hear your draft and your greeting approach",
    }),
    judgeQuestions: [
      "What would make this welcome note feel personal rather than generic?",
      "What would you actually say when greeting a guest at the door for the first time?",
    ],
  },
  {
    title: "Two Guests Have Conflicting Requests at Windmere Inn",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:053", description: "Participate in group discussions" },
      { code: "CO:054", description: "Identify sources that provide relevant, valid written material" },
      { code: "CO:055", description: "Extract relevant information from written materials" },
      { code: "CO:056", description: "Apply written directions to achieve tasks" },
    ],
    eventSituation: buildSituation({
      role: "a new part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "Two guests in adjoining rooms have submitted conflicting requests, one wants the shared porch quiet after 9pm, the other wants to host a small gathering there that evening, and the inn's written policy on shared spaces is vague.",
      ask:
        "The innkeeper (judge) wants you to review the written policy and figure out how to resolve this fairly.",
      location: "the inn's front parlor",
      greetingAsk: "to hear how you'd resolve this",
    }),
    judgeQuestions: [
      "What does the written policy actually tell you here, and where is it unclear?",
      "How would you communicate a fair resolution to both guests?",
    ],
  },
  {
    title: "Coaching a Nervous New Hire at Windmere Inn",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:082", description: "Explain communication techniques that support and encourage a speaker" },
      { code: "CO:083", description: "Give verbal directions" },
      { code: "CO:084", description: "Employ communication styles appropriate to target audience" },
      { code: "CO:090", description: "Write professional emails" },
    ],
    eventSituation: buildSituation({
      role: "a senior part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "A newly hired part-time employee seems nervous and unsure how to talk to guests confidently, and the innkeeper (judge) has asked you to help coach them before their first solo shift this weekend.",
      ask:
        "The innkeeper (judge) wants you to explain how you'd coach this new hire and follow up with a helpful email of tips.",
      location: "the inn's front parlor",
      greetingAsk: "to hear how you'd coach them",
    }),
    judgeQuestions: [
      "What communication technique would help this nervous new hire the most?",
      "What would you include in a follow-up email of tips before their solo shift?",
    ],
  },
  {
    title: "A Miscommunication Over the Phone Leads to a Booking Mistake at Windmere Inn",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:059", description: "Interpret others' nonverbal cues" },
      { code: "CO:060", description: "Provide legitimate responses to inquiries" },
      { code: "CO:061", description: "Defend ideas objectively" },
      { code: "CO:063", description: "Participate in a staff meeting" },
    ],
    eventSituation: buildSituation({
      role: "a senior part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "A phone booking got mixed up because the caller and the employee taking the reservation misunderstood each other about the dates, and it's coming up at this week's staff meeting as something to discuss and fix.",
      ask:
        "The innkeeper (judge) wants you to explain what likely went wrong and how you'd bring this up constructively at the meeting.",
      location: "the inn's front parlor",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What likely caused this specific misunderstanding over the phone?",
      "How would you raise this at the staff meeting without singling anyone out?",
    ],
  },
  {
    title: "Assessing Your Own Fit for Hospitality Work at Windmere Inn",
    instructionalArea: "Emotional Intelligence",
    performanceIndicators: [
      { code: "EI:001", description: "Describe the nature of emotional intelligence" },
      { code: "EI:002", description: "Assess personal strengths and weaknesses" },
      { code: "EI:003", description: "Explain the use of feedback for personal growth" },
      { code: "EI:004", description: "Demonstrate ethical work habits" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "After a few weeks on the job, the innkeeper (judge) checks in and asks you to honestly reflect on your own strengths and weaknesses in this kind of guest-facing work.",
      ask:
        "The innkeeper (judge) wants an honest self-assessment and how you'd use feedback to keep improving.",
      location: "the inn's front parlor",
      greetingAsk: "to hear your self-assessment",
    }),
    judgeQuestions: [
      "What's a strength you've noticed in yourself doing this kind of work?",
      "How would you use feedback from the innkeeper to keep improving?",
    ],
  },
  {
    title: "Staying Positive During a Fully Booked, Stressful Weekend at Windmere Inn",
    instructionalArea: "Emotional Intelligence",
    performanceIndicators: [
      { code: "EI:018", description: "Identify desirable personality traits important to business" },
      { code: "EI:019", description: "Exhibit a positive attitude" },
      { code: "EI:020", description: "Demonstrate interest and enthusiasm" },
      { code: "EI:021", description: "Demonstrate responsible behavior" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "The inn is fully booked for a busy festival weekend, and the innkeeper (judge) is worried the stress of back-to-back check-ins and requests could show on staff faces in a way guests would notice.",
      ask:
        "The innkeeper (judge) wants you to explain how you'd stay positive and responsible under this kind of pressure.",
      location: "the inn's front desk",
      greetingAsk: "to hear how you'd handle this weekend",
    }),
    judgeQuestions: [
      "What would you do in the moment to keep a positive attitude visible to guests under this stress?",
      "What personality trait do you think matters most for this kind of work?",
    ],
  },
  {
    title: "Making a Mistake and Owning It at Windmere Inn",
    instructionalArea: "Emotional Intelligence",
    performanceIndicators: [
      { code: "EI:022", description: "Demonstrate honesty and integrity" },
      { code: "EI:023", description: "Exhibit self-confidence" },
      { code: "EI:024", description: "Explain the importance of demonstrating initiative" },
      { code: "EI:025", description: "Demonstrate self-control" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "You accidentally gave a guest the wrong checkout time, and now she's upset about having to rush out earlier than she expected, and the innkeeper (judge) is asking you to explain what happened.",
      ask:
        "The innkeeper (judge) wants you to be honest about this mistake and explain how you'd take initiative to fix it.",
      location: "the inn's front desk",
      greetingAsk: "to hear what happened",
    }),
    judgeQuestions: [
      "How would you own this mistake honestly with the innkeeper and the guest?",
      "What would you do to try to make this right for the guest?",
    ],
  },
  {
    title: "Adjusting to an Unexpected Schedule Change at Windmere Inn",
    instructionalArea: "Emotional Intelligence",
    performanceIndicators: [
      { code: "EI:029", description: "Respect the privacy of others" },
      { code: "EI:030", description: "Show empathy for others" },
      { code: "EI:036", description: "Treat others with dignity and respect" },
      { code: "EI:037", description: "Foster positive working relationships" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "A coworker had to suddenly leave a shift due to a family emergency, and the innkeeper (judge) needs someone to cover, but you had personal plans you'd need to cancel, and you're aware the coworker is embarrassed about the sudden ask.",
      ask:
        "The innkeeper (judge) wants you to explain how you'd handle this situation with empathy for your coworker.",
      location: "the inn's front parlor",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "How would you respond to your coworker in a way that respects their privacy about the emergency?",
      "How does handling a moment like this well affect your working relationship going forward?",
    ],
  },
  {
    title: "Reporting a Maintenance Issue at Windmere Inn",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:005", description: "Report noncompliance with business health and safety regulations" },
      { code: "OP:024", description: "Explain the nature of overhead/operating costs" },
      { code: "OP:031", description: "Maintain inventory of supplies" },
      { code: "OP:064", description: "Maintain data security" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "You noticed a loose handrail on the inn's back staircase that could be a real safety issue, and separately, the guest registration binder with personal information has been left out on the front desk unattended more than once.",
      ask:
        "The innkeeper (judge) wants you to report both issues and explain why each matters.",
      location: "the inn's front desk",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "Why does reporting the handrail issue right away matter, even if it seems minor?",
      "What would you recommend about how that registration binder is handled?",
    ],
  },
  {
    title: "Managing Costs During a Slow Season at Windmere Inn",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:153", description: "Protect company information and intangibles" },
      { code: "OP:158", description: "Explain the nature of project management" },
      { code: "OP:159", description: "Evaluate project results" },
      { code: "OP:189", description: "Explain the nature of operations" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "Bookings are slower this month, and the innkeeper (judge) wants to use the downtime for a small project, refreshing the guest welcome materials, but has never really run a project like this with a clear start and finish.",
      ask:
        "The innkeeper (judge) wants you to help plan this project and think through how to evaluate whether it turned out well.",
      location: "the inn's front parlor",
      greetingAsk: "to hear your project approach",
    }),
    judgeQuestions: [
      "What would a clear start and finish for this small project actually look like?",
      "How would you evaluate whether this project was worth the time once it's done?",
    ],
  },
  {
    title: "Explaining Why Ethics Matters in Daily Operations at Windmere Inn",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:190", description: "Discuss the role of ethics in operations" },
      { code: "OP:191", description: "Describe the use of technology in operations" },
      { code: "OP:246", description: "Discuss the importance of utilizing ethical purchasing methods" },
      { code: "OP:247", description: "Explain the impact of the purchasing process on productivity" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "The innkeeper (judge) is comparing two local suppliers for breakfast ingredients, one slightly cheaper but with questionable sourcing practices, and wants your thoughts before deciding.",
      ask:
        "The innkeeper (judge) wants you to explain the ethical considerations at play in this purchasing decision.",
      location: "the inn's front parlor",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What ethical concern would you flag about the cheaper supplier?",
      "How might this purchasing decision affect day-to-day operations either way?",
    ],
  },
  {
    title: "Streamlining the Morning Checklist at Windmere Inn",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:354", description: "Monitor and ensure completion of delegated tasks" },
      { code: "OP:355", description: "Streamline work processes" },
      { code: "OP:441", description: "Explain information privacy, security, and confidentiality considerations in business" },
      { code: "OP:442", description: "Comply with policies and procedures for use of property and equipment" },
    ],
    eventSituation: buildSituation({
      role: "a senior part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "The morning checklist for preparing rooms and breakfast has grown cluttered over the years, and some tasks get skipped when things get busy because no one's quite sure who's responsible for what.",
      ask:
        "The innkeeper (judge) wants you to streamline this checklist and clarify responsibilities.",
      location: "the inn's front parlor",
      greetingAsk: "to hear your streamlined checklist",
    }),
    judgeQuestions: [
      "What would you cut or combine to streamline this checklist?",
      "How would you make sure everyone knows who's responsible for what each morning?",
    ],
  },
  {
    title: "Deciding If Hospitality Is the Right Career Path at Windmere Inn",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:012", description: "Demonstrate appropriate creativity" },
      { code: "PD:022", description: "Identify sources of career information" },
      { code: "PD:066", description: "Explain career opportunities in entrepreneurship" },
      { code: "PD:077", description: "Demonstrate problem-solving skills" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "You've mentioned to the innkeeper (judge) that you're curious whether hospitality could be a real career path for you, maybe even running your own inn or B&B someday.",
      ask:
        "The innkeeper (judge) wants you to talk through how you'd explore this path and what sources of career information would actually help.",
      location: "the inn's front parlor",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What sources would you actually use to learn more about this career path?",
      "What problem-solving skill from this job do you think would transfer to running your own place?",
    ],
  },
  {
    title: "Balancing School and Weekend Shifts at Windmere Inn",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:126", description: "Explain the need for innovation skills" },
      { code: "PD:179", description: "Balance personal and professional responsibilities" },
      { code: "PD:250", description: "Adhere to company protocols and policies" },
      { code: "PD:251", description: "Follow rules of conduct" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "You're balancing weekend shifts at WINDMERE with a full course load, and the innkeeper (judge) has noticed you seem stretched thin lately and wants to check in about how you're managing it.",
      ask:
        "The innkeeper (judge) wants you to talk through how you're balancing these responsibilities while still following the inn's protocols reliably.",
      location: "the inn's front parlor",
      greetingAsk: "to talk through this",
    }),
    judgeQuestions: [
      "How are you balancing these two sets of responsibilities right now?",
      "What would you do differently if it started to feel unmanageable?",
    ],
  },
  {
    title: "Understanding Your Role in the Inn's Bigger Goals at Windmere Inn",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:252", description: "Follow chain of command" },
      { code: "PD:254", description: "Determine the nature of organizational goals" },
      { code: "PD:255", description: "Ascertain employee's role in meeting organizational goals" },
      { code: "PD:012", description: "Demonstrate appropriate creativity" },
    ],
    eventSituation: buildSituation({
      role: "a part-time employee",
      company: "WINDMERE INN",
      judgeRole: "the innkeeper",
      problem:
        "The innkeeper (judge) mentioned a goal of growing WINDMERE's repeat-guest rate this year, and wants you to think about how your own daily work actually connects to that bigger goal, not just your individual tasks.",
      ask:
        "The innkeeper (judge) wants you to explain how you see your role connecting to this organizational goal.",
      location: "the inn's front parlor",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "How does your day-to-day work actually connect to this repeat-guest goal?",
      "What's one creative idea you'd bring to help with this goal?",
    ],
  },
];

const POHT_EVENT: EventCaseStudySeed = {
  eventSlug: "principles-of-hospitality-and-tourism",
  eventName: "Principles of Hospitality and Tourism",
  careerCluster: "Hospitality and Tourism",
  careerPathway: null,
  format: "PRINCIPLES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: POHT_CASES,
};

// ---------------------------------------------------------------------------
// hospitality-and-tourism-professional-selling (PROFESSIONAL_SELLING_CONSULTING,
// same shared 123-code Cluster pool as the two TDM events above)
// ---------------------------------------------------------------------------
const HTPS_CASES: CaseStudySeed[] = [
  {
    title: "Selling a Weekend Package to a First-Time Caller at Cascade Peak Resort",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
      { code: "SE:220", description: "Explain factors that motivate people to choose a hospitality and tourism site" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the prospective guest",
      problem:
        "A caller is comparing CASCADE PEAK against two other mountain resorts for a weekend getaway and has general questions but hasn't committed to visiting any specific website yet.",
      ask:
        "Walk the caller through the resort's offerings and make the case for booking here rather than a competitor.",
      location: "the resort sales office",
      greetingAsk: "to hear about the resort",
    }),
    judgeQuestions: [
      "What made you choose to highlight what you did first in this call?",
      "What would you say if I told you a competitor is offering a lower rate?",
    ],
  },
  {
    title: "Up-Selling a Spa Add-On to a Booked Guest at Cascade Peak Resort",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:221", description: "Recommend hospitality and tourism services" },
      { code: "SE:476", description: "Up-sell to enhance customer experience" },
      { code: "SE:499", description: "Establish relationship with hospitality and tourism customer/guest" },
      { code: "SE:500", description: "Determine hospitality and tourism customer/guest needs" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest has already booked a standard room for an anniversary trip and calls to confirm details, giving you an opening to suggest something that could make the stay more memorable.",
      ask:
        "Determine what this guest actually wants out of the trip and recommend a fitting add-on.",
      location: "the resort sales office",
      greetingAsk: "to confirm my booking details",
    }),
    judgeQuestions: [
      "How did you figure out what would actually matter to me for this occasion?",
      "Why did you recommend that particular add-on instead of another option?",
    ],
  },
  {
    title: "Processing a Complicated Group Request at Cascade Peak Resort",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:329", description: "Process sales transactions (e.g., cash, credit, check)" },
      { code: "SE:149", description: "Process complimentary offers and coupons/discounts" },
      { code: "SE:477", description: "Process telephone orders in hospitality and tourism" },
      { code: "SE:478", description: "Process special orders in hospitality and tourism" },
      { code: "SE:479", description: "Sell gift certificates in hospitality and tourism" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest is booking a group stay for a family reunion by phone, wants to apply a discount code, split payment across two cards, and also purchase a gift certificate for a family member joining separately.",
      ask:
        "Walk through processing this multi-part request accurately.",
      location: "the resort sales office",
      greetingAsk: "to book this group trip",
    }),
    judgeQuestions: [
      "What did you need to confirm before applying that discount code?",
      "How would you make sure this gift certificate reaches the right family member?",
    ],
  },
  {
    title: "Explaining Company Selling Policy to a Skeptical Guest at Cascade Peak Resort",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:932", description: "Explain company selling policies" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
      { code: "SE:048", description: "Explain the selling process" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest is skeptical about the resort's non-refundable rate policy and is pushing back, saying a competitor offers free cancellation and wondering why CASCADE PEAK doesn't.",
      ask:
        "Explain this policy honestly while still making the case for booking here.",
      location: "the resort sales office",
      greetingAsk: "to ask about your cancellation policy",
    }),
    judgeQuestions: [
      "How would you explain this policy without sounding like you're just defending a rule?",
      "What would you offer instead if I'm still hesitant because of this policy?",
    ],
  },
  {
    title: "Recommending the Right Room Type for a Family at Cascade Peak Resort",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:220", description: "Explain factors that motivate people to choose a hospitality and tourism site" },
      { code: "SE:221", description: "Recommend hospitality and tourism services" },
      { code: "SE:499", description: "Establish relationship with hospitality and tourism customer/guest" },
      { code: "SE:500", description: "Determine hospitality and tourism customer/guest needs" },
      { code: "SE:017", description: "Explain the nature and scope of the selling function" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A parent is calling to book a trip for a family of five, unsure whether to get two connecting rooms or a larger suite, and mentions budget is a real concern.",
      ask:
        "Determine this family's actual needs and recommend the room configuration that fits both their needs and budget.",
      location: "the resort sales office",
      greetingAsk: "to book a room for my family",
    }),
    judgeQuestions: [
      "What questions did you ask to figure out what this family actually needs?",
      "Why did you recommend that configuration over the alternative?",
    ],
  },
  {
    title: "Turning a One-Time Guest Into a Repeat Client at Cascade Peak Resort",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:476", description: "Up-sell to enhance customer experience" },
      { code: "SE:828", description: "Explain key factors in building a clientele" },
      { code: "SE:932", description: "Explain company selling policies" },
      { code: "SE:062", description: "Acquire product information for use in selling" },
      { code: "SE:076", description: "Explain the role of customer service as a component of selling relationships" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest who stayed once last year is calling to book again but mentions she's also looking at other resorts for variety, giving you a chance to build a real relationship rather than just process another transaction.",
      ask:
        "Explain how you'd approach this call to build lasting loyalty rather than just closing one more booking.",
      location: "the resort sales office",
      greetingAsk: "to talk about booking again",
    }),
    judgeQuestions: [
      "What would you do differently on this call versus a first-time caller?",
      "What would make me choose to keep coming back here instead of trying somewhere new?",
    ],
  },
  {
    title: "Managing Guest Expectations During Peak Season at Cascade Peak Resort",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:038", description: "Identify strategies to manage customer experience during peaks in demand" },
      { code: "CR:039", description: "Maintain service standards during peaks in demand" },
      { code: "CR:052", description: "Identify factors associated with positive customer experiences" },
      { code: "CR:053", description: "Anticipate unspoken customer needs" },
      { code: "CR:054", description: "Accommodate special needs/specific requests of customers" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest calling during the resort's busiest ski-season week is worried that with everything so full, their stay won't get the same attention as during a quieter time.",
      ask:
        "Reassure this guest and explain how you'd anticipate their needs even during peak season.",
      location: "the resort sales office",
      greetingAsk: "to ask about booking during peak week",
    }),
    judgeQuestions: [
      "What would you do to make sure this guest's experience doesn't feel diminished during a busy week?",
      "What unspoken need might a guest have during a stay this crowded?",
    ],
  },
  {
    title: "Recovering a Guest After a Past Bad Experience at Cascade Peak Resort",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:043", description: "Describe customer-service challenges in the hospitality and tourism industry" },
      { code: "CR:044", description: "Resolve hospitality and tourism related conflicts for customers" },
      { code: "CR:045", description: "Explain the nature of guest recovery" },
      { code: "CR:046", description: "Determine strategies for resolving customer-service situations" },
      { code: "CR:049", description: "Explain the nature of customer service in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest calling to inquire about a return stay mentions, somewhat hesitantly, that his last visit had a housekeeping issue that never got fully resolved, and he's not sure whether to give the resort another chance.",
      ask:
        "Address this past experience and make the case for why this stay would be different.",
      location: "the resort sales office",
      greetingAsk: "to ask about coming back, though I'm a little hesitant",
    }),
    judgeQuestions: [
      "How would you address this past issue without sounding dismissive of it?",
      "What would you do differently to make sure this stay actually goes better?",
    ],
  },
  {
    title: "Handling a Guest's Special Accessibility Request at Cascade Peak Resort",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:051", description: "Identify factors affecting customer-service practices in hospitality and tourism" },
      { code: "CR:055", description: "Deliver positive moments of truth" },
      { code: "CR:067", description: "Explain the importance of meeting and exceeding customer/guest expectations" },
      { code: "CR:021", description: "Process customer/guest orders" },
      { code: "CR:028", description: "Use digital media to enhance customer post-sales experience" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest booking a stay has specific mobility-related accessibility needs and wants to confirm the resort can genuinely accommodate them before committing to the trip.",
      ask:
        "Confirm what the resort can offer and make this guest feel confident booking.",
      location: "the resort sales office",
      greetingAsk: "to ask about accessibility before I book",
    }),
    judgeQuestions: [
      "What would you confirm before promising this guest anything specific?",
      "How would you follow up after this call to reinforce that confidence?",
    ],
  },
  {
    title: "Rebuilding Trust After a Booking Error at Cascade Peak Resort",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:028", description: "Use digital media to enhance customer post-sales experience" },
      { code: "CR:067", description: "Explain the importance of meeting and exceeding customer/guest expectations" },
      { code: "CR:052", description: "Identify factors associated with positive customer experiences" },
      { code: "CR:038", description: "Identify strategies to manage customer experience during peaks in demand" },
      { code: "CR:043", description: "Describe customer-service challenges in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest's confirmation email showed the wrong dates for her upcoming stay, and she's calling anxious about whether her whole trip is actually booked correctly.",
      ask:
        "Resolve this guest's concern and rebuild her confidence in the booking.",
      location: "the resort sales office",
      greetingAsk: "to double-check my confirmation because something looked wrong",
    }),
    judgeQuestions: [
      "What would you check first to confirm what actually happened with this booking?",
      "What would you do to reassure this guest beyond just fixing the dates?",
    ],
  },
  {
    title: "Explaining What's Actually Included in the Stay at Cascade Peak Resort",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:001", description: "Explain the nature and scope of the product/service management function" },
      { code: "PM:003", description: "Explain the concept of product mix" },
      { code: "PM:021", description: "Explain the nature of product/service branding" },
      { code: "PM:041", description: "Describe the nature of product bundling" },
      { code: "PM:081", description: "Explain the concept of product in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest is confused about which resort amenities are included in the base room rate versus which require an extra fee, having seen conflicting information online.",
      ask:
        "Clearly explain what's included in this stay and what's bundled versus separate.",
      location: "the resort sales office",
      greetingAsk: "to clear up what's actually included in this rate",
    }),
    judgeQuestions: [
      "How would you clear up this confusion in a way that doesn't feel like fine print?",
      "What's bundled into this rate that guests might not realize is included?",
    ],
  },
  {
    title: "Positioning the Resort Against a Bigger Chain Competitor at Cascade Peak Resort",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:095", description: "Describe services offered by the hospitality and tourism industry" },
      { code: "PM:099", description: "Explain the nature of product extensions in the hospitality and tourism industry" },
      { code: "PM:206", description: "Explain the nature of corporate branding" },
      { code: "PM:214", description: "Communicate core values of product/service" },
      { code: "PM:239", description: "Evaluate vendors' goods and services" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest mentions she's also considering a large national resort chain with more amenities, and is asking directly why she should pick this smaller, independent resort instead.",
      ask:
        "Make the case for CASCADE PEAK's value against this bigger competitor.",
      location: "the resort sales office",
      greetingAsk: "to hear why I should pick you over the bigger chain",
    }),
    judgeQuestions: [
      "What core value would you lead with in answering this question?",
      "What's something this resort offers that a bigger chain genuinely can't?",
    ],
  },
  {
    title: "Explaining a Service Guarantee to a Nervous Guest at Cascade Peak Resort",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:246", description: "Identify product's/service's competitive advantage" },
      { code: "PM:314", description: "Explain guarantees in hospitality and tourism" },
      { code: "PM:317", description: "Describe the role of customer voice in hospitality and tourism branding" },
      { code: "PM:318", description: "Choose hospitality and tourism vendors" },
      { code: "PM:319", description: "Negotiate terms with hospitality and tourism suppliers" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest booking an expensive ski package wants to know what happens if the mountain doesn't get enough snow this season, worried about paying for a trip that doesn't deliver.",
      ask:
        "Explain any relevant guarantee and reassure this guest about the value of booking.",
      location: "the resort sales office",
      greetingAsk: "to ask what happens if there isn't enough snow",
    }),
    judgeQuestions: [
      "What would you actually tell this guest about what's guaranteed here?",
      "What's our real competitive advantage even in a low-snow scenario?",
    ],
  },
  {
    title: "Addressing a Security Concern Before Booking at Cascade Peak Resort",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:115", description: "Explain security considerations in the hospitality and tourism industry" },
      { code: "OP:119", description: "Handle emergency situations in hospitality and tourism" },
      { code: "OP:517", description: "Comply with strategies for protecting business' digital assets (e.g., website, social media, email, etc.)" },
      { code: "OP:518", description: "Comply with strategies to protect digital customer data (e.g., information about customers, customers' credit-card numbers, passwords, customer transactions)" },
      { code: "OP:653", description: "Identify credit card fraud prevention methods" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest is hesitant to give payment information over the phone after hearing about a data breach at another travel company recently, and wants reassurance before booking.",
      ask:
        "Address this security concern honestly and make this guest feel comfortable providing payment information.",
      location: "the resort sales office",
      greetingAsk: "to book, though I'm a bit wary about giving my card info over the phone",
    }),
    judgeQuestions: [
      "How would you reassure this guest about payment security without dismissing their concern?",
      "What would you actually do differently if this guest still isn't comfortable?",
    ],
  },
  {
    title: "Explaining Shuttle and Transportation Logistics at Cascade Peak Resort",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:522", description: "Explain the nature and scope of distribution" },
      { code: "OP:523", description: "Explain the relationship between customer service and distribution" },
      { code: "OP:529", description: "Explain the concept of place (distribution) in the hospitality and tourism industry" },
      { code: "OP:654", description: "Explain the nature of identity theft controls" },
      { code: "OP:657", description: "Provide first-aid" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest flying in wants to know exactly how airport shuttle logistics work and is anxious about arriving late at night without knowing where to go.",
      ask:
        "Walk this guest through the transportation logistics clearly enough to put them at ease.",
      location: "the resort sales office",
      greetingAsk: "to ask how I actually get from the airport to the resort",
    }),
    judgeQuestions: [
      "What would you make sure this guest knows before their flight to avoid confusion on arrival?",
      "What would you tell them to do if something goes wrong with the shuttle timing?",
    ],
  },
  {
    title: "Answering Detailed Questions From a Well-Researched Guest at Cascade Peak Resort",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:279", description: "Explain the need for hospitality and tourism business information" },
      { code: "NF:280", description: "Identify information monitored for business decision making" },
      { code: "NF:281", description: "Explain sources of secondary hospitality and tourism information" },
      { code: "NF:282", description: "Explain types of primary hospitality and tourism market information" },
      { code: "NF:283", description: "Describe methods used to collect hospitality and tourism business information (e.g., observations, mail, telephone, Internet, discussion groups, interviews)" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest has clearly read every online review and comparison site before calling, and is asking pointed questions that require you to know the resort's actual data and reputation, not just a sales script.",
      ask:
        "Answer this guest's detailed questions credibly using real information about the resort.",
      location: "the resort sales office",
      greetingAsk: "to ask some pretty specific questions I've researched",
    }),
    judgeQuestions: [
      "How would you handle a question you genuinely don't know the answer to in this call?",
      "What information source would back up your answers most credibly?",
    ],
  },
  {
    title: "Using Guest History to Personalize a Sales Call at Cascade Peak Resort",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:284", description: "Obtain business information from customer databases" },
      { code: "NF:285", description: "Identify challenges with the use of unstructured business data" },
      { code: "NF:286", description: "Obtain hospitality and tourism information from online sources (e.g., search engines, online databases, blogs, forums, listservs, web analytics, social media, geolocation services)" },
      { code: "NF:287", description: "Track environmental changes that impact hospitality and tourism (e.g., technological changes, guest trends, economic changes, regulatory changes)" },
      { code: "NF:288", description: "Monitor hospitality and tourism sales data" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A returning guest is calling in, and the resort's guest database has notes from his last stay, but they're messy and inconsistently entered, making it hard to quickly find what actually mattered to him last time.",
      ask:
        "Use whatever information you can pull together to personalize this call despite the messy notes.",
      location: "the resort sales office",
      greetingAsk: "to book again, and I'm hoping you remember my last stay",
    }),
    judgeQuestions: [
      "How would you work around messy or incomplete notes to still personalize this call?",
      "What would you recommend changing about how guest notes get recorded?",
    ],
  },
  {
    title: "Explaining a Seasonal Promotion at Cascade Peak Resort",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:001", description: "Explain the role of promotion as a marketing function" },
      { code: "PR:002", description: "Explain the types of promotion (i.e., institutional, product)" },
      { code: "PR:003", description: "Identify the elements of the promotional mix" },
      { code: "PR:082", description: "Explain promotional methods used by the hospitality and tourism industry" },
      { code: "PR:121", description: "Describe the concept of promotion in the hospitality and tourism industry" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest saw a \"stay 3, get 1 free\" promotion advertised online but is confused about which room types and dates it actually applies to.",
      ask:
        "Clearly explain this promotion's terms and help this guest book if it fits their trip.",
      location: "the resort sales office",
      greetingAsk: "to ask about this promotion I saw online",
    }),
    judgeQuestions: [
      "How would you explain this promotion's terms clearly without sounding like you're reading fine print?",
      "What would you do if this guest's trip doesn't quite fit the promotion's terms?",
    ],
  },
  {
    title: "Justifying the Price of a Premium Suite at Cascade Peak Resort",
    instructionalArea: "Pricing",
    performanceIndicators: [
      { code: "PI:001", description: "Explain the nature and scope of the pricing function" },
      { code: "PI:029", description: "Explain the concept of price in the hospitality and tourism industry" },
      { code: "FI:541", description: "Interpret cash-flow statements" },
      { code: "FI:789", description: "Discuss considerations in accepting credit-card payments" },
      { code: "FI:790", description: "Calculate credit-card processing costs" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A guest is balking at the price difference between a standard room and the premium suite, wondering aloud whether the extra cost is really worth it for just two nights.",
      ask:
        "Make the case for this price difference in a way that feels honest, not just upselling.",
      location: "the resort sales office",
      greetingAsk: "to ask if this suite is really worth the extra cost",
    }),
    judgeQuestions: [
      "What would you point to specifically to justify this price difference?",
      "How would you respond if this guest still decides the standard room is the better fit?",
    ],
  },
  {
    title: "Identifying What Kind of Trip This Guest Actually Wants at Cascade Peak Resort",
    instructionalArea: "Market Planning",
    performanceIndicators: [
      { code: "MP:003", description: "Explain the concept of market and market identification" },
      { code: "MP:035", description: "Identify ways to segment hospitality and tourism markets" },
      { code: "MP:041", description: "Explain the use of marketing strategies in hospitality and tourism" },
      { code: "MK:008", description: "Differentiate between service marketing and product marketing" },
      { code: "EC:136", description: "Explain the relationship between the economy and hospitality and tourism" },
    ],
    eventSituation: buildSituation({
      role: "the sales associate",
      company: "CASCADE PEAK RESORT",
      judgeRole: "the guest",
      problem:
        "A caller is vague about what he's actually looking for, mentioning \"maybe skiing, maybe just relaxing,\" giving you very little to work with in recommending the right package.",
      ask:
        "Figure out what kind of traveler this is and recommend the offering that actually fits.",
      location: "the resort sales office",
      greetingAsk: "to talk about a trip, though I'm not totally sure what I want yet",
    }),
    judgeQuestions: [
      "What questions would you ask to narrow down what kind of trip this actually is?",
      "How did the answers change what you ended up recommending?",
    ],
  },
];

const HTPS_EVENT: EventCaseStudySeed = {
  eventSlug: "hospitality-and-tourism-professional-selling",
  eventName: "Hospitality and Tourism Professional Selling",
  careerCluster: "Hospitality and Tourism",
  careerPathway: null,
  format: "PROFESSIONAL_SELLING_CONSULTING",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: HTPS_CASES,
};

export const HOSPITALITY_CASE_STUDY_SEED_2: EventCaseStudySeed[] = [
  HSTDM_EVENT,
  TTTDM_EVENT,
  POHT_EVENT,
  HTPS_EVENT,
];
