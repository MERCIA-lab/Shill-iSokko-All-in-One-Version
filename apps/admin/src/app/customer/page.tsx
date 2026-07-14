import { Star } from "lucide-react";

import { Avatar, Badge, Card } from "@imeek/ui";

import { getCustomerList } from "@/lib/dashboard-data";

export default async function CustomerPage() {
  const customers = await getCustomerList();

  return (
    <div className="pt-2">
      <h1 className="mb-5 text-2xl font-semibold">Costumer</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {customers.map((c) => (
          <Card key={c.id} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Avatar name={c.name} src={c.avatarUrl} size={44} />
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-imeek-muted">{c.country}</p>
              </div>
            </div>
            <p className="text-xs text-imeek-muted">{c.documentId}</p>
            <div className="flex items-center justify-between">
              <Badge tone="red" className="gap-1">
                <Star className="h-3 w-3 fill-white" />
                {c.rating}
              </Badge>
              <span className="text-xs text-imeek-muted">
                Since {new Date(c.createdAt).getFullYear()}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
