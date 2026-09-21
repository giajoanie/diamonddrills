import { requireActiveUser } from "@/lib/auth/guards";
import { getCurrentEnrollments } from "@/lib/dal/events";
import { getWrittenEventWorkspace } from "@/lib/dal/written-events";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { PresentationTimer } from "./PresentationTimer";

export const metadata = { title: "Written event" };
export const dynamic = "force-dynamic";

export default async function StudentWrittenEventPage() {
  const user = await requireActiveUser("STUDENT");
  const enrollments = await getCurrentEnrollments(user.id);
  const written = enrollments.find((e) => e.event.category === "WRITTEN");

  if (!written) {
    return (
      <>
        <BinderPageShell user={user} homeHref="/dashboard">
          <TabbedCard>
            <div className="mx-auto max-w-3xl">
              <Card>
                <p className="text-foreground-muted">
                  You&apos;re not enrolled in a written event.
                </p>
              </Card>
            </div>
          </TabbedCard>
        </BinderPageShell>
      </>
    );
  }

  const workspace = await getWrittenEventWorkspace(written.event.id);
  const checklist = workspace?.checklist;
  const milestones = workspace?.milestones ?? [];
  const requiredSections = Array.isArray(checklist?.requiredSections)
    ? (checklist.requiredSections as string[])
    : [];
  const formattingNotes =
    checklist?.formattingRequirements &&
    typeof checklist.formattingRequirements === "object"
      ? ((checklist.formattingRequirements as { notes?: string }).notes ?? "")
      : "";
  const now = new Date();

  return (
    <>
      <BinderPageShell user={user} homeHref="/dashboard">
        <TabbedCard>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold text-foreground">
              {written.event.name}
            </h1>
            <p className="mt-1 text-foreground-muted">
              {written.event.cluster.name}
            </p>

            <Card className="mt-6">
              <p className="mb-2 font-medium text-foreground">Checklist</p>
              {checklist?.pageLimit && (
                <p className="text-sm text-foreground-muted">
                  Page limit: {checklist.pageLimit}
                </p>
              )}
              {requiredSections.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-foreground-muted">
                    Required sections
                  </p>
                  <ul className="mt-1 list-inside list-disc text-sm text-foreground">
                    {requiredSections.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {formattingNotes && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-foreground-muted">
                    Formatting requirements
                  </p>
                  <p className="whitespace-pre-wrap text-sm text-foreground">
                    {formattingNotes}
                  </p>
                </div>
              )}
              {!checklist?.pageLimit &&
                requiredSections.length === 0 &&
                !formattingNotes && (
                  <p className="text-sm text-foreground-muted">
                    Your mentor hasn&apos;t set a checklist yet.
                  </p>
                )}
            </Card>

            <Card className="mt-4">
              <p className="mb-2 font-medium text-foreground">Milestones</p>
              {milestones.length > 0 ? (
                <ul className="space-y-1">
                  {milestones.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="text-foreground">{m.name}</span>
                      <span
                        className={
                          m.dueAt < now
                            ? "text-danger"
                            : "text-foreground-muted"
                        }
                      >
                        {m.dueAt.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-foreground-muted">
                  No milestones set yet.
                </p>
              )}
            </Card>

            <Card className="mt-4">
              <PresentationTimer />
            </Card>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
