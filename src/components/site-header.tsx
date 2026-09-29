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
      <Container className="flex h-[70px] items-center justify-between gap-6 px-[5vw]">
        <LogoLink onDark={!scrolled} />

        <div className="hidden items-center md:flex">
          <nav aria-label="Main" className="flex items-center gap-8">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              
              const textColor = scrolled ? "text-navy" : "text-cream";
              const hoverColor = scrolled ? "hover:text-gold" : "hover:text-gold";
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-sans text-[13px] font-normal tracking-[0.04em] transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-px after:bg-gold after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 ${
                    active ? `${textColor} after:scale-x-100` : `${textColor} ${hoverColor}`
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="ml-8">
            <Button href="/book" variant="ghost" className={`!py-[9px] !px-5 !text-[12px] !font-medium !rounded-[40px] !border-[1.5px] !tracking-[0.06em] transition-colors ${
              scrolled ? "!border-navy !text-navy hover:!bg-gold hover:!border-gold hover:!text-navy" : "!border-cream !text-cream hover:!bg-gold hover:!border-gold hover:!text-navy"
            }`}>
              Start a Project
            </Button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={`rounded-md border px-3 py-2 text-[13px] font-semibold md:hidden transition-colors ${
            scrolled ? "border-navy/20 text-navy" : "border-cream/20 text-cream"
          }`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-cream-dark bg-cream/95 backdrop-blur-sm md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-[34px] font-normal tracking-[-0.02em] text-navy border-b border-cream-dark py-2.5 text-left transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/book" variant="accent" className="mt-4 w-full justify-center">
              Start a Project
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
