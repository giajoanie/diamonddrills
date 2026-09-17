/**
 * Cluster/exam-bank/event seed data, derived from EVENT_VERIFICATION.md.
 * Kept separate from prisma/seed.ts so it can be imported by tests too.
 */
import type { EventCategory, EventFormat } from "@/generated/prisma/client";

export const CLUSTER_SEED = [
  { slug: "marketing", name: "Marketing" },
  { slug: "finance", name: "Finance" },
  {
    slug: "business-management-administration",
    name: "Business Management and Administration",
  },
  { slug: "entrepreneurship", name: "Entrepreneurship" },
  { slug: "hospitality-tourism", name: "Hospitality and Tourism" },
  {
    slug: "personal-financial-literacy",
    name: "Personal Financial Literacy",
  },
] as const;

// Exam banks are distinct from clusters: Business Administration Core has no
// matching student-facing cluster (see EVENT_VERIFICATION.md).
export const EXAM_BANK_SEED = [
  { slug: "marketing", name: "Marketing", clusterSlug: "marketing" },
  { slug: "finance", name: "Finance", clusterSlug: "finance" },
  {
    slug: "business-management-administration",
    name: "Business Management and Administration",
    clusterSlug: "business-management-administration",
  },
  {
    slug: "entrepreneurship",
    name: "Entrepreneurship",
    clusterSlug: "entrepreneurship",
  },
  {
    slug: "hospitality-tourism",
    name: "Hospitality and Tourism",
    clusterSlug: "hospitality-tourism",
  },
  {
    slug: "personal-financial-literacy",
    name: "Personal Financial Literacy",
    clusterSlug: "personal-financial-literacy",
  },
  {
    slug: "business-administration-core",
    name: "Business Administration Core",
    clusterSlug: null,
  },
] as const;

type EventSeed = {
  slug: string;
  name: string;
  clusterSlug: string;
  category: EventCategory;
  format: EventFormat;
  hasExam: boolean;
  examBankSlug: string | null;
  teamSizeMin: number;
  teamSizeMax: number;
};

const BAC = "business-administration-core";

