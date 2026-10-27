import type { Metadata } from "next";
import { SITE_URL, company, locales, type Locale } from "./site";

const OG_LOCALE: Record<Locale, string> = { en: "en_AE", ar: "ar_AE" };

export function canonicalFor(locale: Locale, path = "") {
  return `${SITE_URL}/${locale}${path}`;
}

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  noindex = false,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, canonicalFor(l, path)]));
  languages["x-default"] = canonicalFor("en", path);
  const other = locales.find((l) => l !== locale)!;
  const url = canonicalFor(locale, path);

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: company.brand,
      locale: OG_LOCALE[locale],
      alternateLocale: [OG_LOCALE[other]],
      images: [{ url: `${SITE_URL}/brand/og.png`, width: 1200, height: 630, alt: company.brand }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/brand/og.png`],
    },
  };
}

export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MovingCompany"],
    "@id": `${SITE_URL}/#organization`,
    name: company.brand,
    legalName: company.legalName.en,
    alternateName: company.legalName.ar,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/brand/logo.png`,
    image: `${SITE_URL}/brand/og.png`,
    telephone: "+971557651866",
    email: company.email,
    identifier: { "@type": "PropertyValue", name: "Dubai commercial license number", value: company.licenseNo },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office 103, Sultan Mohammed Abdullah Karamastaji Building, Al Murar",
      addressLocality: "Deira",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    areaServed: { "@type": "AdministrativeArea", name: "Dubai" },
    knowsLanguage: ["en", "ar"],
    sameAs: [],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.brand,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonicalFor(locale, item.path),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function serviceJsonLd({
  locale,
  slug,
  name,
  description,
}: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: canonicalFor(locale, `/services/${slug}`),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "AdministrativeArea", name: "Dubai" },
    inLanguage: locale,
  };
}
