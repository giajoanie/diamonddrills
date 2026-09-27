/**
 * Finance cluster case studies for the 5 roleplay events in this cluster.
 * Performance indicators are pulled verbatim from this app's own seeded
 * PerformanceIndicator rows: Cluster + Pathway tier for the Series events
 * (Accounting Applications Series, Business Finance Series), Cluster tier
 * only for the two Core+Cluster events (Financial Services Team Decision
 * Making, Financial Consulting — neither names a Tier 3 pathway per the
 * source PI document's own event/page-range table), and Core tier only for
 * Principles of Finance (its own examBankId IS the Business Administration
 * Core bank — see getPerformanceIndicatorsForEvent).
 */
import { buildSituation } from "./case-study-scenario-builder";
import type { CaseStudySeed, EventCaseStudySeed } from "./case-study-seed-data";

// ---------------------------------------------------------------------------
// accounting-applications-series (SERIES, Accounting pathway)
// ---------------------------------------------------------------------------
const ACT_CASES: CaseStudySeed[] = [
  {
    title: "A New Client Asks About Compliance at Ledger Peak Accounting Group",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:088", description: "Comply with financial reporting and internal control regulations in accounting" },
      { code: "BL:090", description: "Discuss state regulation of the accounting industry" },
      { code: "BL:153", description: "Explain financial disclosure regulations and policies" },
      { code: "BL:154", description: "Comply with state regulations" },
      { code: "BL:163", description: "Comply with the spirit and intent of laws and regulations" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A prospective small-business client is nervous about signing on, worried that switching accounting firms mid-year could put her out of compliance with state and financial-disclosure rules she doesn't fully understand.",
      ask:
        "The accounting manager (judge) wants you to explain, in plain terms, what compliance obligations apply and how LEDGER PEAK will keep this client on the right side of them.",
      location: "a client-consultation room",
      greetingAsk: "to hear how you'd address this client's concerns",
    }),
    judgeQuestions: [
      "What state regulation should this client be most aware of as a small business?",
      "How would you reassure her that switching firms mid-year won't create a compliance gap?",
    ],
  },
  {
    title: "Setting Up the Books for a New Retail Client at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:342", description: "Discuss the nature of the accounting cycle" },
      { code: "FI:378", description: "Demonstrate the effects of transactions on the accounting equation" },
      { code: "FI:379", description: "Prepare a chart of accounts" },
      { code: "FI:381", description: "Journalize business transactions" },
      { code: "FI:407", description: "Explain the nature of special journals" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A new retail client has been keeping transactions in a single spreadsheet with no real structure, and the accounting manager (judge) wants a proper set of books built from scratch before month-end.",
      ask:
        "The accounting manager (judge) wants you to walk through how you'd set up this client's chart of accounts and get the accounting cycle started correctly.",
      location: "a client-consultation room",
      greetingAsk: "to hear your setup plan",
    }),
    judgeQuestions: [
      "What would you include in this retailer's chart of accounts that a service business wouldn't need?",
      "Where would a special journal actually save this client time over a general journal?",
    ],
  },
  {
    title: "Closing the Books at Quarter-End for a Client at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:382", description: "Post journal entries to general ledger accounts" },
      { code: "FI:383", description: "Prepare a trial balance" },
      { code: "FI:384", description: "Journalize and post adjusting entries" },
      { code: "FI:385", description: "Journalize and post closing entries" },
      { code: "FI:386", description: "Prepare a post-closing trial balance" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A client's quarter-end close is due tomorrow, and the accounting manager (judge) needs to confirm the full posting-through-closing sequence will be handled correctly before the trial balance goes out.",
      ask:
        "The accounting manager (judge) wants you to walk through the steps you'll take from posting through the post-closing trial balance.",
      location: "the firm's back office",
      greetingAsk: "to hear your close checklist",
    }),
    judgeQuestions: [
      "What would an out-of-balance trial balance tell you about where to look first?",
      "Why does the post-closing trial balance matter if the regular trial balance already balanced?",
    ],
  },
  {
    title: "Correcting a Client's Worksheet Errors at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:387", description: "Prepare worksheets" },
      { code: "FI:675", description: "Identify and correct accounting errors" },
      { code: "FI:673", description: "Distinguish among types of business transactions" },
      { code: "FI:674", description: "Distinguish among types of business documentation" },
      { code: "FI:449", description: "Analyze transactions and accounts (e.g., purchase, sales, sales returns and allowances, uncollectible accounts, depreciation, debt)" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A client's self-prepared worksheet doesn't tie out to the bank statement, and the accounting manager (judge) suspects a transaction was recorded to the wrong account rather than left out entirely.",
      ask:
        "The accounting manager (judge) wants you to review this worksheet, find the error, and explain how you'd correct it.",
      location: "the firm's back office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "What kind of documentation would help confirm exactly what this transaction should have been?",
      "How would you correct this error without disturbing the entries that are already right?",
    ],
  },
  {
    title: "Reviewing Cash Controls for a Cash-Heavy Client at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:113", description: "Explain cash control procedures (e.g., signature cards, deposit slips, internal/external controls, cash clearing, etc.)" },
      { code: "FI:396", description: "Reconcile cash" },
      { code: "FI:676", description: "Account for petty cash" },
      { code: "FI:677", description: "Account for cash receipts (e.g., record cash, record income)" },
      { code: "FI:678", description: "Account for cash payments (e.g., record cash, record expenses)" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A cash-heavy client (a small café) has a petty cash drawer that never seems to reconcile, and the accounting manager (judge) suspects the cash-control procedures just aren't being followed consistently.",
      ask:
        "The accounting manager (judge) wants you to review this client's cash procedures and recommend fixes before it becomes a bigger discrepancy.",
      location: "the firm's back office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What cash control is most likely missing if petty cash never reconciles?",
      "How would you reconcile this drawer to figure out where the discrepancy started?",
    ],
  },
  {
    title: "Untangling Accounts Payable and Receivable at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:409", description: "Explain the nature of accounts payable" },
      { code: "FI:679", description: "Account for purchases (e.g., purchase requisitions, purchase orders, invoices, vouchers, etc.)" },
      { code: "FI:680", description: "Process accounts payable (e.g., maintain vendor file, post to ledger, process invoices and checks)" },
      { code: "FI:424", description: "Explain the nature of accounts receivable" },
      { code: "FI:682", description: "Account for sales (e.g., invoices, sales receipts, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A client's vendor file and sales invoices haven't been reconciled in two months, and the accounting manager (judge) isn't sure whether the business currently owes money or is owed more than it's collecting.",
      ask:
        "The accounting manager (judge) wants you to walk through how you'd untangle this client's payables and receivables.",
      location: "the firm's back office",
      greetingAsk: "to hear your approach",
    }),
    judgeQuestions: [
      "What would you check first to find out whether this client owes money or is owed money?",
      "What process would prevent this backlog from happening again?",
    ],
  },
  {
    title: "A Slow-Paying Customer Strains a Client's Cash Flow at Ledger Peak Accounting Group",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "FI:683", description: "Process accounts receivable (e.g., post to ledger, process payment, process uncollectible account, etc.)" },
      { code: "CR:012", description: "Explain the responsibilities of finance professionals in providing client services" },
      { code: "CR:024", description: "Use Customer Relationship Management (CRM) technology" },
      { code: "BL:071", description: "Discuss the nature of debtor-creditor relationships" },
      { code: "EI:015", description: "Use conflict-resolution skills" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "One of a client's biggest customers is now 90 days past due, and the client wants LEDGER PEAK's advice on how to collect the balance without losing the relationship entirely.",
      ask:
        "The accounting manager (judge) wants you to recommend how to process and pursue this receivable while protecting the client's relationship with the customer.",
      location: "a client-consultation room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What's the debtor-creditor consideration this client should keep in mind before escalating?",
      "How would you use CRM records to handle this collection professionally?",
    ],
  },
  {
    title: "Valuing Inventory for a Seasonal Retail Client at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:432", description: "Record inventory transactions" },
      { code: "FI:435", description: "Process inventory adjustments (e.g., shrinkage, obsolescence, returns, etc.)" },
      { code: "FI:586", description: "Explain methods used to value inventory (e.g., FIFO, LIFO, average cost, etc.)" },
      { code: "FI:436", description: "Determine the cost/value of inventory" },
      { code: "OP:015", description: "Explain the nature and scope of purchasing" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A seasonal retail client's year-end inventory count came in noticeably lower than the books show, and the accounting manager (judge) needs to know whether this is shrinkage, an obsolescence issue, or a valuation-method mismatch.",
      ask:
        "The accounting manager (judge) wants you to review the inventory records and recommend how to resolve and properly value this discrepancy.",
      location: "the firm's back office",
      greetingAsk: "to hear what you found",
    }),
    judgeQuestions: [
      "How would you tell the difference between shrinkage and an obsolescence issue here?",
      "Would a different valuation method change how big this discrepancy looks?",
    ],
  },
  {
    title: "Processing Payroll for a Growing Client at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:638", description: "Explain the nature of payroll expenses (e.g., Social Security tax, Medicare tax, FUTA, SUTA, workers' compensation, etc.)" },
      { code: "FI:134", description: "Maintain employee earnings records (e.g., timecards, time sheets, etc.)" },
      { code: "FI:438", description: "Calculate employee earnings" },
      { code: "FI:439", description: "Calculate employee deductions" },
      { code: "FI:442", description: "Calculate payroll taxes" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A client just hired their first five employees, and the accounting manager (judge) wants LEDGER PEAK's payroll process ready before the first pay date, with no prior payroll experience on the client's side.",
      ask:
        "The accounting manager (judge) wants you to walk through how earnings, deductions, and payroll taxes will be calculated for this client.",
      location: "the firm's back office",
      greetingAsk: "to hear your payroll setup",
    }),
    judgeQuestions: [
      "What payroll expense is this first-time employer most likely to overlook budgeting for?",
      "What earnings records should this client be keeping from day one?",
    ],
  },
  {
    title: "Preparing Payroll Tax Filings for a Client at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:686", description: "Account for payroll transactions (e.g., earnings, taxes, benefits, other deductions)" },
      { code: "FI:687", description: "Process payroll payments and remittances (e.g., employees, benefits, taxes)" },
      { code: "FI:443", description: "Prepare federal, state, and local payroll tax returns and reports" },
      { code: "BL:134", description: "Discuss the effect of tax laws and regulations on financial transactions" },
      { code: "CO:094", description: "Prepare simple written reports" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A quarterly payroll tax filing deadline is approaching, and the accounting manager (judge) wants confirmation that remittances and the required federal, state, and local reports are all accounted for correctly before submission.",
      ask:
        "The accounting manager (judge) wants you to walk through this client's payroll tax filing and summarize it in a short report.",
      location: "the firm's back office",
      greetingAsk: "to hear your filing summary",
    }),
    judgeQuestions: [
      "What tax law change would you want to double-check before filing this quarter?",
      "What would you include in a short report to the client summarizing this filing?",
    ],
  },
  {
    title: "Preparing a Client's Tax Return at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:484", description: "Explain record keeping procedures for tax accounting" },
      { code: "FI:696", description: "Calculate taxes owed by clients (i.e., individual and business)" },
      { code: "FI:697", description: "Account for taxes" },
      { code: "FI:698", description: "Prepare tax returns for clients (i.e., individuals and business)" },
      { code: "FI:485", description: "Identify tax issues for clients" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A small-business client dropped off a box of disorganized receipts a week before the filing deadline, and the accounting manager (judge) needs this return prepared accurately without missing a deductible expense or a filing issue.",
      ask:
        "The accounting manager (judge) wants you to explain how you'd organize these records and prepare this return.",
      location: "the firm's back office",
      greetingAsk: "to hear your approach",
    }),
    judgeQuestions: [
      "What record-keeping habit would you recommend so this client isn't in this position next year?",
      "What tax issue would you flag for this client before filing?",
    ],
  },
  {
    title: "Recording a Client's Equipment Purchase at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:642", description: "Discuss the nature of long-term assets (e.g., tangible assets, intangible assets, natural resources, etc.)" },
      { code: "FI:690", description: "Describe the methods used to value long-term assets (e.g., tangible assets, intangible assets, natural resources, etc.)" },
      { code: "FI:691", description: "Account for long-term assets (e.g., record acquisition, record depreciation/amortization, record disposal)" },
      { code: "FI:692", description: "Account for long-term liabilities (e.g., bonds payable, notes payable, leases, etc.)" },
      { code: "FI:693", description: "Account for provisions (e.g., restructurings, warranties, customer refunds, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A client financed a large piece of equipment with a note payable and also offers a warranty on installations, and the accounting manager (judge) wants this recorded correctly from acquisition through the ongoing warranty provision.",
      ask:
        "The accounting manager (judge) wants you to walk through how you'd record this purchase, its financing, and the related warranty provision.",
      location: "the firm's back office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "How would you determine the useful life to use for depreciating this equipment?",
      "How should the warranty provision be estimated and recorded going forward?",
    ],
  },
  {
    title: "Investigating a Possible Internal-Control Gap at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:343", description: "Explain the purpose of internal accounting controls" },
      { code: "FI:479", description: "Determine the components of internal accounting control procedures for a business" },
      { code: "FI:480", description: "Maintain internal accounting controls" },
      { code: "FI:706", description: "Assess financial accounting fraud risk" },
      { code: "BL:148", description: "Discuss the nature and scope of compliance in the finance industry" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "One client lets the same employee approve invoices and issue payments with no second signature required, and the accounting manager (judge) wants a fraud-risk assessment before recommending anything to the client.",
      ask:
        "The accounting manager (judge) wants you to assess the risk this control gap creates and recommend improvements.",
      location: "the firm's back office",
      greetingAsk: "to hear your assessment",
    }),
    judgeQuestions: [
      "What specific internal control is missing in this approval-and-payment process?",
      "How would you present this recommendation without it feeling like an accusation?",
    ],
  },
  {
    title: "Conducting an Audit Engagement for a Client at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:344", description: "Explain the nature of audits and assurance engagements" },
      { code: "FI:713", description: "Distinguish between internal and external audits" },
      { code: "FI:714", description: "Describe auditing techniques/procedures" },
      { code: "FI:482", description: "Conduct audit engagements" },
      { code: "BL:149", description: "Describe the use of technology in compliance" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A client's bank is requiring an external audit before renewing a line of credit, and the client has never gone through one before and doesn't understand what will actually be reviewed.",
      ask:
        "The accounting manager (judge) wants you to explain this audit engagement to the client and outline the procedures LEDGER PEAK will follow.",
      location: "a client-consultation room",
      greetingAsk: "to hear how you'd explain this",
    }),
    judgeQuestions: [
      "How would you explain the difference between this external audit and an internal review?",
      "What technology could make this audit's procedures more efficient?",
    ],
  },
  {
    title: "Analyzing Manufacturing Costs for a Client at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:658", description: "Describe types of costs used in managerial accounting (e.g., direct cost, indirect cost, sunk cost, differential cost, etc.)" },
      { code: "FI:659", description: "Describe marginal analysis techniques and applications" },
      { code: "FI:717", description: "Differentiate among management accounting responsibility centers (i.e., cost, profit, investment, revenue)" },
      { code: "FI:718", description: "Discuss the use of cost-volume-profit analysis" },
      { code: "FI:719", description: "Discuss cost accounting systems (e.g., job costing, process costing, standard costing, activity-based costing [ABC])" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A small manufacturing client wants to know their true cost per unit before setting new prices, but their current books only track total spending without separating direct costs from overhead.",
      ask:
        "The accounting manager (judge) wants you to recommend a costing approach that gives this client an accurate per-unit cost.",
      location: "the firm's back office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What costing system would fit this client's production process best?",
      "How would cost-volume-profit analysis help them decide on a new price?",
    ],
  },
  {
    title: "Reviewing a Client's Budget-Variance Report at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:720", description: "Distinguish between variable costing and absorption costing" },
      { code: "FI:721", description: "Describe common management accounting performance measures (e.g., balanced scorecard, return on investment [ROI], customer profitability analysis, etc.)" },
      { code: "FI:722", description: "Discuss the role of standard costing in the preparation and analysis of budgets" },
      { code: "FI:723", description: "Describe the nature of flexible budgets" },
      { code: "FI:724", description: "Explain the role of transfer pricing in managerial accounting" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A client with two internal divisions wants to understand why their fixed budget looks so far off from actual results every month, and one division has raised questions about how costs get charged between them.",
      ask:
        "The accounting manager (judge) wants you to recommend a better budgeting approach and address the internal cost-charging question.",
      location: "the firm's back office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "Why might a flexible budget serve this client better than their current fixed budget?",
      "What would you tell them about how transfer pricing should work between their two divisions?",
    ],
  },
  {
    title: "Building a Cost Dashboard for a Client at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:725", description: "Explain the impact of business operational practices (e.g., total quality management [TQM], lean production, just-in-time [JIT], etc.) on managerial accounting" },
      { code: "FI:726", description: "Apply cost accounting techniques (e.g., job costing, process costing, standard costing, activity-based costing [ABC])" },
      { code: "FI:450", description: "Maintain job order cost sheets" },
      { code: "FI:451", description: "Calculate the cost of goods sold" },
      { code: "FM:014", description: "Demonstrate financial analysis applications" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A client switched to a just-in-time inventory approach last quarter, and the accounting manager (judge) wants a dashboard that actually reflects job order costs and cost of goods sold under the new process, not the old one.",
      ask:
        "The accounting manager (judge) wants you to propose how job order cost sheets and COGS should be tracked going forward.",
      location: "the firm's back office",
      greetingAsk: "to hear your proposal",
    }),
    judgeQuestions: [
      "How does this client's shift to just-in-time change what belongs on a job order cost sheet?",
      "What would this cost dashboard need to show at a glance for the client to trust it?",
    ],
  },
  {
    title: "Helping a Client Budget for Next Year at Ledger Peak Accounting Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:394", description: "Project future revenues and expenses" },
      { code: "FI:460", description: "Process preliminary budget detail" },
      { code: "FI:728", description: "Explain types of budgeting systems (e.g., top-down, bottom-up, incremental, etc.)" },
      { code: "FM:013", description: "Demonstrate budgeting applications" },
      { code: "FI:388", description: "Discuss the nature of annual reports" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A client has always built next year's budget by guessing at a percentage increase over last year, and the accounting manager (judge) wants a more defensible approach before the client's annual report goes to investors.",
      ask:
        "The accounting manager (judge) wants you to recommend a better budgeting approach and how it should tie into the annual report.",
      location: "the firm's back office",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What budgeting system would you recommend instead of a flat percentage guess?",
      "How should this budget connect to what investors will see in the annual report?",
    ],
  },
  {
    title: "Reviewing Enterprise Risk for a Client at Ledger Peak Accounting Group",
    instructionalArea: "Risk Management",
    performanceIndicators: [
      { code: "RM:041", description: "Explain the role of ethics in risk management" },
      { code: "RM:042", description: "Describe the use of technology in risk management" },
      { code: "RM:043", description: "Discuss legal considerations affecting risk management" },
      { code: "RM:058", description: "Discuss the nature of risk control (i.e., internal and external)" },
      { code: "RM:062", description: "Discuss the nature of enterprise risk management (ERM)" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A client asked LEDGER PEAK to help build a basic enterprise risk management approach after a competitor's data breach made the news, and the accounting manager (judge) wants this grounded in real risk controls, not just a policy document nobody reads.",
      ask:
        "The accounting manager (judge) wants you to outline what this client's ERM approach should include.",
      location: "a client-consultation room",
      greetingAsk: "to hear your outline",
    }),
    judgeQuestions: [
      "What's the difference between an internal and an external risk control this client should understand?",
      "What ethical consideration belongs in how this client manages risk day to day?",
    ],
  },
  {
    title: "Advising a Student on Accounting Career Paths at Ledger Peak Accounting Group",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:337", description: "Identify career opportunities in accounting" },
      { code: "PD:338", description: "Explain the roles and responsibilities of accounting professionals" },
      { code: "PD:339", description: "Describe the services of professional organizations in accounting" },
      { code: "PD:340", description: "Discuss the levels and types of external financial reporting" },
      { code: "PD:341", description: "Discuss the nature of auditing/attestation standards" },
    ],
    eventSituation: buildSituation({
      role: "the accounting associate",
      company: "LEDGER PEAK ACCOUNTING GROUP",
      judgeRole: "the accounting manager",
      problem:
        "A local high school asked LEDGER PEAK to send someone to speak to students considering accounting careers, and the accounting manager (judge) wants a clear, honest picture of what the field actually involves, not just a job title.",
      ask:
        "The accounting manager (judge) wants you to prepare what you'd tell these students about accounting careers and professional standards.",
      location: "the firm's back office",
      greetingAsk: "to hear what you'd tell them",
    }),
    judgeQuestions: [
      "What would you tell a student surprised that accounting involves more than just tax season?",
      "What professional organization would you point an interested student toward?",
    ],
  },
];

