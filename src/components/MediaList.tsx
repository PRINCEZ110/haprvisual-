"use client";

import { useState } from "react";
import Image from "next/image";
import AutoVideo from "@/components/AutoVideo";

export type MediaListItem = {
  title: string;
  description: string;
  video: string;
  poster: string;
};

export default function MediaList({
  items,
  captionPrefix,
}: {
  items: MediaListItem[];
  captionPrefix: string;
}) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-6">
        {items.map((item, i) => {
          const isActive = active === i;
          return (
            <div
              key={item.title}
              className="border-t border-line last:border-b"
            >
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`block w-full py-7 text-left transition-colors duration-300 lg:py-8 ${
                  isActive ? "opacity-100" : "opacity-60 hover:opacity-90"
                }`}
              >
                <div className="flex items-baseline gap-6 lg:gap-10">
                  <span
                    className={`font-serif text-sm italic transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span
                      className={`text-xl font-medium transition-transform duration-500 lg:text-2xl ${
                        isActive ? "text-ink" : "text-ink"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`mt-2 block max-w-md text-[13px] leading-[1.7] transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "lg:opacity-0"
                      }`}
                    >
                      {item.description}
                    </span>
                  </span>
                </div>
              </button>
              <div className="relative aspect-[4/3] overflow-hidden bg-espresso lg:hidden">
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-24">
          <div className="relative aspect-[4/3] overflow-hidden bg-espresso">
            <AutoVideo
              key={current.title}
              src={current.video}
              poster={current.poster}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-muted">
            {captionPrefix} {String(active + 1).padStart(2, "0")} —{" "}
            {current.title}
          </p>
        </div>
      </div>
    </div>
  );
}