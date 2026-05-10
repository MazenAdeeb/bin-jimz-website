import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { deleteFromBlob, blobConfigured } from "@/lib/blob";
import { AdminPageHeader } from "@/components/admin/page-header";
import { MediaUploader } from "@/components/admin/media-uploader";
import { MediaCard } from "@/components/admin/media-card";

async function deleteAsset(id: string) {
  "use server";
  const asset = await prisma.mediaAsset.findUnique({ where: { id } });
  if (!asset) return;
  try {
    if (blobConfigured) await deleteFromBlob(asset.url);
  } catch {}
  await prisma.mediaAsset.delete({ where: { id } });
  revalidatePath("/admin/media");
}

export default async function MediaPage() {
  let assets: Awaited<ReturnType<typeof prisma.mediaAsset.findMany>> = [];
  try {
    assets = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
  } catch {}

  return (
    <>
      <AdminPageHeader
        title="Media library"
        subtitle={`${assets.length} files · stored on Vercel Blob`}
      />

      {!blobConfigured && (
        <div
          className="mt-6 rounded-md border p-4 text-sm"
          style={{
            borderColor: "rgba(200,169,106,0.3)",
            background: "rgba(200,169,106,0.06)",
            color: "var(--color-gold-soft)",
          }}
        >
          <strong className="font-display tracking-[0.18em] uppercase">
            Blob storage not yet enabled.
          </strong>
          <p className="mt-2 text-[var(--color-text-dim)]">
            On Vercel, open this project → <em>Storage</em> tab → <em>Create Database</em> → choose <em>Blob</em> → Connect. Vercel will automatically add{" "}
            <code className="text-[var(--color-gold)]">BLOB_READ_WRITE_TOKEN</code> to your env. Then redeploy.
          </p>
        </div>
      )}

      <div className="mt-6">
        <MediaUploader />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {assets.map((a) => (
          <MediaCard
            key={a.id}
            asset={a}
            onDelete={async (id) => {
              "use server";
              await deleteAsset(id);
            }}
          />
        ))}
        {assets.length === 0 && (
          <p
            className="col-span-full py-12 text-center text-sm"
            style={{ color: "var(--color-text-mute)" }}
          >
            No files yet. Drop images or videos above.
          </p>
        )}
      </div>
    </>
  );
}
