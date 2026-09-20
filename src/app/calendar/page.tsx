import { requireActiveUser } from "@/lib/auth/guards";
import { getUpcomingCalendarEvents } from "@/lib/dal/announcements";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "Competition calendar" };
export const dynamic = "force-dynamic";

const LEVEL_LABELS: Record<string, string> = { DISTRICT: "District", STATE: "State", ICDC: "ICDC" };

export default async function StudentCalendarPage() {
  const user = await requireActiveUser("STUDENT");
  const events = await getUpcomingCalendarEvents();

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Competition calendar</h1>

        <div className="mt-6 space-y-3">
          {events.map((e) => (
            <Card key={e.id}>
              <p className="font-medium text-foreground">
                {e.title}{" "}
                {e.level && <span className="font-normal text-foreground-subtle">· {LEVEL_LABELS[e.level]}</span>}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">{e.date.toLocaleString()}</p>
              {e.description && <p className="mt-1 text-sm text-foreground-subtle">{e.description}</p>}
            </Card>
          ))}
          {events.length === 0 && (
            <Card>
              <p className="text-foreground-muted">No upcoming events yet.</p>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
