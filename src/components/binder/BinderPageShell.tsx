import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { logout } from "@/lib/actions/auth";
import type { User } from "@/generated/prisma/client";

/**
 * Shared binder/notebook page shell used across the redesigned surfaces
 * (dashboard, resources, exam runtime/results, mentor console). Renders the
 * diagonal-stripe header band with the chapter wordmark + badge, the page
 * title, the student/mentor identity chip with logout, and a left "spine"
 * column with binder-ring holes on sm+ screens. `nav` is an optional slot
 * for a right-side vertical tab rail (see BinderTabNav).
 */
export function BinderPageShell({
  user,
  homeHref,
  title,
  nav,
  children,
}: {
  user: User;
  homeHref: string;
  title: string;
  nav?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <header className="binder-header-band binder-dots sticky top-0 z-10 border-b-4 border-accent-strong">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href={homeHref} className="flex items-center gap-3">
            <Logo className="h-8 w-auto brightness-0 invert" />
            <Image
              src="/brand/mhhs-deca.png"
              alt=""
              width={120}
              height={28}
              className="hidden h-7 w-auto sm:block"
            />
          </Link>
          <h1 className="font-display text-lg font-bold uppercase tracking-wide text-white sm:text-xl">
            {title}
          </h1>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white sm:inline">
              {user.firstName} · {user.role === "MENTOR" ? "Mentor" : `Grade ${user.grade}`}
            </span>
            <form action={logout}>
              <button
                type="submit"
                aria-label="Log out"
                className="flex items-center gap-1.5 rounded-full p-2 text-white/90 transition-colors hover:bg-white/15 hover:text-white"
              >
                <LogOut className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 items-stretch">
        <div
          aria-hidden
          className="relative hidden w-6 shrink-0 border-r-4 border-dashed border-accent/30 bg-accent-soft sm:block"
        >
          <div className="sticky top-24 flex flex-col items-center gap-6 py-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="h-3 w-3 rounded-full border-2 border-border-strong bg-background"
              />
            ))}
          </div>
        </div>

        <main className="flex-1 px-4 py-8 sm:px-6">{children}</main>

        {nav && (
          <div className="hidden shrink-0 pt-8 lg:block" aria-label="Section navigation">
            {nav}
          </div>
        )}
      </div>
    </div>
  );
}
