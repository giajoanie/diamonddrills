import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// NOTE: pass the connection string directly, not `{ connectionString }` —
// the object form silently drops the username in this adapter-pg version,
// producing a cryptic "no PostgreSQL user name specified" error at query time.
const adapter = new PrismaPg(process.env.DATABASE_URL as string);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
