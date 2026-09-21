import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="splash-shell">
      <div className="splash-dots" aria-hidden />

      <Image
        src="/brand/mhhs-deca.png"
        alt="Mountain House High School DECA"
        width={168}
        height={38}
        className="absolute right-6 top-6 h-auto w-28 opacity-95 sm:w-36"
      />

      <div className="relative mb-8 px-4">
        <Image
          src="/brand/dd-wordmark.png"
          alt="Diamond Drills"
          width={620}
          height={92}
          priority
          className="h-auto w-full max-w-[620px]"
        />
      </div>

      <div className="relative flex w-full max-w-[340px] flex-col gap-3.5 px-4">
        <Link
          href="/signup"
          className="relative block overflow-hidden rounded-full bg-gradient-to-b from-white to-border px-5 py-3.5 text-center font-display text-lg font-bold text-accent-strong shadow-[0_4px_0_rgba(10,32,74,0.4)]"
        >
          New Student
          <span className="splash-sheen" aria-hidden />
        </Link>
        <Link
          href="/login"
          className="block rounded-full bg-gradient-to-b from-white to-border px-5 py-3.5 text-center font-display text-lg font-bold text-accent-strong shadow-[0_4px_0_rgba(10,32,74,0.4)]"
        >
          Returning Student
        </Link>
        <Link
          href="/login"
          className="block rounded-full border-2 border-white/55 bg-gradient-to-b from-white/22 to-border/22 px-5 py-3.5 text-center font-display text-lg font-bold text-white"
        >
          Mentor
        </Link>
      </div>
    </div>
  );
}
