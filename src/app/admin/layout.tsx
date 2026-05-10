export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[var(--color-base)] text-[var(--color-text)]">{children}</div>;
}
