import Link from "next/link";
import { PinCard } from "@/components/PinCard";
import type { Pin } from "@/lib/types";

export function FashionInspoTeaser({ pins }: { pins: Pin[] }) {
  return (
    <section className="surface-cream-warm section">
      <div className="container-site">
        <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          <p className="eyebrow mb-3">Fashion Inspo</p>
          <h2 className="display-2 mb-5 text-balance">Saw it on Pinterest? You can wear it.</h2>
          <p className="body-lead pretty-text">
            Six hundred thousand women save Dé-light looks on Pinterest every month. Most never realise they can
            actually order them. Fashion Inspo is where every saved look becomes a wearable piece, with the story
            behind it and the path to your closet.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-12">
          {pins.slice(0, 6).map((pin) => (
            <PinCard key={pin._id} pin={pin} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/fashion-inspo" className="btn btn-navy">
            Browse all Fashion Inspo
          </Link>
        </div>
      </div>
    </section>
  );
}
