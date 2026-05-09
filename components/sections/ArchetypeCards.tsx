"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { track } from "@/lib/pixel";
import { Reveal, RevealStagger, RevealItem } from "@/components/animation/Reveal";
import type { Archetype } from "@/lib/types";

export function ArchetypeCards({ archetypes }: { archetypes: Archetype[] }) {
  return (
    <section className="surface-navy grain section">
      <div className="container-site">
        <Reveal className="text-center mb-12 lg:mb-16">
          <p className="eyebrow text-gold mb-3">Choose your gallery</p>
          <h2 className="display-2 text-cream mb-4 max-w-3xl mx-auto text-balance">
            Four women. Four wardrobes. One Dé-light.
          </h2>
          <p className="body-lead text-cream-warm/80 max-w-xl mx-auto">
            Pick the moment you are dressing for. Each gallery is built around how that woman walks into the room.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6" stagger={0.1}>
          {archetypes.map((a) => (
            <RevealItem key={a._id} as="div">
              <Link
                href={`/gallery/${a.slug}`}
                onClick={() => track("ArchetypeSelect", { archetype: a.slug, source: "home-cards" })}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-navy-deep shadow-card hover:shadow-cardHover transition-shadow block"
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={a.heroImage}
                    alt={a.name}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 22vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-transparent transition-opacity duration-500 group-hover:from-navy-deep/95" />
                <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                  <h3 className="font-display text-2xl lg:text-[1.75rem] text-cream leading-tight mb-2">{a.name}</h3>
                  <p className="text-sm text-cream-warm/85 leading-snug mb-4 line-clamp-2">{a.oneLiner}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-eyebrow text-gold relative">
                    {a.cardLabel}
                    <motion.span
                      aria-hidden="true"
                      className="inline-block"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                    <span className="absolute -bottom-1 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-300" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
