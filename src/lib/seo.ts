import type { Metadata } from "next";
import { SITE } from "@/lib/site";

/** Shared preview image for links to pages that don't have their own. */
export const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "A&O Kreative: growth and technology partner, Westlands, Nairobi",
};

/**
 * Metadata for one page: its title and description, its canonical address,
 * and the preview shown when the link is shared (WhatsApp, LinkedIn, X).
 *
 * Next merges metadata shallowly, so a page that sets no `openGraph` would
 * share the home page's title. Every indexed page goes through this instead.
 */
export function pageMeta(
  path: string,
  title: string,
  description: string,
  image?: { url: string; alt: string },
): Metadata {
  const shareTitle = `${title} · ${SITE.name}`;
  const images = [image ?? OG_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_KE",
      url: path,
      title: shareTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}
