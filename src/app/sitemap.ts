import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ARTICLES } from "@/content/articles";
import { SERVICES } from "@/content/services";
import { CASE_STUDIES } from "@/content/case-studies";

type Entry = MetadataRoute.Sitemap[number];

const BUILT = new Date();

// Article dates are stored as "May 2025" — read them as the 1st of that month.
function articleDate(date: string): Date {
  const parsed = new Date(`1 ${date} 00:00 UTC`);
  return Number.isNaN(parsed.getTime()) ? BUILT : parsed;
}

function page(
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"],
  lastModified: Date = BUILT,
): Entry {
  return { url: `${SITE.url}${path}`, lastModified, changeFrequency, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("", 1, "weekly"),
    page("/services", 0.9, "monthly"),
    page("/work", 0.8, "monthly"),
    page("/products", 0.8, "monthly"),
    page("/products/duka-pos", 0.8, "monthly"),
    page("/products/ams", 0.7, "monthly"),
    page("/blog", 0.8, "weekly"),
    page("/uae", 0.8, "monthly"),
    page("/about", 0.7, "monthly"),
    page("/contact", 0.7, "yearly"),
    page("/book", 0.7, "yearly"),
    ...SERVICES.map((s) => page(`/services/${s.slug}`, 0.8, "monthly")),
    ...CASE_STUDIES.map((c) => page(`/work/${c.slug}`, 0.7, "monthly")),
    ...ARTICLES.map((a) =>
      page(`/blog/${a.slug}`, 0.6, "yearly", articleDate(a.date)),
    ),
    page("/legal/privacy", 0.2, "yearly"),
    page("/legal/terms", 0.2, "yearly"),
  ];
}
