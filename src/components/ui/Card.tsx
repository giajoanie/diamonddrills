import { type ComponentPropsWithoutRef } from "react";

export function Card({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`rounded-xl border-2 border-border bg-background-elevated p-5 shadow-[3px_3px_0_var(--color-border)] ${className}`}
      {...props}
    />
  );
}
