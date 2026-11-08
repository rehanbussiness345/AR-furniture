"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import type { ProductRow } from "@/db/schema";
import { discountPercent, formatINR, cn } from "@/lib/utils";
import { useStore } from "@/providers/StoreProvider";

function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 text-gold" aria-label={`Rated ${rating} of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="size-4"
            fill={i < Math.round(rating) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
          </svg>
        ))}
      </div>
      <span className="text-[13px] text-ink/55">
        {rating.toFixed(1)} · {reviews} reviews
      </span>
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group border-b border-ink/10" open={defaultOpen}>
      <summary className="flex cursor-pointer items-center justify-between py-4 text-[15px] font-semibold">
        {title}
        <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180" strokeWidth={1.7} />
      </summary>
      <div className="pb-5 text-[14.5px] leading-relaxed text-ink/70">{children}</div>
    </details>
  );
}

function PincodeChecker() {
  const [pin, setPin] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState(/^\d{6}$/.test(pin.trim()) ? "ok" : "err");
  };
  return (
    <div className="mt-5 border border-ink/12 bg-mist/60 p-4">
      <p className="text-[13px] font-semibold tracking-wide">Check delivery availability</p>
      <form onSubmit={submit} className="mt-3 flex gap-2">
        <input
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
            setState("idle");
          }}
          inputMode="numeric"
          placeholder="Enter pincode"
          aria-label="Pincode"
          className="w-full border border-ink/20 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-ink"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
        >
          Check
        </button>
      </form>
      {state === "ok" && (
        <p className="mt-2.5 flex items-center gap-1.5 text-[13px] font-medium text-leaf">
          <Check className="size-4" strokeWidth={2} />
          In Stock, Ships Free in 1-2 Business days
        </p>
      )}
      {state === "err" && (
        <p className="mt-2.5 text-[13px] font-medium text-red-700">
          Please enter a valid 6-digit pincode.
        </p>
      )}
    </div>
  );
}

