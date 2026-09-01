import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/magnetic";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="label text-ink-3">{children}</p>;
}

/* The signature gradient as a hairline. Once per screen. */
export function SignalRule({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`signal h-px w-full ${className}`} />;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "accent" | "ghost";
  external?: boolean;
  className?: string;
};

const VARIANTS: Record<string, string> = {
  primary:
    "bg-teal text-parchment hover:bg-teal-deep border-transparent dark:bg-parchment dark:text-teal-deep dark:hover:bg-sand",
  accent:
    "bg-accent text-on-accent hover:brightness-95 border-transparent",
  ghost:
    "bg-transparent text-ink border-line hover:border-ink-3 hover:bg-surface-2",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-[7px] border border-line-soft px-5 py-3 text-[14.5px] font-semibold shadow-e1 transition-[transform,box-shadow,filter] duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:shadow-e2 ${VARIANTS[variant]} ${className}`;
  
  const content = (
    <>
      {children}
      <svg
        className="w-4 h-4 opacity-0 -ml-2 transition-all duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-100 group-hover:translate-x-1 group-hover:ml-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </>
  );

  let btn = external ? (
    <a href={href} className={cls} rel="noopener">
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );

  if (variant === "primary" || variant === "accent") {
    return <Magnetic>{btn}</Magnetic>;
  }
  return btn;
}

export function Badge({
  tone,
  children,
}: {
  tone: "live" | "building";
  children: ReactNode;
}) {
  const tones = {
    live: "bg-duka-tint text-duka-deep dark:bg-duka/20 dark:text-teal-soft",
    building:
      "bg-orange/15 text-orange-deep dark:bg-orange-lift/15 dark:text-orange-lift",
  };
  return (
    <span
      className={`label inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 ${tones[tone]}`}
    >
      <span aria-hidden className="text-[8px] leading-none">
        ●
      </span>
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
      className="mt-[7px] h-3.5 w-3.5 flex-none text-accent"
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
