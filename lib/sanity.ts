/**
 * Sanity client wrapper.
 * Falls back to local data in lib/data.ts when SANITY_PROJECT_ID is not set,
 * so the dev server runs out of the box without a Sanity project.
 *
 * Once Nifemi creates the Sanity project (see docs/09-setup-checklist.md),
 * fill NEXT_PUBLIC_SANITY_PROJECT_ID and the data swaps to live CMS content.
 */
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import * as fallback from "./data";
import type {
  Archetype,
  Pin,
  Testimonial,
  StoryMilestone,
  TeamMember,
  FaqItem,
  SiteSettings,
} from "./types";

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const SANITY_API_VERSION = "2024-11-01";

export const isSanityConfigured = Boolean(SANITY_PROJECT_ID);

export const client = isSanityConfigured
  ? createClient({
      projectId: SANITY_PROJECT_ID!,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: process.env.NODE_ENV === "production",
      perspective: "published",
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImageSource): string {
  if (builder) {
    return builder.image(source).auto("format").fit("max").url();
  }
  // When Sanity isn't configured, the source is already a /public path.
  return typeof source === "string" ? source : "";
}

// ---------- Queries (used when Sanity is configured) ----------
const SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;
const ARCHETYPES_QUERY = `*[_type == "archetype"] | order(order asc)`;
const ARCHETYPE_BY_SLUG_QUERY = `*[_type == "archetype" && slug.current == $slug][0]`;
const PINS_QUERY = `*[_type == "pin"] | order(order asc)`;
const PINS_BY_ARCH_QUERY = `*[_type == "pin" && archetype->slug.current == $archetype] | order(order asc)`;
const PIN_BY_SLUG_QUERY = `*[_type == "pin" && slug.current == $slug][0]`;
const FEATURED_PINS_QUERY = `*[_type == "pin" && featured == true] | order(order asc) [0...$limit]`;
const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc)`;
const STORY_QUERY = `*[_type == "storyMilestone"] | order(order asc)`;
const TEAM_QUERY = `*[_type == "teamMember"] | order(order asc)`;
const FAQ_QUERY = `*[_type == "faq"] | order(order asc)`;

// ---------- Public API (Sanity if configured, else fallback) ----------

export async function getSiteSettings(): Promise<SiteSettings> {
  if (client) {
    const settings = await client.fetch(SETTINGS_QUERY);
    if (settings) return settings as SiteSettings;
  }
  return fallback.siteSettings;
}

export async function getArchetypes(): Promise<Archetype[]> {
  if (client) {
    const data = await client.fetch(ARCHETYPES_QUERY);
    if (data?.length) return data as Archetype[];
  }
  return fallback.archetypes;
}

export async function getArchetypeBySlug(slug: string): Promise<Archetype | null> {
  if (client) {
    const data = await client.fetch(ARCHETYPE_BY_SLUG_QUERY, { slug });
    if (data) return data as Archetype;
  }
  return fallback.getArchetypeBySlug(slug) || null;
}

export async function getPins(): Promise<Pin[]> {
  if (client) {
    const data = await client.fetch(PINS_QUERY);
    if (data?.length) return data as Pin[];
  }
  return fallback.pins;
}

export async function getPinsByArchetype(archetype: string): Promise<Pin[]> {
  if (client) {
    const data = await client.fetch(PINS_BY_ARCH_QUERY, { archetype });
    if (data?.length) return data as Pin[];
  }
  return fallback.getPinsByArchetype(archetype as Pin["archetype"]);
}

export async function getPinBySlug(slug: string): Promise<Pin | null> {
  if (client) {
    const data = await client.fetch(PIN_BY_SLUG_QUERY, { slug });
    if (data) return data as Pin;
  }
  return fallback.getPinBySlug(slug) || null;
}

export async function getFeaturedPins(limit = 6): Promise<Pin[]> {
  if (client) {
    const data = await client.fetch(FEATURED_PINS_QUERY, { limit });
    if (data?.length) return data as Pin[];
  }
  return fallback.getFeaturedPins(limit);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (client) {
    const data = await client.fetch(TESTIMONIALS_QUERY);
    if (data?.length) return data as Testimonial[];
  }
  return fallback.testimonials;
}

export async function getStoryMilestones(): Promise<StoryMilestone[]> {
  if (client) {
    const data = await client.fetch(STORY_QUERY);
    if (data?.length) return data as StoryMilestone[];
  }
  return fallback.storyMilestones;
}

export async function getTeam(): Promise<TeamMember[]> {
  if (client) {
    const data = await client.fetch(TEAM_QUERY);
    if (data?.length) return data as TeamMember[];
  }
  return fallback.team;
}

export async function getFaqs(): Promise<FaqItem[]> {
  if (client) {
    const data = await client.fetch(FAQ_QUERY);
    if (data?.length) return data as FaqItem[];
  }
  return fallback.faqs;
}
