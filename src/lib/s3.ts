import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION ?? "us-east-1";
export const s3 = new S3Client({ region });

const cdn = process.env.NEXT_PUBLIC_CDN_URL ?? "";

export function publicUrl(bucket: string, key: string) {
  if (cdn) return `${cdn}/${key}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export async function presignUpload(params: {
  bucket: string;
  key: string;
  contentType: string;
  expiresIn?: number;
}) {
  const cmd = new PutObjectCommand({
    Bucket: params.bucket,
    Key: params.key,
    ContentType: params.contentType,
  });
  const url = await getSignedUrl(s3, cmd, {
    expiresIn: params.expiresIn ?? 60 * 5,
  });
  return { url, publicUrl: publicUrl(params.bucket, params.key) };
}

export async function deleteObject(bucket: string, key: string) {
  return s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}
