import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminProjectForm from "@/components/admin/AdminProjectForm";

export default async function AdminEditProject({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { categories: { select: { name: true } }, images: { select: { url: true } } },
  });
  if (!project) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/projects"
        className="text-sm text-muted transition-colors hover:text-ink"
      >
        ← Back to projects
      </Link>
      <p className="eyebrow mt-8">Portfolio</p>
      <h1 className="mt-4 font-serif text-5xl italic">Edit project</h1>
      <div className="mt-10">
        <AdminProjectForm
          mode="edit"
          initial={{
            id: project.id,
            title: project.title,
            year: project.year,
            description: project.description,
            coverImage: project.coverImage,
            categories: project.categories.map((c) => c.name),
            gallery: project.images.map((i) => i.url),
          }}
        />
      </div>
    </div>
  );
}