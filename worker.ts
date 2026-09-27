/**
 * Điểm vào của Worker: bọc worker của OpenNext để thêm realtime.
 *
 * Mọi request đi thẳng vào Next như trước, TRỪ `/realtime/<hub>` - nó được xử
 * lý ở đây, trước khi Next kịp chạy, vì Route Handler của Next trên OpenNext
 * không chuyển tiếp nâng cấp WebSocket một cách gọn gàng.
 *
 * wrangler.jsonc trỏ `main` vào tệp này. `.open-next/worker.js` do
 * `opennextjs-cloudflare build` sinh ra, nên phải build trước khi deploy.
 */

// @ts-ignore - sinh ra lúc build, không có trong kho mã.
import openNextWorker from "./.open-next/worker.js";
import { handleRealtime } from "./lib/realtime/gate";

// Durable Object của chính OpenNext (hàng đợi ISR, bộ đệm thẻ). Xuất lại để hành
// vi giống hệt khi `main` trỏ thẳng vào worker của nó.
// @ts-ignore - sinh ra lúc build.
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";
export { RealtimeHub } from "./lib/realtime/hub";

type Env = Record<string, unknown>;

type Ctx = { waitUntil(p: Promise<unknown>): void };

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/realtime/")) {
      return handleRealtime(request, env as never, url);
    }
    return openNextWorker.fetch(request, env, ctx);
  },
};
