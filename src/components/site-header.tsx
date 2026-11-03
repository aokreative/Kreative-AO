"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLink } from "./logo";
import { SITE } from "@/lib/site";

const LEFT = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
];

const MOBILE = [...LEFT, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Lock the page root, not <body>: overflow on body turns it into the
    // scroll container and the sticky header (with Close) scrolls away.
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const close = () => setOpen(false);

  return (
    <>
      {/* Floating glass capsule. The mobile menu renders outside the header,
          so the capsule's backdrop-filter can't trap it. */}
      <header className="sticky top-3 z-[120] mx-3 mt-3 sm:mx-6">
        <div
          className={`lg mx-auto grid h-14 w-full max-w-[1160px] grid-cols-[1fr_auto] items-center rounded-full pl-5 pr-2 sm:pl-6 md:grid-cols-[1fr_auto_1fr] md:pr-2.5`}
        >
          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {LEFT.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`text-[14.5px] transition-colors ${
                  isActive(item.href) ? "text-ink" : "text-ink-3 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="md:justify-self-center" onClick={close}>
            <LogoLink />
          </div>

          <div className="hidden items-center justify-end gap-6 md:flex">
            <Link
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className={`text-[14.5px] transition-colors ${
                isActive("/contact") ? "text-ink" : "text-ink-3 hover:text-ink"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/book"
              className="inline-flex h-9 items-center rounded-full bg-midnight px-4 text-[14px] font-semibold text-white transition-colors hover:bg-harbour"
            >
              Book a call
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 justify-self-end rounded-full px-3 text-[15px] font-medium text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-[1.5px] w-4 rounded bg-current transition-transform duration-300 ${
                  open ? "top-[5px] rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-4 rounded bg-current transition-transform duration-300 ${
                  open ? "top-[5px] -rotate-45" : "top-[8.5px]"
                }`}
              />
            </span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-[110] overflow-y-auto overscroll-contain bg-white/60 backdrop-blur-2xl backdrop-saturate-150 md:hidden"
      >
        <div className="flex min-h-full flex-col justify-between px-6 pb-10 pt-24">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {MOBILE.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={close}
                    className="block border-b border-ink/10 py-4 text-[28px] font-semibold tracking-[-0.02em] text-ink"
                    style={{ fontStretch: "112%" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-10 flex flex-col gap-3">
            <Link
              href="/book"
              onClick={close}
              className="inline-flex h-12 items-center justify-center rounded-full bg-midnight text-[16px] font-semibold text-white"
            >
              Book a call
            </Link>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener"
              className="lg inline-flex h-12 items-center justify-center rounded-full text-[16px] font-semibold text-ink"
            >
              WhatsApp us
            </a>
            <p className="mt-4 flex flex-col items-center gap-1 text-[14px] text-ink-3">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener">
                WhatsApp {SITE.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
