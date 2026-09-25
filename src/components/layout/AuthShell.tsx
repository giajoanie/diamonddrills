import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Sticker } from "@/components/binder/Sticker";

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
    <main className="shell-diamond-bg flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8">
        <Logo className="h-9 w-auto brightness-0 invert" />
      </Link>
      <div className="relative w-full max-w-md overflow-visible rounded-2xl border border-border bg-background-elevated p-6 shadow-lg sm:p-8">
        <Sticker kind="tape" />
        <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-foreground-muted">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
