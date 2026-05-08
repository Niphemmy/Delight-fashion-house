/**
 * Meta Pixel wrapper. Typed events from docs/06-conversion-mechanics.md.
 * Falls back to a console.info no-op when the Pixel ID is not configured.
 */

declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
    _fbq?: unknown;
  }
}

type PixelEvent =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "Subscribe"
  | "InitiateCheckout"
  | "Purchase"
  | "Contact"
  | "ScheduleConsult"
  | "ArchetypeSelect"
  | "ArchetypeView";

const STANDARD_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "Lead",
  "Subscribe",
  "InitiateCheckout",
  "Purchase",
]);

export function track(event: PixelEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const action = STANDARD_EVENTS.has(event) ? "track" : "trackCustom";
  if (window.fbq) {
    window.fbq(action, event, params);
  }
  if (process.env.NODE_ENV !== "production") {
    console.info(`[pixel:${action}] ${event}`, params);
  }
}

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
