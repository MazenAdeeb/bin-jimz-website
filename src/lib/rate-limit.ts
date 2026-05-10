type Bucket = { count: number; resetAt: number };
const store = new Map<string, Bucket>();

export function rateLimit(opts: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();
  const bucket = store.get(opts.key);
  if (!bucket || now > bucket.resetAt) {
    store.set(opts.key, { count: 1, resetAt: now + opts.windowMs });
    return { success: true, remaining: opts.limit - 1 };
  }
  if (bucket.count >= opts.limit) {
    return { success: false, remaining: 0, retryAfter: bucket.resetAt - now };
  }
  bucket.count += 1;
  return { success: true, remaining: opts.limit - bucket.count };
}
