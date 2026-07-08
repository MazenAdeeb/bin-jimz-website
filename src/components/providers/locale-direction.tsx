"use client";

import { useEffect } from "react";

// The root layout sets <html lang/dir> server-side for the first paint, but a
// client-side locale switch is a soft navigation that does not re-render the
// root layout. This keeps the document direction in sync on those transitions
// so the layout flips without a hard reload.
export function LocaleDirection({ locale }: { locale: string }) {
  useEffect(() => {
    const html = document.documentElement;
    const dir = locale === "ar" ? "rtl" : "ltr";
    if (html.lang !== locale) html.lang = locale;
    if (html.dir !== dir) html.dir = dir;
  }, [locale]);

  return null;
}
