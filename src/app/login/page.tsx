import { AuthShell } from "@/components/layout/AuthShell";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <AuthShell title="Log in to Diamond Drills">
      <LoginForm />
    </AuthShell>
  );
}
