"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons/SocialIcons";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { BED_TYPES, SOFA_TYPES } from "@/lib/catalog";
import { useStore } from "@/providers/StoreProvider";
import { cn } from "@/lib/utils";

const typeHref = (category: "bed" | "sofa", type: string) =>
  `/collections/${category}?type=${encodeURIComponent(type)}`;

function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" aria-label="AR Furniture home" className="group inline-flex items-baseline gap-1.5">
      <span
        className={cn(
          "font-display text-[26px] leading-none font-extrabold tracking-tight lg:text-[30px]",
          dark ? "text-white" : "text-ink",
        )}
      >
        AR
      </span>
      <span
        className={cn(
          "font-accent text-[24px] leading-none italic lg:text-[28px]",
          dark ? "text-white" : "text-ink",
        )}
      >
        furniture
      </span>
    </Link>
  );
}

function CartButton() {
  const { cartCount } = useStore();
  return (
    <Link
      href="/cart"
      aria-label="Cart"
      className="relative rounded-full p-2 transition-colors hover:bg-ink/5"
    >
      <ShoppingBag className="size-[22px]" strokeWidth={1.7} />
      {cartCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 grid size-[18px] place-items-center rounded-full bg-ink text-[10px] font-semibold text-white">
          {cartCount > 9 ? "9+" : cartCount}
        </span>
      )}
    </Link>
  );
}

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = inputRef.current?.value.trim();
    if (q) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <div
      className={cn(
        "absolute inset-x-0 top-full z-40 border-b border-ink/10 bg-white transition-all duration-300",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
      )}
    >
      <div className="mx-auto max-w-3xl px-5 py-8">
        <form onSubmit={submit} className="flex items-center gap-3 border-b border-ink/20 pb-3">
          <Search className="size-5 shrink-0 text-ink/50" strokeWidth={1.7} />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search beds, sofas and more..."
            className="w-full bg-transparent text-lg outline-none placeholder:text-ink/40"
            aria-label="Search products"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="rounded-full p-1.5 hover:bg-ink/5"
          >
            <X className="size-5" strokeWidth={1.7} />
          </button>
        </form>
        <div className="mt-5">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-ink/50 uppercase">
            Popular searches
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["King size bed", "Storage bed", "L shape sofa", "Velvet sofa", "Boucle", "Recliner"].map(
              (term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  onClick={onClose}
                  className="rounded-full border border-ink/15 px-4 py-1.5 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  {term}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Desktop mega dropdown panel */
function MegaPanel({
  title,
  viewAllHref,
  types,
  promoImage,
  promoTag,
  promoTitle,
}: {
  title: string;
  viewAllHref: string;
  types: readonly string[];
  promoImage: string;
  promoTag: string;
  promoTitle: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-full z-40 hidden pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 lg:block">
      <div className="border-y border-ink/10 bg-white shadow-[0_24px_60px_-24px_rgba(4,29,68,0.35)]">
        <div className="mx-auto grid max-w-6xl grid-cols-[240px_1fr_280px] gap-10 px-8 py-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-ink/45 uppercase">
              {title}
            </p>
            <Link
              href={viewAllHref}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline"
            >
              Shop all {title.toLowerCase()} <ChevronRight className="size-4" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 content-start gap-x-8 gap-y-3.5">
            {types.map((t) => (
              <li key={t}>
                <Link
                  href={typeHref(viewAllHref.split("/").pop() as "bed" | "sofa", t)}
                  className="text-[15px] text-ink/75 transition-colors hover:text-ink"
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={viewAllHref} className="group/promo relative block overflow-hidden">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-mist">
              <Image
                src={promoImage}
                alt={promoTitle}
                fill
                sizes="280px"
                className="object-cover transition-transform duration-700 group-hover/promo:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-semibold">{promoTitle}</span>
              <span className="rounded-full bg-gold/90 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-ink uppercase">
                {promoTag}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const groups = [
    { label: "Beds", href: "/collections/bed", types: BED_TYPES, category: "bed" as const },
    { label: "Sofas", href: "/collections/sofa", types: SOFA_TYPES, category: "sofa" as const },
  ];

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-ink/40 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-white transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <Wordmark />
          <button onClick={onClose} aria-label="Close menu" className="rounded-full p-2 hover:bg-ink/5">
            <X className="size-5" strokeWidth={1.7} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          {groups.map((g) => (
            <div key={g.label} className="border-b border-ink/8 last:border-0">
              <button
                className="flex w-full items-center justify-between py-3.5 text-left text-[15px] font-semibold"
                onClick={() => setExpanded(expanded === g.label ? null : g.label)}
                aria-expanded={expanded === g.label}
              >
                {g.label}
                <ChevronDown
                  className={cn("size-4 transition-transform", expanded === g.label && "rotate-180")}
                  strokeWidth={1.7}
                />
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-300",
                  expanded === g.label ? "grid-rows-[1fr] pb-3 opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <ul className="min-h-0 space-y-2.5 overflow-hidden pl-1">
                  <li>
                    <Link href={g.href} onClick={onClose} className="text-sm font-medium text-ink">
                      Shop all {g.label.toLowerCase()}
                    </Link>
                  </li>
                  {g.types.map((t) => (
                    <li key={t}>
                      <Link
                        href={typeHref(g.category, t)}
                        onClick={onClose}
                        className="text-sm text-ink/65"
                      >
                        {t}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="mt-4 space-y-3.5">
            <Link href="/collections/all" onClick={onClose} className="block text-[15px] font-semibold">
              Shop All
            </Link>
            <Link href="/pages/about" onClick={onClose} className="block text-[15px] text-ink/75">
              Our Story
            </Link>
            <Link href="/pages/track-your-order" onClick={onClose} className="block text-[15px] text-ink/75">
              Track Your Order
            </Link>
            <Link href="/pages/faq" onClick={onClose} className="block text-[15px] text-ink/75">
              FAQ
            </Link>
            <Link href="/pages/contact" onClick={onClose} className="block text-[15px] text-ink/75">
              Contact Us
            </Link>
          </div>
        </nav>
        <div className="border-t border-ink/10 px-5 py-5">
          <div className="flex items-center gap-2.5">
            {[InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon, XIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid size-9 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-white"
              >
                <Icon className="size-4" strokeWidth={1.7} />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white transition-shadow duration-300",
        scrolled ? "shadow-[0_10px_40px_-20px_rgba(4,29,68,0.25)]" : "",
      )}
    >
      <div className="relative border-b border-ink/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <div className="flex items-center gap-2 lg:gap-8">
            <button
              className="rounded-full p-2 hover:bg-ink/5 lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-[22px]" strokeWidth={1.7} />
            </button>
            <Wordmark />
            <nav className="ml-4 hidden items-center gap-7 text-[14.5px] font-medium lg:flex">
              {/* Beds mega menu */}
              <div className="group static py-1">
                <Link
                  href="/collections/bed"
                  className="nav-link inline-flex items-center gap-1"
                  data-active={pathname.startsWith("/collections/bed")}
                >
                  Beds <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </Link>
                <MegaPanel
                  title="Beds"
                  viewAllHref="/collections/bed"
                  types={BED_TYPES}
                  promoImage="/images/bed-morino.jpg"
                  promoTag="Save 10–20% Off"
                  promoTitle="Modern Beds"
                />
              </div>
              {/* Sofas mega menu */}
              <div className="group static py-1">
                <Link
                  href="/collections/sofa"
                  className="nav-link inline-flex items-center gap-1"
                  data-active={pathname.startsWith("/collections/sofa")}
                >
                  Sofas <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </Link>
                <MegaPanel
                  title="Sofas"
                  viewAllHref="/collections/sofa"
                  types={SOFA_TYPES}
                  promoImage="/images/sofa-royal.jpg"
                  promoTag="Best Seller"
                  promoTitle="Designer Sofas"
                />
              </div>
              <Link
                href="/collections/all"
                className="nav-link py-1"
                data-active={pathname.startsWith("/collections/all")}
              >
                Shop All
              </Link>
              <Link href="/pages/about" className="nav-link py-1" data-active={pathname === "/pages/about"}>
                Our Story
              </Link>
              <Link href="/pages/contact" className="nav-link py-1" data-active={pathname === "/pages/contact"}>
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              className="rounded-full p-2 transition-colors hover:bg-ink/5"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              {searchOpen ? (
                <X className="size-[22px]" strokeWidth={1.7} />
              ) : (
                <Search className="size-[22px]" strokeWidth={1.7} />
              )}
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hidden rounded-full p-2 transition-colors hover:bg-ink/5 sm:block"
            >
              <Heart className="size-[22px]" strokeWidth={1.7} />
            </Link>
            <Link
              href="/pages/contact"
              aria-label="Account"
              className="hidden rounded-full p-2 transition-colors hover:bg-ink/5 sm:block"
            >
              <User className="size-[22px]" strokeWidth={1.7} />
            </Link>
            <CartButton />
          </div>
        </div>
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
