"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectItem } from "@/lib/data";

export default function Projects({
  projects,
}: {
  projects: ProjectItem[];
}) {
  const allTags = useMemo(
    () => [...new Set(projects.flatMap((p) => p.categories.map((c) => c.name)))],
    [projects]
  );
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories.some((c) => c.name === active));

  return (
    <section id="projects" className="container-hapr py-24 lg:py-32">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-serif text-5xl italic text-ink lg:text-6xl">
          Our projects
        </h2>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {["All", ...allTags].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              className={`text-xs uppercase tracking-[0.18em] transition-colors ${
                active === tag
                  ? "text-ink underline underline-offset-4"
                  : "text-muted hover:text-ink"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
      >
        {filtered.map((project) => (
          <motion.a
            key={project.id}
            href="#contact-form"
            className="group block break-inside-avoid"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden bg-cream-dark">
              <div className="relative aspect-[4/3] cursor-crosshair">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="text-sm font-medium text-ink">{project.title}</h3>
              <span className="text-xs text-muted">{project.year}</span>
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-muted">
              {project.description}
            </p>
          </motion.a>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-muted">
          No projects in this category yet — check back soon.
        </p>
      )}
    </section>
  );
}