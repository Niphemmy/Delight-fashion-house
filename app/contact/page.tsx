import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactTiles } from "@/components/ContactTiles";
import { ContactBackupForm } from "@/components/ContactBackupForm";
import { FinalCta } from "@/components/sections/FinalCta";
import { getFaqs } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Beulah. WhatsApp is the fastest way; most messages are answered within the hour.",
};

export default async function ContactPage() {
  const faqs = await getFaqs();

  return (
    <>
      <PageHeader
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        eyebrow="Talk to Beulah"
        title="Send the message that starts your wardrobe."
        body="WhatsApp is the fastest way. Most messages are answered within the hour, during Lagos working hours."
      />

      <section className="surface-cream section-tight">
        <div className="container-site">
          <ContactTiles />
        </div>
      </section>

      <section className="surface-cream-warm section-tight">
        <div className="container-site grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Email backup</p>
            <h2 className="display-3 mb-4">Prefer email? Send a longer note.</h2>
            <p className="text-charcoal/75 leading-relaxed">
              Beulah responds to email within one business day. WhatsApp is faster, but if you would rather write a
              paragraph, this is the place.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ContactBackupForm />
          </div>
        </div>
      </section>

      <section className="surface-cream section">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Frequently asked</p>
            <h2 className="display-2">Before you message.</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f._id} className="group bg-cream-warm border border-charcoal/10 rounded-sm p-5 sm:p-6 hover:border-crimson transition-colors">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="font-display text-lg sm:text-xl text-navy pr-2">{f.question}</span>
                  <span className="text-crimson text-2xl leading-none transition-transform group-open:rotate-45 flex-shrink-0">+</span>
                </summary>
                <p className="mt-3 text-sm sm:text-base text-charcoal/80 leading-relaxed pretty-text">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
