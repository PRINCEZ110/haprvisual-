import Link from "next/link";
import Logo from "@/components/Logo";
import Clock from "@/components/Clock";
import { IconArrowUpRight, IconBehance, IconInstagram, IconLinkedIn } from "@/components/icons";
import { CONTACT_COPY } from "@/lib/constants";

const STUDIO_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "#contact-form" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/haprvisual/" },
  { label: "LinkedIn", href: null },
  { label: "Behance", href: null },
];

const RIGHTS_LINKS = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms & conditions", href: "/terms-conditions" },
];

export default function Footer() {
  return (
    <footer className="bg-coffee text-cream">
      <div className="container-hapr grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <Logo dark />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
            {CONTACT_COPY.description}
          </p>
          <a
            href={`mailto:${CONTACT_COPY.email}?subject=You've%20got%20a%20new%20email%20form%20website`}
            className="mt-6 inline-block text-sm text-cream underline decoration-cream/40 underline-offset-4 transition-colors hover:text-white"
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
          <h3 className="eyebrow text-cream/50">Rights</h3>
          <ul className="mt-5 space-y-3">
            {RIGHTS_LINKS.map((link) => (
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
      </div>

      <div className="border-t border-cream/15">
        <div className="container-hapr flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-cream/60">
          <Clock dark />
          <span>{CONTACT_COPY.location}</span>
          <span>{CONTACT_COPY.rights}</span>
        </div>
      </div>
    </footer>
  );
}