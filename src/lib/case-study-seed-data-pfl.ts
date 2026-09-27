/**
 * Personal Financial Literacy case studies. Unlike every other roleplay
 * event, PFL's own seeded PerformanceIndicator rows aren't discrete,
 * granular indicators — they're the six broad Jump$tart national standards
 * (Earning Income, Spending, Saving, Investing, Managing Credit, Managing
 * Risk), each stored as one long paragraph (tier "Standards", no code).
 * Each case here cites 3 of these 6 standards, per the confirmed PI count
 * for this event, with the description drawn verbatim as a real sentence
 * from within that standard's actual seeded paragraph — never invented text
 * — so the citation stays accurate to what's actually in the database.
 *
 * PFL is also structurally different from every other event here: the
 * participant plays themselves making a personal financial decision, not an
 * employee at a company, so these situations skip the buildSituation
 * helper's "role at COMPANY" framing.
 */
import type { CaseStudySeed, EventCaseStudySeed } from "./case-study-seed-data";

const STANDARD_I = { code: "I", area: "I. Earning Income" };
const STANDARD_II = { code: "II", area: "II. Spending" };
const STANDARD_III = { code: "III", area: "III. Saving" };
const STANDARD_IV = { code: "IV", area: "IV. Investing" };
const STANDARD_V = { code: "V", area: "V. Managing Credit" };
const STANDARD_VI = { code: "VI", area: "VI. Managing Risk" };

function situation(params: {
  premise: string;
  ask: string;
  greetingAsk: string;
}): string {
  return [
    params.premise,
    params.ask,
    `You will discuss your thinking with the financial literacy coach (judge) in a role-play. The coach (judge) will begin by greeting you and asking ${params.greetingAsk}. After you have presented your reasoning and answered the coach's (judge's) follow-up questions, the coach (judge) will conclude the role-play by thanking you for your work.`,
  ].join("\n\n");
}

