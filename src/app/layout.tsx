import type { Metadata } from "next";
// Fonts are self-hosted via Fontsource: no request to Google at runtime,
// which is faster for LCP and keeps visitor data off a third party.
import "@fontsource-variable/newsreader";
import "@fontsource-variable/karla";
import "@fontsource-variable/jetbrains-mono";
import { SiteHeader } from "@/components/site-header";
import { Splash } from "@/components/splash";
import { Assistant } from "@/components/assistant";
import { SiteFooter } from "@/components/site-footer";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — martech that builds and sells`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "A&O Kreative builds software and brings customers to it. Digital marketing, custom development, and our own products including Duka POS.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} — martech that builds and sells`,
    description: SITE.promise,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-teal focus:px-4 focus:py-2 focus:text-parchment"
        >
          Skip to content
        </a>
        <Splash />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Assistant />
      </body>
    </html>
  );
}
