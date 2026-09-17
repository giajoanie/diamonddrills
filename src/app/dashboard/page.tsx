import { requireActiveUser } from "@/lib/auth/guards";
import { getCurrentEnrollments, getSignupEventOptions } from "@/lib/dal/events";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { EventSwitcher } from "./EventSwitcher";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  // Per-page check (not layout-only) — see DECISIONS.md on Next 16 partial rendering.
  const user = await requireActiveUser("STUDENT");
  const [enrollments, clusters] = await Promise.all([
    getCurrentEnrollments(user.id),
    getSignupEventOptions(),
  ]);

  const roleplay = enrollments.find((e) => e.event.category === "ROLEPLAY");
  const written = enrollments.find((e) => e.event.category === "WRITTEN");
  const hasBaseline = false; // exam engine lands in Phase 2

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome, {user.firstName}
        </h1>

        {!hasBaseline && (
          <Card className="mt-4 border-accent/40 bg-accent-soft">
            <p className="text-sm text-foreground">
              You haven&apos;t taken your Baseline Diagnostic yet. The exam engine
              is coming in Phase 2 — once it&apos;s live, this banner will link
              straight to it.
            </p>
          </Card>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
              Roleplay event
            </p>
            <p className="mt-1 font-medium text-foreground">{roleplay?.event.name}</p>
            <p className="text-sm text-foreground-muted">{roleplay?.event.cluster.name}</p>
            {roleplay && (
              <EventSwitcher
                category="ROLEPLAY"
                currentEventId={roleplay.event.id}
                clusters={clusters}
              />
            )}
          </Card>

          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
              Written event
            </p>
            <p className="mt-1 font-medium text-foreground">{written?.event.name}</p>
            <p className="text-sm text-foreground-muted">{written?.event.cluster.name}</p>
            {written && (
              <EventSwitcher
                category="WRITTEN"
                currentEventId={written.event.id}
                clusters={clusters}
              />
            )}
          </Card>
        </div>
      </main>
    </>
  );
}
