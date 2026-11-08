import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink" aria-label="Festive sale">
      {/* Background video (mirrors reference hero), poster fallback */}
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          aria-hidden
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/10" />
      </div>

      <div className="mx-auto flex min-h-[480px] max-w-[1400px] flex-col justify-end px-4 pt-28 pb-14 sm:min-h-[560px] lg:min-h-[640px] lg:px-8 lg:pb-20">
        <p className="reveal text-[11px] font-semibold tracking-[0.28em] text-white/80 uppercase">
          AR Furniture · Festive Edit
        </p>
        <h1 className="reveal reveal-1 mt-4 max-w-2xl font-display text-[42px] leading-[1.02] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Festive Sale
          <br />
          Up to 50% Off
        </h1>
        <p className="reveal reveal-2 mt-4 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base">
          Offer valid for a limited time. It&apos;s time to save big this season on
          <br className="hidden sm:block" /> handcrafted beds &amp; sofas.
        </p>
        <div className="reveal reveal-3 mt-8">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
          >
            Shop the sale
          </Link>
        </div>

        {/* slide dots — single-slide slideshow like the reference */}
        <div className="mt-10 hidden items-center gap-1.5 sm:flex" aria-hidden>
          <span className="h-1 w-6 rounded-full bg-white" />
          <span className="h-1 w-6 rounded-full bg-white/30" />
          <span className="h-1 w-6 rounded-full bg-white/30" />
        </div>
      </div>
    </section>
  );
}
