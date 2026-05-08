"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Pin } from "@/lib/types";

export function PinCard({ pin }: { pin: Pin }) {
  return (
    <Link
      href={`/fashion-inspo/${pin.slug}`}
      className="group block relative aspect-[4/5] overflow-hidden rounded-sm bg-cream-deep shadow-card hover:shadow-cardHover transition-shadow"
    >
      <Image
        src={pin.image}
        alt={pin.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1080px) 33vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-cream">
        <div className="text-[0.6875rem] font-bold uppercase tracking-eyebrow text-gold mb-1">
          {pin.archetype === "boss-ladies" ? "Boss Lady" : pin.archetype === "aso-ebi" ? "Aso Ebi" : pin.archetype === "soft-life" ? "Soft Life" : "Bride"}
        </div>
        <h3 className="font-display text-lg sm:text-xl leading-tight text-cream">{pin.title}</h3>
        <div className="text-xs text-gold mt-1.5 font-medium">{formatPrice(pin.priceFromNgn)}</div>
      </div>
      <div className="absolute top-3 right-3 bg-cream/95 backdrop-blur text-navy text-[0.625rem] uppercase tracking-eyebrow font-bold px-2.5 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
        Tap to order
      </div>
    </Link>
  );
}