const PFL_CASES: CaseStudySeed[] = [
  {
    title: "Budgeting Your First Part-Time Paycheck",
    instructionalArea: "Earning Income, Spending, Saving",
    performanceIndicators: [
      { code: STANDARD_I.code, description: "Spendable income is lower than gross income due to taxes assessed on income by federal, state, and local governments." },
      { code: STANDARD_II.code, description: "A budget is a plan for allocating a person's spendable income to necessary and desired goods and services." },
      { code: STANDARD_III.code, description: "People who have sufficient income can choose to save some of it for future uses such as emergencies or later purchases." },
    ],
    eventSituation: situation({
      premise:
        "You just got your first paycheck from a part-time job, and the amount deposited is noticeably less than the hourly wage times your hours would suggest, since taxes were withheld. You want to build a simple plan for what to do with this and future paychecks.",
      ask:
        "Explain why your take-home pay is lower than you expected, and walk through a basic budget that balances spending now against saving for something later.",
      greetingAsk: "to hear how you're thinking about this first paycheck",
    }),
    judgeQuestions: [
      "Why is the amount in your account lower than your hours times your wage?",
      "How would you split this paycheck between spending and saving?",
    ],
  },
  {
    title: "Saving for a Car vs. Investing the Money Instead",
    instructionalArea: "Spending, Saving, Investing",
    performanceIndicators: [
      { code: STANDARD_II.code, description: "People can often improve their financial well-being by making well-informed spending decisions, which includes critical evaluation of price, quality, product information, and method of payment." },
      { code: STANDARD_III.code, description: "Funds needed for transactions, bill-paying, or purchases, are commonly held in federally insured checking or savings accounts at financial institutions because these accounts offer easy access to their money and low risk." },
      { code: STANDARD_IV.code, description: "People can more easily achieve their financial goals by investing steadily over many years, reinvesting dividends, and capital gains to compound their returns." },
    ],
    eventSituation: situation({
      premise:
        "You've saved $2,000 toward a used car you want to buy in about six months, but a friend suggested you'd earn more by investing it in the stock market instead of leaving it in a savings account.",
      ask:
        "Explain why your friend's suggestion doesn't fit this specific goal and where this money should actually be kept.",
      greetingAsk: "to hear what you decided to do with this money",
    }),
    judgeQuestions: [
      "Why is investing this money in stocks a bad fit for a goal that's only six months away?",
      "What type of account should this car-fund money actually sit in, and why?",
    ],
  },
  {
    title: "Getting Your First Credit Card",
    instructionalArea: "Investing, Managing Credit, Managing Risk",
    performanceIndicators: [
      { code: STANDARD_IV.code, description: "Investors select investments that are consistent with their risk tolerance, and they diversify across a number of different investment choices to reduce investment risk." },
      { code: STANDARD_V.code, description: "Lenders evaluate creditworthiness of a borrower based on the type of credit, past credit history, and expected ability to repay the loan in the future." },
      { code: STANDARD_VI.code, description: "People are exposed to personal risks that can result in lost income, assets, health, life, or identity." },
    ],
    eventSituation: situation({
      premise:
        "You just turned 18 and got approved for your first credit card. You're excited about the rewards points but a bit nervous about the responsibility, since you've heard stories about people getting into serious credit card debt.",
      ask:
        "Explain how you'd use this card responsibly to start building credit history without exposing yourself to unnecessary financial risk.",
      greetingAsk: "to hear your plan for using this card responsibly",
    }),
    judgeQuestions: [
      "What habit would you build to make sure this card helps rather than hurts your credit history?",
      "What risk are you most worried about with your first credit card, and how would you guard against it?",
    ],
  },
  {
    title: "Choosing Between a Higher-Paying Job With No Benefits and a Lower-Paying Job With Insurance",
    instructionalArea: "Earning Income, Managing Credit, Managing Risk",
    performanceIndicators: [
      { code: STANDARD_I.code, description: "Employee compensation may also include access to employee benefits such as retirement plans and health insurance." },
      { code: STANDARD_V.code, description: "There are many choices for borrowing money, and lenders charge higher interest and fees for riskier loans or riskier borrowers." },
      { code: STANDARD_VI.code, description: "When people transfer risk by buying insurance, they pay money now in return for the insurer covering some or all financial losses that may occur in the future." },
    ],
    eventSituation: situation({
      premise:
        "You have two job offers: one pays more per hour but offers no health insurance or retirement plan, and the other pays somewhat less but includes both benefits.",
      ask:
        "Weigh the full value of both offers, not just the hourly wage, and explain which one makes more financial sense for you right now.",
      greetingAsk: "to hear which offer you're leaning toward and why",
    }),
    judgeQuestions: [
      "How would you actually calculate the total value of the benefits offer versus just comparing hourly wages?",
      "What risk are you taking on by choosing the higher-paying job without insurance?",
    ],
  },
  {
    title: "Budgeting Around a New Car Loan Payment",
    instructionalArea: "Spending, Managing Credit, Saving",
    performanceIndicators: [
      { code: STANDARD_II.code, description: "Individual spending decisions may be influenced by financial constraints, personal preferences, unique needs, peers, and advertising." },
      { code: STANDARD_V.code, description: "Common types of credit include credit cards, auto loans, home mortgage loans, and student loans." },
      { code: STANDARD_III.code, description: "Savings decisions depend on individual preferences and circumstances." },
    ],
    eventSituation: situation({
      premise:
        "You just took out an auto loan for a car your friends have been hyping up, and now realize the monthly payment is going to eat into money you'd normally put toward savings.",
      ask:
        "Rework your budget to account for this new loan payment while explaining what led to this decision in the first place.",
      greetingAsk: "to hear how you're adjusting your budget for this loan",
    }),
    judgeQuestions: [
      "What role did your friends' opinions play in this purchase decision, looking back?",
      "How would you adjust your budget to still make some progress on savings despite this new payment?",
    ],
  },
  {
    title: "Deciding Whether to Contribute to a Retirement Plan From Your First Real Job",
    instructionalArea: "Earning Income, Investing, Saving",
    performanceIndicators: [
      { code: STANDARD_I.code, description: "Employee compensation may also include access to employee benefits such as retirement plans and health insurance." },
      { code: STANDARD_IV.code, description: "People can choose to invest some of their money in financial assets to achieve long-term financial goals, such as buying a house, funding future education, or securing retirement income." },
      { code: STANDARD_III.code, description: "People who have sufficient income can choose to save some of it for future uses such as emergencies or later purchases." },
    ],
    eventSituation: situation({
      premise:
        "Your new full-time job offers a retirement plan with a company match, but contributing means less take-home pay right now, when you're also trying to save for an apartment deposit.",
      ask:
        "Explain how you'd balance contributing to this retirement plan against your shorter-term saving goal.",
      greetingAsk: "to hear how you're balancing these two goals",
    }),
    judgeQuestions: [
      "Why might it still make sense to contribute something to this retirement plan even while saving for an apartment?",
      "How would you decide how much to put toward each goal?",
    ],
  },
  {
    title: "Deciding on Renter's Insurance After a Friend's Apartment Fire",
    instructionalArea: "Managing Risk, Spending, Earning Income",
    performanceIndicators: [
      { code: STANDARD_VI.code, description: "Common types of insurance include health insurance, life insurance, and homeowner's or renter's insurance." },
      { code: STANDARD_II.code, description: "People can often improve their financial well-being by making well-informed spending decisions, which includes critical evaluation of price, quality, product information, and method of payment." },
      { code: STANDARD_I.code, description: "Employers generally pay higher wages and salaries to more educated, skilled, and productive workers." },
    ],
    eventSituation: situation({
      premise:
        "A friend's apartment recently had a small kitchen fire, and she lost several hundred dollars of belongings with no renter's insurance to cover any of it. You're now reconsidering whether you should get renter's insurance for your own apartment.",
      ask:
        "Explain how you'd decide whether renter's insurance is worth the monthly cost for your situation.",
      greetingAsk: "to hear what you decided about renter's insurance",
    }),
    judgeQuestions: [
      "What would you actually compare to decide if this insurance is worth the cost?",
      "How would you shop for a policy without just picking the cheapest option blindly?",
    ],
  },
  {
    title: "Budgeting With Irregular Gig-Work Income",
    instructionalArea: "Earning Income, Spending, Managing Risk",
    performanceIndicators: [
      { code: STANDARD_I.code, description: "Most people earn wage and salary income in return for working, and they can also earn income from interest, dividends, rents, entrepreneurship, business profits, or increases in the value of investments." },
      { code: STANDARD_II.code, description: "A budget is a plan for allocating a person's spendable income to necessary and desired goods and services." },
      { code: STANDARD_VI.code, description: "People are exposed to personal risks that can result in lost income, assets, health, life, or identity." },
    ],
    eventSituation: situation({
      premise:
        "You've been doing gig-delivery work, and your income varies a lot week to week, sometimes double one week and half the next, making it hard to build a normal budget.",
      ask:
        "Explain how you'd budget with this kind of irregular income and protect yourself against a slow-income stretch.",
      greetingAsk: "to hear how you're handling this irregular income",
    }),
    judgeQuestions: [
      "How would you build a budget around income that changes this much week to week?",
      "What would you do to protect yourself financially during a slower income stretch?",
    ],
  },
  {
    title: "Paying Off Student Loans While Starting to Invest",
    instructionalArea: "Investing, Managing Risk, Managing Credit",
    performanceIndicators: [
      { code: STANDARD_IV.code, description: "Riskier investments tend to earn higher long-run rates of return than lower-risk investments." },
      { code: STANDARD_VI.code, description: "They can choose to manage those risks by accepting, reducing, or transferring them to others." },
      { code: STANDARD_V.code, description: "The cost of post-secondary education can be financed through a combination of grants, scholarships, work-study, savings, and federal or private student loans." },
    ],
    eventSituation: situation({
      premise:
        "You have student loan debt from college and just started your first job. A coworker suggested you should start investing right away instead of aggressively paying down the loans, since the market historically returns more than the loan's interest rate.",
      ask:
        "Explain how you'd weigh paying down this debt against starting to invest.",
      greetingAsk: "to hear how you're weighing this decision",
    }),
    judgeQuestions: [
      "What would change your answer here, like a very high or very low loan interest rate?",
      "Is there a way to do a bit of both rather than picking one extreme?",
    ],
  },
  {
    title: "Resisting a Big Purchase to Stay on Track for a Long-Term Goal",
    instructionalArea: "Spending, Investing, Earning Income",
    performanceIndicators: [
      { code: STANDARD_II.code, description: "Individual spending decisions may be influenced by financial constraints, personal preferences, unique needs, peers, and advertising." },
      { code: STANDARD_IV.code, description: "People can more easily achieve their financial goals by investing steadily over many years, reinvesting dividends, and capital gains to compound their returns." },
      { code: STANDARD_I.code, description: "The decision to invest in additional education or training can be made by weighing the benefit of increased income-earning and career potential against the opportunity costs in the form of time, effort, and money." },
    ],
    eventSituation: situation({
      premise:
        "You've been steadily investing part of every paycheck toward a long-term goal, but a limited-time sale on something you've wanted for a while is tempting you to pull money out of that investment account.",
      ask:
        "Explain how you'd think through this temptation without derailing your long-term investing progress.",
      greetingAsk: "to hear how you're thinking about this purchase",
    }),
    judgeQuestions: [
      "What's the real cost of pulling money out of this investment right now, beyond just the purchase price?",
      "How would you satisfy the urge to buy something without touching your long-term investments?",
    ],
  },
  {
    title: "Building Credit History as a New Earner",
    instructionalArea: "Managing Credit, Earning Income, Saving",
    performanceIndicators: [
      { code: STANDARD_V.code, description: "Credit reports compile information on a person's credit history, and lenders use credit scores to assess a potential borrower's creditworthiness." },
      { code: STANDARD_I.code, description: "Spendable income is lower than gross income due to taxes assessed on income by federal, state, and local governments." },
      { code: STANDARD_III.code, description: "Interest rates, fees, and other account features vary by type of account and among financial institutions, with higher rates resulting in greater compound interest earned by savers." },
    ],
    eventSituation: situation({
      premise:
        "You have no credit history at all yet, and you've realized this could make it harder to rent an apartment or get a car loan later, even though you've been earning and saving steadily from your job.",
      ask:
        "Explain how you'd start building credit history responsibly given your income.",
      greetingAsk: "to hear your plan for building credit",
    }),
    judgeQuestions: [
      "What's one low-risk way to start building credit history from where you are now?",
      "How would having steady savings help you if you do decide to open a line of credit?",
    ],
  },
  {
    title: "Recovering From Identity Theft While Managing Your Budget",
    instructionalArea: "Managing Risk, Investing, Spending",
    performanceIndicators: [
      { code: STANDARD_VI.code, description: "Identity theft is a growing concern for consumers and businesses. Stolen personal information can result in financial losses and fraudulent credit charges." },
      { code: STANDARD_IV.code, description: "Investors have many choices of investments that differ in expected rates of return and risk." },
      { code: STANDARD_II.code, description: "A budget is a plan for allocating a person's spendable income to necessary and desired goods and services." },
    ],
    eventSituation: situation({
      premise:
        "You just discovered fraudulent charges on your account from identity theft, and while your bank is investigating, some of your money is temporarily tied up, disrupting your usual budget.",
      ask:
        "Explain how you'd respond to this identity theft and adjust your budget while it's being resolved.",
      greetingAsk: "to hear how you're handling this identity theft situation",
    }),
    judgeQuestions: [
      "What steps would you take right away after discovering this fraud?",
      "How would you adjust your budget while your money is temporarily tied up?",
    ],
  },
  {
    title: "Financing a Car vs. Saving to Buy It Outright",
    instructionalArea: "Saving, Managing Credit, Spending",
    performanceIndicators: [
      { code: STANDARD_III.code, description: "Savings decisions depend on individual preferences and circumstances." },
      { code: STANDARD_V.code, description: "There are many choices for borrowing money, and lenders charge higher interest and fees for riskier loans or riskier borrowers." },
      { code: STANDARD_II.code, description: "People can often improve their financial well-being by making well-informed spending decisions, which includes critical evaluation of price, quality, product information, and method of payment." },
    ],
    eventSituation: situation({
      premise:
        "You need a car for a new job, and you're deciding between taking out an auto loan now or waiting six more months to save enough to buy a cheaper used car outright.",
      ask:
        "Weigh both options and explain which makes more sense given needing reliable transportation for this job.",
      greetingAsk: "to hear which option you're leaning toward",
    }),
    judgeQuestions: [
      "What would push you toward financing now rather than waiting to save?",
      "What would you want to know about loan terms before financing this car?",
    ],
  },
  {
    title: "Choosing Between Two Job Offers With Very Different Risk Profiles",
    instructionalArea: "Earning Income, Managing Risk, Investing",
    performanceIndicators: [
      { code: STANDARD_I.code, description: "Employers generally pay higher wages and salaries to more educated, skilled, and productive workers." },
      { code: STANDARD_VI.code, description: "People are exposed to personal risks that can result in lost income, assets, health, life, or identity." },
      { code: STANDARD_IV.code, description: "Investors select investments that are consistent with their risk tolerance, and they diversify across a number of different investment choices to reduce investment risk." },
    ],
    eventSituation: situation({
      premise:
        "You have one job offer at a stable, established company with modest pay, and another at a new startup offering higher pay and stock options but with real uncertainty about whether the company will even be around in two years.",
      ask:
        "Weigh both offers, including the risk involved, and explain which one fits you better right now.",
      greetingAsk: "to hear which offer you're leaning toward and why",
    }),
    judgeQuestions: [
      "How does your own risk tolerance factor into this decision?",
      "What would make the startup's stock options actually worth the added risk?",
    ],
  },
  {
    title: "Falling Into the Minimum-Payment Trap on a Credit Card",
    instructionalArea: "Spending, Saving, Managing Credit",
    performanceIndicators: [
      { code: STANDARD_II.code, description: "Individual spending decisions may be influenced by financial constraints, personal preferences, unique needs, peers, and advertising." },
      { code: STANDARD_III.code, description: "People who have sufficient income can choose to save some of it for future uses such as emergencies or later purchases." },
      { code: STANDARD_V.code, description: "Credit allows people to purchase and enjoy goods and services today, while agreeing to pay for them in the future, usually with interest." },
    ],
    eventSituation: situation({
      premise:
        "You've been paying only the minimum on your credit card each month, and you just realized how much interest has piled up, with the balance barely shrinking despite regular payments.",
      ask:
        "Explain what led to this situation and how you'd get out of it while still covering your regular spending.",
      greetingAsk: "to hear how you'd tackle this credit card balance",
    }),
    judgeQuestions: [
      "Why does paying only the minimum keep this balance from shrinking much?",
      "How would you fit paying down this balance into your regular budget?",
    ],
  },
  {
    title: "Deciding How to Invest a College Fund",
    instructionalArea: "Investing, Earning Income, Managing Risk",
    performanceIndicators: [
      { code: STANDARD_IV.code, description: "People can choose to invest some of their money in financial assets to achieve long-term financial goals, such as buying a house, funding future education, or securing retirement income." },
      { code: STANDARD_I.code, description: "The decision to invest in additional education or training can be made by weighing the benefit of increased income-earning and career potential against the opportunity costs in the form of time, effort, and money." },
      { code: STANDARD_VI.code, description: "They can choose to manage those risks by accepting, reducing, or transferring them to others." },
    ],
    eventSituation: situation({
      premise:
        "A relative set up a fund for your future education years ago, and you're now old enough to weigh in on how it should be invested, balancing potential growth against the risk of losing value right before you need the money.",
      ask:
        "Explain how you'd want this fund invested given how soon you might need to use it.",
      greetingAsk: "to hear your thinking on how this fund should be invested",
    }),
    judgeQuestions: [
      "How does the timeline until you need this money change what risk level makes sense?",
      "How would you weigh the potential growth against the risk of loss here?",
    ],
  },
  {
    title: "Identity Theft Damages Your Credit Right Before Saving for an Apartment",
    instructionalArea: "Managing Credit, Managing Risk, Saving",
    performanceIndicators: [
      { code: STANDARD_V.code, description: "A low credit score can result in a lender denying credit to someone they perceive as having a low level of creditworthiness." },
      { code: STANDARD_VI.code, description: "The risk of identity theft can be minimized by carefully guarding personal financial information." },
      { code: STANDARD_III.code, description: "Funds needed for transactions, bill-paying, or purchases, are commonly held in federally insured checking or savings accounts at financial institutions because these accounts offer easy access to their money and low risk." },
    ],
    eventSituation: situation({
      premise:
        "You discovered someone opened a fraudulent credit account in your name, and your credit score dropped right as you're trying to save up and qualify for your first apartment lease.",
      ask:
        "Explain how you'd address this credit damage and keep your apartment plans on track.",
      greetingAsk: "to hear how you're handling this",
    }),
    judgeQuestions: [
      "What steps would you take to dispute this fraudulent account and repair your credit?",
      "What would you tell a landlord if your credit score is still recovering when you apply?",
    ],
  },
  {
    title: "Managing Your Very First Paycheck",
    instructionalArea: "Earning Income, Saving, Spending",
    performanceIndicators: [
      { code: STANDARD_I.code, description: "Most people earn wage and salary income in return for working, and they can also earn income from interest, dividends, rents, entrepreneurship, business profits, or increases in the value of investments." },
      { code: STANDARD_III.code, description: "Savings decisions depend on individual preferences and circumstances." },
      { code: STANDARD_II.code, description: "Individual spending decisions may be influenced by financial constraints, personal preferences, unique needs, peers, and advertising." },
    ],
    eventSituation: situation({
      premise:
        "You're about to receive your very first paycheck ever and haven't decided on any real plan for it beyond a vague sense you should \"probably save some.\"",
      ask:
        "Walk through a concrete plan for this first paycheck, covering spending and saving.",
      greetingAsk: "to hear your plan for this first paycheck",
    }),
    judgeQuestions: [
      "What's the first thing you'd actually do with this paycheck once it arrives?",
      "How would peer influence or advertising affect how you spend part of it, if at all?",
    ],
  },
  {
    title: "Deciding What to Do With an Unexpected Inheritance",
    instructionalArea: "Managing Risk, Managing Credit, Investing",
    performanceIndicators: [
      { code: STANDARD_VI.code, description: "The cost of insurance is related to the size of the potential loss, the likelihood that the loss event will happen, and the risk characteristics of the asset or person being insured." },
      { code: STANDARD_V.code, description: "Common types of credit include credit cards, auto loans, home mortgage loans, and student loans." },
      { code: STANDARD_IV.code, description: "Investors diversify across a number of different investment choices to reduce investment risk." },
    ],
    eventSituation: situation({
      premise:
        "A relative left you a modest inheritance, and you're weighing several options: paying off some existing debt, buying more insurance coverage, or investing it for the long term.",
      ask:
        "Explain how you'd prioritize these options with this inheritance.",
      greetingAsk: "to hear how you'd use this inheritance",
    }),
    judgeQuestions: [
      "What would you prioritize first with this money, and why?",
      "How would you split this among debt, insurance, and investing rather than picking just one?",
    ],
  },
];

