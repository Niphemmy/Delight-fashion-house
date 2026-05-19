/**
 * Dé-light sizing model.
 *
 * Sizes are letter sizes (S to XXL) mapped to UK dress sizes plus body
 * measurements, so a customer can find herself on the size guide.
 *
 * Pricing tiers (applied silently; the customer never sees a "surcharge"
 * line, the displayed price simply updates when she picks her size):
 *   S, M, L  -> base price
 *   XL       -> base price + NGN 3,000
 *   XXL      -> base price + NGN 5,000
 *
 * Made to Measure is for women whose shape sits outside the standard
 * range (a fuller bust, a fuller midsection). It is built to her exact
 * measurements; the final price is confirmed with Beulah on WhatsApp.
 */

export type SizeCode = "S" | "M" | "L" | "XL" | "XXL" | "MTM";

export interface SizeOption {
  code: SizeCode;
  label: string;
  shortLabel: string;
  ukRange: string;
  bustIn: string;
  waistIn: string;
  hipIn: string;
  bustCm: string;
  waistCm: string;
  hipCm: string;
  surcharge: number;
  madeToMeasure?: boolean;
}

export const SIZES: SizeOption[] = [
  {
    code: "S",
    label: "Small",
    shortLabel: "S",
    ukRange: "UK 8 to 10",
    bustIn: "32 to 34", waistIn: "25 to 27", hipIn: "35 to 37",
    bustCm: "81 to 86", waistCm: "64 to 69", hipCm: "89 to 94",
    surcharge: 0,
  },
  {
    code: "M",
    label: "Medium",
    shortLabel: "M",
    ukRange: "UK 12 to 14",
    bustIn: "36 to 38", waistIn: "29 to 31", hipIn: "39 to 41",
    bustCm: "91 to 97", waistCm: "74 to 79", hipCm: "99 to 104",
    surcharge: 0,
  },
  {
    code: "L",
    label: "Large",
    shortLabel: "L",
    ukRange: "UK 16 to 18",
    bustIn: "40 to 42", waistIn: "33 to 35", hipIn: "43 to 45",
    bustCm: "102 to 107", waistCm: "84 to 89", hipCm: "109 to 114",
    surcharge: 0,
  },
  {
    code: "XL",
    label: "Extra Large",
    shortLabel: "XL",
    ukRange: "UK 20 to 22",
    bustIn: "44 to 46", waistIn: "37 to 39", hipIn: "47 to 49",
    bustCm: "112 to 117", waistCm: "94 to 99", hipCm: "119 to 124",
    surcharge: 3000,
  },
  {
    code: "XXL",
    label: "Extra Extra Large",
    shortLabel: "XXL",
    ukRange: "UK 24 to 26",
    bustIn: "48 to 50", waistIn: "41 to 43", hipIn: "51 to 53",
    bustCm: "122 to 127", waistCm: "104 to 109", hipCm: "130 to 135",
    surcharge: 5000,
  },
  {
    code: "MTM",
    label: "Made to Measure",
    shortLabel: "Made to Measure",
    ukRange: "Built to your measurements",
    bustIn: "your measurement", waistIn: "your measurement", hipIn: "your measurement",
    bustCm: "your measurement", waistCm: "your measurement", hipCm: "your measurement",
    surcharge: 0,
    madeToMeasure: true,
  },
];

/** The five standard sizes shown in the picker grid (Made to Measure handled separately). */
export const STANDARD_SIZES = SIZES.filter((s) => !s.madeToMeasure);

export const MADE_TO_MEASURE = SIZES.find((s) => s.madeToMeasure)!;

export function getSize(code: SizeCode): SizeOption {
  return SIZES.find((s) => s.code === code) ?? SIZES[0];
}

/**
 * Final price for a chosen size. The surcharge is folded into the number;
 * the customer sees one price, not a base plus a fee.
 * Made to Measure returns the base price as a "from" figure; the real
 * number is confirmed on WhatsApp.
 */
export function priceForSize(basePrice: number | null, code: SizeCode): number | null {
  if (basePrice === null || basePrice === undefined) return null;
  return basePrice + getSize(code).surcharge;
}

export function isMadeToMeasure(code: SizeCode): boolean {
  return getSize(code).madeToMeasure === true;
}
