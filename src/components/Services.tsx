"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IconChevron } from "@/components/icons";
import { SERVICE_THUMBNAILS } from "@/lib/constants";
import type { ServiceItem } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

function MaskedText({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Services({ services }: { services: ServiceItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="services" className="container-hapr py-24 lg:py-32">
      <div className="mb-14 lg:mb-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">What We Do</p>
            <h2 className="mt-3 font-serif text-5xl italic text-ink lg:text-6xl">
              <MaskedText>Services</MaskedText>
            </h2>
          </div>
          <p className="pb-2 text-[10px] uppercase tracking-[0.25em] text-muted">
            {String(services.length).padStart(2, "0")} offerings
          </p>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          className="mt-12 h-px origin-left bg-line"
        />
      </div>

      <div className="border-t border-line">
        {services.map((service, i) => {
          const open = openIndex === i;
          return (
            <div key={service.id} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : i)}
                aria-expanded={open}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left lg:py-9"
              >
                <div className="flex items-baseline gap-6 lg:gap-10">
                  <span
                    className={`font-serif text-sm italic transition-colors duration-300 ${
                      open ? "text-ink" : "text-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
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
                      {SERVICE_THUMBNAILS[i % SERVICE_THUMBNAILS.length] && (
                        <motion.div
                          initial={{ clipPath: "inset(0 0 100% 0)" }}
                          animate={{ clipPath: "inset(0 0 0% 0)" }}
                          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                          className="hidden grid-cols-2 gap-4 lg:grid"
                        >
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
    </section>
  );
}