import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProjectDeleteButton from "@/components/admin/ProjectDeleteButton";

export default async function AdminProjects() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { categories: { select: { name: true } } },
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1 className="mt-4 font-serif text-5xl italic">Projects</h1>
        </div>
        <Link href="/admin/projects/new" className="pill">
          + New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted">
          No projects yet — create your first one.
        </p>
      ) : (
        <div className="mt-10 overflow-x-auto border border-line bg-white/50">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-widest text-muted">
                <th className="px-5 py-4 font-medium">Image</th>
                <th className="px-5 py-4 font-medium">Name</th>
                <th className="px-5 py-4 font-medium">Year</th>
                <th className="px-5 py-4 font-medium">Categories</th>
                <th className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3">
                    <div className="relative h-12 w-16 overflow-hidden">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3 font-medium">{project.title}</td>
                  <td className="px-5 py-3 text-muted">{project.year}</td>
                  <td className="px-5 py-3 text-muted">
                    {project.categories.map((c) => c.name).join(", ") || "—"}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-xs underline underline-offset-4 transition-opacity hover:opacity-70"
                      >
                        Edit
                      </Link>
                      <ProjectDeleteButton id={project.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}