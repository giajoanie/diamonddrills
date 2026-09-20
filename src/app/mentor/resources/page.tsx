import { requireActiveUser } from "@/lib/auth/guards";
import { getAllResourcesForMentor } from "@/lib/dal/resources";
import { getClustersForTagging } from "@/lib/dal/clusters";
import { getInstructionalAreasForBank } from "@/lib/dal/exam-engine";
import { AppHeader } from "@/components/layout/AppHeader";
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
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Resources</h1>

        <Card className="mt-6">
          <UploadResourceForm clusters={clusters} instructionalAreas={instructionalAreas} />
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
                  <span className="font-normal text-foreground-subtle">· {r.type}</span>
                </p>
                <p className="text-sm text-foreground-muted">
                  {r.allEvents
                    ? "All events"
                    : [
                        ...r.resourceClusters.map((c) => `${c.cluster.name} (all)`),
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
      </main>
    </>
  );
}
