"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartProvider";
import { useModal } from "./ModalProvider";
import { STANDARD_SIZES, MADE_TO_MEASURE, priceForSize } from "@/lib/sizing";
import type { SizeCode } from "@/lib/sizing";
import { formatNgn } from "@/lib/utils";
import { deliveryEstimate } from "@/lib/delivery";
import { track } from "@/lib/pixel";
import type { ArchetypeSlug } from "@/lib/types";

export function AddToCart({
  slug,
  title,
  image,
  archetype,
  basePrice,
}: {
  slug: string;
  title: string;
  image: string;
  archetype: ArchetypeSlug;
  basePrice: number | null;
}) {
  const { addItem } = useCart();
  const { openCheckout, openSizeGuide } = useModal();
  const [size, setSize] = useState<SizeCode | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    track("ViewContent", { content_name: title, content_category: archetype, content_type: "product" });
  }, [title, archetype]);

  const isMTM = size === "MTM";
  const displayPrice = size ? priceForSize(basePrice, size) : basePrice;

  function pick(code: SizeCode) {
    setSize(code);
    setError(false);
  }

  function handleAdd() {
    if (!size) {
      setError(true);
      return;
    }
    addItem({ slug, title, image, archetype, basePrice, size });
    track("AddToCart", { content_name: title, content_category: archetype, size });
  }

  return (
    <div>
      {/* Price */}
      <div className="font-display text-3xl sm:text-4xl text-crimson mb-1">
        {isMTM ? (
          "Price on consultation"
        ) : displayPrice !== null ? (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={displayPrice}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="inline-block"
            >
              {size ? formatNgn(displayPrice) : `From ${formatNgn(displayPrice)}`}
            </motion.span>
          </AnimatePresence>
        ) : (
          "Price on request"
        )}
      </div>
      <p className="text-sm text-charcoal/55 mb-6 pb-6 border-b border-charcoal/15">
        Cut to your size in Beulah's atelier. Delivery in {deliveryEstimate(basePrice)}.
      </p>

      {/* Size picker */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-cta text-navy">Choose your size</span>
        <button
          type="button"
          onClick={openSizeGuide}
          className="text-xs text-crimson underline underline-offset-2 hover:text-crimson-deep"
        >
          Size guide
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2 mb-3">
        {STANDARD_SIZES.map((s) => (
          <button
            key={s.code}
            type="button"
            onClick={() => pick(s.code)}
            className={`h-12 rounded-sm border-2 font-semibold text-sm transition-all ${
              size === s.code
                ? "border-crimson bg-crimson text-cream"
                : "border-charcoal/15 bg-cream text-navy hover:border-crimson"
            }`}
          >
            {s.shortLabel}
          </button>
        ))}
      </div>

      {/* Made to Measure */}
      <button
        type="button"
        onClick={() => pick("MTM")}
        className={`w-full rounded-sm border-2 px-4 py-3 text-left transition-all mb-3 ${
          isMTM ? "border-crimson bg-crimson/5" : "border-charcoal/15 bg-cream hover:border-crimson"
        }`}
      >
        <span className="block font-semibold text-sm text-navy">{MADE_TO_MEASURE.shortLabel}</span>
        <span className="block text-xs text-charcoal/60 mt-0.5">
          For a fuller bust, a fuller midsection, or any shape the chart does not hold. Built to your exact body.
        </span>
      </button>

      <AnimatePresence>
        {isMTM && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-charcoal/70 italic leading-relaxed mb-3 overflow-hidden"
          >
            Beulah will confirm your measurements and the final price with you on WhatsApp before anything is cut.
          </motion.p>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-xs text-crimson mb-3">Please choose a size first.</p>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <motion.button
          type="button"
          onClick={handleAdd}
          className="btn btn-primary w-full"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Add to Cart
        </motion.button>
        <button
          type="button"
          onClick={() => openCheckout({ pinName: title, pinUrl: `/fashion-inspo/${slug}`, archetype, intent: "consult", source: "pin-consult" })}
          className="btn btn-ghost w-full"
        >
          Book a Style Consult instead
        </button>
      </div>
    </div>
  );
}
