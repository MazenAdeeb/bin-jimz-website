"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type CursorVariant =
  | "default"
  | "hover"
  | "view"
  | "drag"
  | "talk"
  | "read"
  | "loading";

export type CursorState = {
  variant: CursorVariant;
  label?: string;
};

type CursorContextValue = {
  state: CursorState;
  setVariant: (variant: CursorVariant, label?: string) => void;
  reset: () => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CursorState>({ variant: "default" });

  const setVariant = useCallback((variant: CursorVariant, label?: string) => {
    setState({ variant, label });
  }, []);

  const reset = useCallback(() => setState({ variant: "default" }), []);

  const value = useMemo(
    () => ({ state, setVariant, reset }),
    [state, setVariant, reset],
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}
