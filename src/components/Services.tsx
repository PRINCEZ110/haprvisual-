"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import AutoVideo from "@/components/AutoVideo";
import { IconChevron } from "@/components/icons";
import {
  SERVICE_LABELS,
  SERVICE_PANEL_VIDEOS,
  SERVICE_THUMBNAILS,
  SERVICE_VIDEOS,
} from "@/lib/constants";
import type { ServiceItem } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Services({ services }: { services: ServiceItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [preview, setPreview] = useState<number | null>(null);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const panelContentRef = useRef<HTMLDivElement>(null);
  const titleRectRef = useRef<DOMRect | null>(null);
  const targetRef = useRef({ x: -9999, y: -9999 });
  const WINDOW_W = 360;
  const WINDOW_H = 220;
  const GAP = 24;

  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (preview === null) return;
      const cx = targetRef.current.x;
      const cy = targetRef.current.y;
      const panelRect = panelContentRef.current?.getBoundingClientRect();
      const titleRect = titleRectRef.current;
      const obstacles = [panelRect, titleRect].filter(
        (r): r is DOMRect => !!r
      );

      const overlaps = (px: number, py: number) =>
        obstacles.some(
          (o) =>
            px < o.right &&
            px + WINDOW_W > o.left &&
            py < o.bottom &&
            py + WINDOW_H > o.top
        );

      const fits = (px: number, py: number) =>
        px >= 16 &&
        px + WINDOW_W <= window.innerWidth - 16 &&
        py >= 16 &&
        py + WINDOW_H <= window.innerHeight - 16;

      const candidates: [number, number][] = [
        [cx - WINDOW_W - GAP, clamp(cy - WINDOW_H / 2, 16, window.innerHeight - WINDOW_H - 16)],
        [cx + GAP, clamp(cy - WINDOW_H / 2, 16, window.innerHeight - WINDOW_H - 16)],
        [clamp(cx - WINDOW_W / 2, 16, window.innerWidth - WINDOW_W - 16), cy - WINDOW_H - GAP],
        [clamp(cx - WINDOW_W / 2, 16, window.innerWidth - WINDOW_W - 16), cy + GAP],
      ];

      let placed = false;
      for (const [px, py] of candidates) {
        if (!fits(px, py)) continue;
        if (!overlaps(px, py)) {
          mx.set(px);
          my.set(py);
          placed = true;
          break;
        }
      }
      if (!placed) setPreview(null);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [preview, mx, my]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const idx = Number(e.currentTarget.dataset.index ?? 0);
    if (openIndex === idx) {
      setPreview(null);
      return;
    }
    const cx = e.clientX;
    const cy = e.clientY;
    targetRef.current = { x: cx, y: cy };
    titleRectRef.current =
      e.currentTarget.querySelector("[data-title]")?.getBoundingClientRect() ??
      null;
    const panelRect = panelContentRef.current?.getBoundingClientRect();
    const insidePanel =
      panelRect &&
      cx > panelRect.left &&
      cx < panelRect.right &&
      cy > panelRect.top &&
      cy < panelRect.bottom;
    if (insidePanel) {
      setPreview(null);
      return;
    }
    setPreview(idx);
  };

  return (
    <section id="services" className="container-hapr py-24 lg:py-32">
      <div className="mb-14 text-center lg:mb-20">
        <h2 className="font-serif text-5xl italic text-ink lg:text-6xl">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE }}
            >
              Services
            </motion.span>
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-4xl font-serif text-3xl italic leading-[1.2] text-ink lg:text-5xl">
          We create visual worlds for architects, designers and brands — where
          light, material and proportion tell the story before the building
          exists.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link
            href="/about"
            className="text-[11px] uppercase tracking-[0.25em] text-ink transition-colors hover:text-ink/60"
          >
            About the studio →
          </Link>
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted">
            3D Visualization · Architecture · Interiors · Products · Motion
          </span>
        </div>
      </div>

      <div className="border-t border-line">
        {services.map((service, i) => {
          const open = openIndex === i;
          return (
            <div
              key={service.id}
              data-index={i}
              className="border-b border-line"
              onMouseEnter={(e) => {
                if (openIndex === i) return;
                targetRef.current = { x: e.clientX, y: e.clientY };
                setPreview(i);
              }}
              onMouseLeave={() => setPreview(null)}
              onMouseMove={handleMove}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : i)}
                aria-expanded={open}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left lg:py-9"
              >
                <div
                  data-title
                  className="flex items-baseline gap-6 lg:gap-10"
                >
                  <span
                    className={`font-serif text-sm italic transition-colors duration-300 ${
                      open ? "text-ink" : "text-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col items-start gap-1 lg:flex-row lg:items-baseline lg:gap-6">
                    <span
                      className="text-[10px] uppercase tracking-[0.25em] text-muted"
                      aria-hidden="true"
                    >
                      {SERVICE_LABELS[service.title] ?? ""}
                    </span>
                    <span
                      className={`text-2xl font-medium transition-all duration-500 lg:text-4xl ${
                        open
                          ? "text-ink"
                          : "text-ink group-hover:translate-x-2"
                      }`}
                    >
                      {service.title}
                    </span>
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink lg:h-12 lg:w-12"
                >
                  <IconChevron className="h-4 w-4 text-ink lg:h-5 lg:w-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="panel"
                    ref={panelContentRef}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-10 pb-10 lg:grid-cols-2 lg:gap-16 lg:pb-14">
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                      >
                        <p className="max-w-md text-base leading-relaxed text-muted">
                          {service.description}
                        </p>
                        <div className="mt-8 h-px w-12 bg-line" />
                      </motion.div>
                      {(SERVICE_THUMBNAILS[i % SERVICE_THUMBNAILS.length] ||
                          SERVICE_PANEL_VIDEOS[service.title]) && (
                        <motion.div
                          initial={{ clipPath: "inset(0 0 100% 0)" }}
                          animate={{ clipPath: "inset(0 0 0% 0)" }}
                          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                          className="grid grid-cols-2 gap-4"
                        >
                          {(SERVICE_PANEL_VIDEOS[service.title] ?? []).map(
                            (videoSrc) => (
                              <div
                                key={videoSrc}
                                className="relative aspect-[4/3] overflow-hidden bg-ink"
                              >
                                <AutoVideo
                                  src={videoSrc}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )
                          )}
                          {!SERVICE_PANEL_VIDEOS[service.title] &&
                            SERVICE_THUMBNAILS[i % SERVICE_THUMBNAILS.length] && (
                              <>
                                <div className="relative aspect-[4/3] overflow-hidden">
                                  <Image
                                    src={SERVICE_THUMBNAILS[i % SERVICE_THUMBNAILS.length].image1}
                                    alt={`${service.title} — example 1`}
                                    fill
                                    sizes="(max-width: 1024px) 0px, 25vw"
                                    className="object-cover"
                                  />
                                </div>
                                <div className="relative aspect-[4/3] overflow-hidden">
                                  <Image
                                    src={SERVICE_THUMBNAILS[i % SERVICE_THUMBNAILS.length].image2}
                                    alt={`${service.title} — example 2`}
                                    fill
                                    sizes="(max-width: 1024px) 0px, 25vw"
                                    className="object-cover"
                                  />
                                </div>
                              </>
                            )}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block">
        <AnimatePresence>
          {preview !== null && services[preview] && (
            <motion.div
              key={services[preview].id}
              style={{ x: mx, y: my }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="w-[360px]"
            >
              <div className="relative aspect-video overflow-hidden bg-ink">
                <AutoVideo
                  src={SERVICE_VIDEOS[services[preview].title]}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-baseline gap-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-ink">
                  {String(preview + 1).padStart(2, "0")} —{" "}
                  {services[preview].title}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}