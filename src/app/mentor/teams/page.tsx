import { requireActiveUser } from "@/lib/auth/guards";
import { getAllTeams, getTeamEligibleEvents } from "@/lib/dal/teams";
import { getAllStudents } from "@/lib/dal/mentor";
import { removeTeamMember, disbandTeam } from "@/lib/actions/teams";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { getMentorTabs } from "@/lib/mentorNav";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TeamForm } from "./TeamForm";

export const metadata = { title: "Teams" };
export const dynamic = "force-dynamic";

export default async function MentorTeamsPage() {
  const user = await requireActiveUser("MENTOR");
  const [teams, events, students] = await Promise.all([
    getAllTeams(),
    getTeamEligibleEvents(),
    getAllStudents(),
  ]);

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard tabs={getMentorTabs()}>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold text-foreground">Teams</h1>
            <p className="mt-1 text-foreground-muted">
              Link teammates for Team Decision Making and team written events.
            </p>

            <Card className="mt-6">
              <TeamForm events={events} students={students} />
            </Card>

            <div className="mt-6 space-y-3">
              {teams
                .filter((t) => t.members.length > 0)
                .map((t) => (
                  <Card key={t.id}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-medium text-foreground">
                        {t.name ?? "Unnamed team"}{" "}
                        <span className="font-normal text-foreground-subtle">
                          · {t.event.name}
                        </span>
                      </p>
                      <form action={disbandTeam}>
                        <input type="hidden" name="teamId" value={t.id} />
                        <Button type="submit" variant="ghost">
                          Disband
                        </Button>
                      </form>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm">
                      {t.members.map((m) => (
                        <li
                          key={m.id}
                          className="flex items-center justify-between gap-3"
                        >
                          <span className="text-foreground-muted">
                            {m.user.firstName} · {m.user.schoolId}
                          </span>
                          <form action={removeTeamMember}>
                            <input
                              type="hidden"
                              name="teamMemberId"
                              value={m.id}
                            />
                            <Button type="submit" variant="ghost">
                              Remove
                            </Button>
                          </form>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              {teams.filter((t) => t.members.length > 0).length === 0 && (
                <Card>
                  <p className="text-foreground-muted">No teams yet.</p>
                </Card>
              )}
            </div>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
