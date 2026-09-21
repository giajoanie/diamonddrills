/**
 * Seeds a demo dataset — fake students with realistic exam history,
 * roleplay sessions, submissions, competition results, and more — so the
 * platform can be demoed or tested with populated dashboards.
 *
 * Every demo record is clearly tagged so it can be found and removed
 * cleanly before real production use: student accounts use schoolIds
 * "9000001"-"9000006" and firstNames prefixed "Demo"; any mentor-authored
 * content this script creates (assignments, rubrics, a calendar event) has
 * its title/name prefixed "[Demo]". Run `npm run db:remove-demo` to strip
 * all of it back out — see prisma/remove-demo.ts.
 *
 * Requires the base reference data (`npm run db:seed`) to already exist.
 * Safe to re-run — upserts students, skips work that's already done.
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { pickRandomSubset, shuffleOptionOrder } from "@/lib/exam-engine/shuffle";
import { computeScore } from "@/lib/exam-engine/scoring";
import { computeNextDueAt } from "@/lib/exam-engine/spaced-repetition";
import { predictMastery } from "@/lib/analytics/mastery";
import type { OptionKey } from "@/generated/prisma/client";

const DEMO_PASSWORD = "DemoStudent2026!";
const DEMO_STUDENTS = [
  { schoolId: "9000001", firstName: "DemoAna", grade: 9 },
  { schoolId: "9000002", firstName: "DemoBen", grade: 10 },
  { schoolId: "9000003", firstName: "DemoChen", grade: 10 },
  { schoolId: "9000004", firstName: "DemoDia", grade: 11 },
  { schoolId: "9000005", firstName: "DemoEli", grade: 12 },
  { schoolId: "9000006", firstName: "DemoFin", grade: 12 },
];

function daysAgo(n: number): Date {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000);
}

/** Writes one finalized ExamAttempt directly (bypassing the action layer, like the rest of this seed script), simulating a chosen accuracy rate. */
async function seedExamAttempt(
  userId: string,
  examBankId: string,
  eventId: string | undefined,
  questionPool: { id: string; correctOption: OptionKey | null }[],
  opts: { mode: "BASELINE" | "TIMED_FULL" | "PRACTICE_BY_AREA"; isBaseline: boolean; accuracy: number; daysAgoSubmitted: number; questionCount: number },
) {
  const selected = pickRandomSubset(questionPool, Math.min(opts.questionCount, questionPool.length));
  if (selected.length === 0) return null;

  const submittedAt = daysAgo(opts.daysAgoSubmitted);
  const attempt = await prisma.examAttempt.create({
    data: {
      userId,
      examBankId,
      eventId,
      mode: opts.mode,
      isBaseline: opts.isBaseline,
      timeLimitSeconds: 90 * 60,
      questionCount: selected.length,
      status: "SUBMITTED",
      serverStartTime: daysAgo(opts.daysAgoSubmitted),
      submittedAt,
      timeUsedSeconds: 60 * 60,
      createdAt: daysAgo(opts.daysAgoSubmitted),
    },
  });

  const targetCorrect = Math.round(selected.length * opts.accuracy);
  const rows = selected.map((q, i) => {
    const isCorrect = i < targetCorrect && q.correctOption !== null;
    const studentAnswer = isCorrect
      ? q.correctOption
      : (["A", "B", "C", "D"] as const).find((k) => k !== q.correctOption) ?? "A";
    return {
      examAttemptId: attempt.id,
      questionId: q.id,
      orderIndex: i,
      optionOrder: shuffleOptionOrder(),
      studentAnswer,
      isCorrect,
      answeredAt: submittedAt,
    };
  });
  await prisma.examAttemptQuestion.createMany({ data: rows });

  const { score, percentage } = computeScore(
    rows.map((r) => ({ correctOption: selected.find((q) => q.id === r.questionId)!.correctOption, studentAnswer: r.studentAnswer })),
  );
  await prisma.examAttempt.update({ where: { id: attempt.id }, data: { score, percentage } });

  await prisma.activityLog.create({
    data: { userId, type: "EXAM_START", metadata: { attemptId: attempt.id, mode: opts.mode }, createdAt: daysAgo(opts.daysAgoSubmitted) },
  });
  await prisma.activityLog.create({
    data: { userId, type: "EXAM_COMPLETE", metadata: { attemptId: attempt.id, status: "SUBMITTED" }, createdAt: submittedAt },
  });

  // A missed question or two per attempt, so spaced-repetition review has something to show.
  for (const row of rows.filter((r) => !r.isCorrect).slice(0, 2)) {
    const question = selected.find((q) => q.id === row.questionId)!;
    await prisma.missedQuestion.upsert({
      where: { userId_questionId: { userId, questionId: question.id } },
      update: { timesMissed: { increment: 1 }, lastSeenAt: submittedAt, nextDueAt: computeNextDueAt(0, submittedAt) },
      create: {
        userId,
        questionId: question.id,
        examBankId,
        timesMissed: 1,
        correctStreak: 0,
        nextDueAt: computeNextDueAt(0, submittedAt),
      },
    });
  }

  return attempt;
}

