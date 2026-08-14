"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="rounded-full border border-line px-4 py-1.5 text-sm text-ink/70 transition-colors hover:border-ink hover:text-ink"
    >
      Sign out
    </button>
  );
}