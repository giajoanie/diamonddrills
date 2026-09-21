import { type ComponentPropsWithoutRef } from "react";
import { Card } from "@/components/ui/Card";

/**
 * A Card with the binder "ruled paper" texture and a rounded-only-on-one-side
 * top edge, for use as the hinge point under a tab in BinderTabNav.
 */
export function RuledCard({
  className = "",
  hinge = false,
  ...props
}: ComponentPropsWithoutRef<"div"> & { hinge?: boolean }) {
  return (
    <Card
      className={`binder-ruled ${hinge ? "rounded-tr-none" : ""} ${className}`}
      {...props}
    />
  );
}
