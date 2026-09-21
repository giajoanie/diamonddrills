import { requireActiveUser } from "@/lib/auth/guards";
import { getAllResourcesForMentor } from "@/lib/dal/resources";
import { getClustersForTagging } from "@/lib/dal/clusters";
import { getInstructionalAreasForBank } from "@/lib/dal/exam-engine";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { getMentorTabs } from "@/lib/mentorNav";
import { Card } from "@/components/ui/Card";
import { UploadResourceForm } from "./UploadResourceForm";
import { deactivateResource } from "@/lib/actions/resources";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Resources" };
export const dynamic = "force-dynamic";

export default async function MentorResourcesPage() {
  const user = await requireActiveUser("MENTOR");
  const [resources, clusters, instructionalAreas] = await Promise.all([
    getAllResourcesForMentor(),
    getClustersForTagging(),
    getInstructionalAreasForBank(),
  ]);

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard tabs={getMentorTabs()}>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-semibold text-foreground">
              Resources
            </h1>

            <Card className="mt-6">
              <UploadResourceForm
                clusters={clusters}
                instructionalAreas={instructionalAreas}
              />
            </Card>

            <div className="mt-6 space-y-3">
              {resources.map((r) => (
                <Card
                  key={r.id}
                  className={`flex flex-wrap items-center justify-between gap-3 ${r.isActive ? "" : "opacity-50"}`}
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {r.name}{" "}
                      <span className="font-normal text-foreground-subtle">
                        · {r.type}
                      </span>
                    </p>
                    <p className="text-sm text-foreground-muted">
                      {r.allEvents
                        ? "All events"
                        : [
                            ...r.resourceClusters.map(
                              (c) => `${c.cluster.name} (all)`,
                            ),
                            ...r.resourceEvents.map((e) => e.event.name),
                          ].join(" · ") || "Untagged"}
                      {r.grade ? ` · Grade ${r.grade}` : " · All grades"}
                    </p>
                  </div>
                  {r.isActive && (
                    <form action={deactivateResource}>
                      <input type="hidden" name="resourceId" value={r.id} />
                      <Button type="submit" variant="ghost">
                        Deactivate
                      </Button>
                    </form>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
