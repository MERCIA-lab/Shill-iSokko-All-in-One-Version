import { Bell, TriangleAlert, Wrench } from "lucide-react";

import { Card } from "@imeek/ui";

import { getNotificationFeed } from "@/lib/dashboard-data";

const ICONS: Record<string, typeof Bell> = {
  GEOFENCE: TriangleAlert,
  DELAY: Bell,
  MAINTENANCE: Wrench
};

export default async function NotificationsPage() {
  const feed = await getNotificationFeed();

  return (
    <div className="pt-2">
      <h1 className="mb-5 text-2xl font-semibold">Notification</h1>
      <Card className="flex flex-col gap-3">
        {feed.map((n) => {
          const Icon = ICONS[n.type] ?? Bell;
          return (
            <div
              key={n.id}
              className={
                n.read
                  ? "flex items-start gap-3 rounded-2xl border border-imeek-line px-4 py-3"
                  : "flex items-start gap-3 rounded-2xl border border-imeek-red/30 bg-imeek-red-50 px-4 py-3"
              }
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-imeek-red" />
              <div>
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="text-xs text-imeek-muted">{n.message}</p>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
