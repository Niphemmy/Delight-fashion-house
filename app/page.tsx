import { Hero } from "@/components/sections/Hero";
import { WhoThisIsFor } from "@/components/sections/WhoThisIsFor";
import { DifferenceBand } from "@/components/sections/DifferenceBand";
import { ArchetypeCards } from "@/components/sections/ArchetypeCards";
import { FashionInspoTeaser } from "@/components/sections/FashionInspoTeaser";
import { MeetBeulah } from "@/components/sections/MeetBeulah";
import { Testimonials } from "@/components/sections/Testimonials";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { FinalCta } from "@/components/sections/FinalCta";
import {
  getSiteSettings,
  getArchetypes,
  getFeaturedPins,
  getTestimonials,
} from "@/lib/sanity";

export default async function HomePage() {
  const [settings, archetypes, pins, testimonials] = await Promise.all([
    getSiteSettings(),
    getArchetypes(),
    getFeaturedPins(6),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero heroImage={settings.heroImage} />
      <WhoThisIsFor />
      <DifferenceBand />
      <ArchetypeCards archetypes={archetypes} />
      <FashionInspoTeaser pins={pins} />
      <MeetBeulah />
      <Testimonials testimonials={testimonials} />
      <LeadMagnet />
      <FinalCta />
    </>
  );
}
