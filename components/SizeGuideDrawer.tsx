"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "./ModalProvider";
import { STANDARD_SIZES } from "@/lib/sizing";

const easing = [0.22, 1, 0.36, 1] as const;

const MEASURE = [
  { part: "Bust", how: "Around the fullest part, tape level and soft." },
  { part: "Waist", how: "Around the narrowest part, just above the belly button." },
  { part: "Hip", how: "Feet together, around the fullest part of hips and seat." },
];

export function SizeGuideDrawer() {
  const { sizeGuideOpen, closeSizeGuide } = useModal();

  return (
    <AnimatePresence>
      {sizeGuideOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-navy-deep/75 backdrop-blur-sm"
            onClick={closeSizeGuide}
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
            aria-label="Size guide"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-charcoal/10 flex-shrink-0">
              <div>
                <p className="eyebrow mb-0.5">Find your size</p>
                <h2 className="font-display text-2xl text-navy">UK Size Guide</h2>
              </div>
              <button
                type="button"
                onClick={closeSizeGuide}
                aria-label="Close size guide"
                className="w-9 h-9 rounded-full bg-cream-deep text-navy hover:bg-gold flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="text-sm text-charcoal/70 leading-relaxed mb-5">
                Find your UK size from your measurements. Between two sizes, choose the larger; the atelier can
                always take a piece in.
              </p>

              {/* UK size chart */}
              <div className="mb-3 overflow-hidden rounded-md border border-charcoal/12">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-cream">
                      <th className="py-2.5 px-3 text-left text-[0.62rem] uppercase tracking-eyebrow font-bold">UK</th>
                      <th className="py-2.5 px-2 text-right text-[0.62rem] uppercase tracking-eyebrow font-bold">Bust</th>
                      <th className="py-2.5 px-2 text-right text-[0.62rem] uppercase tracking-eyebrow font-bold">Waist</th>
                      <th className="py-2.5 px-3 text-right text-[0.62rem] uppercase tracking-eyebrow font-bold">Hip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STANDARD_SIZES.map((s, i) => (
                      <tr key={s.code} className={i % 2 ? "bg-cream-warm" : "bg-cream"}>
                        <td className="py-2.5 px-3 font-display text-base text-crimson">UK {s.uk}</td>
                        <td className="py-2.5 px-2 text-right text-charcoal/80">{s.bustIn}&quot; / {s.bustCm}cm</td>
                        <td className="py-2.5 px-2 text-right text-charcoal/80">{s.waistIn}&quot; / {s.waistCm}cm</td>
                        <td className="py-2.5 px-3 text-right text-charcoal/80">{s.hipIn}&quot; / {s.hipCm}cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-charcoal/55 mb-7">Measurements shown in inches and centimetres.</p>

              {/* How to measure */}
              <h3 className="font-display text-lg text-navy mb-3">How to measure</h3>
              <ul className="space-y-2.5 mb-7">
                {MEASURE.map((m, i) => (
                  <li key={m.part} className="flex gap-3">
                    <span className="font-display text-lg text-gold leading-none flex-shrink-0">{i + 1}</span>
                    <span className="text-sm text-charcoal/75 leading-relaxed">
                      <strong className="text-navy font-semibold">{m.part}.</strong> {m.how}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Made to Measure */}
              <div className="bg-navy text-cream rounded-md p-5">
                <p className="eyebrow text-gold mb-2">Made to Measure</p>
                <p className="text-sm text-cream-warm/85 leading-relaxed">
                  If your shape sits outside the chart, a fuller bust or midsection or simply between two sizes,
                  choose Made to Measure on any design. Beulah builds to your exact body and confirms the final
                  price with you on WhatsApp.
                </p>
              </div>
            </div>

            <footer className="flex-shrink-0 border-t border-charcoal/10 px-6 py-4">
              <Link
                href="/size-guide"
                onClick={closeSizeGuide}
                className="block text-center text-sm text-navy underline underline-offset-4 hover:text-crimson"
              >
                Read the full style and size guide
              </Link>
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
