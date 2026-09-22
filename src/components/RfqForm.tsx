"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "./Icon";

const ENDPOINT = process.env.NEXT_PUBLIC_RFQ_ENDPOINT || "/api/rfq.php";
const TOKEN_ENDPOINT = process.env.NEXT_PUBLIC_RFQ_TOKEN_ENDPOINT || "/api/rfq-token.php";
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const APPLICATIONS = ["Plastics & polymers", "Paints & coatings", "Paper", "Ceramics", "Rubber", "Cosmetics", "Pharmaceuticals", "Grinding / resale", "Other"];
const GRADES = ["White", "Grey", "Green", "Coffee", "Not sure"];

const noopSubscribe = () => () => {};

/** Client-side checks mirror the PHP validation (server is authoritative). */
function validate(fd: FormData): Errors {
  const e: Errors = {};
  const s = (k: string) => String(fd.get(k) ?? "").trim();
  if (s("name").length < 2) e.name = "Please enter your name.";
  if (s("company").length < 2) e.company = "Please enter your company name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s("email"))) e.email = "Please enter a valid email address.";
  if (s("country").length < 2) e.country = "Please enter your country.";
  if (!s("form")) e.form = "Please choose a product form.";
  if (s("message").length < 10) e.message = "Please describe your requirement (at least 10 characters).";
  if (!fd.get("consent")) e.consent = "Please agree so we can reply to your enquiry.";
  return e;
}

