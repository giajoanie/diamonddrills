import { requireActiveUser } from "@/lib/auth/guards";
import { getVisibleAnnouncementsForStudent } from "@/lib/dal/announcements";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "Announcements" };
export const dynamic = "force-dynamic";

export default async function StudentAnnouncementsPage() {
  const user = await requireActiveUser("STUDENT");
  const announcements = await getVisibleAnnouncementsForStudent(user.id);

  return (
    <>
      <AppHeader user={user} homeHref="/dashboard" />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Announcements</h1>

        <div className="mt-6 space-y-3">
          {announcements.map((a) => (
            <Card key={a.id}>
              <p className="font-medium text-foreground">{a.title}</p>
              <p className="mt-1 text-sm text-foreground-muted">{a.body}</p>
              <p className="mt-1 text-sm text-foreground-subtle">{a.publishAt.toLocaleString()}</p>
            </Card>
          ))}
          {announcements.length === 0 && (
            <Card>
              <p className="text-foreground-muted">No announcements yet.</p>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
