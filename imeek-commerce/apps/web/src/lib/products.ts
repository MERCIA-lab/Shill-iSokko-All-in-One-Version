import type { Product } from "@imeek/types";

/**
 * Storefront product source. Same pattern as apps/admin/lib: swap the
 * body of `listProducts` for a fetch against apps/api's catalog module
 * (or services/catalog-service directly) without touching any page.
 */
const PRODUCTS: Product[] = [
  {
    id: "prd_1",
    sku: "IMK-CHEM-01",
    title: "Household chemicals starter pack",
    description: "Everyday cleaning essentials, packed for freight-safe transit.",
    priceCents: 5245,
    currency: "USD",
    images: [],
    categoryId: "cat_home",
    inventoryQty: 320,
    active: true
  },
  {
    id: "prd_2",
    sku: "IMK-ELEC-14",
    title: "Warehouse barcode scanner",
    description: "Rugged handheld scanner used across the iMeek fulfillment network.",
    priceCents: 8999,
    currency: "USD",
    images: [],
    categoryId: "cat_electronics",
    inventoryQty: 54,
    active: true
  },
  {
    id: "prd_3",
    sku: "IMK-CRATE-07",
    title: "Stackable freight crate (M)",
    description: "Reinforced polymer crate rated for 80kg loads.",
    priceCents: 3499,
    currency: "USD",
    images: [],
    categoryId: "cat_logistics",
    inventoryQty: 210,
    active: true
  }
];

export async function listProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}
