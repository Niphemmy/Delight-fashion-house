/**
 * Delivery estimate by price tier.
 *   under NGN 80,000        -> 3 to 5 working days
 *   NGN 80,000 to 199,999   -> 5 to 10 working days
 *   NGN 200,000 and above   -> 14 to 21 working days within Nigeria
 *
 * Made to order; the clock starts from confirmation, not from browsing.
 */
export function deliveryEstimate(price: number | null | undefined): string {
  if (price === null || price === undefined) return "5 to 10 working days";
  if (price < 80000) return "3 to 5 working days";
  if (price < 200000) return "5 to 10 working days";
  return "14 to 21 working days within Nigeria";
}
