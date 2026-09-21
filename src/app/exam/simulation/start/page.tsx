import { requireActiveUser } from "@/lib/auth/guards";
import { getSimulationEligibleEvents } from "@/lib/dal/exam-engine";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { StartSimulationForm } from "./StartSimulationForm";

export const metadata = { title: "Competition simulation" };
export const dynamic = "force-dynamic";

export default async function StartSimulationPage() {
  const user = await requireActiveUser("STUDENT");
  const events = await getSimulationEligibleEvents(user.id);

  return (
    <>
      <BinderPageShell user={user} homeHref="/dashboard">
        <TabbedCard>
          <div className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-semibold text-foreground">
              Competition simulation
            </h1>
            <p className="mt-1 text-foreground-muted">
              A full 100-question, 90-minute timed exam, followed immediately by
              a timed roleplay — just like competition day.
            </p>

            <Card className="mt-6">
              {events.length === 0 ? (
                <p className="text-sm text-foreground-muted">
                  This mode is only available for events with both an exam and a
                  roleplay component. None of your current events qualify.
                </p>
              ) : (
                <StartSimulationForm events={events} />
              )}
            </Card>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
