"use client";

import { useModal } from "@/components/ModalProvider";

const LINES = [
  { label: "Boss Lady", line: "If you are an executive who needs your wardrobe to confirm what your title says." },
  { label: "Bride", line: "If you are a bride who wants her day to look like the love story it is." },
  { label: "Aso Ebi", line: "If you are dressing for the aso ebi that sets the tone for the family." },
  { label: "Soft Life", line: "If you have arrived, and you want pieces that say so without saying so." },
];

export function WhoThisIsFor() {
  const { openArchetype } = useModal();
  return (
    <section className="surface-cream-warm border-y border-charcoal/10 section">
      <div className="container-narrow">
        <div className="text-center mb-12 lg:mb-16">
          <p className="eyebrow mb-3">Who this is for</p>
          <h2 className="display-2 max-w-3xl mx-auto text-balance">
            If you are dressing for what is next, you are in the right place.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-10">
          {LINES.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] gap-4 items-center bg-cream rounded-sm p-5 sm:p-6 border border-charcoal/10 hover:border-crimson hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="font-display text-xl sm:text-2xl italic text-crimson border-r border-charcoal/15 pr-4 sm:pr-6">
                {row.label}
              </div>
              <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed">{row.line}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button type="button" onClick={openArchetype} className="btn btn-navy">
            Tell us who you are dressing for
          </button>
        </div>
      </div>
    </section>
  );
}
