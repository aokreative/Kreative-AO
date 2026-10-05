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
  const [hidden, setHidden] = useState(false);

  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 80);
      
      // Always show at the top
      if (currentScrollY <= 0) {
        setHidden(false);
      } 
      // Hide if scrolling down past 150px
      else if (currentScrollY > lastY.current && currentScrollY > 150) {
        setHidden(true);
      } 
      // Show if scrolling up
      else if (currentScrollY < lastY.current) {
        setHidden(false);
      }
      
      lastY.current = currentScrollY;
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
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
                    active ? "text-ink" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="ml-8 h-4 w-px bg-line" />
          
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
          className="rounded-md border border-line px-3 py-2 text-[13px] font-semibold md:hidden"
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
