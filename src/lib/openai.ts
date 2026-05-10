import OpenAI from "openai";

let _client: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (_client) return _client;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  _client = new OpenAI({ apiKey });
  return _client;
}

export const openai = new Proxy({} as OpenAI, {
  get(_target, prop, receiver) {
    return Reflect.get(getOpenAI(), prop, receiver);
  },
});

export const MODELS = {
  chat: process.env.OPENAI_CHAT_MODEL ?? "gpt-4o",
  embed: process.env.OPENAI_EMBED_MODEL ?? "text-embedding-3-small",
  tts: process.env.OPENAI_TTS_MODEL ?? "gpt-4o-mini-tts",
  stt: process.env.OPENAI_STT_MODEL ?? "whisper-1",
} as const;

export const isOpenAiConfigured = () => Boolean(process.env.OPENAI_API_KEY);
