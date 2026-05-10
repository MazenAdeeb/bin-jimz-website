import { AdminPageHeader } from "@/components/admin/page-header";

export default function SettingsPage() {
  const items = [
    { k: "Site URL", v: process.env.NEXT_PUBLIC_SITE_URL ?? "—" },
    { k: "Site name", v: process.env.NEXT_PUBLIC_SITE_NAME ?? "—" },
    { k: "AWS region", v: process.env.AWS_REGION ?? "—" },
    { k: "S3 media bucket", v: process.env.S3_BUCKET_MEDIA ?? "—" },
    { k: "CDN URL", v: process.env.NEXT_PUBLIC_CDN_URL ?? "—" },
    { k: "From email", v: process.env.SES_FROM_EMAIL ?? "—" },
    { k: "Sales email", v: process.env.SES_SALES_EMAIL ?? "—" },
    { k: "Cognito issuer", v: process.env.COGNITO_ISSUER ? "configured" : "—" },
    { k: "OpenAI", v: process.env.OPENAI_API_KEY ? "configured" : "—" },
  ];

  return (
    <>
      <AdminPageHeader title="Settings" subtitle="Read-only environment summary." />
      <div
        className="mt-8 overflow-hidden rounded-md border"
        style={{ borderColor: "rgba(200,169,106,0.18)" }}
      >
        <table className="w-full text-sm">
          <tbody>
            {items.map((i) => (
              <tr key={i.k} className="border-t border-white/5 first:border-t-0">
                <td
                  className="w-1/3 px-4 py-3 text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: "var(--color-gold)" }}
                >
                  {i.k}
                </td>
                <td className="px-4 py-3" style={{ color: "var(--color-text-dim)" }}>
                  {i.v}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
