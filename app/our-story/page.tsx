import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal, RevealStagger, RevealItem } from "@/components/animation/Reveal";
import { getStoryMilestones, getTeam } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Ten years of dressing women for what is next. How a Lagos stylist became the woman who dresses the women you admire.",
};

export default async function OurStoryPage() {
  const [milestones, team] = await Promise.all([getStoryMilestones(), getTeam()]);

  return (
    <>
      <header className="surface-navy grain relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/designs/founder-portrait.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-navy-deep/80 to-navy-deep" />
        </div>
        <div className="relative container-narrow py-20 lg:py-32 text-center">
          <p className="text-xs text-cream-warm/70 mb-6 tracking-cta">
            <Link href="/" className="text-gold hover:underline">Home</Link>
            <span className="mx-2 opacity-50">·</span>
            <span>Our Story</span>
          </p>
          <p className="eyebrow text-gold mb-4">A decade in</p>
          <h1 className="display-1 text-cream mb-6 max-w-3xl mx-auto text-balance">
            Ten years of dressing women for what is next.
          </h1>
          <p className="body-lead text-cream-warm/85 max-w-xl mx-auto">
            How a Lagos stylist became the woman who dresses the women you admire.
          </p>
        </div>
      </header>

      <section className="surface-cream section">
        <div className="container-narrow">
          <Reveal>
            <p className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] leading-snug text-navy max-w-3xl mx-auto text-balance">
              Beulah Oluwafisayomi Mobolaji started Dé-light Fashion House more than a decade ago, before the words
              'personal stylist' meant much in Lagos. She did not have a brand. She had a thread, a sketchpad, and
              <em className="text-crimson"> one client</em> who needed something for an event nobody else could dress
              her for.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-navy grain pt-20 pb-24 lg:pt-32 lg:pb-32">
        <div className="container-narrow">
          <Reveal className="text-center mb-14">
            <p className="eyebrow text-gold mb-3">The decade in milestones</p>
            <h2 className="display-2 text-cream">From one client to six hundred thousand saves.</h2>
          </Reveal>
          <RevealStagger
            className="relative max-w-2xl mx-auto pl-10 sm:pl-14 border-l-2 border-gold/30"
            stagger={0.12}
            amount={0.08}
          >
            {milestones.map((m) => (
              <RevealItem key={m._id} as="li" className="relative pb-12 last:pb-0 list-none block">
                <span
                  className="absolute -left-[2.6rem] sm:-left-[3.6rem] top-1 w-4 h-4 rounded-full bg-gold ring-4 ring-navy"
                  aria-hidden="true"
                />
                <div className="font-display text-2xl sm:text-3xl italic text-gold mb-2">{m.year}</div>
                <h3 className="font-display text-lg sm:text-xl text-cream mb-2">{m.title}</h3>
                <p className="text-sm sm:text-base text-cream-warm/80 leading-relaxed max-w-xl">{m.body}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="surface-cream-warm section">
        <div className="container-site grid lg:grid-cols-2 gap-10 lg:gap-16">
          <Reveal className="bg-cream rounded-md p-8 lg:p-10 border border-charcoal/10">
            <p className="eyebrow mb-4">What we do</p>
            <ul className="space-y-3 text-base sm:text-lg leading-relaxed text-charcoal/85">
              <li className="flex gap-3"><span className="text-crimson font-bold">·</span><span>Architect your image, room by room.</span></li>
              <li className="flex gap-3"><span className="text-crimson font-bold">·</span><span>Build wardrobes around the woman, not the season.</span></li>
              <li className="flex gap-3"><span className="text-crimson font-bold">·</span><span>Style the bride, the executive, the aso ebi family, the soft life.</span></li>
              <li className="flex gap-3"><span className="text-crimson font-bold">·</span><span>Ship within two to seven days for ready pieces.</span></li>
              <li className="flex gap-3"><span className="text-crimson font-bold">·</span><span>Close on WhatsApp because the customer wants the founder, not a chatbot.</span></li>
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="bg-navy rounded-md p-8 lg:p-10 text-cream">
            <p className="eyebrow text-gold mb-4">What we do not</p>
            <ul className="space-y-3 text-base sm:text-lg leading-relaxed text-cream-warm/85">
              <li className="flex gap-3"><span className="text-gold font-bold">×</span><span>Mass produce.</span></li>
              <li className="flex gap-3"><span className="text-gold font-bold">×</span><span>Sell trends.</span></li>
              <li className="flex gap-3"><span className="text-gold font-bold">×</span><span>Use stock photos.</span></li>
              <li className="flex gap-3"><span className="text-gold font-bold">×</span><span>Outsource the fitting.</span></li>
              <li className="flex gap-3"><span className="text-gold font-bold">×</span><span>Ghost a customer.</span></li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="surface-cream section-tight">
        <div className="container-site">
          <Reveal className="text-center mb-12">
            <p className="eyebrow mb-3">The team</p>
            <h2 className="display-2">The hands behind the build.</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto" stagger={0.1}>
            {team.map((member) => (
              <RevealItem key={member._id} className="text-center block">
                <div className="aspect-square rounded-md overflow-hidden bg-cream-deep mx-auto mb-4 max-w-[240px] flex items-center justify-center relative">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-display text-5xl text-crimson italic">
                      {member.name
                        .split(" ")
                        .slice(0, 2)
                        .map((p) => p[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-xl text-navy">{member.name}</h3>
                <p className="text-xs uppercase tracking-eyebrow text-crimson font-bold mt-1 mb-2">{member.role}</p>
                <p className="text-sm text-charcoal/70 leading-relaxed">{member.oneLiner}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="surface-crimson grain section text-center">
        <div className="container-narrow">
          <Reveal>
            <p className="font-display italic text-xl sm:text-2xl lg:text-3xl text-ivory mb-6 leading-snug pretty-text max-w-3xl mx-auto">
              "I am not a designer. I am the woman who knows what you should wear before you do. After ten years of
              doing this, I will tell you what most stylists will not: the dress is never the answer. The woman is."
            </p>
            <p className="font-display text-base text-ivory/80 italic">Beulah, Founder.</p>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
