import { requireActiveUser } from "@/lib/auth/guards";
import { getAllCalendarEvents, getCalendarMilestonesForViewer } from "@/lib/dal/announcements";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { CalendarView } from "./CalendarView";

export const metadata = { title: "Competition calendar" };
export const dynamic = "force-dynamic";

export default async function StudentCalendarPage() {
  const user = await requireActiveUser("STUDENT");
  const [competitions, milestones] = await Promise.all([
    getAllCalendarEvents(),
    getCalendarMilestonesForViewer(user.id),
  ]);

  return (
    <BinderPageShell user={user} homeHref="/dashboard">
      <TabbedCard ruled>
        <CalendarView
          competitions={competitions}
          milestones={milestones}
          currentUserId={user.id}
          now={new Date()}
        />
      </TabbedCard>
    </BinderPageShell>
  );
}
