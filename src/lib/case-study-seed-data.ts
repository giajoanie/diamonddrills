/**
 * Bulk-authored roleplay case studies, formatted like DECA's own published
 * events (see the AAM-26 District Event 1 sample the mentor provided) but
 * delivered as plain-text Resource entries rather than PDFs. Each case
 * study's Performance Indicators are pulled verbatim from this event's own
 * seeded PerformanceIndicator rows (Pathway: Merchandising tier) — the same
 * data the "Performance indicators to review" panel on /roleplay/start
 * already shows students — grouped by instructional area so a case study's
 * scenario and its PIs are thematically consistent, the same way DECA's own
 * event sets work.
 *
 * Scope: this is a sample batch for ONE event (Apparel and Accessories
 * Marketing Series) to sign off on format/quality before scaling to the
 * other 29 active roleplay events.
 */

export type CaseStudyPI = { code: string; description: string };

export type CaseStudySeed = {
  title: string;
  instructionalArea: string;
  performanceIndicators: CaseStudyPI[];
  eventSituation: string;
  judgeQuestions: [string, string];
};

export type EventCaseStudySeed = {
  eventSlug: string;
  eventName: string;
  careerCluster: string;
  careerPathway: string | null;
  format: "PRINCIPLES" | "SERIES" | "TEAM_DECISION_MAKING" | "PROFESSIONAL_SELLING_CONSULTING" | "PERSONAL_FINANCIAL_LITERACY";
  prepMinutes: number;
  presentMinutes: number;
  cases: CaseStudySeed[];
};

