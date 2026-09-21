import { requireActiveUser } from "@/lib/auth/guards";
import { getSimulationEligibleEvents } from "@/lib/dal/exam-engine";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { StartSimulationForm } from "./StartSimulationForm";

export const metadata = { title: "Competition simulation" };
export const dynamic = "force-dynamic";

export default async function StartSimulationPage() {
  const user = await requireActiveUser("STUDENT");
  const events = await getSimulationEligibleEvents(user.id);

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Competition simulation</h1>
        <p className="mt-1 text-foreground-muted">
          A full 100-question, 90-minute timed exam, followed immediately by a timed roleplay —
          just like competition day.
        </p>

        <Card className="mt-6">
          {events.length === 0 ? (
            <p className="text-sm text-foreground-muted">
              This mode is only available for events with both an exam and a roleplay component.
              None of your current events qualify.
            </p>
          ) : (
            <StartSimulationForm events={events} />
          )}
        </Card>
      </main>
    </>
  );
}
