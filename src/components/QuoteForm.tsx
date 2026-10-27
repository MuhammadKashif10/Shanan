"use client";

import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { submitQuote, type QuoteInput } from "@/app/actions/quote";
import type { Dict } from "@/content/en";
import { company, serviceSlugs, type Locale, type ServiceSlug } from "@/lib/site";
import { DUBAI_AREAS } from "@/lib/areas";
import { serviceIcons } from "./ui";

type Form = Omit<QuoteInput, "website" | "startedAt" | "locale">;

const empty: Form = {
  service: "",
  pickupArea: "",
  dropoffArea: "",
  date: "",
  flexible: false,
  cargo: "",
  size: "",
  loading: "",
  notes: "",
  name: "",
  phone: "",
  email: "",
  contactVia: "",
};

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/60 transition focus:border-navy-700 focus:outline-none focus:ring-4 focus:ring-navy-700/15 aria-[invalid=true]:border-red-600";

function Field({ label, hint, error, children, id }: { label: string; hint?: string; error?: string; children: ReactNode; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-navy-900">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-sm text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function AreaPicker({
  id,
  label,
  value,
  onChange,
  error,
  locale,
  q,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  locale: Locale;
  q: Dict["quote"];
}) {
  const [other, setOther] = useState(() => !!value && !DUBAI_AREAS.some((a) => a.en === value));
  const selectValue = other ? "__other" : value;
  return (
    <div className="space-y-3">
      <Field id={id} label={label} error={error}>
        <select
          id={id}
          className={inputCls}
          value={selectValue}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          onChange={(e) => {
            if (e.target.value === "__other") {
              setOther(true);
              onChange("");
            } else {
              setOther(false);
              onChange(e.target.value);
            }
          }}
        >
          <option value="" disabled>
            {q.fields.areaPlaceholder}
          </option>
          {DUBAI_AREAS.map((a) => (
            <option key={a.en} value={a.en}>
              {locale === "ar" ? a.ar : a.en}
            </option>
          ))}
          <option value="__other">{q.fields.areaOther}</option>
        </select>
      </Field>
      {other && (
        <input
          aria-label={q.fields.areaOtherHint}
          placeholder={q.fields.areaOtherHint}
          className={inputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          maxLength={200}
        />
      )}
    </div>
  );
}

function todayIso() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

export function QuoteForm({
  locale,
  q,
  serviceTitles,
  whatsappLabel,
}: {
  locale: Locale;
  q: Dict["quote"];
  serviceTitles: Record<ServiceSlug, string>;
  whatsappLabel: string;
}) {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Form>(() => {
    // Pre-select a service when arriving from a service page (?service=slug).
    const s = params.get("service");
    return s && (serviceSlugs as readonly string[]).includes(s) ? { ...empty, service: s } : empty;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (step > 0 || done) headingRef.current?.focus();
  }, [step, done]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  function validate(s: number) {
    const e: Record<string, string> = {};
    if (s === 0 && !data.service) e.service = q.errors.service;
    if (s === 1) {
      if (!data.pickupArea.trim()) e.pickupArea = q.errors.pickup;
      if (!data.dropoffArea.trim()) e.dropoffArea = q.errors.dropoff;
    }
    if (s === 2 && !data.cargo.trim()) e.cargo = q.errors.cargo;
    if (s === 3) {
      if (!data.name.trim()) e.name = q.errors.name;
      if (!/^\+?[0-9\s\-()]{7,20}$/.test(data.phone.trim())) e.phone = q.errors.phone;
      if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) e.email = q.errors.email;
      if (!data.contactVia) e.contactVia = q.errors.contactVia;
      else if (data.contactVia === "email" && !data.email.trim()) e.email = q.errors.email;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const next = () => {
    if (validate(step)) setStep((s) => s + 1);
  };

  function submit() {
    if (!validate(3)) return;
    setServerError("");
    startTransition(async () => {
      try {
        const res = await submitQuote({ ...data, website: honeypot, startedAt: startedAt.current, locale });
        if (res.ok) setDone(res.reference);
        else if (res.error === "invalid") {
          const first = res.fields?.[0];
          const stepOfField: Record<string, number> = { service: 0, pickupArea: 1, dropoffArea: 1, cargo: 2 };
          setStep(first && first in stepOfField ? stepOfField[first] : 3);
          setServerError(q.errors.generic);
        } else setServerError(res.error === "unavailable" ? q.errors.unavailable : q.errors.generic);
      } catch {
        setServerError(q.errors.generic);
      }
    });
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-xl shadow-navy-900/5 sm:p-12">
        <CheckCircle2 className="mx-auto size-16 text-green-600" aria-hidden />
        <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-3xl font-extrabold text-navy-900 focus:outline-none">
          {q.successTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-lg text-muted">{q.successText}</p>
        <p className="mt-6 text-sm font-bold uppercase tracking-wider text-amber-deep">{q.reference}</p>
        <p className="text-2xl font-extrabold tracking-wider text-navy-900" dir="ltr">
          {done}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-muted">{q.whatsappFollow}</p>
          <a
            href={`${company.whatsappHref}?text=${encodeURIComponent(`${done}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
          >
            <MessageCircle className="size-5" aria-hidden />
            {whatsappLabel}
          </a>
          <button
            type="button"
            onClick={() => {
              setData(empty);
              setStep(0);
              setDone(null);
              startedAt.current = Date.now();
            }}
            className="mt-2 text-sm font-semibold text-navy-700 underline underline-offset-4"
          >
            {q.another}
          </button>
        </div>
      </div>
    );
  }

  const heads = [q.s1, q.s2, q.s3, q.s4][step];
  const total = q.steps.length;
  const BackIcon = locale === "ar" ? ArrowRight : ArrowLeft;
  const NextIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < total - 1) next();
        else submit();
      }}
      className="rounded-3xl border border-line bg-white p-6 shadow-xl shadow-navy-900/5 sm:p-10"
    >
      {/* Progress */}
      <div aria-hidden className="mb-2 flex items-center gap-2">
        {q.steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold transition ${
                i < step ? "bg-navy-900 text-white" : i === step ? "bg-amber-brand text-navy-950" : "bg-navy-100 text-muted"
              }`}
            >
              {i < step ? <Check className="size-4" /> : i + 1}
            </span>
            <span className={`hidden text-sm font-semibold sm:block ${i === step ? "text-navy-900" : "text-muted"}`}>{label}</span>
            {i < total - 1 && <span className={`h-0.5 flex-1 rounded ${i < step ? "bg-navy-900" : "bg-navy-100"}`} />}
          </div>
        ))}
      </div>
      <p className="mb-8 text-sm font-semibold text-muted" aria-live="polite">
        {q.stepOf.replace("{n}", String(step + 1)).replace("{total}", String(total))} · {q.steps[step]}
      </p>

      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-extrabold text-navy-900 focus:outline-none sm:text-3xl">
        {heads.title}
      </h2>
      <p className="mb-7 mt-2 text-muted">{heads.text}</p>

      {/* Step 1 */}
      {step === 0 && (
        <fieldset>
          <legend className="sr-only">{q.s1.title}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {serviceSlugs.map((slug) => {
              const Icon = serviceIcons[slug as ServiceSlug];
              const selected = data.service === slug;
              return (
                <label
                  key={slug}
                  className={`flex cursor-pointer items-start gap-4 rounded-2xl border-2 p-5 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-amber-brand/40 ${
                    selected ? "border-navy-900 bg-navy-50" : "border-line hover:border-navy-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="service"
                    value={slug}
                    checked={selected}
                    onChange={() => set("service", slug)}
                    className="sr-only"
                  />
                  <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${selected ? "bg-navy-900 text-amber-brand" : "bg-navy-100 text-navy-900"}`}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-bold leading-snug text-navy-900">{serviceTitles[slug]}</span>
                  {selected && <Check className="ms-auto size-5 shrink-0 text-navy-900" aria-hidden />}
                </label>
              );
            })}
          </div>
          {errors.service && (
            <p role="alert" className="mt-3 text-sm font-semibold text-red-700">
              {errors.service}
            </p>
          )}
        </fieldset>
      )}

      {/* Step 2 */}
      {step === 1 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <AreaPicker id="pickupArea" label={q.fields.pickupArea} value={data.pickupArea} onChange={(v) => set("pickupArea", v)} error={errors.pickupArea} locale={locale} q={q} />
          <AreaPicker id="dropoffArea" label={q.fields.dropoffArea} value={data.dropoffArea} onChange={(v) => set("dropoffArea", v)} error={errors.dropoffArea} locale={locale} q={q} />
          <Field id="date" label={`${q.fields.date} (${q.fields.optional})`}>
            <input id="date" type="date" min={todayIso()} suppressHydrationWarning className={inputCls} value={data.date} onChange={(e) => set("date", e.target.value)} />
          </Field>
          <div className="flex items-end pb-3">
            <label className="flex cursor-pointer items-center gap-3 font-semibold text-navy-900">
              <input
                type="checkbox"
                checked={data.flexible}
                onChange={(e) => set("flexible", e.target.checked)}
                className="size-5 rounded border-line accent-navy-900"
              />
              {q.fields.flexible}
            </label>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 2 && (
        <div className="space-y-5">
          <Field id="cargo" label={q.fields.cargo} hint={q.fields.cargoHint} error={errors.cargo}>
            <textarea
              id="cargo"
              rows={4}
              className={inputCls}
              value={data.cargo}
              onChange={(e) => set("cargo", e.target.value)}
              aria-invalid={!!errors.cargo}
              aria-describedby={errors.cargo ? "cargo-err" : undefined}
              maxLength={1500}
            />
          </Field>
          <Field id="size" label={`${q.fields.size} (${q.fields.optional})`} hint={q.fields.sizeHint}>
            <input id="size" className={inputCls} value={data.size} onChange={(e) => set("size", e.target.value)} maxLength={200} />
          </Field>
          <fieldset>
            <legend className="mb-2 text-sm font-bold text-navy-900">{q.fields.loading}</legend>
            <div className="flex flex-wrap gap-3">
              {[
                ["yes", q.fields.yes],
                ["no", q.fields.no],
                ["not sure", q.fields.notSure],
              ].map(([v, label]) => (
                <label
                  key={v}
                  className={`cursor-pointer rounded-full border-2 px-5 py-2.5 font-semibold transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-amber-brand/40 ${
                    data.loading === v ? "border-navy-900 bg-navy-900 text-white" : "border-line text-navy-900 hover:border-navy-700"
                  }`}
                >
                  <input type="radio" name="loading" value={v} checked={data.loading === v} onChange={() => set("loading", v)} className="sr-only" />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <Field id="notes" label={`${q.fields.notes} (${q.fields.optional})`} hint={q.fields.notesHint}>
            <textarea id="notes" rows={3} className={inputCls} value={data.notes} onChange={(e) => set("notes", e.target.value)} maxLength={1500} />
          </Field>
        </div>
      )}

      {/* Step 4 */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label={q.fields.name} error={errors.name}>
              <input
                id="name"
                className={inputCls}
                value={data.name}
                onChange={(e) => set("name", e.target.value)}
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-err" : undefined}
                maxLength={100}
              />
            </Field>
            <Field id="phone" label={q.fields.phone} hint={q.fields.phoneHint} error={errors.phone}>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                dir="ltr"
                className={`${inputCls} ${locale === "ar" ? "text-right" : ""}`}
                value={data.phone}
                onChange={(e) => set("phone", e.target.value)}
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-err" : undefined}
                maxLength={30}
              />
            </Field>
          </div>
          <Field id="email" label={q.fields.email} hint={q.fields.emailHint} error={errors.email}>
            <input
              id="email"
              type="email"
              dir="ltr"
              className={`${inputCls} ${locale === "ar" ? "text-right" : ""}`}
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-err" : undefined}
              maxLength={120}
            />
          </Field>
          <fieldset>
            <legend className="mb-2 text-sm font-bold text-navy-900">{q.fields.contactVia}</legend>
            <div className="flex flex-wrap gap-3">
              {[
                ["phone", q.fields.viaPhone],
                ["whatsapp", q.fields.viaWhatsapp],
                ["email", q.fields.viaEmail],
              ].map(([v, label]) => (
                <label
                  key={v}
                  className={`cursor-pointer rounded-full border-2 px-5 py-2.5 font-semibold transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-amber-brand/40 ${
                    data.contactVia === v ? "border-navy-900 bg-navy-900 text-white" : "border-line text-navy-900 hover:border-navy-700"
                  }`}
                >
                  <input type="radio" name="contactVia" value={v} checked={data.contactVia === v} onChange={() => set("contactVia", v)} className="sr-only" />
                  {label}
                </label>
              ))}
            </div>
            {errors.contactVia && (
              <p role="alert" className="mt-2 text-sm font-semibold text-red-700">
                {errors.contactVia}
              </p>
            )}
          </fieldset>

          {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
          <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </label>
          </div>

          <div className="rounded-2xl bg-navy-50 p-5 text-sm">
            <p className="mb-3 font-bold uppercase tracking-wider text-amber-deep">{q.summary}</p>
            <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-muted">{q.steps[0]}</dt>
                <dd className="font-semibold text-navy-900">{data.service ? serviceTitles[data.service as ServiceSlug] : "-"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-muted">{q.steps[1]}</dt>
                <dd className="font-semibold text-navy-900">
                  {data.pickupArea} → {data.dropoffArea}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-muted">{q.privacyNote}</p>
          </div>
        </div>
      )}

      {serverError && (
        <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-800">
          {serverError}
        </p>
      )}

      <div className="mt-9 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-navy-900 hover:bg-navy-50 disabled:opacity-50"
          >
            <BackIcon className="size-4" aria-hidden />
            {q.back}
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-amber-brand px-8 py-3.5 font-bold text-navy-950 transition hover:bg-amber-400 disabled:opacity-70"
        >
          {step < total - 1 ? (
            <>
              {q.next}
              <NextIcon className="size-4" aria-hidden />
            </>
          ) : pending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              {q.sending}
            </>
          ) : (
            q.submit
          )}
        </button>
      </div>
    </form>
  );
}
