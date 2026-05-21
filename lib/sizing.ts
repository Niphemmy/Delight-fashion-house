/**
 * Dé-light sizing model. UK dress sizes.
 *
 * The customer picks her UK size. The size guide maps each UK size to
 * bust, waist, and hip measurements.
 *
 * Pricing tiers (applied silently; the customer never sees a "surcharge"
 * line, the displayed price simply updates when she picks her size):
 *   UK 8 to 14   -> base price (S and M)
 *   UK 16, 18    -> base x 1.05         (Large, +5%)
 *   UK 20, 22    -> base x 1.05^2       (Extra Large, +5% on top of L)
 *   UK 24, 26    -> base x 1.05^3       (Extra Extra Large, +5% on top of XL)
 * Final number is rounded to the nearest NGN 500 for clean shelf prices.
 *
 * Made to Measure is for women whose shape sits outside the standard
 * range. The base "from" price is shown; the final figure is confirmed
 * with Beulah on WhatsApp.
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
  tierMultiplier: number;
  madeToMeasure?: boolean;
}

function multiplierForUk(uk: number): number {
  if (uk >= 24) return 1.05 ** 3;  // ~1.157625
  if (uk >= 20) return 1.05 ** 2;  // 1.1025
  if (uk >= 16) return 1.05;       // 1.05
  return 1.0;                       // UK 8 to 14
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
      tierMultiplier: multiplierForUk(uk),
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
  tierMultiplier: 1.0,
  madeToMeasure: true,
};

export const SIZES: SizeOption[] = [...STANDARD_SIZES, MADE_TO_MEASURE];

export function getSize(code: SizeCode): SizeOption {
  return SIZES.find((s) => s.code === code) ?? STANDARD_SIZES[0];
}

/** Round to the nearest NGN 500. */
function roundToFiveHundred(n: number): number {
  return Math.round(n / 500) * 500;
}

/**
 * Final price for a chosen size. The tier multiplier is folded in and the
 * number is smoothed to the nearest NGN 500. The customer sees one price,
 * not a base plus a fee.
 */
export function priceForSize(basePrice: number | null, code: SizeCode): number | null {
  if (basePrice === null || basePrice === undefined) return null;
  const opt = getSize(code);
  return roundToFiveHundred(basePrice * opt.tierMultiplier);
}

export function isMadeToMeasure(code: SizeCode): boolean {
  return getSize(code).madeToMeasure === true;
}
