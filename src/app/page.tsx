import Link from "next/link";
import {
  ClipboardCheck,
  LineChart,
  Repeat,
  Target,
  Trophy,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const loopSteps = [
  { icon: Target, label: "Diagnose", detail: "Baseline exam by event" },
  { icon: Repeat, label: "Practice", detail: "Targeted drills by area" },
  { icon: LineChart, label: "Analyze", detail: "Instructional-area breakdown" },
  { icon: ClipboardCheck, label: "Reassess", detail: "Growth vs. baseline" },
  { icon: Trophy, label: "Compete", detail: "Record placements" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Diamond Drills
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            A closed-loop training system for DECA Roleplay and Written events.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-foreground-muted">
            Not a resource library with quizzes bolted on. Every practice
            session, exam, and submission feeds one loop: diagnose, practice,
            analyze, recommend, reassess, and measure growth toward
            competition.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary">Log in</Button>
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {loopSteps.map(({ icon: Icon, label, detail }) => (
              <Card key={label} className="flex flex-col items-start gap-2">
                <Icon className="h-5 w-5 text-accent" aria-hidden />
                <div className="font-medium text-foreground">{label}</div>
                <div className="text-sm text-foreground-muted">{detail}</div>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
