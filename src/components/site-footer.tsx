import Link from "next/link";
import type { ReactNode } from "react";
import { Wordmark } from "./logo";
import { PRODUCTS, SITE } from "@/lib/site";
import { SERVICES } from "@/content/services";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-abyss text-haze">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 pb-10 pt-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Wordmark onDark />
          <p className="max-w-[30ch] text-[15px] leading-relaxed">
            Crafting brands that command. A growth and technology partner in
            Nairobi, working across Kenya and the UAE.
          </p>
          <address className="flex flex-col gap-1 text-[15px] not-italic">
            <span>The Piano, Westlands, Nairobi</span>
            <a href={`mailto:${SITE.email}`} className="text-white hover:text-gilt">
              {SITE.email}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener" className="text-white hover:text-gilt">
              WhatsApp {SITE.phone}
            </a>
          </address>
        </div>

        <Column title="Services">
          {SERVICES.map((s) => (
            <FooterLink key={s.slug} href={`/services/${s.slug}`}>
              {s.name}
            </FooterLink>
          ))}
        </Column>

        <Column title="Products">
          {PRODUCTS.map((p) => (
            <FooterLink key={p.slug} href={p.href}>
              {p.name}
            </FooterLink>
          ))}
          <div className="h-4" />
          <h3 className="mb-1 text-[14px] font-semibold text-white">Follow</h3>
          <FooterLink href={SITE.socials.instagram} external>Instagram</FooterLink>
          <FooterLink href={SITE.socials.tiktok} external>TikTok</FooterLink>
          <FooterLink href={SITE.socials.linkedin} external>LinkedIn</FooterLink>
          <FooterLink href={SITE.maps} external>Google Maps</FooterLink>
        </Column>

        <Column title="Company">
          <FooterLink href="/work">Work</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/uae">UAE &amp; Dubai</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/book">Book a call</FooterLink>
        </Column>
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 border-t border-white/10 px-5 py-6 text-[13.5px] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>
          © {year} {SITE.name}. ANDO KREATIVE LTD.
        </span>
        <span className="flex gap-6">
          <Link href="/legal/privacy" className="hover:text-white">Privacy policy</Link>
          <Link href="/legal/terms" className="hover:text-white">Terms</Link>
        </span>
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="mb-1 text-[14px] font-semibold text-white">{title}</h3>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const cls = "w-fit text-[15px] transition-colors hover:text-white";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
