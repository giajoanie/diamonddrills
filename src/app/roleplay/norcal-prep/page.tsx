import Link from "next/link";
import { differenceInCalendarDays } from "date-fns";
import { requireActiveUser } from "@/lib/auth/guards";
import { getCurrentEnrollments } from "@/lib/dal/events";
import { getVisibleResourcesForStudent } from "@/lib/dal/resources";
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
import { CaseStudyDrawer } from "@/components/roleplay/CaseStudyDrawer";

export const metadata = { title: "NorCal Specific Prep" };
export const dynamic = "force-dynamic";

const MONTH_ABBREV = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const COMPETITIONS = [
  {
    level: "CHAPTER",
    title: "Chapter Mini-Competition",
    sub: "Sat, Nov 7, 2026",
    start: NORCAL_MINICOMP_DATE,
    note: "blue" as const,
    tiltDeg: -0.6,
  },
  {
    level: "DISTRICT",
    title: "NorCal District Competition",
    sub: NORCAL_DISTRICT_DATE_LABEL,
    start: NORCAL_DISTRICT_DATE,
    note: "yellow" as const,
    tiltDeg: 0.5,
  },
];

export default async function NorCalPrepPage() {
  const user = await requireActiveUser("STUDENT");
  const [enrollments, caseStudies] = await Promise.all([
    getCurrentEnrollments(user.id),
    getVisibleResourcesForStudent(user.id, { type: "CASE_STUDY" }),
  ]);
  const roleplayEnrollments = enrollments.filter((e) => e.event.category === "ROLEPLAY");

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const panels = await Promise.all(
    roleplayEnrollments
      .filter((e) => e.event.examBankId && NORCAL_DISTRICT_AREAS[e.event.slug])
      .map(async (e) => {
        const areas = NORCAL_DISTRICT_AREAS[e.event.slug];
        const [scenario1Rows, scenario2Rows] = await Promise.all([
          getNorCalPrepForEvent(e.event.examBankId!, areas.scenario1),
          areas.scenario2 ? getNorCalPrepForEvent(e.event.examBankId!, areas.scenario2) : Promise.resolve([]),
        ]);
        const scenarios = [
          { label: "Scenario 1", area: areas.scenario1, pis: scenario1Rows },
          ...(areas.scenario2 ? [{ label: "Scenario 2", area: areas.scenario2, pis: scenario2Rows }] : []),
        ];
        return { eventName: e.event.name, scenarios };
      }),
  );

  const uncovered = roleplayEnrollments.filter((e) => !NORCAL_DISTRICT_AREAS[e.event.slug]);

  return (
    <BinderPageShell user={user} homeHref="/dashboard">
      <TabbedCard ruled>
        <div className="relative">
          <CaseStudyDrawer caseStudies={caseStudies} variant="clip-counted" />

          <div className="roleplay-subtabs flex gap-1">
            <Link
              href="/roleplay/start"
              className="roleplay-subtab font-body px-4 py-2 text-[13px] font-semibold text-[rgba(18,58,122,.55)]"
            >
              Practice roleplay
            </Link>
            <span className="roleplay-subtab on font-display px-4 py-2 text-[13px] font-bold text-foreground">
              NorCal specific prep
            </span>
          </div>

          <div className="mt-[22px] max-w-[760px]">
            <h1 className="font-display text-2xl font-extrabold text-foreground">NorCal specific prep</h1>
            <p className="mt-1.5 text-sm leading-relaxed text-[rgba(18,58,122,.72)]">
              Only the instructional areas NorCal&apos;s district table assigns to each roleplay
              scenario this year, not the full general list.
            </p>
          </div>

          <div className="mt-[26px] grid max-w-[920px] grid-cols-1 gap-[22px] sm:grid-cols-2">
            {COMPETITIONS.map((c) => {
              const days = Math.max(0, differenceInCalendarDays(c.start, now));
              return (
                <div
                  key={c.title}
                  className={`progress-note relative flex items-center gap-[18px] rounded-none px-5 py-4 ${
                    c.note === "blue" ? "bg-[#eaf2ff]" : "bg-[#fff6dc] border-[rgba(138,100,18,.2)]"
                  }`}
                  style={{ transform: `rotate(${c.tiltDeg}deg)` }}
                >
                  <div className="progress-note-tape" style={{ left: "26px", width: "72px", transform: "rotate(-3deg)" }} />
                  <div className="roleplay-date-badge flex-none bg-white px-0 pb-0.5 pt-[5px] text-center" style={{ width: 58 }}>
                    <div className="font-display text-[10px] font-bold tracking-[.1em] text-[#c0392b]">
                      {MONTH_ABBREV[c.start.getMonth()]}
                    </div>
                    <div className="font-hand text-[25px] leading-none">{c.start.getDate()}</div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-[11px] font-bold tracking-[.08em] text-accent">{c.level}</div>
                    <div className="font-display mt-0.5 text-base font-bold text-foreground">{c.title}</div>
                    <div className="mt-0.5 text-xs text-[rgba(18,58,122,.62)]">{c.sub}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-hand text-[36px] leading-none">{days}</div>
                    <div className="font-hand text-sm text-[rgba(18,58,122,.6)]">days away</div>
                  </div>
                </div>
              );
            })}
          </div>

          {panels.length === 0 && uncovered.length === 0 && (
            <p className="mt-6 text-foreground-muted">You don&apos;t have a current roleplay event.</p>
          )}

          {panels.map((panel) => (
            <PerformanceIndicatorList
              key={panel.eventName}
              eventName={panel.eventName}
              scenarios={panel.scenarios}
            />
          ))}

          {uncovered.map((e) => (
            <Card key={e.event.id} className="mt-6">
              <p className="text-sm text-foreground-muted">
                <span className="font-medium text-foreground">{e.event.name}</span> isn&apos;t in
                NorCal&apos;s district instructional-area table (written events aren&apos;t
                scenario-based the same way) — see the general Performance Indicators panel on the
                Practice roleplay tab instead.
              </p>
            </Card>
          ))}
        </div>
      </TabbedCard>
    </BinderPageShell>
  );
}
