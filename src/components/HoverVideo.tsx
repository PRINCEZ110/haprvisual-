"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

type Props = {
  src?: string | null;
  poster: string;
  alt: string;
  sizes: string;
};

export default function HoverVideo({ src, poster, alt, sizes }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(containerRef, { margin: "200px" });
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);
  const retried = useRef(false);

  useEffect(() => {
    if (inView) setShow(true);
  }, [inView]);

  if (!src || failed) {
    return (
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => {
        videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        const video = videoRef.current;
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }}
      onClick={(e) => {
        if (!window.matchMedia("(pointer: coarse)").matches) return;
        e.preventDefault();
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        controls={false}
        controlsList="nodownload noremoteplayback noplaybackrate"
        disablePictureInPicture
        draggable={false}
        aria-hidden="true"
        tabIndex={-1}
        poster={poster}
        src={show ? src : undefined}
        onEnded={(e) => {
          const v = e.currentTarget;
          v.currentTime = 0;
          v.play().catch(() => {});
        }}
        onError={() => {
          if (!retried.current) {
            retried.current = true;
            const video = videoRef.current;
            if (video) {
              video.removeAttribute("crossorigin");
              video.load();
            }
          } else {
            setFailed(true);
          }
        }}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}