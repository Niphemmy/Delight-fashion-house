"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartProvider";
import { buildOrderWhatsAppLink, cartAdminFee, cartTotal } from "@/lib/cart";
import { getSize } from "@/lib/sizing";
import { formatNgn } from "@/lib/utils";
import { track } from "@/lib/pixel";

const LOCATIONS = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Other city in Nigeria",
  "Outside Nigeria",
];

export default function CartPage() {
  const { items, removeItem, setQuantity, subtotal, hasMadeToMeasure, clearCart, itemCount } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const adminFee = cartAdminFee(items);
  const total = cartTotal(items);

  async function handleCheckout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || items.length === 0) return;
    const data = new FormData(e.currentTarget);
    const firstName = String(data.get("firstName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const location = String(data.get("location") || "").trim();
    const address = String(data.get("address") || "").trim();
    if (!firstName || !email || !location || !address) return;

    setSubmitting(true);

    const summary = items
      .map((i) => `${i.title} (${getSize(i.size).shortLabel} x${i.quantity})`)
      .join("; ");

    try {
      await fetch("/api/save-look", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          pinName: `Cart order: ${summary} | Deliver to ${location}`,
          source: "cart-checkout",
        }),
      });
    } catch {
      // continue to WhatsApp regardless
    }

    track("Lead", { source: "cart-checkout", items: itemCount });
    track("InitiateCheckout", { source: "cart-checkout", items: itemCount, value: total });

    const wa = buildOrderWhatsAppLink(items, { firstName, location, address });
    setSubmitting(false);
    setSent(true);
    setTimeout(() => window.open(wa, "_blank", "noopener"), 600);
  }

  return (
    <>
      <header className="surface-navy grain py-12 lg:py-16 text-center">
        <div className="container-narrow">
          <p className="text-xs text-cream-warm/70 mb-4 tracking-cta">
            <Link href="/" className="text-gold hover:underline">Home</Link>
            <span className="mx-2 opacity-50">·</span>
            <span>Cart</span>
          </p>
          <h1 className="display-2 text-cream">Your Cart</h1>
        </div>
      </header>

      {items.length === 0 ? (
        <section className="surface-cream section text-center">
          <div className="container-narrow">
            <div className="w-20 h-20 rounded-full bg-cream-deep flex items-center justify-center mx-auto mb-6">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-navy" aria-hidden="true">
                <path d="M3 5h2.2l2.1 11.2a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.2L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="display-3 mb-3">Nothing saved yet.</h2>
            <p className="body-lead text-charcoal/70 mb-8 max-w-md mx-auto">
              Browse the catalogue, choose your size, and the pieces you love will gather here.
            </p>
            <Link href="/fashion-inspo" className="btn btn-primary">Browse Fashion Inspo</Link>
          </div>
        </section>
      ) : (
        <section className="surface-cream section">
          <div className="container-site grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Items */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl text-navy">
                  {itemCount} {itemCount === 1 ? "piece" : "pieces"}
                </h2>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm text-charcoal/55 hover:text-crimson underline underline-offset-2"
                >
                  Clear cart
                </button>
              </div>
              <div className="space-y-5">
                {items.map((item) => (
                  <div
                    key={item.lineId}
                    className="flex gap-5 bg-cream-warm rounded-md border border-charcoal/10 p-4"
                  >
                    <Link
                      href={`/fashion-inspo/${item.slug}`}
                      className="relative w-24 h-32 sm:w-28 sm:h-36 flex-shrink-0 rounded-sm overflow-hidden bg-cream-deep"
                    >
                      <Image src={item.image} alt={item.title} fill sizes="112px" className="object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <Link
                        href={`/fashion-inspo/${item.slug}`}
                        className="font-display text-lg text-navy leading-tight hover:text-crimson transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-charcoal/60 mt-1">
                        Size: {getSize(item.size).shortLabel}
                        {item.madeToMeasure ? " (built to your measurements)" : ""}
                      </p>
                      <p className="text-base text-crimson font-semibold mt-1">
                        {item.madeToMeasure
                          ? "Price on consultation"
                          : item.unitPrice !== null
                            ? formatNgn(item.unitPrice)
                            : "Price on request"}
                      </p>
                      <div className="flex items-center gap-4 mt-auto pt-3">
                        <div className="flex items-center border border-charcoal/15 rounded-sm bg-cream">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.lineId, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center text-navy hover:bg-cream-deep"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.lineId, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center text-navy hover:bg-cream-deep"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.lineId)}
                          className="text-xs text-charcoal/55 hover:text-crimson underline underline-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout summary */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="bg-navy text-cream rounded-md p-7 lg:p-8 grain">
                <h2 className="font-display text-2xl text-cream mb-5">Order summary</h2>

                <div className="space-y-2.5 pb-4 border-b border-cream/15">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cream-warm/80">Subtotal</span>
                    <span className="text-cream font-medium">{formatNgn(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cream-warm/80">Admin fee</span>
                    <span className="text-cream font-medium">{formatNgn(adminFee)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <span className="font-display text-lg text-cream">Total</span>
                  <span className="font-display text-2xl text-gold">{formatNgn(total)}</span>
                </div>
                {hasMadeToMeasure && (
                  <p className="text-xs italic text-cream-warm/70 leading-relaxed mt-3">
                    Made to Measure pieces are priced with Beulah directly and are not in this total.
                  </p>
                )}
                <p className="text-xs text-cream-warm/70 leading-relaxed mt-4 mb-6">
                  Checkout sends your full order to Beulah on WhatsApp. She confirms fabric, fit, delivery, and
                  payment with you in the chat.
                </p>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-2"
                  >
                    <div className="w-14 h-14 rounded-full bg-gold text-navy flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                      ✓
                    </div>
                    <h3 className="font-display text-xl text-cream mb-1">Order sent to WhatsApp.</h3>
                    <p className="text-sm text-cream-warm/75">
                      If WhatsApp did not open, tap the green button below.
                    </p>
                    <a
                      href={buildOrderWhatsAppLink(items)}
                      target="_blank"
                      rel="noopener"
                      className="btn btn-gold w-full mt-4"
                    >
                      Open WhatsApp
                    </a>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCheckout} className="space-y-4" noValidate>
                    <Field name="firstName" label="First Name" type="text" autoComplete="given-name" />
                    <Field name="email" label="Email" type="email" autoComplete="email" />
                    <label className="block">
                      <span className="block text-[0.7rem] font-bold uppercase tracking-cta text-cream-warm mb-2">
                        Delivery Location
                      </span>
                      <select
                        name="location"
                        required
                        defaultValue=""
                        className="w-full px-4 py-3 text-base rounded-sm border-2 border-cream/15 bg-cream/5 text-cream focus:outline-none focus:border-gold appearance-none"
                      >
                        <option value="" disabled>Select your location</option>
                        {LOCATIONS.map((loc) => (
                          <option key={loc} value={loc} className="text-navy">
                            {loc}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="block text-[0.7rem] font-bold uppercase tracking-cta text-cream-warm mb-2">
                        Full Delivery Address
                      </span>
                      <textarea
                        name="address"
                        rows={3}
                        required
                        placeholder="Street, area, city, and any landmark that helps the dispatch rider."
                        className="w-full px-4 py-3 text-base rounded-sm border-2 border-cream/15 bg-cream/5 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold resize-y"
                      />
                    </label>
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-gold w-full"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitting ? "Sending…" : "Send My Order to WhatsApp"}
                    </motion.button>
                    <p className="text-xs italic text-cream-warm/60 leading-relaxed">
                      We email you a copy of your order and send one styling letter a week. Unsubscribe whenever.
                    </p>
                  </form>
                )}
              </div>
              <Link
                href="/fashion-inspo"
                className="block text-center text-sm text-navy underline underline-offset-4 hover:text-crimson mt-4"
              >
                Keep browsing the catalogue
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Field({
  name,
  label,
  type,
  autoComplete,
}: {
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[0.7rem] font-bold uppercase tracking-cta text-cream-warm mb-2">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="w-full px-4 py-3 text-base rounded-sm border-2 border-cream/15 bg-cream/5 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
      />
    </label>
  );
}
