import { AdminPageHeader } from "@/components/admin/page-header";

export default function MediaPage() {
  return (
    <>
      <AdminPageHeader title="Media library" subtitle="Images, documents and videos." />
      <p className="mt-6 text-sm" style={{ color: "var(--color-text-dim)" }}>
        Files are stored in <code className="text-[var(--color-gold)]">S3</code>{" "}
        ({process.env.S3_BUCKET_MEDIA ?? "binjimz-media-*"}) and served via CloudFront.
        Use the <code className="text-[var(--color-gold)]">presignUpload</code> helper or the
        upload widget on each entity (projects, news, team) to add new assets.
      </p>
    </>
  );
}
