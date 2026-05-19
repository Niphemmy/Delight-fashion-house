/**
 * Cart model and helpers.
 * The cart lives client-side (localStorage). Checkout compiles the cart
 * into a single itemised WhatsApp message to Beulah; payment is arranged
 * in that chat. There is no card payment on the site.
 */
import type { ArchetypeSlug } from "./types";
import type { SizeCode } from "./sizing";
import { getSize, priceForSize, isMadeToMeasure } from "./sizing";
import { WHATSAPP_NUMBER } from "./whatsapp";

export interface CartItem {
  lineId: string;
  slug: string;
  title: string;
  image: string;
  archetype: ArchetypeSlug;
  basePrice: number | null;
  size: SizeCode;
  unitPrice: number | null;
  madeToMeasure: boolean;
  quantity: number;
}

export function makeLineId(slug: string, size: SizeCode): string {
  return `${slug}__${size}`;
}

export function buildCartItem(input: {
  slug: string;
  title: string;
  image: string;
  archetype: ArchetypeSlug;
  basePrice: number | null;
  size: SizeCode;
  quantity?: number;
}): CartItem {
  return {
    lineId: makeLineId(input.slug, input.size),
    slug: input.slug,
    title: input.title,
    image: input.image,
    archetype: input.archetype,
    basePrice: input.basePrice,
    size: input.size,
    unitPrice: priceForSize(input.basePrice, input.size),
    madeToMeasure: isMadeToMeasure(input.size),
    quantity: input.quantity ?? 1,
  };
}

/** Admin fee charged once per distinct design in the cart. Shown at checkout. */
export const ADMIN_FEE_PER_DESIGN = 1750;

/** Subtotal of priced lines. Made to Measure lines are excluded (priced on consultation). */
export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    if (item.madeToMeasure || item.unitPrice === null) return sum;
    return sum + item.unitPrice * item.quantity;
  }, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

/** Number of distinct designs (by slug) in the cart. */
export function designCount(items: CartItem[]): number {
  return new Set(items.map((i) => i.slug)).size;
}

/** Admin fee for the whole cart: NGN 1,750 per distinct design. */
export function cartAdminFee(items: CartItem[]): number {
  return designCount(items) * ADMIN_FEE_PER_DESIGN;
}

/** Order total: subtotal plus admin fee. Made to Measure prices are settled on WhatsApp. */
export function cartTotal(items: CartItem[]): number {
  return cartSubtotal(items) + cartAdminFee(items);
}

function ngn(n: number): string {
  return `NGN ${n.toLocaleString("en-NG")}`;
}

export interface CheckoutDetails {
  firstName?: string;
  location?: string;
  address?: string;
}

/**
 * Build the WhatsApp checkout link with the full itemised order,
 * the admin fee, the order total, and the delivery destination.
 */
export function buildOrderWhatsAppLink(items: CartItem[], details: CheckoutDetails = {}): string {
  const lines: string[] = ["Hi Beulah, I would like to place an order from Dé-light Fashion House."];
  lines.push("");

  items.forEach((item, i) => {
    const sizeLabel = getSize(item.size).shortLabel;
    lines.push(`${i + 1}. ${item.title}`);
    if (item.madeToMeasure) {
      lines.push(`   Size: Made to Measure (price confirmed with you) x${item.quantity}`);
    } else {
      const each = item.unitPrice !== null ? ngn(item.unitPrice) : "price on request";
      lines.push(`   Size: ${sizeLabel} | ${each} x${item.quantity}`);
    }
  });

  lines.push("");
  const subtotal = cartSubtotal(items);
  const adminFee = cartAdminFee(items);
  if (subtotal > 0) lines.push(`Subtotal: ${ngn(subtotal)}`);
  if (adminFee > 0) lines.push(`Admin fee: ${ngn(adminFee)}`);
  if (subtotal > 0) lines.push(`Total: ${ngn(subtotal + adminFee)}`);
  if (items.some((i) => i.madeToMeasure)) {
    lines.push("Some pieces are Made to Measure; the final price is confirmed with you.");
  }

  if (details.location || details.address) {
    lines.push("");
    if (details.location) lines.push(`Deliver to: ${details.location}`);
    if (details.address) lines.push(`Address: ${details.address}`);
  }

  if (details.firstName) {
    lines.push("");
    lines.push(`My name is ${details.firstName}.`);
  }

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
