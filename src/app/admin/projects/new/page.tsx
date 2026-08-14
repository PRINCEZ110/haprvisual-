import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import AdminProjectForm from "@/components/admin/AdminProjectForm";

export default async function AdminNewProject() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/projects"
        className="text-sm text-muted transition-colors hover:text-ink"
      >
        ← Back to projects
      </Link>
      <p className="eyebrow mt-8">Portfolio</p>
      <h1 className="mt-4 font-serif text-5xl italic">New project</h1>
      <div className="mt-10">
        <AdminProjectForm mode="create" />
      </div>
    </div>
  );
}