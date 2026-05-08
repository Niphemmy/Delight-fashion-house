import type { Config } from "tailwindcss";

/**
 * Brand palette derived from Beulah's actual brand assets.
 * Crimson red: from logo on cream business card.
 * Navy: from the jute tote and the building signage.
 * Cream: from the business card and atelier interiors.
 * Silver: from the silver-foil-on-black mockup.
 * Gold: kept as a secondary metallic for editorial accents.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./sanity/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: "#B91D1D",
          deep: "#8B1212",
          soft: "#D04545",
          ink: "#5A0808",
        },
        navy: {
          DEFAULT: "#1A2D5F",
          deep: "#0E1A3E",
          soft: "#2C4280",
        },
        cream: {
          DEFAULT: "#F5ECD7",
          warm: "#FAF4E4",
          deep: "#E8DCC0",
        },
        ivory: "#FFFCF5",
        silver: {
          DEFAULT: "#C0C0C0",
          warm: "#B8B0A0",
        },
        gold: {
          DEFAULT: "#C9A961",
          dark: "#A88841",
        },
        charcoal: "#1B1B1B",
        ink: "#0E0E0E",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
        narrow: "880px",
      },
      letterSpacing: {
        cta: "0.02em",
        eyebrow: "0.18em",
      },
      boxShadow: {
        card: "0 6px 32px -12px rgba(26, 45, 95, 0.18)",
        cardHover: "0 14px 48px -12px rgba(26, 45, 95, 0.28)",
        modal: "0 32px 80px -20px rgba(14, 14, 14, 0.45)",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
