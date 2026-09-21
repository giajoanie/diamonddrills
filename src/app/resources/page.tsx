import { requireActiveUser } from "@/lib/auth/guards";
import { getVisibleResourcesForStudent, getRecommendedResources } from "@/lib/dal/resources";
import { getAttemptQuestionHistory, getInstructionalAreasForBank } from "@/lib/dal/exam-engine";
import { computeAreaBreakdown, computeWeightedWeakAreas } from "@/lib/exam-engine/scoring";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { Label, Select, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ResourceCard } from "./ResourceCard";
import type { CompetitionLevel, ResourceType } from "@/generated/prisma/client";

export const metadata = { title: "Resources" };
export const dynamic = "force-dynamic";

const RESOURCE_TYPE_LABELS: Record<string, string> = {
  CASE_STUDY: "Case study",
  EXAM: "Exam",
  LESSON: "Lesson",
  VIDEO: "Video",
  STUDY_GUIDE: "Study guide",
  SAMPLE_WRITTEN: "Sample written",
  RUBRIC: "Rubric",
  PRESENTATION: "Presentation",
  OTHER: "Other",
};

export default async function StudentResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; area?: string; level?: string; q?: string }>;
}) {
  const user = await requireActiveUser("STUDENT");
  const { type, area, level, q } = await searchParams;

  const [resources, instructionalAreas, attempts] = await Promise.all([
    getVisibleResourcesForStudent(user.id, {
      type: type as ResourceType | undefined,
      instructionalAreaId: area || undefined,
      competitionLevel: level as CompetitionLevel | undefined,
      query: q || undefined,
    }),
    getInstructionalAreasForBank(),
    getAttemptQuestionHistory(user.id),
  ]);

  const perAttemptBreakdowns = attempts.map((a) => computeAreaBreakdown(a.questions));
  const weakestAreaNames = computeWeightedWeakAreas(perAttemptBreakdowns, 5).map((a) => a.areaName);
  const nameToId = new Map(instructionalAreas.map((a) => [a.name, a.id]));
  const weakAreaIds = weakestAreaNames.map((n) => nameToId.get(n)).filter((id): id is string => !!id);
  const recommended = await getRecommendedResources(user.id, weakAreaIds);

  return (
    <BinderPageShell user={user} homeHref="/dashboard">
      <TabbedCard>
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-bold text-foreground">Resources</h2>

        {recommended.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-2 font-display font-bold text-foreground">Recommended for you</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {recommended.map((r) => (
                <ResourceCard key={r.id} resource={{ ...r, resourceAreas: [] }} />
              ))}
            </div>
          </div>
        )}

        <form
          className="mt-6 flex flex-wrap items-end gap-4 rounded-xl border border-border bg-surface p-4"
          method="GET"
        >
          <div>
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" type="text" defaultValue={q ?? ""} placeholder="Name or description…" />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue={type ?? ""}>
              <option value="">All types</option>
              {Object.entries(RESOURCE_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="area">Instructional area</Label>
            <Select id="area" name="area" defaultValue={area ?? ""}>
              <option value="">All areas</option>
              {instructionalAreas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="level">Competition level</Label>
            <Select id="level" name="level" defaultValue={level ?? ""}>
              <option value="">All levels</option>
              <option value="DISTRICT">District</option>
              <option value="STATE">State</option>
              <option value="ICDC">ICDC</option>
            </Select>
          </div>
          <Button type="submit" variant="secondary">
            Apply filters
          </Button>
        </form>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {resources.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>

        {resources.length === 0 && (
          <Card className="mt-4">
            <p className="text-foreground-muted">No resources match yet.</p>
          </Card>
        )}
      </div>
      </TabbedCard>
    </BinderPageShell>
  );
}
