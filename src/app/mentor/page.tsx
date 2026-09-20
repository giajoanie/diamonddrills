import Link from "next/link";
import { Users, FileQuestion, BookOpen } from "lucide-react";
import { requireActiveUser } from "@/lib/auth/guards";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "Mentor dashboard" };

export default async function MentorDashboardPage() {
  const user = await requireActiveUser("MENTOR");

  return (
    <>
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome, {user.firstName}
        </h1>
        <p className="mt-1 text-foreground-muted">
          Chapter-wide analytics and lesson-plan recommendations land in
          Phase 4. For now, manage the student roster and exam banks below.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link href="/mentor/students">
            <Card className="flex items-center gap-3 hover:bg-surface-hover">
              <Users className="h-5 w-5 text-accent" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Students</p>
                <p className="text-sm text-foreground-muted">
                  View the roster, reset passwords, and manage accounts.
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/mentor/exams">
            <Card className="flex items-center gap-3 hover:bg-surface-hover">
              <FileQuestion className="h-5 w-5 text-accent" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Exam banks</p>
                <p className="text-sm text-foreground-muted">
                  Upload exam PDFs and review parsed questions before publishing.
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/mentor/resources">
            <Card className="flex items-center gap-3 hover:bg-surface-hover">
              <BookOpen className="h-5 w-5 text-accent" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Resources</p>
                <p className="text-sm text-foreground-muted">
                  Upload and tag study materials for the right students.
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </main>
    </>
  );
}
