export default function HeroVideo() {
  return (
    <div
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      aria-hidden="true"
    >
      <video
        className="h-full w-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="pointer-events-none absolute inset-0 select-none bg-black/15" />
    </div>
  );
}