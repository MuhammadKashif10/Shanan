import type { MetadataRoute } from "next";
import { SITE_URL, locales, pages, serviceSlugs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...pages, ...serviceSlugs.map((s) => `/services/${s}`)];
  const priority = (p: string) => (p === "" ? 1 : p === "/quote" || p === "/services" ? 0.9 : p.startsWith("/services/") ? 0.8 : p === "/privacy" || p === "/terms" ? 0.3 : 0.7);

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: priority(path),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
          "x-default": `${SITE_URL}/en${path}`,
        },
      },
    })),
  );
}
