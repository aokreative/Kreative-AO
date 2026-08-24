"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/lib/site";
import { LogoLink } from "./logo";
import { Button, Container } from "./ui/primitives";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-bg/85 backdrop-blur-md">
      <Container className="flex h-[68px] items-center justify-between gap-6">
        <LogoLink />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-[14.5px] font-medium transition-colors ${
                  active ? "text-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className="signal absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/book" variant="accent" className="!py-2.5 !px-4">
            Book a call
          </Button>
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
        <div id="mobile-nav" className="border-t border-line-soft md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-[15px] font-medium text-ink-2 hover:bg-surface-2 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/book" variant="accent" className="mt-2">
              Book a call
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
