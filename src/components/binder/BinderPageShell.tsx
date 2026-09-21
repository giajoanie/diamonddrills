import Link from "next/link";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";
import type { User } from "@/generated/prisma/client";

/**
 * Shared binder/notebook page chrome: a full-bleed dark "shell" mat
 * (diagonal stripe + dot texture, matching the mockups) with a ring-hole
 * spine down the left edge and a small top row (home link, identity/logout
 * when authenticated). Does not impose a tabs/card structure on its
 * children — pages that want the folder-tab + ruled-paper-card look (see
 * FolderTabs + the `binder-ruled` CSS class) compose that themselves, since
 * some (like the signup wizard) need the active tab driven by client state.
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
  return (
    <div className="shell-diamond-bg min-h-full flex-1">
      <div className="mx-auto max-w-6xl px-3 py-6 sm:px-6">
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <Link href={homeHref} className="text-sm font-bold text-white/90 hover:text-white">
            Diamond Drills
          </Link>
          {user && (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-white/80 sm:inline">
                {user.firstName} · {user.role === "MENTOR" ? "Mentor" : `Grade ${user.grade}`}
              </span>
              <form action={logout}>
                <button
                  type="submit"
                  aria-label="Log out"
                  className="flex items-center gap-1.5 rounded-full p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                </button>
              </form>
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
