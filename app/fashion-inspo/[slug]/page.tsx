import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PinCard } from "@/components/PinCard";
import { PinPageActions } from "@/components/PinPageActions";
import { FinalCta } from "@/components/sections/FinalCta";
import { getPinBySlug, getPins, getArchetypeBySlug } from "@/lib/sanity";
import { formatPrice } from "@/lib/utils";
import * as fallback from "@/lib/data";

interface PinPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return fallback.pins.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PinPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pin = await getPinBySlug(slug);
  if (!pin) return { title: "Look not found" };
  return {
    title: pin.title,
    description: pin.story[0] || `${formatPrice(pin.priceFromNgn)}, made to commission.`,
    openGraph: {
      title: `${pin.title} — Dé-light Fashion House`,
      images: [pin.image],
    },
  };
}

export default async function PinDetailPage({ params }: PinPageProps) {
  const { slug } = await params;
  const pin = await getPinBySlug(slug);
  if (!pin) notFound();

  const [archetype, allPins] = await Promise.all([getArchetypeBySlug(pin.archetype), getPins()]);
  const related = allPins.filter((p) => p.archetype === pin.archetype && p._id !== pin._id).slice(0, 4);

  return (
    <>
      <section className="surface-cream pt-10 sm:pt-14 lg:pt-20">
        <div className="container-site">
          <p className="text-xs text-charcoal/60 mb-6 tracking-cta">
            <Link href="/" className="hover:text-crimson">Home</Link>
            <span className="mx-2 opacity-50">·</span>
            <Link href="/fashion-inspo" className="hover:text-crimson">Fashion Inspo</Link>
            <span className="mx-2 opacity-50">·</span>
            <Link href={`/fashion-inspo?archetype=${pin.archetype}`} className="hover:text-crimson capitalize">
              {archetype?.name || pin.archetype}
            </Link>
            <span className="mx-2 opacity-50">·</span>
            <span>{pin.title}</span>
          </p>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="aspect-[4/5] rounded-md overflow-hidden bg-cream-deep shadow-modal relative">
                <Image
                  src={pin.image}
                  alt={pin.title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 600px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:pt-2">
              <p className="eyebrow mb-4">{archetype?.name || pin.archetype}</p>
              <h1 className="display-1 text-navy mb-5">{pin.title}</h1>
              <div className="font-display text-2xl sm:text-3xl text-crimson mb-6 pb-6 border-b border-charcoal/15">
                {formatPrice(pin.priceFromNgn)}
                <span className="block text-sm sm:text-base font-body text-charcoal/60 mt-1">
                  {pin.priceFromNgn ? "tailored to your measurements" : "Beulah will send a quote on WhatsApp before any deposit"}
                </span>
              </div>

              <div className="space-y-4 text-charcoal/85 mb-8 max-w-xl">
                {pin.story.map((para, i) => (
                  <p key={i} className="text-base sm:text-lg leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              <PinPageActions pinName={pin.title} pinUrl={`/fashion-inspo/${pin.slug}`} />

              <div className="bg-cream-warm border-l-4 border-gold p-5 rounded-sm">
                <p className="eyebrow mb-3">What is included</p>
                <ul className="space-y-2 text-sm text-navy">
                  {[
                    "Hand cut, hand sewn, lined throughout",
                    "Two fittings at the atelier or by video",
                    "Delivery within Lagos in 14 to 21 days",
                    "International shipping by quote",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-crimson font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="surface-cream-warm section-tight mt-16 lg:mt-24">
          <div className="container-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="eyebrow mb-2">More from this archetype</p>
                <h2 className="display-3">More {archetype?.name || "looks"}</h2>
              </div>
              <Link href={`/fashion-inspo?archetype=${pin.archetype}`} className="btn-link hidden sm:inline-flex">
                See all
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {related.map((p) => (
                <PinCard key={p._id} pin={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
