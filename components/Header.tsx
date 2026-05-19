"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { useModal } from "./ModalProvider";
import { CartButton } from "./CartButton";
import { cx } from "@/lib/utils";

const easing = [0.22, 1, 0.36, 1] as const;

const FASHION_INSPO = {
  href: "/fashion-inspo",
  label: "Fashion Inspo",
  children: [
    { href: "/fashion-inspo", label: "All Fashion Inspo" },
    { href: "/gallery/brides", label: "Delight's Brides" },
    { href: "/gallery/aso-ebi", label: "Aso Ebi Wears" },
    { href: "/gallery/boss-ladies", label: "Delight's Boss Ladies" },
    { href: "/gallery/soft-life", label: "Delight's Soft Life" },
  ],
};

const NAV_AFTER = [
  { href: "/gallery", label: "Gallery" },
  { href: "/our-story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileInspoOpen, setMobileInspoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openCheckout } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 140);
  }

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
          {/* Fashion Inspo with dropdown */}
          <div className="relative" onMouseEnter={openDropdown} onMouseLeave={scheduleClose}>
            <Link
              href={FASHION_INSPO.href}
              className="flex items-center gap-1.5 text-sm font-medium text-navy hover:text-crimson transition-colors tracking-cta py-2"
            >
              {FASHION_INSPO.label}
              <motion.svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                <path d="M2.5 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </Link>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18, ease: easing }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-60"
                >
                  <div className="bg-cream rounded-md shadow-modal border border-charcoal/10 overflow-hidden py-2">
                    {FASHION_INSPO.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-5 py-3 text-sm font-medium text-navy hover:bg-cream-deep hover:text-crimson transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_AFTER.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy hover:text-crimson transition-colors tracking-cta"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <CartButton tone="navy" />
          <button
            type="button"
            onClick={() => openCheckout({ intent: "consult", source: "nav" })}
            className="btn btn-primary px-6 py-3 text-sm min-h-[44px]"
          >
            Book a Consult
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <CartButton tone="navy" />
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex flex-col items-center justify-center w-12 h-12 gap-1.5 rounded-sm"
          >
            <span className={cx("block w-6 h-0.5 bg-navy transition-transform", mobileOpen && "translate-y-2 rotate-45")} />
            <span className={cx("block w-6 h-0.5 bg-navy transition-opacity", mobileOpen && "opacity-0")} />
            <span className={cx("block w-6 h-0.5 bg-navy transition-transform", mobileOpen && "-translate-y-2 -rotate-45")} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden bg-cream border-t border-charcoal/10 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easing }}
          >
            <nav className="container-site py-6 flex flex-col gap-1">
              {/* Fashion Inspo accordion */}
              <button
                type="button"
                onClick={() => setMobileInspoOpen((v) => !v)}
                className="flex items-center justify-between font-display text-2xl text-navy py-3 border-b border-charcoal/10"
              >
                {FASHION_INSPO.label}
                <motion.span animate={{ rotate: mobileInspoOpen ? 45 : 0 }} className="text-crimson text-2xl leading-none">
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {mobileInspoOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: easing }}
                    className="overflow-hidden"
                  >
                    {FASHION_INSPO.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block font-body text-base text-charcoal/80 py-2.5 pl-4 border-b border-charcoal/5 hover:text-crimson"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {NAV_AFTER.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-2xl text-navy py-3 border-b border-charcoal/10 hover:text-crimson transition-colors"
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
