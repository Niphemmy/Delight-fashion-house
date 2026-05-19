"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cx } from "@/lib/utils";

/**
 * Lightweight scroll reveal. A one-shot IntersectionObserver toggles a class;
 * the fade-up itself is a plain CSS transition (GPU composited). No animation
 * library on the scroll path, so it stays smooth on mid-range phones.
 */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shown]);
  return { ref, shown };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** accepted for API compatibility; layout no longer changes the tag */
  as?: ElementType;
  amount?: number;
  once?: boolean;
  y?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={cx("dl-reveal", shown && "dl-reveal-in", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  once?: boolean;
}

export function RevealStagger({ children, className }: StaggerProps) {
  const { ref, shown } = useReveal();
  return (
    <div ref={ref} className={cx("dl-stagger", shown && "dl-stagger-in", className)}>
      {children}
    </div>
  );
}

interface ItemProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  y?: number;
}

export function RevealItem({ children, className, as: Tag = "div" }: ItemProps) {
  return <Tag className={cx("dl-stagger-item", className)}>{children}</Tag>;
}
