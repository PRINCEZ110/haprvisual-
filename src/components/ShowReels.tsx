"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const REELS = [
  { id: 1, title: "Reel 01", video: "/videos/reel-01.mp4" },
  { id: 2, title: "Reel 02", video: "/videos/reel-02.mp4" },
  { id: 3, title: "Reel 03", video: "/videos/reel-03.mp4" },
  { id: 4, title: "Reel 04", video: "/videos/reel-04.mp4" },
  { id: 5, title: "Reel 05", video: "/videos/reel-05.mp4" },
  { id: 6, title: "Reel 06", video: "/videos/reel-06.mp4" },
  { id: 7, title: "Reel 07", video: "/videos/reel-07.mp4" },
  { id: 8, title: "Reel 08", video: "/videos/reel-08.mp4" },
  { id: 9, title: "Reel 09", video: "/videos/reel-09.mp4" },
];

const SLASH = 2.2;
const EASE = [0.22, 0.61, 0.36, 1] as const;

const CLIP_LEFT = `polygon(0 0, calc(33.333% - ${SLASH}%) 0, calc(33.333% + ${SLASH}%) 100%, 0 100%)`;
const CLIP_MID = `polygon(calc(33.333% - ${SLASH}%) 0, calc(66.667% - ${SLASH}%) 0, calc(66.667% + ${SLASH}%) 100%, calc(33.333% + ${SLASH}%) 100%)`;
const CLIP_RIGHT = `polygon(calc(66.667% - ${SLASH}%) 0, 100% 0, 100% 100%, calc(66.667% + ${SLASH}%) 100%)`;
const CLIP_FULL = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

const GRID: { reel: number; clip: string }[] = [
  { reel: 5, clip: CLIP_LEFT },
  { reel: 6, clip: CLIP_MID },
  { reel: 4, clip: CLIP_RIGHT },
  { reel: 0, clip: CLIP_LEFT },
  { reel: 1, clip: CLIP_MID },
  { reel: 2, clip: CLIP_RIGHT },
  { reel: 3, clip: CLIP_LEFT },
  { reel: 7, clip: CLIP_MID },
  { reel: 8, clip: CLIP_RIGHT },
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
      { threshold: 0.2 }
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
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
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
          className="h-full w-full object-cover brightness-[1.08] transition-[transform,filter,opacity] duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover/reels:opacity-75 group-hover/reels:group-hover/panel:scale-[1.12] group-hover/reels:group-hover/panel:opacity-100 group-hover/reels:group-hover/panel:brightness-105"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
      <span className="absolute left-[6%] top-[7%] text-[11px] font-medium uppercase tracking-[0.35em] text-cream/75 lg:left-8 lg:top-8 lg:text-xs">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="absolute bottom-[6%] left-[6%] text-[10px] uppercase tracking-[0.3em] text-cream/60 lg:bottom-8 lg:left-8 lg:text-[11px]">
        {reel.title} — Autoplay
      </span>
    </div>
  );
}

function SeamLine({
  vertical,
  at,
  delay = 0.5,
}: {
  vertical: boolean;
  at: string;
  delay?: number;
}) {
  const motionProps = {
    initial: { opacity: 0, [vertical ? "scaleY" : "scaleX"]: 0.5 } as const,
    whileInView: { opacity: 1, [vertical ? "scaleY" : "scaleX"]: 1 } as const,
    viewport: { once: true, amount: 0.2 } as const,
    transition: { duration: 1.2, ease: EASE, delay } as const,
  };
  return (
    <motion.div
      aria-hidden="true"
      {...motionProps}
      className={`absolute z-10 ${vertical ? "h-[145%] w-px lg:w-[2px]" : "h-px w-full lg:h-[2px]"} ${
        vertical ? "-translate-x-1/2" : "-translate-y-1/2"
      }`}
      style={{ [vertical ? "left" : "top"]: at }}
    >
      <div
        className={`h-full w-full bg-gradient-to-b from-cream/80 via-cream/90 to-cream/80 [box-shadow:0_0_14px_rgba(255,255,255,0.35),0_0_40px_rgba(0,0,0,0.6)] ${
          vertical ? "origin-center -rotate-[4.5deg]" : ""
        }`}
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
      id="show-reels"
      aria-label="Show reels — cinematic video showcase"
      className="group/reels relative h-[100svh] overflow-hidden bg-black"
    >
      <div className="absolute inset-0 hidden grid-cols-3 grid-rows-3 lg:grid">
        {GRID.map((cell) => (
          <ReelPanel
            key={cell.reel}
            reel={REELS[cell.reel]}
            index={cell.reel}
            clip={cell.clip}
          />
        ))}
      </div>

      <div className="flex h-[900svh] flex-col lg:hidden">
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

      <SeamLine vertical at="33.333%" />
      <SeamLine vertical at="66.667%" />
      <SeamLine vertical={false} at="33.333%" />
      <SeamLine vertical={false} at="66.667%" />

      <SectionTitle left="Show Reels" right="01 — 09" />
      <SectionTitle left="Show Reels" right="01 — 09" mobile />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-black"
        initial={{ opacity: 0.2 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </section>
  );
}
