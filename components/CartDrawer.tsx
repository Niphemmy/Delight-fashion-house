"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import { getSize } from "@/lib/sizing";
import { formatNgn } from "@/lib/utils";

const easing = [0.22, 1, 0.36, 1] as const;

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, setQuantity, subtotal, hasMadeToMeasure } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-navy-deep/75 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            className="relative w-full max-w-md bg-cream h-full flex flex-col shadow-modal"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: easing }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-charcoal/10">
              <div>
                <p className="eyebrow mb-0.5">Your selection</p>
                <h2 className="font-display text-2xl text-navy">The Cart</h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="w-9 h-9 rounded-full bg-cream-deep text-navy hover:bg-gold flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <div className="w-16 h-16 rounded-full bg-cream-deep flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-navy" aria-hidden="true">
                    <path d="M3 5h2.2l2.1 11.2a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.2L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-navy mb-2">Your cart is empty.</h3>
                <p className="text-sm text-charcoal/65 mb-6">
                  Every Dé-light piece is cut to your size. Find the look that is yours.
                </p>
                <Link href="/fashion-inspo" onClick={closeCart} className="btn btn-primary">
                  Browse Fashion Inspo
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.lineId} className="flex gap-4 pb-4 border-b border-charcoal/10 last:border-0">
                      <Link
                        href={`/fashion-inspo/${item.slug}`}
                        onClick={closeCart}
                        className="relative w-20 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-cream-deep"
                      >
                        <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/fashion-inspo/${item.slug}`}
                          onClick={closeCart}
                          className="font-display text-base text-navy leading-tight line-clamp-2 hover:text-crimson transition-colors"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-charcoal/60 mt-1">
                          Size: {getSize(item.size).shortLabel}
                        </p>
                        <p className="text-sm text-crimson font-semibold mt-1">
                          {item.madeToMeasure
                            ? "Price on consultation"
                            : item.unitPrice !== null
                              ? formatNgn(item.unitPrice)
                              : "Price on request"}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-charcoal/15 rounded-sm">
                            <button
                              type="button"
                              onClick={() => setQuantity(item.lineId, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center text-navy hover:bg-cream-deep"
                            >
                              −
                            </button>
                            <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => setQuantity(item.lineId, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center text-navy hover:bg-cream-deep"
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

                <footer className="border-t border-charcoal/10 px-6 py-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-charcoal/70">Subtotal</span>
                    <span className="font-display text-2xl text-navy">{formatNgn(subtotal)}</span>
                  </div>
                  {hasMadeToMeasure && (
                    <p className="text-xs italic text-charcoal/60 leading-relaxed">
                      Made to Measure pieces are priced with Beulah directly and are not in this subtotal.
                    </p>
                  )}
                  <Link href="/cart" onClick={closeCart} className="btn btn-primary w-full">
                    Review and Checkout
                  </Link>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="block w-full text-center text-sm text-navy underline underline-offset-4 hover:text-crimson"
                  >
                    Keep browsing
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
