import type { Metadata } from "next";
import { CONTACT_COPY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & conditions — HAPR Visual",
};

export default function TermsConditionsPage() {
  return (
    <main className="container-hapr max-w-3xl pt-32 pb-24 lg:pt-40 lg:pb-32">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-6 font-serif text-5xl italic lg:text-6xl">
        Terms &amp; conditions
      </h1>
      <p className="mt-4 text-sm text-muted">Last updated: 2024</p>

      <div className="mt-12 space-y-10 text-base leading-relaxed text-ink/90">
        <section>
          <h2 className="text-xl font-medium">1. Acceptance of terms</h2>
          <p className="mt-3 text-muted">
            By accessing or using this website, you agree to be bound by these
            terms and conditions. If you do not agree with any part of them,
            please do not use the website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium">2. Services</h2>
          <p className="mt-3 text-muted">
            HAPR Visual provides 3D visualization, rendering, modeling and
            animation services. Project scopes, deliverables, timelines and
            fees are agreed in writing on a per-project basis. Quotes provided
            through the contact form are indicative until confirmed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium">3. Intellectual property</h2>
          <p className="mt-3 text-muted">
            All visual content displayed on this website — renders, models,
            animations and brand assets — is the property of HAPR Visual or its
            clients and is protected by copyright. You may not copy,
            redistribute, or use the content for commercial purposes without
            written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium">4. Project deliverables &amp; revisions</h2>
          <p className="mt-3 text-muted">
            Deliverables and the number of included revision rounds are defined
            in each project agreement. Additional revisions beyond the agreed
            scope are billed separately. Final files are delivered upon full
            payment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium">5. Limitation of liability</h2>
          <p className="mt-3 text-muted">
            The website is provided &quot;as is&quot; without warranties of any
            kind. HAPR Visual shall not be liable for any indirect or
            consequential damages arising from the use of this website or the
            services rendered.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium">6. Governing law &amp; contact</h2>
          <p className="mt-3 text-muted">
            These terms are governed by the laws of Ukraine. For questions
            regarding these terms, contact us at{" "}
            <a
              href={`mailto:${CONTACT_COPY.email}`}
              className="underline underline-offset-4"
            >
              {CONTACT_COPY.email}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}