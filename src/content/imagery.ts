export type ImageryMeta = {
  aspect: string;
};

export const IMAGERY_MANIFEST: Record<string, ImageryMeta> = {
  // Headers (not used in cards)
  "/brand/hero.jpg": { aspect: "aspect-[4/5]" },
  "/brand/about.jpg": { aspect: "aspect-[21/9]" },
  "/brand/contact.jpg": { aspect: "aspect-[21/9]" },
  
  // Blog
  "/brand/blog.jpg": { aspect: "aspect-[21/9]" },

  // Services (16:10)
  "/brand/services/brand-strategy.jpg": { aspect: "aspect-[16/10]" },
  "/brand/services/web-design.jpg": { aspect: "aspect-[16/10]" },
  "/brand/services/content-social.jpg": { aspect: "aspect-[16/10]" },
  "/brand/services/campaigns.jpg": { aspect: "aspect-[16/10]" },
  "/brand/services/ads-growth.jpg": { aspect: "aspect-[16/10]" },
  "/brand/services/ai-automation.jpg": { aspect: "aspect-[16/10]" },
  "/brand/services/pos-erp.jpg": { aspect: "aspect-[16/10]" },

  // Products (3:2)
  "/brand/products-duka.jpg": { aspect: "aspect-[3/2]" },
  "/brand/products-ams.jpg": { aspect: "aspect-[3/2]" },

  // Work (3:2)
  "/brand/work/adofresh-kenya.jpg": { aspect: "aspect-[3/2]" },
  "/brand/work/hego-ventures.jpg": { aspect: "aspect-[3/2]" },
  "/brand/work/africaptions.jpg": { aspect: "aspect-[3/2]" },
  "/brand/work/techwizard-solutions.jpg": { aspect: "aspect-[3/2]" },
  "/brand/work/diamond-bay.jpg": { aspect: "aspect-[3/2]" },
};
