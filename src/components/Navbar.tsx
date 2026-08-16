"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import { IconMenu } from "@/components/icons";

const NAV_LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/#contact-form" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-blush-line bg-blush"
      >
        <div className="container-hapr flex h-14 items-center justify-between">
          <Logo />

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium tracking-wide text-espresso/80 transition-colors hover:text-espresso"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/#contact-form"
              className="hidden bg-espresso px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-coffee md:inline-block"
              style={{ borderRadius: 2 }}
            >
              Discuss a project
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="text-espresso md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}