export const EVENT_SEED: EventSeed[] = [
  // --- Marketing ---
  { slug: "apparel-and-accessories-marketing-series", name: "Apparel and Accessories Marketing Series", clusterSlug: "marketing", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "marketing", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "automotive-services-marketing-series", name: "Automotive Services Marketing Series", clusterSlug: "marketing", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "marketing", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "business-services-marketing-series", name: "Business Services Marketing Series", clusterSlug: "marketing", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "marketing", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "food-marketing-series", name: "Food Marketing Series", clusterSlug: "marketing", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "marketing", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "marketing-communications-series", name: "Marketing Communications Series", clusterSlug: "marketing", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "marketing", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "retail-merchandising-series", name: "Retail Merchandising Series", clusterSlug: "marketing", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "marketing", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "sports-and-entertainment-marketing-series", name: "Sports and Entertainment Marketing Series", clusterSlug: "marketing", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "marketing", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "principles-of-marketing", name: "Principles of Marketing", clusterSlug: "marketing", category: "ROLEPLAY", format: "PRINCIPLES", hasExam: true, examBankSlug: BAC, teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "buying-and-merchandising-team-decision-making", name: "Buying and Merchandising Team Decision Making", clusterSlug: "marketing", category: "ROLEPLAY", format: "TEAM_DECISION_MAKING", hasExam: true, examBankSlug: "marketing", teamSizeMin: 2, teamSizeMax: 2 },
  { slug: "marketing-management-team-decision-making", name: "Marketing Management Team Decision Making", clusterSlug: "marketing", category: "ROLEPLAY", format: "TEAM_DECISION_MAKING", hasExam: true, examBankSlug: "marketing", teamSizeMin: 2, teamSizeMax: 2 },
  { slug: "sports-and-entertainment-marketing-team-decision-making", name: "Sports and Entertainment Marketing Team Decision Making", clusterSlug: "marketing", category: "ROLEPLAY", format: "TEAM_DECISION_MAKING", hasExam: true, examBankSlug: "marketing", teamSizeMin: 2, teamSizeMax: 2 },
  { slug: "professional-selling", name: "Professional Selling", clusterSlug: "marketing", category: "WRITTEN", format: "PROFESSIONAL_SELLING_CONSULTING", hasExam: true, examBankSlug: "marketing", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "integrated-marketing-campaign-product", name: "Integrated Marketing Campaign–Product", clusterSlug: "marketing", category: "WRITTEN", format: "IMC", hasExam: true, examBankSlug: "marketing", teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "integrated-marketing-campaign-event", name: "Integrated Marketing Campaign–Event", clusterSlug: "marketing", category: "WRITTEN", format: "IMC", hasExam: true, examBankSlug: "marketing", teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "integrated-marketing-campaign-service", name: "Integrated Marketing Campaign–Service", clusterSlug: "marketing", category: "WRITTEN", format: "IMC", hasExam: true, examBankSlug: "marketing", teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "buying-and-merchandising-operations-research", name: "Buying and Merchandising Operations Research", clusterSlug: "marketing", category: "WRITTEN", format: "OPERATIONS_RESEARCH", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "sports-and-entertainment-marketing-operations-research", name: "Sports and Entertainment Marketing Operations Research", clusterSlug: "marketing", category: "WRITTEN", format: "OPERATIONS_RESEARCH", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },

  // --- Finance ---
  { slug: "accounting-applications-series", name: "Accounting Applications Series", clusterSlug: "finance", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "finance", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "business-finance-series", name: "Business Finance Series", clusterSlug: "finance", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "finance", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "principles-of-finance", name: "Principles of Finance", clusterSlug: "finance", category: "ROLEPLAY", format: "PRINCIPLES", hasExam: true, examBankSlug: BAC, teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "financial-services-team-decision-making", name: "Financial Services Team Decision Making", clusterSlug: "finance", category: "ROLEPLAY", format: "TEAM_DECISION_MAKING", hasExam: true, examBankSlug: "finance", teamSizeMin: 2, teamSizeMax: 2 },
  { slug: "financial-consulting", name: "Financial Consulting", clusterSlug: "finance", category: "ROLEPLAY", format: "PROFESSIONAL_SELLING_CONSULTING", hasExam: true, examBankSlug: "finance", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "finance-operations-research", name: "Finance Operations Research", clusterSlug: "finance", category: "WRITTEN", format: "OPERATIONS_RESEARCH", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },

  // --- Business Management and Administration ---
  { slug: "human-resources-management-series", name: "Human Resources Management Series", clusterSlug: "business-management-administration", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "business-management-administration", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "principles-of-business-management-and-administration", name: "Principles of Business Management and Administration", clusterSlug: "business-management-administration", category: "ROLEPLAY", format: "PRINCIPLES", hasExam: true, examBankSlug: BAC, teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "business-law-and-ethics-team-decision-making", name: "Business Law and Ethics Team Decision Making", clusterSlug: "business-management-administration", category: "ROLEPLAY", format: "TEAM_DECISION_MAKING", hasExam: true, examBankSlug: "business-management-administration", teamSizeMin: 2, teamSizeMax: 2 },
  { slug: "business-services-operations-research", name: "Business Services Operations Research", clusterSlug: "business-management-administration", category: "WRITTEN", format: "OPERATIONS_RESEARCH", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "business-solutions-project", name: "Business Solutions Project", clusterSlug: "business-management-administration", category: "WRITTEN", format: "PROJECT_MANAGEMENT", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "career-development-project", name: "Career Development Project", clusterSlug: "business-management-administration", category: "WRITTEN", format: "PROJECT_MANAGEMENT", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "community-awareness-project", name: "Community Awareness Project", clusterSlug: "business-management-administration", category: "WRITTEN", format: "PROJECT_MANAGEMENT", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "community-giving-project", name: "Community Giving Project", clusterSlug: "business-management-administration", category: "WRITTEN", format: "PROJECT_MANAGEMENT", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "sales-project", name: "Sales Project", clusterSlug: "business-management-administration", category: "WRITTEN", format: "PROJECT_MANAGEMENT", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "financial-literacy-project", name: "Financial Literacy Project", clusterSlug: "business-management-administration", category: "WRITTEN", format: "PROJECT_MANAGEMENT", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },

  // --- Entrepreneurship ---
  { slug: "entrepreneurship-series", name: "Entrepreneurship Series", clusterSlug: "entrepreneurship", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "entrepreneurship", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "principles-of-entrepreneurship", name: "Principles of Entrepreneurship", clusterSlug: "entrepreneurship", category: "ROLEPLAY", format: "PRINCIPLES", hasExam: true, examBankSlug: BAC, teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "entrepreneurship-team-decision-making", name: "Entrepreneurship Team Decision Making", clusterSlug: "entrepreneurship", category: "ROLEPLAY", format: "TEAM_DECISION_MAKING", hasExam: true, examBankSlug: "entrepreneurship", teamSizeMin: 2, teamSizeMax: 2 },
  { slug: "business-growth-plan", name: "Business Growth Plan", clusterSlug: "entrepreneurship", category: "WRITTEN", format: "ENTREPRENEURSHIP_PLAN", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "franchise-business-plan", name: "Franchise Business Plan", clusterSlug: "entrepreneurship", category: "WRITTEN", format: "ENTREPRENEURSHIP_PLAN", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "independent-business-plan", name: "Independent Business Plan", clusterSlug: "entrepreneurship", category: "WRITTEN", format: "ENTREPRENEURSHIP_PLAN", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "innovation-plan", name: "Innovation Plan", clusterSlug: "entrepreneurship", category: "WRITTEN", format: "ENTREPRENEURSHIP_PLAN", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "international-business-plan", name: "International Business Plan", clusterSlug: "entrepreneurship", category: "WRITTEN", format: "ENTREPRENEURSHIP_PLAN", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },
  { slug: "start-up-business-plan", name: "Start-Up Business Plan", clusterSlug: "entrepreneurship", category: "WRITTEN", format: "ENTREPRENEURSHIP_PLAN", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },

  // --- Hospitality and Tourism ---
  { slug: "hotel-and-lodging-management-series", name: "Hotel and Lodging Management Series", clusterSlug: "hospitality-tourism", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "hospitality-tourism", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "quick-serve-restaurant-management-series", name: "Quick Serve Restaurant Management Series", clusterSlug: "hospitality-tourism", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "hospitality-tourism", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "restaurant-and-food-service-management-series", name: "Restaurant and Food Service Management Series", clusterSlug: "hospitality-tourism", category: "ROLEPLAY", format: "SERIES", hasExam: true, examBankSlug: "hospitality-tourism", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "principles-of-hospitality-and-tourism", name: "Principles of Hospitality and Tourism", clusterSlug: "hospitality-tourism", category: "ROLEPLAY", format: "PRINCIPLES", hasExam: true, examBankSlug: BAC, teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "hospitality-services-team-decision-making", name: "Hospitality Services Team Decision Making", clusterSlug: "hospitality-tourism", category: "ROLEPLAY", format: "TEAM_DECISION_MAKING", hasExam: true, examBankSlug: "hospitality-tourism", teamSizeMin: 2, teamSizeMax: 2 },
  { slug: "travel-and-tourism-team-decision-making", name: "Travel and Tourism Team Decision Making", clusterSlug: "hospitality-tourism", category: "ROLEPLAY", format: "TEAM_DECISION_MAKING", hasExam: true, examBankSlug: "hospitality-tourism", teamSizeMin: 2, teamSizeMax: 2 },
  { slug: "hospitality-and-tourism-professional-selling", name: "Hospitality and Tourism Professional Selling", clusterSlug: "hospitality-tourism", category: "ROLEPLAY", format: "PROFESSIONAL_SELLING_CONSULTING", hasExam: true, examBankSlug: "hospitality-tourism", teamSizeMin: 1, teamSizeMax: 1 },
  { slug: "hospitality-and-tourism-operations-research", name: "Hospitality and Tourism Operations Research", clusterSlug: "hospitality-tourism", category: "WRITTEN", format: "OPERATIONS_RESEARCH", hasExam: false, examBankSlug: null, teamSizeMin: 1, teamSizeMax: 3 },

  // --- Personal Financial Literacy ---
  { slug: "personal-financial-literacy", name: "Personal Financial Literacy", clusterSlug: "personal-financial-literacy", category: "ROLEPLAY", format: "PERSONAL_FINANCIAL_LITERACY", hasExam: true, examBankSlug: "personal-financial-literacy", teamSizeMin: 1, teamSizeMax: 1 },
];
