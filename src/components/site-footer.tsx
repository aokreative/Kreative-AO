import Link from "next/link";
import { PRODUCTS, SITE } from "@/lib/site";
import { SERVICES } from "@/content/services";
import { Logo } from "./logo";
import { Container } from "./ui/primitives";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 bg-[#05050A] text-ink">
      <div aria-hidden className="signal h-[3px] w-full" />
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo width={110} onDark />
          <p className="max-w-[34ch] text-[15px] leading-relaxed text-white/45">
            {SITE.promise}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="w-fit text-[14.5px] text-white underline decoration-white/20 underline-offset-4 hover:decoration-accent transition-all"
          >
            {SITE.email}
          </a>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-[14.5px] text-white underline decoration-white/20 underline-offset-4 hover:decoration-accent transition-all"
          >
            {SITE.phone}
          </a>
          <p className="text-[13.5px] mt-2 text-white/35">
            The Piano, Westlands — Nairobi
          </p>
        </div>

        <FooterCol title="Services">
          {SERVICES.map((s) => (
            <FooterLink key={s.slug} href={`/services/${s.slug}`}>
              {s.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Products">
          {PRODUCTS.map((p) => (
            <FooterLink key={p.slug} href={p.href}>
              {p.name}
              {p.status === "building" && (
                <span className="ml-1.5 text-[11px] text-white/35">soon</span>
              )}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Explore">
          <FooterLink href="/work">Case studies</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/book">Book a call</FooterLink>
          <FooterLink href="/legal/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/legal/terms">Terms of Service</FooterLink>
        </FooterCol>
      </Container>

      <Container className="flex flex-col gap-4 py-6 text-[13px] sm:flex-row sm:items-center sm:justify-between border-t border-white/[0.06] text-white/35">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <span>
            © {year} {SITE.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-surface transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href={SITE.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-surface transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
            <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-surface transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
        <span className="label text-white/25">{SITE.tagline}</span>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="label text-white/35">{title}</h3>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="w-fit text-[14.5px] transition-colors hover:text-white text-white/50"
    >
      {children}
    </Link>
  );
}
