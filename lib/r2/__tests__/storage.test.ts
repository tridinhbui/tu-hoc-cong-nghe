import { describe, it, expect, vi } from "vitest";
import { createStorageClient } from "../storage";
import type { R2Bucket } from "@cloudflare/workers-types";

/** Vỏ R2 mỏng chạy trong bộ nhớ, đủ để kiểm hình dạng truy vấn - không kiểm
 *  hành vi thật của R2 (đã có Cloudflare tự kiểm phần đó). */
function fakeBucket() {
  const objects = new Map<string, unknown>();
  const bucket = {
    async put(key: string, body: unknown) {
      objects.set(key, body);
      return {} as never;
    },
    async delete(keys: string | string[]) {
      for (const k of Array.isArray(keys) ? keys : [keys]) objects.delete(k);
    },
    async list({ prefix }: { prefix: string }) {
      const objs = [...objects.keys()].filter((k) => k.startsWith(prefix)).map((key) => ({ key }));
      return { objects: objs, truncated: false, cursor: undefined };
    },
  } as unknown as R2Bucket;
  return { bucket, objects };
}

describe("createStorageClient", () => {
  it("ghi dưới đúng tiền tố bucket, đọc lại đúng khoá", async () => {
    const { bucket, objects } = fakeBucket();
    const client = createStorageClient(bucket, "https://x.vn");
    await client.from("avatars").upload("u1.png", new Uint8Array([1]));
    // Tiền tố PHẢI có mặt - đây là thứ phân biệt ba "bucket" logic trong một
    // R2 bucket vật lý. Thiếu nó là avatar và tài liệu ghi đè lẫn nhau.
    expect(objects.has("avatars/u1.png")).toBe(true);
  });

  it("getPublicUrl trỏ vào route phục vụ, mang đúng tiền tố", () => {
    const client = createStorageClient(fakeBucket().bucket, "https://x.vn");
    const { data } = client.from("documents").getPublicUrl("a/b.pdf");
    expect(data.publicUrl).toBe("https://x.vn/api/files/documents/a/b.pdf");
  });

  it("remove xoá đúng khoá đã mang tiền tố", async () => {
    const { bucket, objects } = fakeBucket();
    const client = createStorageClient(bucket, "https://x.vn");
    await client.from("chat-images").upload("u1/a.png", new Uint8Array([1]));
    await client.from("chat-images").remove(["u1/a.png"]);
    expect(objects.has("chat-images/u1/a.png")).toBe(false);
  });

  it("count chỉ đếm trong tiền tố con của chính người dùng đó", async () => {
    // Đây là tính chất chống lạm dụng - migration 20260722 giới hạn 200 ảnh
    // mỗi người bằng RLS đếm hàng theo (storage.foldername(name))[1] =
    // auth.uid(). Đếm nhầm sang tiền tố người khác là giới hạn vô nghĩa.
    const { bucket } = fakeBucket();
    const client = createStorageClient(bucket, "https://x.vn");
    for (let i = 0; i < 3; i++) {
      await client.from("chat-images").upload(`u1/${i}.png`, new Uint8Array([1]));
    }
    await client.from("chat-images").upload("u2/0.png", new Uint8Array([1]));
    expect(await client.from("chat-images").count("u1/")).toBe(3);
    expect(await client.from("chat-images").count("u2/")).toBe(1);
    expect(await client.from("chat-images").count("u3/")).toBe(0);
  });

  it("count đi qua nhiều trang khi list() báo truncated", async () => {
    const bucket = {
      list: vi
        .fn()
        .mockResolvedValueOnce({ objects: Array(1000).fill({ key: "x" }), truncated: true, cursor: "c1" })
        .mockResolvedValueOnce({ objects: Array(50).fill({ key: "y" }), truncated: false }),
      put: vi.fn(),
      delete: vi.fn(),
    } as unknown as R2Bucket;
    const client = createStorageClient(bucket, "https://x.vn");
    expect(await client.from("chat-images").count("u1/")).toBe(1050);
    expect(bucket.list).toHaveBeenCalledTimes(2);
  });

  it("upload trả về { error } khi bucket ném lỗi, không ném ra ngoài", async () => {
    const bucket = { put: vi.fn().mockRejectedValue(new Error("hỏng")) } as unknown as R2Bucket;
    const client = createStorageClient(bucket, "https://x.vn");
    const { error } = await client.from("avatars").upload("a.png", new Uint8Array());
    expect(error?.message).toBe("hỏng");
  });
});
