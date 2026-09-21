import { type ComponentPropsWithoutRef } from "react";

export function Card({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`rounded-xl border border-border bg-background-elevated p-5 shadow-sm ${className}`}
      {...props}
    />
  );
}
