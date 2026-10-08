/**
 * One-off: adds "EBL Minicomp" to the calendar — EBL's first competition
 * this cycle (Nov 14, 2026). CalendarEvent visibility is scoped by
 * createdBy.program (see getUpcomingCalendarEvents in
 * src/lib/dal/announcements.ts), so it's attributed to an active EBL
 * mentor to make it visible only to EBL students/mentors. Idempotent by
 * (title, date) — safe to re-run.
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/add-ebl-minicomp.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
  const mentor = await prisma.user.findFirst({
    where: { role: "MENTOR", isActive: true, program: "EBL" },
  });
  if (!mentor) {
    console.log("No active EBL mentor found to attribute this to — aborting.");
    return;
  }

  const date = new Date("2026-11-14");

  const existing = await prisma.calendarEvent.findFirst({ where: { title: "EBL Minicomp", date } });
  if (existing) {
    console.log("EBL Minicomp is already on the calendar, skipped.");
    return;
  }

  await prisma.calendarEvent.create({
    data: { title: "EBL Minicomp", date, createdById: mentor.id },
  });
  console.log(`Created "EBL Minicomp" on ${date.toDateString()}, attributed to mentor ${mentor.schoolId}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
