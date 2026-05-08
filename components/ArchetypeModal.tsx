"use client";

import Link from "next/link";
import { useModal } from "./ModalProvider";
import { track } from "@/lib/pixel";

const OPTIONS: Array<{
  archetype: string;
  href: string;
  name: string;
  desc: string;
}> = [
  { archetype: "boss-lady", href: "/gallery/boss-ladies", name: "Boss Lady", desc: "Executive · second CV" },
  { archetype: "bride", href: "/gallery/brides", name: "Bride", desc: "The day they will photograph" },
  { archetype: "aso-ebi", href: "/gallery/aso-ebi", name: "Aso Ebi", desc: "When the family arrives" },
  { archetype: "soft-life", href: "/gallery/soft-life", name: "Soft Life", desc: "Quiet arrival" },
];

export function ArchetypeModal() {
  const { archetypeOpen, closeArchetype } = useModal();
  if (!archetypeOpen) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="archetype-title"
      className="fixed inset-0 z-[100] bg-navy-deep/80 backdrop-blur-md flex items-center justify-center px-4 py-6 sm:p-6 fade-mount"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeArchetype();
      }}
    >
      <div className="bg-cream w-full max-w-md max-h-[calc(100svh-32px)] overflow-y-auto rounded-md shadow-modal animate-slide-up relative">
        <button
          type="button"
          onClick={closeArchetype}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-cream-deep text-navy hover:bg-gold flex items-center justify-center transition-colors z-10"
        >
          <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="p-7 sm:p-9">
          <p className="eyebrow mb-3">Tell us</p>
          <h3 id="archetype-title" className="font-display text-2xl sm:text-3xl text-navy leading-tight mb-2">
            Who are you dressing for?
          </h3>
          <p className="text-sm text-charcoal/70 leading-relaxed mb-6">
            Pick one. We will take you to the gallery built around how that woman walks into the room.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {OPTIONS.map((o) => (
              <Link
                key={o.archetype}
                href={o.href}
                onClick={() => {
                  track("ArchetypeSelect", { archetype: o.archetype });
                  closeArchetype();
                }}
                className="block p-5 bg-cream-deep border-2 border-transparent rounded-sm hover:border-crimson hover:bg-cream transition-all duration-200 text-center hover:-translate-y-0.5"
              >
                <div className="font-display text-lg italic text-navy mb-1">{o.name}</div>
                <div className="text-xs text-charcoal/60">{o.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
