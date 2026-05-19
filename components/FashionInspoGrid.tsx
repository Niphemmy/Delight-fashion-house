"use client";

import { useState } from "react";
import { PinCard } from "./PinCard";
import { cx } from "@/lib/utils";
import type { Pin } from "@/lib/types";

const FILTERS = [
  { slug: "all", label: "All looks" },
  { slug: "brides", label: "Brides" },
  { slug: "aso-ebi", label: "Aso Ebi" },
  { slug: "boss-ladies", label: "Boss Ladies" },
  { slug: "soft-life", label: "Soft Life" },
];

/**
 * Fashion Inspo grid with instant, client-side filtering.
 * Every card stays mounted; filtering only toggles a `hidden` class, so
 * switching archetypes is immediate, with no navigation and no image reload.
 */
export function FashionInspoGrid({ pins }: { pins: Pin[] }) {
  const [filter, setFilter] = useState("all");
  const visibleCount =
    filter === "all" ? pins.length : pins.filter((p) => p.archetype === filter).length;

  return (
    <section className="surface-cream-warm section-tight">
      <div className="container-site">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-10 lg:mb-14">
          {FILTERS.map((f) => (
            <button
              key={f.slug}
              type="button"
              onClick={() => setFilter(f.slug)}
              aria-pressed={filter === f.slug}
              className={cx(
                "px-5 py-2.5 rounded-full text-sm font-semibold tracking-cta border-2 transition-colors duration-150",
                filter === f.slug
                  ? "bg-navy text-cream border-navy"
                  : "bg-cream text-navy border-charcoal/15 hover:border-crimson hover:text-crimson"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {pins.map((pin) => (
            <div
              key={pin._id}
              className={cx(filter !== "all" && pin.archetype !== filter && "hidden")}
            >
              <PinCard pin={pin} />
            </div>
          ))}
        </div>

        {visibleCount === 0 && (
          <p className="text-center text-charcoal/60 py-12">No looks in this archetype yet.</p>
        )}
      </div>
    </section>
  );
}
