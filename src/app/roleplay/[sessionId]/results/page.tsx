import { notFound } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import { getRoleplaySessionForRunner } from "@/lib/dal/roleplay";
import { getAllRubrics } from "@/lib/dal/rubrics";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "Roleplay self-rating results" };
export const dynamic = "force-dynamic";

export default async function RoleplayResultsPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const user = await requireActiveUser("STUDENT");
  const { sessionId } = await params;

  const session = await getRoleplaySessionForRunner(sessionId);
  if (!session || session.userId !== user.id || !session.completedAt) notFound();

  const selfRatings = (session.selfRatings as Record<string, number> | null) ?? {};
  const criterionIds = Object.keys(selfRatings);

  const rubrics = await getAllRubrics();
  const criteriaById = new Map(
    rubrics.flatMap((r) => r.criteria.map((c) => [c.id, c] as const)),
  );

  const totalEarned = criterionIds.reduce((sum, id) => sum + selfRatings[id], 0);
  const totalPossible = criterionIds.reduce((sum, id) => sum + (criteriaById.get(id)?.maxPoints ?? 0), 0);

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">{session.event.name}</h1>
        <p className="mt-1 text-foreground-muted">
          Practiced {session.startedAt.toLocaleString()}
        </p>

        <Card className="mt-6">
          <p className="mb-2 font-medium text-foreground">Self-rating</p>
          <ul className="space-y-1 text-sm">
            {criterionIds.map((id) => {
              const criterion = criteriaById.get(id);
              return (
                <li key={id} className="flex items-center justify-between gap-3">
                  <span className="text-foreground-muted">{criterion?.name ?? id}</span>
                  <span className="text-foreground-subtle">
                    {selfRatings[id]} / {criterion?.maxPoints ?? "?"}
                  </span>
                </li>
              );
            })}
          </ul>
          {criterionIds.length > 0 && (
            <p className="mt-3 border-t border-border pt-3 text-sm font-medium text-foreground">
              Total: {totalEarned} / {totalPossible}
            </p>
          )}
        </Card>

        {session.notes && (
          <Card className="mt-4">
            <p className="mb-2 font-medium text-foreground">Notes</p>
            <p className="whitespace-pre-wrap text-sm text-foreground-muted">{session.notes}</p>
          </Card>
        )}
      </main>
    </>
  );
}
