/**
 * WhatsApp deep link helper.
 * Per docs/06-conversion-mechanics.md, every commerce intent flows through this.
 * Number is +234 706 954 2891 (E.164: 2347069542891).
 */
export const WHATSAPP_NUMBER = "2347069542891";

export interface WhatsAppOptions {
  pinName?: string;
  pinUrl?: string;
  firstName?: string;
  intent?: "order" | "consult" | "general";
}

export function buildWhatsAppLink(opts: WhatsAppOptions = {}): string {
  const parts: string[] = ["Hi Beulah,"];

  if (opts.intent === "consult") {
    parts.push("I would like to book a Style Consult.");
  } else if (opts.pinName) {
    parts.push(`I want this look from Fashion Inspo: ${opts.pinName}.`);
    if (opts.pinUrl) parts.push(`Link: ${opts.pinUrl}`);
  } else {
    parts.push("I have a question about Dé-light.");
  }

  if (opts.firstName) parts.push(`My name is ${opts.firstName}.`);

  const text = encodeURIComponent(parts.join(" "));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
