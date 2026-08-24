import Link from "next/link";
import { NAV, PRODUCTS, SERVICES, SITE } from "@/lib/site";
import { Logo } from "./logo";
import { Container } from "./ui/primitives";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 bg-teal-deep text-parchment">
      <div aria-hidden className="signal h-[3px] w-full" />
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo width={110} onDark />
          <p className="max-w-[34ch] text-[15px] leading-relaxed text-teal-soft">
            {SITE.promise}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="w-fit text-[14.5px] text-parchment underline decoration-teal-mid underline-offset-4 hover:decoration-orange-lift"
          >
            {SITE.email}
          </a>
        </div>

        <FooterCol title="Services">
          {SERVICES.map((s) => (
            <FooterLink key={s.slug} href={s.href}>
              {s.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Products">
          {PRODUCTS.map((p) => (
            <FooterLink key={p.slug} href={p.href}>
              {p.name}
              {p.status === "building" && (
                <span className="ml-1.5 text-[11px] text-teal-soft">soon</span>
              )}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Company">
          {NAV.filter((n) => n.href === "/about" || n.href === "/contact").map(
            (n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ),
          )}
          <FooterLink href="/book">Book a call</FooterLink>
          <FooterLink href="/legal/privacy">Privacy</FooterLink>
        </FooterCol>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-teal-mid/40 py-6 text-[13px] text-teal-soft sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {SITE.name}. All rights reserved.
        </span>
        <span className="label text-teal-mid">{SITE.tagline}</span>
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
      <h3 className="label text-teal-soft">{title}</h3>
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
      className="w-fit text-[14.5px] text-parchment/85 transition-colors hover:text-parchment"
    >
      {children}
    </Link>
  );
}
