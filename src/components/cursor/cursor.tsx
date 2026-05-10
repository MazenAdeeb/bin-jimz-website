"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useCursor } from "./cursor-context";

export function Cursor() {
  const { state } = useCursor();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const ringSpring = useSpring(0, { damping: 22, stiffness: 220 });

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    if (!supportsHover) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  useEffect(() => {
    const sizes: Record<string, number> = {
      default: 28,
      hover: 56,
      view: 88,
      drag: 64,
      talk: 64,
      read: 36,
      loading: 40,
    };
    ringSpring.set(sizes[state.variant] ?? 28);
  }, [state.variant, ringSpring]);

  if (!enabled) return null;

  const colorByVariant: Record<string, string> = {
    default: "var(--color-gold)",
    hover: "var(--color-gold-soft)",
    view: "var(--color-gold)",
    drag: "var(--color-gold)",
    talk: "var(--color-cyber)",
    read: "var(--color-gold-soft)",
    loading: "var(--color-gold)",
  };

  const ringColor = colorByVariant[state.variant];
  const isView = state.variant === "view";
  const isTalk = state.variant === "talk";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSpring,
          height: ringSpring,
          borderColor: ringColor,
        }}
        className="absolute rounded-full border bg-transparent backdrop-blur-[2px] flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isView && (
            <motion.svg
              key="view"
              viewBox="0 0 100 100"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ rotate: { duration: 14, repeat: Infinity, ease: "linear" } }}
              className="absolute inset-0"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                />
              </defs>
              <text
                fill="var(--color-gold)"
                style={{ fontFamily: "Cinzel, serif", fontSize: 8, letterSpacing: 4 }}
              >
                <textPath href="#circlePath">VIEW · PROJECT · VIEW · PROJECT ·</textPath>
              </text>
            </motion.svg>
          )}
          {isTalk && (
            <motion.div
              key="talk"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(27,156,252,0.6), 0 0 32px -2px rgba(27,156,252,0.6)",
              }}
            />
          )}
          {state.label && (state.variant === "hover" || state.variant === "drag") && (
            <motion.span
              key={state.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-display text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--color-gold)" }}
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: ringColor,
        }}
        className="absolute h-1.5 w-1.5 rounded-full"
      />
    </div>
  );
}
