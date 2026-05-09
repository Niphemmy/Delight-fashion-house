"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animation/Reveal";
import { useModal } from "@/components/ModalProvider";

const easing = [0.22, 1, 0.36, 1] as const;

export function FinalCta() {
  const { openCheckout } = useModal();
  return (
    <section className="surface-crimson grain section text-center relative overflow-hidden">
      <motion.div
        className="absolute -top-24 -left-24 w-72 h-72 bg-crimson-deep/40 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 w-72 h-72 bg-gold/30 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div className="container-narrow relative">
        <Reveal>
          <h2 className="display-2 text-ivory mb-5 max-w-3xl mx-auto text-balance">Stop saving. Start wearing.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-ivory/85 max-w-xl mx-auto mb-9 leading-relaxed pretty-text">
            The look you have been pinning is two steps away. Save it to your email, then send the message that
            starts your wardrobe.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            type="button"
            onClick={() => openCheckout({ source: "final-cta", intent: "general" })}
            className="btn bg-navy text-cream hover:bg-navy-deep w-full sm:w-auto"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Save Your Look + Continue to WhatsApp
          </motion.button>
          <motion.button
            type="button"
            onClick={() => openCheckout({ source: "final-cta-consult", intent: "consult" })}
            className="text-ivory underline underline-offset-4 hover:text-cream font-semibold tracking-cta text-sm"
            whileHover={{ y: -1 }}
          >
            Or book a Style Consult instead
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}
