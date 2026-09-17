import { describe, expect, it } from "vitest";
import {
  ChangePasswordSchema,
  LoginSchema,
  SchoolIdSchema,
  SignupSchema,
} from "./auth";

describe("SchoolIdSchema", () => {
  it("accepts exactly 7 digits", () => {
    expect(SchoolIdSchema.safeParse("1234567").success).toBe(true);
  });

  it.each(["123456", "12345678", "123456a", "", "  1234567  "])(
    "rejects %s unless it trims to exactly 7 digits",
    (value) => {
      const result = SchoolIdSchema.safeParse(value);
      expect(result.success).toBe(value.trim() === "1234567");
    },
  );
});

describe("SignupSchema", () => {
  const valid = {
    schoolId: "1234567",
    firstName: "Alex",
    password: "password123",
    confirmPassword: "password123",
    grade: "10",
    roleplayEventId: "evt_roleplay",
    writtenEventId: "evt_written",
  };

  it("accepts a fully valid signup payload", () => {
    expect(SignupSchema.safeParse(valid).success).toBe(true);
  });

  it("coerces grade to a number", () => {
    const result = SignupSchema.safeParse(valid);
    expect(result.success && result.data.grade).toBe(10);
  });

  it("rejects mismatched passwords", () => {
    const result = SignupSchema.safeParse({
      ...valid,
      confirmPassword: "different123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.confirmPassword).toBeDefined();
    }
  });

  it("rejects a password shorter than 8 characters", () => {
    const result = SignupSchema.safeParse({
      ...valid,
      password: "short",
      confirmPassword: "short",
    });
    expect(result.success).toBe(false);
  });

  it.each(["8", "13", "0", "-1"])("rejects out-of-range grade %s", (grade) => {
    const result = SignupSchema.safeParse({ ...valid, grade });
    expect(result.success).toBe(false);
  });

  it("rejects a missing event selection", () => {
    const result = SignupSchema.safeParse({ ...valid, roleplayEventId: "" });
    expect(result.success).toBe(false);
  });
});

describe("LoginSchema", () => {
  it("accepts a school ID and non-empty password", () => {
    expect(
      LoginSchema.safeParse({ schoolId: "1234567", password: "x" }).success,
    ).toBe(true);
  });

  it("rejects an empty password", () => {
    expect(
      LoginSchema.safeParse({ schoolId: "1234567", password: "" }).success,
    ).toBe(false);
  });
});

describe("ChangePasswordSchema", () => {
  it("rejects when new password and confirmation differ", () => {
    const result = ChangePasswordSchema.safeParse({
      currentPassword: "old12345",
      newPassword: "new12345",
      confirmPassword: "new123456",
    });
    expect(result.success).toBe(false);
  });

  it("accepts matching new passwords", () => {
    const result = ChangePasswordSchema.safeParse({
      currentPassword: "old12345",
      newPassword: "new12345",
      confirmPassword: "new12345",
    });
    expect(result.success).toBe(true);
  });
});
