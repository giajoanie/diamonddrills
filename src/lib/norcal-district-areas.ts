/**
 * NorCal district's specific instructional-area assignments for 2026-2027,
 * per DECA_District_Instuctional_Areas_26-27.pdf (seed/norcal/). This is
 * narrower and more specific than the general MBA Research PI tiers already
 * imported (src/lib/exam-import/parse-pi-text.ts) — it names the *exact*
 * 1-2 instructional areas each event's roleplay scenario(s) will draw from
 * at this year's district competition, not the full Tier 1/2/3 breadth.
 *
 * Individual Series events get two independent scenarios, each scoped to a
 * different area; Team Decision Making, Principles, and PFL events get one.
 * Area names match InstructionalArea/PerformanceIndicator.instructionalArea
 * values exactly (see getNorCalPrepForEvent, which does a contains match to
 * handle PFL's roman-numeral-prefixed topic names, e.g. "VI. Managing Risk").
 *
 * Not every roleplay event slug appears here — only the ones NorCal's table
 * covers (Written-category events like IMC and Professional Selling aren't
 * part of this scenario-based table).
 */
export const NORCAL_DISTRICT_AREAS: Record<
  string,
  { scenario1: string; scenario2?: string }
> = {
  // Principles of Business Administration events
  "principles-of-business-management-and-administration": { scenario1: "Professional Development" },
  "principles-of-entrepreneurship": { scenario1: "Financial Analysis" },
  "principles-of-finance": { scenario1: "Professional Development" },
  "principles-of-hospitality-and-tourism": { scenario1: "Communication Skills" },
  "principles-of-marketing": { scenario1: "Customer Relations" },

  // Personal Financial Literacy
  "personal-financial-literacy": { scenario1: "Managing Risk" },

  // Team Decision Making events
  "business-law-and-ethics-team-decision-making": { scenario1: "Operations" },
  "buying-and-merchandising-team-decision-making": { scenario1: "Economics" },
  "entrepreneurship-team-decision-making": { scenario1: "Market Planning" },
  "financial-services-team-decision-making": { scenario1: "Economics" },
  "hospitality-services-team-decision-making": { scenario1: "Economics" },
  "marketing-management-team-decision-making": { scenario1: "Marketing" },
  "sports-and-entertainment-marketing-team-decision-making": { scenario1: "Market Planning" },
  "travel-and-tourism-team-decision-making": { scenario1: "Promotion" },

  // Individual Series events (Scenario 1 / Scenario 2)
  "apparel-and-accessories-marketing-series": { scenario1: "Product/Service Management", scenario2: "Customer Relations" },
  "accounting-applications-series": { scenario1: "Financial Analysis", scenario2: "Professional Development" },
  "automotive-services-marketing-series": { scenario1: "Economics", scenario2: "Customer Relations" },
  "business-finance-series": { scenario1: "Risk Management", scenario2: "Professional Development" },
  "business-services-marketing-series": { scenario1: "Marketing-Information Management", scenario2: "Operations" },
  "entrepreneurship-series": { scenario1: "Promotion", scenario2: "Entrepreneurship" },
  "food-marketing-series": { scenario1: "Economics", scenario2: "Promotion" },
  "hotel-and-lodging-management-series": { scenario1: "Customer Relations", scenario2: "Selling" },
  "human-resources-management-series": { scenario1: "Human Resources Management", scenario2: "Emotional Intelligence" },
  "marketing-communications-series": { scenario1: "Promotion", scenario2: "Promotion" },
  "quick-serve-restaurant-management-series": { scenario1: "Selling", scenario2: "Product/Service Management" },
  "restaurant-and-food-service-management-series": { scenario1: "Communication Skills", scenario2: "Product/Service Management" },
  "retail-merchandising-series": { scenario1: "Market Planning", scenario2: "Marketing" },
  "sports-and-entertainment-marketing-series": { scenario1: "Market Planning", scenario2: "Promotion" },
};

/** The two competition dates this data targets. */
export const NORCAL_MINICOMP_DATE = new Date("2026-11-07");
export const NORCAL_DISTRICT_DATE = new Date("2027-01-15");
export const NORCAL_DISTRICT_DATE_LABEL = "January 15–17, 2027";
