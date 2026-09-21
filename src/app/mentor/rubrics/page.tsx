import { requireActiveUser } from "@/lib/auth/guards";
import { getAllRubrics } from "@/lib/dal/rubrics";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { deactivateRubric } from "@/lib/actions/rubrics";
import { RubricForm } from "./RubricForm";

export const metadata = { title: "Rubrics" };
export const dynamic = "force-dynamic";

export default async function MentorRubricsPage() {
  const user = await requireActiveUser("MENTOR");
  const rubrics = await getAllRubrics();

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-semibold text-foreground">Rubrics</h1>
            <p className="mt-1 text-foreground-muted">
              Build scoring rubrics here, then attach them to assignments.
            </p>

            <Card className="mt-6">
              <RubricForm />
            </Card>

            <div className="mt-6 space-y-3">
              {rubrics.map((r) => {
                const totalPoints = r.criteria.reduce(
                  (sum, c) => sum + c.maxPoints,
                  0,
                );
                return (
                  <Card
                    key={r.id}
                    className={`space-y-3 ${r.isActive ? "" : "opacity-50"}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">
                          {r.name}{" "}
                          <span className="font-normal text-foreground-subtle">
                            · {totalPoints} pts
                          </span>
                        </p>
                        {r.description && (
                          <p className="text-sm text-foreground-muted">
                            {r.description}
                          </p>
                        )}
                      </div>
                      {r.isActive && (
                        <form action={deactivateRubric}>
                          <input type="hidden" name="rubricId" value={r.id} />
                          <Button type="submit" variant="ghost">
                            Deactivate
                          </Button>
                        </form>
                      )}
                    </div>
                    <ul className="space-y-1 text-sm text-foreground-muted">
                      {r.criteria.map((c) => (
                        <li
                          key={c.id}
                          className="flex items-center justify-between gap-3"
                        >
                          <span>
                            {c.name}
                            {c.description ? ` — ${c.description}` : ""}
                          </span>
                          <span className="shrink-0 text-foreground-subtle">
                            {c.maxPoints} pts
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
