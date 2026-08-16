/**
 * Lưu trữ cục bộ thay cho Supabase.
 *
 * Cố ý KHÔNG có `"use client"`: `lib/games.ts` vừa được component client gọi
 * vừa được trang server import để dựng metadata, nên đánh dấu client ở đây sẽ
 * kéo cả chuỗi import đó thành lỗi build. Mọi hàm tự bảo vệ bằng
 * `typeof window === "undefined"` thay vì dựa vào chỉ thị.
 *
 * Dự án tài chính cũ đặt mọi thứ - danh tính, tiến độ, phiên chơi, bảng xếp
 * hạng - trên Supabase. Khi gỡ Supabase, thứ thay thế KHÔNG phải là một client
 * giả mạo lại `.from().select().eq()`: 39 module gọi nó theo 39 kiểu khác nhau,
 * và một bản giả đủ giống để cả 39 chạy được thì đã là một cơ sở dữ liệu.
 *
 * Thay vào đó, mỗi tính năng được nối lại vào một kho khoá-giá trị nhỏ, chạy
 * trên localStorage, đúng bằng những gì tính năng đó thực sự cần. Tệp này là
 * kho đó.
 *
 * Hệ quả phải nói rõ, vì nó không thể sửa bằng code: KHÔNG CÓ MÁY CHỦ thì không
 * có bảng xếp hạng nhiều người. Mọi con số ở đây là của riêng máy này, và mất
 * khi người dùng xoá dữ liệu trình duyệt.
 */

const PREFIX = "thcn:";

/** SSR-safe: mọi màn hình game đều render trước trên máy chủ. */
function readRaw(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(PREFIX + key);
  } catch {
    // Safari chế độ riêng tư ném khi ghi, và có bản ném cả khi đọc.
    return null;
  }
}

function writeRaw(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, value);
  } catch {
    /* hết quota hoặc chế độ riêng tư - mất tiến độ, không làm hỏng màn hình */
  }
}

export function readJson<T>(key: string, fallback: T): T {
  const raw = readRaw(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    // Dữ liệu hỏng: trả mặc định thay vì để một màn hình trắng vĩnh viễn mà
    // người dùng không có cách nào thoát ra ngoài việc tự xoá localStorage.
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  writeRaw(key, JSON.stringify(value));
}

// ─── Danh tính cục bộ ──────────────────────────────────────────────────────

export interface LocalPlayer {
  id: string;
  name: string;
  createdAt: string;
}

const PLAYER_KEY = "player";

/**
 * Thay cho `useAuthGate`: không có đăng nhập nên không có gì để gác. Người chơi
 * được cấp một id ngẫu nhiên ở lần mở đầu tiên và giữ nguyên id đó.
 *
 * `id` vẫn tồn tại vì các hàm phía dưới (và mọi component gọi chúng) nhận
 * `userId` làm tham số đầu; giữ chữ ký cũ để không phải sửa lời gọi ở khắp nơi.
 */
export function getLocalPlayer(): LocalPlayer {
  const existing = readJson<LocalPlayer | null>(PLAYER_KEY, null);
  if (existing?.id) return existing;

  const player: LocalPlayer = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `local-${Math.random().toString(36).slice(2)}`,
    name: "Người chơi",
    createdAt: new Date().toISOString(),
  };
  writeJson(PLAYER_KEY, player);
  return player;
}

export function setLocalPlayerName(name: string): LocalPlayer {
  const player = { ...getLocalPlayer(), name };
  writeJson(PLAYER_KEY, player);
  return player;
}

// ─── Phiên chơi ────────────────────────────────────────────────────────────

export interface LocalGameSession {
  id: number;
  game_type: string;
  score: number;
  total: number;
  xp_earned: number;
  created_at: string;
}

const SESSIONS_KEY = "game_sessions";

/**
 * Giữ 200 phiên gần nhất. Không giới hạn thì localStorage đầy sau vài nghìn ván
 * và `writeRaw` bắt đầu nuốt lỗi quota - tiến độ ngừng lưu mà không báo gì.
 */
const MAX_SESSIONS = 200;

export function listGameSessions(): LocalGameSession[] {
  return readJson<LocalGameSession[]>(SESSIONS_KEY, []);
}

export function appendGameSession(
  session: Omit<LocalGameSession, "id" | "created_at">
): LocalGameSession {
  const sessions = listGameSessions();
  const row: LocalGameSession = {
    ...session,
    // Tăng dần theo phiên lớn nhất đang có, không dùng `length`: sau khi cắt
    // bớt ở MAX_SESSIONS, `length` lặp lại id cũ và GameHistory dùng id làm
    // React key sẽ hiện trùng hàng.
    id: sessions.reduce((max, s) => Math.max(max, s.id), 0) + 1,
    created_at: new Date().toISOString(),
  };
  writeJson(SESSIONS_KEY, [row, ...sessions].slice(0, MAX_SESSIONS));
  return row;
}

export function clearLocalData(): void {
  if (typeof window === "undefined") return;
  try {
    for (const key of Object.keys(window.localStorage)) {
      if (key.startsWith(PREFIX)) window.localStorage.removeItem(key);
    }
  } catch {
    /* như trên */
  }
}
