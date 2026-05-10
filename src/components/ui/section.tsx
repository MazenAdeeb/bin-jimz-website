import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Section({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section
      {...props}
      className={cn("relative w-full px-6 py-24 md:px-10 md:py-32", className)}
    >
      <div className="mx-auto max-w-[1320px]">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-display flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase",
        className,
      )}
      style={{ color: "var(--color-gold)" }}
    >
      <span
        className="block h-px w-10"
        style={{ background: "var(--color-gold)" }}
      />
      {children}
    </div>
  );
}

export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "font-display text-balance text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-[5.25rem]",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-balance text-4xl leading-tight md:text-5xl lg:text-6xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("font-display text-2xl md:text-3xl", className)}>
      {children}
    </h3>
  );
}

export function Lead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn("max-w-2xl text-lg leading-relaxed md:text-xl", className)}
      style={{ color: "var(--color-text-dim)" }}
    >
      {children}
    </p>
  );
}
