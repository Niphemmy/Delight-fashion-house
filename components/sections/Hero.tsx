"use client";

import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/components/ModalProvider";

export function Hero({ heroImage }: { heroImage: string }) {
  const { openCheckout } = useModal();

  return (
    <section className="relative bg-navy-deep text-cream overflow-hidden grain">
      <div className="container-site grid lg:grid-cols-2 items-center gap-10 lg:gap-20 py-14 lg:py-32 min-h-[calc(100svh-72px)] lg:min-h-0">
        <div className="relative z-10 order-2 lg:order-1">
          <p className="eyebrow text-gold mb-5">Lagos · Est. 2016</p>
          <h1 className="display-1 text-cream mb-6">
            The woman they{" "}
            <em className="font-display italic text-gold font-medium">remember</em> wears Dé-light.
          </h1>
          <p className="body-lead text-cream-warm/85 max-w-xl mb-9">
            Ten years dressing Lagos executives, brides, and the women who walk into rooms and change them.
            Six hundred thousand women save these looks every month. Yours could be next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-9">
            <button
              type="button"
              onClick={() => openCheckout({ intent: "consult", source: "hero" })}
              className="btn btn-primary w-full sm:w-auto"
            >
              Book Your Style Consult on WhatsApp
            </button>
            <Link href="/fashion-inspo" className="btn-link text-cream hover:text-gold">
              Browse Fashion Inspo
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="text-xs uppercase tracking-eyebrow text-gold font-bold">
            Trusted by executives, brides, and the women who lead.
          </div>
        </div>

        <div className="relative order-1 lg:order-2 aspect-[4/5] lg:aspect-[5/6] max-w-[520px] w-full mx-auto rounded-md overflow-hidden shadow-modal">
          <Image
            src={heroImage}
            alt="A Dé-light look on a real client"
            fill
            sizes="(max-width: 1024px) 90vw, 520px"
            priority
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-auto bg-navy-deep/85 backdrop-blur text-gold text-[0.6875rem] uppercase tracking-eyebrow font-bold px-3 py-2 rounded-sm">
            Editorial · SS 2026
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-crimson/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
      </div>
    </section>
  );
}
