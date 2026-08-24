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
  const cls = `inline-flex items-center justify-center gap-2 rounded-[7px] border px-5 py-3 text-[14.5px] font-semibold transition-[background-color,border-color,filter] duration-200 ${VARIANTS[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} rel="noopener">
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
    live: "bg-[rgba(47,110,90,.13)] text-[#2F6E5A] dark:bg-[rgba(143,200,170,.15)] dark:text-[#8FC8AA]",
    building:
      "bg-[rgba(182,87,26,.14)] text-[#8E4413] dark:bg-[rgba(227,164,107,.16)] dark:text-[#E3A46B]",
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
  return <section className={`py-16 sm:py-24 ${className}`}>{inner}</section>;
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
