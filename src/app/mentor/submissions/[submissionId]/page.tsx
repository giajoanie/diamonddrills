import { notFound } from "next/navigation";
import { requireActiveUser } from "@/lib/auth/guards";
import { getSubmissionForGrading } from "@/lib/dal/assignments";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { GradingForm } from "./GradingForm";

export const metadata = { title: "Grade submission" };
export const dynamic = "force-dynamic";

export default async function GradeSubmissionPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const user = await requireActiveUser("MENTOR");
  const { submissionId } = await params;

  const submission = await getSubmissionForGrading(submissionId);
  if (!submission) notFound();

  const criteria = submission.assignment.rubric?.criteria ?? [];

  return (
    <>
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">{submission.assignment.title}</h1>
        <p className="mt-1 text-foreground-muted">
          {submission.user.firstName} · {submission.user.schoolId}
          {submission.isLate ? " · Submitted late" : ""}
        </p>

        <Card className="mt-6">
          <p className="mb-2 font-medium text-foreground">Submitted files</p>
          {submission.files.length > 0 ? (
            <div className="space-y-1">
              {submission.files.map((f) => (
                <a
                  key={f.id}
                  href={`/files/${f.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-accent hover:underline"
                >
                  Version {f.versionNumber} · {f.uploadedAt.toLocaleString()}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground-muted">No files submitted yet.</p>
          )}
        </Card>

        <Card className="mt-4">
          <GradingForm
            submissionId={submission.id}
            criteria={criteria}
            existingScores={submission.rubricScores}
            existingFeedback={submission.feedback}
          />
        </Card>
      </main>
    </>
  );
}
