export default function Loading() {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-5">
      <div className="relative h-16 w-16" aria-hidden>
        <span className="absolute inset-0 animate-[dd-spin_1.1s_ease-in-out_infinite] rounded-md bg-accent" />
        <span className="absolute inset-1.5 translate-x-1 translate-y-1 animate-[dd-spin_1.1s_ease-in-out_infinite] rounded-md bg-highlight [animation-delay:-0.55s]" />
      </div>
      <p className="font-hand text-xl text-foreground-muted">
        loading your binder<span className="inline-block animate-bounce">…</span>
      </p>
      <span className="sr-only" role="status">
        Loading
      </span>
    </div>
  );
}
