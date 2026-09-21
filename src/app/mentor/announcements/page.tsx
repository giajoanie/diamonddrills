import { requireActiveUser } from "@/lib/auth/guards";
import { getAllAnnouncementsForMentor } from "@/lib/dal/announcements";
import { getClustersForTagging } from "@/lib/dal/clusters";
import { deleteAnnouncement } from "@/lib/actions/announcements";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnnouncementForm } from "./AnnouncementForm";

export const metadata = { title: "Announcements" };
export const dynamic = "force-dynamic";

const AUDIENCE_LABELS: Record<string, string> = {
  EVERYONE: "Everyone",
  GRADE: "Grade",
  CLUSTER: "Cluster",
  EVENT: "Event",
};

export default async function MentorAnnouncementsPage() {
  const user = await requireActiveUser("MENTOR");
  const [announcements, clusters] = await Promise.all([
    getAllAnnouncementsForMentor(),
    getClustersForTagging(),
  ]);

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold text-foreground">
              Announcements
            </h1>

            <Card className="mt-6">
              <AnnouncementForm clusters={clusters} />
            </Card>

            <div className="mt-6 space-y-3">
              {announcements.map((a) => (
                <Card
                  key={a.id}
                  className="flex flex-wrap items-start justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {a.title}{" "}
                      <span className="font-normal text-foreground-subtle">
                        ·{" "}
                        {a.audience === "GRADE"
                          ? `Grade ${a.grade}`
                          : a.audience === "CLUSTER"
                            ? a.cluster?.name
                            : a.audience === "EVENT"
                              ? a.event?.name
                              : AUDIENCE_LABELS[a.audience]}
                      </span>
                    </p>
                    <p className="text-sm text-foreground-muted">{a.body}</p>
                    <p className="text-sm text-foreground-subtle">
                      {a.publishAt.toLocaleString()}
                    </p>
                  </div>
                  <form action={deleteAnnouncement}>
                    <input type="hidden" name="announcementId" value={a.id} />
                    <Button type="submit" variant="ghost">
                      Delete
                    </Button>
                  </form>
                </Card>
              ))}
              {announcements.length === 0 && (
                <Card>
                  <p className="text-foreground-muted">No announcements yet.</p>
                </Card>
              )}
            </div>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
