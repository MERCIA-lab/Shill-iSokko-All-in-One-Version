import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingCart, Truck } from "lucide-react";

import "./globals.css";

export const metadata: Metadata = {
  title: "iMeek | Storefront",
  description: "Freight-safe goods, shipped by the iMeek fleet"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="flex items-center justify-between border-b border-imeek-line px-8 py-5">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-imeek-red text-white">
              <Truck className="h-4 w-4" />
            </span>
            iMeek
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/products">Products</Link>
            <Link href="/cart" className="flex items-center gap-1">
              <ShoppingCart className="h-4 w-4" />
              Cart
            </Link>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-8 py-10">{children}</main>
      </body>
    </html>
  );
}
