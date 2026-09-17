import Link from "next/link";
import { requireActiveUser } from "@/lib/auth/guards";
import { getExamBanks } from "@/lib/dal/exams";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/Card";
import { UploadExamForm } from "./UploadExamForm";

export const metadata = { title: "Exam banks" };
export const dynamic = "force-dynamic";

export default async function MentorExamsPage() {
  const user = await requireActiveUser("MENTOR");
  const examBanks = await getExamBanks();

  return (
    <>
      <AppHeader user={user} homeHref="/mentor" />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Exam banks</h1>
        <p className="mt-1 text-foreground-muted">
          Upload a cluster exam PDF, then review the parsed questions before publishing.
        </p>

        <Card className="mt-6">
          <UploadExamForm examBanks={examBanks} />
        </Card>

        <div className="mt-6 space-y-3">
          {examBanks.map((bank) => (
            <Link key={bank.id} href={`/mentor/exams/${bank.id}`}>
              <Card className="flex items-center justify-between hover:bg-surface-hover">
                <span className="font-medium text-foreground">{bank.name}</span>
                <span className="text-sm text-foreground-muted">
                  {bank._count.questions} published question{bank._count.questions === 1 ? "" : "s"}
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
