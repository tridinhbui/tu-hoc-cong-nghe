import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/** Cấu hình adapter OpenNext.
 *
 *  Để trống có chủ ý ở giai đoạn 1. Bộ nhớ đệm tăng dần (ISR) và hàng đợi
 *  revalidate nên gắn vào KV/R2 ở giai đoạn sau, khi đã có tài khoản
 *  Cloudflare và đo được thật sự cần cái nào - gắn sẵn ba binding lúc chưa
 *  đo là thêm ba thứ có thể hỏng mà không giải quyết vấn đề nào.
 */
export default defineCloudflareConfig({});
