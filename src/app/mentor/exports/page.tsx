import { requireActiveUser } from "@/lib/auth/guards";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { Label, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "CSV exports" };

const EXPORT_TYPES: { type: string; label: string; description: string }[] = [
  {
    type: "students",
    label: "Students",
    description: "Roster without passwords.",
  },
  {
    type: "exam-attempts",
    label: "Exam attempts",
    description: "One row per completed attempt.",
  },
  {
    type: "question-responses",
    label: "Per-question responses",
    description: "One row per answered question.",
  },
  {
    type: "instructional-area-results",
    label: "Instructional area results",
    description: "Accuracy per student per area.",
  },
  {
    type: "rubric-scores",
    label: "Rubric scores",
    description: "One row per scored criterion.",
  },
  {
    type: "activity-logs",
    label: "Activity logs",
    description: "Engagement events across the platform.",
  },
  {
    type: "competition-results",
    label: "Competition results",
    description: "Placements and scores.",
  },
];

export default async function ExportsPage() {
  const user = await requireActiveUser("MENTOR");

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold text-foreground">
              CSV exports
            </h1>
            <p className="mt-1 text-foreground-muted">
              Download chapter data as CSV, filtered by date range. Student
              exports never include passwords.
            </p>

            {EXPORT_TYPES.map(({ type, label, description }) => (
              <Card key={type} className="mt-4">
                <form
                  action={`/mentor/exports/${type}`}
                  method="GET"
                  target="_blank"
                >
                  <p className="font-medium text-foreground">{label}</p>
                  <p className="mb-3 text-sm text-foreground-muted">
                    {description}
                  </p>
                  {type !== "students" && (
                    <div className="mb-3 flex flex-wrap items-end gap-3">
                      <div>
                        <Label htmlFor={`${type}-dateFrom`}>From</Label>
                        <Input
                          id={`${type}-dateFrom`}
                          name="dateFrom"
                          type="date"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`${type}-dateTo`}>To</Label>
                        <Input
                          id={`${type}-dateTo`}
                          name="dateTo"
                          type="date"
                        />
                      </div>
                    </div>
                  )}
                  <label className="mb-3 flex items-center gap-2 text-sm text-foreground">
                    <input type="checkbox" name="anonymize" value="1" />
                    Anonymize student IDs
                  </label>
                  <Button type="submit" variant="secondary">
                    Download CSV
                  </Button>
                </form>
              </Card>
            ))}
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
