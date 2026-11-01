import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/stroyka", "/avto", "/pravila", ...CATEGORIES.map((c) => `/${c.slug}`)];
  return paths.map((p) => ({ url: `${SITE.url}${p}` }));
}
