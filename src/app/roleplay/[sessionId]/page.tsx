import { notFound, redirect } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import { getRoleplaySessionForRunner } from "@/lib/dal/roleplay";
import { getActiveRubrics } from "@/lib/dal/rubrics";
import { AppHeader } from "@/components/layout/AppHeader";
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

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">{session.event.name}</h1>
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
