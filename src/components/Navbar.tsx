"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import { IconMenu } from "@/components/icons";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "#contact-form" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-[#E7D9D3] bg-[#F7ECE8]"
      >
        <div className="container-hapr flex h-11 items-center justify-between">
          <Logo />

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Main"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium tracking-wide text-[#211D1A]/80 transition-colors hover:text-[#211D1A]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact-form"
              className="hidden bg-[#211D1A] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#3A342F] md:inline-block"
              style={{ borderRadius: 2 }}
            >
              Discuss a project
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="text-[#211D1A] lg:hidden"
              aria-label="Open menu"
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