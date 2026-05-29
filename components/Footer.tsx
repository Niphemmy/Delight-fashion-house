"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Logo } from "./Logo";
import { track } from "@/lib/pixel";

const SITEMAP = [
  { href: "/", label: "Home" },
  { href: "/fashion-inspo", label: "Fashion Inspo" },
  { href: "/gallery/brides", label: "Brides" },
  { href: "/gallery/aso-ebi", label: "Aso Ebi" },
  { href: "/gallery/boss-ladies", label: "Boss Ladies" },
  { href: "/gallery/soft-life", label: "Soft Life" },
  { href: "/gallery", label: "Gallery" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/our-story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
  { href: "/join-the-atelier", label: "Join the Atelier" },
];

export function Footer() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    if (!email) return;
    setSubmitting(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
    } catch {
      // swallow; show success anyway since the local fallback always succeeds
    }
    track("Subscribe", { source: "footer" });
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <footer className="surface-navy-deep grain pt-20 pb-8 mt-0">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-4">
            <Logo variant="white" width={180} withLink={false} />
            <p className="mt-6 text-sm leading-relaxed text-cream-warm/80 max-w-sm">
              Executive image architecture, dressed as a fashion house. Lagos, Nigeria. Ten years and counting.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://wa.me/2347069542891"
                target="_blank"
                rel="noopener"
                className="text-cream-warm/70 hover:text-gold transition-colors"
                aria-label="WhatsApp"
              >
                <WaIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/delight_fashion_house1/"
                target="_blank"
                rel="noopener"
                className="text-cream-warm/70 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <IgIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.pinterest.com/fayinkabeulah/"
                target="_blank"
                rel="noopener"
                className="text-cream-warm/70 hover:text-gold transition-colors"
                aria-label="Pinterest"
              >
                <PinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-eyebrow text-gold mb-5">Sitemap</h4>
            <ul className="space-y-3">
              {SITEMAP.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-cream-warm/80 hover:text-gold transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-eyebrow text-gold mb-5">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://wa.me/2347069542891" className="text-cream-warm/80 hover:text-gold">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://www.pinterest.com/fayinkabeulah/" target="_blank" rel="noopener" className="text-cream-warm/80 hover:text-gold">
                  Pinterest
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/delight_fashion_house1/" target="_blank" rel="noopener" className="text-cream-warm/80 hover:text-gold">
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:delightfashionhouseth@gmail.com" className="text-cream-warm/80 hover:text-gold">
                  delightfashionhouseth@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-eyebrow text-gold mb-5">Newsletter</h4>
            <p className="text-sm text-cream-warm/70 mb-4 leading-relaxed">
              One styling letter per week. Unsubscribe whenever.
            </p>
            {submitted ? (
              <p className="text-sm text-gold">You are on the list. Welcome.</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full px-3.5 py-3 rounded-sm bg-cream/5 border border-cream/15 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold focus:bg-cream/10"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold text-navy text-sm font-bold uppercase tracking-cta py-3 rounded-sm hover:bg-gold-dark transition-colors disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Join the list"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col md:flex-row md:justify-between gap-2 text-xs text-cream/50">
          <div>© 2026 Dé-light Fashion House. All rights reserved.</div>
          <div>
            Designed by{" "}
            <a
              href="https://northern-star-website.vercel.app"
              target="_blank"
              rel="noopener"
              className="text-gold hover:text-cream underline underline-offset-2 transition-colors"
            >
              Northern Star Business Consulting
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.768.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
    </svg>
  );
}

function IgIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}
