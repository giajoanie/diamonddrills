import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import { getRoleplaySessionForRunner } from "@/lib/dal/roleplay";
import { getActiveRubrics } from "@/lib/dal/rubrics";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { CopyLinkButton } from "@/components/roleplay/CopyLinkButton";
import { RoleplayRunner } from "./RoleplayRunner";

export const metadata = { title: "Practice roleplay" };
export const dynamic = "force-dynamic";

export default async function RoleplaySessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const user = await requireActiveUser("STUDENT");
  const { sessionId } = await params;

  const session = await getRoleplaySessionForRunner(sessionId);
  if (!session || session.userId !== user.id) notFound();
  if (session.completedAt) redirect(`/roleplay/${sessionId}/results`);

  const rubrics = await getActiveRubrics();

  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const judgeLink = host
    ? `${protocol}://${host}/judge/${session.id}`
    : `/judge/${session.id}`;

  return (
    <>
      <BinderPageShell user={user} homeHref="/dashboard">
        <TabbedCard>
          <div className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-semibold text-foreground">
              {session.event.name}
            </h1>

            <Card className="mt-4">
              <p className="font-medium text-foreground">Practice with a partner</p>
              <p className="mt-1 text-sm text-foreground-muted">
                Send this link to a mentor or a friend so they can score your
                live presentation against a real rubric, right from their
                phone. No account needed on their end.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="min-w-0 flex-1 break-all rounded-md border border-border bg-surface px-3 py-2 text-sm text-accent">
                  {judgeLink}
                </p>
                <CopyLinkButton link={judgeLink} />
              </div>
            </Card>

            <div className="mt-4">
              <RoleplayRunner
                sessionId={session.id}
                startedAtIso={session.startedAt.toISOString()}
                prepSeconds={session.prepSeconds}
                presentationSeconds={session.presentationSeconds}
                initialNotes={session.notes ?? ""}
                caseStudy={session.caseStudyResource}
                rubrics={rubrics}
              />
            </div>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
