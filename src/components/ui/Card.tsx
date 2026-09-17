import { type ComponentPropsWithoutRef } from "react";

export function Card({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`rounded-lg border border-border bg-background-elevated p-5 ${className}`}
      {...props}
    />
  );
}
