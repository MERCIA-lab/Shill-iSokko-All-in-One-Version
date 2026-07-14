import {
  LayoutDashboard,
  Truck,
  User,
  BarChart3,
  History,
  Bell,
  Plus,
  Calendar,
  Archive,
  Layers,
  Box,
  BookOpen,
  ChevronDown
} from "lucide-react";
import Link from "next/link";

import { Avatar, Badge } from "@imeek/ui";

import { getCompanyContext, getRecentTrip } from "@/lib/dashboard-data";

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  active?: boolean;
  badge?: "growth" | "count";
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, active: true },
  { href: "/shipment", label: "Shipment", icon: Truck },
  { href: "/customer", label: "Costumer", icon: User },
  { href: "/analysis", label: "Analysis", icon: BarChart3, badge: "growth" },
  { href: "/history", label: "History", icon: History },
  { href: "/notifications", label: "Notification", icon: Bell, badge: "count" }
];

const QUICK_ICONS = [Calendar, Archive, Layers, Box, BookOpen];

/**
 * Left navigation rail — company switcher, primary nav (Dashboard is the
 * active route), the red "Recent trips" summary card, and the quick-action
 * dock with "Create new Request" at the bottom.
 */
export async function Sidebar() {
  const [ctx, trip] = await Promise.all([getCompanyContext(), getRecentTrip()]);

  return (
    <aside className="flex w-[280px] shrink-0 flex-col gap-6 border-r border-imeek-line bg-imeek-bg px-5 py-6">
      <div className="flex items-center gap-3">
        <Avatar name={ctx.userName} size={44} />
        <div>
          <p className="text-xs text-imeek-muted">Welcome back,</p>
          <p className="text-sm font-semibold">{ctx.userName}!</p>
        </div>
      </div>

      <button className="flex items-center justify-between rounded-2xl border border-imeek-line bg-imeek-surface px-4 py-3 text-left">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-imeek-bg text-xs font-semibold">
            {ctx.companyShortCode}
          </div>
          <div>
            <p className="text-[11px] text-imeek-muted">Company</p>
            <p className="text-sm font-semibold">{ctx.companyName}</p>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 text-imeek-muted" />
      </button>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.active
                  ? "flex items-center justify-between rounded-2xl bg-imeek-red px-4 py-3 text-sm font-medium text-white"
                  : "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-imeek-ink hover:bg-imeek-surface"
              }
            >
              <span className="flex items-center gap-3">
                <Icon className="h-[18px] w-[18px]" />
                {item.label}
              </span>
              {item.badge === "growth" && (
                <Badge tone="outline" className="border-imeek-red/40 text-imeek-red">
                  +{ctx.analysisGrowthPct}%
                </Badge>
              )}
              {item.badge === "count" && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-imeek-red text-[11px] font-semibold text-white">
                  {ctx.notificationsCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-card bg-imeek-red p-5 text-white">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-base font-semibold leading-tight">
            Recent
            <br />
            trips
          </p>
          <span className="text-xs text-white/80">{trip.date}</span>
        </div>
        <div className="mb-4 flex flex-col gap-2 text-sm">
          <span className="w-fit rounded-pill bg-white px-3 py-1 text-xs font-medium text-imeek-red">
            {trip.durationLabel}
          </span>
          <span className="text-white/85">{trip.speedLabel}</span>
          <span className="text-white/85">{trip.stopsLabel}</span>
        </div>
        <p className="text-2xl font-semibold">{trip.distanceKm} KM</p>
        <p className="text-xs text-white/70">Train ride adventure</p>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <div className="flex items-center justify-around rounded-2xl border border-imeek-line bg-imeek-surface py-3">
          {QUICK_ICONS.map((Icon, i) => (
            <Icon key={i} className="h-[18px] w-[18px] text-imeek-muted" />
          ))}
        </div>
        <button className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-imeek-red/50 py-4 text-sm font-medium text-imeek-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-imeek-red text-white">
            <Plus className="h-4 w-4" />
          </span>
          Create new Request
        </button>
      </div>
    </aside>
  );
}
