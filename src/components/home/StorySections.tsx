import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export function BrandStory() {
  return (
    <section className="bg-white py-16 lg:py-24" aria-label="About AR Furniture">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative order-2 aspect-[10/11] max-h-[620px] w-full overflow-hidden bg-mist lg:order-1">
          <Image
            src="/images/brand.jpg"
            alt="AR Furniture crafted living space with sofa and fireplace"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-ink/50 uppercase">
            AR Furniture
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[42px]">
            Trusted by India&apos;s best furniture designers.
          </h2>
          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-ink/65">
            We study the craftsmanship and design philosophy behind iconic furniture
            to create beds and sofas that combine elegant form, lasting durability,
            and everyday comfort.
          </p>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink/65">
            Every frame is built from seasoned timber, every fabric is rub-tested,
            and every piece passes a 67-point quality inspection before it ships
            to your home.
          </p>
          <Link
            href="/pages/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink px-7 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-ink hover:text-white"
          >
            Our story
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ExperienceCentre() {
  return (
    <section className="bg-sky py-16 lg:py-24" aria-label="Experience centre">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-ink/50 uppercase">
            Visit us
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[42px]">
            Welcome to our Gurugram Experience Centre
          </h2>
          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-ink/70">
            Some things need expert eyes. Visit us for personalized guidance and
            customization, then shop confidently online.
          </p>
          <Link
            href="/pages/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_rgba(4,29,68,0.6)]"
          >
            <MapPin className="size-4" strokeWidth={1.7} />
            View Location
          </Link>
        </div>
        <div className="relative aspect-[6/5] max-h-[560px] w-full overflow-hidden bg-white/40">
          <Image
            src="/images/experience.jpg"
            alt="AR Furniture Experience Centre interior in Gurugram"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
