import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects, slugify } from "@/lib/data";

const INK = "#241D19";
const MUTED = "#8F7770";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — HAPR Visual`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const [project, all] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);
  if (!project) notFound();

  const index = all.findIndex((p) => p.id === project.id);
  const next = all.length > 1 ? all[(index + 1) % all.length] : undefined;
  const category = project.categories[0]?.name ?? "Visualization";

  return (
    <div className="bg-blush">
      <section className="container-hapr pt-28 lg:pt-36">
        <Link
          href="/#projects"
          className="text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-ink"
        >
          ← Back to projects
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p
              className="text-[11px] uppercase tracking-[0.25em]"
              style={{ color: MUTED }}
            >
              Project {String(index + 1).padStart(2, "0")} — {category}
            </p>
            <h1
              className="mt-4 font-serif text-5xl font-normal italic leading-[1.02] lg:text-7xl"
              style={{ color: INK }}
            >
              {project.title}
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: MUTED }}
            >
              {project.year}
            </p>
            <p className="mt-4 max-w-md text-sm leading-[1.8]" style={{ color: MUTED }}>
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section className="container-hapr mt-14 lg:mt-20">
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[16/9]">
          <Image
            src={project.coverImage}
            alt={`${project.title} — cover`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 outline outline-1 outline-offset-[-10px] outline-[rgba(60,40,30,0.16)]" />
        </div>
      </section>

      {project.images.length > 0 && (
        <section className="container-hapr mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          {project.images.map((image, i) => (
            <div
              key={`${image.url}-${i}`}
              className={`relative overflow-hidden ${
                project.images.length % 2 === 1 && i === project.images.length - 1
                  ? "aspect-[4/3] lg:col-span-2"
                  : "aspect-[4/3]"
              }`}
            >
              <Image
                src={image.url}
                alt={`${project.title} — view ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </section>
      )}

      <section className="container-hapr mt-14 border-t border-line pb-4 pt-10 lg:mt-20">
        <p className="eyebrow">Services involved</p>
        <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
          {project.categories.map((c) => (
            <li key={c.name} className="text-sm font-medium text-ink">
              {c.name}
            </li>
          ))}
        </ul>
      </section>

      {next && (
        <section className="container-hapr">
          <div className="mt-10 border-t border-line py-16 text-center lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.25em]" style={{ color: MUTED }}>
              Next project
            </p>
            <h2 className="mt-4 font-serif text-4xl italic lg:text-6xl" style={{ color: INK }}>
              <Link
                href={`/projects/${slugify(next.title)}`}
                className="transition-opacity duration-300 hover:opacity-70"
              >
                {next.title}
              </Link>
            </h2>
            <p className="mt-4 text-[11px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>
              {next.year} — {next.categories[0]?.name ?? "Visualization"}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}