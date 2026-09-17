import Link from "next/link";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { logout } from "@/lib/actions/auth";
import type { User } from "@/generated/prisma/client";

export function AppHeader({ user, homeHref }: { user: User; homeHref: string }) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={homeHref} className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground-muted">
            {user.firstName} · {user.role === "MENTOR" ? "Mentor" : `Grade ${user.grade}`}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
