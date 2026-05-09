import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PinCard } from "@/components/PinCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal, RevealStagger, RevealItem } from "@/components/animation/Reveal";
import {
  getArchetypeBySlug,
  getArchetypes,
  getPinsByArchetype,
  getTestimonials,
} from "@/lib/sanity";

interface ArchetypePageProps {
  params: Promise<{ archetype: string }>;
}

const VALID = ["brides", "aso-ebi", "boss-ladies", "soft-life"];

export async function generateStaticParams() {
  return VALID.map((archetype) => ({ archetype }));
}

export async function generateMetadata({ params }: ArchetypePageProps): Promise<Metadata> {
  const { archetype } = await params;
  const a = await getArchetypeBySlug(archetype);
  if (!a) return { title: "Gallery not found" };
  return {
    title: a.name,
    description: a.heroSubhead,
  };
}

export default async function ArchetypePage({ params }: ArchetypePageProps) {
  const { archetype } = await params;
  if (!VALID.includes(archetype)) notFound();

  const [arch, pins, allArchs, allTestimonials] = await Promise.all([
    getArchetypeBySlug(archetype),
    getPinsByArchetype(archetype),
    getArchetypes(),
    getTestimonials(),
  ]);

  if (!arch) notFound();

  const sisters = allArchs.filter((a) => a.slug !== archetype);
  const archetypeTestimonials = allTestimonials.filter((t) => t.archetype === arch.slug);
  const testimonialsForPage = (archetypeTestimonials.length ? archetypeTestimonials : allTestimonials).slice(0, 3);

  return (
    <>
      <header className="surface-navy grain relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src={arch.heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy-deep/80 to-navy-deep" />
        </div>
        <div className="relative container-site py-20 lg:py-32 text-center">
          <p className="text-xs text-cream-warm/70 mb-6 tracking-cta">
            <Link href="/" className="text-gold hover:underline">Home</Link>
            <span className="mx-2 opacity-50">·</span>
            <span>{arch.name}</span>
          </p>
          <p className="eyebrow text-gold mb-4">{arch.heroSubhead}</p>
          <h1 className="display-1 text-cream max-w-4xl mx-auto text-balance mb-8">{arch.heroH1}</h1>
        </div>
      </header>

      <section className="surface-cream-warm section-tight">
        <div className="container-narrow">
          <Reveal>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-charcoal/85 max-w-2xl mx-auto text-center pretty-text">
              {arch.promise}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-cream section-tight">
        <div className="container-site">
          {pins.length === 0 ? (
            <p className="text-center text-charcoal/60 py-12">More looks coming soon. Beulah is photographing the next batch.</p>
          ) : (
            <RevealStagger
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
              stagger={0.06}
              amount={0.05}
            >
              {pins.map((pin) => (
                <RevealItem key={pin._id}>
                  <PinCard pin={pin} />
                </RevealItem>
              ))}
            </RevealStagger>
          )}
        </div>
      </section>

      <Testimonials testimonials={testimonialsForPage} />

      <section className="surface-cream-warm section-tight">
        <div className="container-site">
          <Reveal className="text-center mb-10 lg:mb-14">
            <p className="eyebrow mb-3">Sister archetypes</p>
            <h2 className="display-3">There is more than one Dé-light woman.</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5" stagger={0.1}>
            {sisters.map((s) => (
              <RevealItem key={s._id} as="div" className="block">
                <Link
                  href={`/gallery/${s.slug}`}
                  className="group relative aspect-[4/5] rounded-sm overflow-hidden bg-cream-deep shadow-card hover:shadow-cardHover transition-shadow block"
                >
                <Image
                  src={s.heroImage}
                  alt={s.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <h3 className="font-display text-xl mb-1">{s.name}</h3>
                  <p className="text-xs text-cream-warm/85 line-clamp-2 mb-2">{s.oneLiner}</p>
                  <span className="text-xs font-bold uppercase tracking-eyebrow text-gold">
                    {s.cardLabel} →
                  </span>
                </div>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="surface-crimson grain section text-center">
        <div className="container-narrow">
          <Reveal>
            <h2 className="display-2 text-ivory mb-6 max-w-3xl mx-auto text-balance">{arch.finalH2}</h2>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
