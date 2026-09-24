import "server-only";
import type { R2Bucket } from "@cloudflare/workers-types";

/**
 * Client lưu trữ tệp, nhại một phần bề mặt `supabase.storage.from(bucket)`.
 * Thay ba bucket Supabase Storage: documents, avatars, chat-images.
 *
 * MỘT BUCKET R2, BA TIỀN TỐ. wrangler.jsonc chỉ khai một binding "FILES" -
 * điều đó đã có sẵn trong bản nháp giai đoạn 1 trước khi tôi chạm vào, và nó
 * đúng: ba bucket Supabase khác nhau chỉ khác nhau ở chính sách RLS
 * (public-read, authenticated-write ở CẢ BA), không khác gì về hạ tầng. Một
 * bucket R2 với khoá `documents/…`, `avatars/…`, `chat-images/…` cho đúng
 * hiệu quả mà không phải quản ba binding.
 *
 * KHÔNG CÓ URL CÔNG KHAI TỰ ĐỘNG. Supabase cấp domain công khai cho mỗi
 * bucket; R2 thì không, trừ khi gắn domain riêng hoặc bật r2.dev. URL trả về
 * ở đây trỏ vào /api/files/<khoá>, một route đọc thẳng từ R2 - xem
 * app/api/files/[...path]/route.ts. Route ấy chỉ phục vụ những khoá đã ghi
 * qua module này, nên không có gì phải xác thực ở route đọc: ba bucket gốc
 * đều public-read.
 *
 * GHI VẪN PHẢI GÁC QUYỀN TRONG MÃ ỨNG DỤNG, giống D1. Không có RLS nào chặn
 * người dùng A ghi vào thư mục của người dùng B; ba route gọi module này
 * (app/api/uploads/*) tự kiểm quyền sở hữu trước khi gọi put().
 */

export class R2StorageError extends Error {}

function publicUrl(base: string, key: string): string {
  return `${base}/api/files/${key}`;
}

export function createStorageClient(bucket: R2Bucket, publicBase: string) {
  return {
    from(prefix: string) {
      return {
        /** Ghi một tệp. `path` không mang tiền tố bucket - hàm này tự thêm. */
        async upload(
          path: string,
          body: ArrayBuffer | Uint8Array | Blob,
          opts?: { contentType?: string; cacheControl?: string }
        ): Promise<{ error: null } | { error: { message: string } }> {
          const key = `${prefix}/${path}`;
          try {
            await bucket.put(key, body as never, {
              httpMetadata: {
                contentType: opts?.contentType,
                cacheControl: opts?.cacheControl,
              },
            });
            return { error: null };
          } catch (err) {
            return { error: { message: String((err as Error).message ?? err) } };
          }
        },

        async remove(paths: string[]): Promise<{ error: null } | { error: { message: string } }> {
          try {
            await bucket.delete(paths.map((p) => `${prefix}/${p}`));
            return { error: null };
          } catch (err) {
            return { error: { message: String((err as Error).message ?? err) } };
          }
        },

        /** Đồng bộ, giống supabase-js: không cần đọc gì để dựng URL, vì URL
         *  chỉ trỏ tới route phục vụ chứ không xác nhận tệp có tồn tại. */
        getPublicUrl(path: string): { data: { publicUrl: string } } {
          return { data: { publicUrl: publicUrl(publicBase, `${prefix}/${path}`) } };
        },

        /**
         * Đếm số đối tượng dưới một tiền tố con.
         *
         * Dùng để tái hiện giới hạn "200 ảnh mỗi người" mà migration
         * 20260722 đặt cho chat-images bằng RLS đếm hàng - D1 không có RLS
         * nên phần đếm chuyển hẳn sang đây.
         *
         * R2 list() nhất quán CUỐI CÙNG (eventually consistent) sau một lượt
         * ghi rất gần, nên trong hiếm trường hợp bộ đếm có thể thiếu vài đối
         * tượng vừa ghi. Chấp nhận được cho một giới hạn chống lạm dụng,
         * không chấp nhận được nếu dùng để tính tiền hay xoá dữ liệu.
         */
        async count(subPrefix: string): Promise<number> {
          let n = 0;
          let cursor: string | undefined;
          const key = `${prefix}/${subPrefix}`;
          do {
            const page = await bucket.list({ prefix: key, cursor, limit: 1000 });
            n += page.objects.length;
            cursor = page.truncated ? page.cursor : undefined;
          } while (cursor);
          return n;
        },
      };
    },
  };
}
