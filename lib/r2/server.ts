import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createStorageClient } from "./storage";

export function getStorage() {
  const { env } = getCloudflareContext();
  if (!env.FILES) throw new Error("Thiếu binding FILES. Kiểm tra r2_buckets trong wrangler.jsonc.");
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://tuhoccongnghe.vn";
  return createStorageClient(env.FILES, base);
}
