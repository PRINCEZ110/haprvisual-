"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import HoverVideo from "@/components/HoverVideo";
import { PROJECT_VIDEOS } from "@/lib/videos";
import type { ProjectItem } from "@/lib/data";

type Block =
  | { type: "featured"; item: ProjectItem; reverse?: boolean }
  | { type: "row"; items: ProjectItem[] }
  | { type: "fullwidth"; item: ProjectItem };

const INK = "#241D19";
const MUTED = "#8F7770";
const HAIRLINE = "border-[rgba(60,40,30,0.12)]";
const RULE = "bg-[rgba(60,40,30,0.18)]";
const FRAME = "pointer-events-none absolute inset-0 outline outline-1 outline-offset-[-10px] outline-[rgba(60,40,30,0.16)]";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function buildBlocks(list: ProjectItem[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;
  let phase = 0;
  while (i < list.length) {
    const rem = list.length - i;
    if (phase === 0) {
      blocks.push({ type: "featured", item: list[i] });
      i++;
    } else if (phase === 1) {
      const take = Math.min(3, rem);
      blocks.push({ type: "row", items: list.slice(i, i + take) });
      i += take;
    } else if (phase === 2) {
      blocks.push({ type: "featured", item: list[i], reverse: true });
      i++;
    } else if (phase === 3) {
      const take = Math.min(3, rem);
      blocks.push({ type: "row", items: list.slice(i, i + take) });
      i += take;
    } else if (phase === 4) {
      blocks.push({ type: "fullwidth", item: list[i] });
      i++;
    } else {
      const take = Math.min(3, rem);
      blocks.push({ type: "row", items: list.slice(i, i + take) });
      i += take;
    }
    phase = (phase + 1) % 6;
  }
  return blocks;
}

function FeaturedProject({
  item,
  index,
  reverse = false,
}: {
  item: ProjectItem;
  index: number;
  reverse?: boolean;
}) {
  return (
    <motion.div variants={fadeUp}>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <a
          href="#contact-form"
          className={`group block lg:col-span-8 ${reverse ? "lg:order-2" : ""}`}
        >
          <div className="relative h-[420px] overflow-hidden sm:h-[520px] lg:h-[560px]">
            <HoverVideo
              src={PROJECT_VIDEOS[item.title]}
              poster={item.coverImage}
              alt={item.title}
              sizes="(max-width: 1024px) 100vw, 67vw"
            />
            <div className={FRAME} />
          </div>
        </a>

        <div
          className={`lg:col-span-4 ${
            reverse ? "lg:order-1 lg:pr-8" : "lg:pl-8"
          }`}
        >
          <div className="flex items-baseline gap-4">
            <span
              className="font-serif text-lg italic"
              style={{ color: INK }}
            >
              {String(index).padStart(2, "0")}
            </span>
            <span
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: MUTED }}
            >
              {item.year}
            </span>
            <span
              className="ml-auto text-[10px] uppercase tracking-[0.25em]"
              style={{ color: MUTED }}
            >
              Featured
            </span>
          </div>
          <h3
            className="mt-5 font-serif text-4xl font-normal italic leading-[1.05] lg:text-5xl"
            style={{ color: INK }}
          >
            {item.title}
          </h3>
          <div className={`mt-7 h-px w-12 ${RULE}`} />
          <p
            className="mt-6 max-w-md text-[13px] leading-[1.7]"
            style={{ color: MUTED }}
          >
            {item.description}
          </p>
          {item.categories[0] && (
            <p
              className="mt-8 text-[11px] uppercase tracking-[0.2em]"
              style={{ color: INK }}
            >
              {item.categories[0].name}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function FullwidthProject({
  item,
  index,
}: {
  item: ProjectItem;
  index: number;
}) {
  return (
    <motion.div variants={fadeUp}>
      <a href="#contact-form" className="group block">
        <div className="relative aspect-[21/10] overflow-hidden">
          <HoverVideo
            src={PROJECT_VIDEOS[item.title]}
            poster={item.coverImage}
            alt={item.title}
            sizes="100vw"
          />
          <div className={FRAME} />
        </div>
      </a>
      <div className="mt-8 grid items-end gap-6 lg:grid-cols-12">
        <div className="flex items-baseline gap-4 lg:col-span-2">
          <span className="font-serif text-lg italic" style={{ color: INK }}>
            {String(index).padStart(2, "0")}
          </span>
          <span
            className="text-[11px] uppercase tracking-[0.2em]"
            style={{ color: MUTED }}
          >
            {item.year}
          </span>
        </div>
        <div className="lg:col-span-7">
          <h3
            className="font-serif text-3xl font-normal italic leading-[1.1] lg:text-5xl"
            style={{ color: INK }}
          >
            {item.title}
          </h3>
          <p
            className="mt-3 max-w-xl text-[13px] leading-[1.65]"
            style={{ color: MUTED }}
          >
            {item.description}
          </p>
        </div>
        {item.categories[0] && (
          <p
            className="text-[11px] uppercase tracking-[0.2em] lg:col-span-3 lg:text-right"
            style={{ color: INK }}
          >
            {item.categories[0].name}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function RowBlock({
  items,
  startIndex,
}: {
  items: ProjectItem[];
  startIndex: number;
}) {
  return (
    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {items.map((item, i) => (
        <motion.a
          key={item.id}
          href="#contact-form"
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.08,
              },
            },
          }}
          className="group block"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <HoverVideo
              src={PROJECT_VIDEOS[item.title]}
              poster={item.coverImage}
              alt={item.title}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className={FRAME} />
          </div>
          <div className="mt-6 flex items-baseline justify-between gap-4">
            <span className="font-serif text-sm italic" style={{ color: INK }}>
              {String(startIndex + i + 1).padStart(2, "0")}
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ color: MUTED }}
            >
              {item.year}
            </span>
          </div>
          <h3
            className="mt-2 font-serif text-2xl font-normal italic leading-tight transition-transform duration-500 group-hover:translate-x-1"
            style={{ color: INK }}
          >
            {item.title}
          </h3>
          {item.categories[0] && (
            <p
              className="mt-2 text-[11px] uppercase tracking-[0.2em]"
              style={{ color: MUTED }}
            >
              {item.categories[0].name}
            </p>
          )}
          <p
            className="mt-3 line-clamp-2 text-[13px] leading-[1.6]"
            style={{ color: MUTED }}
          >
            {item.description}
          </p>
        </motion.a>
      ))}
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

  const blocks = useMemo(() => buildBlocks(ordered), [ordered]);

  const indexedBlocks = useMemo(() => {
    let acc = 0;
    return blocks.map((block) => {
      const blockIndex = acc;
      acc += block.type === "row" ? block.items.length : 1;
      return { block, blockIndex };
    });
  }, [blocks]);

  return (
    <section id="projects" className="bg-[#F7ECE8]">
      <div className="container-hapr py-20 lg:py-28">
        <div className="mb-12 lg:mb-20">
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
            restraint, finished in detail. Hover each space to watch it move.
          </p>
          <div className={`mt-12 ${HAIRLINE}`} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col"
          >
            {indexedBlocks.map(({ block, blockIndex }, i) => (
              <div
                key={`${i}-${block.type}`}
                className={`${i === 0 ? "" : `mt-20 border-t pt-14 lg:mt-24 lg:pt-16 ${HAIRLINE}`}`}
              >
                {block.type === "featured" ? (
                  <FeaturedProject
                    item={block.item}
                    index={blockIndex + 1}
                    reverse={block.reverse}
                  />
                ) : block.type === "fullwidth" ? (
                  <FullwidthProject item={block.item} index={blockIndex + 1} />
                ) : (
                  <RowBlock items={block.items} startIndex={blockIndex} />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {projects.length === 0 && (
          <p className="py-16 text-center text-sm" style={{ color: MUTED }}>
            No projects in this category yet — check back soon.
          </p>
        )}

        <div className={`mt-24 border-t pt-16 text-center ${HAIRLINE}`}>
          <p
            className="text-[11px] uppercase tracking-[0.25em]"
            style={{ color: MUTED }}
          >
            Have a space in mind?
          </p>
          <p
            className="mt-4 font-serif text-3xl font-normal italic lg:text-4xl"
            style={{ color: INK }}
          >
            Let&apos;s shape it together.
          </p>
          <a href="#contact-form" className="pill mt-9">
            Start a project
          </a>
        </div>
      </div>
    </section>
  );
}