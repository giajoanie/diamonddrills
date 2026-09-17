import { z } from "zod";

export const SchoolIdSchema = z
  .string()
  .trim()
  .regex(/^\d{7}$/, { error: "School ID must be exactly 7 digits." });

export const PasswordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters." });

export const SignupSchema = z
  .object({
    schoolId: SchoolIdSchema,
    firstName: z.string().trim().min(1, { error: "First name is required." }),
    password: PasswordSchema,
    confirmPassword: z.string(),
    grade: z.coerce
      .number()
      .int()
      .min(9, { error: "Grade must be 9-12." })
      .max(12, { error: "Grade must be 9-12." }),
    roleplayEventId: z.string().min(1, { error: "Choose a roleplay event." }),
    writtenEventId: z.string().min(1, { error: "Choose a written event." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  schoolId: SchoolIdSchema,
  password: z.string().min(1, { error: "Password is required." }),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { error: "Current password is required." }),
    newPassword: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });
