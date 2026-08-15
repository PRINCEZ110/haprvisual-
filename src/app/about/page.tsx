import type { Metadata } from "next";
import Link from "next/link";
import AutoVideo from "@/components/AutoVideo";
import Reveal from "@/components/Reveal";
import { CONTACT_COPY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About us — HAPR Visual",
  description:
    "Experts in 3D Visualization & Motion Design. Discover the vision behind HAPR Visual.",
};

const STATS = [
  { value: "12+", label: "Projects delivered" },
  { value: "5", label: "Core services" },
  { value: "1", label: "Studio, full pipeline" },
  { value: "100%", label: "In-house rendering" },
];

const PROCESS = [
  {
    step: "01",
    title: "Brief & references",
    description:
      "We study the project, gather references and define the visual direction together with you.",
  },
  {
    step: "02",
    title: "3D modelling",
    description:
      "Every scene is built from precise geometry, ready for materials, lighting and camera work.",
  },
  {
    step: "03",
    title: "Lighting & materials",
    description:
      "We craft realistic light behavior and surface detail so the render feels alive and accurate.",
  },
  {
    step: "04",
    title: "Render & post-production",
    description:
      "Final frames are rendered and graded in post to deliver clean, publication-ready visuals.",
  },
];

const FOCUS = [
  "Architectural visualisation",
  "Product design rendering",
  "Interior & exterior imagery",
];

export default function AboutPage() {
  return (
    <div className="pt-28 lg:pt-36">
      <section className="container-hapr">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow">About us</p>
              <h1 className="mt-6 font-sans text-[clamp(2.8rem,6.5vw,6rem)] font-bold leading-[1.02] tracking-[-0.02em]">
                Experts in 3D Visualization &{" "}
                <span className="font-serif italic">Motion Design</span>
              </h1>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4">
              <p className="text-lg leading-relaxed text-muted">
                {CONTACT_COPY.description}
              </p>
              <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-muted">
                    Est.
                  </dt>
                  <dd className="mt-2 text-sm font-medium">2024</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-muted">
                    Based
                  </dt>
                  <dd className="mt-2 text-sm font-medium">
                    {CONTACT_COPY.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-muted">
                    Focus
                  </dt>
                  <dd className="mt-2 text-sm font-medium">3D &amp; Motion</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-hapr py-24 lg:py-32">
        <Reveal>
          <blockquote className="max-w-5xl border-l-2 border-ink pl-8 lg:pl-12">
            <p className="font-serif text-3xl italic leading-snug text-ink lg:text-5xl">
              &ldquo;We bring precision and artistic vision to every frame —
              turning ideas into imagery before they exist in the real
              world.&rdquo;
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-20 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="border border-line bg-cream-dark p-3 lg:p-4">
                <AutoVideo
                  src="/videos/about-expertise.mp4"
                  className="w-full"
                />
                <div className="flex items-center justify-between gap-4 px-1 pb-1 pt-4">
                  <div>
                    <p className="eyebrow">Showreel — 01</p>
                    <p className="mt-1 text-sm text-muted">
                      Interior &amp; product visualisation
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted">
                    2024 — 2026
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
              <p className="text-base leading-relaxed text-muted">
                HAPR Visual is a studio from {CONTACT_COPY.location} delivering
                premium 3D renders for companies in architecture, product
                design, and interior design. From a single product visual to a
                full-scale architectural visualization, we bring precision and
                artistic vision to every frame.
              </p>
              <ul className="mt-10 border-t border-line">
                {FOCUS.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-6 border-b border-line py-4"
                  >
                    <span className="font-serif text-sm italic text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg font-medium text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="#contact-form" className="pill">
                  Discuss a project
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-hapr border-t border-line py-24 lg:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-4xl italic lg:text-5xl">
              How we work
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              A tight, four-step pipeline — from first brief to
              publication-ready frames.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((item, i) => (
            <Reveal
              key={item.step}
              delay={i * 0.08}
              className="bg-cream transition-colors duration-300 hover:bg-cream-dark"
            >
              <div className="flex h-full flex-col p-8">
                <span className="font-serif text-2xl italic text-muted">
                  {item.step}
                </span>
                <h3 className="mt-6 text-xl font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-hapr border-t border-line py-24 lg:py-32">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">Metrics</p>
              <h2 className="mt-6 font-serif text-4xl italic lg:text-5xl">
                The studio in numbers
              </h2>
              <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-12">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="border-t border-line pt-6">
                    <p className="font-serif text-5xl italic lg:text-6xl">
                      {stat.value}
                    </p>
                    <p className="mt-3 text-sm text-muted">{stat.label}</p>
                    <span className="mt-6 block text-[11px] uppercase tracking-[0.2em] text-muted/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="border border-line bg-cream-dark p-3 lg:p-4">
                <AutoVideo src="/videos/about-studio.mp4" className="w-full" />
                <div className="px-1 pb-1 pt-4">
                  <p className="eyebrow">Studio film — 02</p>
                  <p className="mt-1 text-sm text-muted">
                    Behind the scenes of our in-house pipeline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="contact-form" className="border-t border-line bg-cream-dark/40">
        <div className="container-hapr flex flex-col items-start gap-8 py-24 lg:flex-row lg:items-center lg:justify-between lg:py-32">
          <Reveal>
            <h2 className="font-serif text-5xl italic lg:text-6xl">
              Let&apos;s work together
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/#contact-form" className="pill">
              Discuss a project
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}