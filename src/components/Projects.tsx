"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECT_VIDEOS } from "@/lib/videos";
import { slugify, type ProjectItem } from "@/lib/data";

const INK = "#241D19";
const MUTED = "#8F7770";
const HAIRLINE = "border-[rgba(60,40,30,0.12)]";

function FullscreenPlate({
  item,
  index,
  total,
}: {
  item: ProjectItem;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterOnly, setPosterOnly] = useState(false);
  const [failed, setFailed] = useState(false);
  const category = item.categories[0]?.name ?? "Visualization";
  const src = PROJECT_VIDEOS[item.title];

  useEffect(() => {
    setPosterOnly(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    const el = ref.current;
    const video = videoRef.current;
    if (!el || !video || !src || posterOnly) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, posterOnly]);

  return (
    <div
      ref={ref}
      className="relative h-full w-full overflow-hidden bg-espresso"
    >
      {src && !posterOnly && !failed ? (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          webkit-playsinline=""
          preload="auto"
          poster={item.coverImage}
          aria-hidden="true"
          tabIndex={-1}
          onEnded={(e) => {
            const v = e.currentTarget;
            v.currentTime = 0;
            v.play().catch(() => {});
          }}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/30" />
      <div className="pointer-events-none absolute inset-0 outline outline-1 outline-offset-[-10px] outline-white/15" />

      <p
        className="pointer-events-none absolute right-5 top-5 font-serif text-sm italic text-white/70 lg:right-10 lg:top-8"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      <a
        href={`/projects/${slugify(item.title)}`}
        className="group absolute inset-x-0 bottom-0 block"
        aria-label={`${item.title} — view project`}
      >
        <div className="px-5 pb-8 pt-24 sm:px-10 lg:px-16 lg:pb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">
            Project {String(index + 1).padStart(2, "0")} — {category}
          </p>
          <h3 className="mt-3 font-serif text-4xl font-normal italic leading-[1.02] text-white transition-opacity duration-300 group-hover:opacity-75 sm:text-5xl lg:text-7xl">
            {item.title}
          </h3>
          <p className="mt-4 max-w-md text-[13px] leading-[1.7] text-white/85 sm:text-sm lg:mt-5">
            {item.description}
          </p>
          <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-white/60">
            {item.year} · View project →
          </p>
        </div>
      </a>
    </div>
  );
}

export default function Projects({
  projects,
}: {
  projects: ProjectItem[];
}) {
  const ordered = useMemo(() => {
    const hero = projects.find((p) => p.title === "Sage Bedroom");
    if (!hero) return projects;
    return [hero, ...projects.filter((p) => p.id !== hero.id)];
  }, [projects]);

  return (
    <section id="projects" className="bg-blush">
      <div className="container-hapr py-20 lg:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.25em]"
              style={{ color: MUTED }}
            >
              Selected Work
            </p>
            <h2
              className="mt-3 font-serif text-5xl font-normal italic lg:text-6xl"
              style={{ color: INK }}
            >
              Projects
            </h2>
          </div>
          <div className="flex items-baseline gap-2 lg:flex-col lg:items-end lg:gap-1">
            <span
              className="font-serif text-4xl italic lg:text-5xl"
              style={{ color: INK }}
            >
              {String(projects.length).padStart(2, "0")}
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{ color: MUTED }}
            >
              Projects
            </span>
          </div>
        </div>
        <p
          className="mt-6 max-w-md text-[13px] leading-[1.7]"
          style={{ color: MUTED }}
        >
          An ongoing body of interiors, facades and objects — composed with
          restraint, finished in detail. Scroll — each space holds the screen.
        </p>
        <div className={`mt-12 ${HAIRLINE}`} />
      </div>

      {ordered.length === 0 && (
        <p className="pb-16 text-center text-sm" style={{ color: MUTED }}>
          No projects yet — check back soon.
        </p>
      )}

      {ordered.map((item, i) => (
        <div key={item.id} className="sticky top-0 h-[100svh]">
          <FullscreenPlate
            item={item}
            index={i}
            total={ordered.length}
          />
        </div>
      ))}

      <div className="bg-blush">
        <div className="container-hapr py-24 text-center lg:py-32">
          <p
            className="text-[11px] uppercase tracking-[0.25em]"
            style={{ color: MUTED }}
          >
            Have something in mind?
          </p>
          <p
            className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-normal italic leading-[1.1] lg:text-6xl"
            style={{ color: INK }}
          >
            Let&apos;s make it visual.
          </p>
          <p
            className="mx-auto mt-5 max-w-md text-[13px] leading-[1.7]"
            style={{ color: MUTED }}
          >
            Every project starts with a conversation. Tell us about the space,
            the product or the idea — we&apos;ll bring it to life.
          </p>
          <Link href="/#contact-form" className="pill mt-10">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}