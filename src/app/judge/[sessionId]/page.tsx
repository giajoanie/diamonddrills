import { notFound } from "next/navigation";
import { getRoleplaySessionForJudge } from "@/lib/dal/roleplay";
import { getActiveRubrics } from "@/lib/dal/rubrics";
import { getSessionUser } from "@/lib/auth/session";
import { AuthShell } from "@/components/layout/AuthShell";
import { JudgeScoreForm } from "./JudgeScoreForm";

export const metadata = { title: "Judge Mode" };
export const dynamic = "force-dynamic";

// Deliberately no requireRole/requireActiveUser here — this link is meant to
// be opened by a mentor or a peer judge who may not have an account at all,
// straight from their phone during a live practice roleplay.
export default async function JudgeSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  const session = await getRoleplaySessionForJudge(sessionId);
  if (!session) notFound();

  const [rubrics, viewer] = await Promise.all([getActiveRubrics(), getSessionUser()]);

  return (
    <AuthShell
      title={`Judging: ${session.user.firstName}`}
      subtitle={`${session.event.name} — score this presentation live against a rubric.`}
    >
      <JudgeScoreForm
        sessionId={session.id}
        rubrics={rubrics}
        judgeDisplayName={viewer ? viewer.firstName : null}
        swapRolesWith={
          viewer && viewer.role === "STUDENT" && viewer.id !== session.user.id
            ? { partnerId: session.user.id, partnerName: session.user.firstName }
            : null
        }
      />
    </AuthShell>
  );
}
