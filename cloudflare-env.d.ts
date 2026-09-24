// Các binding khai trong wrangler.jsonc, cho TypeScript biết.
//
// @opennextjs/cloudflare đọc `CloudflareEnv` toàn cục; khai ở đây thay vì
// sinh tự động để một binding thêm vào wrangler.jsonc mà quên khai ở đây sẽ
// là lỗi biên dịch, chứ không phải `undefined` lúc chạy.
declare global {
  interface CloudflareEnv {
    DB: import("@cloudflare/workers-types").D1Database;
    FILES: import("@cloudflare/workers-types").R2Bucket;
    /** Worker riêng thcn-realtime, chỉ dùng để publish - xem lib/realtime/server.ts. */
    REALTIME: import("@cloudflare/workers-types").Fetcher;
  }
}
export {};
