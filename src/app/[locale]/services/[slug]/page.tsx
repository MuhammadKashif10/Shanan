import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Arrow, CtaBand, Faq, PageHero, SectionHeading, serviceIcons } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { getDict } from "@/lib/i18n";
import { buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { hasLocale, locales, serviceSlugs, type ServiceSlug } from "@/lib/site";

const isSlug = (s: string): s is ServiceSlug => (serviceSlugs as readonly string[]).includes(s);

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(locale) || !isSlug(slug)) return {};
  const s = (await getDict(locale)).servicesData[slug];
  return buildMetadata({ locale, path: `/services/${slug}`, title: s.metaTitle, description: s.metaDescription });
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(locale) || !isSlug(slug)) notFound();
  const t = await getDict(locale);
  const s = t.servicesData[slug];
  const Icon = serviceIcons[slug];
  const others = serviceSlugs.filter((x) => x !== slug);

  return (
    <>
      <JsonLd data={serviceJsonLd({ locale, slug, name: s.title, description: s.metaDescription })} />
      <JsonLd data={faqJsonLd(s.faq)} />
      <PageHero
        locale={locale}
        title={s.title}
        lead={s.short}
        crumbs={[
          { name: t.common.breadcrumbHome, path: "" },
          { name: t.nav.services, path: "/services" },
          { name: s.title, path: `/services/${slug}` },
        ]}
      />

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="flex size-14 items-center justify-center rounded-xl bg-navy-900 text-amber-brand">
              <Icon className="size-7" aria-hidden />
            </span>
            <p className="mt-6 text-lg leading-relaxed text-muted">{s.intro}</p>

            <h2 className="mt-12 text-2xl font-extrabold text-navy-900">{t.services.includesTitle}</h2>
            <ul className="mt-5 space-y-3">
              {s.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-amber-deep" aria-hidden />
                  <span className="text-lg text-ink">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl font-extrabold text-navy-900">{t.services.faqTitle}</h2>
            <div className="mt-5">
              <Faq items={s.faq} />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl bg-navy-900 p-7 text-white">
                <h2 className="text-xl font-bold">{t.common.readyTitle}</h2>
                <p className="mt-2 text-navy-100/85">{t.common.readyText}</p>
                <Link
                  href={`/${locale}/quote?service=${slug}`}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-brand px-6 py-3.5 font-bold text-navy-950 transition hover:bg-amber-400"
                >
                  {t.services.quoteCta}
                  <Arrow />
                </Link>
              </div>
              <div className="rounded-2xl border border-line p-7">
                <h2 className="text-sm font-bold uppercase tracking-wider text-amber-deep">{t.services.fitsTitle}</h2>
                <ul className="mt-4 space-y-2 text-navy-900">
                  {s.fits.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amber-brand" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-navy-50 py-16">
        <div className="container-x">
          <SectionHeading title={t.services.otherTitle} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => {
              const OIcon = serviceIcons[o];
              return (
                <Link
                  key={o}
                  href={`/${locale}/services/${o}`}
                  className="flex items-center gap-4 rounded-xl bg-white p-5 ring-1 ring-line transition hover:ring-navy-700"
                >
                  <OIcon className="size-6 shrink-0 text-amber-deep" aria-hidden />
                  <span className="font-semibold text-navy-900">{t.servicesData[o].title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} t={t} />
    </>
  );
}
