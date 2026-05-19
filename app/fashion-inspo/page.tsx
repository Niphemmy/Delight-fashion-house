import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FashionInspoGrid } from "@/components/FashionInspoGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { getPins } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Fashion Inspo",
  description:
    "Every saved look, available to commission. Browse the Dé-light archive: brides, aso ebi, boss ladies, soft life.",
};

export default async function FashionInspoIndex() {
  const pins = await getPins();

  return (
    <>
      <PageHeader
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Fashion Inspo" }]}
        eyebrow="Fashion Inspo"
        title="Saw it on Pinterest? You can wear it."
        body="Every saved look. The story behind it. The path to your closet. Tap any piece to read the story and start the order."
      />
      <FashionInspoGrid pins={pins} />
      <FinalCta />
    </>
  );
}
