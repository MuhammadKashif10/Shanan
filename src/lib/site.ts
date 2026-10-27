export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shanancargotransports.com").replace(/\/$/, "");

// Facts below come from the Dubai Economy & Tourism commercial license (No. 1111866).
export const company = {
  legalName: { en: "SHANAN FOR CARGO TRANSPORT BY LIGHT TRUCKS LLC", ar: "شنان لنقل البضائع بالشاحنات الخفيفة ذ.م.م" },
  brand: "Shanan Cargo Transport",
  licenseNo: "1111866",
  registerNo: "1827913",
  dcciNo: "426299",
  issued: "31/10/2022",
  phone: "+971 55 765 1866",
  phoneHref: "tel:+971557651866",
  whatsappHref: "https://wa.me/971557651866",
  email: "shanancargotransport@gmail.com",
  address: {
    en: "Office 103, Sultan Mohammed Abdullah Karamastaji Building, Al Murar, Deira, Dubai, UAE",
    ar: "مكتب رقم 103، مبنى سلطان محمد عبدالله كرمستجي، المرر، ديرة، دبي، الإمارات العربية المتحدة",
  },
  parcelId: "117-377",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Sultan Mohammed Abdullah Karamastaji Building, Al Murar, Deira, Dubai"),
} as const;

export const serviceSlugs = [
  "cargo-transport",
  "raw-materials-transport",
  "furniture-removal",
  "container-loading-unloading",
  "truck-rental",
  "construction-waste-removal",
] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

export const pages = ["", "/about", "/services", "/faq", "/quote", "/contact", "/privacy", "/terms"] as const;

export function localePath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}
