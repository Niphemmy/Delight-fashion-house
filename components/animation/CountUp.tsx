"use client";

import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function CountUp({
  to,
  from = 0,
  duration = 2.2,
  format = (n: number) => n.toLocaleString("en-US"),
  className,
  suffix,
}: {
  to: number;
  from?: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const value = useMotionValue(from);
  const formatted = useTransform(value, (latest) => format(Math.round(latest)));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, duration, value]);

  // Render the live formatted value via a tiny mounted updater
  return (
    <span ref={ref} className={className}>
      <CountValue value={formatted} />
      {suffix}
    </span>
  );
}

import { motion, type MotionValue } from "framer-motion";

function CountValue({ value }: { value: MotionValue<string> }) {
  return <motion.span>{value}</motion.span>;
}
