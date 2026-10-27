import type { Dict } from "@/content/en";
import type { Locale } from "./site";

export async function getDict(locale: Locale): Promise<Dict> {
  return locale === "ar" ? (await import("@/content/ar")).ar : (await import("@/content/en")).en;
}
