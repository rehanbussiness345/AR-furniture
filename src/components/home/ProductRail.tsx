"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductRow } from "@/db/schema";
import ProductCard from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

export default function ProductRail({
  title,
  kicker,
  products,
  viewAllHref,
}: {
  title: string;
  kicker?: string;
  products: ProductRow[];
  viewAllHref: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="bg-white py-12 lg:py-16" aria-label={title}>
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            {kicker && (
              <p className="font-accent text-lg text-ink/55 italic">{kicker}</p>
            )}
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-[28px]">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={viewAllHref}
              className="hidden text-sm font-semibold underline-offset-4 hover:underline sm:inline-block"
            >
              View all
            </Link>
            <button
              aria-label="Scroll left"
              onClick={() => scroll(-1)}
              className={cn(
                "grid size-10 place-items-center rounded-full border border-ink/15 transition-all hover:bg-ink hover:text-white",
                canPrev ? "opacity-100" : "pointer-events-none opacity-30",
              )}
            >
              <ArrowLeft className="size-4.5" strokeWidth={1.7} />
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => scroll(1)}
              className={cn(
                "grid size-10 place-items-center rounded-full border border-ink/15 transition-all hover:bg-ink hover:text-white",
                canNext ? "opacity-100" : "pointer-events-none opacity-30",
              )}
            >
              <ArrowRight className="size-4.5" strokeWidth={1.7} />
            </button>
          </div>
        </div>
        <div
          ref={ref}
          onScroll={updateArrows}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 lg:mx-0 lg:gap-5 lg:px-0"
        >
          {products.map((p) => (
            <div
              key={p.slug}
              className="w-[46vw] min-w-[170px] shrink-0 snap-start sm:w-[31vw] lg:w-[calc((100%-3.75rem)/4)]"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
