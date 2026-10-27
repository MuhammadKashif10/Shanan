import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import type { Dict } from "@/content/en";
import { company, serviceSlugs, type Locale } from "@/lib/site";

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="hex-bg text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Image src="/brand/logo-white.png" alt={t.meta.siteName} width={1359} height={339} className="h-10 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-100/80">{t.footer.tagline}</p>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-navy-100/60">{company.legalName[locale]}</p>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-brand">{t.footer.services}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {serviceSlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/${locale}/services/${slug}`} className="text-navy-100/85 transition hover:text-white">
                  {t.servicesData[slug].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-brand">{t.footer.explore}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              [`/${locale}`, t.nav.home],
              [`/${locale}/about`, t.nav.about],
              [`/${locale}/faq`, t.nav.faq],
              [`/${locale}/contact`, t.nav.contact],
              [`/${locale}/quote`, t.nav.quote],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-navy-100/85 transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-brand">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-3.5 text-sm text-navy-100/85">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-amber-brand" aria-hidden />
              <a href={company.phoneHref} dir="ltr" className="transition hover:text-white">
                {company.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-amber-brand" aria-hidden />
              <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                {t.common.whatsapp}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-amber-brand" aria-hidden />
              <address className="not-italic leading-relaxed">{company.address[locale]}</address>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-navy-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName[locale]}. {t.footer.rights}
          </p>
          <p>
            {t.footer.licenseLine} {company.licenseNo}
          </p>
          <p className="flex gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-white">
              {t.footer.privacy}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-white">
              {t.footer.terms}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
