import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Sticker } from "@/components/binder/Sticker";

export function AuthShell({
  title,
  subtitle,
  children,
  wide,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Judge Mode's rubric form has far more fields than a login/signup card — give it room. */
  wide?: boolean;
}) {
  return (
    <main className="shell-diamond-bg flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8">
        <Logo className="h-9 w-auto" />
      </Link>
      <div
        className={`relative w-full overflow-visible rounded-2xl border border-border bg-background-elevated p-6 shadow-lg sm:p-8 ${wide ? "max-w-2xl" : "max-w-md"}`}
      >
        <Sticker kind="tape" />
        <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-foreground-muted">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
