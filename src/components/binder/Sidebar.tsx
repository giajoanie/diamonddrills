"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";

type NavItem = { label: string; href: string; matchPrefix?: string };

const STUDENT_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Exams", href: "/exam/start", matchPrefix: "/exam" },
  { label: "Practice", href: "/roleplay/start", matchPrefix: "/roleplay" },
  { label: "Resources", href: "/resources" },
  { label: "Assignments", href: "/assignments" },
  { label: "Study plan", href: "/study-plan" },
  { label: "My progress", href: "/progress" },
  { label: "Calendar", href: "/calendar" },
];

const MENTOR_NAV: NavItem[] = [
  { label: "Overview", href: "/mentor" },
  { label: "Students", href: "/mentor/students" },
  { label: "Exam bank", href: "/mentor/exams" },
  { label: "Resources", href: "/mentor/resources" },
  { label: "Rubrics", href: "/mentor/rubrics" },
  { label: "Assignments", href: "/mentor/assignments" },
  { label: "Written events", href: "/mentor/written-events" },
  { label: "Lesson plans", href: "/mentor/lesson-plans" },
  { label: "Competition results", href: "/mentor/competition-results" },
  { label: "Teams", href: "/mentor/teams" },
  { label: "Announcements", href: "/mentor/announcements" },
  { label: "Calendar", href: "/mentor/calendar" },
  { label: "Exports", href: "/mentor/exports" },
  { label: "PM CDE Impact", href: "/mentor/pm-cde-impact" },
];

function pickActive(items: NavItem[], pathname: string): NavItem | undefined {
  let best: NavItem | undefined;
  for (const item of items) {
    const prefix = item.matchPrefix ?? item.href;
    const matches = pathname === item.href || pathname.startsWith(`${prefix}/`) || pathname === prefix;
    if (matches && (!best || prefix.length > (best.matchPrefix ?? best.href).length)) {
      best = item;
    }
  }
  return best;
}

/**
 * The persistent left navigation rail, present on every authenticated page
 * via BinderPageShell — unlike the old per-page top folder-tabs, this is
 * never conditionally omitted, so there's always a way to get anywhere else
 * in the app regardless of which page you're currently on.
 */
export function Sidebar({
  role,
  identity,
}: {
  role: "STUDENT" | "MENTOR";
  identity: { name: string; sub: string; id: string };
}) {
  const pathname = usePathname();
  const items = role === "MENTOR" ? MENTOR_NAV : STUDENT_NAV;
  const active = pickActive(items, pathname);

  return (
    <div className="shell-diamond-bg flex h-full w-60 shrink-0 flex-col overflow-y-auto">
      <Link href={role === "MENTOR" ? "/mentor" : "/dashboard"} className="flex items-center gap-2 px-5 pt-6 pb-4">
        <span className="flex h-6 w-6 shrink-0 rotate-45 items-center justify-center rounded-[6px] bg-highlight" aria-hidden />
        <span className="font-display text-base font-bold text-white">Diamond Drills</span>
      </Link>

      <nav className="flex flex-col gap-1 px-3">
        {items.map((item) => {
          const isActive = active?.href === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg border-l-4 px-3 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-highlight bg-background-elevated text-accent-strong"
                  : "border-transparent text-white/85 hover:bg-white/15 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-3">
        <div className="rounded-lg bg-white/10 p-3">
          <p className="text-sm font-semibold text-white">{identity.name}</p>
          <p className="text-xs text-white/70">
            {identity.sub} · ID {identity.id}
          </p>
          <form action={logout} className="mt-2">
            <button
              type="submit"
              className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              Log out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
