import { afterEach, describe, expect, it, vi } from "vitest";
import { copyToClipboard } from "../copy-to-clipboard";

const original = Object.getOwnPropertyDescriptor(globalThis, "navigator");

function stubNavigator(value: unknown) {
  Object.defineProperty(globalThis, "navigator", {
    value,
    configurable: true,
    writable: true,
  });
}

afterEach(() => {
  if (original) Object.defineProperty(globalThis, "navigator", original);
});

describe("copyToClipboard", () => {
  it("trả true khi writeText thành công", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubNavigator({ clipboard: { writeText } });
    await expect(copyToClipboard("xin chào")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("xin chào");
  });

  it("trả false khi Promise bị từ chối, không ném ra ngoài", async () => {
    stubNavigator({
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    await expect(copyToClipboard("x")).resolves.toBe(false);
  });

  it("trả false khi navigator.clipboard không tồn tại", async () => {
    // Đây là nhánh mà `navigator.clipboard?.writeText(...).catch()` nuốt mất:
    // cả chuỗi thành undefined nên .catch() không bao giờ chạy.
    stubNavigator({});
    await expect(copyToClipboard("x")).resolves.toBe(false);
  });
});
