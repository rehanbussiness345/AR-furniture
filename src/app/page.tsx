import Link from "next/link";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import CategoryRail from "@/components/home/CategoryRail";
import ProductRail from "@/components/home/ProductRail";
import Testimonials from "@/components/home/Testimonials";
import { BrandStory, ExperienceCentre } from "@/components/home/StorySections";
import ProductCard from "@/components/shop/ProductCard";
import { getBestSellers, getNewArrivals } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [sofaPicks, bedPicks, arrivals] = await Promise.all([
    getBestSellers("sofa", 8),
    getBestSellers("bed", 8),
    getNewArrivals(4),
  ]);

  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryRail />
      <ProductRail
        title="Bestselling Sofas"
        kicker="Most loved"
        products={sofaPicks}
        viewAllHref="/collections/sofa?sort=best-selling"
      />
      <ProductRail
        title="Bestselling Beds"
        kicker="Sleep better"
        products={bedPicks}
        viewAllHref="/collections/bed?sort=best-selling"
      />
      <Testimonials />
      <BrandStory />
      <ExperienceCentre />

      {/* New arrivals — mirrors the reference "Introducing / New arrivals" hero block */}
      <section className="bg-white py-16 lg:py-24" aria-label="New arrivals">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="text-center">
            <h2 className="font-accent text-2xl text-ink/60 italic sm:text-3xl">
              Introducing
            </h2>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              New arrivals
            </p>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink/60">
              We make things that work better and last longer. Our products solve
              real problems with clean design and honest materials.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {arrivals.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/collections/all?sort=created-descending"
              className="inline-flex items-center gap-2 rounded-full border border-ink px-8 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-ink hover:text-white"
            >
              View all products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
