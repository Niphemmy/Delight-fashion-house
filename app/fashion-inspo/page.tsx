import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { InspoFilter } from "@/components/InspoFilter";
import { PinCard } from "@/components/PinCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { getPins } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Fashion Inspo",
  description:
    "Every saved look, available to commission. Browse the Dé-light archive: brides, aso ebi, boss ladies, soft life.",
};

export default async function FashionInspoIndex({
  searchParams,
}: {
  searchParams: Promise<{ archetype?: string }>;
}) {
  const params = await searchParams;
  const filter = params.archetype || "all";
  const all = await getPins();
  const visible = filter === "all" ? all : all.filter((p) => p.archetype === filter);

  return (
    <>
      <PageHeader
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Fashion Inspo" }]}
        eyebrow="Fashion Inspo"
        title="Saw it on Pinterest? You can wear it."
        body="Every saved look. The story behind it. The path to your closet. Tap any piece to read the story and start the order."
      />

      <section className="surface-cream-warm section-tight">
        <div className="container-site">
          <InspoFilter active={filter} />
          {visible.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-charcoal/60">No looks in this archetype yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {visible.map((pin) => (
                <PinCard key={pin._id} pin={pin} />
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
