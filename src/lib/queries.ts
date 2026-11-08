import { db } from "@/db";
import { products, type ProductRow } from "@/db/schema";
import { asc, eq, ilike, or } from "drizzle-orm";
import { PRODUCTS } from "./catalog";
import { toCatalogEntry, type CatalogEntry } from "./shop";

export { SORT_OPTIONS, sortProducts } from "./shop";
export type { CatalogEntry, SortKey } from "./shop";

const FALLBACK: ProductRow[] = PRODUCTS.map((p, i) => ({
  ...p,
  id: i + 1,
  createdAt: new Date(2026, 0, Math.min(i + 1, 28)),
})) as ProductRow[];

async function loadProducts(): Promise<ProductRow[]> {
  try {
    const rows = await db.select().from(products).orderBy(asc(products.id));
    if (rows.length > 0) return rows;
  } catch {
    // DB unavailable — use bundled catalog
  }
  return FALLBACK;
}

let cache: ProductRow[] | null = null;

export async function getAllProducts(): Promise<ProductRow[]> {
  if (!cache) cache = await loadProducts();
  return cache;
}

export async function getCollectionProducts(handle: string): Promise<ProductRow[]> {
  const all = await getAllProducts();
  if (handle === "all") return all;
  return all.filter((p) => p.category === handle);
}

export async function getProductBySlug(slug: string): Promise<ProductRow | undefined> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug);
}

export async function getRelatedProducts(
  product: ProductRow,
  limit = 4,
): Promise<ProductRow[]> {
  const all = await getAllProducts();
  return all
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

export async function getBestSellers(
  category: "bed" | "sofa",
  limit = 8,
): Promise<ProductRow[]> {
  const all = await getAllProducts();
  return all
    .filter((p) => p.category === category)
    .sort((a, b) => Number(b.bestseller) - Number(a.bestseller) || a.id - b.id)
    .slice(0, limit);
}

export async function getNewArrivals(limit = 4): Promise<ProductRow[]> {
  const all = await getAllProducts();
  return [...all]
    .sort((a, b) => Number(b.newArrival) - Number(a.newArrival) || a.id - b.id)
    .slice(0, limit);
}

export async function searchProducts(q: string): Promise<ProductRow[]> {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  try {
    const like = `%${term}%`;
    const rows = await db
      .select()
      .from(products)
      .where(
        or(
          ilike(products.name, like),
          ilike(products.subcategory, like),
          ilike(products.category, like),
          ilike(products.material, like),
          ilike(products.shortDescription, like),
        ),
      )
      .orderBy(asc(products.id));
    if (rows.length > 0) return rows;
  } catch {
    // fall through to in-memory search
  }
  const all = await getAllProducts();
  return all.filter((p) =>
    [p.name, p.subcategory, p.category, p.material, p.shortDescription]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );
}

export async function getCatalogList(): Promise<CatalogEntry[]> {
  const all = await getAllProducts();
  return all.map(toCatalogEntry);
}
