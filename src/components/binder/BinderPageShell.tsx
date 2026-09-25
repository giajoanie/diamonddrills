import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Sidebar } from "./Sidebar";
import type { User } from "@/generated/prisma/client";

/**
 * Shared page chrome. When a user is present, renders the persistent left
 * Sidebar (always the same nav, on every page — unlike the old per-page top
 * folder-tabs, which some pages passed and others didn't, leaving no way
 * back except the browser's own back button) plus a light content area.
 * Pages that don't have a user yet (signup) get a plain light page with
 * just a home-linked logo up top.
 */
export function BinderPageShell({
  user,
  homeHref,
  children,
}: {
  user?: User;
  homeHref: string;
  children: React.ReactNode;
}) {
  if (!user) {
    return (
      <div className="min-h-dvh bg-background">
        <div className="mx-auto max-w-5xl px-3 py-6 sm:px-6">
          <Link href={homeHref} className="mb-3 block">
            <Logo className="h-7 w-auto" />
          </Link>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-background">
      <Sidebar
        role={user.role}
        identity={{
          name: user.firstName,
          sub: user.role === "MENTOR" ? "Mentor" : `Grade ${user.grade}`,
          id: user.schoolId,
        }}
      />
      <div className="min-w-0 flex-1 px-4 py-6 sm:px-8">{children}</div>
    </div>
  );
}