const AAM_CASES: CaseStudySeed[] = [
  {
    title: "Return Shipment Backlog at Thread & Co.",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:384", description: "Explain the receiving process" },
      { code: "OP:385", description: "Explain stock-handling techniques used in receiving deliveries" },
      { code: "OP:386", description: "Process incoming merchandise" },
      { code: "OP:387", description: "Resolve problems with incoming shipments" },
      { code: "OP:377", description: "Explain distribution issues and trends" },
    ],
    eventSituation:
      "You are to assume the role of the receiving associate at THREAD & CO., a mid-size apparel chain with 60 stores. The store manager (judge) has noticed that shipments from the regional distribution center have been arriving with mismatched packing slips, damaged boxes, and occasional short shipments over the past month, and the backlog of unprocessed deliveries is now blocking the stockroom door.\n\nTHREAD & CO. receives two truck deliveries per week, each averaging 40-60 cartons of apparel and accessories. Store policy requires every carton to be checked against its packing slip, inspected for damage, and logged into the inventory system before it can be moved to the sales floor. Associates have started skipping steps to keep up, and a shipment of holiday sweaters was recently found still sealed in the stockroom two weeks after arrival, missing the seasonal sales window entirely.\n\nThe store manager (judge) wants you to propose a clear, workable process for handling receiving deliveries — from the moment the truck arrives to the moment merchandise reaches the sales floor — that catches shipment problems immediately instead of letting them pile up.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place in the stockroom office. The store manager (judge) will begin by greeting you and asking to hear your plan. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "What should an associate do the moment they notice a shipment doesn't match its packing slip?",
      "How would you prevent a sealed carton from sitting unprocessed for two weeks again?",
    ],
  },
  {
    title: "Shrinkage Spike at Thread & Co.",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:122", description: "Explain policies/procedures for handling shoplifters" },
      { code: "OP:172", description: "Devise/Enact merchandise security measures to minimize inventory shrinkage" },
      { code: "OP:389", description: "Attach source and anti-theft tags" },
      { code: "OP:415", description: "Determine inventory shrinkage" },
      { code: "OP:526", description: "Describe ethical considerations in distribution" },
    ],
    eventSituation:
      "You are to assume the role of the loss prevention associate at THREAD & CO., a mid-size apparel chain. The store manager (judge) has just reviewed the quarterly inventory count and found that shrinkage at this location has more than doubled compared to last quarter, well above the company's target rate.\n\nA walkthrough of the sales floor and stockroom turned up several likely contributors: a batch of leather jackets that reached the floor without anti-theft tags attached, a fitting room attendant position that has gone unfilled for six weeks, and a security-camera blind spot near the accessories wall that staff have mentioned informally but no one has escalated.\n\nThe store manager (judge) wants you to determine which of these factors are driving the shrinkage increase and recommend specific, realistic changes to receiving, tagging, and floor procedures to bring the rate back down — without creating a store environment that makes honest customers feel surveilled or unwelcome.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place in the manager's office. The store manager (judge) will begin by greeting you and asking what you found. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "Where in our current process is a garment most likely to slip through without a security tag?",
      "How do we tighten these procedures without making customers feel like suspects?",
    ],
  },
  {
    title: "Register Discrepancies at Thread & Co.",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:194", description: "Prepare cash drawers/banks" },
      { code: "OP:195", description: "Open/Close register/terminal" },
      { code: "OP:398", description: "Enter product descriptions into a PoS system" },
      { code: "OP:391", description: "Make and record price changes" },
      { code: "OP:390", description: "Price mark merchandise" },
    ],
    eventSituation:
      "You are to assume the role of a shift lead at THREAD & CO. The store manager (judge) has flagged that register drawers have been over or under at closing three times in the past two weeks, and a sale item recently rang up at full price at the register even though its shelf tag showed a markdown.\n\nTHREAD & CO. runs three registers during peak hours, each staffed by a rotating group of part-time associates. New hires are trained on the register briefly during onboarding, but there is no written checklist for opening or closing a drawer, and price changes from weekly markdown lists are applied to shelf tags by whoever has time, sometimes a day or two after the system price actually changes.\n\nThe store manager (judge) wants you to design a clear opening/closing procedure for registers and a reliable process for keeping shelf prices and system prices in sync, so drawers balance and customers are never charged the wrong price.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place near the front registers. The store manager (judge) will begin by greeting you and asking to hear your plan. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "What's the very first thing an associate should do when they open a cash drawer for their shift?",
      "How do we make sure a markdown is reflected on the shelf the same day it changes in the system?",
    ],
  },
  {
    title: "Delayed Online Orders at Thread & Co.",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:378", description: "Discuss the use of electronic data interchange (EDI)" },
      { code: "OP:380", description: "Use an information system for order fulfillment" },
      { code: "OP:381", description: "Fulfill orders" },
      { code: "OP:420", description: "Ensure timely delivery of advertised merchandise" },
      { code: "OP:406", description: "Identify factors considered when selecting best shipping method" },
    ],
    eventSituation:
      "You are to assume the role of the ship-from-store coordinator at THREAD & CO. The store manager (judge) has received several customer complaints that online orders promised for 2-day delivery are consistently arriving 4-5 days late, right as the store is running a heavily advertised flash sale that depends on fast fulfillment to drive repeat traffic.\n\nTHREAD & CO.'s store-level order system pulls orders from the e-commerce platform via an automated data feed, but associates have been manually re-checking each order against the paper pick list before fulfilling it, which slows the process down. The store also defaults every shipment to the cheapest carrier option regardless of the promised delivery window, and there is no one clearly responsible for flagging orders that are at risk of missing their promised date.\n\nThe store manager (judge) wants you to determine how to speed up order fulfillment and choose shipping methods that actually match what was promised to the customer, especially during the current flash sale.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place in the ship-from-store area. The store manager (judge) will begin by greeting you and asking to hear your plan. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "Why might trusting the automated data feed actually be safer than the manual re-check associates are doing now?",
      "How should we decide which shipping method to use for a specific order during the flash sale?",
    ],
  },
  {
    title: "Slow Sales-Floor Restock at Thread & Co.",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:392", description: "Identify hang-tag needs" },
      { code: "OP:393", description: "Assign codes to each product item" },
      { code: "OP:394", description: "Route stock to sales floor" },
      { code: "OP:395", description: "Rotate stock" },
      { code: "OP:417", description: "Implement category management process" },
    ],
    eventSituation:
      "You are to assume the role of the stockroom associate at THREAD & CO. The store manager (judge) has noticed that new merchandise often sits in the stockroom for several days before reaching the sales floor, and older stock is frequently found buried behind newer arrivals, still wearing last season's price tags.\n\nTHREAD & CO. receives new apparel weekly, but there is no set order for which categories get restocked first, and hang-tags are sometimes applied inconsistently, some items arrive tagged from the vendor while others need tags attached in-store. Associates have also mentioned that it's hard to tell at a glance which stockroom shelf holds which product category, slowing down the whole restocking process.\n\nThe store manager (judge) wants you to propose a system for organizing the stockroom by category, tagging incoming stock consistently, and rotating older merchandise to the front so nothing gets stranded in the back.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place in the stockroom. The store manager (judge) will begin by greeting you and asking to hear your plan. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "How would you decide which product categories get moved to the sales floor first each week?",
      "What's your plan for making sure older stock doesn't get buried behind new arrivals again?",
    ],
  },
  {
    title: "Branch Transfer Confusion at Thread & Co.",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:396", description: "Process returned/damaged product" },
      { code: "OP:397", description: "Transfer stock to/from branches" },
      { code: "OP:409", description: "Complete inventory counts" },
      { code: "OP:408", description: "Report out-of-stocks" },
      { code: "OP:407", description: "Maintain inventory levels" },
    ],
    eventSituation:
      "You are to assume the role of the inventory associate at THREAD & CO. The store manager (judge) has discovered that a shipment of denim jackets transferred to a nearby sister store last month was never properly logged as leaving this location, so this store's system still shows 15 jackets in stock that physically aren't here, while the sister store's system shows a shortage.\n\nTHREAD & CO. regularly transfers merchandise between its five stores in the district to balance stock levels, and processes customer returns and damaged-product write-offs on the same shelves used for transfer staging, which the store manager (judge) suspects is part of why items are getting mixed up. The most recent physical inventory count also turned up several popular items reported as out-of-stock in the system that were actually sitting in the stockroom, unscanned.\n\nThe store manager (judge) wants you to determine what went wrong with the jacket transfer and recommend a clearer process for transfers, returns, and inventory counts so stock levels in the system actually match what's on the shelves.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place in the inventory office. The store manager (judge) will begin by greeting you and asking to hear your findings. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "What step in the transfer process do you think broke down with the denim jackets?",
      "How often should we be doing inventory counts to catch a mismatch like this sooner?",
    ],
  },
  {
    title: "Overflowing Stockroom at Thread & Co.",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:400", description: "Explain storing considerations" },
      { code: "OP:401", description: "Explain the nature of warehousing" },
      { code: "OP:402", description: "Store inventory" },
      { code: "OP:405", description: "Explain shipping processes" },
      { code: "OP:410", description: "Monitor merchandise classification system" },
    ],
    eventSituation:
      "You are to assume the role of the stockroom lead at THREAD & CO. The store manager (judge) is preparing for a major seasonal delivery, twice the store's normal weekly volume, and is concerned the stockroom cannot physically hold it without becoming a safety hazard.\n\nTHREAD & CO.'s stockroom currently stores everything from off-season overstock to shipping supplies to customer will-call orders in the same open area with no clear zones, and boxes are frequently stacked in walkways because there is no designated spot for them. The store manager (judge) has also mentioned that outbound shipments (transfers and online returns to the vendor) sometimes get delayed because no one notices they're ready to go out until the shipping carrier is already at the door.\n\nThe store manager (judge) wants you to propose a plan for organizing stockroom space into clear zones and a process for tracking what's ready to ship out, so the store can handle the incoming seasonal volume safely and efficiently.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place in the stockroom. The store manager (judge) will begin by greeting you and asking to hear your plan. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "What categories of items need their own dedicated zone in this stockroom?",
      "How would you make sure an outbound shipment doesn't get missed when the carrier arrives?",
    ],
  },
  {
    title: "Inventory System Mismatch at Thread & Co.",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:411", description: "Allocate merchandise to stores/regions" },
      { code: "OP:412", description: "Track stock by location for department/class/vendor level" },
      { code: "OP:413", description: "Describe inventory control systems" },
      { code: "OP:414", description: "Explain types of unit inventory-control systems" },
      { code: "OP:416", description: "Maintain inventory-control systems" },
    ],
    eventSituation:
      "You are to assume the role of the inventory-control associate at THREAD & CO. Corporate has just rolled out a new unit inventory-control system across the district, and the store manager (judge) is worried the store isn't ready. Recent counts show that stock levels by department don't match what the new system reports, especially for vendor-specific product lines.\n\nTHREAD & CO. receives merchandise allocations from a regional buying office that don't always account for what's already on hand locally, occasionally sending more winter coats than the stockroom can hold while accessories run low. The old system tracked stock only at the store level, but the new system requires tracking by department, class, and vendor, and associates haven't been trained on what that actually means day to day.\n\nThe store manager (judge) wants you to explain how the new system should work, identify where the current stock counts are going wrong, and recommend how the store should maintain accurate records going forward.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place in the back office. The store manager (judge) will begin by greeting you and asking you to walk through the new system. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "In plain terms, what's the difference between tracking stock by store versus by department, class, and vendor?",
      "What should we tell the regional buying office about how allocations are affecting our stock levels?",
    ],
  },
  {
    title: "Distribution Policy Review at Thread & Co.",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "OP:040", description: "Follow up orders" },
      { code: "OP:522", description: "Explain the nature and scope of distribution" },
      { code: "OP:523", description: "Explain the relationship between customer service and distribution" },
      { code: "OP:524", description: "Describe the use of technology in distribution" },
      { code: "OP:525", description: "Explain legal considerations in distribution" },
    ],
    eventSituation:
      "You are to assume the role of a management trainee at THREAD & CO. Corporate is reviewing distribution practices across all stores after a competitor faced legal trouble over mishandled customer data tied to its shipment-tracking technology, and the store manager (judge) has asked you to prepare a distribution overview for the store's upcoming staff meeting.\n\nTHREAD & CO. relies on a third-party shipment-tracking app that customers use to follow their online orders, and the store manager (judge) wants to make sure staff understand what distribution actually covers, how it connects to the customer experience, and what the store needs to watch for legally when using tracking technology and customer data.\n\nThe store manager (judge) also wants the training to address one recurring issue: orders that are placed but never followed up on when a delay occurs, leaving customers to find out their order is late only when it doesn't arrive on time.\n\nYou will present your material to the store manager (judge) in a role-play to take place in the break room where the staff meeting will happen. The store manager (judge) will begin by greeting you and asking you to walk through what you've prepared. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "How does distribution connect to whether a customer decides to shop with us again?",
      "What should an associate do differently to make sure a delayed order gets followed up on proactively?",
    ],
  },
  {
    title: "Overbought Spring Line at Thread & Co.",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:058", description: "Calculate open-to-buy" },
      { code: "PM:061", description: "Explain the nature of merchandise plans (budgets)" },
      { code: "PM:062", description: "Plan stock" },
      { code: "PM:063", description: "Plan reductions (e.g., anticipated markdowns, employee/other discounts, stock shortages)" },
      { code: "PM:064", description: "Plan purchases" },
    ],
    eventSituation:
      "You are to assume the role of the assistant buyer at THREAD & CO. The store manager (judge) has just reviewed the spring merchandise budget and discovered the store is significantly over its open-to-buy for the season, with warm-weather dresses still arriving from vendors even though the stockroom is already full.\n\nTHREAD & CO. plans its seasonal purchases against a merchandise budget set at the start of each quarter, but recent purchase orders were placed without checking remaining open-to-buy, and no one built in a plan for markdowns on slower-moving spring items from last year that are still taking up stockroom space.\n\nThe store manager (judge) wants you to determine how far over budget the store actually is, recommend which planned purchases should be delayed or canceled, and propose a markdown plan to clear out lingering stock before more spring merchandise arrives.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place in the buying office. The store manager (judge) will begin by greeting you and asking to hear your recommendation. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "Walk me through how you'd recalculate our open-to-buy before placing another purchase order.",
      "How would you decide which leftover spring items get marked down first?",
    ],
  },
  {
    title: "New Overseas Vendor at Thread & Co.",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:192", description: "Compare and contrast buying from domestic sources with that of foreign sources" },
      { code: "PM:193", description: "Determine final cost of purchases from domestic and international sources" },
      { code: "PM:239", description: "Evaluate vendors' goods and services" },
      { code: "PM:263", description: "Choose vendors" },
      { code: "PM:264", description: "Negotiate terms with suppliers" },
    ],
    eventSituation:
      "You are to assume the role of the assistant buyer at THREAD & CO. A sales representative from an overseas manufacturer has offered the store a bulk pricing deal on knitwear that looks significantly cheaper than the store's current domestic vendor, and the store manager (judge) wants a recommendation before the offer expires at the end of the week.\n\nTHREAD & CO. has worked with its current domestic knitwear vendor for three years with reliable quality and a two-week lead time. The overseas vendor's quoted price is lower per unit, but the store manager (judge) suspects that once shipping, customs, and a longer lead time are factored in, the real cost difference may be smaller than it first appears, and the store has no history with this vendor's quality or reliability.\n\nThe store manager (judge) wants you to evaluate both options and recommend whether to switch vendors, stay domestic, or negotiate better terms with the current supplier instead.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place in the buying office. The store manager (judge) will begin by greeting you and asking for your recommendation. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "What costs beyond the unit price should factor into comparing these two vendors?",
      "If we stay with our current vendor, what would you try to negotiate given this competing offer?",
    ],
  },
  {
    title: "Reorder Points Out of Date at Thread & Co.",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:232", description: "Establish reorder points" },
      { code: "PM:258", description: "Write purchase orders" },
      { code: "PM:260", description: "Determine what to buy/reorder" },
      { code: "PM:261", description: "Determine quantities to buy/reorder" },
      { code: "PM:262", description: "Determine when to buy/reorder" },
    ],
    eventSituation:
      "You are to assume the role of the assistant buyer at THREAD & CO. The store manager (judge) has noticed that several best-selling basics, plain t-shirts and denim, keep running out between reorders, while a few slower-moving items are reordered on schedule despite still having plenty of stock on the shelf.\n\nTHREAD & CO. set its reorder points two years ago when the store first opened and has not adjusted them since, even though sales patterns have shifted with seasonal trends and a few items have become steady bestsellers. Purchase orders are currently written on a fixed monthly schedule regardless of how fast individual items are actually selling.\n\nThe store manager (judge) wants you to review which items need updated reorder points and propose a more responsive approach to deciding what, how much, and when to reorder, so bestsellers stop running out.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place in the buying office. The store manager (judge) will begin by greeting you and asking to hear your findings. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "How would you decide a new reorder point for one of our bestselling t-shirts?",
      "Why might a fixed monthly reorder schedule not work well for every item in the store?",
    ],
  },
  {
    title: "Assortment Plan for the New Season at Thread & Co.",
    instructionalArea: "Product/Service Management",
    performanceIndicators: [
      { code: "PM:219", description: "Create/maintain daily sales plan" },
      { code: "PM:223", description: "Determine quality of merchandise to offer" },
      { code: "PM:224", description: "Determine stock turnover" },
      { code: "PM:254", description: "Plan merchandise assortment (e.g., styling, sizes, quantities, colors)" },
      { code: "PM:257", description: "Identify emerging trends" },
    ],
    eventSituation:
      "You are to assume the role of the assistant buyer at THREAD & CO. The store manager (judge) is finalizing next season's assortment plan and wants a recommendation on styling, sizing, and color mix, especially since a trend report shows customers increasingly asking for larger size ranges that the store currently under-stocks.\n\nTHREAD & CO. has historically planned its assortment based on last season's sales without adjusting much for emerging trends, and stock turnover data shows that certain sizes sell through quickly while others sit for months and eventually get marked down heavily. The store manager (judge) wants next season's plan to avoid repeating that pattern.\n\nThe store manager (judge) wants you to recommend an assortment plan, including size and color mix, that reflects both the emerging size-range trend and what the turnover data says about quality and demand, and to explain how you'd track whether it's working through a daily sales plan.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place in the buying office. The store manager (judge) will begin by greeting you and asking to hear your plan. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "How should the size-range trend change our buy compared to last season?",
      "What would you track in a daily sales plan to know if this assortment is working?",
    ],
  },
  {
    title: "New Sales Associate Struggling to Connect at Thread & Co.",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:110", description: "Establish relationship with customer/client" },
      { code: "SE:111", description: "Determine customer/client needs" },
      { code: "SE:114", description: "Recommend specific products" },
      { code: "SE:374", description: "Demonstrate good/service" },
      { code: "SE:396", description: "Provide information about incoming merchandise to sales staff" },
    ],
    eventSituation:
      "You are to assume the role of a senior sales associate at THREAD & CO. The store manager (judge) has asked you to coach a newly hired associate whose customer interactions tend to be short and transactional, greeting customers, pointing toward a section, and moving on, rather than actually helping them find what they came in for.\n\nCustomer feedback cards from the past two weeks mention that staff seem unsure what's in stock or arriving soon, and a few customers left without finding items they later learned the store did carry. THREAD & CO. receives a weekly memo listing incoming merchandise, but it's rarely reviewed by floor staff before their shifts.\n\nThe store manager (judge) wants you to put together coaching guidance for the new associate on how to build rapport with customers, uncover what they actually need, recommend the right products, and stay informed about what's arriving so they can better serve shoppers.\n\nYou will present your coaching plan to the store manager (judge) in a role-play to take place on the sales floor before opening. The store manager (judge) will begin by greeting you and asking you to walk through your plan. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "What's a better opening than 'let me know if you need anything' for greeting a customer?",
      "How should an associate use the incoming-merchandise memo during a customer conversation?",
    ],
  },
  {
    title: "Checkout Line Bottleneck at Thread & Co.",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:116", description: "Calculate miscellaneous charges for retail sales" },
      { code: "SE:117", description: "Process retail sales documentation" },
      { code: "SE:152", description: "Accept checks from customers" },
      { code: "SE:153", description: "Operate register/terminal" },
      { code: "SE:329", description: "Process sales transactions (e.g., cash, credit, check)" },
    ],
    eventSituation:
      "You are to assume the role of a shift lead at THREAD & CO. During a recent weekend sale, checkout lines backed up nearly to the store entrance, and the store manager (judge) is concerned some customers abandoned their purchases and left rather than wait.\n\nA review of the slowdown found that associates were unsure how to calculate the mixed discounts and gift-wrap charges the sale involved, several transactions had to be voided and re-rung because of documentation errors, and one associate was visibly uncomfortable processing a personal check and had to call over a manager, adding several minutes to that line alone.\n\nThe store manager (judge) wants you to identify what specifically slowed checkout down and propose training or process changes so the next big sale doesn't repeat the same bottleneck.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place near the front registers. The store manager (judge) will begin by greeting you and asking what you found. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "What's the fastest, most accurate way to calculate a mixed discount and gift-wrap charge together?",
      "What should an associate know about accepting a check so they don't need to call a manager over next time?",
    ],
  },
  {
    title: "Return Without a Receipt at Thread & Co.",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:009", description: "Process special orders for retail sales" },
      { code: "SE:016", description: "Sell gift certificates" },
      { code: "SE:023", description: "Arrange delivery of purchases" },
      { code: "SE:162", description: "Process returns/exchanges" },
      { code: "SE:835", description: "Process retail telephone orders" },
    ],
    eventSituation:
      "You are to assume the role of a sales associate at THREAD & CO. A regular customer calls the store asking to place a phone order for a coat in a size the store doesn't currently have on the floor, wants to pay partly with a gift certificate, and separately mentions she still needs to return a sweater she bought last month but can't find the receipt for.\n\nTHREAD & CO. allows phone orders for items available through a special order from the warehouse, accepts gift certificates as partial payment, and has a receipt-free return policy for items under a set dollar value with a valid ID, but new associates often aren't sure how these processes fit together when a customer brings up several requests in the same conversation.\n\nThe store manager (judge) wants you to walk through how you would handle this customer's full request, phone order, gift certificate payment, delivery arrangement, and the receipt-free return, accurately and without making the customer feel like a hassle.\n\nYou will present your approach to the store manager (judge) in a role-play to take place near customer service. The store manager (judge) will begin by greeting you and asking you to walk through how you'd handle the call. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "What information do you need from the customer before you can process the special order?",
      "How would you verify the receipt-free return without making her feel distrusted?",
    ],
  },
  {
    title: "Losing Sales to Online Competitors at Thread & Co.",
    instructionalArea: "Selling",
    performanceIndicators: [
      { code: "SE:019", description: "Explain the use of brand names in selling" },
      { code: "SE:389", description: "Monitor on-floor selling activities" },
      { code: "SE:489", description: "Plan follow-up strategies for use in retail selling" },
      { code: "SE:874", description: "Convert customer/client objections into selling points" },
      { code: "SE:875", description: "Demonstrate suggestion selling" },
    ],
    eventSituation:
      "You are to assume the role of a sales associate at THREAD & CO. The store manager (judge) has noticed a pattern on the sales floor: customers try on items, seem interested, but say they'll \"check online first\" and leave without buying, and almost none of those customers are being followed up with afterward.\n\nFloor observations show associates rarely mention the specific brand reputation or in-store advantages (like trying items on, no shipping wait, easy in-person returns) when a customer raises the \"I'll check online\" objection, and once a customer leaves without buying, there's no consistent way the store tries to reconnect with them.\n\nThe store manager (judge) wants you to develop a selling approach for handling the online-price objection in the moment, using suggestion selling to build a stronger cart before the customer even gets to that objection, and a follow-up plan for customers who leave without purchasing.\n\nYou will present your approach to the store manager (judge) in a role-play to take place on the sales floor. The store manager (judge) will begin by greeting you and asking to hear your plan. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "How would you respond in the moment when a customer says they'll just check the price online?",
      "What would a realistic follow-up plan look like for a customer who leaves without buying?",
    ],
  },
  {
    title: "Window Display Not Driving Traffic at Thread & Co.",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:023", description: "Explain the use of visual merchandising in retailing" },
      { code: "PR:026", description: "Explain types of display arrangements" },
      { code: "PR:031", description: "Select and use display fixtures/forms" },
      { code: "PR:047", description: "Create displays" },
      { code: "PR:302", description: "Distinguish between visual merchandising and display" },
    ],
    eventSituation:
      "You are to assume the role of the visual merchandising associate at THREAD & CO. The store manager (judge) has noticed that foot traffic hasn't picked up since the new seasonal window display went up two weeks ago, even though the store invested in new mannequins and fixtures for it.\n\nThe current window groups items loosely by color rather than telling any clear story about how to wear them together, uses only one display arrangement style throughout, and the store manager (judge) suspects that passersby glance at it without being drawn to actually walk in. Corporate has also asked the store manager (judge) to clarify to staff the difference between visual merchandising as a whole and a single display, since the two terms keep getting used interchangeably in team conversations.\n\nThe store manager (judge) wants you to propose a redesigned window concept that tells a clearer story and is more likely to pull people inside, and to explain the visual-merchandising-versus-display distinction so the team is on the same page going forward.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place near the front window. The store manager (judge) will begin by greeting you and asking to hear your concept. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "What story would your redesigned window tell, and why would that pull someone inside?",
      "How would you explain the difference between visual merchandising and a display to a new hire?",
    ],
  },
  {
    title: "Displays Falling Apart Mid-Season at Thread & Co.",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:052", description: "Maintain displays" },
      { code: "PR:054", description: "Dismantle/Store displays/display fixtures/forms" },
      { code: "PR:077", description: "Plan/Schedule displays/themes with management" },
      { code: "PR:349", description: "Read/Implement planograms" },
      { code: "PR:359", description: "Use lighting to highlight products" },
    ],
    eventSituation:
      "You are to assume the role of the visual merchandising associate at THREAD & CO. Midway through the current promotional theme, several in-store displays look messy, folded stacks have collapsed, mannequins have shifted out of position, and a customer commented that a lighting fixture highlighting the featured jewelry wall appears to be burnt out.\n\nTHREAD & CO. sets up new displays at the start of each promotional theme following a planogram from corporate, but there's no routine for checking on them once they're built, and the store manager (judge) has noticed that fixtures and forms from the previous theme are sometimes still tucked in a corner instead of properly stored, making it harder to set up the next one.\n\nThe store manager (judge) wants you to propose a maintenance routine for displays already on the floor and a better process for planning, scheduling, and storing display materials between themes.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place on the sales floor. The store manager (judge) will begin by greeting you and asking what you found. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "How often should displays be checked once they're set up, and what should associates be looking for?",
      "What would a better process for storing fixtures between themes look like?",
    ],
  },
  {
    title: "Weak Turnout for the Store Anniversary Event at Thread & Co.",
    instructionalArea: "Promotion",
    performanceIndicators: [
      { code: "PR:068", description: "Prepare store/department for special event" },
      { code: "PR:109", description: "Create promotional signs" },
      { code: "PR:114", description: "Set up point-of-sale displays and handouts" },
      { code: "PR:209", description: "Develop promotional calendar" },
      { code: "PR:360", description: "Plan special events" },
    ],
    eventSituation:
      "You are to assume the role of the promotions associate at THREAD & CO. Last year's store anniversary event drew a strong crowd, but this year's event, held two weeks ago, had noticeably light turnout despite the store spending roughly the same budget on it.\n\nA review afterward showed that in-store signage for the event only went up the day before, point-of-sale handouts promoting it weren't set up until the morning of, and the event wasn't listed anywhere on the store's promotional calendar until a week before it happened, well after the usual lead time other successful events have gotten.\n\nThe store manager (judge) wants you to figure out what went wrong with this year's planning and put together a plan for the next special event, including timeline, signage, and in-store promotion, that gives it a real chance at strong turnout.\n\nYou will present your ideas to the store manager (judge) in a role-play to take place in the manager's office. The store manager (judge) will begin by greeting you and asking to hear your plan. After you have presented your ideas and answered the store manager's (judge's) questions, the store manager (judge) will conclude the role-play by thanking you for your work.",
    judgeQuestions: [
      "How far in advance should signage and promotion for a special event actually start?",
      "What belongs on a promotional calendar, and how far out should we be planning it?",
    ],
  },
];

export const CASE_STUDY_SEED: EventCaseStudySeed[] = [
  {
    eventSlug: "apparel-and-accessories-marketing-series",
    eventName: "Apparel and Accessories Marketing Series",
    careerCluster: "Marketing",
    careerPathway: "Merchandising",
    format: "SERIES",
    prepMinutes: 10,
    presentMinutes: 10,
    cases: AAM_CASES,
  },
];
