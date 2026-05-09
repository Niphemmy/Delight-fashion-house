"use client";

import { motion } from "framer-motion";
import { Reveal, RevealStagger, RevealItem } from "@/components/animation/Reveal";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="surface-navy grain section">
      <div className="container-site">
        <Reveal className="text-center mb-12 lg:mb-16">
          <p className="eyebrow text-gold mb-3">Real women, real results</p>
          <h2 className="display-2 text-cream mb-4 text-balance">What the women say.</h2>
          <p className="body-lead text-cream-warm/80 max-w-xl mx-auto">
            Three from the wardrobe build, the bridal close, and the boardroom relaunch.
          </p>
        </Reveal>

        <RevealStagger className="grid md:grid-cols-3 gap-5 lg:gap-6" stagger={0.12}>
          {testimonials.map((t) => (
            <RevealItem key={t._id} as="article">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="bg-navy-soft/40 border border-gold/20 rounded-md p-7 lg:p-8 flex flex-col gap-5 h-full hover:border-gold/40 transition-colors"
              >
                <Avatar name={t.name} />
                <blockquote className="font-display text-lg lg:text-xl italic text-cream leading-snug">
                  <span className="text-gold text-2xl font-display leading-none mr-1" aria-hidden="true">"</span>
                  {t.quote}
                  <span className="text-gold text-2xl font-display leading-none ml-1" aria-hidden="true">"</span>
                </blockquote>
                <div className="border-t border-gold/20 pt-4 mt-auto">
                  <div className="text-gold font-semibold text-sm mb-0.5">{t.name}</div>
                  <div className="text-xs text-cream-warm/75 leading-relaxed">{t.titleAndOccasion}</div>
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <motion.div
      className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark text-navy font-display text-xl font-semibold flex items-center justify-center flex-shrink-0"
      whileHover={{ scale: 1.08, rotate: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {initials}
    </motion.div>
  );
}
