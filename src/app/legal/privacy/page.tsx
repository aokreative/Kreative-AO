import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Privacy Notice (Interim)",
  description: "How A&O Kreative handles information collected through this site.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <Section>
      <Container>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-[clamp(30px,4vw,44px)] leading-tight">Privacy Notice (Interim)</h1>
        <div className="mt-8 flex max-w-[68ch] flex-col gap-5 text-[16.5px] leading-relaxed text-ink-2">
          <p className="font-semibold text-ink">
            This is an interim notice while our full Privacy Policy is being finalised in compliance with the Kenya Data Protection Act 2019.
          </p>

          <h2 className="mt-4 text-[22px] text-ink">Who we are</h2>
          <p>
            A&amp;O Kreative<br />
            The Piano, Westlands, Nairobi
          </p>

          <h2 className="mt-4 text-[22px] text-ink">What we collect &amp; Why</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Contact form:</strong> When you submit a form, we collect your name, email, phone, company, and message. This is used to reply to you and assess your project needs. We also collect the source page and a honeypot field for security against bots.</li>
            <li><strong>AI Assistant:</strong> We generate a visitor ID per session. Every message in the conversation (both yours and the assistant&apos;s) is stored and used for follow-up. The assistant may also create a lead record from a chat.</li>
            <li><strong>Automated scoring:</strong> Leads are automatically evaluated based on whether a non-free email domain, budget, phone, and company are provided. This is only used to prioritise follow-ups and makes no legally binding decisions.</li>
          </ul>

          <h2 className="mt-4 text-[22px] text-ink">Third-party processors</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Supabase:</strong> For our database (stores all lead and chat data).</li>
            <li><strong>Resend:</strong> For transactional emails and alerts.</li>
            <li><strong>Cal.com:</strong> For booking meetings (they have their own privacy policy).</li>
            <li><strong>Vercel:</strong> For hosting (request logs and IP addresses).</li>
            <li><strong>AI Provider:</strong> Powers the AI assistant and receives message content.</li>
          </ul>

          <h2 className="mt-4 text-[22px] text-ink">Data subject rights &amp; Contact</h2>
          <p>
            You have the right to access, correct, delete, object to, and request portability of your data. We retain leads and chat transcripts indefinitely unless you request removal.
          </p>
          <p>
            To exercise your rights or make any data requests, email us at:{" "}
            <a className="text-accent-ink underline underline-offset-4" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </p>
        </div>
      </Container>
    </Section>
  );
}
