import Link from "next/link";

export default function Studio() {
  return (
    <section id="studio" className="border-t border-line bg-cream">
      <div className="container-hapr py-24 lg:py-32">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
          The Studio
        </p>
        <p className="mt-6 max-w-4xl font-serif text-3xl italic leading-[1.2] text-ink lg:text-5xl">
          We create visual worlds for architects, designers and brands — where
          light, material and proportion tell the story before the building
          exists.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <Link
            href="/about"
            className="text-[11px] uppercase tracking-[0.25em] text-ink transition-colors hover:text-ink/60"
          >
            About the studio →
          </Link>
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted">
            3D Visualization · Architecture · Interiors · Products · Motion
          </span>
        </div>
      </div>
    </section>
  );
}