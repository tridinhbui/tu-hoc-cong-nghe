import path from "node:path";

/**
 * Đọc một tệp dữ liệu bài học đã sinh (lessons-data/*, lessons-i18n/*).
 *
 * Hai nguồn, thử theo thứ tự:
 *   1. Hệ tệp - dev, test, `next build`: chạy trên Node nên đọc thẳng
 *      lib/<rel>.
 *   2. Static assets của Cloudflare - production. Workers không có hệ tệp, và
 *      trước đây đường này lặng lẽ rơi về `import("./lessons")`, kéo cả kho bài
 *      (~23 MB, bị đóng gói hai lần) vào gói worker: 87 MB so với giới hạn
 *      64 MiB, nên bản có 1.503 bài không deploy được. Dữ liệu nằm ở
 *      public/lesson-files/ (scripts/publish-lesson-files.mjs), không tính vào
 *      kích thước worker.
 *
 * Trả về null khi cả hai nguồn đều không có - người gọi tự quyết rơi về đâu.
 */
export async function readLessonFile(rel: string): Promise<string | null> {
  try {
    const { readFile } = await import("node:fs/promises");
    return await readFile(path.join(process.cwd(), "lib", rel), "utf8");
  } catch {
    // Không có hệ tệp (Workers) hoặc tệp chưa sinh - thử assets.
  }
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const assets = getCloudflareContext().env.ASSETS;
    if (!assets) return null;
    const res = await assets.fetch(`https://assets.local/lesson-files/${rel}`);
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
}
