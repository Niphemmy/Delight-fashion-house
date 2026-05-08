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
