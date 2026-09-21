import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import { getRoleplaySessionForRunner } from "@/lib/dal/roleplay";
import { getActiveRubrics } from "@/lib/dal/rubrics";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
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
  const judgeLink = host ? `${protocol}://${host}/judge/${session.id}` : `/judge/${session.id}`;

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">{session.event.name}</h1>

        <Card className="mt-4">
          <p className="font-medium text-foreground">Judge Mode</p>
          <p className="mt-1 text-sm text-foreground-muted">
            Hand this link to a mentor or teammate so they can score your live presentation from
            their phone. No account needed.
          </p>
          <p className="mt-2 break-all rounded-md border border-border bg-surface px-3 py-2 text-sm text-accent">
            {judgeLink}
          </p>
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
      </main>
    </>
  );
}
