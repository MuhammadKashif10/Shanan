import Link from "next/link";
import { BadgeCheck, Languages, MapPin, MessageCircle, PackageCheck, ShieldCheck, Truck, Users } from "lucide-react";
import { Arrow, CtaBand, Faq, SectionHeading, serviceIcons } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { getDict } from "@/lib/i18n";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { company, hasLocale, serviceSlugs } from "@/lib/site";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = await getDict(locale);
  return buildMetadata({ locale, title: t.meta.home.title, description: t.meta.home.description });
}

const whyIcons = [ShieldCheck, BadgeCheck, PackageCheck, Languages];
const trustIcons = [ShieldCheck, BadgeCheck, Languages, MapPin];

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDict(locale);
  const faqPreview = t.faq.items.slice(0, 5);

  return (
    <>
      <JsonLd data={faqJsonLd(faqPreview)} />

      {/* Hero */}
      <section className="hex-bg relative overflow-hidden text-white">
        <div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-12">
          <div className="rise lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold text-amber-brand">
              <span className="size-2 rounded-full bg-amber-brand" aria-hidden />
              {t.home.eyebrow}
            </p>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">{t.home.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100/85">{t.home.text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/quote`}
                className="inline-flex items-center gap-2 rounded-full bg-amber-brand px-7 py-3.5 font-bold text-navy-950 shadow-lg shadow-black/20 transition hover:bg-amber-400"
              >
                {t.common.getQuote}
                <Arrow />
              </Link>
              <a
                href={company.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-semibold transition hover:bg-white/10"
              >
                <MessageCircle className="size-4" aria-hidden />
                {t.common.whatsapp}
              </a>
            </div>
          </div>

          {/* Route illustration */}
          <div className="rise lg:col-span-5" style={{ animationDelay: "0.15s" }} aria-hidden>
            <div className="relative mx-auto aspect-[5/4] w-full max-w-md rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm">
              <svg viewBox="0 0 400 320" className="size-full" fill="none">
                <path
                  className="route-dash"
                  d="M70 240 C 70 150, 170 190, 200 140 S 330 150, 330 80"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="70" cy="240" r="10" fill="#f59e0b" />
                <circle cx="70" cy="240" r="22" stroke="#f59e0b" strokeOpacity=".35" strokeWidth="2" />
                <circle cx="330" cy="80" r="10" fill="#fff" />
                <circle cx="330" cy="80" r="22" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
              </svg>
              <div className="absolute bottom-6 start-6 rounded-xl bg-white px-4 py-2.5 text-navy-900 shadow-lg">
                <p className="text-[0.7rem] font-bold uppercase tracking-wider text-amber-deep">{t.home.routeFrom}</p>
                <p className="text-sm font-bold">{locale === "ar" ? "موقعك" : "Your location"}</p>
              </div>
              <div className="absolute end-6 top-6 rounded-xl bg-white px-4 py-2.5 text-navy-900 shadow-lg">
                <p className="text-[0.7rem] font-bold uppercase tracking-wider text-amber-deep">{t.home.routeTo}</p>
                <p className="text-sm font-bold">{locale === "ar" ? "وجهتك" : "Your destination"}</p>
              </div>
              <div className="absolute start-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-navy-950 text-amber-brand shadow-xl ring-1 ring-white/20 rtl:translate-x-1/2">
                <Truck className="size-7" />
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-t border-white/10 bg-navy-950/40">
          <ul className="container-x grid gap-x-8 gap-y-4 py-5 text-sm font-medium text-navy-100/90 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.trustItems.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <li key={item} className="flex items-center gap-3">
                  <Icon className="size-5 shrink-0 text-amber-brand" aria-hidden />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={t.common.ourServices} title={t.home.servicesTitle} text={t.home.servicesText} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceSlugs.map((slug, i) => {
              const Icon = serviceIcons[slug];
              const s = t.servicesData[slug];
              return (
                <Reveal key={slug} delay={(i % 3) * 80}>
                  <Link
                    href={`/${locale}/services/${slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-navy-700 hover:shadow-xl hover:shadow-navy-900/5"
                  >
                    <span className="flex size-12 items-center justify-center rounded-xl bg-navy-900 text-amber-brand transition group-hover:bg-amber-brand group-hover:text-navy-950">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-navy-900">{s.title}</h3>
                    <p className="mt-2 flex-1 leading-relaxed text-muted">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy-700 group-hover:text-navy-900">
                      {t.common.learnMore}
                      <Arrow className="transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading title={t.home.stepsTitle} text={t.home.stepsText} />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {t.home.steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="h-full rounded-2xl bg-white p-7 shadow-sm ring-1 ring-line">
                    <span className="flex size-10 items-center justify-center rounded-full bg-amber-brand text-lg font-extrabold text-navy-950">
                      {i + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-navy-900">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why Shanan */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title={t.home.whyTitle} text={t.home.whyText} />
            <div className="mt-10 rounded-2xl bg-navy-900 p-7 text-white">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-brand">
                <Users className="size-4" aria-hidden />
                {t.home.whoTitle}
              </p>
              <ul className="mt-4 space-y-2.5 text-navy-100/90">
                {t.home.who.map((w) => (
                  <li key={w} className="flex gap-3">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amber-brand" aria-hidden />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {t.home.why.map((w, i) => {
              const Icon = whyIcons[i];
              return (
                <Reveal key={w.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-line p-7">
                    <Icon className="size-8 text-amber-deep" aria-hidden />
                    <h3 className="mt-4 text-lg font-bold text-navy-900">{w.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{w.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading title={t.home.faqTitle} />
            <Link href={`/${locale}/faq`} className="mt-6 inline-flex items-center gap-2 font-bold text-navy-700 hover:text-navy-900">
              {t.home.faqLink}
              <Arrow />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqPreview} />
          </div>
        </div>
      </section>

      <CtaBand locale={locale} t={t} />
    </>
  );
}
