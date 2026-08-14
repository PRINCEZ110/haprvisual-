import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [projects, submissions, unread] = await Promise.all([
    prisma.project.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
  ]);

  const cards = [
    { label: "Projects", value: projects, href: "/admin/projects" },
    { label: "Submissions", value: submissions, href: "/admin/submissions" },
    { label: "Unread", value: unread, href: "/admin/submissions?filter=unread" },
  ];

  return (
    <div>
      <p className="eyebrow">Overview</p>
      <h1 className="mt-4 font-serif text-5xl italic">Dashboard</h1>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group border border-line bg-white/50 p-8 transition-colors hover:border-ink"
          >
            <p className="font-serif text-6xl italic">{card.value}</p>
            <p className="mt-3 text-sm text-muted">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        <Link
          href="/admin/projects/new"
          className="group flex items-center justify-between border border-line bg-white/50 p-8 transition-colors hover:border-ink"
        >
          <div>
            <p className="text-lg font-medium">Add a project</p>
            <p className="mt-1 text-sm text-muted">
              Publish a new render to the portfolio grid.
            </p>
          </div>
          <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
        </Link>
        <Link
          href="/admin/services"
          className="group flex items-center justify-between border border-line bg-white/50 p-8 transition-colors hover:border-ink"
        >
          <div>
            <p className="text-lg font-medium">Edit services</p>
            <p className="mt-1 text-sm text-muted">
              Update the five service titles and descriptions.
            </p>
          </div>
          <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}