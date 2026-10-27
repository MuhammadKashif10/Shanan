import Link from "next/link";
import { ArrowRight, ChevronDown, Container, Hammer, MessageCircle, Package, Phone, Sofa, Truck, Trash2, type LucideIcon } from "lucide-react";
import type { Dict } from "@/content/en";
import { company, type Locale, type ServiceSlug } from "@/lib/site";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "cargo-transport": Truck,
  "raw-materials-transport": Package,
  "furniture-removal": Sofa,
  "container-loading-unloading": Container,
  "truck-rental": Hammer,
  "construction-waste-removal": Trash2,
};

export function Arrow({ className = "" }: { className?: string }) {
  return <ArrowRight className={`size-4 rtl:rotate-180 ${className}`} aria-hidden />;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
  invert?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-deep">{eyebrow}</p>}
      <h2 className={`text-balance text-3xl font-extrabold tracking-tight sm:text-4xl ${invert ? "text-white" : "text-navy-900"}`}>
        {title}
      </h2>
      {text && <p className={`mt-4 text-lg leading-relaxed ${invert ? "text-navy-100/85" : "text-muted"}`}>{text}</p>}
    </div>
  );
}

export function PageHero({
  title,
  lead,
  crumbs,
  locale,
}: {
  title: string;
  lead?: string;
  crumbs: { name: string; path: string }[];
  locale: Locale;
}) {
  return (
    <section className="hex-bg text-white">
      <JsonLd data={breadcrumbJsonLd(crumbs, locale)} />
      <div className="container-x py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-navy-100/70">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {i < crumbs.length - 1 ? (
                  <Link href={`/${locale}${c.path}`} className="hover:text-white">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100/85">{lead}</p>}
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-5 text-start text-base font-semibold text-navy-900 sm:px-6 sm:text-lg">
            {item.q}
            <ChevronDown className="size-5 shrink-0 text-amber-deep transition group-open:rotate-180" aria-hidden />
          </summary>
          <p className="px-5 pb-6 leading-relaxed text-muted sm:px-6">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="hex-bg text-white">
      <div className="container-x flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{t.common.readyTitle}</h2>
          <p className="mt-3 text-lg text-navy-100/85">{t.common.readyText}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/quote`}
            className="inline-flex items-center gap-2 rounded-full bg-amber-brand px-7 py-3.5 font-bold text-navy-950 transition hover:bg-amber-400"
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
          <a
            href={company.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-semibold transition hover:bg-white/10"
          >
            <Phone className="size-4" aria-hidden />
            <span dir="ltr">{company.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