const ACT_EVENT: EventCaseStudySeed = {
  eventSlug: "accounting-applications-series",
  eventName: "Accounting Applications Series",
  careerCluster: "Finance",
  careerPathway: "Accounting",
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: ACT_CASES,
};

// ---------------------------------------------------------------------------
// business-finance-series (SERIES, Corporate Finance pathway)
// ---------------------------------------------------------------------------
const BFS_CASES: CaseStudySeed[] = [
  {
    title: "New Reporting Rules Reach the Finance Team at Vantage Industrial Corp.",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:155", description: "Comply with financial reporting and internal control laws and regulations in corporate finance" },
      { code: "BL:163", description: "Comply with the spirit and intent of laws and regulations" },
      { code: "BL:133", description: "Discuss legal considerations in the finance industry" },
      { code: "BL:148", description: "Discuss the nature and scope of compliance in the finance industry" },
      { code: "BL:149", description: "Describe the use of technology in compliance" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "A new financial-reporting regulation takes effect next quarter, and the finance director (judge) is not yet sure which internal controls need updating or how compliance will actually be tracked going forward.",
      ask:
        "The finance director (judge) wants you to explain what this regulation requires and how VANTAGE should track compliance with it.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "What internal control is most likely to need updating under this new rule?",
      "What technology could help us track ongoing compliance instead of scrambling every quarter?",
    ],
  },
  {
    title: "Preparing the Team for a European Client Visit at Vantage Industrial Corp.",
    instructionalArea: "Emotional Intelligence",
    performanceIndicators: [
      { code: "EI:082", description: "Explain the impact of business customs and practices on global trade" },
      { code: "EI:083", description: "Describe the nature of business customs and practices in the North American market" },
      { code: "EI:084", description: "Explain the nature of business customs and practices in Western Europe" },
      { code: "EI:117", description: "Explain the nature of business customs and practices in Eastern Europe" },
      { code: "EI:085", description: "Explain the nature of business customs and practices in Latin America" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "A group of investors from Western and Eastern Europe are visiting next week to review VANTAGE's financials, and the finance director (judge) wants the team prepared to avoid any cultural missteps during the meetings.",
      ask:
        "The finance director (judge) wants you to brief the team on what to expect and how to adapt.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your briefing",
    }),
    judgeQuestions: [
      "What's one business-custom difference between these two European delegations we should be ready for?",
      "How would this differ if the visitors were instead coming from Latin America?",
    ],
  },
  {
    title: "Expanding Sourcing to the Pacific Rim and Beyond at Vantage Industrial Corp.",
    instructionalArea: "Emotional Intelligence",
    performanceIndicators: [
      { code: "EI:086", description: "Describe the nature of business customs and practices in the Pacific Rim" },
      { code: "EI:087", description: "Discuss the nature of business customs and practices in the Middle East" },
      { code: "EI:118", description: "Explain the nature of business customs and practices in South Asia" },
      { code: "EI:119", description: "Describe the nature of business customs and practices in Northern Africa" },
      { code: "EI:120", description: "Discuss the nature of business customs and practices in Sub-Saharan Africa" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "VANTAGE is evaluating new suppliers across several unfamiliar regions, and the finance director (judge) wants a briefing on regional business customs before the procurement team starts negotiations.",
      ask:
        "The finance director (judge) wants you to summarize what the team should know about doing business in these regions.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your summary",
    }),
    judgeQuestions: [
      "What's a business custom in one of these regions that could easily be misread by our negotiators?",
      "How would you recommend the team prepare differently for each region rather than treating them the same?",
    ],
  },
  {
    title: "Recording Depreciation and a New Bond Issue at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:345", description: "Discuss the nature of depreciation" },
      { code: "FI:359", description: "Describe the nature of cash flows" },
      { code: "FI:523", description: "Discuss the nature of corporate bonds" },
      { code: "FI:524", description: "Discuss the cost of corporate bonds" },
      { code: "FI:078", description: "Explain the nature of capital investment" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "VANTAGE just issued a new round of corporate bonds to fund a plant expansion, and the finance director (judge) wants the depreciation and cash-flow implications of the new equipment modeled correctly before the next board update.",
      ask:
        "The finance director (judge) wants you to walk through how this bond issue and the new equipment's depreciation will affect the numbers.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your analysis",
    }),
    judgeQuestions: [
      "What factor most affects the cost of this bond issue to VANTAGE?",
      "How will this depreciation schedule show up in the cash-flow statement versus the income statement?",
    ],
  },
  {
    title: "Deciding How to Raise New Equity at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:526", description: "Discuss the issuance of stock from a corporation" },
      { code: "FI:528", description: "Discuss the cost of common stock" },
      { code: "FI:530", description: "Explain the nature of dividend reinvestment plans (DRIPs)" },
      { code: "FI:367", description: "Calculate stock-related values (e.g., the value of a constant growth stock, the expected value of future dividends, the expected rate of return, etc.)" },
      { code: "FI:236", description: "Calculate bond-related values (e.g., the price of a bond given its yield to maturity, the coupon interest payment for a bond, the effects of interest rates on the price of a bond, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "The board is debating whether to fund next year's growth with a new stock issuance or another round of bonds, and the finance director (judge) wants the actual costs and shareholder impact of each option compared side by side.",
      ask:
        "The finance director (judge) wants you to calculate and compare the costs of these two funding options.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your comparison",
    }),
    judgeQuestions: [
      "What would drive the cost of issuing new common stock higher than expected here?",
      "Would a dividend reinvestment plan change how you'd present this stock option to the board?",
    ],
  },
  {
    title: "Evaluating a Competitor Acquisition at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:347", description: "Compare mergers and acquisitions" },
      { code: "FI:536", description: "Explain the nature of hostile takeovers" },
      { code: "FI:772", description: "Explain divestiture concepts (e.g., spin-offs, split-ups, etc.)" },
      { code: "FI:546", description: "Discuss the analysis of a company's financial situation using its financial statements" },
      { code: "FI:547", description: "Discuss external forces affecting a company's value" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "VANTAGE is considering acquiring a struggling competitor, but rumors suggest another firm may attempt a hostile bid first, and the finance director (judge) wants a clear-eyed read on the target's actual financial situation before moving forward.",
      ask:
        "The finance director (judge) wants you to analyze this target's financials and advise on the acquisition.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your analysis",
    }),
    judgeQuestions: [
      "What in this target's financial statements would most affect what VANTAGE should offer?",
      "How would a competing hostile bid change our approach here?",
    ],
  },
  {
    title: "Explaining How Value Is Created for a Client Company at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:548", description: "Explain how value is created for a company" },
      { code: "FI:449", description: "Analyze transactions and accounts (e.g., purchase, sales, sales returns and allowances, uncollectible accounts, depreciation, debt)" },
      { code: "FI:480", description: "Maintain internal accounting controls" },
      { code: "FI:343", description: "Explain the purpose of internal accounting controls" },
      { code: "FI:630", description: "Explain the nature of statements of changes in equity" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "A subsidiary's statement of changes in equity looks stronger than its actual operations would suggest, and the finance director (judge) wants to understand what's really driving that value before presenting it to the parent board.",
      ask:
        "The finance director (judge) wants you to explain what's actually creating this value and whether the internal controls behind it are solid.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "What would you check to confirm this equity change reflects real operating value, not an accounting artifact?",
      "What internal control would you want strengthened before presenting this to the board?",
    ],
  },
  {
    title: "Modernizing Payment and Collection Systems at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:733", description: "Describe components of a payment system" },
      { code: "FI:734", description: "Describe components of a collection system" },
      { code: "FI:735", description: "Manage bank accounts (e.g., scope of services, fee structures, system integration)" },
      { code: "FI:739", description: "Describe cash management procedures" },
      { code: "FI:505", description: "Explain the use of cash budgets" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "VANTAGE still processes most vendor payments and customer collections manually across three different bank accounts, and the finance director (judge) wants a modernized approach before the company grows further.",
      ask:
        "The finance director (judge) wants you to recommend how to modernize these payment and collection systems.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What fee structure consideration matters most when consolidating these bank accounts?",
      "How would a cash budget help VANTAGE manage this transition?",
    ],
  },
  {
    title: "Managing Working Capital During a Slow Season at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:507", description: "Prepare cash flow budgets/forecasts" },
      { code: "FI:508", description: "Analyze cash budget/forecast variances" },
      { code: "FI:633", description: "Analyze the impact of accounts payable schedules on working capital" },
      { code: "FI:637", description: "Analyze the impact of accounts receivable collection on working capital cycle" },
      { code: "FI:513", description: "Describe the nature of short-term financial management" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "VANTAGE's working capital tightens every year during its slow season, and last quarter's cash flow forecast was noticeably off from what actually happened, worrying the finance director (judge).",
      ask:
        "The finance director (judge) wants you to analyze what drove the forecast variance and recommend how to manage working capital better this slow season.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your analysis",
    }),
    judgeQuestions: [
      "What likely caused last quarter's cash flow forecast to miss by this much?",
      "Would adjusting our accounts payable or receivable schedule help more here?",
    ],
  },
  {
    title: "Deciding Whether to Lease or Buy New Equipment at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:639", description: "Discuss the impact of employee benefits on business financials" },
      { code: "FI:641", description: "Discuss the impact of obsolescence on business expense" },
      { code: "FI:740", description: "Evaluate leases" },
      { code: "FI:741", description: "Develop policies to manage trade credit" },
      { code: "FI:646", description: "Use the time value of money to make business decisions (e.g., projects, investments, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "Operations wants new production equipment that could become obsolete within a few years, and the finance director (judge) needs to know whether leasing or buying makes more financial sense given the equipment's short useful life.",
      ask:
        "The finance director (judge) wants you to evaluate this lease-versus-buy decision.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "How does this equipment's obsolescence risk change your lease-versus-buy analysis?",
      "What time-value-of-money factor matters most in comparing these two options?",
    ],
  },
  {
    title: "Comparing Capital Investment Options at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:360", description: "Explain the role of capital markets in business finance" },
      { code: "FI:745", description: "Explain methods used to analyze capital investments (e.g., payback period, discounted break-even, net present value, accounting rate of return, internal rate of return, etc.)" },
      { code: "FI:746", description: "Explain the impact of the cost of capital on capital investments" },
      { code: "FI:747", description: "Calculate the cost of capital and its components (e.g., debt, equity)" },
      { code: "FI:748", description: "Calculate capital investment return (e.g., payback, net present value, internal rate of return)" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "Two capital projects are competing for the same budget this year, and the finance director (judge) wants a rigorous comparison of their expected returns before deciding which one to fund.",
      ask:
        "The finance director (judge) wants you to calculate and compare the return on these two capital investments.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your comparison",
    }),
    judgeQuestions: [
      "Which method would you trust more here, payback period or net present value, and why?",
      "How does VANTAGE's cost of capital change which project looks better?",
    ],
  },
  {
    title: "Deciding Which New Project to Fund at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:750", description: "Identify project benefits and costs" },
      { code: "FI:753", description: "Monitor project portfolio" },
      { code: "FI:502", description: "Discuss the financial planning process" },
      { code: "FI:503", description: "Discuss the nature of short-term (operating) financial plans" },
      { code: "FI:509", description: "Discuss the nature of pro forma statements" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "VANTAGE's project portfolio has grown to the point where the finance director (judge) can't easily tell which projects are actually on track and which are quietly draining resources without matching their projected benefits.",
      ask:
        "The finance director (judge) wants you to propose how to evaluate and monitor this project portfolio going forward.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your proposal",
    }),
    judgeQuestions: [
      "What would you look at to identify a project that's quietly underperforming its projected benefits?",
      "How would a pro forma statement help VANTAGE plan its next project better?",
    ],
  },
  {
    title: "Managing Loans, Investments, and Pension Assets at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:756", description: "Manage loans" },
      { code: "FI:757", description: "Manage investment portfolio" },
      { code: "FI:758", description: "Manage pension investment portfolio" },
      { code: "FI:492", description: "Calculate cash flows associated with an investment (e.g., initial investment, operating cash inflows, operating cash outflows, terminal flows)" },
      { code: "FI:730", description: "Discuss the nature of Initial Public Offerings" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "VANTAGE's pension fund performance has lagged the broader market for two straight years, and the finance director (judge) is also fielding early questions from the board about whether an eventual IPO makes sense.",
      ask:
        "The finance director (judge) wants you to review the pension portfolio's cash flows and share your initial thoughts on the IPO question.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your review",
    }),
    judgeQuestions: [
      "What would you check first to understand why the pension portfolio is underperforming?",
      "What should the board understand about an IPO before going further down that path?",
    ],
  },
  {
    title: "Setting Up Responsibility-Center Budgets at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:717", description: "Differentiate among management accounting responsibility centers (i.e., cost, profit, investment, revenue)" },
      { code: "FI:718", description: "Discuss the use of cost-volume-profit analysis" },
      { code: "FI:719", description: "Discuss cost accounting systems (e.g., job costing, process costing, standard costing, activity-based costing [ABC])" },
      { code: "FI:720", description: "Distinguish between variable costing and absorption costing" },
      { code: "FI:721", description: "Describe common management accounting performance measures (e.g., balanced scorecard, return on investment [ROI], customer profitability analysis, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "VANTAGE just reorganized into separate divisions, and the finance director (judge) needs each division treated as its own responsibility center with performance measures that actually reflect what that division controls.",
      ask:
        "The finance director (judge) wants you to recommend how to structure these responsibility centers and their performance measures.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What type of responsibility center fits a division that doesn't control its own revenue?",
      "What performance measure would you use to keep this fair across divisions of different sizes?",
    ],
  },
  {
    title: "Reworking Standard Costs After a Price Increase at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:722", description: "Discuss the role of standard costing in the preparation and analysis of budgets" },
      { code: "FI:723", description: "Describe the nature of flexible budgets" },
      { code: "FI:724", description: "Explain the role of transfer pricing in managerial accounting" },
      { code: "FI:725", description: "Explain the impact of business operational practices (e.g., total quality management [TQM], lean production, just-in-time [JIT], etc.) on managerial accounting" },
      { code: "FI:768", description: "Perform budgetary cost analysis (e.g., direct cost, indirect cost, sunk cost, differential cost, etc.)" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "A key raw-material supplier just raised prices significantly, and the finance director (judge) needs the standard costs and budgets updated before the variance reports become meaningless.",
      ask:
        "The finance director (judge) wants you to recommend how to update standard costing and budgets in response to this price increase.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What happens to our variance reporting if we don't update the standard cost for this material?",
      "Would a flexible budget handle this price swing better than our current fixed budget?",
    ],
  },
  {
    title: "Budgeting for a Divisional Restructuring at Vantage Industrial Corp.",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:769", description: "Perform responsibility center budgeting (i.e., cost, profit, investment, revenue)" },
      { code: "FI:729", description: "Discuss the nature of stock options" },
      { code: "FI:658", description: "Describe types of costs used in managerial accounting (e.g., direct cost, indirect cost, sunk cost, differential cost, etc.)" },
      { code: "FI:659", description: "Describe marginal analysis techniques and applications" },
      { code: "FI:660", description: "Explain the nature of managerial accounting" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "A division is being restructured, and part of the retention package for key managers includes stock options, but the finance director (judge) isn't sure how that should factor into the division's new responsibility-center budget.",
      ask:
        "The finance director (judge) wants you to recommend how to build this division's new budget, including how to treat the stock-option costs.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "How should these stock options factor into the division's budgeted costs?",
      "What responsibility-center type fits this restructured division best?",
    ],
  },
  {
    title: "Rolling Out New Treasury Software at Vantage Industrial Corp.",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:240", description: "Describe manual and computerized treasury systems" },
      { code: "NF:241", description: "Describe the nature of Extensible Business Reporting Language (XBRL)" },
      { code: "NF:242", description: "Use treasury systems (e.g., cash management, budgeting, forecasting)" },
      { code: "FM:013", description: "Demonstrate budgeting applications" },
      { code: "FM:014", description: "Demonstrate financial analysis applications" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "VANTAGE's treasury function still runs on a patchwork of spreadsheets, and the finance director (judge) wants to move to a real treasury system before the company's cash-management needs outgrow manual tracking entirely.",
      ask:
        "The finance director (judge) wants you to recommend what this new treasury system should be able to do.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What would a computerized treasury system catch that our current spreadsheets are missing?",
      "How would XBRL reporting fit into what this new system needs to support?",
    ],
  },
  {
    title: "Preparing for a Governance Review at Vantage Industrial Corp.",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:215", description: "Explain the role and responsibilities of financial management personnel" },
      { code: "PD:218", description: "Describe the role and responsibilities of risk management personnel" },
      { code: "PD:219", description: "Discuss the role and responsibilities of treasury management personnel" },
      { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
      { code: "PD:214", description: "Describe the components of a well-governed company (e.g., board of directors, reporting, transparency, internal and external audit functions)" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "An outside firm is conducting a governance review of VANTAGE's finance function, and the finance director (judge) wants the roles and responsibilities across financial management, risk, and treasury clearly documented before reviewers arrive.",
      ask:
        "The finance director (judge) wants you to document these roles and explain how they support good governance.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your documentation",
    }),
    judgeQuestions: [
      "What would reviewers expect to see that shows clear separation between these three roles?",
      "What component of a well-governed company would you highlight first in this review?",
    ],
  },
  {
    title: "Comparing GAAP and IFRS for an Overseas Subsidiary at Vantage Industrial Corp.",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:295", description: "Discuss the roles and responsibilities of accounting-standards-setting bodies (i.e., SEC, FASB, IASB, GASB)" },
      { code: "PD:296", description: "Compare U.S. Generally Accepted Accounting Principles (GAAP) and International Financial Reporting Standards (IFRS)" },
      { code: "PD:221", description: "Explain professional designations in the field of business finance (e.g., CF, CFA, CCM, CTP, CFM, etc.)" },
      { code: "PD:301", description: "Ascertain employee's role in achieving governance objectives" },
      { code: "PD:302", description: "Identify the factors that impact governance structures" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "VANTAGE's new overseas subsidiary reports under IFRS while headquarters reports under GAAP, and the finance director (judge) is fielding board questions about how the consolidated numbers can be trusted across both standards.",
      ask:
        "The finance director (judge) wants you to explain the key differences between these standards and how governance should account for them.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "What GAAP-versus-IFRS difference is most likely to confuse the board when comparing these numbers?",
      "What professional designation would be most useful for whoever manages this consolidation?",
    ],
  },
  {
    title: "Tightening Contract Risk Controls at Vantage Industrial Corp.",
    instructionalArea: "Risk Management",
    performanceIndicators: [
      { code: "RM:047", description: "Discuss the relationship between risk management and business finance" },
      { code: "RM:048", description: "Discuss the nature of risk measurement" },
      { code: "RM:077", description: "Identify financial risk factors associated with business contracts (e.g., ratio requirements, restricted transactions, financial report filing requirements)" },
      { code: "RM:086", description: "Describe types of financial risks (e.g., interest rate risk, equity risk, commodity risk, etc.)" },
      { code: "RM:043", description: "Discuss legal considerations affecting risk management" },
    ],
    eventSituation: buildSituation({
      role: "the corporate finance analyst",
      company: "VANTAGE INDUSTRIAL CORP.",
      judgeRole: "the finance director",
      problem:
        "A major supply contract includes financial ratio covenants VANTAGE hasn't been actively monitoring, and the finance director (judge) is concerned a bad quarter could accidentally trigger a default under terms nobody's been tracking closely.",
      ask:
        "The finance director (judge) wants you to assess this contract's financial risk factors and recommend how to monitor them going forward.",
      location: "the corporate finance conference room",
      greetingAsk: "to hear your assessment",
    }),
    judgeQuestions: [
      "What financial risk factor in this contract concerns you most?",
      "How would you set up ongoing monitoring so this doesn't get missed again?",
    ],
  },
];

