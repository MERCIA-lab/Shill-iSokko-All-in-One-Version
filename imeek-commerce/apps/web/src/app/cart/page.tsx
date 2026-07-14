import { Card } from "@imeek/ui";

/**
 * Cart is intentionally client-state-free here (server component) since
 * this scaffold has no session/cart persistence wired up yet — the real
 * implementation reads/writes through order-service once auth is wired
 * from apps/api. Shown as an empty state for now.
 */
export default function CartPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Your cart</h1>
      <Card className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-sm font-semibold">Your cart is empty</p>
        <p className="text-xs text-imeek-muted">Add products to see them here.</p>
      </Card>
    </div>
  );
}
