import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/components/product/ProductView";
import ProductCard from "@/components/shop/ProductCard";
import { getProductBySlug, getRelatedProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductBySlug(handle);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.shortDescription };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductBySlug(handle);
  if (!product) notFound();
  const related = await getRelatedProducts(product, 4);

  return (
    <>
      <ProductView product={product} />
      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-mist/50 py-14">
          <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="font-accent text-lg text-ink/55 italic">Keep exploring</p>
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-[28px]">
                  You may also like
                </h2>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
