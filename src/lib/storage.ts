import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "avif", "gif"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ENDPOINT &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET &&
      process.env.R2_PUBLIC_URL
  );
}

export function isValidImageFile(file: File): { ok: boolean; error?: string } {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return { ok: false, error: "Unsupported file type." };
  }
  if (file.size > MAX_SIZE_BYTES) {
    return { ok: false, error: "File must be smaller than 10 MB." };
  }
  return { ok: true };
}

export async function saveUpload(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
  const key = `uploads/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (isR2Configured()) {
    const client = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: key,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      })
    );
    return `${process.env.R2_PUBLIC_URL}/${key}`;
  }

  const dir = join(process.cwd(), "public", "uploads");
  mkdirSync(dir, { recursive: true });
  const filename = key.split("/").pop()!;
  writeFileSync(join(dir, filename), buffer);
  return `/uploads/${filename}`;
}