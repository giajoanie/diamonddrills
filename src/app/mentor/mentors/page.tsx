import { requireActiveUser } from "@/lib/auth/guards";
import { getAllMentors } from "@/lib/dal/mentor-accounts";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { getMentorTabs } from "@/lib/mentorNav";
import { Card } from "@/components/ui/Card";
import { CreateMentorForm } from "./CreateMentorForm";
import { ToggleMentorActiveButton } from "./ToggleMentorActiveButton";

export const metadata = { title: "Mentor accounts" };
export const dynamic = "force-dynamic";

const PROGRAM_LABELS: Record<string, string> = {
  HIGH_SCHOOL: "High School",
  EBL: "EBL",
};

export default async function MentorAccountsPage() {
  const user = await requireActiveUser("MENTOR");
  const mentors = await getAllMentors();

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard tabs={getMentorTabs()}>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold text-foreground">
              Mentor accounts
            </h1>
            <p className="mt-1 text-foreground-muted">
              Create and manage mentor logins for both High School and EBL.
              There&apos;s no separate admin role — any mentor can add another.
            </p>

            <div className="mt-6">
              <CreateMentorForm />
            </div>

            <div className="mt-6 space-y-3">
              {mentors.map((mentor) => (
                <Card
                  key={mentor.id}
                  className={`flex flex-wrap items-center justify-between gap-4 ${
                    mentor.isActive ? "" : "opacity-60"
                  }`}
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {mentor.firstName}{" "}
                      <span className="font-normal text-foreground-muted">
                        · School ID {mentor.schoolId} ·{" "}
                        {PROGRAM_LABELS[mentor.program] ?? mentor.program}
                      </span>
                      {!mentor.isActive && (
                        <span className="ml-2 rounded bg-danger/20 px-1.5 py-0.5 text-xs text-danger">
                          Deactivated
                        </span>
                      )}
                      {mentor.id === user.id && (
                        <span className="ml-2 rounded bg-surface-hover px-1.5 py-0.5 text-xs text-foreground-subtle">
                          You
                        </span>
                      )}
                    </p>
                  </div>
                  {mentor.id !== user.id && (
                    <ToggleMentorActiveButton
                      mentorId={mentor.id}
                      isActive={mentor.isActive}
                    />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
