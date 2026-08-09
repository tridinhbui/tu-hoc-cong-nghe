import { describe, it, expect } from "vitest";
import { timeAgo } from "@/lib/time-ago";
import { libDataVi, libDataEn } from "@/lib/i18n/dictionaries/sections/lib-data";

const vi = libDataVi.libData.timeAgo;
const en = libDataEn.libData.timeAgo;

/** Bản gốc của bộ kiểm này viết cứng "5 phút trước" vào từng expect, nên nó
 *  vừa kiểm phép tính mốc thời gian vừa kiểm câu chữ tiếng Việt. Sau khi
 *  timeAgo nhận chuỗi từ điển, hai việc đó tách ra: mốc thời gian kiểm bằng
 *  bản Việt như cũ, còn phần ngôn ngữ có bộ kiểm riêng chạy trên cả hai. */

describe("timeAgo", () => {
  it("shows 'Vừa xong' for anything under a minute", () => {
    expect(timeAgo(new Date(Date.now() - 30_000).toISOString(), vi)).toBe("Vừa xong");
    expect(timeAgo(new Date().toISOString(), vi)).toBe("Vừa xong");
  });

  it("shows minutes under an hour", () => {
    expect(timeAgo(new Date(Date.now() - 5 * 60_000).toISOString(), vi)).toBe("5 phút trước");
    expect(timeAgo(new Date(Date.now() - 59 * 60_000).toISOString(), vi)).toBe("59 phút trước");
  });

  it("shows hours under a day", () => {
    expect(timeAgo(new Date(Date.now() - 3 * 3_600_000).toISOString(), vi)).toBe("3 giờ trước");
    expect(timeAgo(new Date(Date.now() - 23 * 3_600_000).toISOString(), vi)).toBe("23 giờ trước");
  });

  it("shows days beyond that", () => {
    expect(timeAgo(new Date(Date.now() - 2 * 86_400_000).toISOString(), vi)).toBe("2 ngày trước");
  });

  it("dùng được với cả hai ngôn ngữ, và con số luôn đi qua", () => {
    const fiveMin = new Date(Date.now() - 5 * 60_000).toISOString();
    const threeHours = new Date(Date.now() - 3 * 3_600_000).toISOString();
    const twoDays = new Date(Date.now() - 2 * 86_400_000).toISOString();

    expect(timeAgo(fiveMin, en)).not.toBe(timeAgo(fiveMin, vi));
    for (const [iso, n] of [
      [fiveMin, "5"],
      [threeHours, "3"],
      [twoDays, "2"],
    ] as const) {
      for (const strings of [vi, en]) {
        const text = timeAgo(iso, strings);
        expect(text, `${iso}`).toContain(n);
        // `{n}` chưa thay là lỗi im lặng: câu vẫn hiện ra, chỉ mất con số.
        expect(text).not.toMatch(/\{\w+\}/);
      }
    }
  });
});
