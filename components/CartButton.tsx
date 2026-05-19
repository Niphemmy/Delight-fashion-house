"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartProvider";

export function CartButton({ tone = "navy" }: { tone?: "navy" | "cream" }) {
  const { itemCount, openCart, hydrated } = useCart();
  const color = tone === "cream" ? "text-cream" : "text-navy";

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
      className={`relative inline-flex items-center justify-center w-11 h-11 ${color} hover:text-crimson transition-colors`}
    >
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M3 5h2.2l2.1 11.2a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.2L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9.5" cy="20.5" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="20.5" r="1.4" fill="currentColor" stroke="none" />
      </svg>
      <AnimatePresence>
        {hydrated && itemCount > 0 && (
          <motion.span
            key={itemCount}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-crimson text-cream text-[0.625rem] font-bold flex items-center justify-center"
          >
            {itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
