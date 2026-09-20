import Link from "next/link";
import { Users, FileQuestion, BookOpen, ClipboardCheck, ListChecks, FileText } from "lucide-react";
import { requireActiveUser } from "@/lib/auth/guards";
import { getMentorDashboardData, getStudentNamesByIds } from "@/lib/dal/analytics";
import { getClustersForTagging } from "@/lib/dal/clusters";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { Label, Select, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Mentor dashboard" };
export const dynamic = "force-dynamic";

const REASON_LABELS: Record<string, string> = {
  INACTIVE: "Inactive",
  DECLINING: "Declining",
  BELOW_THRESHOLD: "Below threshold",
};

export default async function MentorDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ grade?: string; clusterId?: string; eventId?: string; dateFrom?: string; dateTo?: string }>;
}) {
  const user = await requireActiveUser("MENTOR");
  const { grade, clusterId, eventId, dateFrom, dateTo } = await searchParams;

  const clusters = await getClustersForTagging();
  const data = await getMentorDashboardData({
    grade: grade ? parseInt(grade, 10) : undefined,
    clusterId: clusterId || undefined,
    eventId: eventId || undefined,
    dateFrom: dateFrom ? new Date(dateFrom) : undefined,
    dateTo: dateTo ? new Date(dateTo) : undefined,
  });

  const attentionNames = await getStudentNamesByIds(data.needsAttention.map((s) => s.userId));

  return (
    <>
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Welcome, {user.firstName}</h1>

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
            <Select id="clusterId" name="clusterId" defaultValue={clusterId ?? ""}>
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
            <Select id="eventId" name="eventId" defaultValue={eventId ?? ""}>
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
            <Input id="dateFrom" name="dateFrom" type="date" defaultValue={dateFrom ?? ""} />
          </div>
          <div>
            <Label htmlFor="dateTo">To</Label>
            <Input id="dateTo" name="dateTo" type="date" defaultValue={dateTo ?? ""} />
          </div>
          <Button type="submit" variant="secondary">
            Apply filters
          </Button>
        </form>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
              Active students
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {data.activeStudentCount} / {data.totalStudentCount}
            </p>
          </Card>
          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
              No baseline yet
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{data.studentsWithoutBaseline}</p>
          </Card>
          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
              Practice sessions / student / week
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {data.practiceSessionsPerStudentPerWeek.toFixed(1)}
            </p>
          </Card>
        </div>

        <Card className="mt-4">
          <p className="font-medium text-foreground">Score now vs. baseline</p>
          {data.scoreVsBaseline.studentCount > 0 ? (
            <p className="mt-1 text-sm text-foreground-muted">
              {Math.round(data.scoreVsBaseline.avgBaseline)}% → {Math.round(data.scoreVsBaseline.avgLatest)}%
              {" "}
              <span className={data.scoreVsBaseline.avgChange >= 0 ? "text-success" : "text-danger"}>
                ({data.scoreVsBaseline.avgChange >= 0 ? "+" : ""}
                {Math.round(data.scoreVsBaseline.avgChange)} pts)
              </span>{" "}
              across {data.scoreVsBaseline.studentCount} students
            </p>
          ) : (
            <p className="mt-1 text-sm text-foreground-muted">Not enough data yet.</p>
          )}
          {data.scoreVsBaselineByCluster.length > 0 && (
            <ul className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
              {data.scoreVsBaselineByCluster.map((c) => (
                <li key={c.clusterId} className="flex items-center justify-between gap-3">
                  <span className="text-foreground-muted">{c.clusterName}</span>
                  <span className={c.avgChange >= 0 ? "text-success" : "text-danger"}>
                    {c.avgChange >= 0 ? "+" : ""}
                    {Math.round(c.avgChange)} pts
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="font-medium text-foreground">Chapter-wide weakest areas</p>
            {data.weakestAreas.length > 0 ? (
              <ul className="mt-2 space-y-1 text-sm">
                {data.weakestAreas.slice(0, 5).map((a) => (
                  <li key={a.areaName} className="flex items-center justify-between gap-3">
                    <span className="text-foreground-muted">{a.areaName}</span>
                    <span className="text-foreground-subtle">{Math.round(a.accuracy)}%</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-foreground-muted">No exam data yet.</p>
            )}
          </Card>

          <Card>
            <p className="font-medium text-foreground">Assignments</p>
            {data.assignmentCompletion.sampleSize > 0 ? (
              <p className="mt-1 text-sm text-foreground-muted">
                {Math.round(data.assignmentCompletion.completionRate)}% completed ·{" "}
                {Math.round(data.assignmentCompletion.onTimeRate)}% on time
              </p>
            ) : (
              <p className="mt-1 text-sm text-foreground-muted">No assignments due in this period yet.</p>
            )}
            <Link
              href="/mentor/submissions"
              className="mt-2 block text-sm text-accent hover:underline"
            >
              {data.ungradedSubmissionsCount} ungraded submission
              {data.ungradedSubmissionsCount === 1 ? "" : "s"} →
            </Link>
          </Card>
        </div>

        {data.needsAttention.length > 0 && (
          <Card className="mt-4 border-danger/40">
            <p className="font-medium text-foreground">Needs attention</p>
            <ul className="mt-2 space-y-1 text-sm">
              {data.needsAttention.map((s) => {
                const name = attentionNames.get(s.userId);
                return (
                  <li key={s.userId} className="flex items-center justify-between gap-3">
                    <span className="text-foreground-muted">
                      {name ? `${name.firstName} · ${name.schoolId}` : s.userId}
                    </span>
                    <span className="text-foreground-subtle">
                      {s.reasons.map((r) => REASON_LABELS[r]).join(", ")}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link href="/mentor/students">
            <Card className="flex items-center gap-3 hover:bg-surface-hover">
              <Users className="h-5 w-5 text-accent" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Students</p>
                <p className="text-sm text-foreground-muted">
                  View the roster, reset passwords, and manage accounts.
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/mentor/exams">
            <Card className="flex items-center gap-3 hover:bg-surface-hover">
              <FileQuestion className="h-5 w-5 text-accent" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Exam banks</p>
                <p className="text-sm text-foreground-muted">
                  Upload exam PDFs and review parsed questions before publishing.
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/mentor/resources">
            <Card className="flex items-center gap-3 hover:bg-surface-hover">
              <BookOpen className="h-5 w-5 text-accent" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Resources</p>
                <p className="text-sm text-foreground-muted">
                  Upload and tag study materials for the right students.
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/mentor/rubrics">
            <Card className="flex items-center gap-3 hover:bg-surface-hover">
              <ClipboardCheck className="h-5 w-5 text-accent" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Rubrics</p>
                <p className="text-sm text-foreground-muted">
                  Build scoring rubrics to attach to assignments.
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/mentor/assignments">
            <Card className="flex items-center gap-3 hover:bg-surface-hover">
              <ListChecks className="h-5 w-5 text-accent" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Assignments</p>
                <p className="text-sm text-foreground-muted">
                  Create file, exam, or roleplay-prep assignments for students.
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/mentor/written-events">
            <Card className="flex items-center gap-3 hover:bg-surface-hover">
              <FileText className="h-5 w-5 text-accent" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Written events</p>
                <p className="text-sm text-foreground-muted">
                  Set page limits, required sections, and milestone deadlines.
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </main>
    </>
  );
}
