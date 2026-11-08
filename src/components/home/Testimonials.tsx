import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/catalog";

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-mist py-14 lg:py-20" aria-label="Customer reviews">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="mb-10 text-center">
          <p className="font-accent text-xl text-ink/55 italic">Home stories</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by homes across India
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-ink/60">
            Real reviews from customers who furnished their bedrooms and living rooms
            with AR Furniture.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col bg-white p-6 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(4,29,68,0.25)]"
            >
              <div
                className="flex items-center gap-1 text-gold"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink/75">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-ink/10 pt-4 text-sm font-semibold">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
