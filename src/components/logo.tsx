import Link from "next/link";

/**
 * The mark is an SVG traced from the original artwork: sharp at any size,
 * ~12KB gzipped, and no longer a raster with the paper texture baked in.
 *
 * Two files rather than one inlined component: inlining 40KB of path data
 * into every page's HTML costs far more than serving a cached image. The
 * teal mark measures 1.43:1 against the dark ground, so dark surfaces get
 * the reversed file instead.
 */
const RATIO = 1251 / 1869;

export function Logo({
  width = 116,
  onDark = false,
  priority = false,
}: {
  width?: number;
  onDark?: boolean;
  priority?: boolean;
}) {
  const height = Math.round(width * RATIO);
  const common = {
    width,
    height,
    decoding: "async" as const,
    fetchPriority: priority ? ("high" as const) : undefined,
    loading: priority ? ("eager" as const) : ("lazy" as const),
  };

  if (onDark) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...common}
        src="/brand/aok-mark-reverse.svg"
        alt="A&O Kreative"
        className="h-auto"
      />
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...common}
        src="/brand/aok-mark.svg"
        alt="A&O Kreative"
        className="h-auto dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...common}
        src="/brand/aok-mark-reverse.svg"
        alt=""
        aria-hidden
        className="hidden h-auto dark:block"
      />
    </>
  );
}

export function LogoLink({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center"
      aria-label="A&O Kreative — home"
    >
      <Logo width={104} onDark={onDark} priority />
    </Link>
  );
}
