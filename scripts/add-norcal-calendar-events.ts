/**
 * One-off add of the two NorCal competition dates to the calendar, per
 * src/lib/norcal-district-areas.ts. Idempotent by title — safe to re-run.
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/add-norcal-calendar-events.ts
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";
import {
  NORCAL_MINICOMP_DATE,
  NORCAL_DISTRICT_DATE,
  NORCAL_DISTRICT_DATE_LABEL,
} from "@/lib/norcal-district-areas";

const EVENTS = [
  {
    title: "Chapter Mini-Competition",
    description: "Internal chapter mock competition.",
    date: NORCAL_MINICOMP_DATE,
    level: null,
  },
  {
    title: "NorCal District Competition",
    description: `Regional/district competition, ${NORCAL_DISTRICT_DATE_LABEL}.`,
    date: NORCAL_DISTRICT_DATE,
    level: "DISTRICT" as const,
  },
];

async function main() {
  const mentor = await prisma.user.findFirst({
    where: { role: "MENTOR", isActive: true },
    orderBy: { createdAt: "asc" },
  });
  if (!mentor) throw new Error("No active mentor account found to attribute these calendar events to.");

  for (const event of EVENTS) {
    const existing = await prisma.calendarEvent.findFirst({ where: { title: event.title } });
    if (existing) {
      await prisma.calendarEvent.update({
        where: { id: existing.id },
        data: { date: event.date, description: event.description, level: event.level },
      });
      console.log(`${event.title}: updated`);
    } else {
      await prisma.calendarEvent.create({
        data: { ...event, createdById: mentor.id },
      });
      console.log(`${event.title}: created`);
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
