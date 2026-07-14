import { Search, Menu, ChevronDown } from "lucide-react";

/** Top header bar — page title, truck selector, search, and menu toggle. */
export function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Shipment track</h1>
        <button className="flex items-center gap-2 rounded-pill border border-imeek-line bg-imeek-surface px-4 py-2 text-sm text-imeek-ink">
          Select truck
          <ChevronDown className="h-4 w-4 text-imeek-muted" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-pill border border-imeek-line bg-imeek-surface px-4 py-2">
          <input
            placeholder="Search"
            className="w-40 bg-transparent text-sm text-imeek-ink placeholder:text-imeek-muted focus:outline-none"
          />
          <Search className="h-4 w-4 text-imeek-muted" />
        </div>
        <button
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-pill border border-imeek-line bg-imeek-surface"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
