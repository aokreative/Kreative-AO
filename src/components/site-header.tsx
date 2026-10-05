"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { NAV } from "@/lib/site";
import { LogoLink } from "./logo";
import { Button, Container } from "./ui/primitives";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Apply glass background after 80px
      setScrolled(currentScrollY > 80);

      // Hide on scroll down, reveal on any scroll up
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    // Run once on mount
    lastScrollY.current = window.scrollY;
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navbar hides
  useEffect(() => {
    if (!isVisible) setOpen(false);
  }, [isVisible]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "border-b border-white/20 glass text-parchment"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between gap-6">
        <LogoLink />

        <div className="hidden items-center md:flex">
          <nav aria-label="Main" className="flex items-center gap-8">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                    active ? "text-current" : "text-current opacity-70 hover:opacity-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-8 h-4 w-px bg-current opacity-30" />

          <div className="ml-8">
            <Button href="/book" variant="accent" className="!py-2.5 !px-4">
              Book a call
            </Button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={`rounded-md border px-3 py-2 text-[13px] font-semibold md:hidden transition-colors ${
            scrolled ? "border-white/20 text-parchment" : "border-line text-ink"
          }`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-line-soft bg-bg/95 backdrop-blur-xl md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.18em] rounded-md px-2 py-3 text-ink-2 hover:bg-surface-2 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/book" variant="accent" className="mt-4 w-full justify-center">
              Book a call
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
