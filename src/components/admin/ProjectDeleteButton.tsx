"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
    else alert("Failed to delete project.");
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={busy}
      className="text-xs text-red-700 underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-50"
    >
      {busy ? "Deleting..." : "Delete"}
    </button>
  );
}