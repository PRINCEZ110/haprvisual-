import type { Metadata } from "next";
import Link from "next/link";
import AutoVideo from "@/components/AutoVideo";
import MediaList, { type MediaListItem } from "@/components/MediaList";
import Reveal from "@/components/Reveal";
import { CONTACT_COPY, SERVICE_THUMBNAILS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About us — HAPR Visual",
  description:
    "HAPR Visual is an independent 3D visualization studio based in Kathmandu, Nepal — creating cinematic imagery for architecture, interiors, products and spaces that don't exist yet.",
};

const CREATES: MediaListItem[] = [
  {
    title: "Architecture",
    description:
      "We transform architectural concepts into believable environments before construction begins.",
    video: "/videos/service-exterior-render.mp4",
    poster: SERVICE_THUMBNAILS[2].image1,
  },
  {
    title: "Interiors",
    description:
      "Atmospheric imagery focused on materials, light and spatial experience.",
    video: "/videos/service-interior-render.mp4",
    poster: SERVICE_THUMBNAILS[1].image1,
  },
  {
    title: "Products",
    description:
      "Detailed product imagery designed for presentation, campaigns and launch.",
    video: "/videos/product-render.mp4",
    poster: "/images/service-product-1.jpg",
  },
  {
    title: "Motion",
    description:
      "Cinematic animation that moves through your space and tells the story in time.",
    video: "/videos/service-animation-render.mp4",
    poster: SERVICE_THUMBNAILS[4].image1,
  },
];

const PROCESS: MediaListItem[] = [
  {
    title: "Brief & references",
    description:
      "We study the project, gather references and define the visual direction together with you.",
    video: "/videos/service-product-panel-1.mp4",
    poster: SERVICE_THUMBNAILS[0].image2,
  },
  {
    title: "3D modelling",
    description:
      "Every scene is built from precise geometry, ready for materials, lighting and camera work.",
    video: "/videos/service-modeling-panel-1.mp4",
    poster: SERVICE_THUMBNAILS[3].image1,
  },
  {
    title: "Lighting & materials",
    description:
      "We craft realistic light behavior and surface detail so the render feels alive and accurate.",
    video: "/videos/service-interior-panel-1.mp4",
    poster: SERVICE_THUMBNAILS[1].image2,
  },
  {
    title: "Render & post-production",
    description:
      "Final frames are rendered and graded in post to deliver clean, publication-ready visuals.",
    video: "/videos/service-exterior-panel-1.mp4",
    poster: SERVICE_THUMBNAILS[2].image2,
  },
];

const BELIEFS = [
  {
    title: "Precision",
    description:
      "Every model, material and camera matters. Nothing enters a frame by accident.",
  },
  {
    title: "Atmosphere",
    description:
      "Light should create emotion, not simply illuminate a scene.",
  },
  {
    title: "Story",
    description:
      "A good image makes the viewer imagine being there.",
  },
];

const CAPABILITIES = [
  "In-house 3D production",
  "Architecture · Interior · Product",
  "Model → Material → Light → Render",
  "Kathmandu → Worldwide",
];

