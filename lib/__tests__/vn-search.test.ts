import { describe, expect, it } from "vitest";
import { foldVietnamese, matchesVietnamese } from "@/lib/vn-search";

/** Ô tìm trong bộ chọn vị trí lọc trên 43 tên nghề tiếng Việt.
 *
 *  Bài đáng kiểm nhất là gõ KHÔNG DẤU: đó là cách người Việt gõ nhanh, và một
 *  ô tìm không ra kết quả còn tệ hơn không có ô tìm, vì nó hứa một việc rồi
 *  không làm. */

describe("bỏ dấu", () => {
  it("bỏ dấu thanh và dấu mũ", () => {
    expect(foldVietnamese("Chuyên viên Tín dụng")).toBe("chuyen vien tin dung");
    expect(foldVietnamese("Kế toán trưởng")).toBe("ke toan truong");
  });

  it("chữ đ thành d", () => {
    // đ KHÔNG phải d cộng dấu - nó là một ký tự riêng, nên NFD không đụng tới.
    // Thiếu bước này thì gõ "dau tu" không ra "Đầu tư".
    expect(foldVietnamese("Đầu tư")).toBe("dau tu");
    expect(foldVietnamese("Định giá")).toBe("dinh gia");
  });

  it("hạ hoa thường và bỏ khoảng trắng thừa", () => {
    expect(foldVietnamese("  QUẢN LÝ Rủi Ro  ")).toBe("quan ly rui ro");
  });

  it("chuỗi tiếng Anh giữ nguyên", () => {
    expect(foldVietnamese("Private Equity / Venture Capital")).toBe(
      "private equity / venture capital"
    );
  });
});

describe("khớp khi tìm", () => {
  it("gõ KHÔNG DẤU vẫn ra", () => {
    expect(matchesVietnamese("Chuyên viên Tín dụng", "tin dung")).toBe(true);
    expect(matchesVietnamese("Chuyên viên Định giá Tài sản", "dinh gia")).toBe(true);
    expect(matchesVietnamese("M&A Origination & Chiến lược (Trước Deal)", "chien luoc")).toBe(true);
  });

  it("gõ CÓ DẤU cũng ra", () => {
    expect(matchesVietnamese("Chuyên viên Tín dụng", "Tín dụng")).toBe(true);
  });

  it("khớp giữa chuỗi, không chỉ đầu chuỗi", () => {
    // Người dùng nhớ "rủi ro" chứ hiếm khi nhớ tên bắt đầu bằng gì.
    expect(matchesVietnamese("Chuyên viên Quản lý Rủi ro", "rui ro")).toBe(true);
  });

  it("không khớp thì trả false", () => {
    expect(matchesVietnamese("Chuyên viên Tín dụng", "bat dong san")).toBe(false);
  });

  it("ô tìm rỗng thì khớp tất - không giấu mất lựa chọn nào", () => {
    expect(matchesVietnamese("Bất kỳ", "")).toBe(true);
    expect(matchesVietnamese("Bất kỳ", "   ")).toBe(true);
  });

  it("tìm được cả tên tiếng Anh trong danh sách", () => {
    expect(matchesVietnamese("Private Equity / Venture Capital Analyst", "venture")).toBe(true);
    expect(matchesVietnamese("FP&A (Kế hoạch & Phân tích Tài chính)", "fp&a")).toBe(true);
  });
});
