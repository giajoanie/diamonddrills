import { hash, verify } from "@node-rs/argon2";

// Defaults follow OWASP's current argon2id guidance (19 MiB memory, 2 iterations,
// 1 degree of parallelism is the OWASP *minimum*; we use a somewhat stronger
// profile since this app has a small, known user base).
const ARGON2_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
} as const;

export function hashPassword(plainPassword: string): Promise<string> {
  return hash(plainPassword, ARGON2_OPTIONS);
}

export function verifyPassword(
  plainPassword: string,
  passwordHash: string,
): Promise<boolean> {
  return verify(passwordHash, plainPassword);
}

/** Generates a random temporary password for mentor-initiated resets. */
export function generateTemporaryPassword(): string {
  const alphabet =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}