export default function ProductView({ product }: { product: ProductRow }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [imageIdx, setImageIdx] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const wished = isWishlisted(product.slug);
  const off = discountPercent(product.price, product.comparePrice);
  const paragraphs = useMemo(() => product.description.split("\n\n"), [product.description]);

  const handleAdd = () => {
    addToCart(product.slug, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleBuyNow = () => {
    addToCart(product.slug, size, qty);
    router.push("/cart");
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 lg:py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-[13px] text-ink/50">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          <li aria-hidden>/</li>
          <li>
            <Link href={`/collections/${product.category}`} className="hover:text-ink">
              {product.category === "bed" ? "Beds" : "Sofas"}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="max-w-[46vw] truncate text-ink/80">{product.name}</li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden bg-mist">
            <div className="relative aspect-[4/5] w-full">
              <Image
                key={product.images[imageIdx]}
                src={product.images[imageIdx]}
                alt={product.name}
                fill
                priority
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {off > 0 && (
              <span className="absolute top-4 left-4 rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-white uppercase">
                Sale
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.slug)}
              aria-label="Toggle wishlist"
              className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/95 shadow-sm transition-transform hover:scale-110"
            >
              <Heart className="size-4.5" strokeWidth={1.7} fill={wished ? "currentColor" : "none"} />
            </button>
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImageIdx(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "relative aspect-[4/5] w-20 overflow-hidden bg-mist transition-opacity",
                    i === imageIdx ? "ring-2 ring-ink" : "opacity-60 hover:opacity-100",
                  )}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-[11px] font-semibold tracking-[0.24em] text-ink/45 uppercase">
            AR Furniture · {product.subcategory}
          </p>
          <h1 className="mt-2 font-display text-2xl leading-tight font-bold tracking-tight sm:text-[32px]">
            {product.name}
          </h1>
          <div className="mt-3">
            <Stars rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-[26px] font-bold">{formatINR(product.price)}</span>
            {off > 0 && (
              <span className="text-lg text-ink/40 line-through">{formatINR(product.comparePrice)}</span>
            )}
            {off > 0 && <span className="text-[15px] font-bold text-leaf">{off}% Off</span>}
          </div>
          <p className="mt-1 text-[13px] text-ink/50 italic">(Incl. of all taxes)</p>

          {/* USP rows — mirroring the reference product page */}
          <ul className="mt-6 grid gap-2.5 text-[13.5px] font-medium text-ink/80">
            <li className="flex items-center gap-3">
              <BadgeCheck className="size-5 shrink-0 text-ink" strokeWidth={1.6} />
              67 point quality inspection before delivery
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-5 shrink-0 text-ink" strokeWidth={1.6} />
              5 year warranty, no questions asked
            </li>
            <li className="flex items-center gap-3">
              <Truck className="size-5 shrink-0 text-ink" strokeWidth={1.6} />
              Free delivery, zero hidden charges
            </li>
          </ul>

          {/* Size */}
          <div className="mt-7">
            <p className="text-[13px] font-semibold">
              Size: <span className="font-normal text-ink/60">{size}</span>
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "rounded-full border px-4.5 py-2 text-[13.5px] font-medium transition-colors",
                    size === s
                      ? "border-ink bg-ink text-white"
                      : "border-ink/20 hover:border-ink",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mt-6">
            <p className="text-[13px] font-semibold">
              Colour: <span className="font-normal text-ink/60">{color}</span>
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    "rounded-full border px-4.5 py-2 text-[13.5px] font-medium transition-colors",
                    color === c
                      ? "border-ink bg-ink text-white"
                      : "border-ink/20 hover:border-ink",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add to cart */}
          <div className="mt-7 flex items-stretch gap-3">
            <div className="flex items-center rounded-full border border-ink/20">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-full w-11 place-items-center hover:bg-ink/5"
              >
                <Minus className="size-4" strokeWidth={1.7} />
              </button>
              <span className="w-8 text-center text-sm font-semibold" aria-live="polite">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(9, q + 1))}
                className="grid h-full w-11 place-items-center hover:bg-ink/5"
              >
                <Plus className="size-4" strokeWidth={1.7} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className={cn(
                "flex-1 rounded-full py-3.5 text-sm font-semibold transition-all duration-300",
                added ? "bg-leaf text-white" : "bg-ink text-white hover:bg-ink-soft",
              )}
            >
              {added ? "Added to cart ✓" : "Add to cart"}
            </button>
          </div>
          <button
            onClick={handleBuyNow}
            className="mt-3 w-full rounded-full border border-ink py-3.5 text-sm font-semibold transition-colors duration-300 hover:bg-ink hover:text-white"
          >
            Buy it now
          </button>

          <PincodeChecker />

          {/* Offline store */}
          <div className="mt-4 border border-ink/12 p-4">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-ink/50 uppercase">
              Offline Store
            </p>
            <p className="mt-2 flex items-start gap-2.5 text-[13.5px] leading-relaxed text-ink/75">
              <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.7} />
              AR Furniture Experience Centre – Gurgaon, 127, Udyog Vihar Phase 4, 122015
            </p>
          </div>

          {/* Trust chips */}
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            {[
              { Icon: Truck, label: "Free Pan India Shipping" },
              { Icon: RotateCcw, label: "60 Days Moneyback Guarantee" },
              { Icon: ShieldCheck, label: "5 Years Warranty" },
            ].map(({ Icon, label }) => (
              <div key={label} className="border border-ink/10 bg-white px-2 py-3.5">
                <Icon className="mx-auto size-5 text-ink" strokeWidth={1.5} />
                <p className="mt-2 text-[11px] leading-snug font-medium text-ink/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details accordions */}
      <div className="mt-14 max-w-3xl">
        <Accordion title="Description" defaultOpen>
          {paragraphs.map((p, i) => (
            <p key={i} className="mb-3 last:mb-0">{p}</p>
          ))}
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {product.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </Accordion>
        <Accordion title="Specifications">
          <dl className="grid grid-cols-[140px_1fr] gap-y-2.5">
            <dt className="font-semibold text-ink">Material</dt>
            <dd>{product.material}</dd>
            <dt className="font-semibold text-ink">Dimensions</dt>
            <dd>{product.dimensions}</dd>
            <dt className="font-semibold text-ink">Available sizes</dt>
            <dd>{product.sizes.join(" · ")}</dd>
            <dt className="font-semibold text-ink">Colours</dt>
            <dd>{product.colors.join(" · ")}</dd>
            <dt className="font-semibold text-ink">Availability</dt>
            <dd>{product.stock > 0 ? `In stock (${product.stock} ready to ship)` : "Made to order — ships in 2-3 weeks"}</dd>
          </dl>
        </Accordion>
        <Accordion title="Shipping & manufacturing">
          <p>
            We will work quickly to ship your order as soon as possible. Once your order
            has shipped, you will receive an email with tracking information. Delivery
            timelines vary by location — typically 5–10 business days across India.
          </p>
          <p className="mt-3">
            Our products are manufactured both locally and globally. We carefully select
            our manufacturing partners to ensure high quality at a fair value, and every
            piece passes a 67-point inspection before dispatch.
          </p>
        </Accordion>
        <Accordion title="Warranty & returns">
          <p>
            Every AR Furniture piece carries a 5-year structural warranty and a 60-day
            moneyback guarantee. Our goal is for every customer to be totally satisfied
            with their purchase — if this isn&apos;t the case, let us know and we&apos;ll
            make it right.
          </p>
        </Accordion>
      </div>
    </div>
  );
}
