export function AdminPageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 border-b pb-6"
            style={{ borderColor: "rgba(200,169,106,0.15)" }}>
      <div>
        <p
          className="font-display text-[10px] tracking-[0.32em] uppercase"
          style={{ color: "var(--color-gold)" }}
        >
          ADMIN
        </p>
        <h1 className="font-display mt-2 text-3xl">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-dim)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
}
