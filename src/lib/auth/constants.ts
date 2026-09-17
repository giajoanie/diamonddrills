// Kept dependency-free (no Prisma, no "server-only") so it can be safely
// imported from proxy.ts, which runs before the rest of the app's imports.
export const SESSION_COOKIE_NAME = "deca_hub_session";
