import Link from "next/link";

import { Card } from "@imeek/ui";

import { listProducts, formatPrice } from "@/lib/products";

export default async function HomePage() {
  const products = await listProducts();

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-card bg-imeek-red p-10 text-white">
        <p className="mb-2 text-sm text-white/80">Powered by the iMeek fleet</p>
        <h1 className="mb-4 max-w-lg text-3xl font-semibold leading-tight">
          Shop goods shipped with live, trackable freight.
        </h1>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-pill bg-white px-5 py-2 text-sm font-medium text-imeek-red"
        >
          Browse products
        </Link>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Featured</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <Card className="flex h-full flex-col gap-3">
                <div className="aspect-square w-full rounded-2xl bg-imeek-bg" />
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="text-xs text-imeek-muted line-clamp-2">{p.description}</p>
                <p className="mt-auto text-lg font-semibold text-imeek-red">
                  {formatPrice(p.priceCents, p.currency)}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
