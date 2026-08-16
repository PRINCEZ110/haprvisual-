"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AutoVideo from "@/components/AutoVideo";
import { IconArrowUpRight } from "@/components/icons";
import {
  BUDGET_OPTIONS,
  CONTACT_COPY,
  DEADLINE_OPTIONS,
  SERVICE_OPTIONS,
  SERVICE_PREVIEWS,
} from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";
type OptionKey = "service" | "budget" | "deadline";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/haprvisual/" },
  { label: "LinkedIn", href: null },
  { label: "Behance", href: null },
];

const pillBase =
  "rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors";
const pillIdle =
  "border-line bg-white/40 text-muted hover:border-ink/60 hover:text-ink";
const pillActive = "border-ink bg-ink text-cream";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: SERVICE_OPTIONS[0],
    budget: BUDGET_OPTIONS[0],
    deadline: DEADLINE_OPTIONS[0],
    message: "",
  });

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const pick = (key: OptionKey, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          service: SERVICE_OPTIONS[0],
          budget: BUDGET_OPTIONS[0],
          deadline: DEADLINE_OPTIONS[0],
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact-form" className="border-t border-line bg-cream-dark/40">
      <div className="container-hapr grid gap-16 py-24 lg:grid-cols-12 lg:gap-10 lg:py-36">
        {/* Left — brand statement + direct contact */}
        <div className="lg:col-span-5">
          <p className="eyebrow">{CONTACT_COPY.eyebrow}</p>
          <h2 className="mt-8 font-serif text-5xl italic leading-[1.02] text-ink lg:text-7xl">
            Have a space
            <br />
            in mind?
          </h2>
          <p className="mt-5 font-serif text-3xl italic leading-tight text-ink lg:text-4xl">
            {CONTACT_COPY.subheading}
          </p>
          <p className="mt-8 max-w-sm text-base leading-relaxed text-muted">
            {CONTACT_COPY.intro}
          </p>

          {/* Subtle preview of the selected service type */}
          <div className="mt-12 max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={form.service}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[4/3] overflow-hidden border border-line bg-cream"
              >
                <AutoVideo
                  src={SERVICE_PREVIEWS[form.service]}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-ink/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-cream">
                  {form.service}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
              {CONTACT_COPY.preferEmail}
            </p>
            <a
              href={`mailto:${CONTACT_COPY.email}?subject=Project%20inquiry`}
              className="inline-block font-serif text-xl italic text-ink underline decoration-line underline-offset-8 transition-colors hover:text-coffee lg:text-2xl"
            >
              {CONTACT_COPY.email}
            </a>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {SOCIALS.map((social) =>
                social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
                  >
                    {social.label}
                    <IconArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span
                    key={social.label}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted/60"
                  >
                    {social.label}
                    <span className="text-[9px] uppercase tracking-[0.15em] text-muted/40">
                      Soon
                    </span>
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right — the form */}
        <div className="lg:col-span-6 lg:col-start-7">
          <form onSubmit={handleSubmit} className="grid gap-10">
            <div>
              <p className="field-label">{CONTACT_COPY.serviceLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={form.service === option}
                    onClick={() => pick("service", option)}
                    className={`${pillBase} ${
                      form.service === option ? pillActive : pillIdle
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="field-label">{CONTACT_COPY.budgetLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BUDGET_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={form.budget === option}
                    onClick={() => pick("budget", option)}
                    className={`${pillBase} ${
                      form.budget === option ? pillActive : pillIdle
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="field-label">
                  {CONTACT_COPY.nameLabel}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={set("name")}
                  className="field-line"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="field-label">
                  {CONTACT_COPY.emailLabel}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={set("email")}
                  className="field-line"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <p className="field-label">{CONTACT_COPY.deadlineLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {DEADLINE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={form.deadline === option}
                    onClick={() => pick("deadline", option)}
                    className={`${pillBase} ${
                      form.deadline === option ? pillActive : pillIdle
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="field-label">
                {CONTACT_COPY.messageLabel}
              </label>
              <textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={set("message")}
                className="field-line resize-none"
                placeholder={CONTACT_COPY.messagePlaceholder}
              />
            </div>

            <div className="flex flex-col items-start gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="pill disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : `${CONTACT_COPY.cta} →`}
              </button>
              <p className="text-xs text-muted">{CONTACT_COPY.responseTime}</p>

              <motion.div
                initial={false}
                animate={{ opacity: status === "success" || status === "error" ? 1 : 0 }}
                aria-live="polite"
              >
                {status === "success" && (
                  <p className="border border-line bg-cream px-5 py-4 text-sm text-ink">
                    {CONTACT_COPY.success}
                  </p>
                )}
                {status === "error" && (
                  <p className="border border-line bg-cream px-5 py-4 text-sm text-ink">
                    {CONTACT_COPY.error}
                  </p>
                )}
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}