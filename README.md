# AR Furniture — Luxury Beds & Sofas

A full-stack ecommerce storefront for **AR Furniture**, recreated from the design blueprint of a premium Indian furniture store and restricted exclusively to two categories: **Beds** and **Sofas**.

## What's inside

- **Homepage** — full-screen video hero with sale banner, trust bar (free gift / free shipping / easy returns / 5-year warranty), horizontally-scrolling category rail (King, Queen, Upholstered & Storage Beds · 2-Seater, 3-Seater, L-Shaped & Designer Sofas), bestselling product rails, customer reviews, brand story, Gurugram Experience Centre section, and a "New arrivals" grid.
- **Collections** (`/collections/bed`, `/collections/sofa`, `/collections/all`) — product-type / price / availability filters (sidebar on desktop, drawer on mobile & overlay), 7 sort orders, responsive product grid, editorial copy block.
- **Product pages** (`/products/[handle]`) — image gallery with thumbnails, sale pricing with % off, star ratings, size & colour selection, quantity stepper, Add to cart / Buy it now, pincode delivery checker, offline-store card, trust chips, and collapsible Description / Specifications / Shipping / Warranty sections with related products.
- **Cart** (`/cart`) — quantity updates, remove, order summary with free-shipping/gift messaging, demo checkout notice. Persisted in localStorage.
- **Wishlist** (`/wishlist`) — heart any product to save it.
- **Search** — header search overlay with popular searches, results page at `/search?q=`.
- **Content pages** — About, Contact (with form), FAQs, Track Your Order, Shipping, Returns, Privacy, Terms.

## Tech stack

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- PostgreSQL + Drizzle ORM (product catalogue)
- lucide-react icons, custom SVG social icons
- Local optimized imagery + self-hosted hero video

## Run locally

```bash
npm install

# database (PostgreSQL required)
cp .env.example .env        # set DATABASE_URL
npx drizzle-kit push        # create tables
npx tsx scripts/seed.ts     # load 24 products (12 beds, 12 sofas)

npm run dev                 # http://localhost:3000
```

## Production

```bash
npm run build
npm run start
```

## Deployment

Deploy to any Node host or Vercel. Provide `DATABASE_URL`, run `drizzle-kit push` and the seed script once per environment. On database failure the storefront automatically falls back to the bundled catalogue, so static previews still render.

## Notes

- Prices, reviews and stock levels are realistic sample data (INR, incl. taxes).
- Checkout/payment is intentionally a demo placeholder — no fake payment flow.
