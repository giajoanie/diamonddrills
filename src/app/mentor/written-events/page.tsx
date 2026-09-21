import Link from "next/link";
import { requireActiveUser } from "@/lib/auth/guards";
import { getWrittenEventsForMentor } from "@/lib/dal/written-events";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { getMentorTabs } from "@/lib/mentorNav";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "Written events" };
export const dynamic = "force-dynamic";

export default async function MentorWrittenEventsPage() {
  const user = await requireActiveUser("MENTOR");
  const events = await getWrittenEventsForMentor();

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard tabs={getMentorTabs()}>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold text-foreground">
              Written events
            </h1>
            <p className="mt-1 text-foreground-muted">
              Set page limits, required sections, formatting rules, and
              milestone deadlines.
            </p>

            <div className="mt-6 space-y-3">
              {events.map((e) => (
                <Link key={e.id} href={`/mentor/written-events/${e.id}`}>
                  <Card className="hover:bg-surface-hover">
                    <p className="font-medium text-foreground">{e.name}</p>
                    <p className="text-sm text-foreground-muted">
                      {e.cluster.name}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
