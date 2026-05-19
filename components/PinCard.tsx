import Image from "next/image";
import Link from "next/link";
import { formatPrice, splitDesignTitle, ARCHETYPE_LABEL } from "@/lib/utils";
import type { Pin } from "@/lib/types";

export function PinCard({ pin }: { pin: Pin }) {
  const { name, occasion } = splitDesignTitle(pin.title);

  return (
    <Link
      href={`/fashion-inspo/${pin.slug}`}
      className="group flex flex-col bg-cream rounded-sm overflow-hidden border border-charcoal/10 shadow-card hover:shadow-cardHover hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
        <Image
          src={pin.image}
          alt={pin.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1080px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 bg-cream/95 backdrop-blur text-crimson text-[0.625rem] font-bold uppercase tracking-eyebrow px-2.5 py-1 rounded-sm">
          {ARCHETYPE_LABEL[pin.archetype] ?? "Dé-light"}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-display text-lg sm:text-xl text-navy leading-[1.15]">{name}</h3>
        {occasion && (
          <p className="font-body text-xs text-charcoal/55 italic mt-1 leading-snug">{occasion}</p>
        )}
        <div className="mt-3 pt-3 border-t border-charcoal/10 flex items-center justify-between">
          <span className="text-sm font-semibold text-crimson tracking-cta">
            {formatPrice(pin.priceFromNgn)}
          </span>
          <span className="inline-flex items-center gap-1 text-[0.6875rem] font-bold uppercase tracking-eyebrow text-navy/55 group-hover:text-crimson transition-colors">
            View
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
