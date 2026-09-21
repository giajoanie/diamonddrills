/**
 * Removes everything created by `npm run db:seed-demo`, in dependency
 * order (deleting a Rubric/Assignment/Team before its still-referencing
 * rows would fail on the DB's foreign key constraints, since none of those
 * relations cascade from a *demo student* deletion the way a student's own
 * exam attempts, roleplay sessions, etc. do — see schema comments).
 *
 * Safe to run even if nothing was ever seeded (every step is a no-op then).
 * Never touches the base reference data (`npm run db:seed`) or real mentor
 * accounts — only rows tagged with the demo markers documented in
 * seed-demo.ts (schoolId prefix "9000", or a "[Demo]" title/name/note
 * prefix for mentor-authored content).
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";

const DEMO_SCHOOL_ID_PREFIX = "9000";

async function main() {
  const demoStudents = await prisma.user.findMany({
    where: { schoolId: { startsWith: DEMO_SCHOOL_ID_PREFIX } },
    select: { id: true },
  });
  const demoStudentIds = demoStudents.map((s) => s.id);

  // 1. RubricScore rows referencing a demo-authored rubric's criteria — must
  //    go before the rubric itself, regardless of who scored them.
  const demoRubricScores = await prisma.rubricScore.deleteMany({
    where: { criterion: { rubric: { name: { startsWith: "[Demo]" } } } },
  });

  // 2. Submissions — either belonging to a demo student, or to a demo assignment.
  const demoSubmissions = await prisma.submission.deleteMany({
    where: {
      OR: [{ userId: { in: demoStudentIds } }, { assignment: { title: { startsWith: "[Demo]" } } }],
    },
  });

  // 3. Competition results and intervention logs for demo students.
  const demoResults = await prisma.competitionResult.deleteMany({ where: { userId: { in: demoStudentIds } } });
  const demoInterventions = await prisma.interventionLog.deleteMany({ where: { studentId: { in: demoStudentIds } } });

  // 4. Demo-authored assignments and rubrics (cascades their own targets/criteria).
  const demoAssignments = await prisma.assignment.deleteMany({ where: { title: { startsWith: "[Demo]" } } });
  const demoRubrics = await prisma.rubric.deleteMany({ where: { name: { startsWith: "[Demo]" } } });

  // 5. Demo teams (cascades TeamMember; CompetitionResult.teamId rows are already gone from step 3).
  const demoTeams = await prisma.team.deleteMany({ where: { name: { startsWith: "[Demo]" } } });

  // 6. Demo calendar events.
  const demoCalendarEvents = await prisma.calendarEvent.deleteMany({ where: { title: { startsWith: "[Demo]" } } });

  // 7. The demo student accounts themselves — cascades everything else that's
  //    genuinely owned by them (Session, EventEnrollment, TeamMember,
  //    ExamAttempt + questions, MissedQuestion, ActivityLog,
  //    RoleplayPracticeSession + its RubricScores/JudgeScores,
  //    MasteryEstimate, StudyPlanItem).
  const demoUsers = await prisma.user.deleteMany({ where: { schoolId: { startsWith: DEMO_SCHOOL_ID_PREFIX } } });

  console.log("Removed demo dataset:");
  console.log(`  ${demoRubricScores.count} demo rubric scores`);
  console.log(`  ${demoSubmissions.count} demo submissions`);
  console.log(`  ${demoResults.count} demo competition results`);
  console.log(`  ${demoInterventions.count} demo intervention logs`);
  console.log(`  ${demoAssignments.count} demo assignments`);
  console.log(`  ${demoRubrics.count} demo rubrics`);
  console.log(`  ${demoTeams.count} demo teams`);
  console.log(`  ${demoCalendarEvents.count} demo calendar events`);
  console.log(`  ${demoUsers.count} demo student accounts (and everything cascaded from them)`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
