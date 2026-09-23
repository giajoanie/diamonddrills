import { differenceInCalendarDays } from "date-fns";
import { requireActiveUser } from "@/lib/auth/guards";
import { getCurrentEnrollments } from "@/lib/dal/events";
import { getNorCalPrepForEvent } from "@/lib/dal/performance-indicators";
import {
  NORCAL_DISTRICT_AREAS,
  NORCAL_MINICOMP_DATE,
  NORCAL_DISTRICT_DATE,
  NORCAL_DISTRICT_DATE_LABEL,
} from "@/lib/norcal-district-areas";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { PerformanceIndicatorList } from "@/components/roleplay/PerformanceIndicatorList";

export const metadata = { title: "NorCal Specific Prep" };
export const dynamic = "force-dynamic";

export default async function NorCalPrepPage() {
  const user = await requireActiveUser("STUDENT");
  const enrollments = await getCurrentEnrollments(user.id);
  const roleplayEnrollments = enrollments.filter((e) => e.event.category === "ROLEPLAY");

  const now = new Date();
  const daysToMinicomp = differenceInCalendarDays(NORCAL_MINICOMP_DATE, now);
  const daysToDistrict = differenceInCalendarDays(NORCAL_DISTRICT_DATE, now);
  const nextUp =
    daysToMinicomp >= 0
      ? { label: "Chapter Mini-Competition", days: daysToMinicomp }
      : { label: "NorCal District Competition", days: daysToDistrict };

  const panels = await Promise.all(
    roleplayEnrollments
      .filter((e) => e.event.examBankId && NORCAL_DISTRICT_AREAS[e.event.slug])
      .map(async (e) => {
        const areas = NORCAL_DISTRICT_AREAS[e.event.slug];
        const [scenario1Rows, scenario2Rows] = await Promise.all([
          getNorCalPrepForEvent(e.event.examBankId!, areas.scenario1),
          areas.scenario2 ? getNorCalPrepForEvent(e.event.examBankId!, areas.scenario2) : Promise.resolve([]),
        ]);
        const grouped = new Map<string, typeof scenario1Rows>();
        grouped.set(`Scenario 1: ${areas.scenario1}`, scenario1Rows);
        if (areas.scenario2) grouped.set(`Scenario 2: ${areas.scenario2}`, scenario2Rows);
        return { eventName: e.event.name, grouped };
      }),
  );

  const uncovered = roleplayEnrollments.filter(
    (e) => !NORCAL_DISTRICT_AREAS[e.event.slug],
  );

  return (
    <BinderPageShell user={user} homeHref="/dashboard">
      <TabbedCard
        tabs={[
          { label: "Practice roleplay", href: "/roleplay/start" },
          { label: "NorCal Specific Prep", active: true },
        ]}
      >
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-semibold text-foreground">NorCal Specific Prep</h1>
          <p className="mt-1 text-foreground-muted">
            Narrowed to the exact instructional area(s) NorCal&apos;s district table assigns to each
            event&apos;s roleplay scenario(s) this year — not the full general breadth.
          </p>

          <Card className="mt-6">
            <p className="text-sm font-medium text-foreground">
              {nextUp.label}: {nextUp.days === 0 ? "today" : `${nextUp.days} days away`}
            </p>
            <p className="mt-1 text-sm text-foreground-muted">
              Chapter Mini-Competition — November 7, 2026 · NorCal District Competition —{" "}
              {NORCAL_DISTRICT_DATE_LABEL}
            </p>
          </Card>

          {panels.length === 0 && uncovered.length === 0 && (
            <p className="mt-6 text-foreground-muted">You don&apos;t have a current roleplay event.</p>
          )}

          {panels.map((panel) => (
            <PerformanceIndicatorList key={panel.eventName} eventName={panel.eventName} grouped={panel.grouped} />
          ))}

          {uncovered.map((e) => (
            <Card key={e.event.id} className="mt-6">
              <p className="text-sm text-foreground-muted">
                <span className="font-medium text-foreground">{e.event.name}</span> isn&apos;t in NorCal&apos;s
                district instructional-area table (written events aren&apos;t scenario-based the same way) —
                see the general Performance Indicators panel on the Practice roleplay tab instead.
              </p>
            </Card>
          ))}

          <Card className="mt-6 bg-accent-soft">
            <p className="text-sm text-foreground-muted">
              Case studies scoped to just these district areas are planned here next, generated for each
              scenario — not live yet.
            </p>
          </Card>
        </div>
      </TabbedCard>
    </BinderPageShell>
  );
}
