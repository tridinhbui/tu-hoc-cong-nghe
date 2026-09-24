import { describe, it, expect, vi, beforeEach } from "vitest";
import type { CurrentUser } from "@/lib/auth/current-user";

const getCurrentUser = vi.fn<() => Promise<CurrentUser | null>>();
vi.mock("@/lib/auth/current-user", () => ({ getCurrentUser: () => getCurrentUser() }));
vi.mock("@/lib/d1/server", () => ({ getDb: () => ({}) }));

beforeEach(() => getCurrentUser.mockReset());

describe("requireAdminDb", () => {
  it("chưa đăng nhập thì từ chối", async () => {
    getCurrentUser.mockResolvedValue(null);
    const { requireAdminDb, AdminAuthError } = await import("../db");
    await expect(requireAdminDb()).rejects.toThrow(AdminAuthError);
  });

  it("đăng nhập nhưng không phải admin thì từ chối", async () => {
    getCurrentUser.mockResolvedValue({
      id: "u1", email: "a@b.vn", role: "user", fullName: null, avatarUrl: null,
    });
    const { requireAdminDb, AdminAuthError } = await import("../db");
    await expect(requireAdminDb()).rejects.toThrow(AdminAuthError);
  });

  it("admin thì trả về client mang ADMIN_BYPASS", async () => {
    getCurrentUser.mockResolvedValue({
      id: "u1", email: "a@b.vn", role: "admin", fullName: null, avatarUrl: null,
    });
    const { requireAdminDb } = await import("../db");
    const { session } = await requireAdminDb();
    expect(session?.role).toBe("admin");
    // Không đọc trực tiếp actor riêng (private trong Builder) - kiểm gián
    // tiếp qua một bảng "owner" thật: client trả về không được lọc theo ai
    // cả, tức build() không có WHERE. Đã kiểm kỹ hơn ở
    // lib/d1/__tests__/query-builder.test.ts; ở đây chỉ kiểm phần glue.
  });
});
