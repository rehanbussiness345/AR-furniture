"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { ProductRow } from "@/db/schema";
import ProductCard from "@/components/shop/ProductCard";
import { SORT_OPTIONS, sortProducts, type SortKey } from "@/lib/shop";
import { cn } from "@/lib/utils";

const PRICE_BANDS = [
  { key: "all", label: "All prices", test: (_: number) => true },
  { key: "u85", label: "Under ₹ 85,000", test: (p: number) => p < 85000 },
  { key: "85-110", label: "₹ 85,000 – ₹ 1,10,000", test: (p: number) => p >= 85000 && p <= 110000 },
  { key: "a110", label: "Above ₹ 1,10,000", test: (p: number) => p > 110000 },
];

interface Filters {
  types: string[];
  price: string;
  inStockOnly: boolean;
}

const EMPTY: Filters = { types: [], price: "all", inStockOnly: false };

function FilterPanel({
  types,
  filters,
  setFilters,
}: {
  types: string[];
  filters: Filters;
  setFilters: (f: Filters) => void;
}) {
  return (
    <div className="space-y-7">
      {/* Product type */}
      {types.length > 0 && (
        <fieldset>
          <legend className="text-[11px] font-semibold tracking-[0.18em] text-ink/50 uppercase">
            Product type
          </legend>
          <ul className="mt-3.5 space-y-2.5">
            {types.map((t) => {
              const checked = filters.types.includes(t);
              return (
                <li key={t}>
                  <label className="flex cursor-pointer items-center gap-2.5 text-[14.5px] text-ink/80">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setFilters({
                          ...filters,
                          types: checked
                            ? filters.types.filter((x) => x !== t)
                            : [...filters.types, t],
                        })
                      }
                      className="size-4 accent-[#041d44]"
                    />
                    {t}
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      )}

      {/* Price */}
      <fieldset>
        <legend className="text-[11px] font-semibold tracking-[0.18em] text-ink/50 uppercase">
          Price
        </legend>
        <ul className="mt-3.5 space-y-2.5">
          {PRICE_BANDS.map((b) => (
            <li key={b.key}>
              <label className="flex cursor-pointer items-center gap-2.5 text-[14.5px] text-ink/80">
                <input
                  type="radio"
                  name="price-band"
                  checked={filters.price === b.key}
                  onChange={() => setFilters({ ...filters, price: b.key })}
                  className="size-4 accent-[#041d44]"
                />
                {b.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* Availability */}
      <fieldset>
        <legend className="text-[11px] font-semibold tracking-[0.18em] text-ink/50 uppercase">
          Availability
        </legend>
        <label className="mt-3.5 flex cursor-pointer items-center gap-2.5 text-[14.5px] text-ink/80">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}
            className="size-4 accent-[#041d44]"
          />
          In stock only
        </label>
      </fieldset>
    </div>
  );
}

export default function CollectionBrowser({
  products,
  title,
  initialType,
  initialSort,
}: {
  products: ProductRow[];
  title: string;
  initialType?: string;
  initialSort?: SortKey;
}) {
  const [filters, setFilters] = useState<Filters>({
    ...EMPTY,
    types: initialType ? [initialType] : [],
  });
  const [sort, setSort] = useState<SortKey>(initialSort ?? "featured");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const subcategories = useMemo(
    () => [...new Set(products.map((p) => p.subcategory))],
    [products],
  );

  const visible = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.key === filters.price) ?? PRICE_BANDS[0];
    const filtered = products.filter(
      (p) =>
        (filters.types.length === 0 || filters.types.includes(p.subcategory)) &&
        band.test(p.price) &&
        (!filters.inStockOnly || p.stock > 0),
    );
    return sortProducts(filtered, sort);
  }, [products, filters, sort]);

  const activeCount =
    filters.types.length +
    (filters.price !== "all" ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-20 lg:px-8">
      {/* Toolbar */}
      <div className="sticky top-[69px] z-30 -mx-4 flex items-center justify-between gap-3 border-b border-ink/10 bg-white/95 px-4 py-3.5 backdrop-blur lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-6 lg:backdrop-blur-0">
        <button
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-white"
        >
          <SlidersHorizontal className="size-4" strokeWidth={1.7} />
          Filters
          {activeCount > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>
        <p className="hidden text-sm text-ink/50 sm:block">{visible.length} items</p>
        <label className="relative inline-flex items-center gap-2 text-sm">
          <span className="hidden text-ink/50 md:inline">Sort by:</span>
          <span className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="cursor-pointer appearance-none rounded-full border border-ink/15 bg-white py-2 pr-9 pl-4 text-sm font-medium outline-none transition-colors hover:border-ink"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink/50" />
          </span>
        </label>
      </div>

      <div className="mt-6 lg:mt-2 lg:grid lg:grid-cols-[230px_1fr] lg:gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <FilterPanel types={subcategories} filters={filters} setFilters={setFilters} />
          {activeCount > 0 && (
            <button
              onClick={() => setFilters(EMPTY)}
              className="mt-6 text-sm font-medium text-ink/60 underline underline-offset-4 hover:text-ink"
            >
              Clear all filters
            </button>
          )}
        </aside>

        {/* Grid */}
        <div>
          {visible.length === 0 ? (
            <div className="grid place-items-center border border-dashed border-ink/20 py-24 text-center">
              <div>
                <p className="font-display text-xl font-semibold">No products found</p>
                <p className="mt-2 text-sm text-ink/60">
                  Try removing a filter or two to see more of the collection.
                </p>
                <button
                  onClick={() => setFilters(EMPTY)}
                  className="mt-5 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft"
                >
                  Clear filters
                </button>
              </div>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mobile / overlay filter drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-ink/40 transition-opacity duration-300",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setDrawerOpen(false)}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-[60] flex w-[88%] max-w-sm flex-col bg-white transition-transform duration-300",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!drawerOpen}
        aria-label="Filters"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="text-[15px] font-semibold">Filters</h2>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close filters"
            className="rounded-full p-2 hover:bg-ink/5"
          >
            <X className="size-5" strokeWidth={1.7} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <FilterPanel types={subcategories} filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex gap-3 border-t border-ink/10 px-5 py-4">
          <button
            onClick={() => setFilters(EMPTY)}
            className="flex-1 rounded-full border border-ink/20 py-3 text-sm font-semibold"
          >
            Clear all
          </button>
          <button
            onClick={() => setDrawerOpen(false)}
            className="flex-1 rounded-full bg-ink py-3 text-sm font-semibold text-white"
          >
            View {visible.length} items
          </button>
        </div>
      </aside>
    </div>
  );
}