const BFS_EVENT: EventCaseStudySeed = {
  eventSlug: "business-finance-series",
  eventName: "Business Finance Series",
  careerCluster: "Finance",
  careerPathway: "Corporate Finance",
  format: "SERIES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: BFS_CASES,
};

// ---------------------------------------------------------------------------
// principles-of-finance (PRINCIPLES, Core PIs)
// ---------------------------------------------------------------------------
const POF_CASES: CaseStudySeed[] = [
  {
    title: "Explaining Payment Methods to a New Member at Meridian Community Credit Union",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:058", description: "Explain forms of financial exchange (cash, credit, debit, electronic funds transfer, etc.)" },
      { code: "FI:059", description: "Identify types of currency (paper money, coins, banknotes, government bonds, treasury notes, etc.)" },
      { code: "FI:060", description: "Describe functions of money (medium of exchange, unit of measure, store of value)" },
      { code: "FI:061", description: "Describe sources of income and compensation" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A new member opening their first account has questions about the difference between debit transactions, electronic transfers, and just carrying cash, and isn't sure which to rely on for everyday spending.",
      ask:
        "The branch manager (judge) wants you to explain these payment options clearly to this member.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear this explained",
    }),
    judgeQuestions: [
      "What would you tell this member about when cash still makes more sense than a card?",
      "How would you explain the function of money to someone who's never thought about it this way?",
    ],
  },
  {
    title: "Helping a Member Build a First Budget at Meridian Community Credit Union",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:065", description: "Set financial goals" },
      { code: "FI:066", description: "Develop personal budget" },
      { code: "FI:106", description: "Describe the nature of budgets" },
      { code: "FI:562", description: "Determine personal net worth" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member just started their first job and wants help setting up a budget, but has never tracked spending or thought about financial goals beyond \"save some money.\"",
      ask:
        "The branch manager (judge) wants you to walk this member through setting financial goals and building a first budget.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear your approach",
    }),
    judgeQuestions: [
      "What financial goal would you help this member set first?",
      "How would knowing their net worth help this member plan their budget?",
    ],
  },
  {
    title: "Reconciling a Confused Member's Checking Account at Meridian Community Credit Union",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:068", description: "Interpret a pay stub" },
      { code: "FI:069", description: "Maintain financial records" },
      { code: "FI:070", description: "Balance a bank account" },
      { code: "FI:075", description: "Describe types of financial-services providers" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member's checkbook register doesn't match their account balance, and they also have questions about their new pay stub's deductions after starting a second job.",
      ask:
        "The branch manager (judge) wants you to help this member reconcile their account and understand their pay stub.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear how you'd help",
    }),
    judgeQuestions: [
      "What would you check first to find where this account stopped matching the register?",
      "What would you point out on this pay stub that the member might be missing?",
    ],
  },
  {
    title: "Comparing Financial-Services Providers for a Member at Meridian Community Credit Union",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:076", description: "Discuss considerations in selecting a financial-services provider" },
      { code: "FI:077", description: "Explain types of investments" },
      { code: "FI:002", description: "Explain the purposes and importance of credit" },
      { code: "FI:085", description: "Explain the concept of accounting" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member is comparing MERIDIAN to a large national bank and an online-only investment app, unsure which fits their needs for saving, borrowing, and eventually investing.",
      ask:
        "The branch manager (judge) wants you to help this member think through what matters when choosing between these options.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "What would you tell this member matters most in choosing a provider beyond just fees?",
      "How would you explain the role credit could play in their plans even if they're mainly focused on saving?",
    ],
  },
  {
    title: "Explaining a Credit Score to a First-Time Borrower at Meridian Community Credit Union",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:071", description: "Demonstrate the wise use of credit" },
      { code: "FI:072", description: "Validate credit history" },
      { code: "FI:063", description: "Explain legal responsibilities associated with consumer financial products and services" },
      { code: "FI:782", description: "Calculate the cost of credit" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member with no credit history wants to know why their loan application came back with a higher rate than a friend's, and doesn't understand how their credit history was actually used.",
      ask:
        "The branch manager (judge) wants you to explain how credit history and the cost of credit work in a way this member can act on.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "What would you tell this member to help them build credit history responsibly going forward?",
      "How would you explain what actually made their rate higher than their friend's?",
    ],
  },
  {
    title: "A Member Reports a Suspicious Charge at Meridian Community Credit Union",
    instructionalArea: "Operations",
    performanceIndicators: [
      { code: "FI:073", description: "Protect against identity theft" },
      { code: "OP:064", description: "Maintain data security" },
      { code: "OP:152", description: "Follow established security procedures/policies" },
      { code: "OP:153", description: "Protect company information and intangibles" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member noticed an unfamiliar charge on their statement and is worried their identity has been stolen, needing to know what to do right now and how MERIDIAN protects member information generally.",
      ask:
        "The branch manager (judge) wants you to walk this member through the right next steps and explain how their information is protected.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear how you'd help",
    }),
    judgeQuestions: [
      "What's the very first step this member should take about this suspicious charge?",
      "What security procedure protects this member's information even if their card number gets exposed?",
    ],
  },
  {
    title: "Helping a Member Understand a Tax Notice at Meridian Community Credit Union",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:067", description: "Explain the nature of tax liabilities" },
      { code: "FI:074", description: "Prepare personal income tax forms" },
      { code: "EC:072", description: "Describe the nature of taxes" },
      { code: "FI:783", description: "Make responsible financial decisions" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member received a notice about underpaid taxes on interest income they didn't realize was taxable, and is now worried about what else they might be missing.",
      ask:
        "The branch manager (judge) wants you to help this member understand this notice and what to do next.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear how you'd explain this",
    }),
    judgeQuestions: [
      "What would you explain to this member about why interest income gets taxed?",
      "What responsible next step would you recommend before their next tax filing?",
    ],
  },
  {
    title: "Planning for Retirement Decades Early at Meridian Community Credit Union",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:270", description: "Explain the need to save and invest" },
      { code: "FI:571", description: "Determine insurance needs" },
      { code: "FI:572", description: "Explain the nature of estate planning" },
      { code: "FI:569", description: "Discuss the nature of retirement planning" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member in their twenties says retirement feels too far away to plan for, and wants a straightforward reason to start saving now instead of waiting until they earn more.",
      ask:
        "The branch manager (judge) wants you to make the case for starting retirement planning now, including how it connects to insurance and estate planning down the road.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear your case for this",
    }),
    judgeQuestions: [
      "What would you say to convince this member that starting now actually matters?",
      "How would you connect this member's retirement planning to insurance needs later in life?",
    ],
  },
  {
    title: "Reading Financial Statements for the First Time at Meridian Community Credit Union",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:091", description: "Describe the nature of cash flow statements" },
      { code: "FI:093", description: "Explain the nature of balance sheets" },
      { code: "FI:094", description: "Describe the nature of income statements" },
      { code: "FI:562", description: "Determine personal net worth" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member starting a small side business asks what a balance sheet even shows, admitting they've never had to read one before and aren't sure how it's different from tracking cash in and out.",
      ask:
        "The branch manager (judge) wants you to explain these financial statements in terms this member can actually use.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "How would you explain the difference between an income statement and a cash flow statement?",
      "How does this member's personal net worth relate to what a balance sheet shows for a business?",
    ],
  },
  {
    title: "Comparing Loan Options with an Online Account at Meridian Community Credit Union",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:625", description: "Apply for a consumer loan" },
      { code: "FI:568", description: "Control debt" },
      { code: "FI:830", description: "Manage online accounts" },
      { code: "FI:831", description: "Discuss options for financing a college education" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member wants a consumer loan to help pay for a semester of college but is also carrying a credit card balance and is nervous about taking on more debt at once.",
      ask:
        "The branch manager (judge) wants you to help this member think through this loan application and manage their existing debt responsibly.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What would you want to understand about this member's existing debt before recommending this loan?",
      "What other option for financing college would you want this member to know about?",
    ],
  },
  {
    title: "A Member Asks About Insurance Before a Move at Meridian Community Credit Union",
    instructionalArea: "Strategic Management",
    performanceIndicators: [
      { code: "FI:081", description: "Describe the concept of insurance" },
      { code: "SM:075", description: "Explain the nature of risk management" },
      { code: "SM:076", description: "Conduct a risk assessment of an event" },
      { code: "SM:100", description: "Explain factors that affect management" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member moving into their first apartment wants to know whether renter's insurance is actually worth the cost, since nothing bad has ever happened to their belongings before.",
      ask:
        "The branch manager (judge) wants you to help this member think through the actual risk here and decide.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "How would you help this member assess whether this risk is actually worth insuring against?",
      "What would you tell them if a small policy still feels like an unnecessary expense?",
    ],
  },
  {
    title: "Writing Checks and Paying Bills the Right Way at Meridian Community Credit Union",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:062", description: "Explain the time value of money" },
      { code: "FI:565", description: "Pay bills" },
      { code: "FI:567", description: "Explain the nature of charitable giving" },
      { code: "FI:560", description: "Write checks" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "An older member who has always paid bills by mailing checks wants help understanding whether it's worth switching to automatic payments, and separately asks about setting up a small recurring charitable donation.",
      ask:
        "The branch manager (judge) wants you to help this member weigh these options.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What would you tell this member about the time value of money as it relates to paying bills on time?",
      "How would you help them set up that recurring charitable donation responsibly?",
    ],
  },
  {
    title: "A Member Questions a Loan Denial at Meridian Community Credit Union",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:001", description: "Describe legal issues affecting businesses" },
      { code: "BL:002", description: "Describe the nature of legally binding contracts" },
      { code: "BL:067", description: "Discuss the nature of law and sources of law in the United States" },
      { code: "BL:068", description: "Describe the United States' judicial system" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member whose loan application was denied wants to know their legal rights and whether the denial letter they received actually meets what the law requires MERIDIAN to disclose.",
      ask:
        "The branch manager (judge) wants you to explain what this member is legally entitled to know.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "What does this member have a legal right to know about why they were denied?",
      "What would you tell them if they believe this contract term wasn't explained clearly enough?",
    ],
  },
  {
    title: "A Dispute Over a Missed Loan Payment at Meridian Community Credit Union",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:069", description: "Identify the basic torts relating to business enterprises" },
      { code: "BL:070", description: "Describe the nature of legal procedure" },
      { code: "BL:071", description: "Discuss the nature of debtor-creditor relationships" },
      { code: "BL:072", description: "Explain the nature of agency relationships" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member insists they made a loan payment that MERIDIAN's system shows as missing, and is upset that a late fee was charged before anyone looked into the discrepancy.",
      ask:
        "The branch manager (judge) wants you to explain the debtor-creditor relationship here and how this dispute should be handled fairly.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What would you want to verify before deciding whether that late fee was fair?",
      "How would you explain the debtor-creditor relationship in plain terms to this member?",
    ],
  },
  {
    title: "Welcoming a Nervous First-Time Member at Meridian Community Credit Union",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:003", description: "Explain the nature of positive customer relations" },
      { code: "CR:004", description: "Demonstrate a customer service mindset" },
      { code: "CR:005", description: "Reinforce service orientation through communication" },
      { code: "CR:006", description: "Respond to customer inquiries" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member opening their very first account seems nervous and unsure what questions are even okay to ask, having had a bad experience at a previous bank that made them feel rushed.",
      ask:
        "The branch manager (judge) wants you to demonstrate how you'd make this member feel comfortable and well-served.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear how you'd approach this",
    }),
    judgeQuestions: [
      "What would you do differently here than the experience that made this member feel rushed before?",
      "How would you invite questions from someone who seems unsure what's okay to ask?",
    ],
  },
  {
    title: "Handling an Upset Member Over a Fee at Meridian Community Credit Union",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:009", description: "Handle difficult customers" },
      { code: "CR:010", description: "Handle customer/client complaints" },
      { code: "CR:016", description: "Discuss the nature of customer relationship management" },
      { code: "CR:017", description: "Explain the role of ethics in customer relationship management" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member is visibly upset about an overdraft fee they feel wasn't properly disclosed, raising their voice at the counter in front of other members waiting in line.",
      ask:
        "The branch manager (judge) wants you to demonstrate how you'd de-escalate this and resolve the complaint fairly.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear how you'd handle this",
    }),
    judgeQuestions: [
      "What would you say first to de-escalate this member while others are watching?",
      "What ethical consideration matters most in how this complaint gets resolved?",
    ],
  },
  {
    title: "Answering Member Questions Over the Phone at Meridian Community Credit Union",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:058", description: "Ask relevant questions" },
      { code: "CO:059", description: "Interpret others' nonverbal cues" },
      { code: "CO:060", description: "Provide legitimate responses to inquiries" },
      { code: "CO:084", description: "Employ communication styles appropriate to target audience" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "A member calls sounding confused and a little frustrated about a hold placed on a recent deposit, but hasn't clearly explained what they actually want to happen.",
      ask:
        "The branch manager (judge) wants you to demonstrate how you'd handle this call and figure out what this member really needs.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear how you'd handle this call",
    }),
    judgeQuestions: [
      "What questions would you ask to figure out what's actually bothering this member?",
      "How would you adjust your explanation if you sensed this member was getting more frustrated, not less?",
    ],
  },
  {
    title: "Writing a Clear Email About a Policy Change at Meridian Community Credit Union",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "CO:016", description: "Explain the nature of effective written communications" },
      { code: "CO:088", description: "Select and utilize appropriate formats for professional writing" },
      { code: "CO:090", description: "Write professional emails" },
      { code: "CO:094", description: "Prepare simple written reports" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "MERIDIAN is changing its overdraft fee policy next month, and the branch manager (judge) wants a clear member-facing email drafted that explains the change without sounding like confusing legal boilerplate.",
      ask:
        "The branch manager (judge) wants you to draft this email and explain your approach.",
      location: "the branch's member-services desk",
      greetingAsk: "to hear your draft",
    }),
    judgeQuestions: [
      "What would you cut from a typical policy notice to make this clearer for members?",
      "What format decision did you make to keep this email easy to skim?",
    ],
  },
  {
    title: "Setting Goals for Your First Year at Meridian Community Credit Union",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:017", description: "Make decisions" },
      { code: "PD:018", description: "Set personal goals" },
      { code: "PD:019", description: "Use time-management skills" },
      { code: "PD:022", description: "Identify sources of career information" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "During your first performance check-in, the branch manager (judge) asks what goals you're setting for yourself this year and how you're managing your time between training and your regular member-facing duties.",
      ask:
        "The branch manager (judge) wants an honest answer about your goals and how you're approaching this decision about your own growth here.",
      location: "the branch manager's office",
      greetingAsk: "to hear your thinking on this",
    }),
    judgeQuestions: [
      "What personal goal are you setting for yourself in this role?",
      "Where would you look for more information about where this career path could lead?",
    ],
  },
  {
    title: "Staying Honest Under Pressure at Meridian Community Credit Union",
    instructionalArea: "Emotional Intelligence",
    performanceIndicators: [
      { code: "EI:022", description: "Demonstrate honesty and integrity" },
      { code: "EI:021", description: "Demonstrate responsible behavior" },
      { code: "EI:075", description: "Take responsibility for decisions and actions" },
      { code: "EI:125", description: "Recognize and respond to ethical dilemmas" },
    ],
    eventSituation: buildSituation({
      role: "a member-services trainee",
      company: "MERIDIAN COMMUNITY CREDIT UNION",
      judgeRole: "the branch manager",
      problem:
        "You made a small error setting up a member's account, and it would be easy to quietly fix it without mentioning it, but the branch manager (judge) is asking directly how the setup process went.",
      ask:
        "The branch manager (judge) wants an honest answer about how this went and how you're handling the mistake.",
      location: "the branch manager's office",
      greetingAsk: "to hear how this account setup went",
    }),
    judgeQuestions: [
      "How are you planning to make sure this error doesn't affect the member going forward?",
      "What would you do differently next time to catch a mistake like this sooner?",
    ],
  },
];

