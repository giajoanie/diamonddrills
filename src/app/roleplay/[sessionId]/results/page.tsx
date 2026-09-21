import { notFound } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import {
  getRoleplaySessionForRunner,
  getJudgeScoresForSession,
} from "@/lib/dal/roleplay";
import { getAllRubrics } from "@/lib/dal/rubrics";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
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
  if (!session || session.userId !== user.id || !session.completedAt)
    notFound();

  const selfRatings =
    (session.selfRatings as Record<string, number> | null) ?? {};
  const criterionIds = Object.keys(selfRatings);

  const [rubrics, judgeScores] = await Promise.all([
    getAllRubrics(),
    getJudgeScoresForSession(sessionId),
  ]);
  const criteriaById = new Map(
    rubrics.flatMap((r) => r.criteria.map((c) => [c.id, c] as const)),
  );

  const totalEarned = criterionIds.reduce(
    (sum, id) => sum + selfRatings[id],
    0,
  );
  const totalPossible = criterionIds.reduce(
    (sum, id) => sum + (criteriaById.get(id)?.maxPoints ?? 0),
    0,
  );

  return (
    <>
      <BinderPageShell user={user} homeHref="/dashboard">
        <TabbedCard>
          <div className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-semibold text-foreground">
              {session.event.name}
            </h1>
            <p className="mt-1 text-foreground-muted">
              Practiced {session.startedAt.toLocaleString()}
            </p>

            <Card className="mt-6">
              <p className="mb-2 font-medium text-foreground">Self-rating</p>
              <ul className="space-y-1 text-sm">
                {criterionIds.map((id) => {
                  const criterion = criteriaById.get(id);
                  return (
                    <li
                      key={id}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-foreground-muted">
                        {criterion?.name ?? id}
                      </span>
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
                <p className="whitespace-pre-wrap text-sm text-foreground-muted">
                  {session.notes}
                </p>
              </Card>
            )}

            {judgeScores.length > 0 && (
              <Card className="mt-4">
                <p className="mb-2 font-medium text-foreground">
                  Judge feedback
                </p>
                <div className="space-y-4">
                  {judgeScores.map((js) => {
                    const scores = (js.scores as Record<string, number>) ?? {};
                    const ids = Object.keys(scores);
                    const earned = ids.reduce((sum, id) => sum + scores[id], 0);
                    const possible = ids.reduce(
                      (sum, id) => sum + (criteriaById.get(id)?.maxPoints ?? 0),
                      0,
                    );
                    const judgeDisplayName =
                      js.judgeName ?? js.judge?.firstName ?? "A judge";
                    return (
                      <div
                        key={js.id}
                        className="border-t border-border pt-3 first:border-0 first:pt-0"
                      >
                        <p className="text-sm font-medium text-foreground">
                          {judgeDisplayName} · {earned} / {possible}
                        </p>
                        <ul className="mt-1 space-y-1 text-sm">
                          {ids.map((id) => (
                            <li
                              key={id}
                              className="flex items-center justify-between gap-3"
                            >
                              <span className="text-foreground-muted">
                                {criteriaById.get(id)?.name ?? id}
                              </span>
                              <span className="text-foreground-subtle">
                                {scores[id]} /{" "}
                                {criteriaById.get(id)?.maxPoints ?? "?"}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {js.comments && (
                          <p className="mt-2 whitespace-pre-wrap text-sm text-foreground-muted">
                            {js.comments}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
