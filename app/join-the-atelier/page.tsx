import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/animation/Reveal";
import { getSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Join the Atelier",
  description:
    "Dé-light Fashion House is hiring an Atelier Assistant in Eleyele, Ibadan. Two to three days a week, ₦40,000 per month, on the production floor with Beulah.",
};

const WHATSAPP_APPLY_URL =
  "https://wa.me/2347069542891?text=" +
  encodeURIComponent(
    "Hi Beulah, I would like to apply for the Atelier Assistant role. My name is "
  );

const EMAIL_APPLY_URL =
  "mailto:delightfashionhouseth@gmail.com?subject=" +
  encodeURIComponent("Atelier Assistant Application") +
  "&body=" +
  encodeURIComponent(
    "Good day,\n\nI would like to apply for the Atelier Assistant role.\n\nName:\nPhone:\nArea in Ibadan:\nSewing experience:\n\nThank you."
  );

const SNAPSHOT = [
  { k: "Role", v: "Atelier Assistant" },
  { k: "Atelier", v: "Eleyele, Ibadan" },
  { k: "Schedule", v: "2 to 3 days a week, longer in peak weeks" },
  { k: "Pay", v: "₦40,000 per month, flat" },
  { k: "Preferred residence", v: "Eleyele, Jericho, Ologuneru, Iddo, or nearby" },
];

const REQUIREMENTS = [
  "Industrial sewing machine experience.",
  "Prior atelier or tailoring experience.",
  "Hand finishing experience: hand sewn hems, bound buttonholes, eye hooks.",
];

export default async function JoinTheAtelierPage() {
  const settings = await getSiteSettings();
  const formUrl = settings.atelierApplicationFormUrl?.trim() || "";
  const hasForm = Boolean(formUrl);

  return (
    <>
      <PageHeader
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Join the Atelier" }]}
        eyebrow="We are hiring"
        title="Join the Atelier."
        body="Beulah is looking for an Atelier Assistant to join the production floor in Eleyele, Ibadan. A steady pair of hands who joins cut pieces well."
      />

      {/* Snapshot */}
      <section className="surface-cream section-tight">
        <div className="container-narrow">
          <Reveal>
            <div className="bg-cream-warm border border-charcoal/10 rounded-md p-6 sm:p-8 shadow-card">
              <p className="eyebrow mb-4">At a glance</p>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm sm:text-base">
                {SNAPSHOT.map((row) => (
                  <div key={row.k} className="flex gap-3 sm:gap-4">
                    <dt className="font-bold uppercase tracking-eyebrow text-[0.65rem] text-crimson mt-1 w-28 sm:w-32 flex-shrink-0">
                      {row.k}
                    </dt>
                    <dd className="text-navy leading-snug">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The role */}
      <section className="surface-cream section">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow mb-3">The role</p>
            <h2 className="display-3 mb-6">A steady pair of hands who joins pieces well.</h2>
          </Reveal>
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-charcoal/85 max-w-2xl">
            <Reveal delay={0.05}>
              <p>
                Beulah handles every cut in this atelier. We are looking for the right hands to stitch those
                pieces into the dress, the corset, the trouser. Steady, considered, on time.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                This is not a daily role. The atelier calls you in two to three days a week on average, with
                longer stretches when bridal builds and aso ebi families are in the calendar. The salary stays
                the same regardless; the schedule flexes with the work.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What you will do */}
      <section className="surface-cream-warm section">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow mb-3">What you will do</p>
            <h2 className="display-3 mb-8">On the production floor with Beulah.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            <Reveal delay={0.05}>
              <div className="bg-cream rounded-md p-6 border border-charcoal/10 h-full">
                <p className="eyebrow mb-3">You will</p>
                <ul className="space-y-2.5 text-sm sm:text-base text-navy">
                  {[
                    "Join cut fabric pieces on the industrial machine.",
                    "Finish hems and seams by hand where the design calls for it.",
                    "Work alongside Beulah and the senior atelier lead.",
                    "Keep the production floor neat and the rhythm steady.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-crimson font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-navy rounded-md p-6 border border-gold/20 text-cream h-full">
                <p className="eyebrow text-gold mb-3">You will not</p>
                <ul className="space-y-2.5 text-sm sm:text-base text-cream-warm/90">
                  <li className="flex items-start gap-2.5">
                    <span className="text-gold font-bold mt-0.5">×</span>
                    <span>
                      Cut. Every piece in this atelier is cut by Beulah herself; that part of the work is not the
                      role.
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="surface-cream section">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow mb-3">What we are looking for</p>
            <h2 className="display-3 mb-4">At least two of the three.</h2>
            <p className="body-lead text-charcoal/75 max-w-xl mb-8">
              The pay is honest, not premium. We are looking for competence and care, not a full atelier
              résumé. If you tick at least two of the three below, please apply.
            </p>
          </Reveal>
          <ol className="space-y-3 max-w-2xl">
            {REQUIREMENTS.map((r, i) => (
              <Reveal key={r} delay={0.05 * (i + 1)}>
                <li className="flex gap-4 items-start bg-cream-warm border border-charcoal/10 rounded-md p-4">
                  <span className="font-display text-2xl text-crimson leading-none w-7 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-base text-navy leading-relaxed">{r}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.25}>
            <p className="text-sm italic text-charcoal/60 mt-5">If you tick all three, even better.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 pt-8 border-t border-charcoal/10">
              <p className="eyebrow mb-3">Location preference</p>
              <p className="text-base text-charcoal/85 leading-relaxed max-w-2xl">
                The atelier is in Eleyele, Ibadan. We are looking for someone who lives nearby. Eleyele,
                Jericho, Ologuneru, Iddo, or closer, is ideal so the commute does not eat the day.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How to apply */}
      <section className="surface-navy grain section">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="eyebrow text-gold mb-3">How to apply</p>
            <h2 className="display-2 text-cream mb-6 text-balance">Send us a note. We respond to every one.</h2>
            <p className="body-lead text-cream-warm/85 max-w-xl mx-auto mb-10">
              {hasForm
                ? "Use the form for the cleanest path; it lets you upload a CV if you have one. WhatsApp and email work too."
                : "WhatsApp is fastest. If you prefer email, that works too. A short note about your sewing experience and where you live in Ibadan is enough."}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              {hasForm && (
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-gold w-full"
                >
                  Apply via the form
                </a>
              )}
              <a
                href={WHATSAPP_APPLY_URL}
                target="_blank"
                rel="noopener"
                className={`btn w-full ${hasForm ? "btn-ghost-cream" : "btn-gold"}`}
              >
                Apply on WhatsApp
              </a>
              <a
                href={EMAIL_APPLY_URL}
                className="text-sm text-cream-warm/80 underline underline-offset-4 hover:text-gold transition-colors mt-2"
              >
                Or email delightfashionhouseth@gmail.com
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xs italic text-cream-warm/55 mt-10 max-w-md mx-auto">
              Applications are open and rolling. We respond to every message within five working days.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Soft footer to the brand */}
      <section className="surface-cream-warm section-tight text-center">
        <div className="container-narrow">
          <Reveal>
            <p className="text-sm text-charcoal/70">
              Curious about the brand first?{" "}
              <Link href="/our-story" className="text-crimson underline underline-offset-2 hover:text-crimson-deep">
                Read the Dé-light story
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
