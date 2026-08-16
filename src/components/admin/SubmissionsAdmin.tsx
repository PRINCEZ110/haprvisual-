"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type Submission = {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  deadline: string;
  message: string | null;
  read: boolean;
  createdAt: string;
};

export default function SubmissionsAdmin({ submissions }: { submissions: Submission[] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function toggleRead(s: Submission) {
    setBusyId(s.id);
    await fetch(`/api/admin/submissions/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !s.read }),
    });
    setBusyId(null);
    router.refresh();
  }

  async function remove(s: Submission) {
    if (!confirm(`Delete submission from ${s.name}?`)) return;
    setBusyId(s.id);
    await fetch(`/api/admin/submissions/${s.id}`, { method: "DELETE" });
    setBusyId(null);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {submissions.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          No submissions yet.
        </p>
      ) : (
        submissions.map((s) => (
          <div key={s.id} className="border border-line bg-white/50">
            <button
              type="button"
              onClick={() => setOpenId(openId === s.id ? null : s.id)}
              className="flex w-full flex-wrap items-center gap-x-6 gap-y-2 px-6 py-5 text-left"
            >
              <span
                className={`h-2 w-2 rounded-full ${s.read ? "bg-line" : "bg-ink"}`}
                title={s.read ? "Read" : "Unread"}
              />
              <span className="font-medium">{s.name}</span>
              <span className="text-sm text-muted">{s.email}</span>
              <span className="text-sm text-muted">{s.service}</span>
              <span className="text-sm text-muted">{s.budget}</span>
              <span className="text-sm text-muted">{s.deadline}</span>
              <span className="ml-auto text-xs text-muted">
                {new Date(s.createdAt).toLocaleString()}
              </span>
            </button>

            {openId === s.id && (
              <div className="border-t border-line px-6 py-5">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Deadline: <span className="text-ink">{s.deadline}</span>
                </p>
                {s.message ? (
                  <p className="max-w-2xl text-sm leading-relaxed text-ink/90">{s.message}</p>
                ) : (
                  <p className="text-sm text-muted">No project description provided.</p>
                )}
                <div className="mt-5 flex gap-5">
                  <button
                    type="button"
                    onClick={() => toggleRead(s)}
                    disabled={busyId === s.id}
                    className="text-xs underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-50"
                  >
                    Mark as {s.read ? "unread" : "read"}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(s)}
                    disabled={busyId === s.id}
                    className="text-xs text-red-700 underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}