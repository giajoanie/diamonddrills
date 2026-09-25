import { requireActiveUser } from "@/lib/auth/guards";
import { getAllCalendarEvents, getCalendarMilestonesForViewer } from "@/lib/dal/announcements";
import { deleteCalendarEvent } from "@/lib/actions/announcements";
import { deleteMilestone } from "@/lib/actions/calendar-milestones";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { getMentorTabs } from "@/lib/mentorNav";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CalendarForm } from "./CalendarForm";
import { MilestoneForm } from "./MilestoneForm";

export const metadata = { title: "Competition calendar" };
export const dynamic = "force-dynamic";

const LEVEL_LABELS: Record<string, string> = {
  DISTRICT: "District",
  STATE: "State",
  ICDC: "ICDC",
};

export default async function MentorCalendarPage() {
  const user = await requireActiveUser("MENTOR");
  const [events, milestones] = await Promise.all([
    getAllCalendarEvents(),
    getCalendarMilestonesForViewer(user.id),
  ]);

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard tabs={getMentorTabs()}>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold text-foreground">
              Competition calendar
            </h1>

            <Card className="mt-6">
              <CalendarForm />
            </Card>

            <div className="mt-6 space-y-3">
              {events.map((e) => (
                <Card
                  key={e.id}
                  className="flex flex-wrap items-start justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {e.title}{" "}
                      {e.level && (
                        <span className="font-normal text-foreground-subtle">
                          · {LEVEL_LABELS[e.level]}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-foreground-muted">
                      {e.date.toLocaleString()}
                      {e.endDate && ` – ${e.endDate.toLocaleString()}`}
                    </p>
                    {e.description && (
                      <p className="text-sm text-foreground-subtle">
                        {e.description}
                      </p>
                    )}
                  </div>
                  <form action={deleteCalendarEvent}>
                    <input type="hidden" name="calendarEventId" value={e.id} />
                    <Button type="submit" variant="ghost">
                      Delete
                    </Button>
                  </form>
                </Card>
              ))}
              {events.length === 0 && (
                <Card>
                  <p className="text-foreground-muted">
                    No calendar events yet.
                  </p>
                </Card>
              )}
            </div>

            <h2 className="mt-10 text-lg font-semibold text-foreground">
              Shared milestones
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              Visible to every student on their calendar — students also add
              their own private ones that you won&apos;t see here.
            </p>

            <Card className="mt-4">
              <MilestoneForm />
            </Card>

            <div className="mt-6 space-y-3">
              {milestones.map((m) => (
                <Card
                  key={m.id}
                  className="flex flex-wrap items-start justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{m.title}</p>
                    <p className="text-sm text-foreground-muted">
                      {m.date.toLocaleDateString()} · {m.kind}
                    </p>
                  </div>
                  <form action={deleteMilestone}>
                    <input type="hidden" name="milestoneId" value={m.id} />
                    <Button type="submit" variant="ghost">
                      Delete
                    </Button>
                  </form>
                </Card>
              ))}
              {milestones.length === 0 && (
                <Card>
                  <p className="text-foreground-muted">
                    No shared milestones yet.
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
