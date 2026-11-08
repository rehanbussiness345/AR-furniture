"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CATEGORY_TILES } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export default function CategoryRail() {
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
    <section className="bg-white py-12 lg:py-16" aria-label="Shop by category">
      <div className="group/rail relative mx-auto max-w-[1400px] px-4 lg:px-8">
        <div
          ref={ref}
          onScroll={updateArrows}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 lg:mx-0 lg:gap-4 lg:px-0"
        >
          {CATEGORY_TILES.map((tile) => (
            <Link
              key={tile.label}
              href={tile.href}
              className="group relative w-[42vw] min-w-[160px] shrink-0 snap-start overflow-hidden bg-mist sm:w-[30vw] lg:w-[calc((100%-3rem)/4.5)]"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={tile.image}
                  alt={tile.label}
                  fill
                  sizes="(min-width:1024px) 22vw, 42vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <span className="absolute bottom-3 left-3 rounded-full bg-white px-4 py-1.5 text-[12.5px] font-semibold text-ink shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
                {tile.label}
              </span>
            </Link>
          ))}
        </div>

        {/* carousel arrows like the reference slideshow */}
        <button
          aria-label="Previous categories"
          onClick={() => scroll(-1)}
          className={cn(
            "absolute top-1/2 left-1 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg transition-all hover:scale-105 lg:left-3",
            canPrev ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <ArrowLeft className="size-5" strokeWidth={1.7} />
        </button>
        <button
          aria-label="Next categories"
          onClick={() => scroll(1)}
          className={cn(
            "absolute top-1/2 right-1 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg transition-all hover:scale-105 lg:right-3",
            canNext ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <ArrowRight className="size-5" strokeWidth={1.7} />
        </button>
      </div>
    </section>
  );
}
