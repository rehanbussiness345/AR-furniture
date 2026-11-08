import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-xl place-items-center px-4 py-28 text-center">
      <p className="font-accent text-6xl text-ink/30 italic">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
        This page has been moved — or never existed
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
        The furniture, however, is very real. Head back to the collections and
        keep browsing.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
        >
          Back to home
        </Link>
        <Link
          href="/collections/all"
          className="rounded-full border border-ink px-7 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-white"
        >
          Shop all
        </Link>
      </div>
    </div>
  );
}
