"use client";

import { useModal } from "./ModalProvider";
import { track } from "@/lib/pixel";

export function ContactTiles() {
  const { openCheckout } = useModal();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <button
        type="button"
        onClick={() => {
          track("InitiateCheckout", { source: "contact-tile-wa" });
          openCheckout({ source: "contact-tile-wa", intent: "general" });
        }}
        className="group text-left bg-navy text-cream rounded-md p-7 lg:p-8 border-2 border-gold relative overflow-hidden hover:-translate-y-1 transition-transform shadow-modal"
      >
        <div className="w-12 h-12 rounded-full bg-[#25d366] flex items-center justify-center mb-5 text-white shadow-card">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.768.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
          </svg>
        </div>
        <p className="eyebrow text-gold mb-2">Recommended</p>
        <h3 className="font-display text-2xl text-cream mb-2">WhatsApp Beulah directly</h3>
        <p className="text-sm text-cream-warm/85 mb-5">+234 706 954 2891 · Most messages answered within the hour.</p>
        <span className="text-xs font-bold uppercase tracking-eyebrow text-gold">Open WhatsApp →</span>
      </button>

      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener"
        onClick={() => track("ScheduleConsult", { source: "contact-tile-ig" })}
        className="group text-left bg-cream rounded-md p-7 lg:p-8 border border-charcoal/15 hover:border-crimson hover:-translate-y-1 transition-all shadow-card hover:shadow-cardHover"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-crimson via-gold to-crimson flex items-center justify-center mb-5 text-cream">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
          </svg>
        </div>
        <p className="eyebrow mb-2">Instagram</p>
        <h3 className="font-display text-2xl text-navy mb-2">@Delight Fashion House</h3>
        <p className="text-sm text-charcoal/70 mb-5">The latest fittings, behind the scenes, and what is on the cutting table this week.</p>
        <span className="text-xs font-bold uppercase tracking-eyebrow text-crimson">Open Instagram →</span>
      </a>

      <a
        href="https://www.pinterest.com/fayinkabeulah/_created/"
        target="_blank"
        rel="noopener"
        className="group text-left bg-cream rounded-md p-7 lg:p-8 border border-charcoal/15 hover:border-crimson hover:-translate-y-1 transition-all shadow-card hover:shadow-cardHover"
      >
        <div className="w-12 h-12 rounded-full bg-crimson flex items-center justify-center mb-5 text-cream">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
          </svg>
        </div>
        <p className="eyebrow mb-2">Pinterest</p>
        <h3 className="font-display text-2xl text-navy mb-2">@fayinkabeulah</h3>
        <p className="text-sm text-charcoal/70 mb-5">Where six hundred thousand women save Dé-light looks every month.</p>
        <span className="text-xs font-bold uppercase tracking-eyebrow text-crimson">Open Pinterest →</span>
      </a>
    </div>
  );
}
