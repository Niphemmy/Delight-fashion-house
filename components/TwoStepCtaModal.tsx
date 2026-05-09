"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "./ModalProvider";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/pixel";

const easing = [0.22, 1, 0.36, 1] as const;

export function TwoStepCtaModal() {
  const { checkoutOpen, closeCheckout, checkoutContext } = useModal();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (checkoutOpen) {
      setDone(false);
      setSubmitting(false);
      track("InitiateCheckout", {
        pin_name: checkoutContext.pinName ?? null,
        archetype: checkoutContext.archetype ?? null,
        source: checkoutContext.source ?? null,
      });
    }
  }, [checkoutOpen, checkoutContext]);

  const isConsult = checkoutContext.intent === "consult";
  const headline = isConsult
    ? "Tell us about you. We will continue you to WhatsApp."
    : checkoutContext.pinName
      ? `Save ${checkoutContext.pinName} to your email.`
      : "Save this look. Then we send you to Beulah.";
  const sub = isConsult
    ? "First name plus email. Beulah responds in under an hour during Lagos working hours."
    : "First name plus email. We will email you the look so you can find it later, then continue you to WhatsApp.";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const formData = new FormData(e.currentTarget);
    const firstName = String(formData.get("firstName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    if (!firstName || !email) return;

    setSubmitting(true);
    try {
      await fetch("/api/save-look", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          pinName: checkoutContext.pinName ?? null,
          pinUrl: checkoutContext.pinUrl ?? null,
          archetype: checkoutContext.archetype ?? null,
          source: checkoutContext.source ?? null,
        }),
      });
    } catch {
      // continue anyway
    }

    track("Lead", {
      pin_name: checkoutContext.pinName ?? null,
      archetype: checkoutContext.archetype ?? null,
      source: checkoutContext.source ?? null,
    });

    setDone(true);

    const wa = buildWhatsAppLink({
      pinName: checkoutContext.pinName,
      pinUrl: checkoutContext.pinUrl,
      firstName,
      intent: isConsult ? "consult" : "order",
    });

    setTimeout(() => {
      window.open(wa, "_blank", "noopener");
    }, 800);
  }

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-navy-deep/80 backdrop-blur-md flex items-end sm:items-center justify-center px-0 sm:px-4 sm:py-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCheckout();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="bg-cream w-full sm:max-w-md max-h-[calc(100svh-32px)] overflow-y-auto sm:rounded-md rounded-t-2xl shadow-modal relative"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: easing }}
          >
            <button
              type="button"
              onClick={closeCheckout}
              aria-label="Close"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-cream-deep text-navy hover:bg-gold flex items-center justify-center transition-colors z-10"
            >
              <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key="form"
                  className="p-7 sm:p-9"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="eyebrow mb-3">One step before WhatsApp</p>
                  <h3 id="checkout-title" className="font-display text-2xl sm:text-3xl text-navy leading-tight mb-3">
                    {headline}
                  </h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed mb-5">{sub}</p>

                  {checkoutContext.pinName && (
                    <motion.div
                      className="flex items-center gap-3 bg-cream-deep px-3.5 py-2.5 rounded-sm mb-5"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <span className="text-[0.6875rem] font-bold uppercase tracking-eyebrow text-crimson">Look:</span>
                      <span className="text-sm font-medium text-navy">{checkoutContext.pinName}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <Field label="First Name" name="firstName" type="text" autoComplete="given-name" />
                    <Field label="Email" name="email" type="email" autoComplete="email" />
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary w-full text-base"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitting ? "Saving…" : isConsult ? "Continue to WhatsApp" : "Save look + Continue to WhatsApp"}
                    </motion.button>
                    <p className="text-xs italic text-charcoal/55 leading-relaxed">
                      We will only ever email you about your look and weekly styling notes. Unsubscribe whenever.
                    </p>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  className="p-9 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: easing }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-crimson text-ivory flex items-center justify-center mx-auto mb-5 text-2xl font-bold"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    ✓
                  </motion.div>
                  <h3 className="font-display text-2xl text-navy mb-2">Saved. Opening WhatsApp now.</h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">
                    Look saved to your email. Beulah is one tap away. If WhatsApp does not open, check your popup
                    blocker and tap the green button on the page.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
