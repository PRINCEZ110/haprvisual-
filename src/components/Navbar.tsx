"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Clock from "@/components/Clock";
import MobileMenu from "@/components/MobileMenu";
import { IconBehance, IconInstagram, IconLinkedIn, IconMenu } from "@/components/icons";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "#contact-form" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-cream/85 backdrop-blur-md"
            : "border-b border-transparent bg-cream/0"
        }`}
      >
        <div
          className={`container-hapr flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-ink/80 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden xl:block">
              <Clock />
            </div>

            <div className="hidden items-center gap-4 text-muted md:flex">
              <a href="https://www.instagram.com/haprvisual/" target="_blank" rel="noreferrer" className="transition-colors hover:text-ink" aria-label="Instagram">
                <IconInstagram />
              </a>
              <a href="#" className="transition-colors hover:text-ink" aria-label="LinkedIn">
                <IconLinkedIn />
              </a>
              <a href="#" className="transition-colors hover:text-ink" aria-label="Behance">
                <IconBehance />
              </a>
            </div>

            <a href="#contact-form" className="pill hidden md:inline-flex">
              Discuss a project
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="text-ink lg:hidden"
              aria-label="Open menu"
            >
              <IconMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}