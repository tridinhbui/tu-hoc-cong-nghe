/**
 * Client dữ liệu phía trình duyệt, chạy trên Cloudflare D1 THẬT.
 *
 * Giữ nguyên bề mặt API của supabase-js (from/rpc/auth) để hơn 40 module đang
 * gọi nó không phải đổi một dòng nào. Nhưng khác bản trước ở đúng một điểm
 * quan trọng: bản trước là một stub trả rỗng cho MỌI truy vấn - ứng dụng
 * build được, chạy được, và không có dữ liệu nào cả, mà không một lỗi nào báo.
 * Bản này gửi truy vấn tới /api/db, nơi máy chủ chạy nó trên D1 dưới danh
 * nghĩa người đang đăng nhập, với policy registry làm thay RLS - xem
 * lib/d1/wire.ts.
 *
 * `storage` đã chuyển sang /api/uploads/* (xem lib/r2/storage.ts) và ném lỗi
 * chỉ đường nếu ai gọi. `channel` chạy trên Durable Objects - xem
 * lib/realtime/client-channel.ts; trước đây nó là một stub trả CHANNEL_ERROR.
 */
import {
  getCurrentUser,
  resetCurrentUserCache,
  signOut as signOutD1,
  type CachedUser,
} from "@/lib/current-user";
import type { WireOp } from "@/lib/d1/wire";
import { CloudflareRealtimeChannel } from "@/lib/realtime/client-channel";

export type CloudflareUser = {
  id: string;
  email?: string;
  user_metadata?: Record<string, any>;
};

export type CloudflareSession = {
  user: CloudflareUser;
};

export type RealtimeChannel = {
  on: (...args: any[]) => RealtimeChannel;
  subscribe: (...args: any[]) => RealtimeChannel;
  send: (...args: any[]) => Promise<any>;
  track: (...args: any[]) => Promise<any>;
  untrack: (...args: any[]) => Promise<any>;
  presenceState: <T = any>(...args: any[]) => Record<string, T[]>;
};

type Result = { data: any; error: { message: string; code?: string; details?: string; hint?: string } | null; count?: number | null };

export type QueryBuilder = {
  then: Promise<Result>["then"];
  catch: Promise<Result>["catch"];
  finally: Promise<Result>["finally"];
  single: <T = any>() => QueryBuilder & Promise<{ data: T | null; error: any; count?: number | null }>;
  maybeSingle: <T = any>() => QueryBuilder & Promise<{ data: T | null; error: any; count?: number | null }>;
  [key: string]: any;
};

export type CloudflareClient = {
  auth: {
    getSession(): Promise<{ data: { session: CloudflareSession | null }; error: any }>;
    getUser(): Promise<{ data: { user: CloudflareUser | null }; error: any }>;
    signOut(): Promise<{ error: any }>;
    updateUser(...args: any[]): Promise<{ data: { user: CloudflareUser | null }; error: any }>;
    resetPasswordForEmail(...args: any[]): Promise<{ data: null; error: any }>;
    onAuthStateChange(
      callback?: (event: string, session: CloudflareSession | null) => void
    ): { data: { subscription: { unsubscribe(): void } } };
  };
  from(table: string): QueryBuilder;
  rpc(fn: string, args?: Record<string, any>): QueryBuilder;
  channel(topic: string, options?: Record<string, any>): RealtimeChannel;
  removeChannel(channel: RealtimeChannel): "ok";
  storage: { from(bucket: string): QueryBuilder };
};

async function post(url: string, body: unknown): Promise<Result> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => null)) as Result | null;
    if (!json) return { data: null, error: { message: `Máy chủ trả ${res.status} không kèm dữ liệu.` } };
    return json;
  } catch (err) {
    return { data: null, error: { message: (err as Error).message || "Không kết nối được máy chủ." } };
  }
}

/** Builder ghi lại chuỗi thao tác, chỉ gửi đi khi bị await. */
function remoteQuery(send: (ops: WireOp[]) => Promise<Result>): QueryBuilder {
  const ops: WireOp[] = [];
  let pending: Promise<Result> | null = null;
  const run = () => (pending ??= send(ops));

  const self: Record<string, unknown> = {
    then: (a?: any, b?: any) => run().then(a, b),
    catch: (b?: any) => run().catch(b),
    finally: (f?: any) => run().finally(f),
  };
  const proxy: QueryBuilder = new Proxy(self, {
    get(target, prop) {
      if (typeof prop === "string" && prop in target) return target[prop];
      if (typeof prop !== "string") return undefined;
      // Mọi tên khác là một thao tác truy vấn. Máy chủ kiểm danh sách trắng;
      // ở đây chỉ ghi lại để lỗi báo ra đúng từ một nơi.
      return (...args: unknown[]) => {
        ops.push([prop, ...args]);
        return proxy;
      };
    },
  }) as QueryBuilder;
  return proxy;
}

