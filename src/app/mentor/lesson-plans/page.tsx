import Link from "next/link";
import { requireActiveUser } from "@/lib/auth/guards";
import {
  getLessonPlanRecommendations,
  getResourceNamesByIds,
  getStudentNamesByIds,
} from "@/lib/dal/analytics";
import { getClustersForTagging } from "@/lib/dal/clusters";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { Label, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Lesson plan recommendations" };
export const dynamic = "force-dynamic";

export default async function LessonPlansPage({
  searchParams,
}: {
  searchParams: Promise<{ grade?: string; clusterId?: string; eventId?: string }>;
}) {
  const user = await requireActiveUser("MENTOR");
  const { grade, clusterId, eventId } = await searchParams;

  const clusters = await getClustersForTagging();
  const recommendations = await getLessonPlanRecommendations({
    grade: grade ? parseInt(grade, 10) : undefined,
    clusterId: clusterId || undefined,
    eventId: eventId || undefined,
  });

  const allResourceIds = recommendations.flatMap((r) => r.resourceIds);
  const allStudentIds = recommendations.flatMap((r) => r.beneficiaryStudentIds);
  const [resourceNames, studentNames] = await Promise.all([
    getResourceNamesByIds(allResourceIds),
    getStudentNamesByIds(allStudentIds),
  ]);

  return (
    <>
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Lesson plan recommendations</h1>
        <p className="mt-1 text-foreground-muted">
          Rule-based suggestions from the weakest instructional areas — each one explains why it was made.
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
          <Button type="submit" variant="secondary">
            Apply filters
          </Button>
        </form>

        <div className="mt-6 space-y-4">
          {recommendations.map((r) => (
            <Card key={r.areaId}>
              <p className="font-medium text-foreground">{r.areaName}</p>
              <p className="mt-1 text-sm text-foreground-muted">{r.reason}</p>

              <p className="mt-3 text-sm font-medium text-foreground">Suggested practice exam</p>
              <p className="text-sm text-foreground-muted">
                {r.examConfig.questionCount} questions · {r.examConfig.timeLimitMinutes} minutes
              </p>

              <p className="mt-3 text-sm font-medium text-foreground">Suggested resources</p>
              {r.resourceIds.length > 0 ? (
                <ul className="text-sm text-foreground-muted">
                  {r.resourceIds.map((id) => (
                    <li key={id}>{resourceNames.get(id) ?? id}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-foreground-muted">
                  No resources tagged to this area yet —{" "}
                  <Link href="/mentor/resources" className="text-accent hover:underline">
                    upload one
                  </Link>
                  .
                </p>
              )}

              <p className="mt-3 text-sm font-medium text-foreground">
                Students who would benefit most ({r.beneficiaryStudentIds.length})
              </p>
              {r.beneficiaryStudentIds.length > 0 ? (
                <p className="text-sm text-foreground-muted">
                  {r.beneficiaryStudentIds
                    .slice(0, 8)
                    .map((id) => studentNames.get(id)?.firstName ?? id)
                    .join(", ")}
                  {r.beneficiaryStudentIds.length > 8 ? ", …" : ""}
                </p>
              ) : (
                <p className="text-sm text-foreground-muted">No students below the benefit threshold.</p>
              )}
            </Card>
          ))}

          {recommendations.length === 0 && (
            <Card>
              <p className="text-foreground-muted">Not enough exam data yet to generate recommendations.</p>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
