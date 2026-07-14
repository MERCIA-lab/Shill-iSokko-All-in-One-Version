import React from "react";
import {
  LayoutDashboard, Truck, User, BarChart3, History, Bell, Plus,
  Calendar, Archive, Layers, Box, BookOpen, ChevronDown, Search,
  Menu, MoreHorizontal, Send, Paperclip, Download, Maximize2
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, LineChart, Line } from "recharts";

// Design tokens lifted 1:1 from packages/ui/tailwind-preset.js in the repo
const C = {
  bg: "#F3F1EA",
  surface: "#FFFFFF",
  ink: "#1B1A17",
  muted: "#8A8A82",
  line: "#E6E3D8",
  red: "#E8483D",
  redSoft: "#FDEEEC",
};

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Shipment", icon: Truck },
  { label: "Costumer", icon: User },
  { label: "Analysis", icon: BarChart3, badge: "+20%" },
  { label: "History", icon: History },
  { label: "Notification", icon: Bell, count: 2 },
];

const trend = [
  { d: "28.10", v: 3 }, { d: "29.10", v: 4 }, { d: "30.10", v: 2 },
  { d: "31.10", v: 5 }, { d: "01.11", v: 8 }, { d: "02.11", v: 4 }, { d: "03.11", v: 3 },
];

const efficiency = [
  { x: 0, y: 20 }, { x: 1, y: 45 }, { x: 2, y: 30 }, { x: 3, y: 60 },
  { x: 4, y: 40 }, { x: 5, y: 75 }, { x: 6, y: 55 }, { x: 7, y: 90 }, { x: 8, y: 96 },
];

function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{ background: C.surface, boxShadow: "0 1px 2px rgba(27,26,23,.04), 0 8px 24px rgba(27,26,23,.04)", ...style }}
    >
      {children}
    </div>
  );
}

function Pill({ children, active }) {
  return (
    <span
      className="rounded-full px-4 py-1.5 text-xs font-medium"
      style={active
        ? { background: C.red, color: "#fff" }
        : { background: "rgba(255,255,255,.8)", color: C.red, border: `1px solid ${C.red}66` }}
    >
      {children}
    </span>
  );
}

