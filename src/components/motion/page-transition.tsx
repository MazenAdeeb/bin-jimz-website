"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showSweep, setShowSweep] = useState(false);
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    if (pathname === key) return;
    setShowSweep(true);
    const t = setTimeout(() => {
      setKey(pathname);
      setShowSweep(false);
    }, 480);
    return () => clearTimeout(t);
  }, [pathname, key]);

  return (
    <>
      <AnimatePresence>
        {showSweep && (
          <motion.div
            key="sweep"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[8000] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, #8c7345 0%, #c8a96a 35%, #e6cf9c 50%, #c8a96a 65%, #8c7345 100%)",
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
