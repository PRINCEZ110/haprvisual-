"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectItem } from "@/lib/data";

type Block =
  | { type: "featured"; item: ProjectItem; reverse?: boolean }
  | { type: "row"; items: ProjectItem[] }
  | { type: "fullwidth"; item: ProjectItem };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ROW_ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]"];

const HAIRLINE = "border-t border-[rgba(60,40,30,0.12)]";

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
  reverse = false,
}: {
  item: ProjectItem;
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
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 67vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </a>

        <div
          className={`lg:col-span-4 ${
            reverse ? "lg:order-1 lg:pr-8" : "lg:pl-8"
          }`}
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#8F7770]">
            {item.year}
          </span>
          <h3 className="mt-3 font-serif text-3xl font-normal leading-[1.1] text-[#241D19] lg:text-5xl">
            {item.title}
          </h3>
          <p className="mt-4 max-w-md text-[13px] leading-[1.65] text-[#8F7770]">
            {item.description}
          </p>
          {item.categories[0] && (
            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-[#8F7770]">
              {item.categories[0].name}
            </p>
          )}
          <a
            href="#contact-form"
            className="group/cta mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#241D19]"
          >
            View project
            <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function FullwidthProject({ item }: { item: ProjectItem }) {
  return (
    <motion.div variants={fadeUp}>
      <a href="#contact-form" className="group block">
        <div className="relative aspect-[21/10] overflow-hidden">
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>
      </a>
      <div className="mt-8 grid gap-3 lg:grid-cols-12">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#8F7770] lg:col-span-2">
          {item.year}
        </span>
        <div className="lg:col-span-10">
          <h3 className="font-serif text-3xl font-normal leading-[1.1] text-[#241D19] lg:text-5xl">
            {item.title}
          </h3>
          <p className="mt-3 max-w-xl text-[13px] leading-[1.65] text-[#8F7770]">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function RowBlock({ items }: { items: ProjectItem[] }) {
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
          className={`group block ${i === 1 ? "lg:mt-12" : ""}`}
        >
          <div
            className={`relative overflow-hidden ${ROW_ASPECTS[i % ROW_ASPECTS.length]}`}
          >
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
          <h3 className="mt-5 font-serif text-2xl font-normal leading-tight text-[#241D19]">
            {item.title}
          </h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[#8F7770]">
            {item.year}
          </p>
          <p className="mt-3 line-clamp-2 text-[13px] leading-[1.6] text-[#8F7770]">
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

  return (
    <section id="projects" className="bg-[#F7ECE8]">
      <div className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-12 lg:mb-20">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#8F7770]">
            Projects
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
            {blocks.map((block, i) => (
              <div
                key={`${i}-${block.type}`}
                className={`${i === 0 ? "" : `${HAIRLINE} mt-20 pt-14 lg:mt-24 lg:pt-16`}`}
              >
                {block.type === "featured" ? (
                  <FeaturedProject
                    item={block.item}
                    reverse={block.reverse}
                  />
                ) : block.type === "fullwidth" ? (
                  <FullwidthProject item={block.item} />
                ) : (
                  <RowBlock items={block.items} />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {projects.length === 0 && (
          <p className="py-16 text-center text-sm text-[#8F7770]">
            No projects in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}