import Link from "next/link";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// not-found receives no params, so this page shows both languages and stays fully static.
export default function NotFound() {
  return (
    <section className="container-x py-28 text-center">
      <p className="text-6xl font-extrabold text-amber-brand">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-navy-900">{en.notFound.title}</h1>
      <p className="mx-auto mt-3 max-w-md text-lg text-muted">{en.notFound.text}</p>
      <h2 className="mt-8 text-2xl font-extrabold text-navy-900" lang="ar" dir="rtl">
        {ar.notFound.title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-lg text-muted" lang="ar" dir="rtl">
        {ar.notFound.text}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/en" className="inline-flex rounded-full bg-navy-900 px-7 py-3.5 font-bold text-white hover:bg-navy-800">
          {en.notFound.home}
        </Link>
        <Link href="/ar" lang="ar" className="inline-flex rounded-full border border-navy-900 px-7 py-3.5 font-bold text-navy-900 hover:bg-navy-50">
          {ar.notFound.home}
        </Link>
      </div>
    </section>
  );
}