export default function AboutPage() {
  return (
    <div className="bg-cream text-ink">
      {/* HERO */}
      <section className="container-hapr pt-28 lg:pt-40">
        <Reveal>
          <p className="eyebrow">HAPR Visual — Independent Studio</p>
          <h1 className="mt-8 max-w-4xl font-sans text-[clamp(2.8rem,6.5vw,6rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            We make{" "}
            <span className="font-serif italic">ideas</span> visible.
          </h1>
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <p className="max-w-xl text-base leading-[1.8] text-muted lg:col-span-7">
              HAPR is an independent 3D visualization studio based in
              Kathmandu, creating cinematic imagery for architecture,
              interiors, products and spaces that don&apos;t exist yet.
            </p>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="border-t border-line pt-5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
                  Kathmandu, Nepal
                </p>
                <p className="mt-2 font-serif text-xl italic text-ink">
                  Working globally
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SHOWREEL */}
      <section className="mt-20 bg-espresso lg:mt-28">
        <div className="container-hapr py-16 lg:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-cream/60">
                Showreel — 01
              </p>
              <p className="text-[11px] uppercase tracking-[0.3em] text-cream/60">
                Interior · Product · Architecture
              </p>
            </div>
            <div className="relative mt-8 aspect-video overflow-hidden bg-coffee">
              <AutoVideo
                src="/videos/about-expertise.mp4"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 outline outline-1 outline-offset-[-10px] outline-cream/15" />
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-cream/60">
              2024 — 2026
            </p>
          </Reveal>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="container-hapr py-24 lg:py-36">
        <Reveal>
          <p className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] italic leading-[1.12] text-ink">
            We turn ideas into imagery before they exist in the real world.
          </p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-muted">
            Precision × Art Direction × 3D
          </p>
        </Reveal>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-blush">
        <div className="container-hapr py-24 lg:py-32">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="eyebrow">Who we are</p>
                <h2 className="mt-6 max-w-lg font-serif text-4xl italic leading-[1.1] lg:text-5xl">
                  A small team with a big attention to detail.
                </h2>
              </div>
              <div className="flex flex-col justify-end lg:col-span-6">
                <p className="max-w-md text-base leading-[1.8] text-muted">
                  HAPR Visual is an independent visualization studio based in
                  Kathmandu, Nepal. We work across architecture, interiors and
                  product design — combining technical 3D production with art
                  direction to create imagery that feels considered,
                  atmospheric and real.
                </p>
                <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-6">
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
                    <dd className="mt-2 text-sm font-medium">Kathmandu</dd>
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
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section className="container-hapr py-24 lg:py-32">
        <Reveal>
          <p className="eyebrow">What we believe</p>
          <p className="mt-6 max-w-3xl font-serif text-3xl italic leading-[1.2] lg:text-5xl">
            We don&apos;t just render objects. We build atmosphere.
          </p>
          <ul className="mt-14 border-t border-line">
            {BELIEFS.map((belief, i) => (
              <li
                key={belief.title}
                className="flex flex-col gap-3 border-b border-line py-8 lg:grid lg:grid-cols-12 lg:items-baseline lg:gap-6"
              >
                <span className="font-serif text-sm italic text-muted lg:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl font-medium lg:col-span-4 lg:text-3xl">
                  {belief.title}
                </span>
                <span className="max-w-md text-sm leading-[1.8] text-muted lg:col-span-7">
                  {belief.description}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* WHAT WE CREATE */}
      <section className="bg-blush">
        <div className="container-hapr py-24 lg:py-32">
          <Reveal>
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-serif text-4xl italic lg:text-5xl">
                What we create
              </h2>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Four disciplines, one pipeline — from architectural imagery to
                product films.
              </p>
            </div>
          </Reveal>
          <MediaList items={CREATES} captionPrefix="Create" />
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="container-hapr py-24 lg:py-32">
        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-4xl italic lg:text-5xl">
              How we work
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              A tight, four-step pipeline — from first brief to
              publication-ready frames.
            </p>
          </div>
        </Reveal>
        <MediaList items={PROCESS} captionPrefix="Step" />
      </section>

      {/* CAPABILITY */}
      <section className="bg-espresso text-cream">
        <div className="container-hapr py-24 lg:py-32">
          <Reveal>
            <h2 className="font-serif text-4xl italic lg:text-6xl">
              Small studio. Full pipeline.
            </h2>
            <ul className="mt-14 border-t border-cream/15">
              {CAPABILITIES.map((cap, i) => (
                <li
                  key={cap}
                  className="flex items-baseline gap-6 border-b border-cream/15 py-6"
                >
                  <span className="font-serif text-sm italic text-cream/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl font-medium lg:text-2xl">
                    {cap}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-cream/15 pt-10">
              <div>
                <p className="font-serif text-4xl italic lg:text-5xl">
                  12+
                </p>
                <p className="mt-2 text-sm text-cream/60">Projects delivered</p>
              </div>
              <div>
                <p className="font-serif text-4xl italic lg:text-5xl">5</p>
                <p className="mt-2 text-sm text-cream/60">Core services</p>
              </div>
              <div>
                <p className="font-serif text-4xl italic lg:text-5xl">
                  100%
                </p>
                <p className="mt-2 text-sm text-cream/60">
                  In-house rendering
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STUDIO FILM */}
      <section className="container-hapr py-24 lg:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Studio film — 02</p>
              <h2 className="mt-6 font-serif text-4xl italic lg:text-5xl">
                From idea to final frame
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Behind the scenes of our in-house pipeline — wireframe, clay,
              light, final.
            </p>
          </div>
          <div className="relative mt-12 aspect-video overflow-hidden bg-espresso">
            <AutoVideo
              src="/videos/about-studio.mp4"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 outline outline-1 outline-offset-[-10px] outline-[rgba(60,40,30,0.2)]" />
          </div>
          <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-muted">
            Wireframe → Clay → Lighting → Final
          </p>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section
        id="contact-form"
        className="border-t border-line bg-cream-dark/40"
      >
        <div className="container-hapr py-28 text-center lg:py-40">
          <Reveal>
            <p className="eyebrow">Have an idea?</p>
            <h2 className="mt-6 font-serif text-[clamp(2.75rem,6vw,5.5rem)] italic leading-[1.05] text-ink">
              Let&apos;s make it real.
            </h2>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              <Link href="/#contact-form" className="pill">
                Discuss a project
              </Link>
              <a
                href={`mailto:${CONTACT_COPY.email}?subject=Project%20inquiry`}
                className="text-[11px] uppercase tracking-[0.25em] text-ink underline decoration-ink/30 underline-offset-8 transition-colors hover:text-ink/60"
              >
                {CONTACT_COPY.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}