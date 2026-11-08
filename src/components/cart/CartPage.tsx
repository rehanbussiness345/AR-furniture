"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck, Gift } from "lucide-react";
import { useEffect, useState } from "react";
import { formatINR } from "@/lib/utils";
import { useStore } from "@/providers/StoreProvider";

export default function CartPage() {
  const { cart, catalog, subtotal, updateQty, removeFromCart, cartCount } = useStore();
  const [checkoutNote, setCheckoutNote] = useState(false);
  const [mounted, setMounted] = useState(false);

  // cart is hydrated from localStorage — render after mount to avoid mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
        <div className="h-8 w-40 animate-pulse bg-mist" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 animate-pulse bg-mist" />
            ))}
          </div>
          <div className="h-64 animate-pulse bg-mist" />
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto grid max-w-xl place-items-center px-4 py-24 text-center">
        <div className="grid size-16 place-items-center rounded-full bg-mist">
          <ShoppingBag className="size-7 text-ink/60" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">Your cart is empty</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
          Beautiful beds and sofas are waiting. Explore the collections and find
          the piece your home has been missing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/collections/bed"
            className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            Shop beds
          </Link>
          <Link
            href="/collections/sofa"
            className="rounded-full border border-ink px-7 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-white"
          >
            Shop sofas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 lg:px-8 lg:py-14">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Your cart</h1>
          <p className="mt-2 text-sm text-ink/55">{cartCount} item{cartCount > 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/collections/all"
          className="hidden text-sm font-semibold underline-offset-4 hover:underline sm:inline-block"
        >
          Continue shopping
        </Link>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Lines */}
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {cart.map((item) => {
            const entry = catalog[item.slug];
            if (!entry) return null;
            const key = `${item.slug}|${item.size}`;
            return (
              <li key={key} className="flex gap-4 py-5 sm:gap-6">
                <Link
                  href={`/products/${item.slug}`}
                  className="relative block aspect-[4/5] w-24 shrink-0 overflow-hidden bg-mist sm:w-28"
                >
                  <Image
                    src={entry.image}
                    alt={entry.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-[15px] leading-snug font-semibold hover:underline"
                      >
                        {entry.name}
                      </Link>
                      <p className="mt-1 text-[13px] text-ink/55">
                        {entry.subcategory} · Size: {item.size}
                      </p>
                    </div>
                    <p className="text-right text-[15px] font-semibold whitespace-nowrap">
                      {formatINR(entry.price * item.qty)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center rounded-full border border-ink/20">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => updateQty(item.slug, item.size, item.qty - 1)}
                        className="grid h-9 w-9 place-items-center hover:bg-ink/5"
                      >
                        <Minus className="size-3.5" strokeWidth={1.7} />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => updateQty(item.slug, item.size, item.qty + 1)}
                        className="grid h-9 w-9 place-items-center hover:bg-ink/5"
                      >
                        <Plus className="size-3.5" strokeWidth={1.7} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.slug, item.size)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink/55 transition-colors hover:text-red-700"
                      aria-label={`Remove ${entry.name}`}
                    >
                      <Trash2 className="size-4" strokeWidth={1.7} />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Summary */}
        <aside className="h-fit border border-ink/12 bg-mist/50 p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold">Order summary</h2>
          <dl className="mt-5 space-y-3 text-[14.5px]">
            <div className="flex justify-between">
              <dt className="text-ink/65">Subtotal</dt>
              <dd className="font-semibold">{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/65">Shipping</dt>
              <dd className="font-semibold text-leaf">Free</dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-display font-bold">{formatINR(subtotal)}</dd>
            </div>
          </dl>
          <p className="mt-1.5 text-[12px] text-ink/50 italic">(Incl. of all taxes)</p>

          <ul className="mt-5 space-y-2 text-[12.5px] font-medium text-ink/70">
            <li className="flex items-center gap-2">
              <Gift className="size-4 text-ink" strokeWidth={1.6} /> Your order includes a FREE gift
            </li>
            <li className="flex items-center gap-2">
              <Truck className="size-4 text-ink" strokeWidth={1.6} /> Free pan-India shipping
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-ink" strokeWidth={1.6} /> 5-year warranty included
            </li>
          </ul>

          <button
            onClick={() => setCheckoutNote(true)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            Proceed to checkout <ArrowRight className="size-4" strokeWidth={1.7} />
          </button>
          {checkoutNote && (
            <p className="mt-3 border border-gold/60 bg-gold/10 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-ink/80">
              This is a demo storefront — checkout and payment processing are not
              enabled. Call +91 98100 00000 to place this order with our team.
            </p>
          )}
          <Link
            href="/collections/all"
            className="mt-4 block text-center text-[13px] font-medium text-ink/60 underline underline-offset-4 hover:text-ink"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
