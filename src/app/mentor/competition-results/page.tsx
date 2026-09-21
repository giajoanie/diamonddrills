import { requireActiveUser } from "@/lib/auth/guards";
import {
  getAllCompetitionResults,
  getCompetitionCohortsByYear,
} from "@/lib/dal/competition-results";
import { getAllStudents } from "@/lib/dal/mentor";
import { getClustersForTagging } from "@/lib/dal/clusters";
import { getAllTeams } from "@/lib/dal/teams";
import { deleteCompetitionResult } from "@/lib/actions/competition-results";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label, Select } from "@/components/ui/Field";
import { ResultForm } from "./ResultForm";
import type { CompetitionLevel } from "@/generated/prisma/client";

export const metadata = { title: "Competition results" };
export const dynamic = "force-dynamic";

const LEVEL_LABELS: Record<string, string> = {
  DISTRICT: "District",
  STATE: "State",
  ICDC: "ICDC",
};

export default async function CompetitionResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; year?: string }>;
}) {
  const user = await requireActiveUser("MENTOR");
  const { level, year } = await searchParams;

  const [results, students, clusters, teams, cohortsByYear] = await Promise.all(
    [
      getAllCompetitionResults({
        level:
          level && level in LEVEL_LABELS
            ? (level as CompetitionLevel)
            : undefined,
        year: year ? parseInt(year, 10) : undefined,
      }),
      getAllStudents(),
      getClustersForTagging(),
      getAllTeams(),
      getCompetitionCohortsByYear(),
    ],
  );

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-semibold text-foreground">
              Competition results
            </h1>
            <p className="mt-1 text-foreground-muted">
              Record placements and scores per student, level, and year.
            </p>

            <Card className="mt-6">
              <ResultForm
                students={students}
                clusters={clusters}
                teams={teams.filter((t) => t.members.length > 0)}
              />
            </Card>

            {cohortsByYear.length > 1 && (
              <Card className="mt-6">
                <p className="font-medium text-foreground">Cohorts by year</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {cohortsByYear.map((c) => (
                    <li
                      key={c.year}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-foreground-muted">
                        {c.year} · {c.resultCount} result
                        {c.resultCount === 1 ? "" : "s"}
                      </span>
                      <span className="text-foreground-subtle">
                        {c.avgPlacement !== null
                          ? `Avg placement ${c.avgPlacement.toFixed(1)}`
                          : "No placements"}
                        {c.avgTestScore !== null
                          ? ` · Avg test ${c.avgTestScore.toFixed(1)}`
                          : ""}
                        {" · "}
                        {Math.round(c.advancedRate)}% advanced
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            <form className="mt-6 flex flex-wrap items-end gap-3" method="GET">
              <div>
                <Label htmlFor="level">Level</Label>
                <Select id="level" name="level" defaultValue={level ?? ""}>
                  <option value="">All levels</option>
                  {Object.entries(LEVEL_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Select id="year" name="year" defaultValue={year ?? ""}>
                  <option value="">All years</option>
                  {Array.from(
                    { length: 5 },
                    (_, i) => new Date().getFullYear() - i,
                  ).map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </Select>
              </div>
              <Button type="submit" variant="secondary">
                Apply filters
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              {results.map((r) => (
                <Card
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {r.user.firstName} · {r.user.schoolId}{" "}
                      <span className="font-normal text-foreground-subtle">
                        · {r.event.name} · {LEVEL_LABELS[r.level]} {r.year}
                      </span>
                    </p>
                    <p className="text-sm text-foreground-muted">
                      {r.placement
                        ? `Placement ${r.placement}`
                        : "No placement recorded"}
                      {r.testScore !== null ? ` · Test ${r.testScore}` : ""}
                      {r.roleplayScore !== null
                        ? ` · Roleplay ${r.roleplayScore}`
                        : ""}
                      {r.presentationScore !== null
                        ? ` · Presentation ${r.presentationScore}`
                        : ""}
                      {r.advanced ? " · Advanced" : ""}
                    </p>
                    {r.notes && (
                      <p className="text-sm text-foreground-subtle">
                        {r.notes}
                      </p>
                    )}
                  </div>
                  <form action={deleteCompetitionResult}>
                    <input type="hidden" name="resultId" value={r.id} />
                    <Button type="submit" variant="ghost">
                      Delete
                    </Button>
                  </form>
                </Card>
              ))}
              {results.length === 0 && (
                <Card>
                  <p className="text-foreground-muted">
                    No results recorded yet.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
