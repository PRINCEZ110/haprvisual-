import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SubmissionsAdmin from "@/components/admin/SubmissionsAdmin";

export default async function AdminSubmissions({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const filter = searchParams.filter;
  const where = filter === "read" || filter === "unread" ? { read: filter === "read" } : undefined;

  const submissions = await prisma.contactSubmission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Inbox</p>
          <h1 className="mt-4 font-serif text-5xl italic">Submissions</h1>
        </div>
        <div className="flex gap-3 text-xs uppercase tracking-widest">
          {[
            { label: "All", value: "" },
            { label: "Unread", value: "unread" },
            { label: "Read", value: "read" },
          ].map((f) => (
            <a
              key={f.label}
              href={`/admin/submissions${f.value ? `?filter=${f.value}` : ""}`}
              className={
                (filter ?? "") === f.value
                  ? "underline underline-offset-4 text-ink"
                  : "text-muted hover:text-ink"
              }
            >
              {f.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <SubmissionsAdmin
          submissions={submissions.map((s) => ({
            ...s,
            createdAt: s.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}