import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { StarRating } from "@/components/StarRating";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal, RevealStagger, RevealItem } from "@/components/animation/Reveal";
import { getTestimonials } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Real women in real Dé-light pieces, and what they say about the build. Reviews and feedback from the Dé-light wardrobe.",
};

// Curated wall of Dé-light pieces on real women (the Pinterest catalogue).
const PHOTO_WALL = [
  "/pins/pin-05.jpg",
  "/pins/pin-01.jpg",
  "/pins/pin-07.jpg",
  "/pins/pin-10.jpg",
  "/pins/pin-02.jpg",
  "/pins/pin-14.jpg",
  "/pins/pin-04.jpg",
  "/pins/pin-16.jpg",
  "/pins/pin-17.jpg",
  "/pins/pin-12.jpg",
  "/pins/pin-08.jpg",
  "/pins/pin-15.jpg",
];

export default async function GalleryPage() {
  const reviews = await getTestimonials();
  const count = reviews.length;
  const average =
    count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  return (
    <>
      <PageHeader
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Gallery" }]}
        eyebrow="The Gallery"
        title="Real women. Real Dé-light. Real results."
        body="The pieces, the brides, the boardrooms, and what the women say after Beulah builds for them."
      />

      {/* Rating summary */}
      <section className="surface-cream-warm section-tight border-b border-charcoal/10">
        <div className="container-narrow">
          <Reveal className="text-center">
            <div className="font-display text-6xl sm:text-7xl text-crimson leading-none mb-3">
              {average.toFixed(1)}
            </div>
            <StarRating rating={average} size={24} className="text-gold mb-3" />
            <p className="text-charcoal/70 text-sm sm:text-base">
              From {count} verified Dé-light clients across Lagos, Abuja, Port Harcourt, and the diaspora.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Photo wall */}
      <section className="surface-cream section">
        <div className="container-site">
          <Reveal className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
            <p className="eyebrow mb-3">The work</p>
            <h2 className="display-2 mb-4 text-balance">Dé-light, on real women.</h2>
            <p className="body-lead">
              Every piece below was built for a woman, not a season. Tap through to Fashion Inspo to wear any of them.
            </p>
          </Reveal>
          <RevealStagger
            className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [column-fill:balance]"
            stagger={0.05}
            amount={0.03}
          >
            {PHOTO_WALL.map((src, i) => (
              <RevealItem key={src} className="mb-3 sm:mb-4 break-inside-avoid block">
                <div className="relative overflow-hidden rounded-sm bg-cream-deep shadow-card group">
                  <Image
                    src={src}
                    alt={`Dé-light piece ${i + 1}`}
                    width={600}
                    height={800}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-navy-deep/0 group-hover:bg-navy-deep/10 transition-colors" />
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Reviews */}
      <section className="surface-navy grain section">
        <div className="container-site">
          <Reveal className="text-center mb-12 lg:mb-16">
            <p className="eyebrow text-gold mb-3">Reviews and feedback</p>
            <h2 className="display-2 text-cream mb-4 text-balance">What the women say.</h2>
            <p className="body-lead text-cream-warm/80 max-w-xl mx-auto">
              Unedited words from brides, executives, aso ebi families, and the women living the soft life.
            </p>
          </Reveal>

          <RevealStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" stagger={0.08}>
            {reviews.map((r) => (
              <RevealItem key={r._id} as="article">
                <article className="bg-navy-soft/40 border border-gold/20 rounded-md p-7 flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <Avatar name={r.name} />
                    <StarRating rating={r.rating} size={15} className="text-gold" />
                  </div>
                  <blockquote className="font-display text-lg italic text-cream leading-snug">
                    <span className="text-gold text-xl mr-1" aria-hidden="true">&ldquo;</span>
                    {r.quote}
                    <span className="text-gold text-xl ml-1" aria-hidden="true">&rdquo;</span>
                  </blockquote>
                  <div className="border-t border-gold/20 pt-4 mt-auto">
                    <div className="text-gold font-semibold text-sm mb-0.5">{r.name}</div>
                    <div className="text-xs text-cream-warm/75 leading-relaxed">{r.titleAndOccasion}</div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <FinalCta />
    </>
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
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark text-navy font-display text-lg font-semibold flex items-center justify-center flex-shrink-0">
      {initials}
    </div>
  );
}
