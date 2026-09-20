import Link from "next/link";
import { requireActiveUser } from "@/lib/auth/guards";
import { getAllAssignmentsForMentor } from "@/lib/dal/assignments";
import { getAllStudents } from "@/lib/dal/mentor";
import { getClustersForTagging } from "@/lib/dal/clusters";
import { getActiveRubrics } from "@/lib/dal/rubrics";
import { getAllResourcesForMentor } from "@/lib/dal/resources";
import { getExamBanks } from "@/lib/dal/exams";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { deactivateAssignment } from "@/lib/actions/assignments";
import { AssignmentForm } from "./AssignmentForm";

export const metadata = { title: "Assignments" };
export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  FILE_SUBMISSION: "File submission",
  EXAM: "Timed exam",
  PRACTICE_ROLEPLAY: "Roleplay practice",
};

const TARGET_LABELS: Record<string, string> = {
  EVERYONE: "Everyone",
  GRADE: "Grade",
  EVENT: "Event",
  CLUSTER: "Cluster",
  INDIVIDUAL: "Student",
};

function describeTargets(targets: { targetType: string; grade: number | null; event: { name: string } | null }[]) {
  if (targets.some((t) => t.targetType === "EVERYONE")) return "Everyone";
  return targets
    .map((t) => {
      if (t.targetType === "GRADE") return `Grade ${t.grade}`;
      if (t.targetType === "EVENT") return t.event?.name ?? "Event";
      return TARGET_LABELS[t.targetType] ?? t.targetType;
    })
    .join(", ");
}

export default async function MentorAssignmentsPage() {
  const user = await requireActiveUser("MENTOR");
  const [assignments, students, clusters, rubrics, allResources, examBanks] = await Promise.all([
    getAllAssignmentsForMentor(),
    getAllStudents(),
    getClustersForTagging(),
    getActiveRubrics(),
    getAllResourcesForMentor(),
    getExamBanks(),
  ]);

  const resources = allResources.filter((r) => r.isActive);

  return (
    <>
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Assignments</h1>
        <p className="mt-1 text-foreground-muted">
          Create file-submission, exam, or roleplay-prep assignments for students.
        </p>

        <Card className="mt-6">
          <AssignmentForm
            clusters={clusters}
            students={students}
            rubrics={rubrics}
            resources={resources}
            examBanks={examBanks}
          />
        </Card>

        <div className="mt-6 space-y-3">
          {assignments.map((a) => (
            <Card
              key={a.id}
              className={`flex flex-wrap items-start justify-between gap-3 ${a.isActive ? "" : "opacity-50"}`}
            >
              <div>
                <p className="font-medium text-foreground">
                  <Link href={`/mentor/assignments/${a.id}`} className="hover:underline">
                    {a.title}
                  </Link>{" "}
                  <span className="font-normal text-foreground-subtle">
                    · {TYPE_LABELS[a.type]}
                  </span>
                </p>
                <p className="text-sm text-foreground-muted">
                  Due {a.dueAt.toLocaleString()} · {describeTargets(a.targets)}
                  {a.rubric ? ` · Rubric: ${a.rubric.name}` : ""}
                  {a.resources.length > 0
                    ? ` · Resources: ${a.resources.map((r) => r.resource.name).join(", ")}`
                    : ""}
                </p>
                <p className="text-sm text-foreground-subtle">
                  {a._count.submissions} submission{a._count.submissions === 1 ? "" : "s"}
                </p>
              </div>
              {a.isActive && (
                <form action={deactivateAssignment}>
                  <input type="hidden" name="assignmentId" value={a.id} />
                  <Button type="submit" variant="ghost">
                    Deactivate
                  </Button>
                </form>
              )}
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
