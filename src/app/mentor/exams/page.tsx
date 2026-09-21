import Link from "next/link";
import { requireActiveUser } from "@/lib/auth/guards";
import { getExamBanks } from "@/lib/dal/exams";
import { BinderPageShell } from "@/components/binder/BinderPageShell";
import { TabbedCard } from "@/components/binder/TabbedCard";
import { Card } from "@/components/ui/Card";
import { UploadExamForm } from "./UploadExamForm";

export const metadata = { title: "Exam banks" };
export const dynamic = "force-dynamic";

export default async function MentorExamsPage() {
  const user = await requireActiveUser("MENTOR");
  const examBanks = await getExamBanks();

  return (
    <>
      <BinderPageShell user={user} homeHref="/mentor">
        <TabbedCard>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-semibold text-foreground">
              Exam banks
            </h1>
            <p className="mt-1 text-foreground-muted">
              Upload a cluster exam PDF, then review the parsed questions before
              publishing.
            </p>

            <Card className="mt-6">
              <UploadExamForm examBanks={examBanks} />
            </Card>

            <div className="mt-6 space-y-3">
              {examBanks.map((bank) => (
                <Link key={bank.id} href={`/mentor/exams/${bank.id}`}>
                  <Card className="flex items-center justify-between hover:bg-surface-hover">
                    <span className="font-medium text-foreground">
                      {bank.name}
                    </span>
                    <span className="text-sm text-foreground-muted">
                      {bank._count.questions} published question
                      {bank._count.questions === 1 ? "" : "s"}
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </TabbedCard>
      </BinderPageShell>
    </>
  );
}