const POF_EVENT: EventCaseStudySeed = {
  eventSlug: "principles-of-finance",
  eventName: "Principles of Finance",
  careerCluster: "Finance",
  careerPathway: null,
  format: "PRINCIPLES",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: POF_CASES,
};

// ---------------------------------------------------------------------------
// financial-services-team-decision-making (TDM, Finance Cluster PIs, 41 codes)
// ---------------------------------------------------------------------------
const FTDM_CASES: CaseStudySeed[] = [
  {
    title: "A Compliance Gap Surfaces After an Internal Review at Summit Financial Group",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:133", description: "Discuss legal considerations in the finance industry" },
      { code: "BL:134", description: "Discuss the effect of tax laws and regulations on financial transactions" },
      { code: "BL:148", description: "Discuss the nature and scope of compliance in the finance industry" },
      { code: "BL:149", description: "Describe the use of technology in compliance" },
      { code: "BL:163", description: "Comply with the spirit and intent of laws and regulations" },
      { code: "BL:067", description: "Discuss the nature of law and sources of law in the United States" },
      { code: "BL:068", description: "Describe the United States' judicial system" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "An internal review found a compliance gap in how a recent batch of financial transactions was documented, and the branch director (judge) needs to understand the exposure before regulators potentially ask about it.",
      ask:
        "The branch director (judge) wants your team to analyze this compliance gap and recommend how to close it.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's analysis",
    }),
    judgeQuestions: [
      "What made this gap a compliance issue rather than just a paperwork mistake?",
      "What technology could help SUMMIT catch a gap like this before it becomes a pattern?",
    ],
  },
  {
    title: "A Client Complaint Threatens a Long-Standing Relationship at Summit Financial Group",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:012", description: "Explain the responsibilities of finance professionals in providing client services" },
      { code: "CR:024", description: "Use Customer Relationship Management (CRM) technology" },
      { code: "CR:003", description: "Explain the nature of positive customer relations" },
      { code: "CR:004", description: "Demonstrate a customer service mindset" },
      { code: "CR:006", description: "Respond to customer inquiries" },
      { code: "CR:009", description: "Handle difficult customers" },
      { code: "CR:010", description: "Handle customer/client complaints" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "A client of fifteen years is threatening to move their accounts elsewhere after feeling ignored following a service error, and the branch director (judge) needs this relationship repaired before the client acts on it.",
      ask:
        "The branch director (judge) wants your team to recommend how to respond to this client and repair the relationship.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would you check in the CRM system before reaching out to this client?",
      "What would you say to this client to actually rebuild trust rather than just apologize?",
    ],
  },
  {
    title: "Explaining Financial Markets to a New Institutional Client at Summit Financial Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:336", description: "Describe the role of financial institutions" },
      { code: "FI:337", description: "Explain types of financial markets (e.g., money market, capital market, insurance market, commodities markets, etc.)" },
      { code: "FI:274", description: "Describe sources of securities information" },
      { code: "FI:275", description: "Interpret securities table" },
      { code: "FI:075", description: "Describe types of financial-services providers" },
      { code: "FI:076", description: "Discuss considerations in selecting a financial-services provider" },
      { code: "FI:077", description: "Explain types of investments" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "A new institutional client is comparing SUMMIT against two other financial-services providers and wants a clear explanation of the markets SUMMIT operates in before committing.",
      ask:
        "The branch director (judge) wants your team to explain these markets and make the case for choosing SUMMIT.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's presentation",
    }),
    judgeQuestions: [
      "What would you point to in a securities table to help this client evaluate an option?",
      "What consideration should this client weigh most in selecting a provider like SUMMIT?",
    ],
  },
  {
    title: "A Market Downturn Rattles the Client Portfolio Book at Summit Financial Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:573", description: "Discuss the nature of convergence/consolidation in the finance industry" },
      { code: "FI:574", description: "Describe the relationship between economic conditions and financial markets" },
      { code: "FI:575", description: "Explain the nature and scope of financial globalization" },
      { code: "EC:081", description: "Discuss the measure of consumer spending as an economic indicator" },
      { code: "EC:082", description: "Discuss the impact of a nation's unemployment rates" },
      { code: "EC:083", description: "Describe the economic impact of inflation on business" },
      { code: "EC:084", description: "Explain the economic impact of interest-rate fluctuations" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "A sudden rise in interest rates has spooked several clients, and the branch director (judge) is fielding calls asking whether the whole portfolio book needs to be repositioned in response.",
      ask:
        "The branch director (judge) wants your team to explain what's driving this and recommend how to respond to concerned clients.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's analysis",
    }),
    judgeQuestions: [
      "What economic indicator would you point clients to in order to explain this rate move?",
      "Would you recommend repositioning the whole portfolio book, or is that an overreaction?",
    ],
  },
  {
    title: "Reviewing a Business Client's Equity Changes at Summit Financial Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:630", description: "Explain the nature of statements of changes in equity" },
      { code: "FI:238", description: "Calculate the time value of money" },
      { code: "FI:091", description: "Describe the nature of cash flow statements" },
      { code: "FI:093", description: "Explain the nature of balance sheets" },
      { code: "FI:094", description: "Describe the nature of income statements" },
      { code: "FI:085", description: "Explain the concept of accounting" },
      { code: "FI:002", description: "Explain the purposes and importance of credit" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "A small-business client applying for a larger line of credit has submitted financial statements the branch director (judge) wants reviewed carefully before recommending approval.",
      ask:
        "The branch director (judge) wants your team to review these statements and recommend whether this credit line should move forward.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's review",
    }),
    judgeQuestions: [
      "What in these financial statements would you flag before recommending approval?",
      "How does the time value of money factor into structuring this credit line?",
    ],
  },
  {
    title: "Building a Managerial Accounting Module for Business Clients at Summit Financial Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:658", description: "Describe types of costs used in managerial accounting (e.g., direct cost, indirect cost, sunk cost, differential cost, etc.)" },
      { code: "FI:659", description: "Describe marginal analysis techniques and applications" },
      { code: "FI:660", description: "Explain the nature of managerial accounting" },
      { code: "EC:013", description: "Explain the concept of productivity" },
      { code: "EC:014", description: "Analyze impact of specialization/division of labor on productivity" },
      { code: "OP:017", description: "Explain the concept of production" },
      { code: "OP:024", description: "Explain the nature of overhead/operating costs" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "SUMMIT wants to offer a new advisory service teaching small-business clients the managerial accounting basics they need to price their products correctly, and the branch director (judge) wants the first module outlined.",
      ask:
        "The branch director (judge) wants your team to outline what this managerial accounting module should teach.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's outline",
    }),
    judgeQuestions: [
      "What's the most common costing mistake small-business clients make that this module should address?",
      "How would you explain overhead costs to a client who's never separated them from direct costs?",
    ],
  },
  {
    title: "A Cost-Allocation Dispute Between Two Departments at Summit Financial Group",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:661", description: "Discuss the use of variance analysis in managerial accounting" },
      { code: "FI:662", description: "Discuss the nature of cost accounting budgets" },
      { code: "FI:663", description: "Discuss the nature of cost allocation" },
      { code: "OP:025", description: "Explain employee's role in expense control" },
      { code: "EC:010", description: "Identify factors affecting a business's profit" },
      { code: "EC:011", description: "Determine factors affecting business risk" },
      { code: "EC:012", description: "Explain the concept of competition" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "Two internal departments at a business client are disputing how shared overhead costs get allocated between them, each arguing the current method unfairly inflates their budget variance.",
      ask:
        "The branch director (judge) wants your team to recommend a fairer cost-allocation approach for this client.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would make a cost-allocation method feel unfair to one of these departments?",
      "How would you use variance analysis to show whether the new method actually fixed this?",
    ],
  },
  {
    title: "Launching a Financial-Information Dashboard for Clients at Summit Financial Group",
    instructionalArea: "Financial-Information Management",
    performanceIndicators: [
      { code: "FM:002", description: "Explain the nature and scope of the financial-information management function" },
      { code: "FM:003", description: "Explain the role of ethics in financial-information management" },
      { code: "FM:009", description: "Describe techniques used to analyze customer financial information" },
      { code: "NF:009", description: "Demonstrate basic database applications" },
      { code: "NF:010", description: "Demonstrate basic spreadsheet applications" },
      { code: "NF:088", description: "Use an integrated business software application package" },
      { code: "NF:093", description: "Interpret statistical findings" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "SUMMIT wants to launch a self-service dashboard letting clients view their own financial summaries online, and the branch director (judge) is concerned about what customer financial information should and shouldn't be exposed this way.",
      ask:
        "The branch director (judge) wants your team to outline what this dashboard should include and how client data should be handled ethically.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's outline",
    }),
    judgeQuestions: [
      "What customer financial information would you be cautious about exposing on a self-service dashboard?",
      "What technique would you use to make sure this dashboard's data is actually accurate for clients?",
    ],
  },
  {
    title: "Using Client Data to Recommend New Services at Summit Financial Group",
    instructionalArea: "Financial-Information Management",
    performanceIndicators: [
      { code: "FM:011", description: "Describe the use of technology in the financial-information management function" },
      { code: "FM:013", description: "Demonstrate budgeting applications" },
      { code: "FM:014", description: "Demonstrate financial analysis applications" },
      { code: "FM:016", description: "Discuss non-traditional uses for financial information (e.g., lean, sustainability reporting, activity-based costing [ABC], six sigma)" },
      { code: "NF:139", description: "Explain the principles of data analysis" },
      { code: "NF:148", description: "Discuss the nature of data mining" },
      { code: "NF:216", description: "Translate research findings into actionable business recommendations" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "SUMMIT has years of client financial data sitting mostly unused, and the branch director (judge) wants to know whether it could responsibly be analyzed to recommend relevant new services to existing clients.",
      ask:
        "The branch director (judge) wants your team to propose how this data could be used and what recommendations it might support.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's proposal",
    }),
    judgeQuestions: [
      "What's a non-traditional use of this financial data that could actually help clients?",
      "How would you turn a pattern you found in this data into an actual recommendation for a client?",
    ],
  },
  {
    title: "Migrating to a New Database System at Summit Financial Group",
    instructionalArea: "Information Management",
    performanceIndicators: [
      { code: "NF:124", description: "Demonstrate advanced database applications" },
      { code: "NF:083", description: "Explain the role of information systems" },
      { code: "NF:084", description: "Discuss principles of computer systems" },
      { code: "NF:085", description: "Use basic operating systems" },
      { code: "NF:086", description: "Describe the scope of the internet" },
      { code: "NF:088", description: "Use an integrated business software application package" },
      { code: "NF:093", description: "Interpret statistical findings" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "SUMMIT is migrating client records to a new advanced database system, and the branch director (judge) is worried about data getting lost or corrupted mid-migration.",
      ask:
        "The branch director (judge) wants your team to recommend how to plan and execute this migration safely.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's plan",
    }),
    judgeQuestions: [
      "What would you check before and after migration to confirm no client data was lost?",
      "What role does the existing information system play in making this migration smoother?",
    ],
  },
  {
    title: "Recruiting for Open Finance Positions at Summit Financial Group",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:152", description: "Discuss employment opportunities in the finance industry" },
      { code: "PD:153", description: "Discuss opportunities for building professional relationships in finance" },
      { code: "PD:022", description: "Identify sources of career information" },
      { code: "PD:025", description: "Explain employment opportunities in business" },
      { code: "PD:026", description: "Utilize job-search strategies" },
      { code: "PD:036", description: "Utilize resources that can contribute to professional development (e.g., trade journals/periodicals, professional/trade associations, classes/seminars, trade shows, and mentors)" },
      { code: "PD:037", description: "Use networking techniques to identify employment opportunities" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "SUMMIT has three open analyst positions that have gone unfilled for months, and the branch director (judge) wants to know if the current recruiting approach is even reaching the right candidates.",
      ask:
        "The branch director (judge) wants your team to recommend a better recruiting and networking approach.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "Where would you look for candidates that our current recruiting approach might be missing?",
      "What networking opportunity could help SUMMIT build a stronger pipeline going forward?",
    ],
  },
  {
    title: "A Governance Scandal Elsewhere Prompts a Self-Review at Summit Financial Group",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
      { code: "PD:214", description: "Describe the components of a well-governed company (e.g., board of directors, reporting, transparency, internal and external audit functions)" },
      { code: "EI:123", description: "Describe the nature of ethics" },
      { code: "EI:124", description: "Explain reasons for ethical dilemmas" },
      { code: "EI:125", description: "Recognize and respond to ethical dilemmas" },
      { code: "EI:131", description: "Explain the nature of ethical leadership" },
      { code: "EI:132", description: "Model ethical behavior" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "News of a governance scandal at a competing firm has the branch director (judge) wanting a self-review of SUMMIT's own governance practices before a similar issue could ever take root here.",
      ask:
        "The branch director (judge) wants your team to review SUMMIT's governance and recommend where it could be strengthened.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's review",
    }),
    judgeQuestions: [
      "What component of a well-governed company would you check first here?",
      "What does ethical leadership actually look like in a moment where cutting a corner might be tempting?",
    ],
  },
  {
    title: "Employees Are Unclear on Their Role in New Governance Policy at Summit Financial Group",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:301", description: "Ascertain employee's role in achieving governance objectives" },
      { code: "PD:302", description: "Identify the factors that impact governance structures" },
      { code: "PD:303", description: "Describe the impact of governance processes on decision-making and management functions" },
      { code: "PD:250", description: "Adhere to company protocols and policies" },
      { code: "PD:251", description: "Follow rules of conduct" },
      { code: "PD:252", description: "Follow chain of command" },
      { code: "PD:254", description: "Determine the nature of organizational goals" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "A new governance policy rolled out last month, but a staff survey shows most employees don't actually understand what it changes about their day-to-day decisions.",
      ask:
        "The branch director (judge) wants your team to recommend how to clarify employees' role under this new policy.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What's likely causing employees to misunderstand what this policy actually changes for them?",
      "How would you connect this governance policy back to SUMMIT's broader organizational goals?",
    ],
  },
  {
    title: "Assessing Enterprise Risk After a Vendor's Data Breach at Summit Financial Group",
    instructionalArea: "Risk Management",
    performanceIndicators: [
      { code: "RM:041", description: "Explain the role of ethics in risk management" },
      { code: "RM:042", description: "Describe the use of technology in risk management" },
      { code: "RM:043", description: "Discuss legal considerations affecting risk management" },
      { code: "OP:441", description: "Explain information privacy, security, and confidentiality considerations in business" },
      { code: "OP:152", description: "Follow established security procedures/policies" },
      { code: "OP:153", description: "Protect company information and intangibles" },
      { code: "OP:064", description: "Maintain data security" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "A third-party vendor that processes some of SUMMIT's client data was breached, and the branch director (judge) needs to understand SUMMIT's exposure and legal obligations before deciding how to respond to affected clients.",
      ask:
        "The branch director (judge) wants your team to assess this risk and recommend a response.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's assessment",
    }),
    judgeQuestions: [
      "What's SUMMIT's exposure here even though the breach happened at the vendor, not us?",
      "What legal consideration should guide how and when we notify affected clients?",
    ],
  },
  {
    title: "Strengthening Internal Risk Controls at Summit Financial Group",
    instructionalArea: "Risk Management",
    performanceIndicators: [
      { code: "RM:058", description: "Discuss the nature of risk control (i.e., internal and external)" },
      { code: "RM:062", description: "Discuss the nature of enterprise risk management (ERM)" },
      { code: "EC:011", description: "Determine factors affecting business risk" },
      { code: "OP:009", description: "Explain procedures for handling accidents" },
      { code: "OP:010", description: "Handle and report emergency situations" },
      { code: "OP:013", description: "Explain routine security precautions" },
      { code: "OP:031", description: "Maintain inventory of supplies" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "An internal audit flagged that SUMMIT has no documented enterprise risk management approach, relying instead on individual managers each handling risk their own way.",
      ask:
        "The branch director (judge) wants your team to propose a real ERM approach for the branch.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's proposal",
    }),
    judgeQuestions: [
      "What's the difference between an internal and an external risk control SUMMIT should document?",
      "What would you tell a manager who feels their current informal approach is working fine?",
    ],
  },
  {
    title: "Advising a Client on Global Investment Exposure at Summit Financial Group",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "FI:575", description: "Explain the nature and scope of financial globalization" },
      { code: "EC:100", description: "Describe the determinants of exchange rates and their effects on the domestic economy" },
      { code: "EC:109", description: "Discuss the impact of globalization on business" },
      { code: "EC:110", description: "Explain cultural considerations that impact global business relations" },
      { code: "EC:112", description: "Explain the impact of major trade alliances on business activities" },
      { code: "EC:113", description: "Describe the impact of the political environment on world trade" },
      { code: "EC:114", description: "Explain the impact of geography on world trade" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "A client wants to diversify into international investments but is nervous about currency risk and political instability in some of the markets under consideration.",
      ask:
        "The branch director (judge) wants your team to walk this client through the real risks and opportunities of global diversification.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's explanation",
    }),
    judgeQuestions: [
      "What exchange-rate risk should this client understand before investing internationally?",
      "How would a trade alliance in one of these regions actually affect this client's investment?",
    ],
  },
  {
    title: "Investigating an Unusual Transaction Pattern at Summit Financial Group",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:148", description: "Discuss the nature and scope of compliance in the finance industry" },
      { code: "BL:149", description: "Describe the use of technology in compliance" },
      { code: "RM:043", description: "Discuss legal considerations affecting risk management" },
      { code: "BL:069", description: "Identify the basic torts relating to business enterprises" },
      { code: "BL:070", description: "Describe the nature of legal procedure" },
      { code: "BL:071", description: "Discuss the nature of debtor-creditor relationships" },
      { code: "EI:125", description: "Recognize and respond to ethical dilemmas" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "A junior analyst flagged an account with an unusual pattern of transactions that doesn't clearly violate any rule, but feels off, and the branch director (judge) wants a careful review before deciding whether to escalate it.",
      ask:
        "The branch director (judge) wants your team to review this pattern and recommend whether and how to escalate it.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's review",
    }),
    judgeQuestions: [
      "What would push this from \"feels off\" to something that actually needs to be escalated?",
      "What legal consideration should guide how this account is handled while it's under review?",
    ],
  },
  {
    title: "Presenting the Annual Report to the Board at Summit Financial Group",
    instructionalArea: "Communication Skills",
    performanceIndicators: [
      { code: "FI:630", description: "Explain the nature of statements of changes in equity" },
      { code: "FM:014", description: "Demonstrate financial analysis applications" },
      { code: "CO:087", description: "Select and use appropriate graphic aids" },
      { code: "CO:091", description: "Write executive summaries" },
      { code: "CO:094", description: "Prepare simple written reports" },
      { code: "CO:201", description: "Facilitate (lead) group discussions" },
      { code: "CO:025", description: "Make oral presentations" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "The board meeting is next week, and past annual report presentations have run long and lost the board's attention well before the important numbers came up.",
      ask:
        "The branch director (judge) wants your team to propose how this year's presentation should be structured differently.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's proposal",
    }),
    judgeQuestions: [
      "What would you cut from a typical annual report presentation to keep the board's attention?",
      "What graphic aid would help the board grasp the equity changes at a glance?",
    ],
  },
  {
    title: "Building a Client Retention Campaign at Summit Financial Group",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:024", description: "Use Customer Relationship Management (CRM) technology" },
      { code: "PD:153", description: "Discuss opportunities for building professional relationships in finance" },
      { code: "MK:001", description: "Explain marketing and its importance in a global economy" },
      { code: "MK:014", description: "Explain factors that influence customer/client/business buying behavior" },
      { code: "MK:019", description: "Describe connections between company actions and results (e.g., influencing consumer buying behavior, gaining market share, etc.)" },
      { code: "EI:012", description: "Persuade others" },
      { code: "EI:062", description: "Demonstrate negotiation skills" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "Client retention has slipped this year as competitors offer more attractive rates, and the branch director (judge) wants a real retention campaign rather than just hoping loyal clients stay out of habit.",
      ask:
        "The branch director (judge) wants your team to propose a retention campaign using the CRM data already on hand.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's proposal",
    }),
    judgeQuestions: [
      "What would the CRM data tell you about which clients are actually at risk of leaving?",
      "How would you persuade a client to stay without just matching a competitor's rate?",
    ],
  },
  {
    title: "A Team Restructuring Raises Ethics Questions at Summit Financial Group",
    instructionalArea: "Emotional Intelligence",
    performanceIndicators: [
      { code: "PD:301", description: "Ascertain employee's role in achieving governance objectives" },
      { code: "PD:302", description: "Identify the factors that impact governance structures" },
      { code: "EI:126", description: "Assess personal behavior and values" },
      { code: "EI:127", description: "Demonstrate fairness" },
      { code: "EI:128", description: "Build trust in relationships" },
      { code: "EI:129", description: "Foster open, honest communication" },
      { code: "EI:130", description: "Collaborate with others" },
    ],
    eventSituation: buildSituation({
      role: "the financial services analysts",
      company: "SUMMIT FINANCIAL GROUP",
      judgeRole: "the branch director",
      problem:
        "A team restructuring is combining two departments with different reporting lines, and some employees privately worry the process for deciding who reports to whom hasn't been fair or transparent.",
      ask:
        "The branch director (judge) wants your team to recommend how to communicate this restructuring fairly and rebuild trust.",
      location: "the branch's compliance conference room",
      greetingAsk: "to hear your team's recommendation",
    }),
    judgeQuestions: [
      "What would make this restructuring process feel fairer to the employees affected?",
      "How would you rebuild trust with a team that already feels uncertain about this change?",
    ],
  },
];

