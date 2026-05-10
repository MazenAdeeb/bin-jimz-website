"use client";

import { useCursor, type CursorVariant } from "./cursor-context";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant: CursorVariant;
  label?: string;
  className?: string;
};

export function HoverArea({ children, variant, label, className }: Props) {
  const { setVariant, reset } = useCursor();
  return (
    <div
      onPointerEnter={() => setVariant(variant, label)}
      onPointerLeave={reset}
      className={className}
    >
      {children}
    </div>
  );
}
