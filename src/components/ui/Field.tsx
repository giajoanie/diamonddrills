import { type ComponentPropsWithoutRef } from "react";

export function Label(props: ComponentPropsWithoutRef<"label">) {
  return (
    <label
      {...props}
      className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground-muted ${props.className ?? ""}`}
    />
  );
}

const fieldClasses =
  "w-full rounded-none border-0 border-b-2 border-border bg-transparent px-1 py-2 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent focus:outline-none focus-visible:outline-none";

export function Input(props: ComponentPropsWithoutRef<"input">) {
  return <input {...props} className={`${fieldClasses} ${props.className ?? ""}`} />;
}

export function Select(props: ComponentPropsWithoutRef<"select">) {
  return <select {...props} className={`${fieldClasses} ${props.className ?? ""}`} />;
}

export function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return (
    <p className="mt-1 text-sm text-danger">
      {messages.join(" ")}
    </p>
  );
}