const FTDM_EVENT: EventCaseStudySeed = {
  eventSlug: "financial-services-team-decision-making",
  eventName: "Financial Services Team Decision Making",
  careerCluster: "Finance",
  careerPathway: null,
  format: "TEAM_DECISION_MAKING",
  prepMinutes: 30,
  presentMinutes: 15,
  cases: FTDM_CASES,
};

// ---------------------------------------------------------------------------
// financial-consulting (PROFESSIONAL_SELLING_CONSULTING, Finance Cluster PIs,
// same 41-code pool as the TDM event above, 1:1 client-consultation framing)
// ---------------------------------------------------------------------------
const FCE_CASES: CaseStudySeed[] = [
  {
    title: "Building a First Budget with a New Client at Apex Financial Consulting",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:065", description: "Set financial goals" },
      { code: "FI:066", description: "Develop personal budget" },
      { code: "FI:106", description: "Describe the nature of budgets" },
      { code: "CR:012", description: "Explain the responsibilities of finance professionals in providing client services" },
      { code: "CR:004", description: "Demonstrate a customer service mindset" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client just started a new job with a significantly higher salary than before and has never had to think seriously about a budget, spending fairly freely since the raise.",
      ask:
        "Help this client set concrete financial goals and build a workable budget around this new income.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your recommendations",
    }),
    judgeQuestions: [
      "How did you decide which goals to prioritize first with me?",
      "What would you say if I told you I don't think I need a strict budget at this income level?",
    ],
  },
  {
    title: "Comparing Checking and Savings Options at Apex Financial Consulting",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:068", description: "Interpret a pay stub" },
      { code: "FI:069", description: "Maintain financial records" },
      { code: "FI:070", description: "Balance a bank account" },
      { code: "FI:075", description: "Describe types of financial-services providers" },
      { code: "FI:076", description: "Discuss considerations in selecting a financial-services provider" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client has three different checking accounts at three different banks left over from past jobs and moves, and has no real system for tracking any of them.",
      ask:
        "Help this client think through consolidating their accounts and choosing the right provider going forward.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What would you want to know about my situation before recommending which accounts to keep?",
      "What consideration matters most in choosing where to consolidate?",
    ],
  },
  {
    title: "Helping a Client Choose a Financial-Services Provider at Apex Financial Consulting",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:077", description: "Explain types of investments" },
      { code: "FI:081", description: "Describe the concept of insurance" },
      { code: "FI:002", description: "Explain the purposes and importance of credit" },
      { code: "CR:006", description: "Respond to customer inquiries" },
      { code: "CR:007", description: "Interpret business policies to customers/clients" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client is weighing a large national bank against a smaller regional credit union for their combined banking, investing, and insurance needs and isn't sure how to compare them fairly.",
      ask:
        "Walk this client through how these options compare for their needs.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your comparison",
    }),
    judgeQuestions: [
      "What would you tell me matters most in comparing these two options?",
      "How does insurance factor into this decision if I haven't thought about it yet?",
    ],
  },
  {
    title: "Understanding a Credit Score for the First Time at Apex Financial Consulting",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:071", description: "Demonstrate the wise use of credit" },
      { code: "FI:072", description: "Validate credit history" },
      { code: "FI:063", description: "Explain legal responsibilities associated with consumer financial products and services" },
      { code: "FI:782", description: "Calculate the cost of credit" },
      { code: "FI:073", description: "Protect against identity theft" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client was recently denied an apartment lease over a credit score they didn't know was low, and has no idea what's actually on their credit report or how it got that way.",
      ask:
        "Help this client understand their credit situation and what to do about it.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "What would you check first to understand why this score is lower than I expected?",
      "What should I be doing differently with credit going forward?",
    ],
  },
  {
    title: "Planning for Retirement Well in Advance at Apex Financial Consulting",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:569", description: "Discuss the nature of retirement planning" },
      { code: "FI:571", description: "Determine insurance needs" },
      { code: "FI:572", description: "Explain the nature of estate planning" },
      { code: "FI:270", description: "Explain the need to save and invest" },
      { code: "FI:565", description: "Pay bills" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client is in their early thirties and feels retirement planning can wait another decade, more focused on paying down current bills than thinking that far ahead.",
      ask:
        "Make the case for why this client should start retirement and estate planning now.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your case for this",
    }),
    judgeQuestions: [
      "What would convince me this is worth prioritizing over my current bills?",
      "What does estate planning even have to do with someone my age?",
    ],
  },
  {
    title: "Explaining the Stock Market to a Curious Client at Apex Financial Consulting",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:336", description: "Describe the role of financial institutions" },
      { code: "FI:337", description: "Explain types of financial markets (e.g., money market, capital market, insurance market, commodities markets, etc.)" },
      { code: "FI:274", description: "Describe sources of securities information" },
      { code: "FI:275", description: "Interpret securities table" },
      { code: "CR:012", description: "Explain the responsibilities of finance professionals in providing client services" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client has heard coworkers talk about the stock market for years but has never invested a dollar, worried they don't understand it well enough to start.",
      ask:
        "Explain the basics of how these markets work in a way this client can act on.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear this explained",
    }),
    judgeQuestions: [
      "How would you read a securities table for me if I've never looked at one before?",
      "What would you recommend as a reasonable first step, given I'm starting from zero?",
    ],
  },
  {
    title: "Weighing a Large Personal Loan at Apex Financial Consulting",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:625", description: "Apply for a consumer loan" },
      { code: "FI:568", description: "Control debt" },
      { code: "FI:067", description: "Explain the nature of tax liabilities" },
      { code: "FI:074", description: "Prepare personal income tax forms" },
      { code: "FI:830", description: "Manage online accounts" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client wants a large personal loan to consolidate several smaller debts but is also behind on organizing this year's tax paperwork, unsure how the two connect.",
      ask:
        "Help this client think through whether this loan makes sense and how to get their tax situation organized.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What would you want to understand about my existing debts before recommending this loan?",
      "How does getting my tax paperwork organized actually matter for this loan decision?",
    ],
  },
  {
    title: "Reviewing Cash Flow and Net Worth Together at Apex Financial Consulting",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:091", description: "Describe the nature of cash flow statements" },
      { code: "FI:093", description: "Explain the nature of balance sheets" },
      { code: "FI:094", description: "Describe the nature of income statements" },
      { code: "FI:562", description: "Determine personal net worth" },
      { code: "FI:085", description: "Explain the concept of accounting" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client runs a small side business alongside a full-time job and has never separated personal and business finances enough to know their actual net worth.",
      ask:
        "Help this client understand their true financial position across both the job and the side business.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "Why does it matter that I separate my business and personal finances for this?",
      "What would my net worth actually tell me that my bank balance doesn't?",
    ],
  },
  {
    title: "Setting Up a Budgeting System for a Small-Business Client at Apex Financial Consulting",
    instructionalArea: "Financial-Information Management",
    performanceIndicators: [
      { code: "FM:013", description: "Demonstrate budgeting applications" },
      { code: "FM:014", description: "Demonstrate financial analysis applications" },
      { code: "FM:016", description: "Discuss non-traditional uses for financial information (e.g., lean, sustainability reporting, activity-based costing [ABC], six sigma)" },
      { code: "FM:002", description: "Explain the nature and scope of the financial-information management function" },
      { code: "FM:003", description: "Explain the role of ethics in financial-information management" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client owns a small business that has grown past the point of managing its budget on scratch paper, but is wary of software that might be more complicated than what they actually need.",
      ask:
        "Recommend a budgeting approach that fits where this business actually is right now.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What would convince me this new system is actually simpler, not just different?",
      "What's an example of a non-traditional use of this financial information that could help my business specifically?",
    ],
  },
  {
    title: "Explaining Why Finance Matters to a Reluctant Small-Business Owner at Apex Financial Consulting",
    instructionalArea: "Financial Analysis",
    performanceIndicators: [
      { code: "FI:579", description: "Describe the need for financial information" },
      { code: "FI:354", description: "Explain the role of finance in business" },
      { code: "FI:355", description: "Discuss the role of ethics in finance" },
      { code: "FI:356", description: "Explain legal considerations for finance" },
      { code: "FM:009", description: "Describe techniques used to analyze customer financial information" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client built a successful small business on instinct alone and is skeptical that hiring a financial consultant is worth the cost, feeling like the numbers have taken care of themselves so far.",
      ask:
        "Make the case for why real financial oversight matters as this business grows.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your case for this",
    }),
    judgeQuestions: [
      "What would you say to convince me this is worth the cost at this stage?",
      "What legal consideration should I be worried about if I keep relying on instinct alone?",
    ],
  },
  {
    title: "Reassuring a Client About Insurance and Risk at Apex Financial Consulting",
    instructionalArea: "Risk Management",
    performanceIndicators: [
      { code: "FI:081", description: "Describe the concept of insurance" },
      { code: "EC:011", description: "Determine factors affecting business risk" },
      { code: "RM:041", description: "Explain the role of ethics in risk management" },
      { code: "RM:042", description: "Describe the use of technology in risk management" },
      { code: "RM:043", description: "Discuss legal considerations affecting risk management" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client thinks their current insurance coverage is probably fine but has never had anyone actually walk through what risks it does and doesn't cover.",
      ask:
        "Walk this client through their actual risk exposure and whether their coverage matches it.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your review",
    }),
    judgeQuestions: [
      "What risk do you think I'm most likely underestimating right now?",
      "How would technology actually help track whether my coverage stays adequate over time?",
    ],
  },
  {
    title: "Handling a Client's Identity-Theft Scare at Apex Financial Consulting",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "FI:073", description: "Protect against identity theft" },
      { code: "OP:064", description: "Maintain data security" },
      { code: "OP:152", description: "Follow established security procedures/policies" },
      { code: "OP:153", description: "Protect company information and intangibles" },
      { code: "EI:103", description: "Maintain the confidentiality of others" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client just discovered a fraudulent account opened in their name and is panicked, unsure whether their information was exposed through APEX or somewhere else entirely.",
      ask:
        "Walk this client through what to do right now and how their information is protected here.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear how you'd help",
    }),
    judgeQuestions: [
      "What's the very first thing I should do about this fraudulent account?",
      "How do I know my information is actually safe working with APEX going forward?",
    ],
  },
  {
    title: "Walking a Client Through Estate Planning Basics at Apex Financial Consulting",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "FI:572", description: "Explain the nature of estate planning" },
      { code: "BL:002", description: "Describe the nature of legally binding contracts" },
      { code: "BL:003", description: "Explain types of business ownership" },
      { code: "BL:069", description: "Identify the basic torts relating to business enterprises" },
      { code: "BL:001", description: "Describe legal issues affecting businesses" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client recently inherited a small family business alongside their siblings and has no estate plan or ownership agreement of their own, worried about what happens if something happens to them.",
      ask:
        "Walk this client through the estate-planning basics they need given this new ownership situation.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "What legal issue should I be most concerned about with this shared ownership?",
      "What would happen to my share of this business if I don't put a plan in place?",
    ],
  },
  {
    title: "Explaining Compliance Risk in an Investment Recommendation at Apex Financial Consulting",
    instructionalArea: "Business Law",
    performanceIndicators: [
      { code: "BL:133", description: "Discuss legal considerations in the finance industry" },
      { code: "BL:134", description: "Discuss the effect of tax laws and regulations on financial transactions" },
      { code: "BL:148", description: "Discuss the nature and scope of compliance in the finance industry" },
      { code: "BL:149", description: "Describe the use of technology in compliance" },
      { code: "BL:163", description: "Comply with the spirit and intent of laws and regulations" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client read online that a certain investment strategy could significantly reduce their taxes and wants to know why APEX hasn't recommended it, suspicious it's being overly cautious.",
      ask:
        "Explain the compliance considerations behind why APEX approaches this differently.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "What compliance concern would this strategy actually raise?",
      "How do tax laws factor into why APEX is being cautious here?",
    ],
  },
  {
    title: "Advising a Client on Global Investment Diversification at Apex Financial Consulting",
    instructionalArea: "Economics",
    performanceIndicators: [
      { code: "EC:100", description: "Describe the determinants of exchange rates and their effects on the domestic economy" },
      { code: "EC:109", description: "Discuss the impact of globalization on business" },
      { code: "EC:110", description: "Explain cultural considerations that impact global business relations" },
      { code: "EC:112", description: "Explain the impact of major trade alliances on business activities" },
      { code: "EC:113", description: "Describe the impact of the political environment on world trade" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client wants to diversify their portfolio into international markets after reading about strong overseas growth but has no sense of the currency or political risks involved.",
      ask:
        "Help this client understand what global diversification would actually mean for their portfolio.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "What exchange-rate risk should I understand before making this move?",
      "How would political instability in one of these markets actually affect my investment?",
    ],
  },
  {
    title: "A Client Disputes a Fee on Their Statement at Apex Financial Consulting",
    instructionalArea: "Customer Relations",
    performanceIndicators: [
      { code: "CR:009", description: "Handle difficult customers" },
      { code: "CR:010", description: "Handle customer/client complaints" },
      { code: "CR:024", description: "Use Customer Relationship Management (CRM) technology" },
      { code: "CR:016", description: "Discuss the nature of customer relationship management" },
      { code: "CR:017", description: "Explain the role of ethics in customer relationship management" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client is upset about an advisory fee on their latest statement they don't remember agreeing to, and is questioning whether to continue working with APEX at all.",
      ask:
        "Address this client's concern about the fee and resolve it fairly.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear you explain this charge",
    }),
    judgeQuestions: [
      "What would you check before responding to make sure this fee was actually charged correctly?",
      "What would you do if you found this fee genuinely shouldn't have been charged?",
    ],
  },
  {
    title: "Discussing a Career Change Into Financial Consulting at Apex Financial Consulting",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:152", description: "Discuss employment opportunities in the finance industry" },
      { code: "PD:153", description: "Discuss opportunities for building professional relationships in finance" },
      { code: "PD:022", description: "Identify sources of career information" },
      { code: "PD:036", description: "Utilize resources that can contribute to professional development (e.g., trade journals/periodicals, professional/trade associations, classes/seminars, trade shows, and mentors)" },
      { code: "PD:037", description: "Use networking techniques to identify employment opportunities" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "A longtime client mentions their adult child is considering a career change into finance and asks for honest advice about what the field is really like and how to break in.",
      ask:
        "Share what you'd tell this client's child about breaking into the finance industry.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear what you'd tell them",
    }),
    judgeQuestions: [
      "What would you tell someone who thinks this field is just about crunching numbers all day?",
      "What networking step would you recommend they take first?",
    ],
  },
  {
    title: "A Client's Small Business Faces a Governance Question at Apex Financial Consulting",
    instructionalArea: "Professional Development",
    performanceIndicators: [
      { code: "PD:213", description: "Discuss the importance of corporate governance in business" },
      { code: "PD:214", description: "Describe the components of a well-governed company (e.g., board of directors, reporting, transparency, internal and external audit functions)" },
      { code: "PD:301", description: "Ascertain employee's role in achieving governance objectives" },
      { code: "PD:302", description: "Identify the factors that impact governance structures" },
      { code: "PD:303", description: "Describe the impact of governance processes on decision-making and management functions" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client's growing business just brought on outside investors who are asking about a formal board and reporting structure the client has never needed before.",
      ask:
        "Explain to this client what basic governance structure their business now needs.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your explanation",
    }),
    judgeQuestions: [
      "What's the simplest governance structure that would satisfy these new investors?",
      "How would this new structure actually change how I make day-to-day decisions?",
    ],
  },
  {
    title: "Managing Enterprise Risk for a Client's Growing Business at Apex Financial Consulting",
    instructionalArea: "Risk Management",
    performanceIndicators: [
      { code: "RM:058", description: "Discuss the nature of risk control (i.e., internal and external)" },
      { code: "RM:062", description: "Discuss the nature of enterprise risk management (ERM)" },
      { code: "EC:010", description: "Identify factors affecting a business's profit" },
      { code: "EC:011", description: "Determine factors affecting business risk" },
      { code: "EC:012", description: "Explain the concept of competition" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client's business has grown quickly, and with growth has come new risks the client admits they haven't formally thought through, from a key employee leaving to a new competitor undercutting prices.",
      ask:
        "Help this client build a basic enterprise risk approach for their growing business.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear your recommendation",
    }),
    judgeQuestions: [
      "What risk would you tell me to address first given where my business is right now?",
      "What's the difference between a risk I can control internally and one I can't?",
    ],
  },
  {
    title: "Building Long-Term Trust with a Returning Client at Apex Financial Consulting",
    instructionalArea: "Emotional Intelligence",
    performanceIndicators: [
      { code: "EI:128", description: "Build trust in relationships" },
      { code: "EI:129", description: "Foster open, honest communication" },
      { code: "EI:130", description: "Collaborate with others" },
      { code: "CR:029", description: "Develop rapport with customers" },
      { code: "CR:030", description: "Build and maintain relationships with customers" },
    ],
    eventSituation: buildSituation({
      role: "the financial consultant",
      company: "APEX FINANCIAL CONSULTING",
      judgeRole: "the client",
      problem:
        "The client worked with APEX years ago, left for a while after a disappointing experience with a different advisor at the firm, and is cautiously giving APEX another chance today.",
      ask:
        "Rebuild this client's confidence and outline how you'll work together going forward.",
      location: "the consulting firm's client-meeting room",
      greetingAsk: "to hear why I should give this another try",
    }),
    judgeQuestions: [
      "What would you do differently to make sure I don't have the same disappointing experience again?",
      "How would you keep our communication open if something doesn't go as planned?",
    ],
  },
];

const FCE_EVENT: EventCaseStudySeed = {
  eventSlug: "financial-consulting",
  eventName: "Financial Consulting",
  careerCluster: "Finance",
  careerPathway: null,
  format: "PROFESSIONAL_SELLING_CONSULTING",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: FCE_CASES,
};

export const FINANCE_CASE_STUDY_SEED: EventCaseStudySeed[] = [
  ACT_EVENT,
  BFS_EVENT,
  POF_EVENT,
  FTDM_EVENT,
  FCE_EVENT,
];
