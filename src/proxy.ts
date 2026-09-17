import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

/**
 * Optimistic-only check (cookie presence, not validity) to bounce obviously
 * signed-out visitors before a render. The authoritative check is
 * requireUser/requireRole in each page — see DECISIONS.md and
 * node_modules/next/dist/docs/.../guides/authentication.md
 * ("Optimistic checks with Proxy").
 */
export function proxy(request: NextRequest) {
  const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME);
  if (!hasSessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/mentor/:path*", "/change-password"],
};
