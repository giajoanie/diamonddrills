import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground-muted hover:text-foreground"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-accent-strong px-3 py-2 text-sm font-medium text-accent-foreground hover:bg-accent"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}
