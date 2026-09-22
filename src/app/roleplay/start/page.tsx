import { requireActiveUser } from "@/lib/auth/guards";
import { getCurrentEnrollments } from "@/lib/dal/events";
import { getVisibleResourcesForStudent } from "@/lib/dal/resources";
import { getPerformanceIndicatorsForEvent } from "@/lib/dal/performance-indicators";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { PerformanceIndicatorList } from "@/components/roleplay/PerformanceIndicatorList";
import { StartRoleplayForm } from "./StartRoleplayForm";

export const metadata = { title: "Practice roleplay" };
export const dynamic = "force-dynamic";

export default async function StartRoleplayPage() {
  const user = await requireActiveUser("STUDENT");
  const [enrollments, caseStudies] = await Promise.all([
    getCurrentEnrollments(user.id),
    getVisibleResourcesForStudent(user.id, { type: "CASE_STUDY" }),
  ]);

  const roleplayEnrollments = enrollments.filter((e) => e.event.category === "ROLEPLAY");
  const roleplayEvents = roleplayEnrollments.map((e) => ({ id: e.event.id, name: e.event.name }));

  const piPanels = await Promise.all(
    roleplayEnrollments
      .filter((e) => e.event.examBankId)
      .map(async (e) => ({
        eventName: e.event.name,
        grouped: await getPerformanceIndicatorsForEvent(e.event.examBankId!, e.event.roleplayPathway),
      })),
  );

  return (
    <>
      <BinderPageShell user={user} homeHref="/dashboard">
        <TabbedCard>
          <div className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-semibold text-foreground">
              Practice roleplay
            </h1>
            <p className="mt-1 text-foreground-muted">
              Timers match competition format. You&apos;ll get a prep period,
              then a presentation period, then a self-rating.
            </p>

            <Card className="mt-6">
              {roleplayEvents.length > 0 ? (
                <StartRoleplayForm
                  events={roleplayEvents}
                  caseStudies={caseStudies}
                />
              ) : (
                <p className="text-foreground-muted">
                  You don&apos;t have a current roleplay event.
                </p>
              )}
            </Card>

            {piPanels.map((panel) => (
              <PerformanceIndicatorList
                key={panel.eventName}
                eventName={panel.eventName}
                grouped={panel.grouped}
              />
            ))}
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
