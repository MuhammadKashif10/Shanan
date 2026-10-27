import { notFound } from "next/navigation";
import { CtaBand, Faq, PageHero } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { getDict } from "@/lib/i18n";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { hasLocale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = await getDict(locale);
  return buildMetadata({ locale, path: "/faq", title: t.faq.metaTitle, description: t.faq.metaDescription });
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDict(locale);

  return (
    <>
      <JsonLd data={faqJsonLd(t.faq.items)} />
      <PageHero
        locale={locale}
        title={t.faq.title}
        lead={t.faq.lead}
        crumbs={[
          { name: t.common.breadcrumbHome, path: "" },
          { name: t.nav.faq, path: "/faq" },
        ]}
      />
      <section className="py-20">
        <div className="container-x max-w-3xl">
          <Faq items={t.faq.items} />
        </div>
      </section>
      <CtaBand locale={locale} t={t} />
    </>
  );
}
