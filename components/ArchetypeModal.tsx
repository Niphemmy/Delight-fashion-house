"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "./ModalProvider";
import { track } from "@/lib/pixel";

const easing = [0.22, 1, 0.36, 1] as const;

const OPTIONS: Array<{
  archetype: string;
  href: string;
  name: string;
  desc: string;
}> = [
  { archetype: "boss-lady", href: "/gallery/boss-ladies", name: "Boss Lady", desc: "Executive · second CV" },
  { archetype: "bride", href: "/gallery/brides", name: "Bride", desc: "The day they will photograph" },
  { archetype: "aso-ebi", href: "/gallery/aso-ebi", name: "Aso Ebi", desc: "When the family arrives" },
  { archetype: "soft-life", href: "/gallery/soft-life", name: "Soft Life", desc: "Quiet arrival" },
];

export function ArchetypeModal() {
  const { archetypeOpen, closeArchetype } = useModal();
  return (
    <AnimatePresence>
      {archetypeOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="archetype-title"
          className="fixed inset-0 z-[100] bg-navy-deep/80 backdrop-blur-md flex items-end sm:items-center justify-center px-0 sm:px-4 sm:py-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeArchetype();
          }}
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
              onClick={closeArchetype}
              aria-label="Close"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-cream-deep text-navy hover:bg-gold flex items-center justify-center transition-colors z-10"
            >
              <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className="p-7 sm:p-9">
              <p className="eyebrow mb-3">Tell us</p>
              <h3 id="archetype-title" className="font-display text-2xl sm:text-3xl text-navy leading-tight mb-2">
                Who are you dressing for?
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-6">
                Pick one. We will take you to the gallery built around how that woman walks into the room.
              </p>
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
                }}
              >
                {OPTIONS.map((o) => (
                  <motion.div
                    key={o.archetype}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easing } },
                    }}
                  >
                    <Link
                      href={o.href}
                      onClick={() => {
                        track("ArchetypeSelect", { archetype: o.archetype });
                        closeArchetype();
                      }}
                      className="block p-5 bg-cream-deep border-2 border-transparent rounded-sm hover:border-crimson hover:bg-cream transition-all duration-200 text-center hover:-translate-y-0.5"
                    >
                      <div className="font-display text-lg italic text-navy mb-1">{o.name}</div>
                      <div className="text-xs text-charcoal/60">{o.desc}</div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
