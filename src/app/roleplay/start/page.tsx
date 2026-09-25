import Link from "next/link";
import { requireActiveUser } from "@/lib/auth/guards";
import { getCurrentEnrollments } from "@/lib/dal/events";
import { getVisibleResourcesForStudent } from "@/lib/dal/resources";
import { getPerformanceIndicatorsForEvent } from "@/lib/dal/performance-indicators";
import { getFlashcardsForCluster } from "@/lib/dal/flashcards";
import { getRoleplayPeers } from "@/lib/dal/practice-invites";
import { getRoleplayTimerPreset } from "@/lib/roleplay/timer-presets";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { CaseStudyDrawer } from "@/components/roleplay/CaseStudyDrawer";
import { StartRoleplayForm } from "./StartRoleplayForm";

export const metadata = { title: "Practice roleplay" };
export const dynamic = "force-dynamic";

export default async function StartRoleplayPage({
  searchParams,
}: {
  searchParams: Promise<{ invitePartnerId?: string }>;
}) {
  const user = await requireActiveUser("STUDENT");
  const { invitePartnerId } = await searchParams;
  const [enrollments, caseStudies] = await Promise.all([
    getCurrentEnrollments(user.id),
    getVisibleResourcesForStudent(user.id, { type: "CASE_STUDY" }),
  ]);

  const roleplayEnrollments = enrollments.filter((e) => e.event.category === "ROLEPLAY");

  const events = await Promise.all(
    roleplayEnrollments.map(async (e) => {
      const { event } = e;
      const preset = getRoleplayTimerPreset(event.format);
      const [grouped, peers, cards] = await Promise.all([
        event.examBankId
          ? getPerformanceIndicatorsForEvent(event.examBankId, event.roleplayPathway)
          : new Map<string, { description: string }[]>(),
        getRoleplayPeers(user.id, event.id),
        getFlashcardsForCluster(event.cluster.id),
      ]);

      return {
        id: event.id,
        name: event.name,
        clusterName: event.cluster.name,
        prepMinutes: preset.prepSeconds / 60,
        presentMinutes: preset.presentationSeconds / 60,
        isTeam: event.teamSizeMax > 1,
        pis: [...grouped.entries()].map(([tierLabel, items]) => ({
          tierLabel,
          items: items.map((pi) => pi.description),
        })),
        terms: cards,
        peers,
      };
    }),
  );

  return (
    <BinderPageShell user={user} homeHref="/dashboard">
      <TabbedCard ruled>
        <div className="relative">
          <CaseStudyDrawer caseStudies={caseStudies} variant="clip" />

          <div className="roleplay-subtabs flex gap-1">
            <span className="roleplay-subtab on font-display px-4 py-2 text-[13px] font-bold text-foreground">
              Practice roleplay
            </span>
            <Link
              href="/roleplay/norcal-prep"
              className="roleplay-subtab font-body px-4 py-2 text-[13px] font-semibold text-[rgba(18,58,122,.55)]"
            >
              NorCal specific prep
            </Link>
          </div>

          <div className="mt-[22px] max-w-[760px]">
            <h1 className="font-display text-2xl font-extrabold text-foreground">
              Practice roleplay
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-[rgba(18,58,122,.72)]">
              Timers match competition format. You&apos;ll get a prep period, then a presentation
              period, then a self-rating. Practice with a partner and they can score you live
              against your mentor&apos;s real rubric, too.
            </p>
          </div>

          {events.length > 0 ? (
            <StartRoleplayForm
              events={events}
              caseStudies={caseStudies}
              defaultPartnerId={invitePartnerId ?? ""}
            />
          ) : (
            <p className="mt-6 text-foreground-muted">You don&apos;t have a current roleplay event.</p>
          )}
        </div>
      </TabbedCard>
    </BinderPageShell>
  );
}
