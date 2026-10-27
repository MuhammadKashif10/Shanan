import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { getDict } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { company, hasLocale, serviceSlugs } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = await getDict(locale);
  return buildMetadata({ locale, path: "/about", title: t.about.metaTitle, description: t.about.metaDescription });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDict(locale);

  return (
    <>
      <PageHero
        locale={locale}
        title={t.about.title}
        lead={t.about.lead}
        crumbs={[
          { name: t.common.breadcrumbHome, path: "" },
          { name: t.nav.about, path: "/about" },
        ]}
      />

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title={t.about.storyTitle} />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
            {t.about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-20">
        <div className="container-x">
          <SectionHeading title={t.about.valuesTitle} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.about.values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-7 ring-1 ring-line">
                <h3 className="text-lg font-bold text-navy-900">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title={t.about.licenseTitle} text={t.about.licenseText} />
            <dl className="mt-8 divide-y divide-line rounded-2xl border border-line">
              {t.about.licenseRows.map(([k, v]) => (
                <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-5 sm:gap-4">
                  <dt className="text-sm font-semibold text-muted sm:col-span-2">{k}</dt>
                  <dd className="font-semibold text-navy-900 sm:col-span-3">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-muted">{t.common.issuer}</p>
          </div>
          <div>
            <SectionHeading title={t.about.activitiesTitle} />
            <ul className="mt-8 space-y-3">
              {serviceSlugs.map((slug) => (
                <li key={slug} className="flex items-start gap-3 rounded-xl border border-line p-4">
                  <Check className="mt-0.5 size-5 shrink-0 text-amber-deep" aria-hidden />
                  <span className="font-semibold text-navy-900">{t.servicesData[slug].title}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              {company.address[locale]}
            </p>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} t={t} />
    </>
  );
}
