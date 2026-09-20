/**
 * Cohort comparison over competition results by year (spec Tier 2 "cohort
 * analytics — compare by grade, cluster, and year"). Grade/cluster
 * comparison already exists on the mentor dashboard as
 * scoreVsBaselineByGrade/ByCluster; this is the year dimension, which only
 * really applies to competition history since exam attempts don't carry a
 * competition year.
 */
export type CompetitionResultInput = {
  year: number;
  placement: number | null;
  testScore: number | null;
  advanced: boolean;
};

export type YearCohort = {
  year: number;
  resultCount: number;
  avgPlacement: number | null;
  avgTestScore: number | null;
  advancedRate: number;
};

export function computeCohortsByYear(results: CompetitionResultInput[]): YearCohort[] {
  const byYear = new Map<number, CompetitionResultInput[]>();
  for (const r of results) {
    const list = byYear.get(r.year) ?? [];
    list.push(r);
    byYear.set(r.year, list);
  }

  return [...byYear.entries()]
    .map(([year, rows]) => {
      const placements = rows.map((r) => r.placement).filter((p): p is number => p !== null);
      const testScores = rows.map((r) => r.testScore).filter((s): s is number => s !== null);
      return {
        year,
        resultCount: rows.length,
        avgPlacement: placements.length > 0 ? placements.reduce((a, b) => a + b, 0) / placements.length : null,
        avgTestScore: testScores.length > 0 ? testScores.reduce((a, b) => a + b, 0) / testScores.length : null,
        advancedRate: (rows.filter((r) => r.advanced).length / rows.length) * 100,
      };
    })
    .sort((a, b) => b.year - a.year);
}
