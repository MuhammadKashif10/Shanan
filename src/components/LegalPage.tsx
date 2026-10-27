import { PageHero } from "./ui";
import type { Locale } from "@/lib/site";

type Doc = { title: string; updated: string; sections: { h: string; p: string[] }[] };

export function LegalPage({
  locale,
  doc,
  home,
  crumb,
  path,
}: {
  locale: Locale;
  doc: Doc;
  home: string;
  crumb: string;
  path: string;
}) {
  return (
    <>
      <PageHero
        locale={locale}
        title={doc.title}
        lead={doc.updated}
        crumbs={[
          { name: home, path: "" },
          { name: crumb, path },
        ]}
      />
      <section className="py-16">
        <div className="container-x max-w-3xl space-y-10">
          {doc.sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-2xl font-extrabold text-navy-900">{s.h}</h2>
              {s.p.map((para) => (
                <p key={para} className="mt-3 text-lg leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
