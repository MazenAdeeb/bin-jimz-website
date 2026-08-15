"use client";

import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

type Props = {
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
};

export function EcommerceBanner({ eyebrow, title, desc, cta, href }: Props) {
  return (
    <Section className="!py-10">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-xl px-7 py-10 md:px-14 md:py-14"
          style={{
            background:
              "linear-gradient(115deg, #8c7345 0%, #c8a96a 42%, #e6cf9c 55%, #c8a96a 68%, #8c7345 100%)",
            boxShadow: "0 24px 70px -24px rgba(200,169,106,0.55)",
          }}
        >
          {/* oversized translucent glyph on the trailing edge */}
          <ShoppingBag
            className="pointer-events-none absolute -top-8 -end-8 opacity-[0.12]"
            style={{ color: "#0b0b0c" }}
            size={240}
            strokeWidth={1}
          />

          <div className="relative z-10 max-w-2xl">
            <p
              className="font-display text-[11px] tracking-[0.34em] uppercase"
              style={{ color: "rgba(11,11,12,0.72)" }}
            >
              {eyebrow}
            </p>
            <h2
              className="font-display mt-4 text-3xl leading-[1.05] md:text-5xl"
              style={{ color: "#0b0b0c" }}
            >
              {title}
            </h2>
            <p
              className="mt-5 max-w-xl text-sm leading-relaxed md:text-base"
              style={{ color: "rgba(11,11,12,0.82)" }}
            >
              {desc}
            </p>
            <Link href={href} className="mt-8 inline-flex">
              <span
                className="font-display inline-flex items-center gap-2 rounded-full px-7 py-3 text-[11px] tracking-[0.22em] uppercase transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: "#0b0b0c", color: "var(--color-gold-soft)" }}
              >
                {cta}
                <ArrowRight size={14} className="rtl:-scale-x-100" />
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
