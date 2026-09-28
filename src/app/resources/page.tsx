import { requireActiveUser } from "@/lib/auth/guards";
import {
  getVisibleResourcesForStudent,
  getRecommendedResources,
} from "@/lib/dal/resources";
import {
  getAttemptQuestionHistory,
  getInstructionalAreasForBank,
} from "@/lib/dal/exam-engine";
import {
  computeAreaBreakdown,
  computeWeightedWeakAreas,
} from "@/lib/exam-engine/scoring";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { ResourceCard } from "./ResourceCard";
import { ResourcesClient } from "./ResourcesClient";

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

export default async function StudentResourcesPage() {
  const user = await requireActiveUser("STUDENT");

  // Filters now apply live client-side (design_handoff_norcal_resources),
  // so the full visible set is fetched once with no server-side filters.
  const [resources, instructionalAreas, attempts] = await Promise.all([
    getVisibleResourcesForStudent(user.id),
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
      <TabbedCard ruled>
        <div className="max-w-[920px]">
          {recommended.length > 0 && (
            <div className="mb-[26px]">
              <h2 className="font-display mb-2.5 text-lg font-bold text-foreground">
                Recommended for you
              </h2>
              <div className="grid grid-cols-1 gap-[22px_26px] sm:grid-cols-2">
                {recommended.map((r, i) => (
                  <ResourceCard
                    key={r.id}
                    resource={{ ...r, resourceAreas: [] }}
                    typeLabel={RESOURCE_TYPE_LABELS[r.type] ?? r.type}
                    tiltDeg={[-0.4, 0.5, 0.3, -0.5][i % 4]}
                  />
                ))}
              </div>
            </div>
          )}

          <ResourcesClient resources={resources} typeLabels={RESOURCE_TYPE_LABELS} />
        </div>
      </TabbedCard>
    </BinderPageShell>
  );
}
