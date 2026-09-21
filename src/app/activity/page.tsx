import { requireActiveUser } from "@/lib/auth/guards";
import { getActivityTimeline } from "@/lib/dal/analytics";
import { describeActivity } from "@/lib/analytics/activity-labels";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "Activity" };
export const dynamic = "force-dynamic";

export default async function ActivityTimelinePage() {
  const user = await requireActiveUser("STUDENT");
  const activity = await getActivityTimeline(user.id);

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Your activity</h1>
        <p className="mt-1 text-foreground-muted">
          Everything you&apos;ve done in Diamond Drills, most recent first.
        </p>

        <Card className="mt-6">
          {activity.length === 0 ? (
            <p className="text-sm text-foreground-muted">No activity yet — get started!</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {activity.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-0 last:pb-0">
                  <span className="text-foreground">{describeActivity(a.type)}</span>
                  <span className="shrink-0 text-foreground-subtle">
                    {a.createdAt.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>
    </>
  );
}
