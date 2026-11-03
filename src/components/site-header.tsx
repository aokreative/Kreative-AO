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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-[box-shadow] duration-200 ${
        scrolled ? "shadow-[0_1px_0_var(--line-soft)]" : ""
      }`}
    >
      <div className="mx-auto grid h-16 w-full max-w-[1200px] grid-cols-[1fr_auto] items-center px-5 sm:px-8 md:grid-cols-[1fr_auto_1fr]">
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

        <div className="md:justify-self-center">
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
          className="justify-self-end rounded-full px-3 py-2 text-[15px] font-medium text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-50 flex flex-col justify-between overflow-y-auto bg-white px-5 pb-10 pt-6 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {MOBILE.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="border-b border-line-soft py-4 text-[28px] font-semibold tracking-[-0.02em] text-ink"
                style={{ fontStretch: "112%" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10 flex flex-col gap-3">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center rounded-full bg-midnight text-[16px] font-semibold text-white"
            >
              Book a call
            </Link>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center justify-center rounded-full text-[16px] font-semibold text-ink ring-1 ring-inset ring-line"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
