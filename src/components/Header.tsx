import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/content/en";
import type { Locale } from "@/lib/site";
import { HeaderNav } from "./HeaderNav";

export function Header({ locale, t }: { locale: Locale; t: Dict }) {
  const links = [
    { href: `/${locale}`, label: t.nav.home, exact: true },
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/faq`, label: t.nav.faq },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line">
      {/* The blur lives on its own layer: backdrop-filter on the header itself would trap the fixed mobile menu inside the 64px bar. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80" />
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href={`/${locale}`} aria-label={t.meta.siteName} className="shrink-0">
          <Image
            src="/brand/logo.png"
            alt={t.meta.siteName}
            width={1359}
            height={339}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>
        <HeaderNav
          locale={locale}
          links={links}
          quote={{ href: `/${locale}/quote`, label: t.nav.quote }}
          langLabel={t.nav.language}
          langAria={t.nav.languageLabel}
          menuLabel={t.nav.menu}
          closeLabel={t.nav.close}
        />
      </div>
    </header>
  );
}
