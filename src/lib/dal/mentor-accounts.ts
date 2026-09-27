import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

// Mentor accounts are chapter-admin data, not student data — every mentor
// (HS or EBL) can see the full mentor roster across both programs so
// they know who else administers the chapter, even though student rosters
// stay fully separate by program.
export const getAllMentors = cache(async () => {
  return prisma.user.findMany({
    where: { role: "MENTOR" },
    select: {
      id: true,
      schoolId: true,
      firstName: true,
      program: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
});
