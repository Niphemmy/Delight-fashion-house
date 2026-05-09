"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import type { Pin } from "@/lib/types";

const easing = [0.22, 1, 0.36, 1] as const;

export function PinCard({ pin }: { pin: Pin }) {
  return (
    <Link
      href={`/fashion-inspo/${pin.slug}`}
      className="group block relative aspect-[4/5] overflow-hidden rounded-sm bg-cream-deep shadow-card hover:shadow-cardHover transition-shadow"
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: easing }}
      >
        <Image
          src={pin.image}
          alt={pin.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1080px) 33vw, 25vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-cream z-10">
        <div className="text-[0.6875rem] font-bold uppercase tracking-eyebrow text-gold mb-1">
          {pin.archetype === "boss-ladies"
            ? "Boss Lady"
            : pin.archetype === "aso-ebi"
              ? "Aso Ebi"
              : pin.archetype === "soft-life"
                ? "Soft Life"
                : "Bride"}
        </div>
        <h3 className="font-display text-lg sm:text-xl leading-tight text-cream">{pin.title}</h3>
        <div className="text-xs text-gold mt-1.5 font-medium">{formatPrice(pin.priceFromNgn)}</div>
      </div>
      <span className="absolute top-3 right-3 bg-cream/95 backdrop-blur text-navy text-[0.625rem] uppercase tracking-eyebrow font-bold px-2.5 py-1 rounded-sm opacity-0 translate-y-[-6px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
        Tap to order
      </span>
    </Link>
  );
}
