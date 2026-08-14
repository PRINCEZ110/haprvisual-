"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ServiceItem } from "@/lib/data";

export default function ServicesAdmin({ services }: { services: ServiceItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(
    services.map((s) => ({ id: s.id, title: s.title, description: s.description }))
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const setField = (i: number, key: "title" | "description", value: string) =>
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, [key]: value } : item)));

  async function handleSave() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ services: items }),
    });
    setSaving(false);
    if (res.ok) {
      setMessage("Services saved.");
      router.refresh();
    } else {
      setMessage("Failed to save services.");
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Site content</p>
          <h1 className="mt-4 font-serif text-5xl italic">Services</h1>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="pill disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save all"}
        </button>
      </div>

      {message && <p className="mt-6 text-sm text-muted">{message}</p>}

      <div className="mt-10 space-y-8">
        {items.map((item, i) => (
          <div key={item.id} className="border border-line bg-white/50 p-6">
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <input
                type="text"
                value={item.title}
                onChange={(e) => setField(i, "title", e.target.value)}
                className="field font-medium"
              />
            </div>
            <textarea
              rows={4}
              value={item.description}
              onChange={(e) => setField(i, "description", e.target.value)}
              className="field mt-4 resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}