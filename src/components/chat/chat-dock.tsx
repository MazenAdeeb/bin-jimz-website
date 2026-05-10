"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, X } from "lucide-react";
import { ChatPanel } from "./chat-panel";
import { useCursor } from "@/components/cursor/cursor-context";

export function ChatDock() {
  const t = useTranslations("chat");
  const [open, setOpen] = useState(false);
  const { setVariant, reset } = useCursor();

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] md:bottom-8 md:right-8">
        <button
          onClick={() => setOpen((o) => !o)}
          onPointerEnter={() => setVariant("talk")}
          onPointerLeave={reset}
          aria-label={open ? t("close") : t("open")}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
          style={{
            background:
              "linear-gradient(135deg, #8c7345 0%, #c8a96a 50%, #e6cf9c 100%)",
            boxShadow: "0 12px 40px -8px rgba(200, 169, 106, 0.5)",
          }}
        >
          <span
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: "0 0 0 0 rgba(27, 156, 252, 0.5)",
              animation: "pulseRing 2.4s ease-out infinite",
            }}
          />
          {open ? (
            <X size={22} className="text-[var(--color-base)]" />
          ) : (
            <MessageCircle size={22} className="text-[var(--color-base)]" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[60] w-[min(92vw,400px)] md:bottom-28 md:right-8 md:w-[420px]"
          >
            <ChatPanel onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
