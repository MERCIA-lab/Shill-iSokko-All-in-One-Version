import type { Metadata } from "next";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "iMeek Cargo | Dashboard",
  description: "Shipment tracking and fleet operations dashboard"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-imeek-bg">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar />
            <main className="flex-1 px-6 pb-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
