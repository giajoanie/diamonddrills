import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="binder-dots flex min-h-screen flex-col items-center justify-center bg-accent-strong px-4 py-12">
      <Link href="/" className="mb-8">
        <Logo className="h-9 w-auto brightness-0 invert" />
      </Link>
      <div className="binder-ruled w-full max-w-md rounded-2xl border-2 border-border bg-background-elevated p-6 shadow-[4px_4px_0_var(--color-accent-strong)] sm:p-8">
        <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-foreground-muted">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
