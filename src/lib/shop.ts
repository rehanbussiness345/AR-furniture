import type { ProductRow } from "@/db/schema";

export type SortKey =
  | "featured"
  | "best-selling"
  | "title-ascending"
  | "title-descending"
  | "price-ascending"
  | "price-descending"
  | "created-descending";

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "best-selling", label: "Best selling" },
  { key: "title-ascending", label: "Alphabetically, A-Z" },
  { key: "title-descending", label: "Alphabetically, Z-A" },
  { key: "price-ascending", label: "Price, low to high" },
  { key: "price-descending", label: "Price, high to low" },
  { key: "created-descending", label: "Date, new to old" },
];

export function sortProducts(list: ProductRow[], sort: SortKey): ProductRow[] {
  const arr = [...list];
  switch (sort) {
    case "title-ascending":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "title-descending":
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case "price-ascending":
      return arr.sort((a, b) => a.price - b.price);
    case "price-descending":
      return arr.sort((a, b) => b.price - a.price);
    case "created-descending":
      return arr.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    case "best-selling":
      return arr.sort((a, b) => b.reviews - a.reviews);
    case "featured":
    default:
      return arr.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
  }
}

/** Compact catalog map used by the client cart/store provider. */
export interface CatalogEntry {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  comparePrice: number;
  image: string;
  sizes: string[];
}

export function toCatalogEntry(p: {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  comparePrice: number;
  images: string[];
  sizes: string[];
}): CatalogEntry {
  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    price: p.price,
    comparePrice: p.comparePrice,
    image: p.images[0] ?? "",
    sizes: p.sizes,
  };
}
