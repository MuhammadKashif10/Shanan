import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getDict } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { hasLocale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = (await getDict(locale)).legal.privacy;
  return buildMetadata({ locale, path: "/privacy", title: t.metaTitle, description: t.metaDescription });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = await getDict(locale);
  return <LegalPage locale={locale} doc={t.legal.privacy} home={t.common.breadcrumbHome} crumb={t.footer.privacy} path="/privacy" />;
}
