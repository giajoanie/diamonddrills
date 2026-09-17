import { AuthShell } from "@/components/layout/AuthShell";
import { getSignupEventOptions } from "@/lib/dal/events";
import { SignupForm } from "./SignupForm";

export const metadata = { title: "Sign up" };
// The event list is DB-backed and mentors can change it without a redeploy,
// so this must not be statically prerendered at build time.
export const dynamic = "force-dynamic";

export default async function SignupPage() {
  const clusters = await getSignupEventOptions();

  return (
    <AuthShell
      title="Create your student account"
      subtitle="Use your 7-digit School ID as your username."
    >
      <SignupForm clusters={clusters} />
    </AuthShell>
  );
}
