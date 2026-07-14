import Link from "next/link";

import { Card } from "@imeek/ui";

import { listProducts, formatPrice } from "@/lib/products";

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Products</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <Card className="flex h-full flex-col gap-3">
              <div className="aspect-square w-full rounded-2xl bg-imeek-bg" />
              <p className="text-sm font-semibold">{p.title}</p>
              <p className="text-xs text-imeek-muted">{p.sku}</p>
              <p className="mt-auto text-lg font-semibold text-imeek-red">
                {formatPrice(p.priceCents, p.currency)}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
