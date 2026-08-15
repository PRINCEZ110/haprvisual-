"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const REELS = [
  {
    id: 1,
    title: "Reel 01",
    video: "/videos/reel-01.mp4",
    objectPosition: "center center",
  },
  {
    id: 2,
    title: "Reel 02",
    video: "/videos/reel-02.mp4",
    objectPosition: "center center",
  },
  {
    id: 3,
    title: "Reel 03",
    video: "/videos/reel-03.mp4",
    objectPosition: "center center",
  },
  {
    id: 4,
    title: "Reel 04",
    video: "/videos/reel-04.mp4",
    objectPosition: "center center",
  },
  {
    id: 5,
    title: "Reel 05",
    video: "/videos/reel-05.mp4",
    objectPosition: "center center",
  },
  {
    id: 6,
    title: "Reel 06",
    video: "/videos/reel-06.mp4",
    objectPosition: "center center",
  },
  {
    id: 7,
    title: "Reel 07",
    video: "/videos/reel-07.mp4",
    objectPosition: "center center",
  },
];

const SLASH = 2.2;
const SLASH2 = 1.8;
const EASE = [0.22, 0.61, 0.36, 1] as const;

const CLIPS = [
  `polygon(0 0, calc(33.333% - ${SLASH}%) 0, calc(33.333% + ${SLASH}%) 100%, 0 100%)`,
  `polygon(calc(33.333% - ${SLASH}%) 0, calc(66.667% - ${SLASH}%) 0, calc(66.667% + ${SLASH}%) 100%, calc(33.333% + ${SLASH}%) 100%)`,
  `polygon(calc(66.667% - ${SLASH}%) 0, 100% 0, 100% 100%, calc(66.667% + ${SLASH}%) 100%)`,
  `polygon(0 0, calc(50% - ${SLASH2}%) 0, calc(50% + ${SLASH2}%) 100%, 0 100%)`,
  `polygon(calc(50% - ${SLASH2}%) 0, 100% 0, 100% 100%, calc(50% + ${SLASH2}%) 100%)`,
];

function ReelPanel({
  reel,
  index,
  clip,
}: {
  reel: (typeof REELS)[number];
  index: number;
  clip: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="group/panel relative h-full overflow-hidden"
      style={{ clipPath: clip }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <video
          ref={videoRef}
          src={reel.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          style={{ objectPosition: reel.objectPosition }}
          className="h-full w-full object-cover transition-[transform,filter,opacity] duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover/reels:opacity-75 group-hover/reels:group-hover/panel:scale-[1.12] group-hover/reels:group-hover/panel:opacity-100 group-hover/reels:group-hover/panel:brightness-105"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgba(0,0,0,0.28)_100%)]" />
      <span className="absolute left-[6%] top-[7%] text-[11px] font-medium uppercase tracking-[0.35em] text-cream/75 lg:left-8 lg:top-10 lg:text-xs">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="absolute bottom-[6%] left-[6%] text-[10px] uppercase tracking-[0.3em] text-cream/60 lg:bottom-10 lg:left-8 lg:text-[11px]">
        {reel.title} — Autoplay
      </span>
    </div>
  );
}

function DiagonalDivider({
  left,
  deg = 4.5,
}: {
  left: string;
  deg?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute top-0 z-10 h-[145%] w-px -translate-x-1/2 lg:w-[2px]"
      style={{ left }}
      initial={{ opacity: 0, scaleY: 0.4 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
    >
      <div
        className="h-full w-full origin-center bg-gradient-to-b from-cream/80 via-cream/90 to-cream/80 [box-shadow:0_0_14px_rgba(255,255,255,0.35),0_0_40px_rgba(0,0,0,0.6)]"
        style={{ transform: `rotate(-${deg}deg)` }}
      />
    </motion.div>
  );
}

function SectionTitle({
  left,
  right,
  mobile = false,
}: {
  left: string;
  right: string;
  mobile?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-30 ${
        mobile ? "lg:hidden" : "hidden lg:block"
      }`}
    >
      <div
        className={`flex items-start justify-between ${
          mobile ? "px-6 pt-7" : "px-10 pt-10"
        }`}
      >
        <p
          className={`font-medium uppercase tracking-[0.4em] text-cream/85 ${
            mobile ? "text-[11px]" : "text-xs"
          }`}
        >
          {left}
        </p>
        <p
          className={`uppercase tracking-[0.3em] text-cream/55 ${
            mobile ? "text-[10px]" : "text-[11px]"
          }`}
        >
          {right}
        </p>
      </div>
    </div>
  );
}

export default function ShowReels() {
  return (
    <section
      aria-label="Show reels — cinematic video showcase"
      className="group/reels relative bg-black"
    >
      <div className="hidden lg:block">
        <div className="relative h-[100svh] overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-3">
            {REELS.slice(0, 3).map((reel, i) => (
              <ReelPanel key={reel.id} reel={reel} index={i} clip={CLIPS[i]} />
            ))}
          </div>
          <DiagonalDivider left="33.333%" />
          <DiagonalDivider left="66.667%" />
          <SectionTitle left="Show Reels" right="01 — 03" />
        </div>

        <div className="relative h-[100svh] overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            {REELS.slice(3, 7).map((reel, i) => (
              <ReelPanel
                key={reel.id}
                reel={reel}
                index={i + 3}
                clip={CLIPS[3 + (i % 2)]}
              />
            ))}
          </div>
          <DiagonalDivider left="50%" deg={3.7} />
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-1/2 z-10 h-px w-full lg:h-[2px]"
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
          >
            <div className="h-full w-full bg-gradient-to-r from-cream/80 via-cream/90 to-cream/80 [box-shadow:0_0_14px_rgba(255,255,255,0.35)]" />
          </motion.div>
          <SectionTitle left="Show Reels — 02" right="04 — 07" />
        </div>
      </div>

      <div className="flex flex-col lg:hidden">
        {REELS.map((reel, i) => (
          <div key={reel.id} className="relative h-[100svh] overflow-hidden">
            {i > 0 && (
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 z-10 h-[35svh] w-px -translate-x-1/2"
              >
                <div className="h-full w-full origin-top -rotate-[38deg] bg-gradient-to-b from-cream/80 via-cream/85 to-transparent [box-shadow:0_0_12px_rgba(255,255,255,0.3)]" />
              </div>
            )}
            <ReelPanel reel={reel} index={i} clip="none" />
          </div>
        ))}
      </div>

      <SectionTitle left="Show Reels" right="01 — 07" mobile />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-black"
        initial={{ opacity: 0.4 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      />
    </section>
  );
}