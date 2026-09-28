"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "./Icon";

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact.php";
const TOKEN_ENDPOINT = process.env.NEXT_PUBLIC_RFQ_TOKEN_ENDPOINT || "/api/rfq-token.php";
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const noopSubscribe = () => () => {};

function validate(fd: FormData): Errors {
  const e: Errors = {};
  const s = (k: string) => String(fd.get(k) ?? "").trim();
  if (s("name").length < 2) e.name = "Please enter your name.";
  if (s("company").length < 2) e.company = "Please enter your company name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s("email"))) e.email = "Please enter a valid email address.";
  if (s("subject").length < 3) e.subject = "Please enter a subject.";
  if (s("message").length < 10) e.message = "Please enter your message (at least 10 characters).";
  if (!fd.get("consent")) e.consent = "Please agree so we can reply to your message.";
  return e;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [token, setToken] = useState("");

  // Fetch signed CSRF token on mount
  useEffect(() => {
    let alive = true;
    fetch(TOKEN_ENDPOINT, { credentials: "same-origin", headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { token?: string }) => alive && d.token && setToken(d.token))
      .catch(() => {});
    return () => { alive = false; };
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
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: fd,
        credentials: "same-origin",
        headers: { Accept: "application/json" },
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: Errors };
      if (res.ok && data.ok) {
        setStatus("sent");
        setServerMsg(data.message || "Thank you — your message has been sent.");
        formRef.current?.reset();
        return;
      }
      setErrors(data.errors || {});
      setStatus("error");
      setServerMsg(data.message || "Your message could not be sent. Please check the form and try again.");
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

  const describedBy = (k: string, hint?: boolean) =>
    [hint ? `${k}-hint` : "", errors[k] ? `${k}-error` : ""].filter(Boolean).join(" ") || undefined;

  if (status === "sent") {
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={summaryRef}>
        <Icon name="check" size={28} />
        <div className="stack">
          <h3>Message received</h3>
          <p>{serverMsg} Our team will reply to the email address you provided.</p>
        </div>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v);

  return (
    <form
      ref={formRef}
      className="rfq contact-form"
      action={ENDPOINT}
      method="post"
      noValidate
      onSubmit={onSubmit}
      aria-describedby="contact-required"
    >
      {TURNSTILE_KEY ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" /> : null}

      {/* Error summary */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        className={status === "error" ? "form-alert" : "sr-only"}
        role="alert"
        aria-live="assertive"
      >
        {status === "error" ? (
          <>
            <p>
              <strong>{serverMsg || "Please correct the following:"}</strong>
            </p>
            {errorList.length ? (
              <ul>
                {errorList.map(([k, v]) => (
                  <li key={k}>
                    <a href={`#cf-${k}`}>{v}</a>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : null}
      </div>

      <p id="contact-required" className="small muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {/* About you */}
      <fieldset className="rfq__group">
        <legend>About you</legend>
        <div className="rfq__grid">
          <div className={`field${errors.company ? " has-error" : ""}`}>
            <label htmlFor="cf-company">
              Company <span aria-hidden="true">*</span>
            </label>
            <input
              id="cf-company"
              name="company"
              type="text"
              autoComplete="organization"
              required
              maxLength={160}
              aria-invalid={!!errors.company}
              aria-describedby={describedBy("company")}
            />
            {err("company")}
          </div>

          <div className={`field${errors.name ? " has-error" : ""}`}>
            <label htmlFor="cf-name">
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={120}
              aria-invalid={!!errors.name}
              aria-describedby={describedBy("name")}
            />
            {err("name")}
          </div>

          <div className={`field${errors.email ? " has-error" : ""}`}>
            <label htmlFor="cf-email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={190}
              aria-invalid={!!errors.email}
              aria-describedby={describedBy("email")}
            />
            {err("email")}
          </div>

          <div className="field">
            <label htmlFor="cf-phone">
              Phone <span className="field__opt">(optional)</span>
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={40}
            />
          </div>
        </div>
      </fieldset>

      {/* Message */}
      <fieldset className="rfq__group">
        <legend>Your message</legend>

        <div className={`field${errors.subject ? " has-error" : ""}`}>
          <label htmlFor="cf-subject">
            Subject <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-subject"
            name="subject"
            type="text"
            required
            maxLength={200}
            aria-invalid={!!errors.subject}
            aria-describedby={describedBy("subject")}
          />
          {err("subject")}
        </div>

        <div className={`field${errors.message ? " has-error" : ""}`}>
          <label htmlFor="cf-message">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={6}
            required
            maxLength={4000}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
          />
          {err("message")}
        </div>
      </fieldset>

      {/* Honeypot */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="token" value={token} />

      {TURNSTILE_KEY ? <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme="light" /> : null}

      {/* Consent */}
      <div className={`field field--check${errors.consent ? " has-error" : ""}`}>
        <label className="choice choice--check" htmlFor="cf-consent">
          <input
            id="cf-consent"
            type="checkbox"
            name="consent"
            value="yes"
            required
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
          />
          <span>
            I agree that PakTalc may use these details to respond to my message
            <span aria-hidden="true"> *</span> (see our <a href="/privacy/">privacy policy</a>).
          </span>
        </label>
        {err("consent")}
      </div>

      {/* Submit */}
      <div className="rfq__submit">
        <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
          <span>{status === "sending" ? "Sending…" : "Send Enquiry"}</span>
          <Icon name="arrow" size={18} className="btn__icon" />
        </button>
        <p className="small muted">Prefer email? Write to info@paktalc.com.</p>
      </div>
    </form>
  );
}
