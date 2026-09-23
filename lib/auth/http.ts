import "server-only";
import { cookies } from "next/headers";
import { sessionCookie, SESSION_COOKIE_NAME } from "./session";
import { AuthError } from "./service";

/**
 * Chỗ nối giữa dịch vụ tài khoản và HTTP. Tách ra để lib/auth/service.ts
 * không biết gì về cookie - nhờ vậy bộ kiểm của nó chạy trên SQLite thật mà
 * không cần dựng yêu cầu giả.
 */

export async function setSessionCookie(token: string, expiresAt: string) {
  (await cookies()).set(sessionCookie(token, expiresAt));
}

export async function clearSessionCookie() {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}

export async function readSessionCookie(): Promise<string | null> {
  return (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;
}

/**
 * Đổi lỗi thành phản hồi JSON.
 *
 * AuthError mang mã và thông báo đã được viết cho người đọc, nên trả ra
 * nguyên văn. Mọi lỗi KHÁC chỉ trả một câu chung: thông báo lỗi nội bộ hay
 * mang theo tên bảng, mảnh SQL, hoặc đường dẫn tệp.
 */
export function authErrorResponse(err: unknown): Response {
  if (err instanceof AuthError) {
    const status = err.code === "invalid_credentials" ? 401
      : err.code === "account_disabled" ? 403
      : 400;
    return Response.json({ error: err.message, code: err.code }, { status });
  }
  console.error("[auth] lỗi không lường trước:", err);
  return Response.json({ error: "Có lỗi xảy ra. Thử lại sau." , code: "internal" }, { status: 500 });
}

/** Đọc và kiểm thân JSON. Thiếu trường trả lỗi rõ thay vì `undefined` chạy tiếp. */
export async function readJson<K extends string>(
  req: Request,
  fields: readonly K[]
): Promise<Record<K, string>> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    throw new AuthError("Dữ liệu gửi lên không hợp lệ.", "bad_request");
  }
  const obj = (body ?? {}) as Record<string, unknown>;
  const out = {} as Record<K, string>;
  for (const f of fields) {
    const v = obj[f];
    if (typeof v !== "string" || !v) throw new AuthError(`Thiếu trường "${f}".`, "bad_request");
    out[f] = v;
  }
  return out;
}
