"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/pixel";

export function ContactBackupForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    const formData = new FormData(e.currentTarget);
    const firstName = String(formData.get("firstName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    if (!firstName || !email || !message) {
      setError("All fields required.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, message }),
      });
    } catch {
      // fall through to success state
    }
    track("Contact" as any, { source: "contact-form" });
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-cream rounded-md p-7 lg:p-9 border border-charcoal/10 text-center">
        <div className="w-14 h-14 rounded-full bg-crimson text-ivory flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          ✓
        </div>
        <h3 className="font-display text-2xl text-navy mb-2">We have you. Beulah will respond within 1 business day.</h3>
        <p className="text-sm text-charcoal/70">
          For anything time-sensitive, message on WhatsApp; replies are usually within the hour.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-cream rounded-md p-7 lg:p-9 border border-charcoal/10 space-y-5" noValidate>
      <Field label="First Name" name="firstName" type="text" autoComplete="given-name" />
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <label className="block">
        <span className="block text-[0.7rem] font-bold uppercase tracking-cta text-navy mb-2">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us what you are dressing for, the date, and any details that matter."
          className="w-full px-4 py-3.5 text-base rounded-sm border-2 border-charcoal/10 bg-cream-warm text-navy placeholder:text-charcoal/40 focus:outline-none focus:border-crimson focus:bg-white transition-colors resize-y"
        />
      </label>
      {error && <p className="text-xs text-crimson">{error}</p>}
      <button type="submit" disabled={submitting} className="btn btn-primary w-full sm:w-auto">
        {submitting ? "Sending…" : "Send the message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[0.7rem] font-bold uppercase tracking-cta text-navy mb-2">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="w-full px-4 py-3.5 text-base rounded-sm border-2 border-charcoal/10 bg-cream-warm text-navy placeholder:text-charcoal/40 focus:outline-none focus:border-crimson focus:bg-white transition-colors"
      />
    </label>
  );
}
