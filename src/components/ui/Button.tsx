import { type ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-accent-strong text-accent-foreground border-2 border-accent-strong hover:bg-accent hover:border-accent focus-visible:bg-accent",
  secondary:
    "bg-surface text-accent-strong border-2 border-accent-strong hover:bg-surface-hover",
  ghost: "text-foreground-muted hover:text-foreground hover:bg-surface-hover",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold font-display tracking-wide transition-colors disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