PFL_CASES.push({
  title: "Weighing a Big Trip With Friends Against Building an Emergency Fund",
  instructionalArea: "Spending, Saving, Managing Risk",
  performanceIndicators: [
    { code: STANDARD_II.code, description: "Individual spending decisions may be influenced by financial constraints, personal preferences, unique needs, peers, and advertising." },
    { code: STANDARD_III.code, description: "People who have sufficient income can choose to save some of it for future uses such as emergencies or later purchases." },
    { code: STANDARD_VI.code, description: "People are exposed to personal risks that can result in lost income, assets, health, life, or identity." },
  ],
  eventSituation: situation({
    premise:
      "Your friends are planning a big trip and pressuring you to come, but spending that money would wipe out the small emergency fund you've been building for the past year.",
    ask:
      "Explain how you'd decide between joining this trip and protecting your emergency fund.",
    greetingAsk: "to hear how you're thinking about this trip",
  }),
  judgeQuestions: [
    "What role is peer pressure playing in this decision, and how are you weighing it?",
    "What's the real risk of wiping out your emergency fund for this trip?",
  ],
});

const PFL_EVENT: EventCaseStudySeed = {
  eventSlug: "personal-financial-literacy",
  eventName: "Personal Financial Literacy",
  careerCluster: "Personal Financial Literacy",
  careerPathway: null,
  format: "PERSONAL_FINANCIAL_LITERACY",
  prepMinutes: 10,
  presentMinutes: 10,
  cases: PFL_CASES,
};

export const PFL_CASE_STUDY_SEED: EventCaseStudySeed[] = [PFL_EVENT];
