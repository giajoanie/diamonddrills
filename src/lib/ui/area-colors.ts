/**
 * Categorical dot colors for identifying an instructional area at a glance
 * across the study plan's "in rotation" list and its session rows.
 * Decorative/secondary only — every dot always sits beside a visible text
 * label, so identity never depends on color alone. Fixed order (never
 * cycled/hashed) per the app's small, validated categorical palette.
 */
export const AREA_DOT_COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4"];

export function areaColorForIndex(index: number): string {
  return AREA_DOT_COLORS[index % AREA_DOT_COLORS.length];
}
