/**
 * Khoá HMAC để ký token đáp án (lib/quiz-tokens.ts, lib/level-exam-tokens.ts).
 *
 * Hai tệp đó từng đọc `CLOUDFLARE_SERVICE_ROLE_KEY` - cái tên còn sót lại từ
 * `SUPABASE_SERVICE_ROLE_KEY` sau lần đổi tên hàng loạt. Supabase đi rồi thì
 * không còn "service role key" nào để mượn: đo ngày 2026-09-27, worker trên
 * Cloudflare chỉ có hai secret GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET, nên
 * mọi lần ký đều ném lỗi - Kiểm tra, Thi vượt chặng và Thi thăng cấp cùng
 * trả 500 ở đúng bước phát đề.
 *
 * Giờ có một secret riêng, đúng tên việc nó làm: `QUIZ_TOKEN_SECRET`. Tên cũ
 * vẫn được nhận để môi trường nào đã đặt nó không gãy. Ở dev (không phải
 * production) thì rơi về một khoá cố định để chạy được ngay mà không cần tự
 * tạo secret; production thì bắt buộc phải đặt, và lỗi nói rõ đặt bằng gì.
 */
const DEV_FALLBACK = "dev-only-quiz-token-secret-not-for-production";

export function getTokenSecret(purpose: string): string {
  const secret = process.env.QUIZ_TOKEN_SECRET ?? process.env.CLOUDFLARE_SERVICE_ROLE_KEY;
  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return DEV_FALLBACK;
  throw new Error(
    `Missing QUIZ_TOKEN_SECRET - required to sign ${purpose}. Set it with: npx wrangler secret put QUIZ_TOKEN_SECRET`
  );
}
