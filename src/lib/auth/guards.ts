import "server-only";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";
import type { Role, User } from "@/generated/prisma/client";

/**
 * Redirects to /login if there is no valid session.
 *
 * Call this from every protected page.tsx, Server Action, and Route Handler
 * — NOT only from a shared layout.tsx. Next.js 16's partial rendering means
 * layouts don't re-run on client-side navigation between sibling routes, so
 * a layout-only check would not re-verify the session on every route change.
 * (`getSessionUser` is React-`cache()`-memoized, so calling this again from
 * a page whose layout already called it costs no extra query.)
 */
export async function requireUser(): Promise<User> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

/** Redirects to /login (no session) or / (wrong role). Same call-site rule as requireUser. */
export async function requireRole(role: Role): Promise<User> {
  const user = await requireUser();
  if (user.role !== role) redirect("/");
  return user;
}

/**
 * Same as requireRole, but also redirects to /change-password when the
 * account has a forced password change pending. Use this at the top of
 * every dashboard/app route; the /change-password page itself uses
 * requireUser directly so it doesn't redirect to itself.
 */
export async function requireActiveUser(role: Role): Promise<User> {
  const user = await requireRole(role);
  if (user.mustChangePassword) redirect("/change-password");
  return user;
}
