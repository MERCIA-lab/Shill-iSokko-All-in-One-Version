import { notFound } from "next/navigation";

import { Card } from "@imeek/ui";

import { getProduct, formatPrice } from "@/lib/products";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div className="aspect-square rounded-card bg-imeek-bg" />
      <div>
        <p className="mb-2 text-xs text-imeek-muted">{product.sku}</p>
        <h1 className="mb-4 text-2xl font-semibold">{product.title}</h1>
        <p className="mb-6 text-sm text-imeek-muted">{product.description}</p>
        <p className="mb-6 text-3xl font-semibold text-imeek-red">
          {formatPrice(product.priceCents, product.currency)}
        </p>
        <Card className="mb-6 flex items-center justify-between text-sm">
          <span className="text-imeek-muted">In stock</span>
          <span className="font-medium">{product.inventoryQty} units</span>
        </Card>
        <button className="w-full rounded-pill bg-imeek-red py-3 text-sm font-medium text-white">
          Add to cart
        </button>
      </div>
    </div>
  );
}
