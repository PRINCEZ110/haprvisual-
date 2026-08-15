import AutoVideo from "@/components/AutoVideo";

export default function Showreel() {
  return (
    <section
      id="showreel"
      className="relative overflow-hidden bg-espresso"
    >
      <div className="container-hapr py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-cream/60">
              Watch the work
            </p>
            <h2 className="mt-3 font-serif text-5xl italic text-cream lg:text-6xl">
              Showreel
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cream/60">
            A short cut through our recent work — architecture, materials,
            light and motion.
          </p>
        </div>

        <div className="mt-12 lg:mt-16">
          <div className="relative aspect-video overflow-hidden bg-coffee">
            <AutoVideo
              src="/videos/about-expertise.mp4"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 outline outline-1 outline-offset-[-10px] outline-cream/15" />
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-cream/60">
              HAPR Showreel — 2024/2026
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-cream/60">
              Loop · Muted
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}