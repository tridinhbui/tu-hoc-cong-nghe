/**
 * Băm và kiểm mật khẩu bằng PBKDF2-HMAC-SHA256 trên Web Crypto.
 *
 * VÌ SAO PBKDF2 CHỨ KHÔNG PHẢI BCRYPT/ARGON2. Hai cái sau mạnh hơn trước tấn
 * công bằng phần cứng chuyên dụng, nhưng cả hai đều cần mã máy: trên Workers
 * chúng phải đi qua WebAssembly, tức thêm một phụ thuộc nhị phân vào đường
 * đăng nhập. PBKDF2 nằm sẵn trong `crypto.subtle` của cả Workers lẫn Node,
 * không thêm gì, và ở số vòng dưới đây thì chi phí bẻ khoá vẫn đủ lớn.
 *
 * SỐ VÒNG NẰM TRONG CHUỖI BĂM, KHÔNG PHẢI TRONG MÃ. Nâng hằng số dưới đây chỉ
 * đổi mật khẩu ghi MỚI; các bản ghi cũ vẫn tự khai số vòng của chúng nên vẫn
 * kiểm được. Nếu số vòng là hằng số đọc lúc kiểm thì mỗi lần nâng là một lần
 * khoá toàn bộ người dùng cũ ra ngoài.
 */

/**
 * OWASP khuyến nghị cho PBKDF2-HMAC-SHA256 (2023).
 *
 * ĐÃ ĐO, KHÔNG PHẢI ĐOÁN: 600k vòng tốn ~50 ms CPU (100k ~8,6 ms, 300k
 * ~25 ms - `crypto.subtle` nên chi phí tuyến tính theo số vòng). Con số ấy
 * chỉ phát sinh ở đăng nhập và đăng ký, không phải mỗi yêu cầu.
 *
 * NHƯNG NÓ RÀNG BUỘC GÓI DỊCH VỤ: Workers gói miễn phí giới hạn 10 ms CPU cho
 * một yêu cầu, nên 50 ms sẽ bị cắt. Gói trả phí mặc định 30 s thì thừa sức.
 * Nếu buộc phải chạy trên gói miễn phí thì cách đúng KHÔNG phải hạ số vòng
 * xuống dưới 10 ms - ở mức ấy PBKDF2 gần như không còn tác dụng - mà là đẩy
 * việc băm sang một Durable Object hoặc đổi sang gói trả phí.
 */
const ITERATIONS = 600_000;
const KEY_BITS = 256;
const SALT_BYTES = 16;
const PREFIX = "pbkdf2-sha256";

function b64(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

function unb64(s: string): Uint8Array {
  const raw = atob(s);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

async function derive(password: string, salt: Uint8Array, iterations: number) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" },
    key,
    KEY_BITS
  );
  return new Uint8Array(bits);
}

/** Sinh chuỗi băm tự mô tả: `pbkdf2-sha256$<vòng>$<muối>$<băm>`. */
export async function hashPassword(password: string): Promise<string> {
  if (!password) throw new Error("mật khẩu rỗng");
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const hash = await derive(password, salt, ITERATIONS);
  return `${PREFIX}$${ITERATIONS}$${b64(salt)}$${b64(hash)}`;
}

/**
 * So sánh theo thời gian hằng định.
 *
 * `a === b` trên chuỗi thoát ngay ở byte đầu khác nhau, nên thời gian trả lời
 * rò rỉ số ký tự đầu đã đúng. Ở đây luôn duyệt hết mảng.
 */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** Kiểm mật khẩu. Trả về false cho mọi chuỗi băm hỏng, không ném lỗi. */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== PREFIX) return false;
  const iterations = Number(parts[1]);
  if (!Number.isInteger(iterations) || iterations < 1) return false;
  let salt: Uint8Array, expected: Uint8Array;
  try {
    salt = unb64(parts[2]);
    expected = unb64(parts[3]);
  } catch {
    return false;
  }
  const actual = await derive(password, salt, iterations);
  return timingSafeEqual(actual, expected);
}

/**
 * Chuỗi băm này có đang ở số vòng cũ hơn mức hiện tại không.
 *
 * Gọi sau khi đăng nhập thành công để băm lại ngầm: đó là thời điểm duy nhất
 * trong đời một tài khoản mà hệ thống cầm mật khẩu dạng thường và có quyền.
 */
export function needsRehash(stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== PREFIX) return true;
  return Number(parts[1]) < ITERATIONS;
}
