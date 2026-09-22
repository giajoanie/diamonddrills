/**
 * One-time/rerunnable importer for the PI reference content staged in
 * seed/performance-indicators/<exam-bank-slug>/. Populates PerformanceIndicator
 * rows used by the roleplay prep screen — separate from Question rows (exam
 * content) and from a mentor-built Rubric (what a roleplay is actually
 * scored against).
 *
 * Marketing/Hospitality PI PDFs embed a full copy of the Tier 1 Business
 * Administration Core content on their early pages — that's redundant with
 * the standalone BA Core import, so only their Tier 2 (cluster) + Tier 3
 * (pathway) pages are parsed; Tier 1 comes exclusively from the BA Core file.
 *
 * The Personal Financial Literacy source (national K-12 standards, not an
 * MBA Research PI document) uses a grade-by-grade table layout that doesn't
 * extract as clean per-line text — rather than risk mis-parsed/garbled rows,
 * its six topic-summary paragraphs (verified by hand against the PDF) are
 * hardcoded below instead of parsed.
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/import-performance-indicators.ts
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { PDFParse } from "pdf-parse";
import { parsePiPages, type PiPageRange } from "@/lib/exam-import/parse-pi-text";

const ROOT = path.join(process.cwd(), "seed/performance-indicators");

async function getPages(filePath: string): Promise<string[]> {
  const buffer = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    return result.pages.map((p) => p.text);
  } finally {
    await parser.destroy();
  }
}

const SOURCES: {
  examBankSlug: string;
  file: string;
  ranges: PiPageRange[];
}[] = [
  // The standalone BA Core PDF (seed/performance-indicators/business-administration-core/)
  // has a font-encoding glitch — several ligatures ("ti", "tt") extract as
  // stray punctuation ("Instruc(onal", "correc5ve", "leUers") with no
  // reliable way to undo it losslessly. The Marketing PI doc embeds a full,
  // cleanly-extracting copy of the same Tier 1 content on its early pages
  // (verified byte-for-byte identical to the standalone doc's Business Law
  // section), so Core-tier rows are sourced from there instead — still
  // stored under the business-administration-core exam bank.
  {
    examBankSlug: "business-administration-core",
    file: "marketing/2026-27_marketing_performance_indicators.pdf",
    ranges: [{ startPage: 4, endPage: 20, tier: "Core", pathway: null }],
  },
  {
    examBankSlug: "marketing",
    file: "marketing/2026-27_marketing_performance_indicators.pdf",
    ranges: [
      { startPage: 21, endPage: 25, tier: "Cluster", pathway: null },
      { startPage: 26, endPage: 34, tier: "Pathway", pathway: "Marketing Communications" },
      { startPage: 35, endPage: 38, tier: "Pathway", pathway: "Marketing Management" },
      { startPage: 39, endPage: 42, tier: "Pathway", pathway: "Marketing Research" },
      { startPage: 43, endPage: 48, tier: "Pathway", pathway: "Merchandising" },
      { startPage: 49, endPage: 51, tier: "Pathway", pathway: "Professional Selling" },
    ],
  },
  {
    examBankSlug: "hospitality-tourism",
    file: "hospitality-tourism/2026-27_hospitality-tourism_performance_indicators.pdf",
    ranges: [
      { startPage: 21, endPage: 29, tier: "Cluster", pathway: null },
      { startPage: 30, endPage: 37, tier: "Pathway", pathway: "Event Management" },
      { startPage: 38, endPage: 43, tier: "Pathway", pathway: "Lodging" },
      { startPage: 44, endPage: 49, tier: "Pathway", pathway: "Restaurant Management" },
      { startPage: 50, endPage: 58, tier: "Pathway", pathway: "Travel and Tourism" },
    ],
  },
];

// Hand-verified against seed/performance-indicators/personal-financial-literacy/
// national_standards_personal_financial_education.pdf, "Topic Summary of the
// Standards" (pages 7-8) — see the importer docstring for why these are
// hardcoded rather than parsed.
const PFL_TOPIC_SUMMARIES: { instructionalArea: string; description: string }[] = [
  {
    instructionalArea: "I. Earning Income",
    description:
      "Most people earn wage and salary income in return for working, and they can also earn income from interest, dividends, rents, entrepreneurship, business profits, or increases in the value of investments. Employee compensation may also include access to employee benefits such as retirement plans and health insurance. Employers generally pay higher wages and salaries to more educated, skilled, and productive workers. The decision to invest in additional education or training can be made by weighing the benefit of increased income-earning and career potential against the opportunity costs in the form of time, effort, and money. Spendable income is lower than gross income due to taxes assessed on income by federal, state, and local governments.",
  },
  {
    instructionalArea: "II. Spending",
    description:
      "A budget is a plan for allocating a person's spendable income to necessary and desired goods and services. When there is sufficient money in their budget, people may decide to give money to others, save, or invest to achieve future goals. People can often improve their financial well-being by making well-informed spending decisions, which includes critical evaluation of price, quality, product information, and method of payment. Individual spending decisions may be influenced by financial constraints, personal preferences, unique needs, peers, and advertising.",
  },
  {
    instructionalArea: "III. Saving",
    description:
      "People who have sufficient income can choose to save some of it for future uses such as emergencies or later purchases. Savings decisions depend on individual preferences and circumstances. Funds needed for transactions, bill-paying, or purchases, are commonly held in federally insured checking or savings accounts at financial institutions because these accounts offer easy access to their money and low risk. Interest rates, fees, and other account features vary by type of account and among financial institutions, with higher rates resulting in greater compound interest earned by savers.",
  },
  {
    instructionalArea: "IV. Investing",
    description:
      "People can choose to invest some of their money in financial assets to achieve long-term financial goals, such as buying a house, funding future education, or securing retirement income. Investors receive a return on their investment in the form of income and/or growth in value of their investment over time. People can more easily achieve their financial goals by investing steadily over many years, reinvesting dividends, and capital gains to compound their returns. Investors have many choices of investments that differ in expected rates of return and risk. Riskier investments tend to earn higher long-run rates of return than lower-risk investments. Investors select investments that are consistent with their risk tolerance, and they diversify across a number of different investment choices to reduce investment risk.",
  },
  {
    instructionalArea: "V. Managing Credit",
    description:
      "Credit allows people to purchase and enjoy goods and services today, while agreeing to pay for them in the future, usually with interest. There are many choices for borrowing money, and lenders charge higher interest and fees for riskier loans or riskier borrowers. Lenders evaluate creditworthiness of a borrower based on the type of credit, past credit history, and expected ability to repay the loan in the future. Credit reports compile information on a person's credit history, and lenders use credit scores to assess a potential borrower's creditworthiness. A low credit score can result in a lender denying credit to someone they perceive as having a low level of creditworthiness. Common types of credit include credit cards, auto loans, home mortgage loans, and student loans. The cost of post-secondary education can be financed through a combination of grants, scholarships, work-study, savings, and federal or private student loans.",
  },
  {
    instructionalArea: "VI. Managing Risk",
    description:
      "People are exposed to personal risks that can result in lost income, assets, health, life, or identity. They can choose to manage those risks by accepting, reducing, or transferring them to others. When people transfer risk by buying insurance, they pay money now in return for the insurer covering some or all financial losses that may occur in the future. Common types of insurance include health insurance, life insurance, and homeowner's or renter's insurance. The cost of insurance is related to the size of the potential loss, the likelihood that the loss event will happen, and the risk characteristics of the asset or person being insured. Identity theft is a growing concern for consumers and businesses. Stolen personal information can result in financial losses and fraudulent credit charges. The risk of identity theft can be minimized by carefully guarding personal financial information.",
  },
];

// Two round trips total per exam bank (fetch existing keys, then one batch
// insert) instead of a findFirst+create pair per row — the latter was ~3,000
// sequential network round trips against a remote DB, painfully slow.
type InsertableRow = {
  examBankId: string;
  tier: string;
  pathway: string | null;
  instructionalArea: string;
  code: string | null;
  level: string | null;
  description: string;
};

function keyOf(row: { tier: string; pathway: string | null; code: string | null; description: string }) {
  return `${row.tier}|${row.pathway ?? ""}|${row.code ?? ""}|${row.description}`;
}

// Chunked rather than one createMany per source — a single ~500-row insert
// was enough to trip a "Connection terminated unexpectedly" against Neon's
// pooled (PgBouncer transaction-mode) endpoint, which has tighter per-query
// limits than a direct connection.
const INSERT_CHUNK_SIZE = 100;

async function insertNewRows(examBankId: string, rows: InsertableRow[]): Promise<number> {
  if (rows.length === 0) return 0;
  const existing = await prisma.performanceIndicator.findMany({
    where: { examBankId },
    select: { tier: true, pathway: true, code: true, description: true },
  });
  const existingKeys = new Set(existing.map(keyOf));
  const toCreate = rows.filter((r) => !existingKeys.has(keyOf(r)));
  if (toCreate.length === 0) return 0;

  let created = 0;
  for (let i = 0; i < toCreate.length; i += INSERT_CHUNK_SIZE) {
    const chunk = toCreate.slice(i, i + INSERT_CHUNK_SIZE);
    const result = await prisma.performanceIndicator.createMany({ data: chunk });
    created += result.count;
  }
  return created;
}

async function importSource(source: (typeof SOURCES)[number]): Promise<number> {
  const examBank = await prisma.examBank.findUniqueOrThrow({ where: { slug: source.examBankSlug } });
  const filePath = path.join(ROOT, source.file);
  const pages = await getPages(filePath);
  const parsed = parsePiPages(pages, source.ranges);
  console.log(`  parsed ${parsed.length} rows from ${source.file}, checking against existing...`);
  return insertNewRows(
    examBank.id,
    parsed.map((p) => ({ ...p, examBankId: examBank.id })),
  );
}

async function importPfl(): Promise<number> {
  const examBank = await prisma.examBank.findUniqueOrThrow({
    where: { slug: "personal-financial-literacy" },
  });
  const rows = PFL_TOPIC_SUMMARIES.map((t) => ({
    examBankId: examBank.id,
    tier: "Standards",
    pathway: null,
    instructionalArea: t.instructionalArea,
    code: null,
    level: null,
    description: t.description,
  }));
  return insertNewRows(examBank.id, rows);
}

async function main() {
  for (const source of SOURCES) {
    console.log(`Importing ${source.examBankSlug} from ${source.file}...`);
    const created = await importSource(source);
    console.log(`${source.examBankSlug}: ${created} performance indicators created`);
  }
  console.log("Importing personal-financial-literacy topic summaries...");
  const pflCreated = await importPfl();
  console.log(`personal-financial-literacy: ${pflCreated} topic summaries created`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
