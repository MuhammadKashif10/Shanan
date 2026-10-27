import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Arrow, PageHero } from "@/components/ui";
import { getDict } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { company, hasLocale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = await getDict(locale);
  return buildMetadata({ locale, path: "/contact", title: t.contact.metaTitle, description: t.contact.metaDescription });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDict(locale);

  const cards = [
    { icon: Phone, label: t.contact.cards.call, value: company.phone, href: company.phoneHref, ltr: true },
    { icon: MessageCircle, label: t.contact.cards.whatsapp, value: company.phone, href: company.whatsappHref, ltr: true, external: true },
    { icon: Mail, label: t.contact.cards.email, value: company.email, href: `mailto:${company.email}`, ltr: true },
    { icon: MapPin, label: t.contact.cards.visit, value: company.address[locale], href: company.mapsHref, external: true },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        title={t.contact.title}
        lead={t.contact.lead}
        crumbs={[
          { name: t.common.breadcrumbHome, path: "" },
          { name: t.nav.contact, path: "/contact" },
        ]}
      />
      <section className="py-20">
        <div className="container-x grid gap-5 sm:grid-cols-2">
          {cards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex gap-5 rounded-2xl border border-line p-7 transition hover:border-navy-700 hover:shadow-xl hover:shadow-navy-900/5"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-amber-brand">
                <c.icon className="size-6" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold uppercase tracking-wider text-amber-deep">{c.label}</span>
                <span
                  className={`mt-1 block break-words text-lg font-semibold text-navy-900 ${c.ltr ? "text-start" : ""}`}
                  dir={c.ltr ? "ltr" : undefined}
                  style={c.ltr && locale === "ar" ? { textAlign: "right" } : undefined}
                >
                  {c.value}
                </span>
                {c.icon === MapPin && <span className="mt-2 block text-sm font-semibold text-navy-700">{t.common.directions} →</span>}
              </span>
            </a>
          ))}
        </div>

        <div className="container-x mt-10">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-navy-50 p-8 sm:flex-row sm:items-center">
            <p className="text-lg font-semibold text-navy-900">{t.contact.formCta}</p>
            <Link
              href={`/${locale}/quote`}
              className="inline-flex items-center gap-2 rounded-full bg-amber-brand px-7 py-3.5 font-bold text-navy-950 transition hover:bg-amber-400"
            >
              {t.common.getQuote}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
