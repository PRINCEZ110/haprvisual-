import type { Metadata } from "next";
import { CONTACT_COPY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy policy — HAPR Visual",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container-hapr max-w-3xl pt-32 pb-24 lg:pt-40 lg:pb-32">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-6 font-serif text-5xl italic lg:text-6xl">
        Privacy policy
      </h1>
      <p className="mt-4 text-sm text-muted">Last updated: 2024</p>

      <div className="mt-12 space-y-10 text-base leading-relaxed text-ink/90">
        <section>
          <h2 className="text-xl font-medium">1. Information we collect</h2>
          <p className="mt-3 text-muted">
            When you submit the contact form on this website, we collect your
            name, email address, the service you are interested in, your budget
            range, and any project description you choose to provide. We do not
            collect or store payment information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium">2. How we use your information</h2>
          <p className="mt-3 text-muted">
            The information you provide is used solely to respond to your
            inquiry, prepare a project proposal, and communicate with you about
            potential collaboration. We do not sell, rent, or share your
            personal information with third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium">3. Data storage</h2>
          <p className="mt-3 text-muted">
            Contact submissions are stored in a secure database accessible only
            to the studio team. We retain submissions for as long as needed to
            manage client relationships and business records, after which they
            are deleted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium">4. Cookies</h2>
          <p className="mt-3 text-muted">
            This website uses only technically necessary cookies and local
            storage for session management in the admin area. We do not use
            advertising or analytics cookies that track you across websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium">5. Your rights</h2>
          <p className="mt-3 text-muted">
            You may request access to, correction of, or deletion of your
            personal data at any time by writing to{" "}
            <a
              href={`mailto:${CONTACT_COPY.email}`}
              className="underline underline-offset-4"
            >
              {CONTACT_COPY.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium">6. Contact</h2>
          <p className="mt-3 text-muted">
            For any privacy-related questions, reach us at{" "}
            <a
              href={`mailto:${CONTACT_COPY.email}`}
              className="underline underline-offset-4"
            >
              {CONTACT_COPY.email}
            </a>
            . HAPR Visual, {CONTACT_COPY.location}.
          </p>
        </section>
      </div>
    </main>
  );
}