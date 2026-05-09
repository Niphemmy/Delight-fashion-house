"use client";

import { Reveal } from "@/components/animation/Reveal";
import { CountUp } from "@/components/animation/CountUp";
import { motion } from "framer-motion";

export function DifferenceBand() {
  return (
    <section className="surface-cream section">
      <div className="container-site grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-4">The Dé-light Difference</p>
            <h2 className="display-2 mb-7 max-w-2xl text-balance">
              We do not sell dresses. We architect the woman.
            </h2>
          </Reveal>
          <div className="space-y-5 text-charcoal/80 max-w-xl text-base sm:text-lg leading-relaxed">
            <Reveal delay={0.1}>
              <p>Most fashion houses sell you a piece. Beulah builds your image. The piece is the byproduct.</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                Every Dé-light look starts with a question that has nothing to do with fabric: who are you in the room
                you are walking into? What does your presence need to say before you speak? What does the woman you are
                becoming wear?
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p>
                Once we know that, the dress designs itself. So does the next one, and the one after that. Ten years
                in, that is what our clients keep coming back for.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <motion.div
            className="bg-navy text-cream rounded-md p-8 sm:p-10 grain shadow-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow text-gold mb-6">Ten years on record</p>
            <div className="space-y-7">
              <Stat
                num={
                  <CountUp
                    to={10}
                    duration={1.5}
                    className="font-display text-5xl sm:text-6xl text-gold leading-none font-medium"
                  />
                }
                label="Years in business"
              />
              <div className="h-px bg-cream/15" />
              <Stat
                num={
                  <CountUp
                    to={600000}
                    duration={2.4}
                    className="font-display text-5xl sm:text-6xl text-gold leading-none font-medium"
                  />
                }
                label="Monthly Pinterest saves"
              />
              <div className="h-px bg-cream/15" />
              <Stat
                num={
                  <span className="font-display text-5xl sm:text-6xl text-gold leading-none font-medium">
                    &lt;&nbsp;1<span className="text-2xl">hr</span>
                  </span>
                }
                label="From first message to confirmed order"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ num, label }: { num: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="mb-2">{num}</div>
      <div className="text-xs uppercase tracking-eyebrow text-cream-warm/85 font-bold">{label}</div>
    </div>
  );
}
