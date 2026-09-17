import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

/** Full student roster for the mentor student-list view. */
export const getAllStudents = cache(async () => {
  return prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: [{ isActive: "desc" }, { firstName: "asc" }],
    include: {
      enrollments: {
        where: { isCurrent: true },
        include: { event: { include: { cluster: true } } },
      },
      examAttempts: {
        where: { isBaseline: true },
        select: { id: true },
      },
    },
  });
});
