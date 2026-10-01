/**
 * Force-resets a mentor account's password to a new random temporary one,
 * for when there's no other mentor/admin left to use the in-app
 * resetStudentPassword flow (that one is scoped to mentors resetting
 * *student* passwords only — see src/lib/actions/mentor.ts). Mirrors that
 * flow's behavior: new temp password, mustChangePassword forced, lockout
 * cleared, all existing sessions destroyed.
 *
 * The temp password is printed once below and nowhere else — it isn't
 * stored anywhere in plaintext (passwordHash is one-way argon2), so this is
 * the only record of it. Write it down before closing this terminal.
 *
 * Usage: NODE_OPTIONS=--conditions=react-server npx tsx scripts/reset-mentor-password.ts <schoolId>
 */
import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { generateTemporaryPassword, hashPassword } from "@/lib/auth/password";
import { destroyAllSessionsForUser } from "@/lib/auth/session";

async function main() {
  const schoolId = process.argv[2];
  if (!schoolId) {
    console.error("Usage: npx tsx scripts/reset-mentor-password.ts <schoolId>");
    process.exitCode = 1;
    return;
  }

  const mentor = await prisma.user.findFirst({ where: { schoolId, role: "MENTOR" } });
  if (!mentor) {
    console.error(`No mentor account found with schoolId ${schoolId}.`);
    process.exitCode = 1;
    return;
  }

  const tempPassword = generateTemporaryPassword();
  const passwordHash = await hashPassword(tempPassword);

  await prisma.user.update({
    where: { id: mentor.id },
    data: { passwordHash, mustChangePassword: true, failedLoginAttempts: 0, lockedUntil: null },
  });
  await destroyAllSessionsForUser(mentor.id);

  console.log(`Password reset for mentor ${schoolId} (${mentor.program}).`);
  console.log(`Temporary password: ${tempPassword}`);
  console.log("They'll be forced to set a new password on next login.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
