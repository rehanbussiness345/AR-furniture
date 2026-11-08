"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { ProductRow } from "@/db/schema";
import ProductCard from "@/components/shop/ProductCard";
import { useStore } from "@/providers/StoreProvider";

export default function WishlistPage() {
  const { wishlist, catalog } = useStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
        <div className="h-8 w-48 animate-pulse bg-mist" />
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[4/5] animate-pulse bg-mist" />
          ))}
        </div>
      </div>
    );
  }

  // reconstruct lightweight product rows from the catalog map
  const items: ProductRow[] = wishlist
    .map((slug) => catalog[slug])
    .filter(Boolean)
    .map((c) => ({
      id: 0,
      slug: c.slug,
      name: c.name,
      category: c.category,
      subcategory: c.subcategory,
      price: c.price,
      comparePrice: c.comparePrice,
      shortDescription: "",
      description: "",
      details: [],
      sizes: c.sizes,
      colors: [],
      material: "",
      dimensions: "",
      images: [c.image],
      stock: 1,
      rating: 4.8,
      reviews: 0,
      bestseller: false,
      newArrival: false,
      createdAt: new Date(),
    }));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8 lg:py-16">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-ink/50 uppercase">
        Saved for later
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Your wishlist
      </h1>

      {items.length === 0 ? (
        <div className="mt-12 grid place-items-center border border-dashed border-ink/20 px-6 py-20 text-center">
          <div className="grid size-14 place-items-center rounded-full bg-mist">
            <Heart className="size-6 text-ink/50" strokeWidth={1.5} />
          </div>
          <p className="mt-5 font-display text-xl font-semibold">Nothing saved yet</p>
          <p className="mt-2 max-w-md text-sm text-ink/60">
            Tap the heart on any bed or sofa to keep it here while you decide.
          </p>
          <Link
            href="/collections/all"
            className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft"
          >
            Start browsing
          </Link>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
