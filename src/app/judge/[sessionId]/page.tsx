import { notFound } from "next/navigation";
import { getRoleplaySessionForJudge } from "@/lib/dal/roleplay";
import { getActiveRubrics } from "@/lib/dal/rubrics";
import { getSessionUser } from "@/lib/auth/session";
import { getCaseStudyPerformanceIndicators } from "@/lib/case-study-format";
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

  const [rubrics, viewer] = await Promise.all([
    getActiveRubrics(session.user.program, session.event.id),
    getSessionUser(),
  ]);

  const caseStudyPIs = session.caseStudyResource?.description
    ? getCaseStudyPerformanceIndicators(session.caseStudyResource.description)
    : [];

  return (
    <AuthShell
      wide
      title={`Judging: ${session.user.firstName}`}
      subtitle={`${session.event.name} — score this presentation live against a rubric.`}
    >
      {session.caseStudyResource && (
        <div className="mb-4">
          <p className="text-sm text-foreground-muted">
            Case study:{" "}
            <span className="font-medium text-foreground">{session.caseStudyResource.name}</span>
          </p>
          {session.caseStudyResource.description && (
            <details className="mt-2 rounded-md border border-border bg-surface-hover p-3 text-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Case study &amp; your judging instructions
              </summary>
              {/* Unlike every student-facing reader, the judge sees this
                 unredacted — the "FOR YOUR PRACTICE PARTNER (JUDGE ROLE)"
                 section at the end is exactly what they're supposed to ask. */}
              <div className="mt-2 whitespace-pre-wrap text-foreground-muted">
                {session.caseStudyResource.description}
              </div>
            </details>
          )}
        </div>
      )}
      <JudgeScoreForm
        sessionId={session.id}
        rubrics={rubrics}
        caseStudyPIs={caseStudyPIs}
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
