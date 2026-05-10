"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useCursor, type CursorVariant } from "./cursor-context";

type Props = {
  children: ReactNode;
  variant?: CursorVariant;
  label?: string;
  strength?: number;
  className?: string;
  as?: "div" | "span" | "button";
};

export function Magnetic({
  children,
  variant = "hover",
  label,
  strength = 0.25,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { setVariant, reset } = useCursor();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 220 });
  const sy = useSpring(y, { damping: 18, stiffness: 220 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
    reset();
  };

  return (
    <motion.div
      ref={ref}
      onPointerEnter={() => setVariant(variant, label)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
