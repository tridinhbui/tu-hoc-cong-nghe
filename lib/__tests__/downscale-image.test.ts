import { describe, expect, it } from "vitest";
import {
  MAX_EDGE_PX,
  isWorthReplacing,
  skipReason,
  targetDimensions,
  webpName,
} from "@/lib/downscale-image";

/** Phần quyết định của việc thu nhỏ ảnh chat.
 *
 *  Bản thân việc vẽ lại cần canvas nên không kiểm được ở đây; thứ kiểm được -
 *  và cũng là thứ dễ sai - là các quyết định quanh nó: thu bao nhiêu, khi nào
 *  đừng đụng vào, và khi nào bản "đã tối ưu" thực ra tệ hơn bản gốc. */

describe("kích thước sau khi thu", () => {
  it("ảnh chụp điện thoại dựng đứng về đúng cạnh dài 1600", () => {
    expect(targetDimensions(3024, 4032)).toEqual({ width: 1200, height: 1600 });
  });

  it("ảnh nằm ngang cũng lấy cạnh DÀI làm chuẩn", () => {
    // Lấy nhầm chiều rộng thì ảnh panorama vẫn còn khổng lồ sau khi "thu".
    expect(targetDimensions(4000, 1000)).toEqual({ width: 1600, height: 400 });
  });

  it("giữ tỉ lệ", () => {
    const t = targetDimensions(4000, 3000)!;
    expect(t.width / t.height).toBeCloseTo(4 / 3, 5);
  });

  it("ảnh đã nhỏ hơn ngưỡng thì không thu", () => {
    expect(targetDimensions(1200, 800)).toBeNull();
    expect(targetDimensions(MAX_EDGE_PX, 900)).toBeNull(); // đúng bằng ngưỡng
  });

  it("ảnh cực kỳ dẹt vẫn còn ít nhất một điểm ảnh mỗi chiều", () => {
    // Làm tròn xuống thành 0 thì canvas ném lỗi và cả lần gửi ảnh hỏng.
    const t = targetDimensions(8000, 1)!;
    expect(t.height).toBeGreaterThanOrEqual(1);
    expect(t.width).toBe(1600);
  });

  it("kích thước vô nghĩa thì không thu", () => {
    expect(targetDimensions(0, 100)).toBeNull();
    expect(targetDimensions(-5, 100)).toBeNull();
  });
});

describe("khi nào đừng đụng vào", () => {
  it("GIF giữ nguyên vì vẽ lại chỉ lấy được khung đầu", () => {
    expect(skipReason({ type: "image/gif", size: 5_000_000 })).toBe("gif-animation");
  });

  it("ảnh vốn đã nhỏ thì giữ nguyên", () => {
    expect(skipReason({ type: "image/png", size: 120_000 })).toBe("already-small");
  });

  it("ảnh lớn thì xử lý", () => {
    expect(skipReason({ type: "image/jpeg", size: 4_000_000 })).toBeNull();
    expect(skipReason({ type: "image/png", size: 900_000 })).toBeNull();
  });
});

describe("bản đã thu có đáng dùng không", () => {
  it("nhỏ hơn hẳn thì dùng", () => {
    expect(isWorthReplacing(4_000_000, 300_000)).toBe(true);
  });

  it("PHÌNH RA thì giữ bản gốc", () => {
    // Ảnh chụp màn hình nhiều mảng phẳng nén PNG rất tốt và có thể to ra khi
    // mã hoá lại. Đây là chỗ một hàm "tối ưu" âm thầm làm mọi thứ tệ hơn.
    expect(isWorthReplacing(500_000, 720_000)).toBe(false);
  });

  it("chỉ nhỏ hơn chút ít thì không đáng đổi định dạng", () => {
    expect(isWorthReplacing(1_000_000, 950_000)).toBe(false);
  });

  it("kết quả rỗng thì giữ bản gốc", () => {
    expect(isWorthReplacing(1_000_000, 0)).toBe(false);
  });
});

describe("tên tệp sau khi đổi định dạng", () => {
  it("đổi đuôi", () => {
    expect(webpName("IMG_4821.HEIC")).toBe("IMG_4821.webp");
    expect(webpName("screenshot.png")).toBe("screenshot.webp");
  });

  it("tên có nhiều dấu chấm chỉ mất phần đuôi cuối", () => {
    expect(webpName("bao.cao.quy.3.jpg")).toBe("bao.cao.quy.3.webp");
  });

  it("tên không có đuôi", () => {
    expect(webpName("anh")).toBe("anh.webp");
  });

  it("tên rỗng vẫn ra một tên hợp lệ", () => {
    expect(webpName("")).toBe("image.webp");
    expect(webpName(".png")).toBe("image.webp");
  });
});
