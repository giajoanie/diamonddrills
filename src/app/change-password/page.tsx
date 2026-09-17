import { requireUser } from "@/lib/auth/guards";
import { AuthShell } from "@/components/layout/AuthShell";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const metadata = { title: "Change password" };

export default async function ChangePasswordPage() {
  const user = await requireUser();

  return (
    <AuthShell
      title="Set a new password"
      subtitle={
        user.mustChangePassword
          ? "Your account requires a password change before you can continue."
          : undefined
      }
    >
      <ChangePasswordForm />
    </AuthShell>
  );
}
