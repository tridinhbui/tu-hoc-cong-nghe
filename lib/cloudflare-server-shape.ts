import "server-only";
import type { CloudflareClient, CloudflareUser, QueryBuilder, RealtimeChannel } from "@/lib/cloudflare";

/**
 * Dựng một CloudflareClient ĐỦ HÌNH DẠNG phía máy chủ, để các hàm dùng chung
 * (nhận `CloudflareClient`) chạy được với cả client trình duyệt lẫn client máy
 * chủ. Phần không có nghĩa ở máy chủ thì báo lỗi rõ, không giả vờ thành công.
 */
export function serverClientShape(opts: {
  user: CloudflareUser | null;
  from: (table: string) => unknown;
  rpc: (name: string, params: Record<string, unknown>) => Promise<{ data: unknown; error: Error | null }>;
}): CloudflareClient {
  const noServer = (what: string) => async () => ({
    data: { user: null },
    error: { message: `${what} không dùng được ở phía máy chủ.` },
  });
  const deadChannel: RealtimeChannel = {
    on: () => deadChannel,
    subscribe: () => deadChannel,
    send: async () => "error",
    track: async () => "error",
    untrack: async () => "error",
    presenceState: () => ({}),
  };
  return {
    auth: {
      getUser: async () => ({ data: { user: opts.user }, error: null }),
      getSession: async () => ({ data: { session: opts.user ? { user: opts.user } : null }, error: null }),
      signOut: async () => ({ error: { message: "signOut không dùng được ở phía máy chủ." } }),
      updateUser: noServer("updateUser"),
      resetPasswordForEmail: async () => ({ data: null, error: { message: "Dùng /api/auth/reset-request." } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
    },
    from: (table) => opts.from(table) as QueryBuilder,
    rpc: (name, params) => opts.rpc(name, params ?? {}) as unknown as QueryBuilder,
    channel: () => deadChannel,
    removeChannel: () => "ok",
    storage: {
      from(bucket) {
        throw new Error(`storage.from("${bucket}") không còn dùng được - dùng getStorage() (lib/r2/server.ts).`);
      },
    },
  };
}
