/**
 * MBA Research / DECA performance-indicator code prefixes, mapped to their
 * full instructional area name. Verified via web research in Phase 2 (see
 * DECISIONS.md) against MBA Research's Business Administration Core and
 * Marketing Career Cluster performance-indicator documents.
 *
 * Note IM vs NF: both can appear in the same exam bank and are genuinely
 * distinct areas, not a duplicate — IM ("Marketing-Information Management")
 * is the Marketing-cluster-specific version; NF ("Information Management")
 * is the generic/business-core version shared across other cluster exams.
 */
export const INSTRUCTIONAL_AREA_CODE_NAMES: Record<string, string> = {
  BL: "Business Law",
  CM: "Channel Management",
  CO: "Communications",
  CR: "Customer Relations",
  DS: "Distribution",
  EC: "Economics",
  EI: "Emotional Intelligence",
  EN: "Entrepreneurship",
  FI: "Financial Analysis",
  HR: "Human Resources Management",
  IM: "Marketing-Information Management",
  KM: "Knowledge Management",
  MK: "Marketing",
  MP: "Market Planning",
  NF: "Information Management",
  OP: "Operations",
  PD: "Professional Development",
  PI: "Pricing",
  PJ: "Project Management",
  PM: "Product/Service Management",
  PR: "Promotion",
  QM: "Quality Management",
  RM: "Risk Management",
  SE: "Selling",
  SM: "Strategic Management",
};

export function instructionalAreaNameForCode(code: string): string | null {
  return INSTRUCTIONAL_AREA_CODE_NAMES[code] ?? null;
}
