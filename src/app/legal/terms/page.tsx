import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using our website and services.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <Section>
      <Container>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-[clamp(30px,4vw,44px)] leading-tight">Terms and Conditions</h1>
        <div className="mt-8 flex max-w-[68ch] flex-col gap-5 text-[16.5px] leading-relaxed text-ink-2 prose-aok">
          <p>
            Welcome to {SITE.name}. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully.
          </p>

          <h2 className="mt-4 text-[22px] text-ink">1. Services</h2>
          <p>
            {SITE.name} provides digital marketing, custom software development, and design services. The specific scope, deliverables, and fees for any project will be outlined in a separate Statement of Work (SOW) or proposal.
          </p>

          <h2 className="mt-4 text-[22px] text-ink">2. User Responsibilities</h2>
          <p>
            You agree to use our website and services only for lawful purposes. You must not use our site in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
          </p>

          <h2 className="mt-4 text-[22px] text-ink">3. Intellectual Property</h2>
          <p>
            Unless otherwise stated, {SITE.name} and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this from {SITE.name} for your own personal use subjected to restrictions set in these terms and conditions.
          </p>

          <h2 className="mt-4 text-[22px] text-ink">4. Limitation of Liability</h2>
          <p>
            In no event shall {SITE.name}, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website.
          </p>

          <h2 className="mt-4 text-[22px] text-ink">5. Modifications</h2>
          <p>
            We may revise these Terms and Conditions at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms and Conditions.
          </p>

          <h2 className="mt-4 text-[22px] text-ink">6. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:{" "}
            <a className="text-accent hover:underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </p>
        </div>
      </Container>
    </Section>
  );
}
