import { requireActiveUser } from "@/lib/auth/guards";
import { getAllStudents } from "@/lib/dal/mentor";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { ResetPasswordButton } from "./ResetPasswordButton";
import { ToggleActiveButton } from "./ToggleActiveButton";
import { ResetBaselineButton } from "./ResetBaselineButton";

export const metadata = { title: "Students" };

export default async function MentorStudentsPage() {
  const user = await requireActiveUser("MENTOR");
  const students = await getAllStudents();

  return (
    <>
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Students</h1>
        <p className="mt-1 text-foreground-muted">{students.length} total</p>

        <div className="mt-6 space-y-3">
          {students.map((student) => (
            <Card
              key={student.id}
              className={`flex flex-wrap items-center justify-between gap-4 ${
                student.isActive ? "" : "opacity-60"
              }`}
            >
              <div>
                <p className="font-medium text-foreground">
                  {student.firstName}{" "}
                  <span className="font-normal text-foreground-subtle">
                    · School ID {student.schoolId} · Grade {student.grade}
                  </span>
                  {!student.isActive && (
                    <span className="ml-2 rounded bg-danger/20 px-1.5 py-0.5 text-xs text-danger">
                      Deactivated
                    </span>
                  )}
                </p>
                <p className="text-sm text-foreground-muted">
                  {student.enrollments.map((e) => e.event.name).join(" · ") ||
                    "No current events"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ResetPasswordButton studentId={student.id} />
                {student.examAttempts.length > 0 && (
                  <ResetBaselineButton studentId={student.id} />
                )}
                <ToggleActiveButton studentId={student.id} isActive={student.isActive} />
              </div>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
