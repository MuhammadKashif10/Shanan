"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Languages, Menu, X } from "lucide-react";
import type { Locale } from "@/lib/site";

type NavLink = { href: string; label: string; exact?: boolean };

export function HeaderNav({
  locale,
  links,
  quote,
  langLabel,
  langAria,
  menuLabel,
  closeLabel,
}: {
  locale: Locale;
  links: NavLink[];
  quote: { href: string; label: string };
  langLabel: string;
  langAria: string;
  menuLabel: string;
  closeLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const other: Locale = locale === "en" ? "ar" : "en";
  const switchHref = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${other}`) || `/${other}`;

  const isActive = (l: NavLink) => (l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(l.href + "/"));

  const langLink = (
    <Link
      href={switchHref}
      hrefLang={other}
      lang={other}
      aria-label={langAria}
      className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm font-semibold text-navy-900 transition hover:border-navy-900 hover:bg-navy-50"
    >
      <Languages className="size-4" aria-hidden />
      {langLabel}
    </Link>
  );

  return (
    <>
      <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive(l) ? "page" : undefined}
            className={`rounded-md px-3.5 py-2 text-[0.95rem] font-medium transition hover:text-navy-900 ${
              isActive(l) ? "text-navy-900 underline decoration-amber-brand decoration-2 underline-offset-8" : "text-muted"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:block">{langLink}</div>
        <Link
          href={quote.href}
          className="hidden rounded-full bg-amber-brand px-5 py-2.5 text-sm font-bold text-navy-950 shadow-sm transition hover:bg-amber-400 sm:inline-flex"
        >
          {quote.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? closeLabel : menuLabel}
          className="inline-flex size-11 items-center justify-center rounded-md text-navy-900 hover:bg-navy-50 lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white px-5 pb-10 pt-4 sm:top-20 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l) ? "page" : undefined}
                className={`border-b border-line py-4 text-lg font-semibold ${isActive(l) ? "text-navy-900" : "text-muted"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
            <Link
              href={quote.href}
              className="inline-flex justify-center rounded-full bg-amber-brand px-6 py-3.5 text-base font-bold text-navy-950"
            >
              {quote.label}
            </Link>
            <div className="flex justify-center">{langLink}</div>
          </div>
        </div>
      )}
    </>
  );
}
