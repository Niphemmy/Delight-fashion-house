"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PinCard } from "@/components/PinCard";
import { Reveal, RevealStagger, RevealItem } from "@/components/animation/Reveal";
import type { Pin } from "@/lib/types";

export function FashionInspoTeaser({ pins }: { pins: Pin[] }) {
  return (
    <section className="surface-cream-warm section">
      <div className="container-site">
        <Reveal className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          <p className="eyebrow mb-3">Fashion Inspo</p>
          <h2 className="display-2 mb-5 text-balance">Saw it on Pinterest? You can wear it.</h2>
          <p className="body-lead pretty-text">
            Six hundred thousand women save Dé-light looks on Pinterest every month. Most never realise they can
            actually order them. Fashion Inspo is where every saved look becomes a wearable piece, with the story
            behind it and the path to your closet.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-12" stagger={0.06}>
          {pins.slice(0, 6).map((pin) => (
            <RevealItem key={pin._id}>
              <PinCard pin={pin} />
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="text-center" delay={0.1}>
          <Link href="/fashion-inspo" className="inline-block">
            <motion.span
              className="btn btn-navy"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Browse all Fashion Inspo
            </motion.span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
