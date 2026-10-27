import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { PageHero } from "@/components/ui";
import { getDict } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { company, hasLocale, serviceSlugs, type ServiceSlug } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/quote">) {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = await getDict(locale);
  return buildMetadata({ locale, path: "/quote", title: t.quote.metaTitle, description: t.quote.metaDescription });
}

export default async function QuotePage({ params }: PageProps<"/[locale]/quote">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDict(locale);

  return (
    <>
      <PageHero
        locale={locale}
        title={t.quote.title}
        lead={t.quote.lead}
        crumbs={[
          { name: t.common.breadcrumbHome, path: "" },
          { name: t.nav.quote, path: "/quote" },
        ]}
      />
      <section className="bg-navy-50 py-14 sm:py-20">
        <div className="container-x max-w-3xl">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-white" />}>
            <QuoteForm
              locale={locale}
              q={t.quote}
              serviceTitles={Object.fromEntries(serviceSlugs.map((s) => [s, t.servicesData[s].title])) as Record<ServiceSlug, string>}
              whatsappLabel={t.common.whatsapp}
            />
          </Suspense>
          <p className="mt-8 flex items-center justify-center gap-2 text-center text-muted">
            <Phone className="size-4" aria-hidden />
            <a href={company.phoneHref} dir="ltr" className="font-semibold text-navy-900 hover:underline">
              {company.phone}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
