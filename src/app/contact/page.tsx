import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Frame } from "@/components/frame";
import Image from "next/image";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell A&O Kreative what you're trying to build or sell. We reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative w-full min-h-[70vh] flex items-center overflow-hidden">
        {/* 1. BACKGROUND IMAGE LAYER */}
        <div className="absolute inset-0 z-0">
          <Image src="/brand/contact.jpg" fill priority className="object-cover object-center" alt="Contact" />
        </div>
        
        {/* 2. THE DARK VEIL LAYER (HARDCODED) */}
        <div className="header-veil-dark"></div>

        {/* 3. THE TEXT CONTENT LAYER */}
        <div className="relative z-20 w-full container mx-auto px-6 grid lg:grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7 text-[#F3F0E6]">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-4 max-w-[18ch] text-[clamp(32px,4.4vw,52px)] leading-[1.05]">
              Tell us what you&apos;re trying to do
            </h1>
            <p className="mt-5 max-w-[54ch] text-[17px] text-[#F3F0E6]/90">
              The more specific you are, the more useful our first reply will be.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <Suspense fallback={<div className="min-h-[520px]" />}>
            <ContactForm />
          </Suspense>

          <aside className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <h2 className="label text-ink-3">Prefer email</h2>
              <a
                href={`mailto:${SITE.email}`}
                className="w-fit text-[16px] text-accent-ink underline underline-offset-4 mb-2"
              >
                {SITE.email}
              </a>
              <h2 className="label text-ink-3">Prefer WhatsApp</h2>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-[16px] text-accent-ink underline underline-offset-4"
              >
                {SITE.phone}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="label text-ink-3">Prefer to talk</h2>
              <a href="/book" className="w-fit text-[16px] text-accent-ink underline underline-offset-4 mb-2">
                Book a 15-minute call
              </a>
              <h2 className="label text-ink-3 mt-4">Follow us</h2>
              <div className="flex items-center gap-4">
                <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-ink-2 hover:text-accent-ink transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href={SITE.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-ink-2 hover:text-accent-ink transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                </a>
                <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-ink-2 hover:text-accent-ink transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-line-soft pt-6">
              <h2 className="label text-ink-3">Already using Duka POS?</h2>
              <p className="text-[15px] text-ink-2">
                For support with an existing account, sign in to the app â€”
                that reaches the product team faster than this form.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
