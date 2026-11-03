import Link from "next/link";

/**
 * Typeset wordmark, matching the A&O proposal and poster lockup:
 * a bold "A&O" with a gold ampersand, and a wide, light "KREATIVE".
 * Swap for the official SVG once it is supplied.
 */
export function Wordmark({
  onDark = false,
  size = "md",
}: {
  onDark?: boolean;
  size?: "md" | "lg";
}) {
  const big = size === "lg";
  return (
    <span
      className={`inline-flex items-baseline gap-[0.55em] whitespace-nowrap leading-none ${
        onDark ? "text-white" : "text-midnight"
      } ${big ? "text-[26px]" : "text-[17px]"}`}
    >
      <span className="font-[750] tracking-[0.02em]" style={{ fontStretch: "125%" }}>
        A<span className="text-gold">&amp;</span>O
      </span>
      <span
        className="font-[350] uppercase tracking-[0.24em]"
        style={{ fontStretch: "125%" }}
      >
        Kreative
      </span>
    </span>
  );
}

export function LogoLink({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" aria-label="A&O Kreative, home" className="inline-flex items-center py-2">
      <Wordmark onDark={onDark} />
    </Link>
  );
}
