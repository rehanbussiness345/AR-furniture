"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CatalogEntry } from "@/lib/shop";

export interface CartItem {
  slug: string;
  size: string;
  qty: number;
}

interface StoreContextValue {
  catalog: Record<string, CatalogEntry>;
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  subtotal: number;
  addToCart: (slug: string, size: string, qty?: number) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  removeFromCart: (slug: string, size: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "ar-furniture-cart-v1";
const WISHLIST_KEY = "ar-furniture-wishlist-v1";

export function StoreProvider({
  catalogList,
  children,
}: {
  catalogList: CatalogEntry[];
  children: ReactNode;
}) {
  const catalog = useMemo(() => {
    const map: Record<string, CatalogEntry> = {};
    for (const p of catalogList) map[p.slug] = p;
    return map;
  }, [catalogList]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = window.localStorage.getItem(CART_KEY);
      const w = window.localStorage.getItem(WISHLIST_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback((slug: string, size: string, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.slug === slug && i.size === size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { slug, size, qty }];
    });
  }, []);

  const updateQty = useCallback((slug: string, size: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.slug === slug && i.size === size))
        : prev.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i)),
    );
  }, []);

  const removeFromCart = useCallback((slug: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const isWishlisted = useCallback(
    (slug: string) => wishlist.includes(slug),
    [wishlist],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart],
  );

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, i) => {
        const entry = catalog[i.slug];
        return entry ? sum + entry.price * i.qty : sum;
      }, 0),
    [cart, catalog],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      catalog,
      cart,
      wishlist,
      cartCount,
      subtotal,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
    }),
    [
      catalog,
      cart,
      wishlist,
      cartCount,
      subtotal,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
