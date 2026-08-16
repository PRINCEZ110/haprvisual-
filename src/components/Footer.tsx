import Link from "next/link";
import Logo from "@/components/Logo";
import Clock from "@/components/Clock";
import { IconArrowUpRight } from "@/components/icons";
import { CONTACT_COPY } from "@/lib/constants";

const STUDIO_LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/#contact-form" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/haprvisual/" },
  { label: "LinkedIn", href: null },
  { label: "Behance", href: null },
];

export default function Footer() {
  return (
    <footer className="bg-coffee text-cream">
      <div className="container-hapr grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-6">
          <Logo dark />
          <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-cream/50">
            3D Visualization Studio
          </p>
          <a
            href={`mailto:${CONTACT_COPY.email}?subject=Project%20inquiry`}
            className="mt-8 inline-block font-serif text-2xl italic text-cream underline decoration-cream/40 underline-offset-8 transition-colors hover:text-white"
          >
            {CONTACT_COPY.email}
          </a>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow text-cream/50">Studio</h3>
          <ul className="mt-5 space-y-3">
            {STUDIO_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow text-cream/50">Socials</h3>
          <ul className="mt-5 space-y-3">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                {social.href ? (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {social.label}
                    <IconArrowUpRight className="h-3.5 w-3.5 text-cream/40" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-cream/50">
                    {social.label}
                    <span className="text-[10px] uppercase tracking-[0.15em] text-cream/30">
                      Soon
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow text-cream/50">Legal</h3>
          <ul className="mt-5 space-y-3">
            <li>
              <Link
                href="/privacy-policy"
                className="text-sm text-cream/70 transition-colors hover:text-cream"
              >
                Privacy policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-conditions"
                className="text-sm text-cream/70 transition-colors hover:text-cream"
              >
                Terms &amp; conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-hapr flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-cream/60">
          <span>© {new Date().getFullYear()} HAPR Visual</span>
          <Clock dark />
          <span>{CONTACT_COPY.location}</span>
        </div>
      </div>
    </footer>
  );
}