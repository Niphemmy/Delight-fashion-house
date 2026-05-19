"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animation/Reveal";
import { track } from "@/lib/pixel";

const easing = [0.22, 1, 0.36, 1] as const;

export function LeadMagnet() {
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
    if (!firstName || !email) {
      setError("First name and email both required.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, leadMagnet: "executive-style-guide", source: "home" }),
      });
    } catch {
      // ignore
    }
    track("Subscribe", { source: "home", lead_magnet: "executive-style-guide" });
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section className="surface-navy-deep grain section relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 w-[420px] h-[420px] bg-gold/12 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-[420px] h-[420px] bg-crimson/15 rounded-full blur-3xl pointer-events-none"
      />
      <div className="container-site grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative">
        <Reveal className="lg:col-span-7" y={30}>
          <motion.span
            className="inline-block bg-gold text-navy text-[0.6875rem] font-bold uppercase tracking-eyebrow px-4 py-2 rounded-sm mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easing }}
          >
            Free · 14 Pages · Yours
          </motion.span>
          <h2 className="display-2 text-cream mb-6 max-w-xl text-balance">
            The Executive Style Guide.
          </h2>
          <p className="body-lead text-cream-warm/85 max-w-lg mb-4">
            The five fits every Lagos executive should own. Why two piece sets close more deals than dresses.
            The corsetry rule for women over 35. The aso ebi mistake that flattens any photo. The colour Beulah
            recommends for every signing meeting.
          </p>
          <p className="body-lead text-cream-warm/85 max-w-lg">
            Written by the woman who has built ten years of wardrobes for women like you.
          </p>
        </Reveal>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easing, delay: 0.15 }}
        >
          <div className="bg-cream text-navy p-7 sm:p-9 rounded-md shadow-modal">
            {submitted ? (
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: easing }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-crimson text-ivory flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14 }}
                >
                  ✓
                </motion.div>
                <h3 className="font-display text-2xl text-navy mb-2">Sent. Check your inbox in a minute.</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  Beulah's first styling letter follows on Sunday.
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="font-display text-2xl mb-5 text-navy">Send me the guide.</h3>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <Field label="First Name" name="firstName" type="text" autoComplete="given-name" />
                  <Field label="Email" name="email" type="email" autoComplete="email" />
                  {error && <p className="text-xs text-crimson">{error}</p>}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary w-full"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitting ? "Sending…" : "Send me the guide"}
                  </motion.button>
                  <p className="text-xs italic text-charcoal/55 leading-relaxed">
                    Once you download, you are on the list. We send one styling letter per week. Unsubscribe whenever.
                  </p>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
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
