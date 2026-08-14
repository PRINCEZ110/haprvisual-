import Link from "next/link";
import SignOutButton from "@/components/admin/SignOutButton";

const LINKS = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Services", href: "/admin/services" },
  { label: "Submissions", href: "/admin/submissions" },
];

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-cream pt-20 lg:pt-24">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md">
        <div className="container-hapr flex h-16 items-center justify-between lg:h-20">
          <Link
            href="/admin/dashboard"
            className="text-sm font-bold uppercase tracking-[0.18em] text-ink"
          >
            HAPR<span className="align-super text-[0.55em]">®</span>{" "}
            <span className="ml-2 rounded-full bg-ink px-2.5 py-1 text-[10px] uppercase tracking-widest text-cream">
              Admin
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden text-sm text-muted transition-colors hover:text-ink md:block"
            >
              View site
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container-hapr py-10 lg:py-14">{children}</main>
    </div>
  );
}