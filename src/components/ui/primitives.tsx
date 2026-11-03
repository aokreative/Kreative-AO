import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="label text-ink-3">{children}</p>;
}

export function SignalRule({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`signal h-px w-full ${className}`} />;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "accent" | "ghost" | "light";
  external?: boolean;
  className?: string;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  // Navy pill: the default action on white.
  primary: "bg-midnight text-white hover:bg-harbour",
  // Gold pill: the single most important action in a view.
  accent: "bg-gold text-midnight hover:bg-gilt",
  // Quiet outline for secondary actions on white.
  ghost: "lg text-ink hover:bg-white/70",
  // Outline for secondary actions on navy.
  light: "lg-dark text-white hover:bg-white/15",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const cls = `inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors duration-200 ${VARIANTS[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} rel="noopener" target="_blank">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Badge({
  tone,
  children,
}: {
  tone: "live" | "building";
  children: ReactNode;
}) {
  const tones = {
    live: "bg-duka-tint text-duka-deep",
    building: "bg-[#F3EBDA] text-orange-deep",
  };
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[13px] font-semibold ${tones[tone]}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${tone === "live" ? "bg-duka" : "bg-gold"}`}
      />
      {children}
    </span>
  );
}

export function Section({
  children,
  className = "",
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  const inner = bleed ? children : <Container>{children}</Container>;
  return <section className={`py-[var(--space-section)] ${className}`}>{inner}</section>;
}

export function Check() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="mt-[7px] h-3.5 w-3.5 flex-none text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8.5l3.5 3.5 7.5-8" />
    </svg>
  );
}
