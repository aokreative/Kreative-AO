"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NAV } from "@/lib/site";
import { LogoLink } from "./logo";
import { Button, Container } from "./ui/primitives";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "nav-glass"
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
                    active ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="ml-8 h-4 w-px bg-white/[0.08]" />
          
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
          className="rounded-md border border-white/[0.08] px-3 py-2 text-[13px] font-semibold text-white md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-white/[0.06] bg-[#09090b]/95 backdrop-blur-sm md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.18em] rounded-md px-2 py-3 text-white/60 hover:bg-white/[0.04] hover:text-white"
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
