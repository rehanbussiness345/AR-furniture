import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionBrowser from "@/components/collection/CollectionBrowser";
import { COLLECTION_META } from "@/lib/catalog";
import { getCollectionProducts } from "@/lib/queries";
import type { SortKey } from "@/lib/shop";

export const dynamic = "force-dynamic";

const SEO_COPY: Record<string, { heading: string; paragraphs: string[] }> = {
  bed: {
    heading: "Bed designs that make the whole room feel right",
    paragraphs: [
      "Finding the right bed design isn't just about furniture — it's about how your bedroom feels at the end of a long day. This collection brings together thoughtfully crafted styles that balance comfort, durability, and clean aesthetics. If you're browsing for a modern bed, you'll notice the focus here is simple: designs that look good today and still feel relevant years from now.",
      "A good bed design sets the tone for the entire room. Some people like a bold headboard that instantly draws attention, while others prefer a low-profile frame that keeps things minimal. This collection covers both ends — options that work in compact rooms, as well as statement pieces that suit larger master bedrooms.",
      "Storage is something most homes need, and it's built into many of these designs without making them look bulky. Hydraulic storage, box storage and drawer setups help keep extra bedding and seasonal items tucked away — a practical addition, especially when space is limited.",
      "Material choice also makes a difference in how a bed feels and lasts. Wooden bed designs bring warmth and a natural touch, while upholstered headboards make sitting up to read or unwind genuinely comfortable. Whether you need a queen for a smaller room or a spacious king-size modern bed, the collection is designed to cover different needs without overcomplicating the choice.",
    ],
  },
  sofa: {
    heading: "Sofa sets for the way your living room actually lives",
    paragraphs: [
      "A sofa set is more than just furniture — it's where life happens. From casual conversations to relaxing evenings, it becomes the centre of your living room. Choosing the right sofa not only improves comfort but also defines the overall look of your space.",
      "At AR Furniture, we bring you a thoughtfully curated collection of sofa sets designed to match different lifestyles, interiors and budgets. From compact two-seaters to spacious L-shaped sectionals and indulgent recliners, every piece is built on a kiln-dried solid wood frame with cushioning that holds its shape for years.",
      "Fabric sofas offer soft, everyday comfort in a variety of colours and textures, while velvet and leatherette options bring a more premium, timeless character. Add our free pan-India shipping, 60-day money-back promise and a 5-year warranty, and the only hard part left is choosing a favourite.",
    ],
  },
  all: {
    heading: "Everything we make, in one place",
    paragraphs: [
      "Clean design, honest materials, and construction that outlasts trends — browse the complete AR Furniture collection of beds and sofas, made in India and delivered free to your door.",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const meta = COLLECTION_META[handle];
  return { title: meta ? `${meta.title} — Buy Online` : "Collection" };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { handle } = await params;
  if (!["bed", "sofa", "all"].includes(handle)) notFound();
  const sp = await searchParams;
  const meta = COLLECTION_META[handle];
  const products = await getCollectionProducts(handle);
  const seo = SEO_COPY[handle];

  const initialType = typeof sp.type === "string" ? sp.type : undefined;
  const initialSort = typeof sp.sort === "string" ? (sp.sort as SortKey) : undefined;

  return (
    <>
      {/* Collection header */}
      <section className="border-b border-ink/10 bg-mist/60">
        <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8 lg:py-16">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-ink/50 uppercase">
            AR Furniture Collection
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/60">
            {meta.description}
          </p>
        </div>
      </section>

      <CollectionBrowser
        products={products}
        title={meta.title}
        initialType={initialType}
        initialSort={initialSort}
      />

      {/* SEO copy block, like the reference */}
      <section className="border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-14 lg:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">{seo.heading}</h2>
          {seo.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-[15px] leading-relaxed text-ink/65">
              {p}
            </p>
          ))}
          <div className="mt-8 border border-ink/15 bg-mist/50 p-6">
            <h3 className="font-display text-base font-semibold">Don&apos;t know your size?</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Don&apos;t worry — we&apos;ve got your back. Checkout and get call assistance
              from our furniture experts. Still not satisfied? Get a refund within 5 hours.
              No gimmicks.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
