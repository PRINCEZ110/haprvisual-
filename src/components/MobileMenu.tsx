"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import { IconClose } from "@/components/icons";
import { CONTACT_COPY } from "@/lib/constants";

const LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/#contact-form" },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-coffee text-cream"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container-hapr flex h-20 items-center justify-between">
            <Logo dark />
            <button
              type="button"
              onClick={onClose}
              className="text-cream"
              aria-label="Close menu"
            >
              <IconClose className="h-6 w-6" />
            </button>
          </div>

          <nav className="container-hapr flex flex-1 flex-col justify-center gap-2" aria-label="Mobile">
            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="border-b border-cream/10 py-4 font-serif text-4xl italic text-cream transition-colors hover:text-cream/70"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="container-hapr border-t border-cream/15 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href="https://www.instagram.com/haprvisual/"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-cream/70 transition-colors hover:text-cream"
              >
                Instagram
              </a>
              <span className="text-sm text-cream/50">LinkedIn</span>
              <span className="text-sm text-cream/50">Behance</span>
            </div>
            <div className="mt-4 text-sm text-cream/60">
              {CONTACT_COPY.location}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}