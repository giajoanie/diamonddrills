import { requireActiveUser } from "@/lib/auth/guards";
import { getPmCdeImpactData } from "@/lib/dal/analytics";
import { getClustersForTagging } from "@/lib/dal/clusters";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { Label, Select, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "PM CDE Impact Dashboard" };
export const dynamic = "force-dynamic";

const BUCKET_LABELS: Record<string, string> = {
  low: "Low engagement",
  medium: "Medium engagement",
  high: "High engagement",
};

function ChangeStat({ value }: { value: number }) {
  const sign = value > 0 ? "+" : "";
  return (
    <span
      className={
        value > 0
          ? "text-success"
          : value < 0
            ? "text-danger"
            : "text-foreground-muted"
      }
    >
      {sign}
      {Math.round(value * 10) / 10} pts
    </span>
  );
}

export default async function PmCdeImpactPage({
  searchParams,
}: {
  searchParams: Promise<{
    grade?: string;
    clusterId?: string;
    eventId?: string;
    dateFrom?: string;
    dateTo?: string;
  }>;
}) {
  const user = await requireActiveUser("MENTOR");
  const { grade, clusterId, eventId, dateFrom, dateTo } = await searchParams;

  const clusters = await getClustersForTagging();
  const data = await getPmCdeImpactData({
    grade: grade ? parseInt(grade, 10) : undefined,
    clusterId: clusterId || undefined,
    eventId: eventId || undefined,
    dateFrom: dateFrom ? new Date(dateFrom) : undefined,
    dateTo: dateTo ? new Date(dateTo) : undefined,
  });

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-semibold text-foreground">
              PM CDE Impact Dashboard
            </h1>
            <p className="mt-1 text-foreground-muted">
              Before/after growth, engagement vs. improvement, and competition
              outcomes — formatted for pulling straight into a Project
              Management CDE written report.
            </p>

            <form className="mt-4 flex flex-wrap items-end gap-3" method="GET">
              <div>
                <Label htmlFor="grade">Grade</Label>
                <Select id="grade" name="grade" defaultValue={grade ?? ""}>
                  <option value="">All grades</option>
                  {[9, 10, 11, 12].map((g) => (
                    <option key={g} value={g}>
                      {g}th grade
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="clusterId">Cluster</Label>
                <Select
                  id="clusterId"
                  name="clusterId"
                  defaultValue={clusterId ?? ""}
                >
                  <option value="">All clusters</option>
                  {clusters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="eventId">Event</Label>
                <Select
                  id="eventId"
                  name="eventId"
                  defaultValue={eventId ?? ""}
                >
                  <option value="">All events</option>
                  {clusters.flatMap((c) =>
                    c.events.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    )),
                  )}
                </Select>
              </div>
              <div>
                <Label htmlFor="dateFrom">From</Label>
                <Input
                  id="dateFrom"
                  name="dateFrom"
                  type="date"
                  defaultValue={dateFrom ?? ""}
                />
              </div>
              <div>
                <Label htmlFor="dateTo">To</Label>
                <Input
                  id="dateTo"
                  name="dateTo"
                  type="date"
                  defaultValue={dateTo ?? ""}
                />
              </div>
              <Button type="submit" variant="secondary">
                Apply filters
              </Button>
            </form>

            <Card className="mt-6">
              <h2 className="mb-3 font-medium text-foreground">
                Before / after: score vs. baseline
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
                    Avg. baseline
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {Math.round(data.scoreVsBaseline.avgBaseline)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
                    Avg. latest
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {Math.round(data.scoreVsBaseline.avgLatest)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
                    Change
                  </p>
                  <p className="mt-1 text-2xl font-semibold">
                    <ChangeStat value={data.scoreVsBaseline.avgChange} />
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-foreground-subtle">
                Based on {data.scoreVsBaseline.studentCount} student
                {data.scoreVsBaseline.studentCount === 1 ? "" : "s"} with both a
                baseline and a later exam.
              </p>

              {data.scoreVsBaselineByCluster.length > 0 && (
                <table className="mt-4 w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground-subtle">
                      <th className="pb-1 font-medium">Cluster</th>
                      <th className="pb-1 font-medium">Baseline</th>
                      <th className="pb-1 font-medium">Latest</th>
                      <th className="pb-1 font-medium">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.scoreVsBaselineByCluster.map((c) => (
                      <tr
                        key={c.clusterId}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-1.5 text-foreground-muted">
                          {c.clusterName}
                        </td>
                        <td className="py-1.5 text-foreground-muted">
                          {Math.round(c.avgBaseline)}%
                        </td>
                        <td className="py-1.5 text-foreground-muted">
                          {Math.round(c.avgLatest)}%
                        </td>
                        <td className="py-1.5">
                          <ChangeStat value={c.avgChange} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>

            <Card className="mt-4">
              <h2 className="mb-1 font-medium text-foreground">
                Engagement vs. improvement
              </h2>
              <p className="mb-3 text-xs text-foreground-subtle">
                Average score change vs. baseline, grouped by how much a student
                has practiced on the platform in the selected date range.
              </p>
              {data.engagementVsImprovement.length === 0 ? (
                <p className="text-sm text-foreground-muted">
                  Not enough data yet.
                </p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground-subtle">
                      <th className="pb-1 font-medium">Engagement</th>
                      <th className="pb-1 font-medium">Students</th>
                      <th className="pb-1 font-medium">Avg. score change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.engagementVsImprovement.map((row) => (
                      <tr
                        key={row.bucket}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-1.5 text-foreground-muted">
                          {BUCKET_LABELS[row.bucket]}
                        </td>
                        <td className="py-1.5 text-foreground-muted">
                          {row.studentCount}
                        </td>
                        <td className="py-1.5">
                          <ChangeStat value={row.avgScoreChange} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>

            <Card className="mt-4">
              <h2 className="mb-1 font-medium text-foreground">
                Competition outcomes vs. engagement
              </h2>
              <p className="mb-3 text-xs text-foreground-subtle">
                Advancement rate among students with a recorded competition
                result, grouped by engagement.
              </p>
              {data.outcomesByEngagement.length === 0 ? (
                <p className="text-sm text-foreground-muted">
                  No competition results recorded yet.
                </p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground-subtle">
                      <th className="pb-1 font-medium">Engagement</th>
                      <th className="pb-1 font-medium">Students</th>
                      <th className="pb-1 font-medium">Advancement rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.outcomesByEngagement.map((row) => (
                      <tr
                        key={row.bucket}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-1.5 text-foreground-muted">
                          {BUCKET_LABELS[row.bucket]}
                        </td>
                        <td className="py-1.5 text-foreground-muted">
                          {row.studentCount}
                        </td>
                        <td className="py-1.5 text-foreground-muted">
                          {Math.round(row.advancementRate)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
