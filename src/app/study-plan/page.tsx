import { requireActiveUser } from "@/lib/auth/guards";
import { getStudyPlan, getNextCompetitionDate } from "@/lib/dal/study-plan";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { RegenerateStudyPlanForm } from "./RegenerateStudyPlanForm";
import { StudyPlanItemRow } from "./StudyPlanItemRow";

export const metadata = { title: "Study plan" };
export const dynamic = "force-dynamic";

export default async function StudyPlanPage() {
  const user = await requireActiveUser("STUDENT");
  const [items, competition] = await Promise.all([
    getStudyPlan(user.id),
    getNextCompetitionDate(),
  ]);

  const pending = items.filter((i) => !i.completed);
  const done = items.filter((i) => i.completed);

  return (
    <>
      <BinderPageShell user={user} homeHref="/dashboard">
        <TabbedCard>
          <div className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-semibold text-foreground">
              Study plan
            </h1>
            <p className="mt-1 text-foreground-muted">
              {competition
                ? `A schedule of practice sessions on your weakest areas leading up to ${competition.title} on ${competition.date.toLocaleDateString()}.`
                : "No upcoming competition date is on the calendar yet."}
            </p>

            <Card className="mt-4">
              <RegenerateStudyPlanForm hasExistingPlan={pending.length > 0} />
            </Card>

            <Card className="mt-4">
              <p className="mb-2 font-medium text-foreground">
                Upcoming sessions
              </p>
              {pending.length === 0 ? (
                <p className="text-sm text-foreground-muted">
                  No sessions scheduled yet — generate a plan above.
                </p>
              ) : (
                <ul className="space-y-2">
                  {pending.map((item) => (
                    <StudyPlanItemRow key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </Card>

            {done.length > 0 && (
              <Card className="mt-4">
                <p className="mb-2 font-medium text-foreground">Completed</p>
                <ul className="space-y-2">
                  {done.map((item) => (
                    <StudyPlanItemRow key={item.id} item={item} />
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
