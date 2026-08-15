"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { BUDGET_OPTIONS, CONTACT_COPY, SERVICE_OPTIONS } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: SERVICE_OPTIONS[0],
    budget: BUDGET_OPTIONS[0],
    message: "",
  });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

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
      <div className="container-hapr grid gap-14 py-24 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-7">
          <h2 className="font-serif text-5xl italic text-ink lg:text-6xl">
            {CONTACT_COPY.heading}
          </h2>

          <form onSubmit={handleSubmit} className="mt-12 grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="service" className="field-label">
                Services
              </label>
              <div className="relative">
                <select
                  id="service"
                  value={form.service}
                  onChange={set("service")}
                  className="field appearance-none pr-10"
                >
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="budget" className="field-label">
                Budget in USD
              </label>
              <div className="relative">
                <select
                  id="budget"
                  value={form.budget}
                  onChange={set("budget")}
                  className="field appearance-none pr-10"
                >
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="field-label">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={set("name")}
                className="field"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                className="field"
                placeholder="you@company.com"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="message" className="field-label">
                Project description (Optional)
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={set("message")}
                className="field resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <div className="flex flex-col gap-5 md:col-span-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="pill w-fit disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Submit"}
              </button>

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

        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="sticky top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/form-image.svg"
              alt="3D interior render — HAPR Visual"
              className="w-full cursor-crosshair"
            />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
              {CONTACT_COPY.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}