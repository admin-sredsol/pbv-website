#!/usr/bin/env node
/**
 * pbv-website/src/utils/generate-pdf-titles.mjs
 *
 * Simple utility to list objects in a Cloudflare R2 bucket (S3-compatible)
 * and generate `src/data/pdf-titles.json` mapping keys/filenames -> humanized titles.
 *
 * Usage:
 *  R2_ACCOUNT_ID=... R2_ACCESS_KEY_ID=... R2_SECRET_ACCESS_KEY=... \
 *    node src/utils/generate-pdf-titles.mjs
 *
 * Optional env:
 *  R2_BUCKET (default: website-gallery)
 *  R2_PREFIX (default: mandatoryDocs/)
 *
 * Notes:
 *  - This script lists objects using the AWS SDK S3 ListObjectsV2Command.
 *  - It writes a JSON file with two keys per object: the full key, and the filename-only key.
 *  - Titles are generated with a small humanizer that turns underscores/dashes into spaces
 *    and sentence-cases the result. Edit the script if you want more advanced heuristics.
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import {
  S3Client,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET = process.env.R2_BUCKET || 'website-gallery';
const PREFIX = process.env.R2_PREFIX || 'mandatoryDocs/';

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error('Missing R2 credentials. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in the environment.');
  process.exit(1);
}

const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`.replace(/\/$/, '');

const client = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Simple humanizer: "2023_annual-report.pdf" -> "2023 annual report"
 * Keeps words separated by underscores/dashes and sentence-cases result.
 */
function simpleHumanize(fileName) {
  if (!fileName) return '';
  const name = fileName.replace(/\.[^/.]+$/, '');
  const spaced = name.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  const lower = spaced.toLowerCase();
  return lower.length ? lower.charAt(0).toUpperCase() + lower.slice(1) : '';
}

/**
 * List all object keys under a prefix using pagination.
 * Returns array of keys (strings).
 */
async function listAllKeys(bucket, prefix) {
  const keys = [];
  let ContinuationToken = undefined;

  while (true) {
    const cmd = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      ContinuationToken,
    });

    const resp = await client.send(cmd);
    const { Contents, IsTruncated, NextContinuationToken } = resp;
    if (Contents) {
      for (const obj of Contents) {
        if (obj.Key && !obj.Key.endsWith('/')) {
          keys.push(obj.Key);
        }
      }
    }
    if (!IsTruncated) break;
    ContinuationToken = NextContinuationToken;
  }

  return keys;
}

async function main() {
  try {
    console.log(`Listing objects in bucket="${BUCKET}" prefix="${PREFIX}"...`);
    const keys = await listAllKeys(BUCKET, PREFIX);
    console.log(`Found ${keys.length} objects.`);

    const mapping = {};

    for (const key of keys) {
      const fileName = key.split('/').pop();
      const title = simpleHumanize(fileName);
      // Prefer storing mapping by full key and filename-only (for convenience)
      mapping[key] = title;
      mapping[fileName] = title;
    }

    // Ensure output directory exists
    const outPath = path.resolve(process.cwd(), 'src', 'data', 'pdf-titles.json');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(mapping, null, 2) + '\n', 'utf8');

    console.log(`Wrote ${Object.keys(mapping).length} entries to ${outPath}`);
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

main();
