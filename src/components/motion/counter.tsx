"use client";

import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  locale?: string;
};

export function Counter({ value, suffix = "", duration = 2, className, locale = "en" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (n) => {
    const fmt = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US");
    return fmt.format(Math.round(n));
  });

  useEffect(() => {
    if (inView) {
      const c = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] });
      return () => c.stop();
    }
  }, [inView, mv, value, duration]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
