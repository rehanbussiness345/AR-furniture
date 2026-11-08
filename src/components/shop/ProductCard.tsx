"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { ProductRow } from "@/db/schema";
import { discountPercent, formatINR, cn } from "@/lib/utils";
import { useStore } from "@/providers/StoreProvider";

export default function ProductCard({ product }: { product: ProductRow }) {
  const { toggleWishlist, isWishlisted } = useStore();
  const off = discountPercent(product.price, product.comparePrice);
  const wished = isWishlisted(product.slug);

  return (
    <div className="group relative flex h-full flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative block overflow-hidden bg-mist"
        aria-label={product.name}
      >
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width:1280px) 22vw, (min-width:768px) 30vw, 46vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(min-width:1280px) 22vw, (min-width:768px) 30vw, 46vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </div>
        {off > 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-white uppercase">
            Sale
          </span>
        )}
        {product.bestseller && (
          <span className="absolute top-3 right-3 mr-9 hidden rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-ink uppercase sm:inline-block">
            Bestseller
          </span>
        )}
      </Link>
      <button
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wished}
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.slug);
        }}
        className={cn(
          "absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/95 shadow-sm transition-all hover:scale-110",
          wished ? "text-ink" : "text-ink/60",
          product.bestseller ? "sm:top-11" : "",
        )}
      >
        <Heart className="size-4" strokeWidth={1.8} fill={wished ? "currentColor" : "none"} />
      </button>
      <div className="flex flex-1 flex-col pt-3">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="line-clamp-2 min-h-[2.6em] text-[14.5px] leading-snug font-medium text-ink transition-colors group-hover:text-ink/70">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-[15px] font-semibold">{formatINR(product.price)}</span>
          {off > 0 && (
            <span className="text-[13px] text-ink/45 line-through">
              {formatINR(product.comparePrice)}
            </span>
          )}
          {off > 0 && (
            <span className="text-[12.5px] font-semibold text-leaf">{off}% Off</span>
          )}
        </div>
      </div>
    </div>
  );
}