function Btn({ children, outline }) {
  return (
    <button
      className="rounded-full px-4 py-1.5 text-xs font-semibold"
      style={outline
        ? { border: `1px solid ${C.red}`, color: C.red, background: "transparent" }
        : { background: C.red, color: "#fff" }}
    >
      {children}
    </button>
  );
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full font-sans" style={{ background: C.bg, color: C.ink }}>
      {/* ---------------- Sidebar ---------------- */}
      <aside className="hidden md:flex w-[260px] shrink-0 flex-col gap-5 px-4 py-5" style={{ borderRight: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: C.red, color: "#fff" }}>A</div>
          <div>
            <p className="text-[11px]" style={{ color: C.muted }}>Welcome back,</p>
            <p className="text-sm font-semibold">Alex!</p>
          </div>
        </div>

        <button className="flex items-center justify-between rounded-2xl px-4 py-3" style={{ border: `1px solid ${C.line}`, background: C.surface }}>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-semibold" style={{ background: C.bg }}>LS</div>
            <div className="text-left">
              <p className="text-[10px]" style={{ color: C.muted }}>Company</p>
              <p className="text-sm font-semibold">Load Swift NYC</p>
            </div>
          </div>
          <ChevronDown className="h-4 w-4" style={{ color: C.muted }} />
        </button>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium cursor-pointer"
                style={item.active ? { background: C.red, color: "#fff" } : { color: C.ink }}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-[18px] w-[18px]" />
                  {item.label}
                </span>
                {item.badge && (
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ border: `1px solid ${C.red}66`, color: C.red }}>
                    {item.badge}
                  </span>
                )}
                {item.count && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold" style={{ background: C.red, color: "#fff" }}>
                    {item.count}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        <div className="rounded-2xl p-5 text-white" style={{ background: C.red }}>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-base font-semibold leading-tight">Recent<br />trips</p>
            <span className="text-xs text-white/80">28 Oct</span>
          </div>
          <div className="mb-4 flex flex-col gap-2 text-sm">
            <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-medium" style={{ color: C.red }}>Duration</span>
            <span className="text-white/85">Speed</span>
            <span className="text-white/85">Stops</span>
          </div>
          <p className="text-2xl font-semibold">1246 KM</p>
          <p className="text-xs text-white/70">Train ride adventure</p>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center justify-around rounded-2xl py-3" style={{ border: `1px solid ${C.line}`, background: C.surface }}>
            {[Calendar, Archive, Layers, Box, BookOpen].map((Icon, i) => (
              <Icon key={i} className="h-[18px] w-[18px]" style={{ color: C.muted }} />
            ))}
          </div>
          <button className="flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium" style={{ border: `1.5px dashed ${C.red}80` }}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full text-white" style={{ background: C.red }}>
              <Plus className="h-4 w-4" />
            </span>
            Create new Request
          </button>
        </div>
      </aside>

      {/* ---------------- Main ---------------- */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-semibold">Shipment track</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 rounded-full px-4 py-2 text-sm" style={{ border: `1px solid ${C.line}`, background: C.surface }}>
              Select truck <ChevronDown className="h-4 w-4" />
            </button>
            <div className="hidden sm:flex items-center gap-2 rounded-full px-4 py-2 text-sm" style={{ border: `1px solid ${C.line}`, background: C.surface }}>
              <Search className="h-4 w-4" style={{ color: C.muted }} />
              <span style={{ color: C.muted }}>Search</span>
            </div>
            <button className="h-9 w-9 rounded-full flex items-center justify-center" style={{ border: `1px solid ${C.line}`, background: C.surface }}>
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 px-6 pb-8">
          {/* Map + Alerts */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
            <Card className="relative min-h-[340px] overflow-hidden !p-0">
              <svg viewBox="0 0 800 400" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                <rect width="800" height="400" fill="#EFEDE4" />
                <g stroke="#DEDBCC" strokeWidth="1">
                  {Array.from({ length: 16 }).map((_, i) => <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />)}
                  {Array.from({ length: 8 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />)}
                </g>
                <path d="M120 340 C 220 340, 260 260, 340 250 C 430 240, 460 190, 560 180 C 650 172, 700 130, 760 110" fill="none" stroke={C.red} strokeWidth="5" strokeLinecap="round" />
                {[{ x: 120, y: 340, n: 1 }, { x: 350, y: 248, n: 2 }, { x: 660, y: 122, n: 3 }].map((p) => (
                  <g key={p.n}>
                    <circle cx={p.x} cy={p.y} r="14" fill={C.red} />
                    <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="white">{p.n}</text>
                  </g>
                ))}
              </svg>
              <div className="relative z-10 flex flex-col gap-5 p-6">
                <div className="flex gap-2">
                  <Pill active>Tracking</Pill>
                  <Pill>Traffic jams</Pill>
                  <Pill>POI</Pill>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: C.muted }}>Distance to arrival:</p>
                  <p className="text-2xl font-bold" style={{ color: C.red }}>
                    120<span className="text-sm font-medium" style={{ color: C.ink }}>km</span> / 1
                    <span className="text-sm font-medium" style={{ color: C.ink }}>h.</span>50
                    <span className="text-sm font-medium" style={{ color: C.ink }}>min.</span>
                  </p>
                </div>
                <div className="max-w-xs rounded-2xl p-4" style={{ background: "rgba(255,255,255,.85)" }}>
                  <p className="mb-2 text-xs" style={{ color: C.muted }}>Traffic and route optimization:</p>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xl font-semibold" style={{ color: C.red }}>85%</span>
                    <div className="h-1.5 flex-1 rounded-full" style={{ background: C.line }}>
                      <div className="h-1.5 rounded-full" style={{ width: "85%", background: C.red }} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Btn>Optimize</Btn>
                    <Btn outline>View all</Btn>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold">Alerts and Notifications:</p>
                <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: C.red, color: "#fff" }}>
                  <Bell className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="rounded-2xl p-4" style={{ background: C.bg }}>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold">Geofencing alert</p>
                  <span className="text-[11px]" style={{ color: C.muted }}>13:48</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
                  Truck crossed geofence at Warehouse A. Driver arrival notification sent to staff.
                </p>
              </div>
            </Card>
          </div>

          {/* Shipment details + Truck capacity */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5">
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-semibold">Shipment details</p>
                <span className="text-xs font-medium underline cursor-pointer" style={{ color: C.muted }}>Read more</span>
              </div>
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: C.bg }}>MJ</div>
                  <div>
                    <p className="text-sm font-semibold">Michael Johnson</p>
                    <p className="text-[11px]" style={{ color: C.muted }}>1241AA4121BB2351AB · Ukraine</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: C.muted }}>Rating</span>
                  <span className="rounded-full px-2 py-0.5 text-xs font-semibold text-white" style={{ background: C.red }}>4.2</span>
                  <MoreHorizontal className="h-4 w-4" style={{ color: C.muted }} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-2xl p-5" style={{ background: C.bg }}>
                <div>
                  <p className="text-xs font-semibold mb-1">Novaposhta parcels</p>
                  <p className="text-xs mb-3" style={{ color: C.red }}>Have been paid</p>
                  <p className="text-xl font-bold" style={{ color: C.red }}>$ 520,45</p>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-2">Parcels Loading</p>
                  <div className="flex items-center justify-between text-[11px] mb-1" style={{ color: C.muted }}>
                    <span>Kyiv</span><span>Rivne</span>
                  </div>
                  <div className="h-1 rounded-full mb-4" style={{ background: C.line }}>
                    <div className="h-1 rounded-full" style={{ width: "60%", background: C.red }} />
                  </div>
                  <p className="text-xs" style={{ color: C.muted }}>Date of arrival</p>
                  <p className="text-sm font-semibold">28.10.23</p>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-2">Status</p>
                  <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white mb-4" style={{ background: C.red }}>Delivered</span>
                  <p className="text-xs font-semibold mb-1">Type of Parcels</p>
                  <span className="inline-block rounded-full px-3 py-1 text-xs font-medium" style={{ background: C.redSoft, color: C.red }}>Household chemicals</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-semibold">Current truck capacity</p>
                <span className="text-xs font-medium underline cursor-pointer" style={{ color: C.muted }}>Read more</span>
              </div>
              <div className="relative mb-5 flex h-28 items-center justify-center rounded-2xl" style={{ background: C.bg }}>
                <Truck className="h-16 w-16" style={{ color: C.ink }} strokeWidth={1.3} />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 rounded-xl px-4 py-3 text-lg font-bold text-white" style={{ background: `repeating-linear-gradient(135deg, ${C.red}, ${C.red} 8px, #d63a2f 8px, #d63a2f 16px)` }}>
                  86%
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">AL - 223965406</span>
                <span className="flex items-center gap-1 text-xs font-medium" style={{ color: C.red }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.red }} /> On-Route
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span style={{ color: C.muted }}>Max Load</span>
                <span className="font-semibold">8.453 KG</span>
              </div>
            </Card>
          </div>

          {/* Trends + Efficiency + Chat */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-base font-semibold">Shipment trends</p>
                <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ background: C.red }}>
                  <Download className="h-3.5 w-3.5" />
                </span>
              </div>
              <Pill active>5 shipments</Pill>
              <div className="h-28 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trend}>
                    <Bar dataKey="v" radius={[4, 4, 0, 0]} fill={C.red} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between text-[10px] mt-1" style={{ color: C.muted }}>
                {trend.map((t) => <span key={t.d}>{t.d}</span>)}
              </div>
            </Card>

            <Card className="p-6 text-white" style={{ background: C.red }}>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-base font-semibold">Route efficiency</p>
                <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,.25)" }}>
                  <Download className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="text-4xl font-bold leading-none">96<span className="text-2xl">%</span></p>
              <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,.8)" }}>The best road</p>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={efficiency}>
                    <Line type="monotone" dataKey="y" stroke="#fff" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,.85)" }}>Send the best route to the driver&apos;s email</p>
            </Card>

            <Card className="p-5 flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-base font-semibold">Chat</p>
                <Maximize2 className="h-4 w-4" style={{ color: C.muted }} />
              </div>
              <div className="flex-1 flex flex-col gap-3 mb-3">
                <div className="flex items-end gap-2">
                  <div className="h-7 w-7 rounded-full" style={{ background: C.bg }} />
                  <div className="rounded-2xl rounded-bl-sm px-3 py-2 text-sm" style={{ background: C.bg }}>Hi!</div>
                </div>
                <div className="flex items-end justify-end gap-2">
                  <div className="rounded-2xl rounded-br-sm px-3 py-2 text-sm text-white" style={{ background: C.red }}>Hi! What is your question?</div>
                  <div className="h-7 w-7 rounded-full" style={{ background: C.line }} />
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full px-3 py-2" style={{ border: `1px solid ${C.line}` }}>
                <Paperclip className="h-4 w-4" style={{ color: C.muted }} />
                <span className="flex-1 text-sm" style={{ color: C.muted }}>Message</span>
                <Send className="h-4 w-4" style={{ color: C.red }} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