export function RfqForm({ defaultForm = "" }: { defaultForm?: "lumps" | "powder" | "" }) {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  // Prefill product form from ?form=lumps|powder (links from product pages) without a setState-in-effect.
  const queryForm = useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get("form") ?? "",
    () => "",
  );
  const [picked, setForm] = useState<string | null>(null);
  const form = picked ?? (queryForm === "lumps" || queryForm === "powder" ? queryForm : defaultForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [token, setToken] = useState("");

  // Signed, time-stamped token from the PHP endpoint (CSRF-style + minimum fill time).
  useEffect(() => {
    let alive = true;
    fetch(TOKEN_ENDPOINT, { credentials: "same-origin", headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { token?: string }) => alive && d.token && setToken(d.token))
      .catch(() => {
        /* Submit will report a friendly error if the token is unavailable. */
      });
    return () => {
      alive = false;
    };
  }, []);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const found = validate(fd);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("error");
      setServerMsg("");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: fd, credentials: "same-origin", headers: { Accept: "application/json" } });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: Errors };
      if (res.ok && data.ok) {
        setStatus("sent");
        setServerMsg(data.message || "Thank you — your enquiry has been sent.");
        formRef.current?.reset();
        return;
      }
      setErrors(data.errors || {});
      setStatus("error");
      setServerMsg(data.message || "Your enquiry could not be sent. Please check the form and try again.");
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setStatus("error");
      setServerMsg("Network error — please try again, or email us directly.");
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const err = (k: string) =>
    errors[k] ? (
      <p className="field__error" id={`${k}-error`}>
        {errors[k]}
      </p>
    ) : null;
  const describedBy = (k: string, hint?: boolean) => [hint ? `${k}-hint` : "", errors[k] ? `${k}-error` : ""].filter(Boolean).join(" ") || undefined;

  if (status === "sent") {
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={summaryRef}>
        <Icon name="check" size={28} />
        <div className="stack">
          <h3>Enquiry received</h3>
          <p>{serverMsg} Our sales team will reply to the email address you gave.</p>
        </div>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v);

  return (
    <form ref={formRef} className="rfq" action={ENDPOINT} method="post" noValidate onSubmit={onSubmit} aria-describedby="rfq-required">
      {TURNSTILE_KEY ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" /> : null}

      <div ref={summaryRef} tabIndex={-1} className={status === "error" ? "form-alert" : "sr-only"} role="alert" aria-live="assertive">
        {status === "error" ? (
          <>
            <p>
              <strong>{serverMsg || "Please correct the following:"}</strong>
            </p>
            {errorList.length ? (
              <ul>
                {errorList.map(([k, v]) => (
                  <li key={k}>
                    <a href={`#f-${k}`}>{v}</a>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : null}
      </div>

      <p id="rfq-required" className="small muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <fieldset className="rfq__group">
        <legend>About you</legend>
        <div className="rfq__grid">
          <div className={`field${errors.name ? " has-error" : ""}`}>
            <label htmlFor="f-name">
              Name <span aria-hidden="true">*</span>
            </label>
            <input id="f-name" name="name" type="text" autoComplete="name" required maxLength={120} aria-invalid={!!errors.name} aria-describedby={describedBy("name")} />
            {err("name")}
          </div>
          <div className={`field${errors.company ? " has-error" : ""}`}>
            <label htmlFor="f-company">
              Company <span aria-hidden="true">*</span>
            </label>
            <input id="f-company" name="company" type="text" autoComplete="organization" required maxLength={160} aria-invalid={!!errors.company} aria-describedby={describedBy("company")} />
            {err("company")}
          </div>
          <div className={`field${errors.email ? " has-error" : ""}`}>
            <label htmlFor="f-email">
              Business email <span aria-hidden="true">*</span>
            </label>
            <input id="f-email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={190} aria-invalid={!!errors.email} aria-describedby={describedBy("email")} />
            {err("email")}
          </div>
          <div className={`field${errors.country ? " has-error" : ""}`}>
            <label htmlFor="f-country">
              Country <span aria-hidden="true">*</span>
            </label>
            <input id="f-country" name="country" type="text" autoComplete="country-name" required maxLength={80} aria-invalid={!!errors.country} aria-describedby={describedBy("country")} />
            {err("country")}
          </div>
          <div className="field">
            <label htmlFor="f-phone">
              Phone / WhatsApp <span className="field__opt">(optional)</span>
            </label>
            <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} />
          </div>
        </div>
      </fieldset>

      <fieldset className="rfq__group">
        <legend>Your requirement</legend>

        <div className={`field${errors.form ? " has-error" : ""}`} role="radiogroup" aria-labelledby="f-form-label" aria-describedby={describedBy("form")} id="f-form">
          <p className="field__label" id="f-form-label">
            Product form <span aria-hidden="true">*</span>
          </p>
          <div className="choice-row">
            {[
              { v: "lumps", l: "Talc lumps" },
              { v: "powder", l: "Talc powder" },
              { v: "unsure", l: "Not sure yet" },
            ].map((o) => (
              <label key={o.v} className="choice">
                <input type="radio" name="form" value={o.v} checked={form === o.v} onChange={() => setForm(o.v)} required />
                <span>{o.l}</span>
              </label>
            ))}
          </div>
          {err("form")}
        </div>

        <div className="rfq__grid">
          {form !== "powder" ? (
            <div className="field">
              <label htmlFor="f-grade">
                Colour grade <span className="field__opt">(optional)</span>
              </label>
              <select id="f-grade" name="grade" defaultValue="">
                <option value="">Select…</option>
                {GRADES.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
          ) : null}
          {form !== "lumps" ? (
            <div className="field">
              <label htmlFor="f-spec">
                Mesh / specification <span className="field__opt">(optional)</span>
              </label>
              <input id="f-spec" name="spec" type="text" maxLength={200} placeholder="e.g. 325 mesh, whiteness 92+" aria-describedby="spec-hint" />
              <p className="field__hint" id="spec-hint">
                Mesh or D50, whiteness, LOI or other limits you work to.
              </p>
            </div>
          ) : (
            <div className="field">
              <label htmlFor="f-size">
                Lump size <span className="field__opt">(optional)</span>
              </label>
              <input id="f-size" name="spec" type="text" maxLength={200} placeholder="e.g. 20–80 mm" />
            </div>
          )}
          <div className="field">
            <label htmlFor="f-application">
              Application <span className="field__opt">(optional)</span>
            </label>
            <select id="f-application" name="application" defaultValue="">
              <option value="">Select…</option>
              {APPLICATIONS.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-quantity">
              Estimated quantity <span className="field__opt">(optional)</span>
            </label>
            <input id="f-quantity" name="quantity" type="text" maxLength={80} placeholder="e.g. 2 × 20 ft containers / month" />
          </div>
          <div className="field">
            <label htmlFor="f-destination">
              Destination port <span className="field__opt">(optional)</span>
            </label>
            <input id="f-destination" name="destination" type="text" maxLength={120} placeholder="e.g. Jebel Ali, UAE" />
          </div>
        </div>

        <div className={`field${errors.message ? " has-error" : ""}`}>
          <label htmlFor="f-message">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea id="f-message" name="message" rows={5} required maxLength={4000} aria-invalid={!!errors.message} aria-describedby={describedBy("message", true)} />
          <p className="field__hint" id="message-hint">
            Packing preference, sample needs, delivery timing — anything that helps us quote accurately.
          </p>
          {err("message")}
        </div>
      </fieldset>

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="token" value={token} />

      {TURNSTILE_KEY ? <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme="light" /> : null}

      <div className={`field field--check${errors.consent ? " has-error" : ""}`}>
        <label className="choice choice--check" htmlFor="f-consent">
          <input id="f-consent" type="checkbox" name="consent" value="yes" required aria-invalid={!!errors.consent} aria-describedby={describedBy("consent")} />
          <span>
            I agree that PakTalc may use these details to respond to my enquiry<span aria-hidden="true"> *</span> (see our <a href="/privacy/">privacy policy</a>).
          </span>
        </label>
        {err("consent")}
      </div>

      <div className="rfq__submit">
        <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
          <span>{status === "sending" ? "Sending…" : "Send enquiry"}</span>
          <Icon name="arrow" size={18} className="btn__icon" />
        </button>
        <p className="small muted">Prefer email? Write to info@paktalc.com.</p>
      </div>
    </form>
  );
}
