import type { Metadata } from "next";
import Link from "next/link";
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

export default function AboutPage() {
  return (
    <main className="pt-28 lg:pt-36">
      <section className="container-hapr">
        <Reveal>
          <p className="eyebrow">About us</p>
          <h1 className="mt-6 max-w-4xl font-sans text-[clamp(2.8rem,6.5vw,6rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            Experts in 3D Visualization &{" "}
            <span className="font-serif italic">Motion Design</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/render-interior.svg"
                alt="Interior 3D render by HAPR Visual"
                className="w-full cursor-crosshair"
              />
            </div>
            <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
              <p className="max-w-xl text-lg leading-relaxed text-ink">
                {CONTACT_COPY.description}
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
                HAPR Visual is a studio from Kyiv delivering premium 3D renders
                for companies in architecture, product design, and interior
                design. From a single product visual to a full-scale
                architectural visualization, we bring precision and artistic
                vision to every frame — turning ideas into imagery before they
                exist in the real world.
              </p>
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
          <h2 className="font-serif text-4xl italic lg:text-5xl">
            How we work
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.08} className="bg-cream">
              <div className="h-full p-8">
                <span className="text-xs text-muted">{item.step}</span>
                <h3 className="mt-4 text-xl font-medium">{item.title}</h3>
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
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-4xl italic lg:text-5xl">
                The studio in numbers
              </h2>
              <div className="mt-12 grid grid-cols-2 gap-10">
                {STATS.map((stat) => (
                  <div key={stat.label} className="border-t border-line pt-6">
                    <p className="font-serif text-5xl italic">{stat.value}</p>
                    <p className="mt-2 text-sm text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/render-chair.svg"
                alt="Furniture 3D render by HAPR Visual"
                className="w-full cursor-crosshair"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section id="contact-form" className="border-t border-line bg-cream-dark/40">
        <div className="container-hapr flex flex-col items-start gap-8 py-24 lg:flex-row lg:items-center lg:justify-between lg:py-32">
          <Reveal>
            <h2 className="font-serif text-5xl italic lg:text-6xl">
              Let&apos;s collaborate!
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/#contact-form" className="pill">
              Discuss a project
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}