"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animation/Reveal";
import { useModal } from "@/components/ModalProvider";

export function FinalCta() {
  const { openCheckout } = useModal();
  return (
    <section className="surface-crimson grain section text-center relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-72 h-72 bg-crimson-deep/40 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-72 h-72 bg-gold/30 rounded-full blur-3xl pointer-events-none"
      />
      <div className="container-narrow relative">
        <Reveal>
          <h2 className="display-2 text-ivory mb-5 max-w-3xl mx-auto text-balance">Stop saving. Start wearing.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-ivory/85 max-w-xl mx-auto mb-9 leading-relaxed pretty-text">
            The look you have been pinning is waiting in Fashion Inspo. Choose your design, choose your size, and
            Beulah builds it to you.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/fashion-inspo"
            className="btn btn-shine bg-navy text-cream hover:bg-navy-deep w-full sm:w-auto group"
          >
            Browse Fashion Inspo
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
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
