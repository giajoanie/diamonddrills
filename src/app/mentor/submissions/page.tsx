import Link from "next/link";
import { requireActiveUser } from "@/lib/auth/guards";
import { getUngradedSubmissionsQueue } from "@/lib/dal/analytics";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "Ungraded submissions" };
export const dynamic = "force-dynamic";

export default async function UngradedSubmissionsPage() {
  const user = await requireActiveUser("MENTOR");
  const submissions = await getUngradedSubmissionsQueue();

  return (
    <>
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Ungraded submissions</h1>
        <p className="mt-1 text-foreground-muted">{submissions.length} waiting for feedback</p>

        <div className="mt-6 space-y-3">
          {submissions.map((s) => (
            <Link key={s.id} href={`/mentor/submissions/${s.id}`}>
              <Card className="flex flex-wrap items-center justify-between gap-3 hover:bg-surface-hover">
                <div>
                  <p className="font-medium text-foreground">{s.assignment.title}</p>
                  <p className="text-sm text-foreground-muted">
                    {s.user.firstName} · {s.user.schoolId}
                  </p>
                </div>
                <p className="text-sm text-foreground-subtle">
                  {s.isLate ? "Late" : "Submitted"} · {s.submittedAt?.toLocaleString()}
                </p>
              </Card>
            </Link>
          ))}
          {submissions.length === 0 && (
            <Card>
              <p className="text-foreground-muted">Nothing waiting for feedback.</p>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
