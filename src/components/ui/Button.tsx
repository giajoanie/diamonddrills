import { type ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-accent-strong text-accent-foreground border-2 border-accent-strong shadow-[3px_3px_0_var(--color-foreground)] hover:bg-accent hover:shadow-[2px_2px_0_var(--color-foreground)] hover:translate-x-px hover:translate-y-px focus-visible:bg-accent",
  secondary:
    "bg-surface text-foreground border-2 border-border-strong shadow-[3px_3px_0_var(--color-border-strong)] hover:bg-surface-hover hover:shadow-[2px_2px_0_var(--color-border-strong)] hover:translate-x-px hover:translate-y-px",
  ghost: "text-foreground-muted hover:text-foreground hover:bg-surface-hover",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold font-display tracking-wide transition-all disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
