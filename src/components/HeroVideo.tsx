"use client";

import { useEffect, useState } from "react";

export default function HeroVideo() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 select-none overflow-hidden bg-espresso"
      aria-hidden="true"
    >
      <video
        className="h-full w-full object-cover"
        src="/videos/hero.mp4"
        autoPlay={!reduced}
        muted
        loop
        playsInline
        webkit-playsinline=""
        preload="auto"
        onEnded={(e) => {
          const v = e.currentTarget;
          v.currentTime = 0;
          v.play().catch(() => {});
        }}
      />
      <div className="pointer-events-none absolute inset-0 select-none bg-black/15" />
    </div>
  );
}