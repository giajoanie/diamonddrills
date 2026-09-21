import { notFound } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import { getWrittenEventWorkspace } from "@/lib/dal/written-events";
import { createMilestone, deleteMilestone } from "@/lib/actions/written-events";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { getMentorTabs } from "@/lib/mentorNav";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label, Input } from "@/components/ui/Field";
import { ChecklistForm } from "./ChecklistForm";

export const metadata = { title: "Written event checklist" };
export const dynamic = "force-dynamic";

export default async function MentorWrittenEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const user = await requireActiveUser("MENTOR");
  const { eventId } = await params;

  const workspace = await getWrittenEventWorkspace(eventId);
  if (!workspace) notFound();

  const { event, checklist, milestones } = workspace;
  const requiredSections = Array.isArray(checklist?.requiredSections)
    ? (checklist.requiredSections as string[])
    : [];
  const formattingNotes =
    checklist?.formattingRequirements &&
    typeof checklist.formattingRequirements === "object"
      ? ((checklist.formattingRequirements as { notes?: string }).notes ?? "")
      : "";

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard tabs={getMentorTabs()}>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold text-foreground">
              {event.name}
            </h1>
            <p className="mt-1 text-foreground-muted">
              Checklist and milestone deadlines
            </p>

            <Card className="mt-6">
              <ChecklistForm
                eventId={eventId}
                pageLimit={checklist?.pageLimit ?? null}
                requiredSections={requiredSections}
                formattingNotes={formattingNotes}
              />
            </Card>

            <Card className="mt-4">
              <p className="mb-3 font-medium text-foreground">Milestones</p>
              <div className="space-y-2">
                {milestones.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <p className="text-foreground">{m.name}</p>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-foreground-muted">
                        {m.dueAt.toLocaleString()}
                      </p>
                      <form action={deleteMilestone}>
                        <input type="hidden" name="milestoneId" value={m.id} />
                        <input type="hidden" name="eventId" value={eventId} />
                        <Button type="submit" variant="ghost">
                          Remove
                        </Button>
                      </form>
                    </div>
                  </div>
                ))}
                {milestones.length === 0 && (
                  <p className="text-sm text-foreground-muted">
                    No milestones yet.
                  </p>
                )}
              </div>

              <form
                action={createMilestone}
                className="mt-4 flex flex-wrap items-end gap-3 border-t border-border pt-4"
              >
                <input type="hidden" name="eventId" value={eventId} />
                <div>
                  <Label htmlFor="name">Milestone name</Label>
                  <Input id="name" name="name" placeholder="Outline" required />
                </div>
                <div>
                  <Label htmlFor="dueAt">Due</Label>
                  <Input
                    id="dueAt"
                    name="dueAt"
                    type="datetime-local"
                    required
                  />
                </div>
                <Button type="submit" variant="secondary">
                  Add milestone
                </Button>
              </form>
            </Card>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
