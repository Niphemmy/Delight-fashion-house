/**
 * Dé-light sizing model. UK dress sizes.
 *
 * The customer picks her UK size. The size guide maps each UK size to
 * bust, waist, and hip measurements.
 *
 * Pricing tiers (applied silently; the customer never sees a "surcharge"
 * line, the displayed price simply updates when she picks her size):
 *   UK 8 to 18   -> base price
 *   UK 20, UK 22 -> base price + NGN 3,000
 *   UK 24, UK 26 -> base price + NGN 5,000
 *
 * Made to Measure is for women whose shape sits outside the standard
 * range (a fuller bust, a fuller midsection). It is built to her exact
 * measurements; the final price is confirmed with Beulah on WhatsApp.
 */

export type SizeCode =
  | "8" | "10" | "12" | "14" | "16" | "18" | "20" | "22" | "24" | "26" | "MTM";

export interface SizeOption {
  code: SizeCode;
  uk: number | null;
  pickerLabel: string;
  shortLabel: string;
  bustIn: number | null;
  waistIn: number | null;
  hipIn: number | null;
  bustCm: number | null;
  waistCm: number | null;
  hipCm: number | null;
  surcharge: number;
  madeToMeasure?: boolean;
}

function surchargeForUk(uk: number): number {
  if (uk >= 24) return 5000;
  if (uk >= 20) return 3000;
  return 0;
}

// Bust / waist / hip in inches per UK size (standard 2 inch grading).
const MEASURE: Record<number, [number, number, number]> = {
  8: [32, 25, 35],
  10: [34, 27, 37],
  12: [36, 29, 39],
  14: [38, 31, 41],
  16: [40, 33, 43],
  18: [42, 35, 45],
  20: [44, 37, 47],
  22: [46, 39, 49],
  24: [48, 41, 51],
  26: [50, 43, 53],
};

const toCm = (inches: number) => Math.round(inches * 2.54);

export const STANDARD_SIZES: SizeOption[] = ([8, 10, 12, 14, 16, 18, 20, 22, 24, 26] as const).map(
  (uk) => {
    const [b, w, h] = MEASURE[uk];
    return {
      code: String(uk) as SizeCode,
      uk,
      pickerLabel: String(uk),
      shortLabel: `UK ${uk}`,
      bustIn: b,
      waistIn: w,
      hipIn: h,
      bustCm: toCm(b),
      waistCm: toCm(w),
      hipCm: toCm(h),
      surcharge: surchargeForUk(uk),
    };
  }
);

export const MADE_TO_MEASURE: SizeOption = {
  code: "MTM",
  uk: null,
  pickerLabel: "Made to Measure",
  shortLabel: "Made to Measure",
  bustIn: null,
  waistIn: null,
  hipIn: null,
  bustCm: null,
  waistCm: null,
  hipCm: null,
  surcharge: 0,
  madeToMeasure: true,
};

export const SIZES: SizeOption[] = [...STANDARD_SIZES, MADE_TO_MEASURE];

export function getSize(code: SizeCode): SizeOption {
  return SIZES.find((s) => s.code === code) ?? STANDARD_SIZES[0];
}

/**
 * Final price for a chosen size. The surcharge is folded into the number;
 * the customer sees one price, not a base plus a fee.
 */
export function priceForSize(basePrice: number | null, code: SizeCode): number | null {
  if (basePrice === null || basePrice === undefined) return null;
  return basePrice + getSize(code).surcharge;
}

export function isMadeToMeasure(code: SizeCode): boolean {
  return getSize(code).madeToMeasure === true;
}
