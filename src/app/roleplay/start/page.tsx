import { requireActiveUser } from "@/lib/auth/guards";
import { getCurrentEnrollments } from "@/lib/dal/events";
import { getVisibleResourcesForStudent } from "@/lib/dal/resources";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { StartRoleplayForm } from "./StartRoleplayForm";

export const metadata = { title: "Practice roleplay" };
export const dynamic = "force-dynamic";

export default async function StartRoleplayPage() {
  const user = await requireActiveUser("STUDENT");
  const [enrollments, caseStudies] = await Promise.all([
    getCurrentEnrollments(user.id),
    getVisibleResourcesForStudent(user.id, { type: "CASE_STUDY" }),
  ]);

  const roleplayEvents = enrollments
    .filter((e) => e.event.category === "ROLEPLAY")
    .map((e) => ({ id: e.event.id, name: e.event.name }));

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Practice roleplay</h1>
        <p className="mt-1 text-foreground-muted">
          Timers match competition format. You&apos;ll get a prep period, then a presentation period,
          then a self-rating.
        </p>

        <Card className="mt-6">
          {roleplayEvents.length > 0 ? (
            <StartRoleplayForm events={roleplayEvents} caseStudies={caseStudies} />
          ) : (
            <p className="text-foreground-muted">You don&apos;t have a current roleplay event.</p>
          )}
        </Card>
      </main>
    </>
  );
}
