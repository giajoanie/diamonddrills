import Link from "next/link";
import { requireActiveUser } from "@/lib/auth/guards";
import { getWrittenEventsForMentor } from "@/lib/dal/written-events";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "Written events" };
export const dynamic = "force-dynamic";

export default async function MentorWrittenEventsPage() {
  const user = await requireActiveUser("MENTOR");
  const events = await getWrittenEventsForMentor();

  return (
    <>
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Written events</h1>
        <p className="mt-1 text-foreground-muted">
          Set page limits, required sections, formatting rules, and milestone deadlines.
        </p>

        <div className="mt-6 space-y-3">
          {events.map((e) => (
            <Link key={e.id} href={`/mentor/written-events/${e.id}`}>
              <Card className="hover:bg-surface-hover">
                <p className="font-medium text-foreground">{e.name}</p>
                <p className="text-sm text-foreground-muted">{e.cluster.name}</p>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
