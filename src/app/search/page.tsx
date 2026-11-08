import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { searchProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const results = q ? await searchProducts(q) : [];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8 lg:py-16">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-ink/50 uppercase">
        Search
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {q ? (
          <>
            Results for <span className="font-accent italic">&ldquo;{q}&rdquo;</span>
          </>
        ) : (
          "Search our store"
        )}
      </h1>
      <p className="mt-3 text-sm text-ink/55">
        {q ? `${results.length} ${results.length === 1 ? "result" : "results"} found` : "Type a keyword above to find beds and sofas."}
      </p>

      {q && results.length === 0 && (
        <div className="mt-12 grid place-items-center border border-dashed border-ink/20 px-6 py-20 text-center">
          <SearchX className="size-10 text-ink/30" strokeWidth={1.4} />
          <p className="mt-4 font-display text-xl font-semibold">Nothing matched your search</p>
          <p className="mt-2 max-w-md text-sm text-ink/60">
            Try checking the spelling, using a broader term like &ldquo;bed&rdquo; or
            &ldquo;sofa&rdquo;, or browse the collections instead.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/collections/bed"
              className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft"
            >
              Browse beds
            </Link>
            <Link
              href="/collections/sofa"
              className="rounded-full border border-ink px-6 py-2.5 text-sm font-semibold hover:bg-ink hover:text-white"
            >
              Browse sofas
            </Link>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
          {results.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
