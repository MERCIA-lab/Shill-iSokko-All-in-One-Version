"use client";

import { Maximize2, Paperclip, Sparkles } from "lucide-react";
import { useState } from "react";

import type { Customer } from "@imeek/types";

import { Avatar, Card } from "@imeek/ui";

export interface ChatMessage {
  id: string;
  author: string;
  body: string;
  fromMe: boolean;
}

/** Inline chat with the driver/customer for this shipment. */
export function ChatPanel({
  messages,
  contact
}: {
  messages: ChatMessage[];
  contact: Customer;
}) {
  const [draft, setDraft] = useState("");
  const [thread, setThread] = useState(messages);

  function send() {
    if (!draft.trim()) return;
    setThread((t) => [...t, { id: crypto.randomUUID(), author: "Alex", body: draft, fromMe: true }]);
    setDraft("");
  }

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Chat</h2>
        <button
          aria-label="Expand chat"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-imeek-red text-white"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {thread.map((m) =>
          m.fromMe ? (
            <div key={m.id} className="flex items-end justify-end gap-2">
              <div className="max-w-[70%] rounded-2xl rounded-br-sm bg-imeek-red px-4 py-2 text-sm text-white">
                {m.body}
              </div>
              <Avatar name={m.author} size={28} />
            </div>
          ) : (
            <div key={m.id} className="flex items-end gap-2">
              <Avatar name={m.author} src={contact.avatarUrl} size={28} />
              <div className="max-w-[70%] rounded-2xl rounded-bl-sm bg-imeek-bg px-4 py-2 text-sm">
                {m.body}
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex items-center gap-2 rounded-pill border border-imeek-line px-4 py-2">
        <Paperclip className="h-4 w-4 text-imeek-muted" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message"
          className="flex-1 bg-transparent text-sm focus:outline-none"
        />
        <button onClick={send} aria-label="Send">
          <Sparkles className="h-4 w-4 text-imeek-red" />
        </button>
      </div>
    </Card>
  );
}
