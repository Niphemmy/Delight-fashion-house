"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useModal } from "./ModalProvider";
import { cx } from "@/lib/utils";

const NAV = [
  { href: "/fashion-inspo", label: "Fashion Inspo" },
  { href: "/gallery/brides", label: "Brides" },
  { href: "/gallery/aso-ebi", label: "Aso Ebi" },
  { href: "/gallery/boss-ladies", label: "Boss Ladies" },
  { href: "/gallery/soft-life", label: "Soft Life" },
  { href: "/our-story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openCheckout } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/90 backdrop-blur-xl border-b border-charcoal/10 shadow-sm"
          : "bg-cream border-b border-transparent"
      )}
    >
      <div className="container-site flex items-center justify-between h-[72px] lg:h-[88px]">
        <Logo variant="navy" width={150} className="lg:w-[180px]" priority />

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {NAV.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy hover:text-crimson transition-colors tracking-cta"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => openCheckout({ intent: "consult", source: "nav" })}
            className="btn btn-primary px-6 py-3 text-sm min-h-[44px]"
          >
            Book a Consult
          </button>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden inline-flex flex-col items-center justify-center w-12 h-12 gap-1.5 rounded-sm"
        >
          <span
            className={cx(
              "block w-6 h-0.5 bg-navy transition-transform",
              mobileOpen && "translate-y-2 rotate-45"
            )}
          />
          <span className={cx("block w-6 h-0.5 bg-navy transition-opacity", mobileOpen && "opacity-0")} />
          <span
            className={cx(
              "block w-6 h-0.5 bg-navy transition-transform",
              mobileOpen && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-cream border-t border-charcoal/10 fade-mount">
          <nav className="container-site py-6 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl text-navy py-3 border-b border-charcoal/10 hover:text-crimson transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openCheckout({ intent: "consult", source: "mobile-nav" });
              }}
              className="btn btn-primary w-full mt-4"
            >
              Book a Style Consult
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
