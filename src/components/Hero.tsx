"use client";

import { motion } from "framer-motion";
import HeroVideo from "@/components/HeroVideo";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[650px] overflow-hidden"
    >
      <HeroVideo />

      <div className="absolute inset-0 z-10 flex -translate-y-[18%] items-center justify-center px-5 text-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-[11px] uppercase tracking-[0.3em] text-white/80"
          >
            3D Visualization &amp; Motion Design Studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-serif text-[clamp(2.75rem,5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.01em] text-white"
          >
            HAPR Visual
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="mt-3 font-serif text-[clamp(1.75rem,3.5vw,3rem)] italic leading-[1.1] text-white/95 sm:mt-4"
          >
            Your vision, our renders
          </motion.p>
        </div>
      </div>
    </section>
  );
}