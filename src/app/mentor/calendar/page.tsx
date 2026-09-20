import { requireActiveUser } from "@/lib/auth/guards";
import { getAllCalendarEvents } from "@/lib/dal/announcements";
import { deleteCalendarEvent } from "@/lib/actions/announcements";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CalendarForm } from "./CalendarForm";

export const metadata = { title: "Competition calendar" };
export const dynamic = "force-dynamic";

const LEVEL_LABELS: Record<string, string> = { DISTRICT: "District", STATE: "State", ICDC: "ICDC" };

export default async function MentorCalendarPage() {
  const user = await requireActiveUser("MENTOR");
  const events = await getAllCalendarEvents();

  return (
    <>
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Competition calendar</h1>

        <Card className="mt-6">
          <CalendarForm />
        </Card>

        <div className="mt-6 space-y-3">
          {events.map((e) => (
            <Card key={e.id} className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">
                  {e.title}{" "}
                  {e.level && (
                    <span className="font-normal text-foreground-subtle">· {LEVEL_LABELS[e.level]}</span>
                  )}
                </p>
                <p className="text-sm text-foreground-muted">{e.date.toLocaleString()}</p>
                {e.description && <p className="text-sm text-foreground-subtle">{e.description}</p>}
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
              <p className="text-foreground-muted">No calendar events yet.</p>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
