import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, CtaBand, PageHero, serviceIcons } from "@/components/ui";
import { getDict } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { hasLocale, serviceSlugs } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = await getDict(locale);
  return buildMetadata({ locale, path: "/services", title: t.services.metaTitle, description: t.services.metaDescription });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDict(locale);

  return (
    <>
      <PageHero
        locale={locale}
        title={t.services.title}
        lead={t.services.lead}
        crumbs={[
          { name: t.common.breadcrumbHome, path: "" },
          { name: t.nav.services, path: "/services" },
        ]}
      />
      <section className="py-20">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {serviceSlugs.map((slug) => {
            const Icon = serviceIcons[slug];
            const s = t.servicesData[slug];
            return (
              <Link
                key={slug}
                href={`/${locale}/services/${slug}`}
                className="group flex gap-5 rounded-2xl border border-line p-7 transition hover:border-navy-700 hover:shadow-xl hover:shadow-navy-900/5"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-amber-brand transition group-hover:bg-amber-brand group-hover:text-navy-950">
                  <Icon className="size-7" aria-hidden />
                </span>
                <span>
                  <h2 className="text-xl font-bold text-navy-900">{s.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-navy-700 group-hover:text-navy-900">
                    {t.common.learnMore}
                    <Arrow />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <CtaBand locale={locale} t={t} />
    </>
  );
}