function toCfUser(u: NonNullable<CachedUser>): CloudflareUser {
  return {
    id: u.id,
    email: u.email,
    user_metadata: { full_name: u.fullName ?? undefined, avatar_url: u.avatarUrl ?? undefined },
  };
}



/**
 * Đọc lại MỘT hàng sau tín hiệu realtime, qua /api/db - tức dưới danh nghĩa
 * người đang đăng nhập, với policy registry ép quyền. Đây là chỗ thay cho RLS
 * của postgres_changes: hub chỉ phát id, và ai không được đọc hàng đó thì nhận
 * null ở đây, nên handler của họ không bao giờ chạy.
 */
async function fetchRealtimeRow(table: string, id: number): Promise<Record<string, unknown> | null> {
  const r = await post("/api/db", {
    table,
    ops: [["select", "*"], ["eq", "id", id], ["maybeSingle"]],
  });
  return r.error ? null : ((r.data as Record<string, unknown> | null) ?? null);
}

const client: CloudflareClient = {
  auth: {
    async getSession() {
      const u = await getCurrentUser();
      return { data: { session: u ? { user: toCfUser(u) } : null }, error: null };
    },
    async getUser() {
      const u = await getCurrentUser();
      return { data: { user: u ? toCfUser(u) : null }, error: null };
    },
    async signOut() {
      await signOutD1();
      return { error: null };
    },
    /**
     * `data` ghi thẳng vào user_profiles: ở D1 không còn "metadata của nhà
     * cung cấp" tách khỏi hồ sơ. `password` KHÔNG hỗ trợ ở đây - đổi mật khẩu
     * cần mật khẩu cũ hoặc token đặt lại, xem /api/auth/reset-confirm.
     */
    async updateUser(attrs: { data?: Record<string, unknown>; password?: string } = {}) {
      if (attrs.password !== undefined) {
        return {
          data: { user: null },
          error: { message: "Đổi mật khẩu phải đi qua liên kết đặt lại mật khẩu." },
        };
      }
      const u = await getCurrentUser();
      if (!u) return { data: { user: null }, error: { message: "Chưa đăng nhập." } };
      const patch: Record<string, unknown> = {};
      if (attrs.data && "full_name" in attrs.data) patch.full_name = attrs.data.full_name;
      if (attrs.data && "avatar_url" in attrs.data) patch.avatar_url = attrs.data.avatar_url;
      if (Object.keys(patch).length) {
        const r = await (client.from("user_profiles").update(patch).eq("id", u.id) as unknown as Promise<Result>);
        if (r.error) return { data: { user: null }, error: r.error };
      }
      resetCurrentUserCache();
      const fresh = await getCurrentUser();
      return { data: { user: fresh ? toCfUser(fresh) : null }, error: null };
    },
    async resetPasswordForEmail(email: string) {
      const r = await fetch("/api/auth/reset-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch((e) => e as Error);
      if (r instanceof Error) return { data: null, error: { message: r.message } };
      return { data: null, error: null };
    },
    /**
     * Không có sự kiện đổi phiên nào để lắng nghe - cookie phiên là httpOnly.
     * Bắn đúng một sự kiện INITIAL_SESSION với phiên hiện tại, là thứ mọi chỗ
     * gọi hiện có đang chờ (GlobalChatWrapper, DashboardClient). Đăng nhập và
     * đăng xuất về sau đều điều hướng trang, nên chúng tự nạp lại.
     */
    onAuthStateChange(callback) {
      let active = true;
      getCurrentUser().then((u) => {
        if (active && callback) callback("INITIAL_SESSION", u ? { user: toCfUser(u) } : null);
      });
      return { data: { subscription: { unsubscribe() { active = false; } } } };
    },
  },
  from(table) {
    return remoteQuery((ops) => post("/api/db", { table, ops }));
  },
  rpc(fn, args) {
    return remoteQuery(() => post("/api/db/rpc", { name: fn, params: args ?? {} }));
  },
  channel(topic, options) {
    // Kênh MỚI mỗi lần gọi - không bao giờ trả kênh cũ cùng tên. Xem
    // lib/realtime/client-channel.ts về lỗi từng làm sập mọi trang có chuông.
    return new CloudflareRealtimeChannel(topic, options, fetchRealtimeRow) as unknown as RealtimeChannel;
  },
  removeChannel(channel?: unknown) {
    // Trước đây là no-op: một kênh stub không mở gì nên không có gì để đóng.
    // Giờ mỗi kênh giữ WebSocket thật - không đóng ở đây thì mỗi lần rời trang
    // để lại một kết nối mồ côi, và presence của người đó không bao giờ rời phòng.
    const c = channel as { unsubscribe?: () => Promise<unknown> } | undefined;
    void c?.unsubscribe?.();
    return "ok";
  },
  storage: {
    from(bucket) {
      throw new Error(
        `storage.from("${bucket}") không còn dùng được - tải tệp qua /api/uploads/* (xem lib/r2/storage.ts).`
      );
    },
  },
};

export function createClient(): CloudflareClient {
  return client;
}
