"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useModal } from "@/components/ModalProvider";

export function Hero({ heroImage }: { heroImage: string }) {
  const { openCheckout } = useModal();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const easing = [0.22, 1, 0.36, 1] as const;

  return (
    <section ref={sectionRef} className="relative bg-navy-deep text-cream overflow-hidden grain">
      <div className="container-site grid lg:grid-cols-2 items-center gap-10 lg:gap-20 py-14 lg:py-32 min-h-[calc(100svh-72px)] lg:min-h-0">
        <motion.div
          className="relative z-10 order-2 lg:order-1"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          <motion.p
            className="eyebrow text-gold mb-5"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
            }}
          >
            Lagos · Est. 2016
          </motion.p>

          <motion.h1
            className="display-1 text-cream mb-6"
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easing } },
            }}
          >
            The woman they{" "}
            <motion.em
              className="font-display italic text-gold font-medium inline-block"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: easing }}
            >
              remember
            </motion.em>{" "}
            wears Dé-light.
          </motion.h1>

          <motion.p
            className="body-lead text-cream-warm/85 max-w-xl mb-9"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easing } },
            }}
          >
            Ten years dressing Lagos executives, brides, and the women who walk into rooms and change them.
            Six hundred thousand women save these looks every month. Yours could be next.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:items-center mb-9"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
            }}
          >
            <motion.button
              type="button"
              onClick={() => openCheckout({ intent: "consult", source: "hero" })}
              className="btn btn-primary w-full sm:w-auto"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Book Your Style Consult on WhatsApp
            </motion.button>
            <Link href="/fashion-inspo" className="btn-link text-cream hover:text-gold group">
              Browse Fashion Inspo
              <motion.span
                aria-hidden="true"
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>

          <motion.div
            className="text-xs uppercase tracking-eyebrow text-gold font-bold"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.7, ease: easing } },
            }}
          >
            Trusted by executives, brides, and the women who lead.
          </motion.div>
        </motion.div>

        <motion.div
          className="relative order-1 lg:order-2 aspect-[4/5] lg:aspect-[5/6] max-w-[520px] w-full mx-auto rounded-md overflow-hidden shadow-modal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: easing, delay: 0.1 }}
          style={{ y: imageY }}
        >
          <Image
            src={heroImage}
            alt="A Dé-light look on a real client"
            fill
            sizes="(max-width: 1024px) 90vw, 520px"
            priority
            className="object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent"
            style={{ opacity: overlayOpacity }}
          />
          <motion.div
            className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-auto bg-navy-deep/85 backdrop-blur text-gold text-[0.6875rem] uppercase tracking-eyebrow font-bold px-3 py-2 rounded-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing, delay: 0.9 }}
          >
            Editorial · SS 2026
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-crimson/15 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
    </section>
  );
}
