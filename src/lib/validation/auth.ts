import { z } from "zod";

export const SchoolIdSchema = z
  .string()
  .trim()
  .regex(/^\d{7}$/, { error: "School ID must be exactly 7 digits." });

export const PasswordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters." });

export const ProgramSchema = z.enum(["HIGH_SCHOOL", "EBL"]);

// EBL (Emerging Business Leaders, middle school) is roleplay-only, so
// writtenEventId is only required for HIGH_SCHOOL; grade range depends on
// the same split (9-12 vs 6-8). Both need superRefine since they cross
// the `program` field rather than validating one field in isolation.
export const SignupSchema = z
  .object({
    schoolId: SchoolIdSchema,
    firstName: z.string().trim().min(1, { error: "First name is required." }),
    password: PasswordSchema,
    confirmPassword: z.string(),
    program: ProgramSchema,
    grade: z.coerce.number().int(),
    roleplayEventId: z.string().min(1, { error: "Choose a roleplay event." }),
    // EBL picks two roleplay events — one Principles-format, one
    // Series/Team Decision Making-format (format itself is checked in the
    // signup action, which has the event rows; this field is just "present
    // for EBL"). HIGH_SCHOOL's form omits it from the DOM entirely, same
    // reasoning as writtenEventId below re: null vs undefined.
    roleplayEventId2: z.string().nullable().optional(),
    // EBL's signup form omits this field from the DOM entirely (rather than
    // just hiding it), so formData.get() returns null, not undefined —
    // .optional() alone doesn't accept null.
    writtenEventId: z.string().nullable().optional(),
    // A second, optional written pick scoped to Project Management-format
    // events (Business Solutions Project, Career Development Project,
    // etc.) — a student can take one of these alongside their other
    // written event, not instead of it.
    projectManagementEventId: z.string().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({ code: "custom", message: "Passwords do not match.", path: ["confirmPassword"] });
    }
    if (data.program === "HIGH_SCHOOL") {
      if (data.grade < 9 || data.grade > 12) {
        ctx.addIssue({ code: "custom", message: "Grade must be 9-12.", path: ["grade"] });
      }
      if (!data.writtenEventId) {
        ctx.addIssue({ code: "custom", message: "Choose a written event.", path: ["writtenEventId"] });
      }
    } else {
      if (data.grade < 6 || data.grade > 8) {
        ctx.addIssue({ code: "custom", message: "Grade must be 6-8.", path: ["grade"] });
      }
      if (!data.roleplayEventId2) {
        ctx.addIssue({
          code: "custom",
          message: "Choose your second roleplay event.",
          path: ["roleplayEventId2"],
        });
      }
    }
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
