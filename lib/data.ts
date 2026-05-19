/**
 * Site content. Loaded from /content/*.json so non-coders can edit it
 * directly on GitHub (Vercel rebuilds on push). See README for the workflow.
 *
 * Shape mirrors the original Sanity schemas in docs/07 in case you ever
 * want to migrate to a CMS later — every field is identical.
 */
import siteJson from "@/content/site.json";
import archetypesJson from "@/content/archetypes.json";
import pinsJson from "@/content/pins.json";
import testimonialsJson from "@/content/testimonials.json";
import milestonesJson from "@/content/milestones.json";
import teamJson from "@/content/team.json";
import faqsJson from "@/content/faqs.json";

import type {
  Archetype,
  Pin,
  Testimonial,
  StoryMilestone,
  TeamMember,
  FaqItem,
  SiteSettings,
  ArchetypeSlug,
} from "./types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const siteSettings: SiteSettings = siteJson as SiteSettings;

export const archetypes: Archetype[] = (archetypesJson as Array<{
  id: string;
  name: string;
  slug: ArchetypeSlug;
  order: number;
  heroH1: string;
  heroSubhead: string;
  heroImage: string;
  promise: string;
  finalH2: string;
  oneLiner: string;
  cardLabel: string;
}>).map((a) => ({
  _id: a.id,
  name: a.name,
  slug: a.slug,
  order: a.order,
  heroH1: a.heroH1,
  heroSubhead: a.heroSubhead,
  heroImage: a.heroImage,
  promise: a.promise,
  finalH2: a.finalH2,
  oneLiner: a.oneLiner,
  cardLabel: a.cardLabel,
}));

export const pins: Pin[] = (pinsJson as Array<{
  title: string;
  archetype: ArchetypeSlug;
  priceFromNgn: number | null;
  image: string;
  featured?: boolean;
  story: string[];
}>).map((p, i) => ({
  _id: `pin-${i + 1}`,
  title: p.title,
  slug: slugify(p.title),
  image: p.image,
  archetype: p.archetype,
  priceFromNgn: p.priceFromNgn,
  story: p.story,
  order: (i + 1) * 100,
  featured: p.featured ?? false,
}));

export const testimonials: Testimonial[] = (testimonialsJson as Array<{
  id: string;
  quote: string;
  name: string;
  titleAndOccasion: string;
  archetype?: ArchetypeSlug;
  rating?: number;
  order: number;
}>).map((t) => ({
  _id: t.id,
  quote: t.quote,
  name: t.name,
  titleAndOccasion: t.titleAndOccasion,
  archetype: t.archetype,
  rating: t.rating ?? 5,
  order: t.order,
}));

export const storyMilestones: StoryMilestone[] = (milestonesJson as Array<{
  id: string;
  year: number;
  title: string;
  body: string;
  image?: string;
  order: number;
}>).map((m) => ({
  _id: m.id,
  year: m.year,
  title: m.title,
  body: m.body,
  image: m.image,
  order: m.order,
}));

export const team: TeamMember[] = (teamJson as Array<{
  id: string;
  name: string;
  role: string;
  photo?: string | null;
  oneLiner: string;
  order: number;
}>).map((t) => ({
  _id: t.id,
  name: t.name,
  role: t.role,
  photo: t.photo ?? undefined,
  oneLiner: t.oneLiner,
  order: t.order,
}));

export const faqs: FaqItem[] = (faqsJson as Array<{
  id: string;
  question: string;
  answer: string;
  order: number;
}>).map((f) => ({
  _id: f.id,
  question: f.question,
  answer: f.answer,
  order: f.order,
}));

// ---------- Helpers ----------
export function getPinBySlug(slug: string): Pin | undefined {
  return pins.find((p) => p.slug === slug);
}

export function getPinsByArchetype(archetype: Pin["archetype"]): Pin[] {
  return pins.filter((p) => p.archetype === archetype).sort((a, b) => a.order - b.order);
}

export function getFeaturedPins(limit = 6): Pin[] {
  const featured = pins.filter((p) => p.featured);
  return (featured.length ? featured : pins).slice(0, limit);
}

export function getArchetypeBySlug(slug: string): Archetype | undefined {
  return archetypes.find((a) => a.slug === slug);
}

export function getTestimonialsByArchetype(archetype: Pin["archetype"]): Testimonial[] {
  const matched = testimonials.filter((t) => t.archetype === archetype);
  return matched.length ? matched : testimonials;
}

/**
 * Format the price for display.
 * Returns 'Price on request' when priceFromNgn is null, so Beulah can leave
 * pin prices blank in content/pins.json until she is ready to set them.
 */
export function formatPrice(priceFromNgn: number | null): string {
  if (priceFromNgn === null || priceFromNgn === 0) return "Price on request";
  return `From ₦${priceFromNgn.toLocaleString("en-NG")}`;
}
