"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animation/Reveal";

const easing = [0.22, 1, 0.36, 1] as const;

export function MeetBeulah() {
  return (
    <section className="surface-cream section">
      <div className="container-site grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: easing }}
        >
          <div className="aspect-[4/5] rounded-md overflow-hidden shadow-modal relative bg-cream-deep">
            <Image
              src="/designs/founder-portrait.jpg"
              alt="Beulah Oluwafisayomi Mobolaji, Founder, Dé-light Fashion House"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
          </div>
          <motion.div
            className="hidden lg:block absolute -top-4 -left-4 w-24 h-24 border border-crimson/30 rounded-md -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easing, delay: 0.4 }}
          />
          <motion.div
            className="hidden lg:block absolute -bottom-4 -right-4 w-32 h-32 bg-gold/15 rounded-md -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easing, delay: 0.5 }}
          />
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          }}
        >
          <Item><p className="eyebrow mb-4">Meet Beulah</p></Item>
          <Item>
            <h2 className="display-2 mb-7 max-w-xl text-balance">
              She has been quietly dressing the women you admire for ten years.
            </h2>
          </Item>
          <div className="space-y-5 text-charcoal/80 max-w-xl text-base sm:text-lg leading-relaxed mb-8">
            <Item>
              <p>
                <strong className="text-navy font-semibold">Beulah Oluwafisayomi Mobolaji</strong> started Dé-light
                Fashion House more than a decade ago, before the words 'personal stylist' meant much in Lagos.
              </p>
            </Item>
            <Item>
              <p>
                She did not call herself a designer. She called herself something more useful: the woman who knows
                what you should wear before you do.
              </p>
            </Item>
            <Item>
              <p>
                In ten years, she has built wardrobes for executives, brides, mothers of the bride, women returning
                to work after time away, women starting over, and women who finally have the income to dress the way
                they have always seen themselves.
              </p>
            </Item>
            <Item>
              <p className="text-crimson font-medium">
                If you have been saving her looks on Pinterest and never reached out, this is your sign.
              </p>
            </Item>
          </div>
          <Item>
            <Link href="/our-story" className="btn-link group">
              Read the full story
              <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Item>
        </motion.div>
      </div>
    </section>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
      }}
    >
      {children}
    </motion.div>
  );
}
