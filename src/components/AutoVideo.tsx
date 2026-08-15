"use client";

type Props = {
  src: string;
  className?: string;
  poster?: string;
};

export default function AutoVideo({ src, className, poster }: Props) {
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      webkit-playsinline=""
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onEnded={(e) => {
        const v = e.currentTarget;
        v.currentTime = 0;
        v.play().catch(() => {});
      }}
      className={className}
    />
  );
}