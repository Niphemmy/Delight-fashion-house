/**
 * Shared types. Mirror the Sanity schema shape (docs/07-implementation-spec.md)
 * so the fallback content in lib/data.ts is a drop-in replacement when Sanity
 * is not yet configured.
 */

export type ArchetypeSlug = "brides" | "aso-ebi" | "boss-ladies" | "soft-life";

export interface Archetype {
  _id: string;
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
}

export interface Pin {
  _id: string;
  title: string;
  slug: string;
  image: string;
  images: string[];
  archetype: ArchetypeSlug;
  priceFromNgn: number | null;
  story: string[];
  pinterestUrl?: string;
  order: number;
  featured: boolean;
}

export interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  titleAndOccasion: string;
  photo?: string;
  archetype?: ArchetypeSlug;
  rating: number;
  order: number;
}

export interface StoryMilestone {
  _id: string;
  year: number;
  title: string;
  body: string;
  image?: string;
  order: number;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo?: string;
  oneLiner: string;
  order: number;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

export interface SiteSettings {
  heroImage: string;
  heroH1: string;
  heroSubhead: string;
  primaryCtaLabel: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  pinterestHandle: string;
  pinterestUrl: string;
  email: string;
  statYears: number;
  statSavesMonthly: number;
  leadMagnetTitle: string;
  founderPortrait: string;
  atelierApplicationFormUrl?: string;
  summerAcademyFormUrl?: string;
}
