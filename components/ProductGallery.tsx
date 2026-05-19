"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { cx } from "@/lib/utils";

const easing = [0.22, 1, 0.36, 1] as const;

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const gallery = images.length ? images : [];
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const multi = gallery.length > 1;

  function paginate(step: number) {
    setState(([i]) => [(i + step + gallery.length) % gallery.length, step]);
  }
  function goTo(target: number) {
    setState(([i]) => [target, target > i ? 1 : -1]);
  }
  function onDragEnd(_: unknown, info: PanInfo) {
    if (!multi) return;
    if (info.offset.x < -60) paginate(1);
    else if (info.offset.x > 60) paginate(-1);
  }

  if (!gallery.length) {
    return <div className="aspect-[4/5] rounded-md bg-cream-deep" />;
  }

  return (
    <div>
      <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-cream-deep shadow-modal select-none">
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d >= 0 ? "100%" : "-100%" }),
              center: { x: 0 },
              exit: (d: number) => ({ x: d >= 0 ? "-100%" : "100%" }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: easing }}
            drag={multi ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={onDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={gallery[index]}
              alt={`${title}, image ${index + 1} of ${gallery.length}`}
              fill
              sizes="(max-width: 1024px) 90vw, 600px"
              priority={index === 0}
              draggable={false}
              className="object-cover pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {multi && (
          <>
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/90 text-navy hover:bg-cream flex items-center justify-center shadow-card transition-colors z-10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/90 text-navy hover:bg-cream flex items-center justify-center shadow-card transition-colors z-10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={cx(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-6 bg-cream" : "w-1.5 bg-cream/55 hover:bg-cream/80"
                  )}
                />
              ))}
            </div>
            <div className="absolute top-3 right-3 bg-navy-deep/80 backdrop-blur text-cream text-[0.6875rem] font-medium px-2.5 py-1 rounded-full z-10">
              {index + 1} / {gallery.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {multi && (
        <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
          {gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
              className={cx(
                "relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 rounded-sm overflow-hidden transition-all",
                i === index ? "ring-2 ring-crimson" : "ring-1 ring-charcoal/15 opacity-70 hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