async function main() {
  const mentor = await prisma.user.findFirst({ where: { role: "MENTOR" } });
  if (!mentor) {
    throw new Error("No mentor account found — run `npm run db:seed` first to create the base reference data.");
  }

  const event = await prisma.event.findUnique({
    where: { slug: "food-marketing-series" },
    include: { examBank: { include: { questions: { where: { isActive: true } } } } },
  });
  if (!event) throw new Error("Expected event 'food-marketing-series' from the base seed data — run `npm run db:seed` first.");

  const tdmEvent = await prisma.event.findUnique({ where: { slug: "buying-and-merchandising-team-decision-making" } });
  const questionPool = event.examBank?.questions ?? [];
  if (questionPool.length === 0) {
    console.warn("No active exam questions found — exam attempts will be skipped. Run `npm run db:import-exams` first for full demo data.");
  }

  const passwordHash = await hashPassword(DEMO_PASSWORD);
  const students = [];
  for (const s of DEMO_STUDENTS) {
    const student = await prisma.user.upsert({
      where: { schoolId: s.schoolId },
      update: {},
      create: { schoolId: s.schoolId, role: "STUDENT", firstName: s.firstName, grade: s.grade, passwordHash, mustChangePassword: false },
    });
    students.push(student);

    const existingEnrollment = await prisma.eventEnrollment.findFirst({
      where: { userId: student.id, eventId: event.id, isCurrent: true },
    });
    if (!existingEnrollment) {
      await prisma.eventEnrollment.create({ data: { userId: student.id, eventId: event.id } });
    }
  }
  console.log(`Seeded ${students.length} demo students.`);

  // Realistic improving trend: baseline low, later attempts climbing — the
  // exact story a before/after chart and the PM CDE dashboard want to show.
  if (questionPool.length > 0 && event.examBankId) {
    for (const [i, student] of students.entries()) {
      const startingAccuracy = 0.35 + (i % 3) * 0.05;
      await seedExamAttempt(student.id, event.examBankId, event.id, questionPool, {
        mode: "BASELINE",
        isBaseline: true,
        accuracy: startingAccuracy,
        daysAgoSubmitted: 60,
        questionCount: 30,
      });
      await seedExamAttempt(student.id, event.examBankId, event.id, questionPool, {
        mode: "PRACTICE_BY_AREA",
        isBaseline: false,
        accuracy: startingAccuracy + 0.1,
        daysAgoSubmitted: 30,
        questionCount: 20,
      });
      const latest = await seedExamAttempt(student.id, event.examBankId, event.id, questionPool, {
        mode: "TIMED_FULL",
        isBaseline: false,
        accuracy: startingAccuracy + 0.25,
        daysAgoSubmitted: 5,
        questionCount: 30,
      });

      // Mastery estimates, so Progress/mentor profile pages have something to show.
      if (latest) {
        const areaIds = [...new Set(questionPool.map((q: { instructionalAreaId?: string | null }) => q.instructionalAreaId).filter((id): id is string => !!id))];
        for (const areaId of areaIds.slice(0, 3)) {
          const results = await prisma.examAttemptQuestion.findMany({
            where: { question: { instructionalAreaId: areaId }, examAttempt: { userId: student.id } },
            select: { isCorrect: true },
          });
          const { estimatedMastery } = predictMastery(results.map((r) => r.isCorrect ?? false));
          await prisma.masteryEstimate.upsert({
            where: { userId_instructionalAreaId: { userId: student.id, instructionalAreaId: areaId } },
            update: { estimatedMastery },
            create: { userId: student.id, examBankId: event.examBankId, instructionalAreaId: areaId, estimatedMastery },
          });
        }
      }
    }
    console.log("Seeded exam history, missed questions, and mastery estimates for demo students.");
  }

  // Roleplay practice, one with a judge score, so Judge Mode has something to show.
  const rubric = await prisma.rubric.findFirst({ where: { isActive: true }, include: { criteria: true } });
  for (const [i, student] of students.slice(0, 3).entries()) {
    const session = await prisma.roleplayPracticeSession.create({
      data: {
        userId: student.id,
        eventId: event.id,
        prepSeconds: 600,
        presentationSeconds: 600,
        notes: "Demo prep notes.",
        startedAt: daysAgo(10),
        completedAt: daysAgo(10),
        selfRatings: rubric ? Object.fromEntries(rubric.criteria.map((c) => [c.id, Math.round(c.maxPoints * 0.7)])) : undefined,
      },
    });
    if (i === 0 && rubric) {
      await prisma.judgeScore.create({
        data: {
          roleplaySessionId: session.id,
          judgeId: mentor.id,
          scores: Object.fromEntries(rubric.criteria.map((c) => [c.id, Math.round(c.maxPoints * 0.8)])),
          comments: "Strong opening, work on your close. (Demo judge score.)",
        },
      });
    }
  }
  console.log("Seeded roleplay sessions (one with a demo judge score).");

  // Team linking, if the TDM event exists.
  if (tdmEvent && students.length >= 2) {
    const existingTeam = await prisma.team.findFirst({ where: { eventId: tdmEvent.id, name: "[Demo] Team A" } });
    if (!existingTeam) {
      const team = await prisma.team.create({ data: { eventId: tdmEvent.id, name: "[Demo] Team A" } });
      for (const student of students.slice(0, 2)) {
        await prisma.eventEnrollment.upsert({
          where: { id: `${student.id}-${tdmEvent.id}` }, // never matches; forces the create branch below via catch
          update: {},
          create: { userId: student.id, eventId: tdmEvent.id },
        }).catch(async () => {
          const exists = await prisma.eventEnrollment.findFirst({ where: { userId: student.id, eventId: tdmEvent.id, isCurrent: true } });
          if (!exists) await prisma.eventEnrollment.create({ data: { userId: student.id, eventId: tdmEvent.id } });
        });
        await prisma.teamMember.create({ data: { teamId: team.id, userId: student.id } });
      }
      console.log("Seeded a demo team.");
    }
  }

  // Competition results — a mix of advanced/not, for the PM CDE outcomes breakdown.
  for (const [i, student] of students.entries()) {
    const existing = await prisma.competitionResult.findFirst({ where: { userId: student.id, notes: "[Demo]" } });
    if (existing) continue;
    await prisma.competitionResult.create({
      data: {
        userId: student.id,
        eventId: event.id,
        year: new Date().getFullYear(),
        level: "DISTRICT",
        placement: i + 1,
        testScore: 60 + i * 5,
        advanced: i < 3,
        notes: "[Demo]",
        recordedById: mentor.id,
      },
    });
  }
  console.log("Seeded demo competition results.");

  // Intervention logs, for the intervention-tracking analytics.
  for (const student of students.slice(0, 2)) {
    const existing = await prisma.interventionLog.findFirst({ where: { studentId: student.id, note: { startsWith: "[Demo]" } } });
    if (!existing) {
      await prisma.interventionLog.create({
        data: { studentId: student.id, mentorId: mentor.id, note: "[Demo] 1:1 session on weak instructional areas." },
      });
    }
  }
  console.log("Seeded demo intervention logs.");

  // A demo assignment + rubric-graded submission, so grading/exports have something to show.
  const existingAssignment = await prisma.assignment.findFirst({ where: { title: "[Demo] Practice Roleplay Notes" } });
  const assignment =
    existingAssignment ??
    (await prisma.assignment.create({
      data: {
        creatorId: mentor.id,
        title: "[Demo] Practice Roleplay Notes",
        instructions: "Upload your prep notes from a practice roleplay.",
        type: "FILE_SUBMISSION",
        dueAt: daysAgo(-14),
        targets: { create: [{ targetType: "EVENT", eventId: event.id }] },
      },
    }));
  for (const student of students.slice(0, 2)) {
    await prisma.submission.upsert({
      where: { assignmentId_userId: { assignmentId: assignment.id, userId: student.id } },
      update: {},
      create: {
        assignmentId: assignment.id,
        userId: student.id,
        status: "GRADED",
        submittedAt: daysAgo(7),
        gradedAt: daysAgo(5),
        gradedById: mentor.id,
        feedback: "[Demo] Nice structure — tighten your Q&A responses.",
      },
    });
  }
  console.log("Seeded a demo assignment with graded submissions.");

  // A calendar event, if none exists yet, so the study-plan generator has a competition date to target.
  const hasCompetition = await prisma.calendarEvent.findFirst({ where: { level: { not: null }, date: { gte: new Date() } } });
  if (!hasCompetition) {
    await prisma.calendarEvent.create({
      data: {
        title: "[Demo] District Competition",
        date: daysAgo(-45),
        level: "DISTRICT",
        createdById: mentor.id,
      },
    });
    console.log("Seeded a demo competition calendar event.");
  }

  console.log(`\nDone. Demo students can log in with schoolId 9000001-9000006 and password "${DEMO_PASSWORD}".`);
  console.log("Run `npm run db:remove-demo` to remove all of this before real production use.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
