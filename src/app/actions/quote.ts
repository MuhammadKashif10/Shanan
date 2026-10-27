"use server";

import { Resend } from "resend";
import { company, serviceSlugs } from "@/lib/site";

export type QuoteInput = {
  service: string;
  pickupArea: string;
  dropoffArea: string;
  date: string;
  flexible: boolean;
  cargo: string;
  size: string;
  loading: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
  contactVia: string;
  // Anti-bot fields
  website: string; // honeypot, must stay empty
  startedAt: number;
  locale: "en" | "ar";
};

export type QuoteResult =
  | { ok: true; reference: string }
  | { ok: false; error: "invalid" | "unavailable" | "failed"; fields?: string[] };

const SERVICE_LABEL: Record<string, string> = {
  "cargo-transport": "Cargo Transport by Light Trucks",
  "raw-materials-transport": "Raw Materials Transport by Road",
  "furniture-removal": "New & Used Furniture Removal",
  "container-loading-unloading": "Shipping Containers Loading & Unloading",
  "truck-rental": "General Truck Rental",
  "construction-waste-removal": "Construction & Demolition Waste Collection and Transportation",
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max) : "");
const cleanMultiline = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, max) : "";

function reference() {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  return `SCT-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function submitQuote(raw: QuoteInput): Promise<QuoteResult> {
  // Bots fill the hidden field or submit instantly. Pretend success so they learn nothing.
  const elapsed = Date.now() - Number(raw.startedAt || 0);
  if (clean(raw.website, 100) !== "" || elapsed < 2500) return { ok: true, reference: reference() };

  const d = {
    service: clean(raw.service, 60),
    pickupArea: clean(raw.pickupArea, 200),
    dropoffArea: clean(raw.dropoffArea, 200),
    date: clean(raw.date, 20),
    flexible: Boolean(raw.flexible),
    cargo: cleanMultiline(raw.cargo, 1500),
    size: clean(raw.size, 200),
    loading: clean(raw.loading, 20),
    notes: cleanMultiline(raw.notes, 1500),
    name: clean(raw.name, 100),
    phone: clean(raw.phone, 30),
    email: clean(raw.email, 120),
    contactVia: clean(raw.contactVia, 20),
  };

  const bad: string[] = [];
  if (!(serviceSlugs as readonly string[]).includes(d.service)) bad.push("service");
  if (!d.pickupArea) bad.push("pickupArea");
  if (!d.dropoffArea) bad.push("dropoffArea");
  if (!d.cargo) bad.push("cargo");
  if (!d.name) bad.push("name");
  if (!/^\+?[0-9\s\-()]{7,20}$/.test(d.phone)) bad.push("phone");
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) bad.push("email");
  if (!["phone", "whatsapp", "email"].includes(d.contactVia)) bad.push("contactVia");
  if (d.contactVia === "email" && !d.email) bad.push("email");
  if (bad.length) return { ok: false, error: "invalid", fields: bad };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; quote request was not sent.");
    return { ok: false, error: "unavailable" };
  }

  const ref = reference();
  const to = process.env.QUOTE_TO_EMAIL || "mkashifbukhari10@gmail.com";
  const from = process.env.QUOTE_FROM_EMAIL || `${company.brand} <onboarding@resend.dev>`;
  const service = SERVICE_LABEL[d.service];

  const rows: [string, string][] = [
    ["Reference", ref],
    ["Service", service],
    ["Pickup", `${d.pickupArea}, Dubai`],
    ["Drop-off", `${d.dropoffArea}, Dubai`],
    ["Preferred date", d.date ? `${d.date}${d.flexible ? " (flexible)" : ""}` : d.flexible ? "Flexible" : "Not given"],
    ["Cargo", d.cargo],
    ["Size / weight", d.size || "Not given"],
    ["Loading help", d.loading || "Not given"],
    ["Notes", d.notes || "None"],
    ["Name", d.name],
    ["Phone", d.phone],
    ["Email", d.email || "Not given"],
    ["Best contact method", d.contactVia],
    ["Website language", raw.locale === "ar" ? "Arabic" : "English"],
  ];

  const html = `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#16202e">
  <h2 style="color:#0f2543;margin:0 0 4px">New quote request</h2>
  <p style="margin:0 0 20px;color:#4b5a70">${esc(ref)} · ${esc(service)}</p>
  <table style="width:100%;border-collapse:collapse">
  ${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 12px;border:1px solid #dbe3ee;background:#f3f6fb;width:170px;font-weight:bold;vertical-align:top">${esc(k)}</td><td style="padding:10px 12px;border:1px solid #dbe3ee;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("")}
  </table></div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Quote request ${ref}: ${service} (${d.pickupArea} → ${d.dropoffArea})`,
      html,
      text,
      replyTo: d.email || undefined,
    });
    if (error) {
      console.error("Resend rejected the quote email:", error);
      return { ok: false, error: "failed" };
    }
    return { ok: true, reference: ref };
  } catch (err) {
    console.error("Resend request failed:", err);
    return { ok: false, error: "failed" };
  }
}
