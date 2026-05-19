import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, RevealStagger, RevealItem } from "@/components/animation/Reveal";
import { STANDARD_SIZES } from "@/lib/sizing";

export const metadata: Metadata = {
  title: "Size Guide",
  description:
    "Find your Dé-light size. UK dress sizes mapped to bust, waist, and hip, plus how to measure and when to choose Made to Measure.",
};

const MEASURE_STEPS = [
  {
    part: "Bust",
    how: "Measure around the fullest part of your bust, keeping the tape level and soft, not tight.",
  },
  {
    part: "Waist",
    how: "Measure around the narrowest part of your waist, usually just above the belly button.",
  },
  {
    part: "Hip",
    how: "Stand with your feet together and measure around the fullest part of your hips and seat.",
  },
];

export default function SizeGuidePage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Size Guide" }]}
        eyebrow="Size Guide"
        title="Find your Dé-light size."
        body="Every piece is cut to order. Pick the size that matches your measurements, and Beulah's atelier builds to it. If your shape sits outside the chart, that is what Made to Measure is for."
      />

      {/* Size chart */}
      <section className="surface-cream section">
        <div className="container-site">
          <Reveal className="text-center mb-10 lg:mb-14">
            <p className="eyebrow mb-3">The chart</p>
            <h2 className="display-3">UK sizes, in bust, waist, and hip.</h2>
          </Reveal>

          {/* Desktop table */}
          <Reveal className="hidden md:block overflow-hidden rounded-md border border-charcoal/12 shadow-card">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy text-cream">
                  <th className="p-4 font-body text-xs uppercase tracking-eyebrow font-bold">Size</th>
                  <th className="p-4 font-body text-xs uppercase tracking-eyebrow font-bold">UK</th>
                  <th className="p-4 font-body text-xs uppercase tracking-eyebrow font-bold">Bust (in)</th>
                  <th className="p-4 font-body text-xs uppercase tracking-eyebrow font-bold">Waist (in)</th>
                  <th className="p-4 font-body text-xs uppercase tracking-eyebrow font-bold">Hip (in)</th>
                  <th className="p-4 font-body text-xs uppercase tracking-eyebrow font-bold">Bust (cm)</th>
                  <th className="p-4 font-body text-xs uppercase tracking-eyebrow font-bold">Waist (cm)</th>
                  <th className="p-4 font-body text-xs uppercase tracking-eyebrow font-bold">Hip (cm)</th>
                </tr>
              </thead>
              <tbody>
                {STANDARD_SIZES.map((s, i) => (
                  <tr key={s.code} className={i % 2 === 0 ? "bg-cream" : "bg-cream-warm"}>
                    <td className="p-4 font-display text-xl text-crimson">
                      {s.shortLabel}
                      <span className="block font-body text-xs text-charcoal/55 mt-0.5">{s.label}</span>
                    </td>
                    <td className="p-4 font-medium text-navy">{s.ukRange}</td>
                    <td className="p-4 text-charcoal/80">{s.bustIn}</td>
                    <td className="p-4 text-charcoal/80">{s.waistIn}</td>
                    <td className="p-4 text-charcoal/80">{s.hipIn}</td>
                    <td className="p-4 text-charcoal/80">{s.bustCm}</td>
                    <td className="p-4 text-charcoal/80">{s.waistCm}</td>
                    <td className="p-4 text-charcoal/80">{s.hipCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/* Mobile cards */}
          <RevealStagger className="md:hidden grid grid-cols-1 gap-4" stagger={0.07}>
            {STANDARD_SIZES.map((s) => (
              <RevealItem
                key={s.code}
                className="bg-cream-warm rounded-md border border-charcoal/12 p-5 block"
              >
                <div className="flex items-baseline gap-3 mb-3 pb-3 border-b border-charcoal/10">
                  <span className="font-display text-2xl text-crimson">{s.shortLabel}</span>
                  <span className="text-sm text-charcoal/60">{s.label}</span>
                  <span className="ml-auto font-medium text-navy text-sm">{s.ukRange}</span>
                </div>
                <dl className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { k: "Bust", v: s.bustIn },
                    { k: "Waist", v: s.waistIn },
                    { k: "Hip", v: s.hipIn },
                  ].map((m) => (
                    <div key={m.k}>
                      <dt className="text-[0.65rem] uppercase tracking-eyebrow text-charcoal/55 font-bold mb-1">
                        {m.k}
                      </dt>
                      <dd className="text-navy font-medium">{m.v} in</dd>
                    </div>
                  ))}
                </dl>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* How to measure */}
      <section className="surface-cream-warm section">
        <div className="container-site">
          <Reveal className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
            <p className="eyebrow mb-3">How to measure</p>
            <h2 className="display-3 mb-4">Three measurements. A soft tape. Two minutes.</h2>
            <p className="body-lead">
              Measure over light clothing, keep the tape level, and do not pull it tight. If you are between two
              sizes, choose the larger; Beulah's atelier can always take a piece in.
            </p>
          </Reveal>
          <RevealStagger className="grid sm:grid-cols-3 gap-5 lg:gap-6" stagger={0.1}>
            {MEASURE_STEPS.map((m, i) => (
              <RevealItem
                key={m.part}
                className="bg-cream rounded-md border border-charcoal/12 p-7 block"
              >
                <div className="font-display text-5xl text-gold mb-3">{i + 1}</div>
                <h3 className="font-display text-xl text-navy mb-2">{m.part}</h3>
                <p className="text-sm text-charcoal/75 leading-relaxed">{m.how}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Made to Measure */}
      <section className="surface-navy grain section">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="eyebrow text-gold mb-3">Made to Measure</p>
            <h2 className="display-2 text-cream mb-6 text-balance">
              Built for the shape that is yours.
            </h2>
            <p className="body-lead text-cream-warm/85 max-w-xl mx-auto mb-4">
              Bodies are not a chart. If you carry more at the bust, more through the middle, or simply sit between
              the standard sizes, choose Made to Measure on any design.
            </p>
            <p className="body-lead text-cream-warm/85 max-w-xl mx-auto mb-8">
              You send your measurements, Beulah builds the piece to your exact body, and the fit is confirmed before
              a single thread is cut. The final price is agreed with her directly on WhatsApp.
            </p>
            <Link href="/fashion-inspo" className="btn btn-gold">
              Browse the catalogue
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
