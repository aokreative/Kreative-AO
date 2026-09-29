import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-dm-sans",
});
import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import { SplashOverlay } from "@/components/splash-overlay";
import { Assistant } from "@/components/assistant";
import { SiteFooter } from "@/components/site-footer";
import { CursorTracker } from "@/components/cursor-tracker";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { SvgFilters } from "@/components/ui/svg-filters";
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
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={`flex min-h-screen flex-col ${cormorant.variable} ${dmSans.variable}`}>
        <Script id="splash-init" strategy="beforeInteractive">
          {`(function(){try{if(sessionStorage.getItem('ao-splash') || window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.splash='skip'}}catch(e){}})()`}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-teal focus:px-4 focus:py-2 focus:text-parchment"
        >
          Skip to content
        </a>
        <SplashOverlay />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Assistant />
        <CursorTracker />
        <CookieConsent />
        <SvgFilters />
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": SITE.name,
            "url": SITE.url,
            "logo": `${SITE.url}/brand/logo.png`,
            "telephone": SITE.phone,
            "email": SITE.email,
            "sameAs": [
              SITE.socials.instagram,
              SITE.socials.tiktok,
              SITE.socials.linkedin
            ]
          })}
        </Script>
      </body>
    </html>
  );
}
