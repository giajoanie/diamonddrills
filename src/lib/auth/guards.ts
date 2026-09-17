import "server-only";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";
import type { Role, User } from "@/generated/prisma/client";

/** Redirects to /login if there is no valid session. */
export async function requireUser(): Promise<User> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

/** Redirects to /login (no session) or / (wrong role) — used at the top of every mentor/student route. */
export async function requireRole(role: Role): Promise<User> {
  const user = await requireUser();
  if (user.role !== role) redirect("/");
  return user;
}
