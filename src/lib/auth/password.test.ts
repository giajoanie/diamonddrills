import { describe, expect, it } from "vitest";
import {
  generateTemporaryPassword,
  hashPassword,
  verifyPassword,
} from "./password";

describe("password hashing", () => {
  it("verifies a correct password against its hash", async () => {
    const hash = await hashPassword("correct horse battery staple");
    await expect(verifyPassword("correct horse battery staple", hash)).resolves.toBe(
      true,
    );
  });

  it("rejects an incorrect password", async () => {
    const hash = await hashPassword("correct horse battery staple");
    await expect(verifyPassword("wrong password", hash)).resolves.toBe(false);
  });

  it("never stores the plaintext password in the hash", async () => {
    const plain = "correct horse battery staple";
    const hash = await hashPassword(plain);
    expect(hash).not.toContain(plain);
  });
});

describe("generateTemporaryPassword", () => {
  it("generates a 12-character password", () => {
    expect(generateTemporaryPassword()).toHaveLength(12);
  });

  it("generates different passwords on each call", () => {
    const passwords = new Set(
      Array.from({ length: 20 }, () => generateTemporaryPassword()),
    );
    expect(passwords.size).toBe(20);
  });
});
