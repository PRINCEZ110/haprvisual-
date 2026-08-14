"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero3D from "@/components/Hero3D";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scroll = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  scrollYProgress.on("change", (v) => {
    scroll.current = v;
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 lg:pt-24"
    >
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container-hapr grid items-center gap-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={item} className="eyebrow">
              — Kyiv, Ukraine
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-6 font-sans text-[clamp(3.5rem,9vw,8.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-ink"
            >
              Hapr visual
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 font-serif text-[clamp(2rem,4.5vw,4rem)] italic leading-[1.05] text-ink"
            >
              Your vision, our renders
            </motion.p>

            <motion.div variants={item} className="mt-12">
              <a href="#contact-form" className="pill text-base">
                Discuss a project!
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="h-[420px] sm:h-[520px] lg:col-span-5 lg:h-[620px]">
          <Hero3D scroll={scroll} />
        </div>
      </motion.div>
    </section>
  );
}