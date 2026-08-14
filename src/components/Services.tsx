"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IconChevron } from "@/components/icons";
import { SERVICE_THUMBNAILS } from "@/lib/constants";
import type { ServiceItem } from "@/lib/data";

export default function Services({ services }: { services: ServiceItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="services" className="container-hapr py-24 lg:py-32">
      <h2 className="mb-14 font-serif text-5xl italic text-ink lg:text-6xl">
        Services
      </h2>

      <div className="border-t border-line">
        {services.map((service, i) => (
          <div key={service.id} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              aria-expanded={openIndex === i}
              className="group flex w-full items-center justify-between gap-6 py-7 text-left lg:py-9"
            >
              <div className="flex items-baseline gap-6 lg:gap-10">
                <span className="text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-2xl font-medium transition-all duration-300 lg:text-4xl ${
                    openIndex === i ? "text-ink" : "text-ink group-hover:translate-x-2"
                  }`}
                >
                  {service.title}
                </span>
              </div>
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-ink"
              >
                <IconChevron className="h-5 w-5 lg:h-6 lg:w-6" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-10 pb-10 lg:grid-cols-2 lg:pb-14">
                    <p className="max-w-md text-base leading-relaxed text-muted">
                      {service.description}
                    </p>
                    <div className="hidden grid-cols-2 gap-4 lg:grid">
                      {SERVICE_THUMBNAILS[i % SERVICE_THUMBNAILS.length] && (
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
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}