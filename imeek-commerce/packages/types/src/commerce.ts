/** Storefront / marketplace domain types (apps/web, catalog-service, order-service) */

export interface Product {
  id: string;
  sku: string;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  images: string[];
  categoryId: string;
  inventoryQty: number;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
}

export type OrderStatus =
  | "CREATED"
  | "PAID"
  | "FULFILLED"
  | "SHIPPED"
  | "COMPLETED"
  | "REFUNDED"
  | "CANCELLED";

export interface OrderLine {
  productId: string;
  quantity: number;
  unitPriceCents: number;
}

export interface Order {
  id: string;
  customerId: string;
  status: OrderStatus;
  lines: OrderLine[];
  totalCents: number;
  currency: string;
  shipmentId?: string | null;
  createdAt: string;
}

export type MarketplaceChannel = "AMAZON" | "EBAY" | "SHOPIFY" | "DIRECT";

export interface MarketplaceListing {
  id: string;
  productId: string;
  channel: MarketplaceChannel;
  externalId: string;
  syncedAt: string | null;
  status: "SYNCED" | "PENDING" | "ERROR";
}
