import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TILES = [
  {
    title: "Beds",
    copy: "King, queen, upholstered, storage & wooden bed designs.",
    image: "/images/cat-king.jpg",
    href: "/collections/bed",
  },
  {
    title: "Sofas",
    copy: "2 & 3 seaters, L-shaped, sectional, recliner & designer sofas.",
    image: "/images/cat-lshape.jpg",
    href: "/collections/sofa",
  },
];

export const metadata = { title: "Collections" };

export default function CollectionsIndex() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 lg:px-8 lg:py-20">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-ink/50 uppercase">
        AR Furniture
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Collections
      </h1>
      <p className="mt-4 max-w-xl text-[15px] text-ink/60">
        Two categories, obsessively perfected. Choose where to begin.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {TILES.map((t) => (
          <Link key={t.title} href={t.href} className="group relative block overflow-hidden bg-mist">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={t.image}
                alt={t.title}
                fill
                sizes="(min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
            <div className="absolute right-6 bottom-6 left-6 text-white">
              <h2 className="font-display text-3xl font-bold">{t.title}</h2>
              <p className="mt-1 text-sm text-white/80">{t.copy}</p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-transform group-hover:-translate-y-0.5">
                Shop now <ArrowRight className="size-4" strokeWidth={1.7} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
