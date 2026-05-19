/**
 * Tiny class-name joiner. Avoids pulling in clsx for one helper.
 */
export function cx(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(" ");
}

export function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

/**
 * Format a price for display. Returns 'Price on request' when null/0,
 * so pin prices can be left blank in content/pins.json until set.
 */
export function formatPrice(priceFromNgn: number | null | undefined): string {
  if (priceFromNgn == null || priceFromNgn === 0) return "Price on request";
  return `From ₦${priceFromNgn.toLocaleString("en-NG")}`;
}

/**
 * Design titles follow the pattern "[Piece name] for the [Occasion]".
 * Split them so the piece name can lead and the occasion can sit below
 * as a quieter line, instead of one long run of clashing text.
 */
export function splitDesignTitle(title: string): { name: string; occasion: string } {
  const idx = title.indexOf(" for ");
  if (idx === -1) return { name: title.trim(), occasion: "" };
  return { name: title.slice(0, idx).trim(), occasion: title.slice(idx + 1).trim() };
}

export const ARCHETYPE_LABEL: Record<string, string> = {
  brides: "Bride",
  "aso-ebi": "Aso Ebi",
  "boss-ladies": "Boss Lady",
  "soft-life": "Soft Life",
};
