"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  src?: string | null;
  poster: string;
  alt: string;
  sizes: string;
};

export default function HoverVideo({ src, poster, alt, sizes }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [failed, setFailed] = useState(false);
  const [frame, setFrame] = useState<string | null>(null);
  const retried = useRef(false);

  const captureFrame = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    try {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, 1024 / video.videoWidth);
      canvas.width = Math.round(video.videoWidth * scale);
      canvas.height = Math.round(video.videoHeight * scale);
      canvas
        .getContext("2d")
        ?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setFrame(canvas.toDataURL("image/jpeg", 0.8));
    } catch {
      // tainted canvas (no CORS on the video host) — keep the fallback image
    }
  };

  const shownPoster = frame ?? poster;

  if (!src || failed) {
    return (
      <Image
        src={shownPoster}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => {
        setHovered(true);
        videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHovered(false);
        const video = videoRef.current;
        video?.pause();
        captureFrame();
      }}
    >
      <Image
        src={shownPoster}
        alt={alt}
        fill
        sizes={sizes}
        className={`pointer-events-none object-cover transition-opacity duration-500 ${
          hovered ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        crossOrigin="anonymous"
        controls={false}
        controlsList="nodownload noremoteplayback noplaybackrate"
        disablePictureInPicture
        draggable={false}
        onLoadedData={captureFrame}
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
        className={`pointer-events-none absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}