"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cx } from "@/lib/utils";

const FILTERS: Array<{ slug: string; label: string }> = [
  { slug: "all", label: "All looks" },
  { slug: "brides", label: "Brides" },
  { slug: "aso-ebi", label: "Aso Ebi" },
  { slug: "boss-ladies", label: "Boss Ladies" },
  { slug: "soft-life", label: "Soft Life" },
];

export function InspoFilter({ active }: { active: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function setFilter(slug: string) {
    const next = new URLSearchParams(Array.from(params.entries()));
    if (slug === "all") {
      next.delete("archetype");
    } else {
      next.set("archetype", slug);
    }
    const qs = next.toString();
    startTransition(() => {
      router.push(qs ? `/fashion-inspo?${qs}` : "/fashion-inspo", { scroll: false });
    });
  }

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-10 lg:mb-14">
      {FILTERS.map((f) => (
        <button
          key={f.slug}
          type="button"
          onClick={() => setFilter(f.slug)}
          disabled={pending}
          className={cx(
            "px-5 py-2.5 rounded-full text-sm font-semibold tracking-cta border-2 transition-all duration-200",
            active === f.slug
              ? "bg-navy text-cream border-navy"
              : "bg-cream text-navy border-charcoal/15 hover:border-crimson hover:text-crimson"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
