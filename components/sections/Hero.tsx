"use client";

import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/components/ModalProvider";
import { Reveal } from "@/components/animation/Reveal";

export function Hero({ heroImage }: { heroImage: string }) {
  const { openCheckout } = useModal();

  return (
    <section className="relative bg-navy-deep text-cream overflow-hidden grain">
      <div className="container-site grid lg:grid-cols-2 items-center gap-10 lg:gap-20 py-14 lg:py-32 min-h-[calc(100svh-72px)] lg:min-h-0">
        <div className="relative z-10 order-2 lg:order-1">
          <Reveal delay={0.04}>
            <p className="eyebrow text-gold mb-5 inline-flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
              Lagos · Est. 2016
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-1 text-cream mb-6">
              The woman they{" "}
              <em className="font-display italic text-gold font-medium">remember</em> wears Dé-light.
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="body-lead text-cream-warm/85 max-w-xl mb-9">
              Ten years dressing Lagos executives, brides, and the women who walk into rooms and change them.
              Six hundred thousand women save these looks every month. Yours could be next.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-col sm:flex-row gap-4 mb-9">
              <button
                type="button"
                onClick={() => openCheckout({ intent: "consult", source: "hero" })}
                className="btn btn-primary btn-shine btn-attention w-full sm:w-auto group"
              >
                Book Your Style Consult on WhatsApp
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <Link
                href="/fashion-inspo"
                className="btn btn-ghost-cream w-full sm:w-auto group"
              >
                Browse Fashion Inspo
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex items-center gap-3.5 text-[0.6875rem] sm:text-xs uppercase tracking-[0.2em] text-gold font-bold">
              <span className="h-px w-8 sm:w-10 bg-gold/55" aria-hidden="true" />
              <span>Trusted by executives, brides, and the women who lead.</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] lg:aspect-[5/6] max-w-[520px] w-full mx-auto rounded-md overflow-hidden shadow-modal ring-1 ring-gold/15">
            <Image
              src={heroImage}
              alt="A Dé-light look on a real client"
              fill
              sizes="(max-width: 1024px) 90vw, 520px"
              priority
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/55 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-auto bg-navy-deep/85 backdrop-blur text-gold text-[0.6875rem] uppercase tracking-eyebrow font-bold px-3 py-2 rounded-sm">
              Editorial · SS 2026
            </div>
          </div>
        </Reveal>
      </div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-crimson/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-gold/12 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-navy/40 blur-3xl opacity-60" />
      </div>
    </section>
  );
}
