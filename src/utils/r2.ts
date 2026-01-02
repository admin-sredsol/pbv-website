import "dotenv/config";
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`.replace(
  /\/$/,
  "",
);

const client = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

/**
 * List files in a Cloudflare R2 bucket under a given prefix.
 * For each file, generate a signed URL for private access.
 * @param bucket - The R2 bucket name.
 * @param prefix - The prefix/folder to list (e.g., "photos/" or "videos/").
 * @returns Array of objects: { key, url }
 */
export async function listR2Files(
  bucket: string,
  prefix = "",
): Promise<{ key: string; url: string }[]> {
  const command = new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix });
  const { Contents } = await client.send(command);
  if (!Contents) return [];
  return await Promise.all(
    Contents.filter((obj) => !!obj.Key && !obj.Key.endsWith("/")).map(
      async (obj) => {
        const getObjectCommand = new GetObjectCommand({
          Bucket: bucket,
          Key: obj.Key,
        });
        const url = await getSignedUrl(client, getObjectCommand, {
          expiresIn: 3600,
        }); // 1 hour expiry
        return {
          key: obj.Key!,
          url,
        };
      },
    ),
  );
}

/**
 * List album "folders" (prefixes) in a Cloudflare R2 bucket.
 * @param bucket - The R2 bucket name.
 * @param prefix - The prefix to list albums under (e.g., "albums/").
 * @returns Array of album prefixes (e.g., ["albums/vacation2024/", ...])
 */
export async function listR2Albums(
  bucket: string,
  prefix = "",
): Promise<string[]> {
  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: prefix,
    Delimiter: "/",
  });
  const { CommonPrefixes } = await client.send(command);
  return (CommonPrefixes || []).map((cp) => cp.Prefix!);
}

/**
 * List files in a specific album (folder) in a Cloudflare R2 bucket.
 * @param bucket - The R2 bucket name.
 * @param albumPrefix - The album prefix/folder (e.g., "albums/vacation2024/").
 * @returns Array of objects: { key, url }
 */
export async function listR2AlbumFiles(
  bucket: string,
  albumPrefix: string,
): Promise<{ key: string; url: string }[]> {
  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: albumPrefix,
  });
  const { Contents } = await client.send(command);
  if (!Contents) return [];
  return await Promise.all(
    Contents.filter((obj) => !!obj.Key && !obj.Key.endsWith("/")).map(
      async (obj) => {
        const getObjectCommand = new GetObjectCommand({
          Bucket: bucket,
          Key: obj.Key,
        });
        const url = await getSignedUrl(client, getObjectCommand, {
          expiresIn: 3600,
        });
        return { key: obj.Key!, url };
      },
    ),
  );
}

/**
 * Get the cover image for an album (the first file in the album).
 * @param bucket - The R2 bucket name.
 * @param albumPrefix - The album prefix/folder (e.g., "albums/vacation2024/").
 * @returns The first file's { key, url } or null if album is empty.
 */
/**
 * Generate a signed URL for a specific object in R2.
 * This helper centralizes signed URL creation and sets a sensible default expiry.
 *
 * @param bucket - R2 bucket name
 * @param key - Object key within the bucket
 * @param expiresIn - Signed URL expiry in seconds (default: 3600)
 * @returns A signed URL string that can be used client-side
 */
export async function getR2SignedUrl(
  bucket: string,
  key: string,
  expiresIn = 3600,
): Promise<string> {
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  return await getSignedUrl(client, getObjectCommand, {
    expiresIn,
  });
}

/**
 * Get the cover image for an album (the first file in the album).
 * @param bucket - The R2 bucket name.
 * @param albumPrefix - The album prefix/folder (e.g., "albums/vacation2024/").
 * @returns The first file's { key, url } or null if album is empty.
 */
export async function getAlbumCover(
  bucket: string,
  albumPrefix: string,
): Promise<{ key: string; url: string } | null> {
  const files = await listR2AlbumFiles(bucket, albumPrefix);
  return files.length > 0 ? files[0] : null;
}
