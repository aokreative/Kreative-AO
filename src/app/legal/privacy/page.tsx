import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How A&O Kreative handles information collected through this site.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <Section>
      <Container>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-[clamp(30px,4vw,44px)] leading-tight">Privacy</h1>
        <div className="mt-8 flex max-w-[68ch] flex-col gap-5 text-[16.5px] leading-relaxed text-ink-2">
          <p>
            This page is a placeholder and must be reviewed before launch. It
            describes what the site currently does, not a completed legal
            policy.
          </p>
          <h2 className="mt-4 text-[22px] text-ink">What we collect</h2>
          <p>
            When you submit a form we store the name, email, phone, company and
            message you provide, the page you submitted from, and any campaign
            parameters in the link that brought you here. If you use the
            assistant, the conversation is stored so we can follow up on it.
          </p>
          <h2 className="mt-4 text-[22px] text-ink">Why</h2>
          <p>
            To reply to you and to understand which of our own marketing efforts
            are working. We do not sell this information.
          </p>
          <h2 className="mt-4 text-[22px] text-ink">Where it lives</h2>
          <p>
            In a Supabase database hosted in the EU, and in the inboxes of the
            A&amp;O Kreative team.
          </p>
          <h2 className="mt-4 text-[22px] text-ink">Removal</h2>
          <p>
            Email{" "}
            <a className="text-accent-ink underline underline-offset-4" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>{" "}
            and we will delete your record.
          </p>
        </div>
      </Container>
    </Section>
  );
}
