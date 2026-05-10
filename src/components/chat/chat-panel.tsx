"use client";

import { useTranslations, useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { cn, uid } from "@/lib/utils";

type Msg = { id: string; role: "user" | "assistant"; content: string };

export function ChatPanel({
  onClose,
  fullScreen = false,
}: {
  onClose?: () => void;
  fullScreen?: boolean;
}) {
  const t = useTranslations("chat");
  const locale = useLocale();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [recording, setRecording] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || busy) return;
      const userMsg: Msg = { id: uid("m"), role: "user", content: trimmed };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setBusy(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            locale,
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
        if (!res.ok || !res.body) throw new Error("chat-failed");
        const newSessionId = res.headers.get("x-session-id");
        if (newSessionId && !sessionId) setSessionId(newSessionId);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        const aId = uid("m");
        setMessages((m) => [...m, { id: aId, role: "assistant", content: "" }]);
        let full = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          full += chunk;
          setMessages((m) =>
            m.map((msg) => (msg.id === aId ? { ...msg, content: full } : msg)),
          );
        }
        if (voiceOn && full) speak(full);
      } catch {
        setMessages((m) => [
          ...m,
          {
            id: uid("m"),
            role: "assistant",
            content:
              locale === "ar"
                ? "تعذّر الاتصال بالخادم. يرجى المحاولة مرة أخرى."
                : "Sorry, I couldn't reach the server. Please try again.",
          },
        ]);
      } finally {
        setBusy(false);
      }
    },
    [busy, locale, messages, sessionId, voiceOn],
  );

  const speak = useCallback(async (text: string) => {
    try {
      const res = await fetch("/api/voice/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play().catch(() => {});
    } catch {}
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => chunksRef.current.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((tr) => tr.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const fd = new FormData();
        fd.append("audio", blob, "speech.webm");
        fd.append("locale", locale);
        try {
          const r = await fetch("/api/voice/transcribe", { method: "POST", body: fd });
          if (r.ok) {
            const { text } = await r.json();
            if (text) sendMessage(text);
          }
        } catch {}
      };
      mediaRecRef.current = rec;
      rec.start();
      setRecording(true);
    } catch {
      setRecording(false);
    }
  }, [locale, sendMessage]);

  const stopRecording = useCallback(() => {
    mediaRecRef.current?.stop();
    setRecording(false);
  }, []);

  const starters = [
    t("starter1"),
    t("starter2"),
    t("starter3"),
    t("starter4"),
  ];

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden border bg-[var(--color-surface-2)]/95 backdrop-blur-xl",
        fullScreen ? "h-full" : "h-[560px] rounded-lg",
      )}
      style={{
        borderColor: "rgba(200, 169, 106, 0.25)",
        boxShadow: "0 30px 80px -20px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div
        className="flex items-center justify-between border-b px-5 py-4"
        style={{ borderColor: "rgba(200, 169, 106, 0.18)" }}
      >
        <div>
          <p className="font-display text-[12px] tracking-[0.22em] uppercase gold-text">
            {t("title")}
          </p>
          <p className="mt-0.5 text-xs" style={{ color: "var(--color-text-mute)" }}>
            {t("subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setVoiceOn((v) => !v)}
            className="rounded-full p-2 transition-colors hover:bg-white/5"
            aria-label="Toggle voice replies"
            style={{ color: voiceOn ? "var(--color-cyber)" : "var(--color-text-mute)" }}
          >
            {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-full px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-mute)] hover:text-[var(--color-gold)]"
            >
              {t("close")}
            </button>
          )}
        </div>
      </div>

      <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm" style={{ color: "var(--color-text-dim)" }}>
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap gap-2">
              {starters.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full border px-3 py-1.5 text-[11px] transition-colors hover:bg-white/5"
                  style={{
                    borderColor: "rgba(200, 169, 106, 0.3)",
                    color: "var(--color-text-dim)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[88%] whitespace-pre-wrap rounded-lg px-4 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "text-[var(--color-base)]"
                  : "border text-[var(--color-text)]",
              )}
              style={
                m.role === "user"
                  ? { background: "var(--color-gold)" }
                  : {
                      background: "rgba(255,255,255,0.02)",
                      borderColor: "rgba(200, 169, 106, 0.15)",
                    }
              }
            >
              {m.content || (m.role === "assistant" && busy ? "…" : "")}
            </div>
          </motion.div>
        ))}
        {busy && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="text-xs italic" style={{ color: "var(--color-text-mute)" }}>
            {t("thinking")}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-end gap-2 border-t px-4 py-3"
        style={{ borderColor: "rgba(200, 169, 106, 0.18)" }}
      >
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            startRecording();
          }}
          onPointerUp={stopRecording}
          onPointerLeave={() => recording && stopRecording()}
          aria-label={recording ? t("voiceStop") : t("voiceStart")}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors",
            recording ? "cyber-glow" : "",
          )}
          style={{
            borderColor: recording
              ? "var(--color-cyber)"
              : "rgba(200, 169, 106, 0.3)",
            color: recording ? "var(--color-cyber)" : "var(--color-text-dim)",
          }}
        >
          {recording ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          placeholder={t("placeholder")}
          rows={1}
          className="min-h-[40px] flex-1 resize-none rounded-md border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-[var(--color-text-mute)] focus:border-[var(--color-gold)]"
          style={{ borderColor: "rgba(200, 169, 106, 0.18)" }}
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label={t("send")}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--color-base)] transition-opacity disabled:opacity-40"
          style={{ background: "var(--color-gold)" }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
